const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('Transactions', {
    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    buy: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    sell: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    balance: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Transactions