const express = require("express");

const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/me", getCurrentUser);

router.get("/:id", getUser);

router.patch("/me", updateUser);

router.patch("/me/avatar", updateAvatar);

module.exports = router;
