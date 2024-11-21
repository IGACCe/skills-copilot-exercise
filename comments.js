// Create web server
// Create a web server that listens on port 3000 and serves the comments.json file.
// The comments.json file is an array of objects that have a message and a date.
// The server should read the file and serve the comments as a JSON response.
// The server should respond to the following endpoints:
// GET /comments - responds with the array of comments
// POST /comments - accepts a JSON object with a message and adds it to the array of comments
// The server should respond with a 404 status code when the requested endpoint does not exist.

const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.json({ message: 'Comment added' });
        }
      });
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// Create a web server
// Create a web server that listens on port 3000 and serves the comments.json file.
// The comments.json file is an array of objects that have a message and a date.
// The server should read the file and serve the comments as a JSON response.
// The server should respond to the following endpoints:
// GET /comments - responds with the array of comments
// POST /comments - accepts a JSON object with a message and adds it to the array of comments
// The server should respond with a 404