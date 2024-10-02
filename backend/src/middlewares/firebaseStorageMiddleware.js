const multer = require("multer");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const multerStorage = multer.memoryStorage();

const uploadFileToFirebase = async (file, path) => {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file.buffer);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
  if (!req.files) {
    return next();
  }

  const { id, name } = req.body;

  // Ensure 'name' is present in the body for constructing paths
  if (!name) {
    return res
      .status(400)
      .json({ message: "Missing name field in the request body" });
  }

  const uploadPromises = Object.keys(req.files).map((fieldName) => {
    const files = req.files[fieldName];
    return Promise.all(
      files.map((file) => {
        let storagePath;

        if (req.originalUrl.includes("/productos")) {
          // Using product name for path
          storagePath = `products/${name}/${fieldName}/${file.originalname}`;
        } else if (req.originalUrl.includes("/categorias")) {
          // Using category name for path
          storagePath = `categories/${name}/${fieldName}/${file.originalname}`;
        } else {
          return Promise.reject(new Error("Invalid route for file upload"));
        }

        return uploadFileToFirebase(file, storagePath).then((downloadURL) => {
          file.downloadURL = downloadURL;
          return file;
        });
      })
    );
  });

  Promise.all(uploadPromises.flat())
    .then(() => {
      next();
    })
    .catch((error) => {
      console.error("Error uploading files to Firebase storage:", error);
      res
        .status(500)
        .json({
          message: "Error uploading files to Firebase storage",
          error: error.message,
        });
    });
};

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 3, // 3 MB limit
  },
});

module.exports = { upload, firebaseStorageMiddleware };
