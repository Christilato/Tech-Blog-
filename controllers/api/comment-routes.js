const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET comments
    // Access the Comment model and run findAll() method to get all comments
    // return the data as  JSON formatted
    // if there is a server error, return that error

// POST a new comment
    // check the sesssion, and if it exists, create a comment
    // use the user is from the session
    // if there is a server error, return that error

// DELETE a comment
    // 

    module.exports = router;