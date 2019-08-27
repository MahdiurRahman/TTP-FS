const router = require('express').Router()
const Users = require('../database/models/Users')
const Shares = require('../database/models/Shares')
const Transactions = require('../database/models/Transactions')

router.get('/users/:id/shares', (req, res) => {
    Shares.findAll({
        where: {
            UserId: req.params.id
        }
    })
    .then(shares => res.status(200).json(shares))
    .catch(err => {
        console.log(err)
        res.send("ERROR: could not connect to database and return shares")
    })
})

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

router.get('/users/:id', (req, res) => {
    Users.findByPk(req.params.id)
    .then(user => res.send(user))
    .catch(err => {
        console.log(err)
        res.send("Error: user was not found")
    })
})

router.get('/users', (req, res) => {
    Users.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => {
        console.log(err)
        res.send("ERROR: could not connect to database and return users")
    })
})

module.exports = router