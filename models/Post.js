const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text:{
        type: String,
        required: true
    },
    image: {
        type: String
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users' 
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = Post = mongoose.model('post', PostsSchema)