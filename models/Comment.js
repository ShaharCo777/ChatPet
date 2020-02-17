const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
 post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
},
 name: {
     type: String
 },
 peofileImage: {
     type: String
 },
 text: {
    type: String,
    required: true
},
 likes: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users' 
        }
    }
],
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
},
 date: {
     type: Date,
     default: Date.now
 }
});

module.exports = Comment = mongoose.model("comment", commentSchema);