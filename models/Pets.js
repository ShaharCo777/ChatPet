const mongoose = require('mongoose')

const PetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    profileImage:{
        type: String
    },
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    type:{
        type: String
    },
    race:{
        type:String
    },
    age:{
        type: Number
    },
    traind:{
        type: Boolean
    },
    descreption:{
        type: String
    },
    cost:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Pet = mongoose.model('pet', PetSchema)