const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const commentController = require('../controllers/commentController');

// User authentication routes
router.get('/signup', userController.signupForm);
router.post('/signup', userController.signup);
router.get('/login', userController.loginForm);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

// Recipe management routes
router.get('/recipes', recipeController.getAllRecipes);
router.post('/recipes/:id/save', recipeController.saveRecipe);

// Comment routes
router.post('/recipes/:id/comment', commentController.addComment);

module.exports = router;
