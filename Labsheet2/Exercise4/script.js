function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !mobile || !password) {
        alert("All fields are mandatory");
        return;
    }

    if (!/^\d{10}$/.test(mobile)) {
        alert("Mobile number must be 10 digits");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    const users = getUsers();

    if (users.some(user => user.email === email)) {
        alert("Email already registered");
        return;
    }

    users.push({ name, email, mobile, password });
    saveUsers(users);
    displayUsers();
    event.target.reset();
}

function displayUsers() {
    const users = getUsers();
    const table = document.getElementById("userTable");
    table.innerHTML = "";

    users.forEach((user, index) => {
        table.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td>
                    <button class="delete-btn" onclick="deleteUser(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteUser(index) {
    const users = getUsers();
    users.splice(index, 1);
    saveUsers(users);
    displayUsers();
}

function clearAllUsers() {
    if (confirm("Are you sure you want to delete all users?")) {
        localStorage.removeItem("users");
        displayUsers();
    }
}

displayUsers();
