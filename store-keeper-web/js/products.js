import { collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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

export function renderAddProductModal(db) {
  // Prevent duplicate modals
  if (document.getElementById('add-product-modal')) return;

  const modalHtml = `
    <div id="add-product-modal" class="modal-overlay open">
      <div class="modal-content">
        <form id="add-product-form">
          <h3>Add New Product</h3>
          <div class="input-group">
            <label for="product-name">Product Name</label>
            <input type="text" id="product-name" required>
          </div>
          <div class="input-group">
            <label for="product-price">Selling Price (₦)</label>
            <input type="number" id="product-price" step="0.01" required>
          </div>
          <div class="input-group">
            <label for="product-stock">Stock Quantity</label>
            <input type="number" id="product-stock" required>
          </div>
          <p id="modal-error" class="error-message"></p>
          <div class="modal-actions">
            <button type="button" id="cancel-btn" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // --- Add Event Listeners for the Modal ---
  const modal = document.getElementById('add-product-modal');
  const cancelBtn = document.getElementById('cancel-btn');
  const addProductForm = document.getElementById('add-product-form');

  const closeModal = () => {
    modal.remove();
  };

  // Close modal on cancel click or overlay click
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Handle form submission
  addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const stock = document.getElementById('product-stock').value;
    const errorElement = document.getElementById('modal-error');

    if (!name || !price || !stock) {
      errorElement.textContent = 'All fields are required.';
      return;
    }

    const newProduct = {
      name: name,
      sellingPrice: Number(price),
      stockQuantity: Number(stock)
    };

    addDoc(collection(db, 'products'), newProduct)
      .then(() => {
        console.log('Product added successfully!');
        closeModal();
      })
      .catch((error) => {
        console.error('Error adding product: ', error);
        errorElement.textContent = 'Failed to add product. Please try again.';
      });
  });
}