// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// // Mime types for serving different file types
// const mimeTypes = {
//   '.html': 'text/html',
//   '.png': 'image/png',
//   '.css': 'text/css',
//   '.js': 'application/javascript',
// };

// // Create the server
// // http.createServer((req, res) => {
// //   let filePath = './valve.png';

// //   // Get the file extension
// //   const extname = String(path.extname(filePath)).toLowerCase();
// //   const contentType = mimeTypes[extname] || 'application/octet-stream';

// //   // Read and serve the file
// //   fs.readFile(filePath, (err, content) => {
// //     if (err) {
// //       // If the file is not found, serve a 404 page
// //       if (err.code === 'ENOENT') {
// //         res.writeHead(404, { 'Content-Type': 'text/html' });
// //         res.end('<h1>404 Not Found</h1>', 'utf-8');
// //       } else {
// //         // Other server errors
// //         res.writeHead(500);
// //         res.end('Server Error: ' + err.code);
// //       }
// //     } else {
// //       // Serve the file if no errors
// //       res.writeHead(200, { 'Content-Type': contentType });
// //       res.end(content, 'utf-8');
// //     }
// //   });

// // }).listen(3000, () => {
// //   console.log('Server is running on http://localhost:3000');
// // });

// let filePath = './valve.png';

// // Create a server
// const server = http.createServer((req, res) => {
//     const extname = String(path.extname(filePath)).toLowerCase();
//     const contentType = mimeTypes[extname] || 'application/octet-stream';

//     // Check if the request is for the root ("/")
//     if (req.url === '/') {
//         // Read the index.html file
//         const filePath = path.join(__dirname, 'index.html');
//         fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/plain' });
//                 res.end('Internal Server Error');
//             } else {
//                 res.writeHead(200, { 'Content-Type': contentType });
//                 res.end(data);
//             }
//         });
//     } else {
//         // Handle 404 for other routes
//         res.writeHead(404, { 'Content-Type': contentType });
//         res.end('404 Not Found');
//     }
// });

// // Listen on port 3000
// server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });

const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});