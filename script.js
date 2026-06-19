const products = {
  "Performance Polo": 45,
  "Albatross Cap": 25,
  "Golf Trousers": 60
};

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productName, sizeSelectId) {
  const sizeSelect = document.getElementById(sizeSelectId);
  const selectedSize = sizeSelect.value;

  if (selectedSize === "") {
    alert("Please select a size before adding to cart.");
    return;
  }

  const cart = getCart();

  const existingItem = cart.find(item =>
    item.name === productName && item.size === selectedSize
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      size: selectedSize,
      price: products[productName],
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();
}

function removeFromCart(productName, productSize) {
  const cart = getCart().filter(item => {
    return !(item.name === productName && item.size === productSize);
  });

  saveCart(cart);
  updateCartCount();
  displayCart();
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    const totalItems = getCart().reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const emptyCartMessage = document.getElementById("empty-cart-message");

  if (!cartItems || !cartTotal) return;

  const cart = getCart();
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    if (emptyCartMessage) {
      emptyCartMessage.style.display = "block";
    }

    cartTotal.textContent = "Total: £0";
    return;
  }

  if (emptyCartMessage) {
    emptyCartMessage.style.display = "none";
  }

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} - Size: ${item.size} - £${item.price}</span>

      <div class="quantity-controls">
        <button onclick="decreaseQuantity('${item.name}', '${item.size}')">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity('${item.name}', '${item.size}')">+</button>
        <button onclick="removeFromCart('${item.name}', '${item.size}')">Remove</button>
      </div>

      <strong>£${itemTotal}</strong>
    `;

    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: £${total}`;
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();
});
function increaseQuantity(productName, productSize) {
  const cart = getCart();
  const item = cart.find(item =>
    item.name === productName && item.size === productSize
  );

  if (item) {
    item.quantity += 1;
  }

  saveCart(cart);
  updateCartCount();
  displayCart();
}

function decreaseQuantity(productName, productSize) {
  const cart = getCart();
  const item = cart.find(item =>
    item.name === productName && item.size === productSize
  );

  if (item) {
    item.quantity -= 1;
  }

  const updatedCart = cart.filter(item => item.quantity > 0);
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
  saveCart(updatedCart);
  updateCartCount();
  displayCart();
  function clearCart() {
  localStorage.removeItem("cart");
  updateCartCount();
  displayCart();
}

function checkout() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Checkout coming soon.");
}

window.clearCart = clearCart;
window.checkout = checkout;
}
const waitlistForm = document.querySelector(".waitlist-form");

if (waitlistForm) {
  waitlistForm.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thanks for joining the Albatross waitlist.");
    waitlistForm.reset();
  });
}
const waitlistForm = document.querySelector(".waitlist-form");

if (waitlistForm) {
  waitlistForm.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thanks for joining the Albatross waitlist.");
    waitlistForm.reset();
  });
}