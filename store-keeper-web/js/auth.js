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
}