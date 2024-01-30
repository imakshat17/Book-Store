// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADBHYX3rUzQyaYsVQtehzjnyXw_UdN0To",
  authDomain: "mern-inventory-348c9.firebaseapp.com",
  projectId: "mern-inventory-348c9",
  storageBucket: "mern-inventory-348c9.appspot.com",
  messagingSenderId: "95577368360",
  appId: "1:95577368360:web:238890fcae7465e464d21d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;