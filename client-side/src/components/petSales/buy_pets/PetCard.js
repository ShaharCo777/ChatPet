import React from 'react'
import {Link} from 'react-router-dom'

const PetCard = ({pet}) => {
    return (
    <div className="card">
        <img  src={pet.profileImage} alt="Card image"/>
        <div >
        <h4>{pet.name}</h4>
        <p>{pet.descreption}</p>
            <Link to={`/pet/profile/${pet._id}`}
            className='btn btn-primary'>
                View Profile
            </Link>
        </div>
    </div>
    )
}

PetCard.propTypes = {

}

export default PetCard
