import React, {useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import {getUserProfile, deleteAccount 
} from '../../actions/profileActs'
import {getUserPets
} from '../../actions/petActs'

import spinner from '../../img/spinner.gif'
import DashLinks from './DashLinks'
import PetItem from '../PetProfile//showPets/PetItem'

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
            <div className='userPet'>
        <Grid container spacing={2}>
            {pets && pets.map(pet => 
                <Grid item xs={12} md={6} lg={12} >
                <PetItem key={pet._id} pet={pet} owner={true}/>
                <br/><br/>
                </Grid>
            )}
            </Grid>
            </div>
            <span className='profileImage'>
            <Link to='/profiles/profilePicture/update' >
            <button>Edit</button>
             <img  src={user && user.avatar}
                 alt='profile image' />
             </Link></span> 
             <h1 className='large text-primary half'>Home Page</h1>
                    <p className='lead half'>
                    <i className='fas fa-user'></i>
                    Welcome {user && user.name}</p>
                {profile && profile.birthDay ? (
                <Fragment>    
            <DashLinks/>
                </Fragment>
                ) :(
                <Fragment>
                    <p>You don't have a profile,</p>
                    <p>for setting one, please click on "Create Profile"</p><br/>
                    <Link to='/profiles/new' className='btn btn-primary my-1'>
                    <i className="fas fa-user-circle"/>Create Profile
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
