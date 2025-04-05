// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVVAjjT3d8CVLs0aFkA5wcFM98iCijv9E",
  authDomain: "loan-connect-hub.firebaseapp.com",
  projectId: "loan-connect-hub",
  storageBucket: "loan-connect-hub.firebasestorage.app",
  messagingSenderId: "285263334947",
  appId: "1:285263334947:web:a05bbda7742bc86ef8ab96",
  measurementId: "G-D2L0LRW7GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
export default app;