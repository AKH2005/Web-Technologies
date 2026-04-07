const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const path = require("path");

const app = express();
const PORT = 5002;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});