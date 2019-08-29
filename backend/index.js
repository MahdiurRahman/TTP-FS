const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database')
const seedDatabase = require('./utilities/seed')
const PORT = process.env.PORT || 5000
const app = express()
const apiRoutes = require('./routes/api_routes')

db.sync({ force: true }).then(async () => {
        seedDatabase()

    // Middlewares
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Methods', '*'); 
            res.setHeader('Access-Control-Allow-Headers', "*");
            next();
        });

    // Routes
        app.get('/', (req, res) => {
            console.log('GET on \'/\'')
            res.send("API HOMEPAGE")
        })
        app.use('/api', apiRoutes)
    
        app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))
})