const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

router.route("/").get(CategoryController.get).post(CategoryController.create);
router
  .route("/:id")
  .get(CategoryController.getOne)
  .patch(CategoryController.update)
  .delete(CategoryController.delete);

module.exports = router;