const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// // GET api/posts/ --  get all posts
// router.get('/', async (req, res) => {
//     try
//     {
//         const postData = await Post.findAll({
//             include: [{ model: Post }]
//         });
//         res.status(200).json(postData);
//     } catch (err)
//     {
//         res.status(500).json(err);
//     }
// });

// // GET api/post/:id -- get a single post by id
// router.get('/:id', async (req, res) => {
//     try
//     {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [{ model: Product}]
//         });
//         if (!postData)
//         {
//             res.status(404).json({ message: "No post found with that id!" });
//             return;
//         }
//         res.status(200).json(postData);
//     } catch (err)
//     {
//         res.status(500).json(err);
//     }
// });

// POST api/posts -- create a new post
router.post('/', withAuth, async (req, res) => {
    const body= req.body;
    try
    {
        const newPost = await Post.create({
            ...body, 
            user_id: req.session.user_id
        });
        res.json(newPost);
    } catch (err)
    {
        res.status(500).json(err);
    }
});

// PUT api/posts/1 -- update the post's title or text
router.put('/:id', withAuth, async (req, res) => {
    try
    {
        const [effectedRows] = await Post.update(req.body, 
            {
                where: {
                    id: req.params.id,
                },
            });
        if (effectedRows > 0)
        {
            res.status(200).end();
        } else {
            res.status(404).end;
        }
    }
     catch (err)
    {
        res.status(500).json(err);
    }
});


// DELETE api/posts/1 -- delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try
    {
        const [effectedRows] = Post.destroy({
            where: { id: req.params.id }
        });
        if (effectedRows > 0)
        {
            res.status(200).end();
        } else {
            res.status(404).end;
        }
    } catch (err)
    {
        res.status(500).json(err);
    }
});


module.exports = router;
