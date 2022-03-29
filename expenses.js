const express = require("express");
const router = express.Router();
const Category = require("./categoriesModel");
const Expenses = require("./expensesModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("./check-auth");
const { getDate } = require("./user");

router.get("/:userId", (req, res) => {
  // const today = new Date().toLocaleDateString("en-US");
  // console.log(today);
  Expenses.find({
    userId: req.params.userId,
    date: req.query.date,
  })
    // .sort({ date: +1 })
    .select("categoryId category date moneyAmount")
    .then((answer) => {
      if (answer === null) {
        return res.status(404).json({ message: "not exist" });
      } else {
        console.log(answer);
        // const cat = Category.findById(answer.categoryId);
        // console.log(cat.id);
        return res.status(200).json({ answer });
      }
    })
    .catch((err) => {
      console.error("error: ", err);
    });
});

// router.get("/:userId&:date", (req, res) => {
//   const today = new Date().toLocaleDateString("en-US");
//   console.log(today);
//   Expenses.find({
//     userId: req.params.userId,
//     date: req.params.date,
//   })
//     // .sort({ date: +1 })
//     .select("categoryId category date moneyAmount")
//     .then((answer) => {
//       if (answer === null) {
//         return res.status(404).json({ message: "not exist" });
//       } else {
//         console.log(answer);
//         // const cat = Category.findById(answer.categoryId);
//         // console.log(cat.id);
//         return res.status(200).json({ answer });
//       }
//     })
//     .catch((err) => {
//       console.error("error: ", err);
//     });
// });

// router.get("/:userId", (req, res) => {
//   Expenses.find({ userId: req.params.userId })
//     .select("categoryId date moneyAmount")
//     .then((answer) => {
//       //console.log(answer[0].categoryId);
//       const categoryName = Category.findById(answer[0].categoryId).select(
//         "name"
//       );
//       return { answer, categoryName };
//     })
//     .then((data) => {
//       console.log("data", data.categoryName.name);
//     })
//     .catch((err) => {
//       console.error("error: ", err);
//     });
// });

router.post("/", (req, res) => {
  if (req.body !== null) {
    const expense = new Expenses({
      _id: new mongoose.Types.ObjectId(),
      categoryId: req.body.categoryId,
      category: req.body.category,
      userId: req.body.userId,
      // date: Date.parse(new Date().toLocaleDateString()),
      date: req.body.date,
      moneyAmount: req.body.moneyAmount,
    });
    expense
      .save()
      .then((result) => {
        return res.status(200).json({
          NewExpenses: result,
        });
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }
});

function getTime() {
  let date = new Date().toLocaleDateString("en-US");
  console.log(date);
  return date;
}

module.exports = router;
