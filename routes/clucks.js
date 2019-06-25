const express = require('express');
const router = express.Router();
const knex = require("../db/client");
const timeStamp = require("../timestamp/timeStamp");

router.get('/', (req, res) => {
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

router.get("/new", (req, res) => {
    if (req.cookies.username) {
        res.render("clucks/new");
    }
});


router.post("/", (req, res) => {
    knex()
        .insert({
            username: req.cookies.username,
            content: req.body.content,
            image_url: req.body.image_url
        })
        .into("clucks")
        .returning("*")
        .then(data => {
            res.redirect('/clucks');
        });
});

module.exports = router;