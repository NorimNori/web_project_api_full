const express = require("express");

const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.patch("/me", updateUser);

router.patch("/me/avatar", updateAvatar);

module.exports = router;
