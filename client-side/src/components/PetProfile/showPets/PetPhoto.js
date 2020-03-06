import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {editPetImage, deletePetPhoto} from '../../../actions/petActs'

const PetPhoto = ({
    photo,
    owner,
    editPetImage,
    deletePetPhoto
}) => {
    const [editText, setEditText] = useState(false)
    const [info, setInfo] = useState(photo.info)

    const addInfo = e =>{
        if(editText){
            console.log('p')
            setInfo(e.target.value)
        }
    }
    
    const sentInfo = () =>{
        editPetImage(info, photo._id)
        setEditText(false)
    }
    return (
        <span className='petImage'>
        <img src = {photo.src} alt='pet images'/>
        <textarea value={info} onChange={editText ? (e) =>
             addInfo(e) : null} />
        {owner && 
        (!editText ?
        <Fragment><button className='btn-dark' onClick={() => 
            setEditText(true)}>Edit Text</button>
        <button className='btn-danger' onClick={() => 
            {deletePetPhoto(photo._id)}}>Delete</button>
            </Fragment> : <Fragment>
        <button className='btn-success' onClick= {() =>
            sentInfo() }>Send</button>
        <button className='btn-warning' onClick={() => 
            setEditText(false) }>Cancel</button>
            </Fragment>)}</span>
    
    )}

PetPhoto.propTypes = {
    photo: PropTypes.object.isRequired,
    editPetImage: PropTypes.func.isRequired,
    deletePetPhoto: PropTypes.func.isRequired
}

export default connect(null,
    {editPetImage, deletePetPhoto})(PetPhoto)
