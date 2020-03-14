import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import spinner from '../../../img/spinner.gif'
import PetItem from '../../PetProfile/showPets/PetItem'
import PetCard from './PetCard'

import {getPetsForSale} from '../../../actions/petActs'

const PetsForSale = ({
    getPetsForSale,
    pets: {
        pets, 
        loading
    }
}) => {

    useEffect(() => {
        getPetsForSale()
    }, [getPetsForSale])
    return (
        <Fragment>
        {loading && pets === null ? 
            (<img src={spinner} alt='Loading...'/>)
             : 
            pets && <Grid container justify="center" spacing={4} >
            {pets.map(pet =>
            <Grid item md={4}> 
                <PetCard key={pet._id} pet={pet}/>
                </Grid>
            )}       
        </Grid>
}
</Fragment>
)}
const mapStateToProps = state =>({
    pets: state.pets
})

PetsForSale.propTypes = {
    getPetsForSale: PropTypes.func.isRequired
}

export default connect(mapStateToProps,
    {getPetsForSale})(PetsForSale)
