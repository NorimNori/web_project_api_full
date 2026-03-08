const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6990fa2d35969610fb8d3ba4",
  };

  next();
});

mongoose.connect("mongodb://localhost:27017/aroundb");

const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
