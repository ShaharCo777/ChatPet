import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { getPetById } from '../../../actions/petActs'
import Grid from '@material-ui/core/Grid'


const PetItem = ({
    pet:{
        _id,
        profileImage,
        name,
        cost,
        sex
    }        
    
}) => {
    useEffect(() => {
        getPetById()
    }, [])
    return (
      <Grid item xs={12} md={6} lg={12} >
        <div className="petBarUnit hide-xs">
            {profileImage && 
            <img  src={profileImage} className='petBarImage' alt='prodile pet image'/>
            }
            <h3>{name}
            {sex === 'male' ? (
            <i className='fas fa-mars fa-lg'></i>
            ) : (sex === 'female' ? (
                <i className='fas fa-venus fa-lg'></i>
            ) : (
                <i className='fas fa-neuter fa-lg'></i>
            )
            )}</h3>
            {cost &&
            <p className='my-1'>
                <span>
                {cost} 
               </span>}
            </p>}
            <Link to={`pet/profile/${_id}`} className='btn btn primary'>
                View Profile
            </Link>
        </div>
        </Grid>

    )
}

PetItem.propTypes = {
  pet: PropTypes.object.isRequired,
}

export default PetItem
