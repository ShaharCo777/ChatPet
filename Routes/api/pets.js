const express = require('express'),
      router  = express.Router(),
      midAuth = require("../../middleware/midAuth")
      Profile = require("../../models/Profile")
      Pets = require("../../models/Pets")
      PetPhotos = require("../../models/PetPhotos")
      User    = require("../../models/User"),



// @route      get api/pet/petId
// @goal       get spesific pet 
// @access     public
router.get('/:petId', async (req, res) => {
    try {
      const pet = await Pets.findById(req.params.petId)
      if (!pet) {
        return res.status(400).json({ msg: 'There is no profile available for this pet' });
      }
  
      res.json(pet)
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  })


// @route      get api/pet/petId
// @goal       get spesific pet 
// @access     public
router.get('/:petId/photos', async (req, res) => {
  try {
    const photos = await PetPhotos.find({ pet: req.params.petId})

    res.json(photos)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


// @route    POST api/pet
// @desc     Create or update a pet
// @access   Private
router.post(
    '/',
    [
      midAuth,
      [
        check('name', 'Name is required')
          .not()
          .isEmpty(),
        check('sex', 'Sex is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        name,
        sex,
        type,
        race,
        age,
        traind,
        descreption,
        cost
      } = req.body
      
      const user = req.user.id



      try {
        let pet = new Pet({ 
            user,
            name,
            sex,
            type,
            race,
            age,
            traind,
            descreption,
            cost
        })
        await pet.save()
        await Profile.findOneAndUpdate(
          { user: req.user.id},
          {$addToSet: {pets: pet.id}},
          {new: true, upsert: true})
       res.json(pet);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  

  
// @route    POST api/pet/:petId
// @desc     Add photos
// @access   Private
router.post(
    '/photos',
    [
      midAuth,
    ],
    async (req, res) => {
        const pet = req.body.petId
        const src = req.body.image.src
        const info = req.body.image.info
      try {

        let petPhoto = new PetPhotos({ 
            pet,
            src,
            info
        })

        await petPhoto.save()
        res.send('The image uploaded')
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  )


// @route    POST api/pet/profilePicture
// @desc     Add photos
// @access   Private
  router.post('/:id/profilePicture', [
    midAuth,
],
async(req, res) => {

 const profileImage =req.body.profileImage
try{
pet = await Pets.findById(req.params.id)
pet.profileImage =profileImage
await pet.save()
res.json(pet)
} catch (err){
    console.error(err.message)
    res.status(500).send('Server eror')
    
}
})

  // @route      get api/pets
// @goal       get all user pets
// @access     public Private
router.get('/',
[
  midAuth,
],
 async (req, res) => {
  try {
    const pets = await Pets.find({ user: req.user.id})
    if (!pets) {
      return res.status(400).json({ msg: 'There is not pets  for this user' })
    }

    res.json(pets)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


// @route  delete api/pets/:petIid
// @goal   delete a post
// @access  private
router.delete('/:petId', midAuth, async (req, res)=>{
  try {
      const pet = await Pets.findById(req.params.petId)
      
      //check user
      if(post.user.toString()!= req.user.id){
          return res.status(401).json({msg: 'you can delete only your on pets'})
      }
      await pet.remove()
      res.json({msg: 'pet remooved'})
      if(!pet){
          return res.status(400).json({msg: 'Pet not found'})
      }
      res.json(pet)
  } catch (err) {
      console.error(err.message)
      
      res.status(500).send('Server eror')
  }
})

module.exports = router