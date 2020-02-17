import React, {useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {getUserProfile, deleteAccount 
} from '../../actions/profileActs'
import {getUserPets
} from '../../actions/petActs'

import PetBar from '../PetProfile/showPets/PetBar'
import spinner from '../../img/spinner.gif'
import DashLinks from './DashLinks'

const Dashboard = ({
    getUserProfile,
    deleteAccount,
    getUserPets,
    auth: {user},
    profile:{
        loading,
        profile,
    },
    pets
    }) => {
    useEffect(() => {
        getUserProfile()
        getUserPets()
      }, [getUserProfile, getUserPets])

    return (
        loading && profile === null ? 
        <img src={spinner} alt='Loading...'
        /> : <Fragment >
            <span className='profileImage'>
            <Link to='/profiles/profilePicture/update' >
            <button>Edit</button>
             <img  src={profile && profile.profileImage ? (
                 profile.profileImage):(user && user.avatar)}
                 alt='profile image' />
             </Link></span> 
             <h1 className='large text-primary'>Home Page</h1>
                    <p className='lead'>
                    <i className='fas fa-user'></i>
                    Welcome {user && user.name}</p>
                {profile && profile.birthDay ? (
                <Fragment>    
                <PetBar pets={pets}/>
                <DashLinks/>
                </Fragment>
                ) :(
                <Fragment>
                    <p>You don't have a profile,</p>
                    <p>for setting one, please click on "Create Profile"</p><br/>
                    <Link to='/profiles/new' className='btn btn-primary my-1'>
                        Create Profile
                    </Link>
                </Fragment>
                )}
                <div className='my-2'>
                <button className='btn btn-danger' onClick={() =>
                     deleteAccount()}>
                     Delete My Account
                </button>
                </div>
             </Fragment>
    )
}

const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile,
    pets: state.pets.pets
})

Dashboard.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    getUserPets: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    pets: PropTypes.array.isRequired
}

export default connect(mapStateToProps,
{ getUserProfile, deleteAccount, getUserPets})(Dashboard)
