function renderLoginScreen() {
  const appContainer = document.getElementById('app-container');

  const loginHtml = `
    <div class="auth-container">
      <div class="auth-form-container">
        <img src="https://img.icons8.com/pastel-glyph/64/000000/shop--v1.png" alt="Store Icon" class="auth-icon"/>
        <h2 class="auth-title">Store Keeper</h2>
        <form id="login-form">
          <div class="input-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" required>
          </div>
          <div class="input-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" required>
          </div>
          <button type="submit" class="btn btn-primary">LOGIN</button>
          <p id="login-error" class="error-message"></p>
        </form>
      </div>
    </div>
  `;

  appContainer.innerHTML = loginHtml;

  // Add event listener to the form
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload

    // Get user input
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');

    // Clear previous errors
    errorElement.textContent = '';

    // Sign in with Firebase
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // SUCCESS! onAuthStateChanged will handle the navigation.
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // Display a user-friendly error message
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorElement.textContent = 'Invalid email or password. Please try again.';
            break;
          case 'auth/invalid-email':
            errorElement.textContent = 'Please enter a valid email address.';
            break;
          default:
            errorElement.textContent = 'An unknown error occurred. Please try again later.';
            break;
        }
      });
  });
}