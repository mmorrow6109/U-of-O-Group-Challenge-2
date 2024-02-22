const express = require("express")
const router = express.Router()
const { User, Recipe, Comment } = require("../../models")

router.get("/", (req, res) => {
    Recipe.findAll({ include: [User, Comment]})
    .then(dbRecipes => {
        res.json(dbRecipes)
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({ msg: "error occured", err })
    })
})

router.get("/:id", (req, res) => {
    Recipe.findByPk(req.params.id, {include: [User, Comment]})
        .then(dbRecipe => {
            res.json(dbRecipe)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ msg: "error occured", err })
        })
})

router.post("/", (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({ msg: "Login please!" })
    }
    Recipe.create({
        title:req.body.title,
        content:req.body.content,
        userId:req.session.user.id
    })
        .then(newRecipe => {
            res.json(newRecipe)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ msg: "error occured", err})
        })
})

router.put("/:id", (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({ msg: "Login please" })
    }
    Recipe.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updateRecipe => {
        res.json(updateRecipe)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ msg: "error occured", err})
    })
})

router.delete("/:id", (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({ msg: "error occured", err})
    }
        Recipe.destroy({
            where: {
                id: req.params.id
            }
        }).then(delRecipe => {
            res.json(delRecipe)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ msg: "error occured", err })
        })
})

module.exports = router;