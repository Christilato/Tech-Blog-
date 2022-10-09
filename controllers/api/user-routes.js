const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// GET /api/users -- get all users
    // Access the user model and run .findAll() method to get all users
    // when the data is sent back, exclude the password proerty
    // return the data as JSON formatted
    // if there is a servor error, return that data

// GET /api/users/1 -- get a single user by id
    // access the user model adn run the function findOne() method to get a single user based on parameters
    // when the data is sent back, exclude the password property
    // include the posts that the user has created, the posts the user has commented on, and the posts the user has upvoted 
    // if not user is found, return error
    //otherwise return the data for the requested user
    // if there is a server error, return that error

// POST api/users -- add a new user
    // create method
    // expects an object in the form {username: "Christi", email:"clato@gmail.com", password: Lato1234567}
    // send the user the data back to the cloent as confirmation and save the session
    // if there is a server error, return that error

/// POST /api/users/login -- login route for a user
    // findONe method by email to look for an existing user in the database with the email address enetered
    // expects (email: "Clato@gmail.com", password: "password1234")
    // if email is not found, return an error
    // otherwise verify the user
    // call the instance method as defined in the User model
    // if the password is invalid (method returns false), return an error
    // otherwise, save the session, and return the user object and a success message
    // declare the session variables

// POST /api/users/logout -- logout an existing user
    // 204 status is that a request has succeeded, but client does not need to go to a different page
    // 200 indicates success and that a newly updated page should be loaded, 201 is for a source being created
    // if there is no session, then the logout request will send back a no reesource found status

// PUT /api/users/1 -- update an exisitng user
    // update method 
    // expects {username:"christi", email: "clato@gmail.com", password: "password1234"}
    // if req.body has exact key/value pairs to match the model, 
    // you can just use `req.body` instead of calling out each property,
    // allowing for updating only key/value pairs that are passed through
    // since there is a hook to hash only the password, the option is noted here
    // use the id as the parameter for the individual user to be updated

// DELETE /api/users/1 -- delete an existing user
    // destroy method

    module.exports = router;

