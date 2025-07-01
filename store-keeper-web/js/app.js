// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Main app router
auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    console.log('Auth state changed: User is signed in.', user);
    renderHomeScreen(user);
  } else {
    // User is signed out.
    console.log('Auth state changed: User is signed out.');
    renderLoginScreen();
  }
});