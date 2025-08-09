// ===== Menu Filter =====
const categoryButtons = document.querySelectorAll(".menu-categories button");
const menuItems = document.querySelectorAll(".menu-item");

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active from all
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.category;

    menuItems.forEach(item => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
        item.style.opacity = "1";
      } else {
        item.style.display = "none";
        item.style.opacity = "0";
      }
    });
  });
});

// ===== Cart Functionality =====
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart functionality
document.querySelectorAll(".btn-add").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".menu-item");
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const qty = parseInt(card.querySelector(".qty-input").value);

    // Check if item already exists
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.push({ name, price, qty });
    }

    // Save to localStorage and render
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  });
});

// Render cart dynamically
function renderCart() {
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - $${item.price * item.qty}`;

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.style.marginLeft = '10px';
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };

    li.appendChild(removeBtn);
    cartList.appendChild(li);
    total += item.price * item.qty;
  });

  cartTotal.textContent = `Total: $${total}`;
}

// Checkout -> redirect to order.html
document.querySelector(".btn-checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Save cart to localStorage for the order page
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Redirect to order page
  window.location.href = "order.html";
});

// Load cart on page load
renderCart();
