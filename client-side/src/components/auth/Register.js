import React, {Fragment, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setAlert} from '../../actions/alertAct'
import {register} from '../../actions/authActs'


export const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        checkPassword: ''
    })
    const {name, email, password, checkPassword} = formData

    const setValue = e =>{
    setFormData(
        { ...formData, [e.target.name]: e.target.value }
        
    )}

    const sentData = async e => {
        e.preventDefault()
        if(password !== checkPassword){
            setAlert('Password dose not match', 'danger', 3000)
        } else{
            register({name, email, password})
        }
    }


    
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }
    return (
        <Fragment>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className= 'lead'><i className='fas fa-user'/>Create Account</p>
            <form className='form' onSubmit={e => sentData(e)}>
                <div className='form-group'>
                    <input
                     type='text'
                     placeholder='Name'
                     name='name'
                     value={name}
                     onChange = {e => setValue(e)}
                     required
                     />
                </div>
                <div className='form-group'>
                    <input
                     type='email'
                      placeholder='Email Address'
                       name='email'
                       value={email}
                       onChange = {e => setValue(e)}
                       required/>
                </div>
                <div className='form-group'>
                    <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    minLength='6'
                    value={password}
                    onChange = {e => setValue(e)}
                    required/>
                </div>
                <div className='form-group'>
                    <input
                    type='password'
                    placeholder='Confirm Password'
                    name='checkPassword'
                    minLength='6'
                    value={checkPassword}
                    onChange = {e => setValue(e)}
                    required/>
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
                <p className="my-1">
                    Already have an account?
                    <br/><Link to='./Login'>Sign In</Link>
                </p>
        </Fragment>
    )
}

Register.propTypes ={
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
 }

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, 
    {setAlert, register})(Register)
