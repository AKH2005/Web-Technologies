const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

// Fetch all products
async function fetchProducts() {
  const res = await fetch("/products");
  const products = await res.json();

  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p><strong>Price:</strong> ₹${product.price}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>
    `;

    productList.appendChild(div);
  });
}

// Add new product
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;

  await fetch("/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, price, category })
  });

  productForm.reset();
  fetchProducts();
});

// Delete product
async function deleteProduct(id) {
  await fetch(`/products/${id}`, {
    method: "DELETE"
  });

  fetchProducts();
}

// Load products when page opens
fetchProducts();