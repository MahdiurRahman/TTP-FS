const Sequelize = require('sequelize')
const db = require('../db')

const Users = db.define('Users', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    balance: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Users