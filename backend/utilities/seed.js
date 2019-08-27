// Dummy Data
const User_seed = require('../dummy_data/Users_seed')

// Models
const Users = require('../database/models/Users')

const populateUsers = async (users) => {
    for (let i = 0; i < users.length; i++) {
        await Users.create(users[i])
    }
}

const seedDatabase = async () => {
    try{
        await populateUsers(User_seed);
        console.log("Database is seeded with users");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = seedDatabase