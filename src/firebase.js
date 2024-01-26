// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxK8xB2sEpZNhLq_KBrz7uCTwvTgL9lSc",
  authDomain: "mycrush-9ec67.firebaseapp.com",
  projectId: "mycrush-9ec67",
  storageBucket: "mycrush-9ec67.appspot.com",
  messagingSenderId: "702714662053",
  appId: "1:702714662053:web:3c228ef54d190a66fe914c",
  databaseURL: "https://mycrush-9ec67-default-rtdb.asia-southeast1.firebasedatabase.app",
  measurementId: "G-HX7LQ36H55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Get a reference to the database
const database = getDatabase();

export { auth, provider, database };
