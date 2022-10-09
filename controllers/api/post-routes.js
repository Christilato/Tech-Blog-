const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET api/posts/ --  get all posts
router.get('/', async (req, res) => {
    try
    {
        const postData = await Post.findAll({
            include: [{ model: Post }]
        });
        res.status(200).json(postData);
    } catch (err)
    {
        res.status(500).json(err);
    }
});

// GET api/post/:id -- get a single post by id
router.get('/:id', async (req, res) => {
    try
    {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: Product}]
        });
        if (!postData)
        {
            res.status(404).json({ message: "No post found with that id!" });
            return;
        }
        res.status(200).json(postData);
    } catch (err)
    {
        res.status(500).json(err);
    }
});

// POST api/posts -- create a new post
router.post('/', async (req, res) => {
    try
    {
        const postData = await Post.create(req.body);
        res.status(200).json(postData);
    } catch (err)
    {
        res.status(400).json(err);
    }
});

// PUT api/posts/1 -- update the post's title or text
router.put('/:id', async (req, res) => {
    try
    {
        const postData = await Post.update({
            tag_name: req.body.tag_name
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        if (!tagData)
        {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        return res.json(tagData);
    } catch (err)
    {
        console.log(err)
        res.status(404).json(err);
    }
});


// DELETE api/posts/1 -- delete a post
router.delete('/:id', async (req, res) => {
    try
    {
        const postData = await Tag.destroy({
            where: { id: req.params.id }
        });
        if (!postData)
        {
            res.status(404).json({ message: 'No  post with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err)
    {
        res.status(500).json(err);
    }
});


module.exports = router;
