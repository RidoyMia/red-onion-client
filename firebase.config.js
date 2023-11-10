// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCtkT9ESTPoUPfhFNDfGbPFLz7D07CD8A",
  authDomain: "red-onion-3e36c.firebaseapp.com",
  projectId: "red-onion-3e36c",
  storageBucket: "red-onion-3e36c.appspot.com",
  messagingSenderId: "904821850512",
  appId: "1:904821850512:web:f1d5d5422ba0a7d7f3b315",
  measurementId: "G-8QXPBYDX8H"
};

// Initialize Firebase
let app;
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
}
const analytics = getAnalytics(app);

export default app;
