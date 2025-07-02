
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAr_J3Upn9bp08FkACpHUvgjFpnwVx0A30",
    authDomain: "studio-kqmqx.firebaseapp.com",
    projectId: "studio-kqmqx",
    storageBucket: "studio-kqmqx.firebasestorage.app",
    messagingSenderId: "1038160565809",
    appId: "1:1038160565809:web:08926a682170e83ae6a710"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


// Initialize Firebase services
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { renderLoginScreen } from "./auth.js";
import { renderHomeScreen } from "./home.js";

const auth = getAuth(app);
const db = getFirestore(app);

// --- AUTH STATE LISTENER ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in.
    console.log('Auth state changed: User is signed in.', user);
    renderHomeScreen(user, auth, db);
  } else {
    // User is signed out.
    console.log('Auth state changed: User is signed out.');
    renderLoginScreen(auth);
  }
});