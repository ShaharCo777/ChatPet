import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Dropzone from '../../imageSetting/Dropezone'
import PetPhoto from './PetPhoto'

import {addPetImages} from '../../../actions/petActs'

const PetPhotos = ({
    photos,
    petId,
    owner,
    addPetImages
}) => {

const [newPhoto, setNewPhoto] = useState(false)
// const [editText, setEeditText] = useState('')
const [showPhoto, setShowPhoto] = useState({
    src:'',
    info:''
})


const getBase64 = (image) => {
    return new Promise((resolve,reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
      reader.readAsDataURL(image)
  })}

  const onDrop =async e =>{
    setShowPhoto({
       src: await getBase64(e[0])
      })
    setNewPhoto(false)
  }

  const addInfo = e =>{
    setShowPhoto({...showPhoto, info: e.target.value})
}

    // const editInfo = (photo) =>{
    //     setEeditText(photo.info)
    // }

return (
    photos &&
    <div className= 'petImage-container'>
      { owner && (newPhoto ? <Dropzone
        onDrop={(e) => onDrop(e)}  
        multiple={false}
        style={'bigDropzone'}/> : 
        showPhoto.src !== '' ?
        (<span>
        <button className='btnphoto'
         onClick= {() =>{addPetImages(showPhoto, petId)
        setShowPhoto({
            src:'',
            info:''
        })}}>
            SEND
        </button><textarea>Click here for adding the photo
        </textarea></span>) :
        <span>
        <button className='btnphoto' onClick= {() =>{setNewPhoto(!newPhoto)}}>
            <i className='fa fa-plus fa-lg'/>
        </button></span>)
    }
    {showPhoto.src !== '' ? 
        <span className='petImage'>
        <img src = {showPhoto.src} alt='pet images'/>
        <textarea value={showPhoto.info} onChange={(e) => addInfo(e)}/>
        </span> : null
        } 
        {
            photos.map(photo =>
                <PetPhoto key={photo._id} photo={photo} owner={owner}/>
            )}
    </div>
)
}

PetPhotos.propTypes = {
photos: PropTypes.object.isRequired,
addPetImages: PropTypes.func.isRequired,
deletePetPhoto: PropTypes.func.isRequired
}

export default connect(null,
    {addPetImages})(PetPhotos)
