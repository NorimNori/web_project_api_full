const Card = require("../models/cards");

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error interno del servidor",
      });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).json(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({
          message: "Datos inválidos",
        });
      }

      res.status(500).json({
        message: "Error interno del servidor",
      });
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;

  return Card.findById(id)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).json({
          message: "No tienes permiso para eliminar esta tarjeta",
        });
      }

      return card.deleteOne().then(() => {
        res.status(200).json({
          message: "Tarjeta eliminada correctamente",
        });
      });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({
          message: "Tarjeta no encontrada",
        });
      }

      if (err.name === "CastError") {
        return res.status(400).json({
          message: "ID inválido",
        });
      }

      return res.status(500).json({
        message: "Error interno del servidor",
      });
    });
};

const likeCard = (req, res) => {
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
        return res.status(404).json({ message: "Tarjeta no encontrada" });
      }

      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID inválido" });
      }

      res.status(500).json({ message: "Error interno del servidor" });
    });
};

const dislikeCard = (req, res) => {
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
        return res.status(404).json({ message: "Tarjeta no encontrada" });
      }

      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID inválido" });
      }

      res.status(500).json({ message: "Error interno del servidor" });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
