import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { getPetById, getPetPhotos } from '../../../actions/petActs'

import spinner from '../../../img/spinner.gif';



function PetProfile({
    getPetById,
    getPetPhotos,
    match,
    pet:{
        pet,
        loading,
        photos
    }
}) {
useEffect(() => {
    getPetById(match.params.petId)
    getPetPhotos(match.params.petId)
    }, [getPetById, getPetPhotos, match.params.petId])


    return (
        <Fragment>
        {loading ? (
            <img src={spinner} alt='Loading...'/>
            ) : (
        <Fragment>
            <h1>{pet && pet.name}</h1>
            {photos && photos.length > 0 ? (
            <Fragment>
            <span className='profileImage'>
            <Link to='/pets/profilePicture/update' >
            <button>Edit</button>
             <img  src={pet.profileImage ? (
                 pet.profileImage
                ) : (
                 photos[0].src)}
                 alt='profile image' />
             </Link></span> 
            <div>
            {photos.map( photo =>
                <span className='petImage'>
                <img src = {photo.src} alt='pet images'/></span>)}
                </div></Fragment>) : (null)}
        </Fragment>)}
        </Fragment>
    )
}

const mapStateToProps = state =>({
    pet: state.pets
})

PetProfile.propTypes = {
getPetById: PropTypes.func.isRequired,
getPetPhotos: PropTypes.func.isRequired,
pet: PropTypes.object.isRequired,
}

export default connect(mapStateToProps,
    {getPetById,  getPetPhotos}
    )(PetProfile)

