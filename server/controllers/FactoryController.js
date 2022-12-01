const catchAsync = require("../helpers/catchAsync");

exports.get = (Model) =>
  catchAsync(async (req, res) => {
    const data = await Model.find();
    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res) => {
    const data = await Model.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.create = (Model) =>
  catchAsync(async (req, res) => {
    const data = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data,
    });
  });

exports.update = (Model) =>
  catchAsync(async (req, res) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.delete = (Model) =>
  catchAsync(async (req, res) => {
    await Model.findOneAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
