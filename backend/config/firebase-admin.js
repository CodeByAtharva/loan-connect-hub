const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Load from file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase Admin Initialized Successfully");
module.exports = admin;
