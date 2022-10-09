const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth'); // do i need?

// GET comments
router.get('/', async (req, res) => {
    try
    {
        const commentData = await Comment.findAll({
            include: [{ model: Comment }]
        });
        res.status(200).json(commentData);
    } catch (err)
    {
        res.status(500).json(err);
    }
});

// POST a new comment
router.post('/', async (req, res) => {
    try
    {
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    } catch (err)
    {
        res.status(400).json(err);
    }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
    try
    {
        const commentData = await Comment.destroy({
            where: { id: req.params.id }
        });
        if (!commentData)
        {
            res.status(404).json({ message: 'No  comments with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err)
    {
        res.status(500).json(err);
    }
});


module.exports = router;