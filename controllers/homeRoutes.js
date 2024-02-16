const express = require('express');
const router = express.Router();
const { User, Recipe } = require('../models');

router.get('/', async (req, res) => {
    res.render('home', {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id
    })
})

router.get("/login")