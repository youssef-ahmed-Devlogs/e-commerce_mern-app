const catchAsync = require("../helpers/catchAsync");
const resizeImage = require("../helpers/resizeImage");
const fs = require("fs");
const ApiHandle = require("../helpers/ApiHandle");

exports.get = (Model) =>
  catchAsync(async (req, res, next) => {
    // ============== Nested routes =================
    // from reviews routes
    let filterReviewsInProduct = {};
    if (req.params.productId)
      filterReviewsInProduct = { product: req.params.productId };

    // from products routes
    let filterProductsInCategory = {};
    if (req.params.categoryId)
      filterProductsInCategory = { categories: req.params.categoryId };

    const handle = new ApiHandle(
      Model.find({ ...filterReviewsInProduct, ...filterProductsInCategory }),
      req.query
    )
      .filter()
      .sort()
      .selectFields()
      .paginate();

    const handleTotal = new ApiHandle(
      Model.find({ ...filterReviewsInProduct, ...filterProductsInCategory }),
      req.query
    )
      .filter()
      .sort()
      .selectFields();

    const data = await handle.query;
    const total = await handleTotal.query;

    res.status(200).json({
      status: "success",
      results: data.length,
      page: req.query.page * 1 || 1,
      total: total.length,
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

      if (Model.collection.collectionName == "sliders") {
        req.body.image = filename;
      }
    }

    // check when user upload images and set req.body.images[]
    if (req.files && req.files.length) {
      req.body.images = [];

      req.files.forEach((file, i) => {
        req.body.images.push(
          `${Model.collection.collectionName}-${
            req.user._id
          }-${Date.now()}-${i}.jpeg`
        );
      });
    }

    // Set who created this document
    req.body.createdBy = req.user._id;

    // Create the data in database
    const data = await Model.create(req.body);

    // check when user upload image and upload it
    if (req.file) {
      const path = `public/storage/${Model.collection.collectionName}`;

      if (Model.collection.collectionName == "users") {
        const resized = resizeImage(req.file.buffer, {
          width: 500,
          height: 500,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.photo}`);
      }

      if (Model.collection.collectionName == "categories") {
        const resized = resizeImage(req.file.buffer, {
          width: 1000,
          height: 1000,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.cover}`);
      }

      if (Model.collection.collectionName == "sliders") {
        const resized = resizeImage(req.file.buffer, {
          width: 1920,
          height: 1080,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.image}`);
      }
    }

    // check when user upload images and upload them
    if (req.files && req.files.length) {
      const path = `public/storage/${Model.collection.collectionName}`;

      const arrayOfPromises = req.files.map(async (file, i) => {
        const resized = resizeImage(file.buffer, {
          width: 1000,
          height: 1000,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.images[i]}`);
      });

      await Promise.all(arrayOfPromises);
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

      if (Model.collection.collectionName == "sliders") {
        req.body.image = filename;
      }
    }

    // check when user upload images and set req.body.images[]
    if (req.files && req.files.length) {
      req.body.images = [];

      req.files.forEach((file, i) => {
        req.body.images.push(
          `${Model.collection.collectionName}-${
            req.user._id
          }-${Date.now()}-${i}.jpeg`
        );
      });
    }

    req.body.password = undefined;
    req.body.passwordConfirm = undefined;

    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    if (!data) {
      return next(new Error("This collection is not exist."));
    }

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

      if (
        Model.collection.collectionName == "sliders" &&
        !data.image.startsWith("default")
      ) {
        if (fs.existsSync(`${path}/${data.image}`)) {
          fs.unlinkSync(`${path}/${data.image}`);
        }
      }

      // check when user upload image and upload it

      if (Model.collection.collectionName == "users") {
        const resized = resizeImage(req.file.buffer, {
          width: 500,
          height: 500,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.photo}`);
      }

      if (Model.collection.collectionName == "categories") {
        const resized = resizeImage(req.file.buffer, {
          width: 1000,
          height: 1000,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.cover}`);
      }

      if (Model.collection.collectionName == "sliders") {
        const resized = resizeImage(req.file.buffer, {
          width: 1920,
          height: 1080,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.image}`);
      }
    }

    // check when user upload images
    if (req.files && req.files.length) {
      const path = `public/storage/${Model.collection.collectionName}`;

      // Delete the old images
      data.images.forEach((img) => {
        if (fs.existsSync(`${path}/${img}`)) {
          fs.unlinkSync(`${path}/${img}`);
        }
      });

      // upload new images
      const arrayOfPromises = req.files.map(async (file, i) => {
        const resized = resizeImage(file.buffer, {
          width: 1000,
          height: 1000,
          quality: 90,
        });
        await resized.toFile(`${path}/${req.body.images[i]}`);
      });

      await Promise.all(arrayOfPromises);
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.delete = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);

    if (!data) return next(new Error("Something went wrong."));

    await data.delete();

    // Delete the resource image after deleted the main resource
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

    // Delete the resource images after deleted the main resource
    if (Model.collection.collectionName == "products") {
      data.images.forEach((img) => {
        if (fs.existsSync(`${path}/${img}`)) {
          fs.unlinkSync(`${path}/${img}`);
        }
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
