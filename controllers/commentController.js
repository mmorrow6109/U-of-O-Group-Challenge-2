const { Comment } = require('../models');

const commentController = {
    addComment: async (req, res) => {
        try {
            // Logic to add a comment to a recipe
            res.send('Comment added successfully');
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).send('Error adding comment');
        }
    }
};

module.exports = commentController;
