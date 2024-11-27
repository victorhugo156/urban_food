// firebase-script.js

// Import the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZB7Cd39JOV1DROlYwvunZhdrcNryfqSA",
  authDomain: "urbanfood-58ef1.firebaseapp.com",
  projectId: "urbanfood-58ef1",
  storageBucket: "urbanfood-58ef1.appspot.com",
  messagingSenderId: "517861776048",
  appId: "1:517861776048:web:2cc920069d7f4295697975"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.subscription-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload

    // Get form data
    const name = form.name.value;
    const email = form.email.value;

    try {
      // Add a new document to Firestore
      await addDoc(collection(db, "subscribers"), {
        name: name,
        email: email
      });
      alert("Thank you for subscribing!");
      form.reset(); // Clear the form after successful submission
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("An error occurred. Please try again.");
    }
  });
});
