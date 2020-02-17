import React from 'react'
import {Link} from 'react-router-dom'

const DashLinks = () => {
    return (
        <div className='dash-buttons'>
            <Link to='/profiles/editProfile' className= 'btn btn-light'>
              <i className='fas fa-user-circle text-primary'/>  Edit Profile
            </Link>

            <Link to='/pets/new' className= 'btn btn-light'>
              <i className='fas fa-paw text-primary'/>  Add a new pet
            </Link>

            <Link to='/addPhoto' className= 'btn btn-light'>
              <i className='fas fa-camera text-primary'/>  Add a photo
            </Link>
        </div>
    )
}

export default DashLinks
