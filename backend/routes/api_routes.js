const bcrypt = require('bcrypt')
const router = require('express').Router()
const Users = require('../database/models/Users')
const Shares = require('../database/models/Shares')
const Transactions = require('../database/models/Transactions')

// Get shares of User
router.get('/users/:id/shares', (req, res) => {
    Shares.findAll({
        where: {
            UserId: req.params.id
        }
    })
    .then(shares => res.status(200).json(shares))
    .catch(err => {
        console.log(err)
        res.status(400).send("ERROR: could not connect to database and return shares")
    })
})

// Buy shares for User
router.post('/users/:id/buy', async (req, res) => {
    const curr_date = new Date()
    const User = await Users.findByPk(req.params.id)

    // Check if balance is valid
    if (User.balance >= req.body.price * req.body.quantity) {
        // Updating Shares:
            // Find instance of symbol
            const findShares = await Shares.findOne({
                where: {
                    symbol: req.body.symbol,
                    UserId: req.params.id
                }
            })

            // Update user's shares accordingly
            if (findShares) { // If already has shares of company
                const quantity_ = findShares.quantity
                await findShares.update({
                    quantity: quantity_ + req.body.quantity
                })
            }
            else { // If doesn't have shares of company
                const buildShare = await Shares.create({
                    symbol: req.body.symbol,
                    quantity: req.body.quantity
                })
                await buildShare.setUser(req.params.id)
            }

        // Updating User(balance):
            let balance_ = User.balance
            balance_ -= (req.body.price * req.body.quantity)
            await User.update({
                balance: balance_
            })
        
        // Updating Transactions:
            let buildTransaciton = await Transactions.create({
                symbol: req.body.symbol,
                buy: true,
                sell: false,
                price: req.body.price,
                quantity: req.body.quantity,
                month: curr_date.getMonth() + 1,
                day: curr_date.getDate(),
                year: curr_date.getFullYear(),
                balance: balance_
            })
            await buildTransaciton.setUser(req.params.id)
            return res.send(buildTransaciton)
    }
    else {
        return res.send("ERROR: Balance is not enough for purchase")
    }
})

// Sell shares for User
router.post('/users/:id/sell', async (req, res) => {
    const curr_date = new Date()
    const User = await Users.findByPk(req.params.id)

    if (User) {
        const findShares = await Shares.findOne({
            where: {
                symbol: req.body.symbol,
                UserId: req.params.id
            }
        })

            if (findShares) {
                if (findShares.quantity >= req.body.quantity) {
                    // Updating Shares:
                        // minusing quantity of Shares due to sell
                        let quantity_ = findShares.quantity
                        if (findShares.quantity == req.body.quantity) {
                            await findShares.destroy()
                        }
                        else {
                            quantity_ -= req.body.quantity
                            await findShares.update({
                                quantity: quantity_
                            })
                        }

                    // Updating User(balance):
                        let balance_ = User.balance
                        balance_ += (req.body.price * req.body.quantity)
                        await User.update({
                            balance: balance_
                        })

                    // Updating Transactions:
                        let buildTransaciton = await Transactions.create({
                            symbol: req.body.symbol,
                            buy: false,
                            sell: true,
                            price: req.body.price,
                            quantity: req.body.quantity,
                            month: curr_date.getMonth() + 1,
                            day: curr_date.getDate(),
                            year: curr_date.getFullYear(),
                            balance: balance_
                        })
                        await buildTransaciton.setUser(req.params.id)
                        return res.send(buildTransaciton)
                }
                else {
                    return res.send(`Error: User does not have enough shares of ${req.body.symbol}`)
                }
            }
            else {
                return res.send(`Error: User does not have any shares of ${req.body.symbol}`)
            }
    }
    else {
        return res.send("ERROR: Could not find user")
    }
})

// Get transactions of User
router.get('/users/:id/transactions', (req, res) => {
    Transactions.findAll({
        where: {
            UserId: req.params.id
        }
    })
    .then(transactions => res.status(200).json(transactions))
    .catch(err => {
        console.log(err)
        res.send("ERROR: could not connect to database and return transactions")
    })
})

// Get info of User
router.get('/users/:id', (req, res) => {
    Users.findByPk(req.params.id)
    .then(user => res.send(user))
    .catch(err => {
        console.log(err)
        res.send("Error: user was not found")
    })
})

// Get all users
router.get('/users', (req, res) => {
    Users.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => {
        console.log(err)
        res.send("ERROR: could not connect to database and return users")
    })
})

// NEED TO CHECK FOR DUPLICATE EMAIL
router.post('/users', async (req, res) => {
    await bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log(err)
            res.send('ERROR: User could not be registered')
        }
        else {
            const helperVariable = req.body
            helperVariable.password = hash
            Users.create(helperVariable)
            .then(() => res.send(helperVariable))
            .catch(err => {
                console.log(err)
                res.send('ERROR: User could not be registered')
            })
        }
    });
})

module.exports = router