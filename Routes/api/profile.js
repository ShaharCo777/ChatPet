const express = require('express'),
      router  = express.Router(),
      midAuth = require("../../middleware/midAuth")
      Profile = require("../../models/Profile")
      User    = require("../../models/User"),


// @route   get api/profile/me
// @goal    get current user profile
// @access   private
router.get('/me', midAuth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        if(!profile){
            return res.status(400).json({
                msg: 'Profile dose not exist'
            })
        }
        res.json(profile)
    }catch(err){
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

// @route   post api/profile
// @goal    creat profile
// @access   public
router.post('/me', [
    midAuth, [
        check('contry', 'Contry is required')
        .not()
        .isEmpty(),
        check('birthDate', 'date of birth is required')
        .not()
        .isEmpty()
    ]
],
async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }
 const {
    contry,
    city,
    street,
    birthDate,
    when,
    how,
    what,
    favePet,
    otherProfiles,
    foroms,
    petForSale,
    adopters,
    genral,
    twitter,
    youtube,
    facebook,
    instagram
 } = req.body
 //build profile object
const profileFields = {}
profileFields.user = req.user.id
if(genral) profileFields.genral = genral
if(birthDate) profileFields.birthDate = new Date(birthDate)

profileFields.location ={}
profileFields.location.contry = contry
if(city) profileFields.location.city = city
if(street) profileFields.location.street = street

profileFields.loveToPet ={}
if(when) profileFields.loveToPet.when = when
if(what) profileFields.loveToPet.what = what
if(how) profileFields.loveToPet.how = how
if(favePet) profileFields.loveToPet.favePet = favePet

profileFields.getDataOf = {}
if(otherProfiles) profileFields.getDataOf.otherProfiles =otherProfiles
if(foroms) profileFields.getDataOf.foroms =foroms
if(petForSale) profileFields.getDataOf.petForSale =petForSale
if(adopters) profileFields.getDataOf.adopters =adopters

profileFields.social ={}
 if(youtube) profileFields.social.youtube = youtube
 if(facebook) profileFields.social.facebook = facebook
 if(instagram) profileFields.social.instagram = instagram
 if(twitter) profileFields.twitter = twitter
try{
    // update/create
    profile = await Profile.findOneAndUpdate(
        { user: req.user.id},
        {$set: profileFields},
        {new: true, upsert: true}
    )
    return res.json(profile)

} catch (err){
    console.error(err.message)
    res.status(500).send('Server eror')
    
}

})


// @route   post /api/profile/profilrPicture
// @goal    creat profile picture
// @access   public


router.post('/profilePicture', [
    midAuth,
],
async(req, res) => {

 const profileImage =req.body.profileImage

try{
    const user = await User.findById(req.user.id)
        user.avatar = profileImage
        user.save()
        return res.json(user)

} catch (err){
    console.error(err.message)
    res.status(500).send('Server eror')
    
}
})


// @route   get api/profile
// @goal    get all profiles
// @access   public

router.get('/', [ midAuth,
], async (req, res) => {
    try {
        let profiles = await Profile.find().populate('user', ['name', 'avatar'])
        profiles = profiles.filter(profile =>
            profile.user._id != req.user.id)
        res.json(profiles)
    } catch (error) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

// @route   get api/profile/user/:id
// @goal    get profile by user id
// @access   public

router.get('/user/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.id}).populate('user', ['name', 'avatar'])
        if(!profile) return res.status(400).json({ msg: 'Profile not found'})
        res.json(profile)
    } catch (error) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found'})
        }
        res.status(500).send('server error')
    }
})

router.delete('/me', midAuth, async (req, res) => {
    try {
      // Remove user posts
      await Post.deleteMany({ user: req.user.id })
      // Remove user pets
      await Pets.deleteMany({ user: req.user.id })
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });
  
      res.json({ msg: 'User deleted' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
})

module.exports = router