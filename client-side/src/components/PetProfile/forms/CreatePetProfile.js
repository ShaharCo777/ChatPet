import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import {createPet} from '../../../actions/petActs'

import Dropzone from '../../imageSetting/Dropezone'
import PetImage from './PetImage'

const CreatePetProfile = ({createPet, history}) => {
  const [images, setImages] = useState([])
  const [forSale, setForSale] = useState(false)
  const [petFormData, setPetFormData] = useState({
      name:'',
      sex:'',
      type:'',
      race:'',
      age:null,
      descreption:'',
      traind:false,
      cost:''
  })

  const getBase64 = (image) => {
    return new Promise((resolve,reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
      reader.readAsDataURL(image)
  })}

  const onDrop =async e =>{
    setImages([
      ...images,{
       id: images.length,
       src: await getBase64(e[0])
      }
      ])
  }

    const onChange = e =>{
      setPetFormData({...petFormData, [e.target.name]: e.target.value})
    }



    const sentData = async e =>{
      e.preventDefault()
      await createPet(petFormData, history)
  }


 return (
  <Fragment>
  <section className="container">
      <h1 className="large text-primary">
        Create your pet profile
      </h1>
      <p className="lead">
        <i className="fas fa-pet"></i> Let's get some information about your pet
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit= {e => sentData(e)}>
      <div className="form-group">
          <input type="text" placeholder="* Pet's Name"
           name="name" onChange={(e) => onChange(e)}/>
          <small className="form-text"
            >This is how your pet will be presented
            </small>
        </div>
        <div className="form-group">
          <select name="sex" onChange={(e) => onChange(e)}>
            <option value="0">* Select Your Pet Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Pet's Age" 
          name="age" onChange={(e) => onChange(e)}/>
          <small className="form-text"
            >How old is it?</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Pet's Type" 
          name="type" onChange={(e) => onChange(e)}/>
          <small className="form-text"
            >What kind of animal is it?</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Pet's Race" 
          name="race" onChange={(e) => onChange(e)}/>
          <small className="form-text"
            >Only if you know</small>
        </div>
        <label className="checkBox">Is your pet traind?
        <input type="checkbox"
         name='traind'
         onChange={() =>{
        setPetFormData({...petFormData, traind: !petFormData.traind})}}/>
        <span className="checkmark"></span>
        </label>

        <label className="checkBox">Is your pet for sale?
        <input type="checkbox"
         name='forSale'
         onChange={() =>{
        setForSale(!forSale)}}/>
        <span className="checkmark"></span>
        </label>

       {forSale && (<Fragment>
        <i className="fas fa-dollar-sign"></i>
        <input type='number'
        className='numbrInput'
        name='cost'
        placeholder='In Dollars'
        onChange={(e) => onChange(e)}/>
        <small className="form-text"
        >Please enter just numbers
        </small></Fragment>)}

      <Grid container spacing={3}>
        {images.length > 0 && images.map(image =>(
          <PetImage
           src={image.src} 
           /> ))}
      </Grid>
        {images.length < 10 ? (
        <Dropzone 
        onDrop={(e) => onDrop(e)}  
        multiple={false}
        style={'smlDropzone'}/>
        ):(<h3 style = {{color:'red'}}
        >Sorry, we cant afford more then 9 pics for a pet..</h3>)}
        <div className="form-group">
          <textarea placeholder="Add More Info.." 
          name="descreption" onChange={(e) => onChange(e)}/>
          <small className="form-text">Add what ever you want</small>
        </div>
        <input type="submit" className="btn btn-primary my-1" value='Submit'/>
        <a className="btn btn-light my-1" >Go Back</a>
      </form>
    </section>
    </Fragment>
)}

CreatePetProfile.propTypes = {
  createPet: PropTypes.func.isRequired
}

export default connect(null,
  {createPet})(withRouter(CreatePetProfile))
