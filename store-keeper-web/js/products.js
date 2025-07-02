import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

export function renderProductsScreen() {
  const productsHtml = `
    <div class="product-list-container">
      <div class="product-list-header">
        <input type="search" id="product-search" placeholder="Search products...">
        <button id="add-product-btn" class="btn btn-primary">+</button>
      </div>
      <div id="product-list" class="product-list">
        <p>Loading products...</p>
      </div>
    </div>
  `;
  return productsHtml;
}

export function listenForProducts(db) {
  const productListDiv = document.getElementById('product-list');
  if (!productListDiv) return; // Exit if the element isn't on the page

  const productsCollection = collection(db, 'products');
  onSnapshot(productsCollection, snapshot => {
    if (snapshot.empty) {
      productListDiv.innerHTML = `<p>No products found. Use the '+' button to add your first product.</p>`;
      return;
    }

    let productsHtml = '';
    snapshot.forEach(doc => {
      const product = doc.data();
      const productId = doc.id;
      productsHtml += `
        <div class="product-item" data-id="${productId}">
          <div class="product-info">
            <span class="product-name">${product.name}</span>
            <span class="product-stock">Stock: ${product.stockQuantity}</span>
          </div>
          <div class="product-price">
            <span>₦${product.sellingPrice.toLocaleString()}</span>
          </div>
        </div>
      `;
    });

    productListDiv.innerHTML = productsHtml;
  }, error => {
    console.error("Error fetching products: ", error);
    productListDiv.innerHTML = `<p class="error-message">Could not load products. Please try again later.</p>`;
  });
}