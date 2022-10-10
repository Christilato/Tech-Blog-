const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const { route } = require('./dashboard-routes');

    
// render the posts GET route
    router.get('/', async (req, res) => {
    try
    {
        const postData = await Post.findAll({
            include: [User]
        });
        const posts = postData.map((post) => post.get({plain: true}));
        res.render("all-posts", {posts});
    } catch (err)
    {
        res.status(500).json(err);
    }
});

//render the single post page
    router.get('/post/:id', async (req, res) => {
    try
    {
        const singlePost = await Post.findByPk(req.params.id, { 
            include: [ 
               User, 
                { 
                    model: Comment, 
                    include: [User]
                },],
        });
        if (singlePost)
        {
            const post = singlePost.get({plain:true});
            res.render("single-post", {post});
        } else {
            res.status(404).end();
        }
    } catch (err)
    {
        res.status(500).json(err);
    }
});

// render the login page. If the user logged in, redirect to the homepage
router.get('/login', (req, res)=> {
    if(req.session.loggedIn){
        res.redirect("/");
        return;
    }
    res.render('login');
});

// render the signup page. If the user is logged in, redirect to the homepage
router.get('/signup', (req, res)=> {
    if(req.session.loggedIn){
        res.redirect("/");
        return;
    }
    res.render('signup');
});

module.exports = router;