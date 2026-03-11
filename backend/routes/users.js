const express = require("express");

const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

const {
  celebrate,
  Joi,
  Segments,
  validateURL,
} = require("../middlewares/validation");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/me", getCurrentUser);

router.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  getUser,
);

router.patch(
  "/me",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  "/me/avatar",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar,
);

module.exports = router;
