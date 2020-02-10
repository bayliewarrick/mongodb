const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Post = require('./models/post')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
mongoose.set('useFindAndModify', false);


//connect to the database
//if database exists, it will connect to it. otherwise,
//it will create the database.
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true})

//create a new post
app.post('/new-post', (req,res) => {
    const post = new Post({title: 'Hello, world!', author: 'johnDoe'})
    //save that post to mongoDB
    post.save()
    .then(doc => console.log(doc))
    .catch(error => console.log(error))
})

// http://localhost:8080/posts/
// returns all posts.
app.get('/posts', (req, res) => {
    Post.find({})
    .then(posts => res.json(posts))
})

// http://localhost:8080/posts/<POST ID HERE>
// returns an individual post with given post ID.
app.get('/posts/:postId', (req, res) => {
    const postId = req.params.postId
    Post.findById(postId)
})

// http://localhost:8080/posts/update/<POST ID HERE>
// updates a given post
app.put('/posts/update/:postId', (req,res) => {
    const postId = req.params.postId
    const title = req.body.title
    const author = req.body.author
    Post.findByIdAndUpdate(postId, {
        title: title,
        author: author
    }).then(doc => res.json({message: 'updated'}))
    .catch(error => res.json({message: 'error!'}))
})

// http://localhost:8080/posts/<postId>/comment/add
// update given post to add comment
app.put('/posts/:postId/comment/add', (req,res) => {
    const comment = new Comment({
        subject: req.body.subject,
        likes: req.body.likes,
        body: req.body.body
        })

    let postId = req.params.postId
    
    Post.findByIdAndUpdate(postId, {
        $push: {
            comments: comment
        }
    })
    .then(() => res.redirect('/posts'))
})

//Start server on port 8080
app.listen(8080, () => {
    console.log('Server listening at http://localhost:8080')
})
