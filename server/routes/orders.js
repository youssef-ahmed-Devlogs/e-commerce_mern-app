const router = require("express").Router({ mergeParams: true });
const OrderController = require("../controllers/OrderController");
const AuthController = require("../controllers/AuthController");

router.use(AuthController.auth);
// router.use(AuthController.restrictTo("admin"));

router.post("/checkout", OrderController.createCheckoutSession);

// router.route("/").get(OrderController.get).post(OrderController.create);
// router
//   .route("/:id")
//   .get(OrderController.getOne)
//   .patch(OrderController.update)
//   .delete(OrderController.delete);

module.exports = router;
