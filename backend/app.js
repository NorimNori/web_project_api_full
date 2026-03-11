const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;

const { signin, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

app.post("/signin", signin);
app.post("/signup", createUser);

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

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
