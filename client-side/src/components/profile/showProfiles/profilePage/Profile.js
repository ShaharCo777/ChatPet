import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getProfileById } from '../../../../actions/profileActs'
import {getPetsByUserId } from '../../../../actions/petActs'

import spinner from '../../../../img/spinner.gif'
import ProfileTop from './ProfileTop'
import ProfileDescription from './ProfileDescription'
import PetBar from '../../../PetProfile/showPets/PetBar'

const Profile = ({
  getProfileById,
  getPetsByUserId,
  profile: { 
    profile, 
    loading 
  },
  pets,
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
    getPetsByUserId(match.params.id)
  }, [
    getProfileById,
    getPetsByUserId,
    match.params.id
  ])
  return (
    <Fragment>
      {profile === null || loading ? (
        <img src={spinner} alt='Loading...'/>
        ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/profiles/editProfile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
          <ProfileTop profile={profile} pets={pets}/>
          <div className='userPets'>
          <h4 className='text-dark'>{profile.user.name.trim().split(' ')[0]}'s pets</h4>
          <PetBar pets={pets}/>
          </div>
            <ProfileDescription profile={profile} pets={pets}/> 
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  pets: state.pets.pets
})


Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getPetsByUserId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  pets: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}


export default connect(mapStateToProps,
{ getProfileById, getPetsByUserId })(Profile)
