let cart = [];

function addToCart(product) {
    cart.push(product);
    alert(product + " added to cart");
    console.log(cart);
}
<button onclick="addToCart('Albatross Polo')">Add to Cart</button>