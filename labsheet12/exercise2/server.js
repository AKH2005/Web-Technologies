const express = require("express");
const path = require("path");

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// 🔹 Global Middleware 1
app.use((req, res, next) => {
  console.log("🔹 Middleware 1: Request received");
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});


// 🔹 Global Middleware 2
app.use((req, res, next) => {
  console.log("🔹 Middleware 2: Processing request...");
  next();
});


// 🔹 Route-level Middleware
const routeMiddleware = (req, res, next) => {
  console.log("🔹 Route Middleware: Checking admin access...");
  next();
};


// Routes
app.get("/home", (req, res) => {
  res.json({ message: "Home Route Accessed" });
});

app.get("/about", (req, res) => {
  res.json({ message: "About Route Accessed" });
});

app.get("/admin", routeMiddleware, (req, res) => {
  res.json({ message: "Admin Route Accessed" });
});


// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});