const Users = require('./Users')
const Transactions = require('./Transactions')

Transactions.belongsTo(Users)
Users.hasMany(Transactions)

module.exports = {
    Users,
    Transactions
}