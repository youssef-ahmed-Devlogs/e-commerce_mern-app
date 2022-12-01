const slugify = (text) => text.split(" ").join("-").toLowerCase();

module.exports = slugify;
