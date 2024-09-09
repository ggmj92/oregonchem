// src/middlewares/firebaseStorageMiddleware.js
const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');

// Define Firebase config here
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const multerStorage = multer.memoryStorage();

const uploadFileToFirebase = async (file, path) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file.buffer);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => reject(error),
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
};

const firebaseStorageMiddleware = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    let storagePath;
    if (req.originalUrl.includes('/productos')) {
        storagePath = `products/${req.file.originalname}`;
    } else if (req.originalUrl.includes('/categorias')) {
        storagePath = `categories/${req.file.originalname}`;
    } else if (req.originalUrl.includes('/banners')) {
        storagePath = `banners/${req.file.originalname}`;
    } else {
        return res.status(400).json({ message: 'Invalid route for file upload' });
    }

    uploadFileToFirebase(req.file, storagePath)
        .then((downloadURL) => {
            req.file.downloadURL = downloadURL;
            next();
        })
        .catch((error) => {
            console.error('Error uploading file to Firebase storage:', error);
            res.status(500).json({ message: 'Error uploading file to Firebase storage', error: error.message });
        });
};

const upload = multer({
    storage: multerStorage,
    limits: {
        fileSize: 1024 * 1024 * 3, // 3 MB
    },
});

module.exports = { upload, firebaseStorageMiddleware };
