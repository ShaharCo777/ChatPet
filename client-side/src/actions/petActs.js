import axios from 'axios'
import {setAlert} from './alertAct'
import{
    GET_PET,
    GET_PETS,
    PET_PHOTOS,
    DELETE_PET,
    PET_ERROR
  } from './consts'


//create a pet profile
export const createPet = (petFormData, history) => async dispatch => {
    try {
      console.log(petFormData)
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

      const res = await axios.post(`/api/pets/${petId}`, petFormData, config)

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
        image: image
        }

    try {
        await axios.post(`/api/pets/${petId}/photos`, data, config)
      } catch (err) {
        const errors = err.response.data.errors
  
        if (errors) {
          errors.forEach(error => setAlert(error.msg, 'danger'))
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

//create or updite pet profile picture
export const createPetProfilePicture = (image, petId, history) => async dispatch => {
  try {
      const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

      const data = {
          profileImage: image
      }
      const res = await axios.post(`/api/pets/${petId}/profilePicture`, data, config)


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


//get user pet profile
export const getPetById = petId => async dispatch => {
  try{
    const res = await axios.get(`/api/pets/${petId}`)
  
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
        const res = await axios.get(`/api/pets`)
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


//delete pet
export const deletePet = (petId, history) => async dispatch =>{
  if (window.confirm('Are you sure?')) {
  try {
      await axios.delete(`/api/pets/${petId}`)

      dispatch({
          type: DELETE_PET,
          data: petId
      })
      history.push('/dashboard')
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