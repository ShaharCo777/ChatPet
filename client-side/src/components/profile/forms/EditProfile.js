import React, { Fragment, useEffect, useState } from 'react'
import {withRouter, Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {createProfile, getUserProfile} from '../../../actions/profileActs'



const EditProfile = ({
    profile: {profile, loading},
     createProfile,
      getUserProfile,
       history
    }) => {

    const [formData, setFormData] = useState({
        contry:'',
        city:'',
        street:'',
        when:'',
        how:'',
        what:'',
        favePet:'',
        otherProfiles: false,
        foroms:false,
        petForSale: false,
        adopters: false,
        genral:'',
        images:[],
        profileImage:'',
        twitter:'',
        youtube:'',
        facebook:'',
        instagram:''
    })

  const [displaySocial, toggleSocial] = useState(false)


    useEffect(() => {
        getUserProfile()
        setFormData({
            genral: loading ? '' : profile.genral,

            contry: loading ? '' : profile.location.contry,
            city: loading || !profile.location ? '' : profile.location.city,
            street: loading || !profile.location ? '' : profile.location.street,

            day: loading ? '' : profile.birthDay.day,
            month: loading ? '' : profile.birthDay.month,
            year: loading ? '' : profile.birthDay.year,

            when: loading || !profile.loveToPet ? '' : profile.loveToPet.when,
            how:loading || !profile.loveToPet ? '' : profile.loveToPet.how,
            what:loading || !profile.loveToPet ? '' : profile.loveToPet.what,
            favePet:loading || !profile.loveToPet ? '' : profile.loveToPet.favePet,

            otherProfiles: loading || !profile.getDataOf ? false : profile.getDataOf.otherProfiles,
            foroms: loading || !profile.getDataOf ? false : profile.getDataOf.foroms,
            petForSale: loading || !profile.getDataOf ? false : profile.getDataOf.petForSale,
            adopters:  loading || !profile.getDataOf ? false : profile.getDataOf.adopters,

            youtube: loading || !profile.social ? '' : profile.social.youtube,
            facbook: loading || !profile.social ? '' : profile.social.facbook,
            instagram: loading || !profile.social ? '' : profile.social.instagram
        })
    }, [loading, getUserProfile])
    

  const  { 
          contry,
          city,
          street,
          when,
          how,
          what,
          favePet,
          otherProfiles,
          foroms,
          petForSale,
          adopters,
          genral,
          twitter,
          youtube,
          facebook,
          instagram
    } = formData


    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})


    const sentData = e =>{
      e.preventDefault()
      createProfile(formData, history, true)
    }

 return (

    <Fragment>
      <section className="container">
      <h1 className="large text-primary">
        Update Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-dog"></i>
        <strong> Let's get started!</strong>
      </p>
      <form className="form" onSubmit= {e => sentData(e)}>
      

        <div className="form-group input-location">
        <h3>Where you from?</h3><br/>
          <input type="text" id="contry" placeholder="* Contry" name="contry" value={contry} onChange={(e) => onChange(e)} />
          <input type="text" id="city" placeholder="City" name="city" value={city} onChange={(e) => onChange(e)}/>
          <input type="text" id="street" placeholder="Street name" name="street" value={street} onChange={(e) => onChange(e)}/>
        </div>

        <div className="form-group input-lovePets">
        <h3>Do you want to tell us about your love to pets?</h3><br/>
        <small className="form-text">Share your story with us</small>
        <input type="text" placeholder="When it started?" name="when" value={when} onChange={(e) => onChange(e)}/>
        <input type="text" placeholder="How it started?" name="how" value={how} onChange={(e) => onChange(e)}/>
        <input type="text" placeholder="What you did with it?" name="what" value={what} onChange={(e) => onChange(e)}/>
        <input type="text" placeholder="What is your favorit animal?" name="favePet" value={favePet} onChange={(e) => onChange(e)}/>
        </div>

        <div className="form-group intreset-input">
        <h3>Why are you here for?</h3>
        <small className="form-text">
            Help us to make a better experience
            for you
        </small><br/>
         <label className="checkBox">
          Show off my pets
        <input type="checkbox"
         name='otherProfiles'
         value = {otherProfiles}
         checked={otherProfiles}
         onChange={() =>{
        setFormData({...formData, otherProfiles: !otherProfiles})}}/>
        <span className="checkmark" ></span>
        </label>

        <label className="checkBox">
          Read and comment Animals post's and foroms
        <input type="checkbox"
         name='foroms'
         value = {foroms}
         checked={foroms}
         onChange={() =>{
        setFormData({...formData, foroms: !foroms})}}/>
        <span className="checkmark" ></span>
        </label>

        <label className="checkBox">
          To buy or adopt a pet
        <input type="checkbox"
         name='petForSale' 
         value = {petForSale}
         checked={petForSale}    
         onChange={() =>{
        setFormData({...formData, petForSale: !petForSale})}}/>
        <span className="checkmark" ></span>
        </label>

        <label className="checkBox">To sell or hand over a pet
        <input type="checkbox"
         name='adopters'
         value = {adopters}
         checked={adopters}         
         onChange={() =>{
        setFormData({...formData, adopters: !adopters})}}/>
        <span className="checkmark"></span>
        </label>

        <label className="checkBox">To premote a biznuss or an idea
        <input type="checkbox" />
        <span className="checkmark"></span>
        </label>
        <label className="checkBox">Just for fun
        <input type="checkbox" />
        <span className="checkmark"></span>
        </label>
        <label className="checkBox">We will see
        <input type="checkbox" />
        <span className="checkmark"></span>
        </label>
        </div>


        <div className="form-group">
          <textarea placeholder="About You" name="genral" rows='4' value={genral} onChange={(e) => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-3">
          <button type="button" className="btn btn-light" onClick={()=> toggleSocial(!displaySocial)}>
            Add Social Network Links
          </button>
        </div>
        {displaySocial && (
            <Fragment>
                <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(e) => onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e) => onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e) => onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e) => onChange(e)}/>
          </div>
        </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1"  value='Submit'/>
        <button className="btn btn-light my-1"> <Link to='/profiles/me'>Go Back</Link></button>
      </form>
    </section>
    </Fragment>
)}

const mapStateToProps = state => ({
  profile: state.profile
})

EditProfile.propTypes = {
 createProfile: PropTypes.func.isRequired,
 getUserProfile: PropTypes.func.isRequired,
 profile: PropTypes.object.isRequired
}


export default connect(mapStateToProps,
{createProfile, getUserProfile})(withRouter(EditProfile))
