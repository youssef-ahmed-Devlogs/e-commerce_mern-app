const Product = require("../models/Product");
const FactoryController = require("./FactoryController");
const multer = require("multer");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `[ ${file.originalname} ] is not an image. Please provide a valid images ( jpg, jpeg, png)`
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImages = upload.array("images");

exports.get = FactoryController.get(Product);
exports.getOne = FactoryController.getOne(Product);
exports.create = FactoryController.create(Product);
exports.update = FactoryController.update(Product);
exports.delete = FactoryController.delete(Product);
