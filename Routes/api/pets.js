const express = require('express')
      router  = express.Router()
      midAuth = require("../../middleware/midAuth"),
      {check} = require("express-validator/check")
      Profile = require("../../models/Profile")
      Pets = require("../../models/Pets")
      PetPhotos = require("../../models/PetPhotos")
      User    = require("../../models/User")
      tempImage = require("../../client-side/src/img/tempImage.json")



// @route      get api/pet/petId
// @goal       get spesific pet 
// @access     public
router.get('/profile/:petId', async (req, res) => {
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


// @route      get api/pet/:petId/photos
// @goal       get spesific pet photos
// @access     public
router.get('/:petId/photos', async (req, res) => {
  try {
    const photos = await PetPhotos.find({ pet: req.params.petId}).sort({date: -1})
    res.json(photos)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


// @route    POST api/pet
// @desc     Create  a pet
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
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
  
      const {
        name,
        sex,
        type,
        race,
        traind,
        descreption,
        cost
      } = req.body
      
      const user = req.user.id
      const profileImage = tempImage.tempPetImage
      const birthDate = new Date(req.body.birthDate)
      const adoptionDate = new Date(req.body.adoptionDate)

      try {
        const pet = new Pet({ 
            user,
            profileImage,
            name,
            sex,
            type,
            race,
            adoptionDate,
            birthDate,
            traind,
            descreption,
            cost
        })
        await pet.save()
       res.json(pet)
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    }
  )
  

  // @route    POST /api/pets
// @desc     update a pet
// @access   Private
router.put(
  '/',
  [
    midAuth,
    [
      check('petNew.name', 'Name is required')
        .not()
        .isEmpty(),
      check('petNew.sex', 'Sex is required')
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
      adoptionDate,
      birthDate,
      traind,
      descreption,
      cost
    } = req.body.petNew
    
    try {
      pet = await Pets.findById(req.body.petId)
      pet.name =name
      pet.sex = sex
      pet.cost = cost
      pet.traind = traind
      pet.type = type
      pet.race = race
      pet.adoptionDate = new Date(adoptionDate)
      pet.birthDate = new Date(birthDate)
      pet.descreption = descreption

     await pet.save()
     res.json(pet)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)


// @route    POST api/pet/photos
// @desc     Add photos
// @access   Private
router.post(
  '/photos',
  [
    midAuth,
  ],
  async (req, res) => {
      const pet = req.body.petId,
            src = req.body.image.src,
            info = req.body.image.info
    try {
        
      let petPhoto = new PetPhotos({ 
          pet,
          src,
          info
      })
      await petPhoto.save()
      res.json(petPhoto)
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
)


// @route    POST api/pet/profilePicture
// @desc     Add photos
// @access   Private
  router.post('/profilePicture', [
    midAuth,
],
async(req, res) => {

 const profileImage =req.body.profileImage
try{
pet = await Pets.findById(req.body.petId)
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
router.get('/', midAuth, async (req, res) => {
  try {
    const pets = await Pets.find({user: req.user.id})
    if (!pets) {
      return res.status(400).json({ msg: 'There is not pets  for this user' })
    }
    res.json(pets)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route      get api/pets/allUserPets/usrId
// @goal       get all spesific user pets
// @access     public Private
router.get('/allUserPets/:userId', async (req, res) => {
  try {
    const pets = await Pets.find({ user: req.params.userId})
    if (!pets) {
      return res.status(400).json({ msg: 'There is not pets  for this user' })
    }
    res.json(pets)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route      get /api/pets/PetsForSale
// @goal       get all pets for sale
// @access     public Private
router.get("/petsForSale", midAuth, async (req, res) => {
  console.log('p')
  try {
    const pets = await Pets.find( { cost: { $gte: 0 } } )
    if (!pets) {
      return res.status(400).json({ msg: 'There is not pets  for this user' })
    }
    res.json(pets)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  put /api/pets/photos
// @goal   edit a pet photo
// @access  private
router.put('/photos', midAuth, async (req, res)=>{
  try {
      petPhoto = await PetPhotos.findById(req.body.photoId)

      petPhoto.info =  req.body.info
      petPhoto.save()
      res.json({msg: `pet's photo updated`})
  } catch (err) {
      console.error(err.message) 
      res.status(500).send('Server eror')
  }
})

// @route  delete /api/pets/photos/:photoId
// @goal   delete a pet photo
// @access  private
router.delete('/photos/:photoId', midAuth, async (req, res)=>{
  try {
      await PetPhotos.findByIdAndRemove(req.params.photoId)      
      res.json({msg: `pet's photo remooved`})
  } catch (err) {
      console.error(err.message) 
      res.status(500).send('Server eror')
  }
})

// @route  delete api/pets/:petIid
// @goal   delete a post
// @access  private
router.delete('/:petId', midAuth, async (req, res)=>{
  try {
      const pet = await Pets.findById(req.params.petId)      
      //check user
      if(pet.user.toString()!= req.user.id){
          return res.status(401).json({msg: 'you can delete only your on pets'})
      }
      if(!pet){
          return res.status(400).json({msg: 'Pet not found'})
      }
      await PetPhotos.deleteMany({ pet: req.params.petId })
      pet.remove()
      res.json({msg: 'pet remooved'})
  } catch (err) {
      console.error(err.message)
      
      res.status(500).send('Server eror')
  }
})

module.exports = router