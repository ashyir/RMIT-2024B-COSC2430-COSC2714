// npm install bcrypt

const querystring = require('querystring');
const bcrypt = require('bcrypt');
const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 3000;

// Function to hash a password.
async function hashPassword(plainPassword) {
    try {
        const saltRounds = 10; // Number of salt rounds for hashing.
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        return null;
    }
}

// Function to verify a password against a hash.
async function verifyPassword(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error verifying password:', error);
        return false;
    }
}

// Create the HTTP server.
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url);
    const queryParams = querystring.parse(parsedUrl.query);

    if (parsedUrl.pathname === '/hash' && queryParams.password) {
        // Hash the provided password.
        const hashedPassword = await hashPassword(queryParams.password);

        if (hashedPassword) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Hashed Password: '${hashedPassword}'.`);
        } else {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error hashing password.');
        }
    } else if (parsedUrl.pathname === '/verify' && queryParams.password && queryParams.hash) {
        // Verify the provided password against the hash.
        const isMatch = await verifyPassword(queryParams.password, queryParams.hash);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Password Match: ${isMatch}.`);
    } else {
        // Invalid route or missing query parameters.
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid request. Use /hash?password=yourpassword to hash or /verify?password=yourpassword&hash=yourhash to verify.');
    }
});

// Start the server and listen on port 3000.
server.listen(port, hostname, () => {
    console.log(`\nServer running at http://${hostname}:${port}/\n`);
});