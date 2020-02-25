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
        {loading && pet === null ? 
            <img src={spinner} alt='Loading...'/>
             : 
            pet && <Fragment>
            <div className='petTop'>
            <span className='profileImage'>
            <Link to='/pets/profilePicture/update' >
            <button>Edit</button>
            <img  src={pet.profileImage}
                 alt='profile image' />
            </Link>
            </span>
            <h1 className='petName'>
                 {pet.name}'s Page
            </h1>
            {pet.sex === 'male' ? (
            <i className='fas fa-mars fa-lg'></i>
            ) : (pet.sex === 'female' ? (
                <i className='fas fa-venus fa-lg'></i>
            ) : (
                <i className='fas fa-neuter fa-lg'></i>
            )
            )}
            </div>
            <div className='petDescrption'>
             {pet.descreption}
            </div>
            <div>
            {pet.type || pet.traind ?
            <small>
                {pet.name} is a {pet.traind && 'traind '} 
                {pet.type}
                {pet.race && ` from  a ${pet.race} race`}
            </small> :pet.race && `${pet.name} is from a ${pet.race}`}
            {pet.age && <small id='petAge'>{pet.age} years old</small>}
            </div>
            {/* {photos && photos.length > 0 ? (
            <Fragment>
            
            <div>
            {photos.map( photo =>
                <span className='petImage'>
                <img src = {photo.src} alt='pet images'/></span>)}
                </div></Fragment>) : (null)} */}
        </Fragment>}
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

