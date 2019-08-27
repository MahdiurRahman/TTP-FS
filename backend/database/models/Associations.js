const Users = require('./Users')
const Shares = require('./Shares')
const Transactions = require('./Transactions')

Shares.belongsTo(Users)
Users.hasMany(Shares)
Transactions.belongsTo(Users)
Users.hasMany(Transactions)

module.exports = {
    Users,
    Shares,
    Transactions
}