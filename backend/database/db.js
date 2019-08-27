const Sequelize = require('sequelize')
const databaseName = dbu8rk4ankmqe3

console.log('Opening database connection');

const db = new Sequelize(databaseName, 'vzgxkuinsnveqm', 'c0a80e52773fe8110308c327a273536e91497a55e0c92c159e72581a04872365', {
    host: 'ec2-54-83-9-36.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    },
    define: {
        timestamps: false
    },
    logging: false
})

module.exports = db