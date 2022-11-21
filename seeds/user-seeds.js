const { User } = require('../models');

const userData = [
    {
        username: "christi_lato", 
        password: "p@ssword1"
    },
    {
        username: "TerrenceB", 
        password: "p@ssword2"
    },
    {
        username: "anak",
        password: "p@ssword3"
    },
    {
        username: "yasmin", 
        password: "p@ssword4"
    },
    {
        username: "Tyler-Esselman", 
        password: "p@ssword5"
    },
    {
        username: "Paul-Cwik", 
        password: "p@ssword6"
    }
]

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks:true,
    returning: true
});

module.exports = seedUsers;