const router = require('express').Router();
const { User } = require('../../models');


// // GET /api/users -- get all users
// router.get('/', async (req, res) => {
//   try
//   {
//     const userData = await User.findAll({
//       include: [{ model: User }]
//     });
//     res.status(200).json(userData);
//   } catch (err)
//   {
//     res.status(500).json(err);
//   }
// });


// // GET /api/users/1 -- get a single user by id
// router.get('/gallery/:id', async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//   if (!req.session.loggedIn)
//   {
//     res.redirect('/login');
//   } else
//   {
//     // If the user is logged in, allow them to view the gallery
//     try
//     {
//       const userData = await User.findByPk(req.params.id, {
//         include: [
//           {
//             model: Painting,
//             attributes: [
//               'id',
//               'title',
//               'artist',
//               'exhibition_date',
//               'filename',
//               'description',
//             ],
//           },
//         ],
//       });
//       const user = userData.get({ plain: true });
//       res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
//     } catch (err)
//     {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// });

// POST api/users -- add a new user
router.post('/', async (req, res) => {
  try
  {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err)
  {
    console.log(err);
    res.status(500).json(err);
  }
});


/// POST /api/users/login -- login route for a user
router.post('/login', async (req, res) => {
  try
  {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user)
    {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword)
    {
      res
        .status(400)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      
      res
        .json({ user: user, message: 'You are now logged in!' });
    });
  } catch (err)
  {
      res.status(400).json({message: 'No user account found'});
  }
});


// POST /api/users/logout -- logout an existing user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn)
  {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else
  {
    res.status(404).end();
  }
});



// // PUT /api/users/1 -- update an exisitng user
// router.put('/:id', async (req, res) => {
//   try
//   {
//     const tagData = await Tag.update({
//       tag_name: req.body.tag_name
//     },
//       {
//         where: {
//           id: req.params.id,
//         },
//       });
//     if (!tagData)
//     {
//       res.status(404).json({ message: 'No tag found with this id!' });
//       return;
//     }
//     return res.json(tagData);
//   } catch (err)
//   {
//     console.log(err)
//     res.status(404).json(err);
//   }
// });

// // DELETE /api/users/1 -- delete an existing user
// router.delete('/:id', async (req, res) => {
//   try
//   {
//     const tagData = await Tag.destroy({
//       where: { id: req.params.id }
//     });
//     if (!tagData)
//     {
//       res.status(404).json({ message: 'No  tag with this id!' });
//       return;
//     }
//     res.status(200).json(tagData);
//   } catch (err)
//   {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

