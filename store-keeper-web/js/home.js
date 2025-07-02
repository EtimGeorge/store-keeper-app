import { signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { renderProductsScreen } from "./products.js";

function renderHomeScreen(user, auth) {
  const appContainer = document.getElementById('app-container');

  // Main application shell
  const shellHtml = `
    <div class="app-shell">
      <header class="app-header">
        <h2>Store Keeper</h2>
        <button id="logout-btn" class="btn btn-secondary">Logout</button>
      </header>
      <main id="main-content" class="main-content"></main>
      <nav class="bottom-nav">
        <button id="nav-pos" class="nav-btn">
          <img src="https://img.icons8.com/ios/50/a0aec0/cash-register.png" alt="POS"/>
          <span>POS</span>
        </button>
        <button id="nav-products" class="nav-btn active">
          <img src="https://img.icons8.com/ios/50/a0aec0/box.png" alt="Products"/>
          <span>Products</span>
        </button>
        <button id="nav-history" class="nav-btn">
          <img src="https://img.icons8.com/ios/50/a0aec0/activity-history.png" alt="History"/>
          <span>History</span>
        </button>
      </nav>
    </div>
  `;

  appContainer.innerHTML = shellHtml;

  // Render the default screen (Products) into the main content area
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = renderProductsScreen();

  // Re-attach logout event listener
  document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth);
  });

  // TODO: Add event listeners for nav buttons to switch views
}

export { renderHomeScreen };