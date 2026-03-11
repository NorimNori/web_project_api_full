const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports = {
  validateURL,
  celebrate,
  Joi,
  Segments,
};
