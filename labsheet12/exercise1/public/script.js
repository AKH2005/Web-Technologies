const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

// Fetch all users
async function fetchUsers() {
  const res = await fetch("/users");
  const users = await res.json();

  userList.innerHTML = "";

  users.forEach(user => {
    const div = document.createElement("div");
    div.classList.add("user-card");

    div.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Age:</strong> ${user.age}</p>
      <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
    `;

    userList.appendChild(div);
  });
}

// Add user
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  await fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, age })
  });

  userForm.reset();
  fetchUsers();
});

// Delete user
async function deleteUser(id) {
  await fetch(`/users/${id}`, {
    method: "DELETE"
  });

  fetchUsers();
}

// Load users when page opens
fetchUsers();