 const mongoose = require('mongoose')
      
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    genral:{
        type:String
    },
    location:{
        contry:{
            type: String,
            required: true
        },
        city:{
            type:String
        },
        street:{
            type: String
        }
    },
    birthDate:{
        type: Date,
        required: true
    },
    loveToPet:{
        when:{
            type: String
        },
        how:{
            type: String
        },
        what:{
            type: String
        },
        favePet:{
            type: String
        }
    },
    getDataOf:{
        otherProfiles:{
            type: Boolean
        },
        foroms:{
            type: Boolean
        },
        petForSale:{
            type: Boolean
        },
        adopters:{
            type: Boolean
        }
    },
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Profile = mongoose.model('profile', ProfileSchema)