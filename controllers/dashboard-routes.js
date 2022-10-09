const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// A route to render the dashboard page, only for a logged in user
    // all of the users posts are obtained from the database
    // user the ID from the session
    // serialize data before passing to template

// A route to edit a post
    // All of the users posts are obtained from the database
    // if no  post by that id exists, return an error
    // serialize data before passing to template

// A route to edit the logged in user
    // Access the user model and run the findOne() method to get a single user based on parameters
    // when the data is sent back, exclude the password property
    // use id as the parameter for the request
    // if no user is found, return an error
    // otherwise return the data for the requested user
    // if tehre is a server error, return that error

    module.exports = router;
