const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const JWT_SECRET = "9N8W+68UMc'K<";

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .orFail()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Usuario no encontrado";
      }

      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID inválido";
      }

      next(err);
    });
};

const createUser = (req, res, next) => {
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
        err.statusCode = 400;
        err.message = "Datos inválidos";
      }

      if (err.code === 11000) {
        err.statusCode = 409;
        err.message = "El correo ya está registrado";
      }

      next(err);
    });
};

const updateUser = (req, res, next) => {
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
        err.statusCode = 400;
        err.message = "Datos inválidos";
      }

      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Usuario no encontrado";
      }

      next(err);
    });
};

const updateAvatar = (req, res, next) => {
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
        err.statusCode = 400;
        err.message = "Datos inválidos";
      }

      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Usuario no encontrado";
      }

      next(err);
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const err = new Error("Correo o contraseña incorrectos");
        err.statusCode = 401;
        throw err;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error("Correo o contraseña incorrectos");
          err.statusCode = 401;
          throw err;
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        res.json({ token });
      });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
        err.message = "Usuario no encontrado";
      }

      next(err);
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  signin,
  getCurrentUser,
};
