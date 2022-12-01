const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const AuthController = require("../controllers/AuthController");

router.use(AuthController.auth);
router.use(AuthController.restrictTo("admin"));

router.route("/").get(CategoryController.get).post(CategoryController.create);
router
  .route("/:id")
  .get(CategoryController.getOne)
  .patch(CategoryController.update)
  .delete(CategoryController.delete);

module.exports = router;
