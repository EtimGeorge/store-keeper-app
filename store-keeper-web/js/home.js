import { signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { renderProductsScreen, listenForProducts, renderAddProductModal } from "./products.js";
import { renderPosScreen } from "./pos.js";
import { renderHistoryScreen } from "./history.js";

function renderHomeScreen(user, auth, db) {
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

  // Activate the listener for the products screen
  listenForProducts(db); 

  // Re-attach logout event listener
  document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth);
  });

  // --- NAVIGATION LOGIC ---
  const navPosBtn = document.getElementById('nav-pos');
  const navProductsBtn = document.getElementById('nav-products');
  const navHistoryBtn = document.getElementById('nav-history');

  const allNavButtons = [navPosBtn, navProductsBtn, navHistoryBtn];

  function handleNavClick(activeBtn, renderFunction) {
    allNavButtons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
    mainContent.innerHTML = renderFunction();

    // Special case for products screen to re-attach listener
    if (renderFunction === renderProductsScreen) {
      listenForProducts(db);
    }
  }

  navPosBtn.addEventListener('click', () => handleNavClick(navPosBtn, renderPosScreen));
  navProductsBtn.addEventListener('click', () => handleNavClick(navProductsBtn, renderProductsScreen));
  navHistoryBtn.addEventListener('click', () => handleNavClick(navHistoryBtn, renderHistoryScreen));

  // --- End of Navigation Logic ---
}

export { renderHomeScreen };