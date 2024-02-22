const express = require("express")
const router = express.Router()
const {User, Recipe, Comment} = require("../../models")

router.get("/", (req, res) => {
    Comment.findAll({include: [User, Recipe]})
    .then(dbComments => {
        res.json(dbComments);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ msg: "error occured", err})
    })
});

router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id, {include: [User, Recipe]})
        .then(dbComment => {
            res.json(dbComment)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ msg: "error occured", err })
        })
})

router.post('/', (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({ msg: "Login first!"})
    }
        Comment.create({
            body:req.body.body,
            userId:req.session.user.id,
            recipeId:req.body.recipeId
        })
            .then(newComment => {
                res.json(newComment)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ msg: "error occured", err})
            })
})

router.put("/:id", (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({ msg: "Login first!", err })
    }
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updateComment => {
        res.json(updatedComment)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ msg: "error occured", err })
    })
})

router.delete("/:id", (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({ msg: "Login first!"})
    }
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(delComment => {
        res.json(delComment)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ msg: "error occured", err })
    })
})

module.exports = router;