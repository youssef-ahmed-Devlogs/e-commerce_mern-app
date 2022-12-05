const router = require("express").Router({ mergeParams: true });
const ReviewController = require("../controllers/ReviewController");
const AuthController = require("../controllers/AuthController");

router.use(AuthController.auth);
// router.use(AuthController.restrictTo("admin"));

router.route("/").get(ReviewController.get).post(ReviewController.create);
router
  .route("/:id")
  .get(ReviewController.getOne)
  .patch(ReviewController.checkBelongTo, ReviewController.update)
  .delete(ReviewController.checkBelongTo, ReviewController.delete);

module.exports = router;
