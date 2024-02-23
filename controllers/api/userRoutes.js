const express = require("express")
const router = express.Router()
const { User, Recipe, Comment } = require('../../models')
const bcrypt = require("bcrypt")

router.get("/", (req, res) => {
    User.findAll({
        include: [Recipe, Comment]
    })
        .then(dbUsers => {
            res.json(dbUsers)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ msg: "error occured", err })
        })
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id, {include: [Recipe, Comment]})
        .then(dbUser => {
            res.json(dbUser)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ msg: "error occured", err })
        })
})

// sign up
router.post("/", (req, res) => {
    User.create(req.body, {individualHooks: true})
        .then(newUser => {
            req.session.user = {
                id:newUser.id,
                username:newUser.username
            }
            res.json
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ msg: "error occured", err })
        })
})

// login
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username:req.body.username
        }
    }).then(foundUser => {
        if(!foundUser) {
            return res.status(400).json({ msg:"Wrong login"})
        }
        if(bcrypt.compareSync(req.body.password,foundUser.password)){
            req.session.user = {
                id:foundUser.id,
                username: foundUser.username
            }
            return res.json(foundUser)
        } else {
            return res.status(400).json({ msg: "Wrong login", err })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ msg: "error occured", err })
    })
})

router.put("/:id", (req, res) => {
    user.update(req.body, {
        where: {
            id: req.params.id
        },
        individualHooks: true
    }).then(updatedUser => {
        res.json(updatedUser)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ msg: "error occured", err})
    })
})

router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbUser => { //does this need to be delUser?
        res.json(delUser)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ msg: "error occured", err})
    })
})

module.exports = router