const express   = require('express'),
      connectDB = require("./config/db"),
      cors = require('cors');



const app = express()
//conect to DB
connectDB()

//Middleware ofbodyParser
app.use(express.json({extended: false}))

//fix CROS 
app.use(cors({'origin': 'http://localhost:3000'}));

//Define Routes
app.use('/api/users', require('./Routes/api/users'))
app.use('/api/auth', require('./Routes/api/auth'))
app.use('/api/posts', require('./Routes/api/posts'))
app.use('/api/pets', require('./Routes/api/pets'))
app.use('/api/profile', require('./Routes/api/profile'))

  
const PORT = process.env.PORT || 5000


app.listen(PORT, () =>
 console.log(`Server started on port ${PORT}`))
