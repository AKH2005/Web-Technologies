const http = require('http');

const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');

    response.write('<h1>Welcome to Node.js Web Server</h1>');
    response.write('<p>This is Exercise 1</p>');
    response.end();
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});