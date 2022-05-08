// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXh4euTgtju394Ypkh2IULaVhipLTjfy8",
  authDomain: "vehiclesync.firebaseapp.com",
  databaseURL: "https://vehiclesync-default-rtdb.firebaseio.com",
  projectId: "vehiclesync",
  storageBucket: "vehiclesync.appspot.com",
  messagingSenderId: "717669765962",
  appId: "1:717669765962:web:9fb5ea8e2ea8607d8127b3",
  measurementId: "G-L1TJWFXZ58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);