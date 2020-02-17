const mongoose = require('mongoose')
            
const PetPhotoSchema = new mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pet'
    },
    src:{
        type: String
    },
    info:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = PetPhoto = mongoose.model('PetPhoto', PetPhotoSchema)