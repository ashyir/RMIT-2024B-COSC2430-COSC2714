const express = require('express');
const router = express.Router();

const collectionName = 'movies';
const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi'];

// View Movies
router.get('/', async (req, res) => {
    const genreFilter = req.query.genre;
    const movies = await req.db.collection(collectionName)
        .find(genreFilter && genreFilter !== 'All' ? { genre: genreFilter } : {})
        .toArray();
    res.render('movies/index', { movies, genres, selectedGenre: genreFilter });
});

// Add Movie Page (Only accessible to logged-in users)
router.get('/add', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/auth/login');
    }

    res.render('movies/add', { genres });
});

// Add Movie (POST)
router.post('/add', async (req, res) => {
    const { title, year, genre } = req.body;

    if (req.session.username) {
        await req.db.collection(collectionName).insertOne({ title, year: parseInt(year), genre });
    }

    res.redirect('/');
});

module.exports = router;