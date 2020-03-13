import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { deletePet } from '../../../actions/petActs'


const PetItem = ({
    pet:{
        _id,
        profileImage,
        name,
        cost,
        sex
    },
    owner,
    deletePet 
    
}) => {
    return (
        <div className="petBarUnit hide-xs">
            {profileImage && 
            <img  src={profileImage} className='petBarImage' alt='prodile pet image'/>
            }
            <h2>{name}
            {sex === 'male' ? (
            <i className='fas fa-mars fa-lg'></i>
            ) : (sex === 'female' ? (
                <i className='fas fa-venus fa-lg'></i>
            ) : (
                <i className='fas fa-neuter fa-lg'></i>
            )
            )}</h2>
            {cost &&
            <p className='my-1'>
                <span>
                {cost} 
               </span>
            </p>}
            <button className='btn btn-light'>
            <Link to={`/pet/profile/${_id}`}>
                View Profile
            </Link>
            </button>
            {owner && <button className='btn btn-danger' onClick={() =>
                     deletePet(_id)}>
                <i className="fas fa-trash-alt"/>Delete
            </button>}
        </div>
    )
}

PetItem.propTypes = {
  pet: PropTypes.object.isRequired,
  deletePet: PropTypes.func.isRequired
}

export default connect(null,
    {deletePet})(PetItem)
