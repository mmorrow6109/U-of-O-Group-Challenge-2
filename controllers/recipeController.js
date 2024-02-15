const { Recipe } = require('../models');

const recipeController = {
    getAllRecipes: async (req, res) => {
        try {
            // Fetch all recipes from the database
            const recipes = await Recipe.findAll();
            res.render('recipes', { recipes });
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).send('Error fetching recipes');
        }
    },
    saveRecipe: async (req, res) => {
        try {
            // Logic to save a recipe for the logged-in user
            res.send('Recipe saved successfully');
        } catch (error) {
            console.error('Error saving recipe:', error);
            res.status(500).send('Error saving recipe');
        }
    }
};

module.exports = recipeController;
