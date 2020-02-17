const express    = require('express'),
      router     = express.Router(),
      gravatar   = require('gravatar'),
      bcrypt     = require('bcryptjs'),
      jwt        = require('jsonwebtoken'),
      config     = require('config'),
      User       = require("../../models/User"),
      {check, validationResult} = require("express-validator/check")

// @route
// @goal
// @access
router.post('/', [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a vaild email')
    .isEmail(),
    check('password', "Please enter a password with 6 or more characters")
    .isLength({min: 6})
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

        if(user) {
            return res.status(400).json({ errors: [{ msg: "User is already exist"}]})
        }
        //sent an eror if the user exist

        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        // get the user gravatar

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt    = await bcrypt.genSalt(10)
        //salt = random word to hash with
        user.password = await bcrypt.hash(password, salt)
        //encrypt the password

        await user.save()

        const data ={
            user: {
                id: user.id
            }
        }

        jwt.sign(
             data,
             config.get('jwtSecret'),
             {expiresIn: 360000},
             (err, token) => {
                 if (err){
                      throw err
                    }
                 res.json({ token})
             }
        )
        //sign the token and sent it to the client
        res.send("its all work")
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
      }
})


module.exports = router