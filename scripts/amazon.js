import { products } from "../data/products.js";
let productGrid = '';
products.forEach((product) => {
    const HTML = `<div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select class="product-quantity-select">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary">
                Add to Cart
            </button>
            </div>`;
    productGrid += HTML;
});
function cartNumber(){
    let cart = JSON.parse(localStorage.getItem('cartData')) || [];
    let numberOfProducts=0;
    cart.forEach((cartItems)=> {
    numberOfProducts++;
});
    document.querySelector('.cart-quantity').innerText=numberOfProducts;
}
document.querySelector('.products-grid').innerHTML = productGrid;
const addToCart = document.querySelectorAll(".add-to-cart-button");
const checkoutGrid = document.querySelector(".order-summary");
let cartData= JSON.parse(localStorage.getItem('cartData'))||[];

addToCart.forEach((button) => {
    button.addEventListener('click', () => {
        const container = button.closest(".product-container");
        const addedToCart = container.querySelector(".added-to-cart");
        
        // 1. Handle "Added" checkmark animation
        if (addedToCart) {
            addedToCart.style.opacity = 1;
            setTimeout(() => {
                addedToCart.style.opacity = 0;
            }, 2000);
        }

        // 2. Get Product Data
        const productName = container.querySelector(".product-name").innerText;
        const productPrice = container.querySelector(".product-price").innerText;
        const productImage = container.querySelector(".product-image").src;
        
        // Correct way to get the quantity from a dropdown/input
        const quantitySelector = container.querySelector(".product-quantity-select");
        const quantity = quantitySelector ? quantitySelector.value : 1;
        let matchingItem=cartData.find(item => item.name === productName);
        if(matchingItem){
            matchingItem.number = parseInt(matchingItem.number)+parseInt(quantity);
        }
        else{
            cartData.push({
                name:productName,
                price :productPrice,
                image:productImage,
                number:quantity
            });
        }
        localStorage.setItem("cartData",JSON.stringify(cartData));
        cartNumber();
        

        
    });


    
});
  



