const Product = require("../models/Product");
const FactoryController = require("./FactoryController");

exports.get = FactoryController.get(Product);
exports.getOne = FactoryController.getOne(Product);
exports.create = FactoryController.create(Product);
exports.update = FactoryController.update(Product);
exports.delete = FactoryController.delete(Product);
