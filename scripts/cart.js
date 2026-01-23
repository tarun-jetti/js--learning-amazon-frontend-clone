let cart=JSON.parse(localStorage.getItem('cartData'))||[];
let cartGrid='';
cart.forEach((cartItems)=> {
  const cleanId = cartItems.name.replace(/\s+/g, '-');
  const cartHTML=`<div class="cart-item-container-${cleanId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${cartItems.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${cartItems.name}
                </div>
                <div class="product-price">
                  ${cartItems.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItems.number}</span>
                  </span>
                  <button class="update-quantity-link ">
                    Update
                  </button>
                  <button class="delete-quantity-link" data-product-id="${cartItems.name}">
                    Delete
                  </button>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  cartGrid +=cartHTML;

});
let numberOfItems=0;
cart.forEach((cartItems)=> {
    numberOfItems++;
});
document.querySelector(".return-to-home-link").innerText=numberOfItems;

document.querySelector('.order-summary').innerHTML=cartGrid;

function removeItem(productName) {
  // 1. Filter the array using the real name
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cartData', JSON.stringify(cart));

  // 2. Remove from DOM using the "cleaned" name
  const cleanId = productName.replace(/\s+/g, '-');
  const container = document.querySelector(`.cart-item-container-${cleanId}`);
  if (container) {
    container.remove();
  }
}

document.querySelector('.order-summary').addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-quantity-link');
  if (deleteButton) {
    // 3. Match the data attribute name here
    const productName = deleteButton.dataset.productId;
    removeItem(productName);
  }
});