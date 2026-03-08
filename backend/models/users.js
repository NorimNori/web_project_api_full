const mongoose = require("mongoose");
const validator = require("validator");

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },

  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function (value) {
        return urlRegex.test(value);
      },
      message: "La URL del avatar no es válido",
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Correo electrónico inválido",
    },
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
