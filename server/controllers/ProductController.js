const Product = require("../models/Product");
const catchAsync = require("../helpers/catchAsync");
const FactoryController = require("./FactoryController");

exports.get = FactoryController.get(Product);
exports.getOne = FactoryController.getOne(Product);
exports.create = FactoryController.create(Product);
exports.update = FactoryController.update(Product);
exports.delete = FactoryController.delete(Product);
