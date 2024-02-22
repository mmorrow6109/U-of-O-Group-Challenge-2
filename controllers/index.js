const express = require('express')
const router = express.Router()
const userRoutes = require('./api/userRoutes');
const recipeRoutes = require('./api/recipeRoutes')
const commentRoutes = require('./api/commentRoutes')
const homeRoutes = require("./homeRoutes")

router.use("/api/users", userRoutes)
router.use("/api/recipe", recipeRoutes)
router.use("/api/comments", commentRoutes)
router.use("/", homeRoutes)

router.get("/session", (req, res) => {
    res.json(req.session)
})

module.exports = router;