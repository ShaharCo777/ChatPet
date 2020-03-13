import React from 'react'
import {Link} from 'react-router-dom'

const DashLinks = () => {
    return (
        <div className='dash-buttons'>
            <Link to='/profiles/editProfile' className= 'btn btn-light'>
            <i className='fas fa-edit text-primary'/>  Edit Profile
            </Link>

            <Link to='/pets/new' className= 'btn btn-light'>
              <i className='fas fa-paw text-primary'/>  Add New Pet
            </Link>

            <Link to='/profiles' className= 'btn btn-light'>
              <i className='fas fa-users text-primary'/> Profiles
            </Link>
        </div>
    )
}

export default DashLinks
