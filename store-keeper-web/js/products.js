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