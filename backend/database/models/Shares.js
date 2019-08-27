const Sequelize = require('sequelize')
const db = require('../db')

const Shares = db.define('Shares', {
    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Shares