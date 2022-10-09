const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// render the homepage
    // query configuration
    // from teh post table, include the post ID, URL, title, and the timestamp from post creation
    // order the posts from most recent to least
    // from the User table, include the post crerator's user name
    // From the contents table, include all comments


    
// render the posts
    // create an array for the posts, using the get method to trim extra sequelize data out
    // pass the posts into the homepage template
    // if there was a servor error, return the error

//render the single post page
    // specify the post id parameter in the query
    // query configuration, as with the get all posts route
    // if no post by that id exists, return an error
    // sequelize the post data, removing extra sequelize meta data
    // pass the posts and a session variable into the signle post template
    // if server error occured, return an error

// render the login page. If the user logged in, redirect to the homepage

// render the signup page. If the user is logged in, redirect to the homepage

module.exports = router;