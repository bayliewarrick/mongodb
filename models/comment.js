const mongoose = require('mongoose')

//define a schema/structure
var commentSchema = new mongoose.Schema({
    subject: String,
     likes: Number,
      body: String
})

// collection = table
// 'Post' will be the name of the connection in MongoDB but in Plural
// This means the collection name would be 'posts'
var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment