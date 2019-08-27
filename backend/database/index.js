const db = require('./db')

require("./models/Associations")
require("./models/Users")
require("./models/Shares")
require("./models/Transactions")

module.exports = db;