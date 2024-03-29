const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const { User, Recipe, Comment } = require('../models');

router.get('/', async (req, res) => {
    Recipe.findAll({include: [User]}).then(blogs => {
        const hbsRecipes = blogs.map(recipe => recipe.get({plain:true}))
        const loggedIn = req.session?.user ? true:false;
        res.render('home', {recipes:hbsRecipes, loggedIn, username:req.session?.user?.username})
    })
})
// ex. localhost:3001/login
router.get("/login", (req, res) => {
    if (req.session?.user) {
        return res.redirect('/profile')
    }
    res.render('login') // this is pointing to the handlebars file
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

// // this takes us to the default profile page with no authentication required
// router.get("/profile", (req, res) => {
//     res.render("profile")
// })

// this takes us to the profile page with authentication required
router.get("/profile", withAuth, (req, res) => {
    res.render("profile"); // Render user-specific profile.handlebars
});

router.get("/recipe/:id", (req, res) => {
    if(!req.session.user) {
        return res.redirect('/login')
    }
    Recipe.findByPk(req.params.id, {
        include: [User, {model: Comment, include: [User]}]})
    .then(dbRecipe => {
        const hbsRecipe = dbRecipe.get({plain:true})
        const loggedIn = req.session.user
        if (dbRecipe.userId != req.session.user.id) {
            return res.render('comment', {hbsRecipe, loggedIn, username: req.session.user.username})
        }
        res.render("updateDelete", {hbsRecipe, loggedIn, username: req.session.user.username})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ msg: "error occured", err })
    })
})

router.get("/viewallusers", (req, res) => {
    user.findAll().then(alluserData => {
        const alluserDataHbsData = alluserData.map(allusers => allusers.get({ plain: true}))
        res.render("allusers", alluserDataHbsData)
    })
})

router.get("*", (req, res) => {
    res.redirect("/")
})

module.exports = router