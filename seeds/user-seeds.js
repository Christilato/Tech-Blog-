const { User } = require('../models');

const userData = [
    {
        username: "christi_lato", 
        twitter: "christil",
        github: "Christilato",
        password: "p@ssword1"
    }


    // make 6
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;