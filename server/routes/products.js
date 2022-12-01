const router = require("express").Router();
const ProductController = require("../controllers/ProductController");

router.route("/").get(ProductController.get).post(ProductController.create);
router
  .route("/:id")
  .get(ProductController.getOne)
  .patch(ProductController.update)
  .delete(ProductController.delete);

module.exports = router;
