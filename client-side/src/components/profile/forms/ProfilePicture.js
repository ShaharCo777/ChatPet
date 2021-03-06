import React, { Fragment, useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter, Link} from 'react-router-dom'

import {createPictureProfile} from '../../../actions/profileActs'

import Cropper from 'react-easy-crop'
import getCroppedImg from '../../imageSetting/cropImage'
import spinner from '../../../img/spinner.gif'
import Dropzone from '../../imageSetting/Dropezone'


const ProfilePicture = ({
    auth: {
      user,
    loading
  },
    createPictureProfile,
     history}) => {
    const [image, setImage] = useState('')
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
      }, [])

    const getBase64 = (image) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(image)
        })}


    const onDrop =async e =>{
           setImage(await getBase64(e[0]))
           setCrop({ x: 0, y: 0})
           setZoom(1)
           setRotation(0)  
      }
      
    

    const sentData = async (e) => {
        e.preventDefault()
        const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,
                rotation
        )
        createPictureProfile(croppedImage , history)
        }
                

    return (
        <Fragment>
          {loading?         
            <img src={spinner} alt='Loading...'
            />  : <Fragment> 
        <form className="form" onSubmit= {e => sentData(e)}>         
      <h1 className='large text-primary'>Set a profile picture</h1>
      <span className='currentProfile'>
        <h6>Your current profile picture</h6>
             <img  src={user.avatar}
                 alt='profile image' />
      </span>
      {image? (
      <div> <strong>
            *use the sliderss for edit
            and the rectangle below for change the picture
      </strong>
      <div className="crop-container">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation = {rotation}
          aspect={1}
          cropShape="round"
          showGrid={false}
          restrictPosition={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        /></div><div>
        <strong> Zoom</strong>
        <strong className="text-controler"> Rotation</strong>
        <span className="controlers-container zoom-controler">
        <input 
            type="range" 
            className="controlers"
            min={1} 
            max={3}
            value={zoom}
            step={0.1}
            onChange={(e) => setZoom(e.target.value)}
        /></span>
        <span className="controlers-container rotation-controler">
        <input 
            type="range" 
            className="controlers"
            min={0} 
            max={360}
            value={rotation}
            step={1}
            onChange={(e) => setRotation(e.target.value)}
      /></span>
      </div>
      </div>):(null)}
      <Dropzone 
        onDrop={(e) => onDrop(e)}  
        multiple={false}
        style={image ? ('smlDropzone'
        ):(
        'bigDropzone')}/>           
        <input type="submit" className="btn btn-primary my-1"  value='Submit'/>
        {/* <button className="btn btn-light my-1" onClick={setImage(avatar)}> <Link to='/dashboard'>Skip</Link></button> */}
      </form>
      </Fragment>}
    </Fragment>
    )
     }

const mapStateToProps = state => ({
      auth: state.auth
})

ProfilePicture.propTypes = {
    createPictureProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps,
    {createPictureProfile}) (withRouter(ProfilePicture))
