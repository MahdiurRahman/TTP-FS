const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database')
const seedDatabase = require('./utilities/seed')
const PORT = process.env.PORT || 5000
const app = express()

db.sync({ force: true }).then(async () => {
    seedDatabase()

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/', (req, res) => {
        console.log('GET on \'/\'')
        res.send("API HOMEPAGE")
    })
    
    app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))
})