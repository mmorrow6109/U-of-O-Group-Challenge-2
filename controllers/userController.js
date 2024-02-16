const bcrypt = require('bcrypt');
const { User } = require('../models');

const userController = {
    signupForm: (req, res) => {
        res.render('signup'); // Render the signup form
    },
    signup: async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ username, password: hashedPassword });
            res.redirect('/login');
        } catch (error) {
            console.error('Error signing up:', error);
            res.status(500).send('Error signing up');
        }
    },
    loginForm: (req, res) => {
        res.render('login'); // Render the login form
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            if (user && await bcrypt.compare(password, user.password)) {
                req.session.user = user;
                res.redirect('/recipes');
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).send('Error logging in');
        }
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
};

module.exports = userController;
