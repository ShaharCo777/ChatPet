import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'

import {addPetImages} from '../../actions/petActs'

const PetImage = ( {
            addPetImages,
            src,
            pet
    }) => {

    const [image, setImage] = useState(
            {
            src: src,
            info: ''
          })

    useEffect(() => {
            if(pet !== null) addPetImages(image, pet._id)
            }, [addPetImages, image, pet])
        
    const addInfo = (e) =>{
        setImage({...image, info: e.target.value})
    }
    return (
        <Grid item xs={12} sm={6} lg={4} >
            <span className='petNewImage'>
            <img  src={src} alt='pet image'/>
            <textarea placeholder="Tell As About The Moment You Took The Photo " 
           onChange={(e) => addInfo(e)}></textarea> 
           </span>
        </Grid>
    )
}

const mapStateToProps = state =>({
    pet: state.pets.pet
})

PetImage.propTypes = {
    image: PropTypes.object.isRequired,
    pet: PropTypes.object.isRequired,
    addPetImages: PropTypes.func.isRequired
}


export default connect(mapStateToProps,
    {addPetImages})(PetImage)
