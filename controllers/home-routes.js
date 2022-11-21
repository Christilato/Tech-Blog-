const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: User,
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('all-posts-homepage', { layout: 'main', posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500),json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {id: req.params.id},
            include: [User, {
                model: Comment,
                include: User,
            },
        ],
        });
        if (postData) {
            const post = postData.get({ plain: true });
            console.log(post);
            res.render('single-post', { layout: 'main', post, logged_in: req.session.loggedIn});
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});


module.exports = router;