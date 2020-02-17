const mongoose = require('mongoose'),
      config   = require('config')
const db = config.get('mongoURI')
//get the db from the cluster online for making data transfer with other web's db posible
const connectDB = async () => {
    try{
        await mongoose.connect(
            db, { 
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
			    useUnifiedTopology: true
        })
        console.log("DB conected")
    } catch(err) {
        console.error(err.message)
        process.exit(1)

    }
    
}

module.exports = connectDB