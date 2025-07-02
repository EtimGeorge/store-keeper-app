export function renderPosScreen() {
  const posHtml = `
    <div class="pos-container">
      <div id="cart-items" class="cart-items-container">
        <p class="empty-cart-message">Your cart is empty.</p>
      </div>

      <div class="pos-actions">
        <button id="show-product-selector-btn" class="btn btn-secondary">
          + Add Product to Cart
        </button>
      </div>

      <div class="pos-footer">
        <div class="total-display">
          <span>Total</span>
          <span id="cart-total">₦0.00</span>
        </div>
        <button id="charge-btn" class="btn btn-primary" disabled>
          Charge ₦0.00
        </button>
      </div>
    </div>
  `;
  return posHtml;
}
