const Slider = require("../models/Slider");
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

exports.uploadSlide = upload.single("image");

exports.get = FactoryController.get(Slider);
exports.getOne = FactoryController.getOne(Slider);
exports.create = FactoryController.create(Slider);
exports.update = FactoryController.update(Slider);
exports.delete = FactoryController.delete(Slider);
