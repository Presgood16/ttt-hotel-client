// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgx5uiCDqNuk5HqQI6oPYAFYfusejM8P0",
    authDomain: "hotel-ttt.firebaseapp.com",
    projectId: "hotel-ttt",
    storageBucket: "hotel-ttt.appspot.com",
    messagingSenderId: "805424313383",
    appId: "1:805424313383:web:a1fd30df56dd8931fcca02",
    measurementId: "G-HYV47DJBXF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {
    storage
}
