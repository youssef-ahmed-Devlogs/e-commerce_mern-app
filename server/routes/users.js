const router = require("express").Router();
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");

// Auth routes
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/verifyEmail/:token", AuthController.verifyEmail);

router.use(AuthController.auth);

router.post("/logout", AuthController.logout);

// router.use(AuthController.restrictTo("admin"));

// Admin Panel
router.route("/").get(UserController.get).post(UserController.create);
router
  .route("/:id")
  .get(UserController.getOne)
  .patch(UserController.update)
  .delete(UserController.delete);
router.patch("/:id/updatePassword", UserController.updatePassword);

module.exports = router;
