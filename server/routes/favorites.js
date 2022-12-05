const router = require("express").Router();
const FavoriteController = require("../controllers/FavoriteController");
const AuthController = require("../controllers/AuthController");

router.use(AuthController.auth);

router
  .route("/")
  .get(FavoriteController.getFavorites)
  .post(FavoriteController.addToFavorite);

router.delete("/:productId", FavoriteController.removeFromFavorite);

module.exports = router;
