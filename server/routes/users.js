const router = require("express").Router();
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");

// Auth routes
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/verifyEmail/:token", AuthController.verifyEmail);
router.post("/forgotPassword", AuthController.forgotPassword);
router.patch("/resetPassword/:token", AuthController.resetPassword);

router.use(AuthController.auth);

router.post("/logout", AuthController.logout);
router.post("/terminateSession", AuthController.terminateSession);

router.patch("/updateMe", UserController.uploadPhoto, UserController.updateMe);
router.patch("/updateMyPassword", UserController.updateMyPassword);
router
  .route("/favorite")
  .get(UserController.getFavorites)
  .post(UserController.addToFavorite);

// router.use(AuthController.restrictTo("admin"));

// Admin Panel
router
  .route("/")
  .get(UserController.get)
  .post(UserController.uploadPhoto, UserController.create);

router
  .route("/:id")
  .get(UserController.getOne)
  .patch(UserController.uploadPhoto, UserController.update)
  .delete(UserController.delete);
router.patch("/:id/updatePassword", UserController.updatePassword);

module.exports = router;
