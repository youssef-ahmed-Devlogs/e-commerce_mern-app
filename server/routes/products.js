const router = require("express").Router();
const ProductController = require("../controllers/ProductController");
const AuthController = require("../controllers/AuthController");

router.use(AuthController.auth);
// router.use(AuthController.restrictTo("admin"));

router.route("/").get(ProductController.get).post(ProductController.create);
router
  .route("/:id")
  .get(ProductController.getOne)
  .patch(ProductController.update)
  .delete(ProductController.delete);

module.exports = router;
