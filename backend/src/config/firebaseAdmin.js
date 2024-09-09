const admin = require('firebase-admin');
console.log('Loading service account key from:', process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
const serviceAccount = require('../utils/serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET,
  });
}

const bucket = admin.storage().bucket();
const auth = admin.auth();

module.exports = { admin, bucket, auth };

