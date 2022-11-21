const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// create
router.post('/', withAuth, async (req, res) => {
        console.log(req.body);
    try {
        const newPost = await Post.create({ ...req.body, user_id: req.session.user_id });
        console.log(newPost);
        res.json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update
router.put('/:id', withAuth, async (req, res) => {
    try {
        console.log(req.body);
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
