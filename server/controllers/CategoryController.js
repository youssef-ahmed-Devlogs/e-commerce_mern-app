const Category = require("../models/Category");
const FactoryController = require("./FactoryController");
const multer = require("multer");

exports.get = FactoryController.get(Category);
exports.getOne = FactoryController.getOne(Category);
exports.create = FactoryController.create(Category);
exports.update = FactoryController.update(Category);
exports.delete = FactoryController.delete(Category);

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please provide a valid image ( jpg, jpeg, png)"), true);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCover = upload.single("cover");
