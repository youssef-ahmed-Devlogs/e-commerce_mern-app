const router = require("express").Router({ mergeParams: true });
const OrderController = require("../controllers/OrderController");
const AuthController = require("../controllers/AuthController");

router.use(AuthController.auth);

router.post("/checkout", OrderController.createCheckoutSession);
router.get("/my-orders", OrderController.getMyOrders);
router.get("/my-orders/:orderId", OrderController.getOneFromMyOrders);

// router.use(AuthController.restrictTo("admin"));
router.route("/").get(OrderController.get).post(OrderController.create);
router
  .route("/:id")
  .get(OrderController.getOne)
  .patch(OrderController.update)
  .delete(OrderController.delete);

module.exports = router;
