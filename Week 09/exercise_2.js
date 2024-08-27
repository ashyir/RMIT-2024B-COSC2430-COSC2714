const fs = require('fs');
const http = require('http');
const hostname = 'localhost';
const port = 3000;

// Define the path to the requests.txt file.
const filePath = './requests.txt';

// Create the HTTP server.
const server = http.createServer((req, res) => {
    const url = req.url;
    const currentTime = new Date().toISOString(); // Get the current time in ISO format.

    if (url === '/admin') {
        // Handle /admin route: Read the file & Display the number of requests.
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                // If the file does not exist or there is an error, handle it gracefully.
                if (err.code === 'ENOENT') {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('Total Requests: 0.');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading file.');
                }
            } else {
                // Count the number of lines in the file.
                const requestCount = data.split('\n').filter(line => line.trim() !== '').length;
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Total Requests: ${requestCount}.`);
            }
        });
    } else {
        // Log the request to the requests.txt file.
        const logEntry = `URL: ${url}, Time: ${currentTime}\n`;

        // Append the request information to the file.
        fs.appendFile(filePath, logEntry, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            }
        });

        // Respond to the client.
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Request logged.');
    }
});

// Start the server and listen on port 3000.
server.listen(port, hostname, () => {
    console.log(`\nServer running at http://${hostname}:${port}/\n`);
});