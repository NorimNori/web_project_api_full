const Card = require("../models/cards");

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).json(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Datos inválidos";
      }

      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const err = new Error("No tienes permiso para eliminar esta tarjeta");
        err.statusCode = 403;
        throw err;
      }

      return card.deleteOne().then(() => {
        res.status(200).json({
          message: "Tarjeta eliminada correctamente",
        });
      });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Tarjeta no encontrada";
      }

      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID inválido";
      }

      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Tarjeta no encontrada";
      }

      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID inválido";
      }

      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Tarjeta no encontrada";
      }

      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID inválido";
      }

      next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
