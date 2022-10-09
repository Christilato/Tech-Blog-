const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET api/posts/ --  get all posts
    // Query configuration
    // from the post table, include the post id, url, title, and the timestamp from post creation
    // order the posts from most recent to least
    // from the comment table, include all comments
    // return the posts 
    // if there was a sevor error, return the error

// GET api/post/:id -- get a single post by id
    // specify the post id parameter in the query
    // query configuration, as with the get all posts route
    // if no post by that id exists, return an error
    // if a server error occured, return an error

// POST api/posts -- create a new post
    // expects objects of the form {title: "Sample Title Here", post_text: "Here's some sample text for a post", user_id: 1}

// PUT api/posts/1 -- update the post's title or text

// DELETE api/posts/1 -- delete a post

module.exports = router;
