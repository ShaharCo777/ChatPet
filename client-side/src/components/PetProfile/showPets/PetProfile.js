import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { getPetById, getPetPhotos } from '../../../actions/petActs'
import {connect} from 'react-redux'
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
        {pet === null || loading ? (
            <img src={spinner} alt='Loading...'/>
            ) : (
        <Fragment>
            <h1>{pet.name}</h1>
            <div>
            {photos.length > 0 && photos.map( photo =>
                <span className='petImage'>
                <img src = {photo.src} alt='pet images'/></span>)}
                </div>
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

