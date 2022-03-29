const express = require("express");
const categoryRoutes = require("./category");
const mongoose = require("mongoose");
const userRoutes = require("./user");
const expenseRoutes = require("./expenses");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// mongoose connect
mongoose.connect(
  "mongodb+srv://retouch226:79616324488ok@cluster0.aj61i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/category", categoryRoutes);
app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes);

// app.use((request, response, next) => {
//   response.status(200).json({ message: "!!!!!" });
// });
module.exports = app;
