import axios from 'axios'
import {setAlert} from './alertAct'

import{
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    UPDATE_PROFILE_USER,
    PROFILE_ERROR,
    ACCOUNT_DELETED
  } from './consts'



//create or updite profile
export const createProfile = (FormData, history, edit = false) => async dispatch => {
  try {
      const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

      const res = await axios.post('/api/profile/me', FormData, config)

      dispatch({
          type: GET_PROFILE,
          data: res.data
      })

      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))
      if(!edit){
          history.push('/profiles/profilePicture')
      } 

      history.push('/dashboard')
      
  } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
          type: PROFILE_ERROR,
          data: {
              msg: err.response.statusText,
              status: err.response.status
      }
  })
  }
}


//get user profile
export const getUserProfile = () => async dispatch => {
try{
  const res = await axios.get('/api/profile/me')
    dispatch({
        type: GET_PROFILE,
        data: res.data
    })
} catch (err){
    dispatch({
        type: PROFILE_ERROR,
        data: {
            msg: err,
            status: err
    }
    })

}
}


// get all the profiles
export const getProfiles = () => async dispatch => {
      dispatch({type: CLEAR_PROFILE})
      try{
        const res = await axios.get('/api/profile')
      
          dispatch({
              type: GET_PROFILES,
              data: res.data
          })
      } catch (err){
          dispatch({
              type: PROFILE_ERROR,
              data: {
                  msg: err.response.statusText,
                  status: err.response.status
          }
          })
        }
}


// get profile by id
export const getProfileById = userId => async dispatch => {
  try{
    const res = await axios.get(`/api/profile/user/${userId}`)
  
      dispatch({
          type: GET_PROFILE,
          data: res.data
      })
  } catch (err){
      dispatch({
          type: PROFILE_ERROR,
          data: {
              msg: err,
              status: err
      }
      })
    }
}


//create or updite profile picture
export const createPictureProfile = (image, history) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }

        const data = {
            profileImage: image
        }
        const res = await axios.post('/api/profile/profilePicture', data, config)


            dispatch({
                type: UPDATE_PROFILE_USER,
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
            type: PROFILE_ERROR,
            data: {
                msg: err.response.statusText,
                status: err.response.status
        }
        })
    }
}


// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await axios.delete('/api/profile/me')
  
        dispatch({ type: CLEAR_PROFILE })
        dispatch({ type: ACCOUNT_DELETED })
  
        dispatch(setAlert('Your account has been permanantly deleted'))
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        })
      }
    }
    //תזכור להוסיף פקודה שמוחקת את כל החיות של המשתמש
}