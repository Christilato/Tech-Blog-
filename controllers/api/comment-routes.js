const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth'); 

// // GET comments
// router.get('/', async (req, res) => {
//     try
//     {
//         const commentData = await Comment.findAll({
//             include: [{ model: Comment }]
//         });
//         res.status(200).json(commentData);
//     } catch (err)
//     {
//         res.status(500).json(err);
//     }
// });

// POST a new comment
router.post('/', withAuth, async (req, res) => {
    try
    {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(commentData);
    } catch (err)
    {
        res.status(500).json(err);
    }
});

// // DELETE a comment
// router.delete('/:id', async (req, res) => {
//     try
//     {
//         const commentData = await Comment.destroy({
//             where: { id: req.params.id }
//         });
//         if (!commentData)
//         {
//             res.status(404).json({ message: 'No  comments with this id!' });
//             return;
//         }
//         res.status(200).json(commentData);
//     } catch (err)
//     {
//         res.status(500).json(err);
//     }
// });


module.exports = router;