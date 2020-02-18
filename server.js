const express   = require('express'),
      connectDB = require("./config/db"),
      path = require('path'),
      cors = require('cors')



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

  
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client-side/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client-side', 'build', 'index.html'));
  })
}


const PORT = process.env.PORT || 5000


app.listen(PORT, () =>
 console.log(`Server started on port ${PORT}`))
