require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const { signin, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const {
  celebrate,
  Joi,
  Segments,
  validateURL,
} = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/aroundb" } =
  process.env;

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use(requestLogger);

mongoose.connect(MONGO_URL);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  signin,
);
app.post(
  "/signup",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL).optional(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);

app.use(auth);

const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
