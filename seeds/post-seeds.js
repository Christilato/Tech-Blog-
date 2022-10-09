const { Post } = require('../models');

const postData = [ 
    {
        title: "Express",
        post_content:"The Express philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for single page applications, websites, hybrids, or public HTTP APIs.",
        user_id:"1"
    }, 
    {
        title: "Mysql2",
        post_content: "MySQL2 is free from native bindings and can be installed on Linux, Mac OS or Windows without any issues.",
        user_id: "2"
    },
    {
        title: "Sequelize",
        post_content: "Sequelize is an easy-to-use and promise-based Node.js ORM tool. It features solid transaction support, relations, eager and lazy loading, read replication and more.", 
        user_id: "3"
    }, 
    {
        title: "B-crypt",
        post_content: "A library to help you hash passwords.",
        user_id: "4"
    }, 
    {
        title: "dotenv",
        post_content: "Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.",
        user_id: "5"
    }, 
    {
     title: "Handlebars", 
     post_content: "Handlebars.js is a logicless templating languages that keep the view and the code separated like we all know they should be.", 
     user_id: "6"   
    }    

]




const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;