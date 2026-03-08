const express = require("express");

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const router = express.Router();

router.get("/", getAllCards);

router.post("/", createCard);

router.delete("/:id", deleteCard);

router.put("/:id/likes", likeCard);

router.delete("/:id/likes", dislikeCard);

module.exports = router;
