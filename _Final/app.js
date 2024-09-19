const express = require('express');
const { MongoClient } = require('mongodb');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');

const app = express();

// MongoDB Connection
const mongoURI = '';
const client = new MongoClient(mongoURI);
const dbName = 'movieStore';
let db;

client.connect()
    .then(() => db = client.db(dbName))
    .catch(err => console.error(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Global variables
app.use((req, res, next) => {
    res.locals.username = req.session.username || null;
    next();
});

// View Engine
app.set('view engine', 'ejs');

// Pass MongoDB instance to routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Routes
app.use('/', movieRoutes);
app.use('/auth', authRoutes);

// Handle 404 Errors
app.use((req, res) => res.status(404).render('home/404'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));