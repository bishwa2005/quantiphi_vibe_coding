const express = require("express");
const cors = require("cors");
const productsRouter = require("./src/routes/products");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "stockroom-backend" });
});

app.use("/api/products", productsRouter);

// Fallback 404 for anything else under /api
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Stockroom API listening on http://localhost:${PORT}`);
});
