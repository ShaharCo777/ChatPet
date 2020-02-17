import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileDescription = ({
  profile: {
    general,
    images,
    user: { name }
  }
}) => (
  
  <div className='profile-about bg-light p-2'>
    {general && (
      <Fragment>
        <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
        <p>{general}</p>
        <div className='line' />
      </Fragment>
    )}
    <h2 className='text-primary'>Skill Set</h2>
    <div className='skills'>
      {images && images.map((image, index) => (
        <div key={index} className='p-1'>
        <img src={image.src}/>
        </div>
      ))}
    </div>
  </div>
)

ProfileDescription.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileDescription
