const session = require('express-session');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up session middleware
app.use(session({
    secret: 'secret-key',       // Use a more secure, random key in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }   // Use true if using HTTPS in production
}));

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const homeRoute = require('./routes/home');
const productRoute = require('./routes/product');
const accountRoute = require('./routes/account');

// Use routes with prefixes
app.use('/', homeRoute);
app.use('/product', productRoute);
app.use('/account', accountRoute);

// 404 Not Found handler
app.use((req, res) => {
    res.status(404).render('404', { title: '404 Not Found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});