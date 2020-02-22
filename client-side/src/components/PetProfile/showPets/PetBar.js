import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import PetItem from './PetItem'

const PetBar = ({
        pets
}) => {
    return (
        <div className='petBar'>
        <Grid container spacing={2}>
            {pets && pets.map(pet => 
                <PetItem key={pet._id} pet={pet}/>
            )}
        </Grid>
        </div>
    )
}

PetBar.propTypes = {
pets: PropTypes.object.isRequired
}

export default PetBar

