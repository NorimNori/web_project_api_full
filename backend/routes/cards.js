const express = require("express");

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const {
  celebrate,
  Joi,
  Segments,
  validateURL,
} = require("../middlewares/validation");

const router = express.Router();

router.get("/", getAllCards);

router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);

router.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteCard,
);

router.put(
  "/:id/likes",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  likeCard,
);

router.delete(
  "/:id/likes",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  dislikeCard,
);

module.exports = router;
