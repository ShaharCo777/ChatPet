import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Dropzone from '../../imageSetting/Dropezone'

import {addPetImages} from '../../../actions/petActs'
const PetPhotos = ({
    photos,
    petId,
    addPetImages
}) => {

const [newPhoto, setNewPhoto] = useState(false)

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

return (
    photos && photos.length > 0 &&
    <div className= 'petImage-container'>
        {newPhoto ? <Dropzone
        onDrop={(e) => onDrop(e)}  
        multiple={false}
        style={'bigDropzone'}/> : 
        showPhoto.src !== '' ?
        (<span className='petImage'>
        <button onClick= {() =>{addPetImages(showPhoto, petId)}}>
        <i className='fa fa-plus fa-lg'/>
        </button><textarea>Click here for adding the photo
        </textarea></span>) :
        <span className='petImage'>
            <button onClick= {() =>{setNewPhoto(!newPhoto)}}>
            <i className='fa fa-plus fa-lg'/>
        </button>
        <textarea>Click here for uploading a photo
            </textarea></span>
    }
    {showPhoto.src !== '' ? 
        <span className='petImage'>
        <img src = {showPhoto.src} alt='pet images'/>
        <textarea value={showPhoto.info} onChange={(e) => addInfo(e)}/>
        </span> : null
        } 
    {photos.map( photo =>
        <span className='petImage'>
        <img src = {photo.src} alt='pet images'/>
        <textarea value={photo.info}/>
        </span>)}
    </div>
)
}

PetPhotos.propTypes = {
photos: PropTypes.object.isRequired,
addPetImages: PropTypes.func.isRequired
}

export default connect(null,
    {addPetImages})(PetPhotos)
