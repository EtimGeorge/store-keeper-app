function renderHomeScreen(user) {
  const appContainer = document.getElementById('app-container');

  const homeHtml = `
    <div class="main-container">
      <div class="header">
        <h2>Store Keeper</h2>
        <button id="logout-btn" class="btn btn-secondary">Logout</button>
      </div>
      <div class="content">
        <h3>Welcome, ${user.email}!</h3>
        <p>This is your main dashboard. Inventory and sales features will appear here.</p>
      </div>
    </div>
  `;

  appContainer.innerHTML = homeHtml;

  // Add event listener for the logout button
  const logoutButton = document.getElementById('logout-btn');
  logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
      console.log('User signed out successfully.');
      // onAuthStateChanged will handle re-rendering the login screen
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  });
}