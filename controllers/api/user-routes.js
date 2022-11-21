const router = require('express').Router();
const { User } = require('../../models');

// signup
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;
            res.json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if(!user) {
            res.status(400).json({ message: 'Invalid username' });
            return;
        }
        const validPassword = user.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.logged_in = true;

            res.json({ user, message: 'Login successful' });
        });
    } catch (err) {
        res.status(400).json({ message: 'Invalid username or password' })
    }
});

// logout
router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(400).end();
    }
});

module.exports = router;

