const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const AuthController = require("../controllers/AuthController");
const productsRoutes = require("../routes/products");

router.use(AuthController.auth);
// router.use(AuthController.restrictTo("admin"));

router.use("/:categoryId/products", productsRoutes);

router
  .route("/")
  .get(CategoryController.get)
  .post(CategoryController.uploadCover, CategoryController.create);
router
  .route("/:id")
  .get(CategoryController.getOne)
  .patch(CategoryController.uploadCover, CategoryController.update)
  .delete(CategoryController.delete);

module.exports = router;
