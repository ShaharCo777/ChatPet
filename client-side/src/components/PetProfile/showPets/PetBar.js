import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import PetItem from './PetItem'

const PetBar = ({
        pets
}) => {
    return (
    <Fragment >
      {pets && pets.map(pet => 
    <div className='petItem'>
    <PetItem key={pet._id} pet={pet} owmer={false}/>
    </div>
    )}
    </Fragment>
    )
}

PetBar.propTypes = {
pets: PropTypes.object.isRequired
}

export default PetBar