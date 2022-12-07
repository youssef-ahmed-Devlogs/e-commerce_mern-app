const router = require("express").Router();
const SliderController = require("../controllers/SliderController");
const AuthController = require("../controllers/AuthController");

router.use(AuthController.auth);
// router.use(AuthController.restrictTo("admin"));

router
  .route("/")
  .get(SliderController.get)
  .post(SliderController.uploadSlide, SliderController.create);
router
  .route("/:id")
  .get(SliderController.getOne)
  .patch(SliderController.uploadSlide, SliderController.update)
  .delete(SliderController.delete);

module.exports = router;
