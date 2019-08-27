const db = require('./db')

require("./Models/Associations");
require("./Models/Users");
require("./Models/Transactions");

module.exports = db;