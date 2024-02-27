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
            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.username = newUser.username;
                req.session.logged_in = true;
          
                res.status(200).json(newUser);
              });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ msg: "error occured", err })
        })
})

// login
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
          res
            .status(400)
            .json({ message: "Incorrect username or password, please try again" });
          return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
          res
            .status(400)
            .json({ message: "Incorrect username or password, please try again" });
          return;
        }
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.logged_in = true;

        //   // Redirect to "/profile" after successful login
        //   res.redirect("/profile");
    
          res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error occured", err });
    }
});

router.put("/:id", (req, res) => {
    user.update(req.body, {
        where: {
            id: req.params.id
        },
        individualHooks: true
    }).then(updatedUser => {
        res.json(updatedUser);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error occured", err });
    });
});

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
    }).then(delUser => { //does this need to be delUser?
        res.json(delUser)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ msg: "error occured", err})
    })
})

module.exports = router