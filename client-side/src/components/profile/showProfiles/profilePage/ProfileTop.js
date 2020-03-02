import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import PetItem from '../../../PetProfile/showPets/PetItem'
import PetBar from '../../../PetProfile/showPets/PetBar'

const ProfileTop = ({
  profile: {
    location,
    birthDay,
    getDataOf,
    social,
    user: { name, avatar }
  },
  pets
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <div className='userPets'>
        <h3>pets</h3>
      {pets && pets.map(pet => 
    <span >
    <PetItem key={pet._id} pet={pet}/>
    </span>)}
    </div>
    <div className='userProfile'>
      {/* <div className='icons my-1'>
        {getDataOf && getDataOf.otherProfiles && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x' />
          </a>
        )}
        {getDataOf && getDataOf.foroms && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x' />
          </a>
        )}
        {getDataOf && getDataOf.petForSale && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x' />
          </a>
        )}
        {getDataOf && getDataOf.adopters && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x' />
          </a>
        )}
        </div> */}
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      {/* <div>
            {pets.length > 0 ? (
            pets.map(pet => (
              <span className=''>
             <img  src={pet.profileImage} className='' alt='prodile pet image'/>
                  <h3>{pet.name}
                  {pet.sex === 'male' ? (
                  <i className='fas fa-mars fa-lg'></i>
                  ) : (pet.sex === 'female' ? (
                      <i className='fas fa-venus fa-lg'></i>
                  ) : (
                      <i className='fas fa-neuter fa-lg'></i>
                  )
                  )}</h3>
                  </span>
            ))): (null)}
      </div> */}
      <p>{location && <span>{location.contry}, {location.city}
      <br/>{location.street}</span>}</p>
      <div className='icons my-1'>
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x' />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x' />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x' />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x' />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x' />
          </a>
        )}
      </div>
      {birthDay && <small>Born at {birthDay.day}/{birthDay.month}/{birthDay.year}</small>}

    </div>
    {/* {pets && pets.map(pet => 
    <span className='userpets'>
    <PetItem key={pet._id} pet={pet}/>
    </span>)} */}
    </div>
  )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  pets: PropTypes.object.isRequired
}

export default ProfileTop
