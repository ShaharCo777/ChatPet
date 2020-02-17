const express = require('express'),
      router  = express.Router(),
      midAuth    = require("../../middleware/midAuth"),
      jwt     = require('jsonwebtoken'),
      config  = require('config'),
      bcrypt  = require('bcryptjs')
      User    = require("../../models/User"),
      {check, validationResult} = require("express-validator/check")

// @route
// @goal
// @access
router.get('/', midAuth, async (req, res) => {
    try{

        // get the data of the user(minos the password) with the user id
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Eror')
    }
})



// @route    post api/auth
// @goal     authenticate user & get token
// @access   public

router.post('/', [
    check('email', 'Please include a vaild email')
    .isEmail(),
    check('password', "password is required")
    .exists()
    //check name, mail, password
],
async (req, res) =>{
     const errors = validationResult(req)
     if(!errors.isEmpty()){
         return res.status(400).json({
             errors: errors.array()
         })
     }

     const { name, email, password } = req.body

     try{
        let user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({
                 errors: [{
                      msg: "Invalid credentials"
                    }]
                })
        }
        //sent an eror if the user not valid

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res
            .status(400)
            .json({
                msg: "Invalid credentials"
            })
        }
        //check if the crypted password from the token equals to the user password

        const data ={
            user: {
                id: user.id
            }
        }

        jwt.sign(
             data,
             config.get('jwtSecret'),
             {expiresIn: 36000},
             (err, token) => {
                 if (err){
                      throw err
                    }
                 res.json({ token})
             }
        )
        //sign the token and sent it to the client
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
})


module.exports = router