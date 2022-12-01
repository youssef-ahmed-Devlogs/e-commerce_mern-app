const Category = require("../models/Category");
const catchAsync = require("../helpers/catchAsync");
const FactoryController = require("./FactoryController");

exports.get = FactoryController.get(Category);
exports.getOne = FactoryController.getOne(Category);
exports.create = FactoryController.create(Category);
exports.update = FactoryController.update(Category);
exports.delete = FactoryController.delete(Category);
