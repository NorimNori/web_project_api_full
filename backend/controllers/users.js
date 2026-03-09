const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const JWT_SECRET = "9N8W+68UMc'K<";

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error interno del servidor" });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({
          message: "Usuario no encontrado",
        });
      }

      if (err.name === "CastError") {
        return res.status(400).json({
          message: "ID inválido",
        });
      }

      res.status(500).json({
        message: "Error interno del servidor",
      });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) => {
      res.status(201).json(user);
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

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Datos inválidos" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(500).json({ message: "Error interno del servidor" });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Datos inválidos" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(500).json({ message: "Error interno del servidor" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Correo o contraseña incorrectos",
        });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res.status(401).json({
            message: "Correo o contraseña incorrectos",
          });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.json({ token });
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Error interno del servidor",
      });
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
