const http = require("http");

// Create server
const server = http.createServer((req, res) => {
    console.log(`request received: ${req.method} ${req.url}`);

    // Set the header so browser knows it's HTML
    res.writeHead(200, {'Content-Type': 'text/html'});

    // Send response
    res.end('<h1> Welcome to backend </h1>');

});

// Start server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
