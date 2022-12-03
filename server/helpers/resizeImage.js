const sharp = require("sharp");

const resizeImage = (fileBuffer, options) => {
  const { width, height, quality } = options;

  return sharp(fileBuffer)
    .resize(width, height)
    .toFormat("jpeg")
    .jpeg({ quality });
};

module.exports = resizeImage;
