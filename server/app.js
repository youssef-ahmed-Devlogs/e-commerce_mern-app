const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const dotnet = require("dotenv");
const cors = require("cors");
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const usersRoutes = require("./routes/users");
const reviewsRoutes = require("./routes/reviews");
const favoritesRoutes = require("./routes/favorites");
const cartsRoutes = require("./routes/carts");
const ordersRoutes = require("./routes/orders");
const sliderRoutes = require("./routes/slider");
const ErrorController = require("./controllers/ErrorController");

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.options("*", cors());

app.use(express.json({ limit: "10kb" }));
dotnet.config({ path: "./config.env" });

if (process.env.NODE_ENV == "development") app.use(morgan("dev"));

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/favorite", favoritesRoutes);
app.use("/api/v1/cart", cartsRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/slider", sliderRoutes);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Not found 404! this route is not defined on this server: ${req.originalUrl}`,
  });
});

app.use(ErrorController);

module.exports = app;
