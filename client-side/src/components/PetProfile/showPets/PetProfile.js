import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { getPetById, getPetPhotos, deletePet } from '../../../actions/petActs'

import spinner from '../../../img/spinner.gif'

function PetProfile({
    getPetById,
    getPetPhotos,
    deletePet,
    match,
    history,
    pet:{
        pet,
        loading,
        photos
    }
}) {
useEffect(() => {
    getPetById(match.params.petId)
    getPetPhotos(match.params.petId)
    }, [getPetById, getPetPhotos, match])


    return (
        <Fragment>
        {loading && pet === null ? (
            <img src={spinner} alt='Loading...'/>
            ) : (
            
        <Fragment>
            <div>
            <span className='profileImage'>
            <Link to='/pets/profilePicture/update' >
            <button>Edit</button>
            <img  src={pet && pet.profileImage}
                 alt='profile image' />
            </Link>
            </span>
            <h1 className='petName'>
                 {pet && pet.name}'s Page
            </h1></div>
            <div>{pet && pet.descreption}</div>
            {/* {photos && photos.length > 0 ? (
            <Fragment>
            
            <div>
            {photos.map( photo =>
                <span className='petImage'>
                <img src = {photo.src} alt='pet images'/></span>)}
                </div></Fragment>) : (null)} */}
        </Fragment>)}
        <div className='dash-buttons'>
            <Link to={`/pets/edit/${match.params.petId}`} className= 'btn btn-light'>
              <i className='fas fa-user-circle text-primary'/>  Edit Profile
            </Link> </div>
        <button className='btn btn-danger' onClick={() =>
                     deletePet(match.params.petId, history)}>
                     Delete {pet && pet.name}'s page
                </button>
        </Fragment>
    )
}

const mapStateToProps = state =>({
    pet: state.pets
})

PetProfile.propTypes = {
getPetById: PropTypes.func.isRequired,
getPetPhotos: PropTypes.func.isRequired,
deletePet: PropTypes.func.isRequired,
pet: PropTypes.object.isRequired
}

export default connect(mapStateToProps,
    {getPetById,  getPetPhotos, deletePet}
    )(PetProfile)

