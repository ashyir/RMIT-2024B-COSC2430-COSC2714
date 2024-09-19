const express = require('express');
const router = express.Router();

const collectionName = 'users';

// Login Page
router.get('/login', (req, res) => {
    if (req.session.username) {
        return res.redirect('/');
    }

    res.render('home/login', { errorMessage: '' });
});

// Login Handle
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await req.db.collection(collectionName).findOne({
        username: username,
        password: password
    });

    if (user) {
        req.session.username = user.username;
        return res.redirect('/');
    }

    res.render('home/login', { errorMessage: 'Invalid username or password.' });
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }

        res.redirect('/auth/login');
    });
});

module.exports = router;