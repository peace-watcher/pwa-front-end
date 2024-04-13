// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIrnwYxdpzP2UJrtVlhjOJ0ahO0MdZjHM",
  authDomain: "peace-watcher.firebaseapp.com",
  projectId: "peace-watcher",
  storageBucket: "peace-watcher.appspot.com",
  messagingSenderId: "989239479223",
  appId: "1:989239479223:web:380c9ffd3e6347a0c67632",
  measurementId: "G-SN21T7BJXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
