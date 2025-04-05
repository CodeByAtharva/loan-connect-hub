/*const admin = require('firebase-admin');
require('dotenv').config();
const serviceAccount = require('./serviceAccountKey.json');

console.log(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;


const admin = require('firebase-admin');
require('dotenv').config();
console.log('FIREBASE_SERVICE_ACCOUNT:', process.env.FIREBASE_SERVICE_ACCOUNT);

try {
  //const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT.replace(/\\n/g, '\n'));


  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  module.exports = admin;
} catch (error) {
  console.error('Error parsing FIREBASE_SERVICE_ACCOUNT:', error);
  process.exit(1); // Stop the server if parsing fails
}
*/


const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Load from file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase Admin Initialized Successfully");
module.exports = admin;
