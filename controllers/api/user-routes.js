const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// GET /api/users -- get all users
// Access the user model and run .findAll() method to get all users
// when the data is sent back, exclude the password proerty
// return the data as JSON formatted
// if there is a servor error, return that data

router.get('/', async (req, res) => {
  try
  {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err)
  {
    res.status(500).json(err);
  }
});

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try
  {
    const dbGalleryData = await Gallery.findAll({
      include: [
        {
          model: Painting,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const galleries = dbGalleryData.map((gallery) =>
      gallery.get({ plain: true })
    );

    res.render('homepage', {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err)
  {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET /api/users/1 -- get a single user by id
// access the user model adn run the function findOne() method to get a single user based on parameters
// when the data is sent back, exclude the password property
// include the posts that the user has created, the posts the user has commented on, and the posts the user has upvoted 
// if not user is found, return error
//otherwise return the data for the requested user
// if there is a server error, return that error

// GET one gallery
router.get('/gallery/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn)
  {
    res.redirect('/login');
  } else
  {
    // If the user is logged in, allow them to view the gallery
    try
    {
      const dbGalleryData = await Gallery.findByPk(req.params.id, {
        include: [
          {
            model: Painting,
            attributes: [
              'id',
              'title',
              'artist',
              'exhibition_date',
              'filename',
              'description',
            ],
          },
        ],
      });
      const gallery = dbGalleryData.get({ plain: true });
      res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
    } catch (err)
    {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// POST api/users -- add a new user
// create method
// expects an object in the form {username: "Christi", email:"clato@gmail.com", password: Lato1234567}
// send the user the data back to the cloent as confirmation and save the session
// if there is a server error, return that error

// CREATE new user
router.post('/', async (req, res) => {
  try
  {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err)
  {
    console.log(err);
    res.status(500).json(err);
  }
});


/// POST /api/users/login -- login route for a user
// findONe method by email to look for an existing user in the database with the email address enetered
// expects (email: "Clato@gmail.com", password: "password1234")
// if email is not found, return an error
// otherwise verify the user
// call the instance method as defined in the User model
// if the password is invalid (method returns false), return an error
// otherwise, save the session, and return the user object and a success message
// declare the session variables

// Login
router.post('/login', async (req, res) => {
  try
  {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData)
    {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword)
    {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err)
  {
    console.log(err);
    res.status(500).json(err);
  }
});


// POST /api/users/logout -- logout an existing user
// 204 status is that a request has succeeded, but client does not need to go to a different page
// 200 indicates success and that a newly updated page should be loaded, 201 is for a source being created
// if there is no session, then the logout request will send back a no reesource found status

// Logout
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



// PUT /api/users/1 -- update an exisitng user
// update method 
// expects {username:"christi", email: "clato@gmail.com", password: "password1234"}
// if req.body has exact key/value pairs to match the model, 
// you can just use `req.body` instead of calling out each property,
// allowing for updating only key/value pairs that are passed through
// since there is a hook to hash only the password, the option is noted here
// use the id as the parameter for the individual user to be updated

router.put('/:id', async (req, res) => {
  try
  {
    const tagData = await Tag.update({
      tag_name: req.body.tag_name
    },
      {
        where: {
          id: req.params.id,
        },
      });
    if (!tagData)
    {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    return res.json(tagData);
  } catch (err)
  {
    console.log(err)
    res.status(404).json(err);
  }
});

// DELETE /api/users/1 -- delete an existing user
// destroy method

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try
  {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData)
    {
      res.status(404).json({ message: 'No  tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err)
  {
    res.status(500).json(err);
  }
});

module.exports = router;

