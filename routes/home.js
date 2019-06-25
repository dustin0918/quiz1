const express = require("express");
const router = express.Router();
const knex = require("../db/client");
const timeStamp = require("../timestamp/timeStamp");

router.get("/", (req, res) => {
  if (req.cookies.username) {
    knex("clucks")
      .where({
        username: req.cookies.username
      })
      .orderBy("createdAt", "DESC")
      .then(data => {
        res.render("clucks/index", {
          clucks: data,
          username: req.cookies.username,
          timeStamp: timeStamp,
        });
      });
  } else {
    res.render("login", {
      username: false
    });
  }
});

const COOKIE_AGE = 1000 * 60 * 60 * 24 * 1;
router.post("/", (req, res) => {
  const username = req.body.username;
  res.cookie("username",username, req.body.username, {
  age: COOKIE_AGE
  });
  res.redirect("/clucks");
});

router.post("/sign_out", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

module.exports = router;