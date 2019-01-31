const User = require('./user')
const Budget = require('./budget')
const Category = require('./category')


User.hasMany(Budget);
Budget.belongsTo(Category, { through: Budget })
Category.hasMany(Budget);

module.exports = {
  User,
  Budget,
  Category
}
