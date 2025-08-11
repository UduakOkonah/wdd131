// ===== Tabs Logic =====
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// ===== Global Variables =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let deliveryFee = 0;

const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const receiptSection = document.getElementById('receipt-section');
const receiptItems = document.getElementById('receipt-items');
const receiptTotal = document.getElementById('receipt-total');
const receiptDate = document.getElementById('receipt-date');
const paymentStatus = document.getElementById('payment-status');
const downloadBtn = document.getElementById('download-receipt');
const markPaidBtn = document.getElementById('mark-paid');

// ===== Render Cart with Delivery Fee =====
function renderCart() {
  cartList.innerHTML = '';
  let total = 0;

  if(cart.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty.</li>';
    cartTotal.textContent = "Total: ₦0";
    return;
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - ₦${item.price * item.qty}`;
    total += item.price * item.qty;
    cartList.appendChild(li);
  });

  if(deliveryFee > 0) {
    const li = document.createElement('li');
    li.textContent = `Delivery Fee - ₦${deliveryFee}`;
    cartList.appendChild(li);
    total += deliveryFee;
  }

  cartTotal.textContent = `Total: ₦${total}`;
}
renderCart();

// ===== Delivery Option Logic =====
document.querySelectorAll('input[name="delivery"]').forEach(option => {
  option.addEventListener('change', e => {
    deliveryFee = (e.target.value === "delivery") ? 1000 : 0;
    renderCart(); // Update total dynamically
  });
});

// ===== Checkout =====
document.getElementById("cartForm").addEventListener("submit", e => {
  e.preventDefault();

  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Populate receipt
  receiptItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - ₦${item.price * item.qty}`;
    receiptItems.appendChild(li);
    total += item.price * item.qty;
  });

  if(deliveryFee > 0) {
    const li = document.createElement('li');
    li.textContent = `Delivery Fee - ₦${deliveryFee}`;
    receiptItems.appendChild(li);
    total += deliveryFee;
  }

  receiptTotal.textContent = total.toFixed(2);
  receiptDate.textContent = new Date().toLocaleString();
  receiptSection.style.display = 'block';

  // Payment Status
  const paymentMethod = document.getElementById("cartPayment").value;
  paymentStatus.textContent = (paymentMethod === "cash") ? 'Paid' : 'Pending';
  paymentStatus.style.color = (paymentMethod === "cash") ? 'green' : 'red';

  // Clear cart
  localStorage.removeItem("cart");
  cart = [];
  renderCart();

  e.target.reset();
});

// ===== Download Receipt as PDF =====
downloadBtn?.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 40;

  // Header
  doc.setFont("courier", "bold").setFontSize(16);
  doc.text("SUNSHINE CONFECTIONARIES", pageWidth / 2, y, { align: "center" });
  y += 20;

  doc.setFontSize(10);
  doc.text("123 Sunshine Blvd, Hometown", pageWidth / 2, y, { align: "center" });
  y += 12;
  doc.text("Phone: +234-987-654-3210", pageWidth / 2, y, { align: "center" });
  y += 12;
  doc.text("Email: info@sunshineconfectionaries.com", pageWidth / 2, y, { align: "center" });
  y += 15;

  // Wider line across page with 20pt margin each side
  doc.setDrawColor(150).setLineDash([2, 2], 0).line(20, y, pageWidth - 20, y);
  y += 15;

  // Receipt Info
  doc.setFont("courier", "normal");
  doc.text(`Date: ${receiptDate.textContent}`, 20, y); y += 12;
  doc.text(`Receipt #: ${Math.floor(Math.random() * 100000)}`, 20, y); y += 12;
  doc.text(`Status: ${paymentStatus.textContent}`, 20, y); y += 20;

  // Items Table Header
  doc.setFont("courier", "bold");
  doc.text("Item", 20, y);
  doc.text("Qty", pageWidth / 2, y, { align: "center" });
  doc.text("Price", pageWidth - 20, y, { align: "right" });
  y += 10;

  doc.setFont("courier", "normal").setLineDash([2, 2], 0).line(20, y, pageWidth - 20, y);
  y += 10;

  // Items
  receiptItems.querySelectorAll("li").forEach(li => {
    const [itemPart, totalPart] = li.textContent.split(" - ₦");
    const [name, qtyPart] = itemPart.split(" x");
    const qty = qtyPart || "1";

    doc.text(name.trim(), 20, y);
    doc.text(qty, pageWidth / 2, y, { align: "center" });
    doc.text(`₦${totalPart}`, pageWidth - 20, y, { align: "right" });
    y += 14;
  });

  // Grand Total
  y += 8;
  doc.setLineDash([]).line(20, y, pageWidth - 20, y);
  y += 18;
  doc.setFont("courier", "bold");
  doc.text(`Grand Total: ₦${receiptTotal.textContent}`, 20, y);

  // Footer
  y += 25;
  doc.setFont("courier", "normal").setFontSize(10);
  doc.text("Thank you for your order!", pageWidth / 2, y, { align: "center" }); y += 12;
  doc.text("Follow us @SunshineConfectionaries", pageWidth / 2, y, { align: "center" });

  doc.save('Sunshine_Receipt.pdf');

    // Fade out the receipt after download
    const receiptSection = document.getElementById("receipt-section");
    receiptSection.classList.add("fade-out");

    // Hide after fade animation
    setTimeout(() => {
        receiptSection.style.display = "none";
        receiptSection.classList.remove("fade-out");
    }, 500);
});


// ===== Generic Payment Dropdown Logic =====
function setupPaymentDropdown(formId) {
  const select = document.getElementById(formId + "Payment");
  if (!select) return;

  select.addEventListener("change", e => {
    document.querySelectorAll(`#${formId}Form .payment-info`).forEach(div => div.classList.remove("show"));

    const value = e.target.value;
    if(value === "bank") document.getElementById(formId + "Bank").classList.add("show");
    if(value === "mobile") document.getElementById(formId + "Mobile").classList.add("show");
    if(value === "card") document.getElementById(formId + "Card").classList.add("show");
  });
}
["cart", "bulk", "custom"].forEach(setupPaymentDropdown);

// ===== Bulk & Custom Order Forms =====
document.getElementById("bulkForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("🎉 Bulk order submitted! Our team will contact you shortly.");
  e.target.reset();
});

document.getElementById("customForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("🎂 Custom order submitted! Expect a confirmation soon.");
  e.target.reset();
});
