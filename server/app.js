const express = require("express");
const app = express();
const morgan = require("morgan");
const dotnet = require("dotenv");
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");

app.use(express.json({ limit: "10kb" }));
dotnet.config({ path: "./config.env" });

if (process.env.NODE_ENV == "development") app.use(morgan("dev"));

app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/categories", categoriesRoutes);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Not found 404! this route is not defined on this server: ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  res.status(400).json({
    status: "fail",
    message: err.message,
    error: err,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
  res.end("222");
});

module.exports = app;
