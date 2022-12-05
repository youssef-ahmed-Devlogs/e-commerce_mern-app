const router = require("express").Router();
const CartController = require("../controllers/CartController");
const AuthController = require("../controllers/AuthController");

router.use(AuthController.auth);

router.route("/").get(CartController.getMyCart).post(CartController.addToCart);

router
  .route("/:productId")
  .patch(CartController.updateMyCart)
  .delete(CartController.removeFromCart);

module.exports = router;
