const express = require("express");
const router = express.Router();
const Category = require("./categoriesModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("./check-auth");

// const category = {
//   1: "food",
//   2: "entertainment",
//   3: "cafe",
//   4: "rent",
//   5: "taxi",
//   6: "cofe",
//   7: "alcohol",
//   8: "transport",
//   9: "clothes",
//   10: "technique",
//   11: "health",
// };

router.get("/", (req, res) => {
  return Category.find({})
    .select("name _id")
    .then((answer) => {
      return res.status(200).json({ answer });
    });
});

//add new category
router.post("/", (req, res) => {
  Category.find({ name: req.body.name }).then((category) => {
    if (category.length > 1) {
      return res
        .status(401)
        .json({ message: "Category already exist", category });
    } else {
      const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
      });
      category
        .save()
        .then((result) => {
          res.status(200).json({
            NewCategory: category.name,
          });
        })
        .catch((err) => {
          console.error("error: ", err);
        });
    }
  });
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  res.status(200).json({
    data: category[id],
  });
});

module.exports = router;
