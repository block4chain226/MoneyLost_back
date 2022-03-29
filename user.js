const express = require("express");
const router = express.Router();
const User = require("./usersModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("./check-auth");
/////////Update https://youtu.be/WDrU305J1yw?t=1742

router.get("/", (req, res) => {
  return User.find({})
    .select("id name email password")
    .then((answer) => {
      return res.status(200).json({ answer });
    });
});

router.get("/:id", (req, res) => {
  return User.findById(req.params.id)
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ eror: err });
    });
  res.status(200).json({});
});

router.post("/signup", (req, res) => {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length >= 1) {
      return res.status(409).json({ message: "email exist", user });
    } else {
      bcrypt.hash(req.body.password, 1, (err, hash) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          //create new user
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
          });
          //save to mongoDB
          console.log("start...");
          user
            .save()
            .then((result) => {
              console.log(result);
              res.status(200).json({
                NewUser: user.name,
              });
            })
            .catch((err) => console.error("error: ", err));
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  User.find({ email: req.body.email }).then((user) => {
    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            id: user[0].id,
          },
          process.env.JWT_KEY,
          { expiresIn: "3h" }
        );
        //console.log(token);
        return res.status(200).json({
          //message: "Auth successful",
          userid: user[0]._id,
          useremail: user[0].email,
          token: token,
        });
      }
      res.status(401).json({ message: "Auth failed" });
    });
  });
});

router.post("/:id", (req, res) => {
  const id = req.params.id;
  User.remove({ _id: id })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.error("error: ", err));
});

//exports.User = user;

function getTime() {
  return new Date().toLocaleDateString();
}
module.exports = router;
exports.getDate = getTime();
