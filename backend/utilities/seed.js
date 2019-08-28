const bcrypt = require('bcrypt')

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
        const user = await Users.create(users[i])
        await bcrypt.hash(users[i].password, 10, (err, hash) => {
            if (err) {
                console.log(err)
            }
            else {
                user.update({
                    password: hash
                })
            }
        });
    }
}

const populateTransactions = async (transactions) => {
    for (let i = 0; i < transactions.length; i++) {
        let prepareTransaction = transactions[i]
        let curr_date = new Date()
        prepareTransaction.month = curr_date.getMonth() + 1
        prepareTransaction.day = curr_date.getDate()
        prepareTransaction.year = curr_date.getFullYear()
        let buildTransaction = await Transactions.create(prepareTransaction)
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