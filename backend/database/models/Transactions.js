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
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    month: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    day: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    balance: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
})

module.exports = Transactions