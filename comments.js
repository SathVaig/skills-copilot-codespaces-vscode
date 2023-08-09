// create web server with express
const express = require('express');
const app = express();
// create body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// create mongoose
const mongoose = require('mongoose');
// connect mongoose to database
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true });
// create schema
const Schema = mongoose.Schema;
// create schema for comments
const commentSchema = new Schema({
    name: String,
    comment: String
});
// create model for comments
const Comment = mongoose.model('Comment', commentSchema);
// set view engine to ejs
app.set('view engine', 'ejs');
// set static folder
app.use(express.static('public'));
// create route for home page
app.get('/', (req, res) => {
    Comment.find({}, (err, data) => {
        if (err) throw err;
        res.render('index', { comments: data });
    });
});
// create route for post request
app.post('/comment', (req, res) => {
    const newComment = new Comment(req.body);
    newComment.save((err, data) => {
        if (err) throw err;
        res.redirect('/');
    });
});
// create server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));