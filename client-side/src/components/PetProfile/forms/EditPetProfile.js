import React, { Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {updatePet, getPetById} from '../../../actions/petActs'

import spinner from '../../../img/spinner.gif'



const EditPetProfile = ({
  updatePet,
  getPetById,
  match,
  history,
  pet:{
    pet,
    loading
  }
  }) => {
  const [forSale, setForSale] = useState(false)
  const [petFormData, setPetFormData] = useState({
      name:'',
      sex:'',
      type:'',
      race:'',
      descreption:'',
      traind:false,
      cost:null
    })

    useEffect(() => {
      getPetById(match.params.petId)
      setPetFormData({
          name: loading || !pet ? '' : pet.name,
          sex: loading || !pet ? '' : pet.sex,
          type: loading || !pet ? '' : pet.type,
          race: loading || !pet ? '' : pet.race,
          descreption: loading || !pet ? '' : pet.descreption,
          traind:  loading || !pet ? false : pet.traind,
          cost: loading || !pet ? null : pet.cost
      })
      if(!loading && pet.cost !== null) setForSale(true)
    }, [getPetById, match])


    const  { 
      name,
      sex,
      type,
      race,
      descreption,
      traind,
      cost
} = petFormData

    const onChange = e =>{
      setPetFormData({...petFormData, [e.target.name]: e.target.value})
    }

    const sentData = async e =>{
      e.preventDefault()
      await updatePet(petFormData, pet._id, history)
    }


 return (
<Fragment>
{loading && pet === null ? (
<img src={spinner} alt='Loading...'/>
  ) : (  
  <Fragment>
  <section className="container">
      <h1 className="large text-primary">
        Edit Your Pet Profile
      </h1>
      <p className="lead">
        <i className="fas fa-pet"></i> Let's get some information about your pet
      </p>
      <form className="form" onSubmit= {e => sentData(e)}>
      <div className="form-group">
          <input type="text" value={name}
           name="name" onChange={(e) => onChange(e)}/>
          <small className="form-text"
            >This is how your pet will be presented
            </small>
        </div>
        <div className="form-group">
          <select name="sex" className={petFormData.sex != '' ? "":'form-text'} onChange={(e) => onChange(e)}>
            <option value="0">{sex !== '' ? sex : '* Select Your Pet Gender'}</option>
            <option value="male">Male</option>
            <option value="female">female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Pet's Type" value={type}
          name="type" onChange={(e) => onChange(e)}/>

        </div>
        <div className="form-group">
          <input type="text" placeholder="Pet's Race" value={race}
          name="race" onChange={(e) => onChange(e)}/>
        </div>

        <label className="checkBox">Is Your Pet Traind?
        <input type="checkbox"
         value={traind}
         checked={traind}
         name='traind'
         onChange={() =>{
        setPetFormData({...petFormData, traind: !petFormData.traind})}}/>
        <span className="checkmark"></span>
        </label>

        <label className="checkBox">Is Your Pet For Sale?
        <input type="checkbox"
         value={forSale}
         checked={forSale}
         name='forSale'
         onChange={() =>{
        if (forSale) setPetFormData({...petFormData, cost: 0})
        setForSale(!forSale)}}/>
        <span className="checkmark"></span>
        </label>

       {forSale && (<Fragment>
        <i className="fas fa-dollar-sign"></i>
        <input type='number'
        className='numbrInput'
        name='cost'
        value={cost}
        placeholder='In Dollars'
        onChange={(e) => onChange(e)}/>
        <small className="form-text"
        >Please Enter Just Numbers
        </small></Fragment>) }

        <div className="form-group">
          <textarea placeholder="Add More Info.." value={descreption}
          name="descreption" onChange={(e) => onChange(e)}/>
          <small className="form-text">Add what ever you want</small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" >Go Back</a>
      </form>
    </section>
    </Fragment>)}
     </Fragment>
)}

const mapStateToProps = state => ({
    pet: state.pets
  })

EditPetProfile.propTypes = {
  updatePet: PropTypes.func.isRequired,
  getPetById: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
  {updatePet, getPetById}) (withRouter(EditPetProfile))
