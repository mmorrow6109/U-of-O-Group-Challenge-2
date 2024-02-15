const User = require('./User');
const Recipe = require('./Recipe');

// Creates a relationship between User and Project model, with the User having a "has many" relationship with Project model.
User.hasMany(Recipe, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Project model, with a "belongs to" relationship of the Project to the User.
Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Recipe };
