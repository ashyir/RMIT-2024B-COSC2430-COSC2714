// Import the HTTP module.
const http = require('http');
const hostname = 'localhost';
const port = 3000;

// Create the HTTP server.
const server = http.createServer((req, res) => {
    // Check the URL attribute of the request object.
    const url = req.url;

    switch (url) {
        case '/login': // Handle the /login route.
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Login Page</h1><p>Welcome to the login page!</p>');
            break;

        case '/logout': // Handle the /logout route.
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Logout Page</h1><p>You have been logged out.</p>');
            break;

        default: // Handle all other routes.
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
    }
});

// Start the server and listen on port 3000.
server.listen(port, hostname, () => {
    console.log(`\nServer running at http://${hostname}:${port}/\n`);
});