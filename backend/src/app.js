const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const challanRoutes = require("./routes/challanRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/products", productRoutes);

app.use("/api/stock", stockRoutes);

app.use("/api/challans", challanRoutes);

app.use("/api/dashboard", dashboardRoutes);

module.exports = app;

