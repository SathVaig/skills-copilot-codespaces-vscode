// Create web server
// Create a route for /comments
// Create a route for /comments/new
// Create a route for /comments/:id
// Create a route for /comments/:id/edit
// Create a route for /comments/:id/delete
// Listen on port 3000

// Path: comments.js
// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var comments = require('./comments');

// Create a route for /comments
app.get('/comments', function(request, response) {
  response.json(comments);
});

// Create a route for /comments/new
app.post('/comments/new', bodyParser.urlencoded({extended: true}), function(request, response) {
  var newComment = request.body;
  comments.push(newComment);
  response.json(newComment);
});

// Create a route for /comments/:id
app.get('/comments/:id', function(request, response) {
  var id = request.params.id;
  var comment = comments[id];
  response.json(comment);
});

// Create a route for /comments/:id/edit
app.put('/comments/:id/edit', bodyParser.urlencoded({extended: true}), function(request, response) {
  var id = request.params.id;
  var comment = comments[id];
  comment.body = request.body.body;
  response.json(comment);
});

// Create a route for /comments/:id/delete
app.delete('/comments/:id/delete', function(request, response) {
  var id = request.params.id;
  var comment = comments[id];
  comments.splice(id, 1);
  response.json(comment);
});

// Listen on port 3000
app.listen(3000, function() {
  console.log('Listening on port 3000...');
});