const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// A GET route to render the dashboard page, only for a logged in user
router.get('/', withAuth, async (req, res) => {
    try
    {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        const posts = postData.map((post) => post.get({plain: true}));
        res.render("all-posts-admin", {
            layout: "dashboard",
            posts
        });
    }
     catch (err)
    {
        res.redirect("login");
    }
});

// A GET route to edit a post on a new page
router.get('/new', withAuth, (req, res) => {
    res.render("new-post", {
        layout: "dashboard"
    });
});

// A GET route to edit the post by id
router.get('/edit/:id', withAuth, async (req, res) => {
    try
    {
        const postData = await Post.findByPk(req.params.id);
        if(postData) {
            const post = postData.get({plain: true});
            res.render("edit-post", {
                layout: "dashboard",
                post
            });
        } else {
            res.status(404).end();
        }            
    }
     catch (err)
    {
        res.redirect("login");
    }
}); 

    module.exports = router;
