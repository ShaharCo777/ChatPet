import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import { getPetById, getPetPhotos, deletePet } from '../../../actions/petActs'
import { getAge } from '../../../actions/generalActs'

import spinner from '../../../img/spinner.gif'
import PetPhotos from './PetPhotos'

function PetProfile({
    getPetById,
    getPetPhotos,
    deletePet,
    match,
    history,
    auth,
    pet:{
        pet,
        loading,
        photos
    }
}) {

const [age, setAge] = useState(null)

useEffect(() => {
    getPetById(match.params.petId)
    getPetPhotos(match.params.petId)
    }, [getPetById, getPetPhotos, match])


    useEffect(() => {
        if(pet && pet.birthDate){ 
            setAge(getAge(pet.birthDate))
        } 
    }, [pet])

    return (
        <Fragment>
        {loading && pet === null ? 
            (<img src={spinner} alt='Loading...'/>)
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
            <span className='icons'>
            {pet.cost && <i className="fas fa-dollar-sign fa-lg"></i>}
            {pet.sex === 'male' ? (
            <i className='fas fa-mars fa-lg'></i>
            ) : (pet.sex === 'female' ? (
                <i className='fas fa-venus fa-lg'></i>
            ) : (
                <i className='fas fa-neuter fa-lg'></i>
            )
            )}
            </span>
            </div>
            <div className='petDescrption'>
             {pet.descreption}
            </div>
            {pet.adoptionDate && <h4 className='adoptionDate'>Together since {pet.adoptionDate.split("T")[0]}</h4>}
            <div className='petInfo'>
            {pet.traind && <i className="far fa-check-square"> Traind</i>}               
            {age && <strong>Age: {age}<br/></strong>}
            {pet.type && <strong>Type: {pet.type}<br/></strong>}
            {pet.cost && <small id='petCost'>Price: ${pet.cost}</small>}
            {pet.race && <strong>Race: {pet.race}<br/></strong>}
            </div>
            {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === pet.user ? (
            <Fragment>
            <PetPhotos photos={photos} petId={match.params.petId} owner={true}/>
            <div className='dash-buttons'>
            <button className='btn btn-dark'>
            <Link to={`/pets/edit/${match.params.petId}`}>
              <i className='fas fa-feather-alt text-primary'/>  Edit Profile
            </Link>
            </button>
            <button className='btn btn-danger' onClick={() =>
                     deletePet(match.params.petId, history)}>
                     Delete {pet && pet.name}'s Page
            </button>
            </div> </Fragment> ):(
            <PetPhotos photos={photos} petId={match.params.petId} owner={false}/>
            )}
            </Fragment>}
        </Fragment>
    )
}

const mapStateToProps = state =>({
    auth: state.auth,
    pet: state.pets
})

PetProfile.propTypes = {
getPetById: PropTypes.func.isRequired,
getPetPhotos: PropTypes.func.isRequired,
deletePet: PropTypes.func.isRequired,
getAge: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
pet: PropTypes.object.isRequired
}

export default connect(mapStateToProps,
    {getPetById, getPetPhotos, deletePet, getAge}
    )(PetProfile)

