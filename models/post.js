const mongoose = require('mongoose')

//define a schema/structure
var postSchema = new mongoose.Schema({
    title: String,
    author: String,
    comments: []
})

// collection = table
// 'Post' will be the name of the connection in MongoDB but in Plural
// This means the collection name would be 'posts'
var Post = mongoose.model('Post', postSchema);

module.exports = Post