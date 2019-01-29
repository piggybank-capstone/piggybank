const User = require('./user')
const Budget = require('./budget')


//Associations with Budget
//****************WILL NEED TO ADD ASSOCIATION WITH TRANSACTION */

User.hasMany(Budget);

module.exports = {
  User,
  Budget
}
