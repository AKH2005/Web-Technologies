// PRODUCT LIST
let products = [
  { name: "Laptop", category: "electronics", price: 45000 },
  { name: "Headphones", category: "electronics", price: 2500 },
  { name: "Shoes", category: "fashion", price: 1800 },
  { name: "T-Shirt", category: "fashion", price: 600 }
];

let cart = {};

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");

products.forEach((p, index) => {
  productList.innerHTML += `
    <div class="product">
      <strong>${p.name}</strong><br>
      Category: ${p.category}<br>
      Price: ₹${p.price}<br><br>
      <button onclick="addToCart(${index})">Add to Cart</button>
    </div>
  `;
});


function addToCart(index) {
  let p = products[index];

  if (!cart[p.name]) {
    cart[p.name] = { ...p, quantity: 1 };
  } else {
    cart[p.name].quantity++;
  }

  updateCart();
}

function removeItem(name) {
  delete cart[name];
  updateCart();
}


function updateQuantity(name, qty) {
  if (qty <= 0) removeItem(name);
  else cart[name].quantity = parseInt(qty);

  updateCart();
}



// BULK DISCOUNT: 10% off if qty >= 5
function bulkDiscount(total, qty) {
  return qty >= 5 ? total * 0.90 : total;
}

// CATEGORY DISCOUNT: fashion → 5% off
function categoryDiscount(total, category) {
  return category === "fashion" ? total * 0.95 : total;
}

// COUPON DISCOUNT: SAVE10, SAVE20, ELEC20
function applyCoupon(total) {
  let code = couponInput.value.trim().toUpperCase();
  let msg = "";

  // SAVE10, SAVE20...
  if (code.startsWith("SAVE")) {
    let percent = parseInt(code.slice(4));
    msg = `${percent}% off applied`;
    total -= (total * percent) / 100;
  }

  // ELEC20 → only electronics
  else if (code.startsWith("ELEC")) {
    let percent = parseInt(code.slice(4));
    msg = `${percent}% off electronics`;

    Object.values(cart).forEach(item => {
      if (item.category === "electronics") {
        total -= item.price * item.quantity * (percent / 100);
      }
    });
  }

  document.getElementById("discountInfo").textContent = msg;
  return total;
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  Object.values(cart).forEach(item => {
    let itemTotal = item.price * item.quantity;

    // Discount rules
    itemTotal = bulkDiscount(itemTotal, item.quantity);
    itemTotal = categoryDiscount(itemTotal, item.category);

    cartItems.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong><br>
        Price: ₹${item.price}<br>
        Qty: 
        <input type="number" value="${item.quantity}"
               onchange="updateQuantity('${item.name}', this.value)">
        <button onclick="removeItem('${item.name}')">Remove</button>

        <p><b>Subtotal: ₹${itemTotal.toFixed(2)}</b></p>
      </div>
    `;

    total += itemTotal;
  });

  total = applyCoupon(total);

  document.getElementById("totalPrice").textContent = total.toFixed(2);
}

// Real-time updates when typing coupon
document.getElementById("couponInput").addEventListener("input", updateCart);

// Clear cart button
document.getElementById("clearCartBtn").addEventListener("click", () => {
  cart = {};
  updateCart();
});
