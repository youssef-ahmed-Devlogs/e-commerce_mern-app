const catchAsync = require("../helpers/catchAsync");
const resizeImage = require("../helpers/resizeImage");
const fs = require("fs");

exports.get = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.find();
    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.create = (Model) =>
  catchAsync(async (req, res, next) => {
    // check when user upload image and set req.body.imageName
    if (req.file) {
      const filename = `${Model.collection.collectionName}-${
        req.user._id
      }-${Date.now()}.jpeg`;

      if (Model.collection.collectionName == "users") {
        req.body.photo = filename;
      }

      if (Model.collection.collectionName == "categories") {
        req.body.cover = filename;
      }
    }

    // Set who created this document
    req.body.createdBy = req.user._id;

    // Create the data in database
    const data = await Model.create(req.body);

    // check when user upload image and upload it
    if (req.file) {
      const path = `public/storage/${Model.collection.collectionName}`;

      if (Model.collection.collectionName == "users") {
        const resized = resizeImage(req, {
          width: 500,
          height: 500,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.photo}`);
      }

      if (Model.collection.collectionName == "categories") {
        const resized = resizeImage(req, {
          width: 1000,
          height: 1000,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.cover}`);
      }
    }

    res.status(201).json({
      status: "success",
      data,
    });
  });

exports.update = (Model) =>
  catchAsync(async (req, res, next) => {
    // check when user upload image and set req.body.imageName
    if (req.file) {
      const filename = `${Model.collection.collectionName}-${
        req.user._id
      }-${Date.now()}.jpeg`;

      if (Model.collection.collectionName == "users") {
        req.body.photo = filename;
      }

      if (Model.collection.collectionName == "categories") {
        req.body.cover = filename;
      }
    }

    req.body.password = undefined;
    req.body.passwordConfirm = undefined;

    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    // check when user upload image and delete the old image
    if (req.file) {
      const path = `public/storage/${Model.collection.collectionName}`;

      if (
        Model.collection.collectionName == "users" &&
        !data.photo.startsWith("default")
      ) {
        if (fs.existsSync(`${path}/${data.photo}`)) {
          fs.unlinkSync(`${path}/${data.photo}`);
        }
      }

      if (
        Model.collection.collectionName == "categories" &&
        !data.cover.startsWith("default")
      ) {
        if (fs.existsSync(`${path}/${data.cover}`)) {
          fs.unlinkSync(`${path}/${data.cover}`);
        }
      }
    }

    // check when user upload image and upload it
    if (req.file) {
      const path = `public/storage/${Model.collection.collectionName}`;

      if (Model.collection.collectionName == "users") {
        const resized = resizeImage(req, {
          width: 500,
          height: 500,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.photo}`);
      }

      if (Model.collection.collectionName == "categories") {
        const resized = resizeImage(req, {
          width: 1000,
          height: 1000,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.cover}`);
      }
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.delete = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.findOneAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
