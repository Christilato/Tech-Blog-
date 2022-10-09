const { User } = require('../models');

const userData = [
    {
        username: "christi_lato", 
        twitter: "clato",
        github: "Christilato",
        password: "p@ssword1"
    },
    {
        username: "TerrenceB", 
        twitter: "Tb",
        github: "TerrenceBudnik",
        password: "p@ssword2"
    },
    {
        username: "anak", 
        twitter: "ak2",
        github: "akowala",
        password: "p@ssword3"
    },
    {
        username: "yasmin", 
        twitter: "y2k",
        github: "yazbustami",
        password: "p@ssword4"
    },
    {
        username: "Tyler-Esselman", 
        twitter: "tylerE",
        github: "tylseresselman-sl",
        password: "p@ssword5"
    },
    {
        username: "Paul-Cwik", 
        twitter: "yourboypaul",
        github: "PCeeezy",
        password: "p@ssword6"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;