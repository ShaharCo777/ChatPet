import axios from 'axios'
import {setAlert} from './alertAct'
import{
    GET_PET,
    GET_PETS,
    ADD_PHOTO,
    PET_PHOTOS,
    DELETE_PET,
    DELETE_PHOTO,
    PET_ERROR
  } from './consts'


//create a pet profile
export const createPet = (petFormData, history) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }

        const res = await axios.post('/api/pets', petFormData, config)

         dispatch({
            type: GET_PET,
            data: res.data
        })

        dispatch(setAlert('Pet Profile Created', 'success'))

        history.push('/dashboard')
        
    } catch (err) {
        const errors = err.response.data.errors;
  
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PET_ERROR,
            data: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//updite pet profile
export const updatePet = (petFormData, petId, history) => async dispatch => {
  try {
      const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const data = {
          petId: petId,
          petNew: petFormData
        }
      const res = await axios.put('/api/pets', data, config)

       dispatch({
          type: GET_PET,
          data: res.data
      })

      dispatch(setAlert('Pet Profile Updated', 'success'))

      history.push('/dashboard')
      
  } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
          type: PET_ERROR,
          data: {
              msg: err.response.statusText,
              status: err.response.status
          }
      })
  }
}

//add photos to pet
export const addPetImages = (image, petId)  => async dispatch =>{
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    const data ={
        image: image,
        petId: petId
        }

    try {
         const res = await axios.post(`/api/pets/photos`, data, config)
        dispatch({
          type: ADD_PHOTO,
          data: res.data
      })
      console.log(image)
      console.log(res.data)
      dispatch(setAlert('Photo added', 'success'))
      } catch (err) {
         setAlert(err, 'danger')
        
        dispatch({
            type: PET_ERROR,
            data: {
                msg: err,
                status: err
            }
        })
      }
}

//create or updite pet profile picture
export const createPetProfilePicture = (image, petId, history) => async dispatch => {
  try {
      const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

      const data = {
          profileImage: image,
          petId: petId
      }
      const res = await axios.post('/api/pets/profilePicture', data, config)


          dispatch({
              type: GET_PET,
              data: res.data
          })

      dispatch(setAlert('Profile Picture is set', 'success'))

      history.push('/dashboard')
} catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
          type: PET_ERROR,
          data: {
              msg: err.response.statusText,
              status: err.response.status
      }
      })
  }
}

//edit info of pet photo
export const editPetImage = (info, photoId)  => async dispatch =>{
  const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const data = {
      info: info,
      photoId: photoId
    }
  try {
    await axios.put('/api/pets/photos', data, config)

    dispatch(setAlert('Photo edited', 'success'))
    } catch (err) {
       setAlert(err, 'danger')
      
      dispatch({
          type: PET_ERROR,
          data: {
              msg: err,
              status: err
          }
      })
    }
}

//get user pet profile
export const getPetById = petId => async dispatch => {
  try{
    const res = await axios.get(`/api/pets/profile/${petId}`)
  
      dispatch({
          type: GET_PET,
          data: res.data
      })
  } catch (err){
      dispatch({
          type: PET_ERROR,
          data: {
              msg: err,
              status: err
      }
      })
}}

  
//  get pet photos by petId
export const getPetPhotos = petId => async dispatch => {
  try{
    const res = await axios.get(`/api/pets/${petId}/photos`)
      dispatch({
          type: PET_PHOTOS,
          data: res.data
      })
  } catch (err){
      dispatch({
          type: PET_ERROR,
          data: {
              msg: err,
              status: err
      }
      })
    }
}


// get all the user pets
export const getUserPets = () => async dispatch => {
  try{
        const res = await axios.get('/api/pets')
          dispatch({
              type: GET_PETS,
              data: res.data
          })
      } catch (err){
          dispatch({
              type: PET_ERROR,
              data: {
                  msg: err.response.statusText,
                  status: err.response.status
          }
          })
        }
}

// get all the user pets
export const getPetsByUserId = userId => async dispatch => {
  try{
        const res = await axios.get(`/api/pets/allUserPets/${userId}`)
          dispatch({
              type: GET_PETS,
              data: res.data
          })
      } catch (err){
          dispatch({
              type: PET_ERROR,
              data: {
                  msg: err.response.statusText,
                  status: err.response.status
          }
          })
        }
}

export const getPetsForSale = () => async dispatch =>{
  try{
    const res = await axios.get('/api/pets/petsForSale')
    dispatch({
      type: GET_PETS,
      data: res.data
  })
  } catch(err){
    dispatch({
      type: PET_ERROR,
      data: {
          msg: err,
          status: err
  }
  })
  }
}

//delete pet
export const deletePet = (petId, history) => async dispatch =>{
  if (window.confirm('Are you sure?')) {
  try {
      await axios.delete(`/api/pets/${petId}`)
      dispatch({
          type: DELETE_PET,
          data: petId
      })
      if(history) history.push('/dashboard')
      console.log('maybe here')
      dispatch(setAlert('Pet Removed', 'success'))
  } catch (err) {
      dispatch({
          type: PET_ERROR,
          data: { 
              msg: err,
              status: err
          }
      })
  }}
}

//delete pet photo
export const deletePetPhoto = (photoId) => async dispatch =>{
  if (window.confirm('Are you sure?')) {
  try {
      await axios.delete(`/api/pets/photos/${photoId}`)

      dispatch({
          type: DELETE_PHOTO,
          data: photoId
      })
      dispatch(setAlert('Pet Photo Removed', 'success'))
  } catch (err) {
      dispatch({
          type: PET_ERROR,
          data: { 
              msg: err,
              status: err
          }
      })
  }}
}