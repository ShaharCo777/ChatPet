import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import {getUserProfile} from '../../../actions/profileActs'


const ProfileItem = ({
    profile: {
        user: {
            _id, 
            name,
            avatar
        }, 
        location,        
    }
}) => {
    useEffect(() => {
        getUserProfile()
      }, [])
    return (
        <div className="profile bg-light">
            <h2>{name}</h2>
            <img  src={avatar}/>
            {location &&
            <p className='my-1'>
                {location.contry}, {location.city}
            </p>}
            <Link to={`/profile/${_id}`} className='btn btn primary'>
                View Profile
            </Link>
        </div>
    )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem
