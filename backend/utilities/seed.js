// Dummy Data
const Users_seed = require('../dummy_data/Users_seed')
const Transactions_seed = require('../dummy_data/Transactions_seed')
const Shares_seed = require('../dummy_data/Shares_seed')

// Models
const Users = require('../database/models/Users')
const Transactions = require('../database/models/Transactions')
const Shares = require('../database/models/Shares')

const populateUsers = async (users) => {
    for (let i = 0; i < users.length; i++) {
        await Users.create(users[i])
    }
}

const populateTransactions = async (transactions) => {
    for (let i = 0; i < transactions.length; i++) {
        let buildTransaction = await Transactions.create(transactions[i])
        await buildTransaction.setUser(i + 1)
    }
}

const populateShares = async (shares) => {
    for (let i = 0; i < shares.length; i++) {
        let buildShare = await Shares.create(shares[i])
        await buildShare.setUser(i + 1)
    }
}

const seedDatabase = async () => {
    try{
        await populateUsers(Users_seed)
        console.log("Database is seeded with transactions")
        await populateTransactions(Transactions_seed)
        console.log("Database is seeded with users")
        await populateShares(Shares_seed)
        console.log("Database is seeded with shares")
    }
    catch(err){
        console.log(err);
    }
}

module.exports = seedDatabase