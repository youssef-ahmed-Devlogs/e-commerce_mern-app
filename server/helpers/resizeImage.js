const sharp = require("sharp");

const resizeImage = (req, options) => {
  const { width, height, quality } = options;

  return sharp(req.file.buffer)
    .resize(width, height)
    .toFormat("jpeg")
    .jpeg({ quality });
};

module.exports = resizeImage;
