import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import PetBar from '../../../PetProfile/showPets/PetBar'

const ProfileDescription = ({
  profile: {
    genral,
    loveToPet,
    images,
    pets,
    user: { name }
  }
}) => (

  <div className='profile-about bg-light p-2'>
    {genral && (
      <span>
        <i className="fas fa-quote-left"></i><br/>
        <strong > ~  {genral}  ~  </strong><br/>
        <i className="fas fa-quote-right"></i>
        <div className='line' />
      </span>
    )}
    {loveToPet && <Fragment>
     <h2 className='text-dark'>{name.trim().split(' ')[0]}'s Love to pets</h2>
     {loveToPet.when && <span><h4><strong className='questions'>"When it started?":</strong>{loveToPet.when}</h4></span> }
     {loveToPet.how && <span><h4><strong className='questions'>"How it started?":</strong>{loveToPet.how}</h4></span>}
     {loveToPet.what && <span><h4><strong className='questions'>"What you did with it":</strong>{loveToPet.what}</h4></span>}
     {loveToPet.favePet && <span><h4><strong className='questions'>"Favorit Pet:"</strong>{loveToPet.favePet}</h4></span>}
    </Fragment>}
  </div>
)

ProfileDescription.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileDescription
