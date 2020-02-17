import React, {Fragment, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect} from 'react-redux'
import PropTypes from 'prop-types'

import {login} from '../../actions/authActs'

export const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData

    const setValue = e =>{
    setFormData(
        { ...formData, [e.target.name]: e.target.value }
        
    )}

    const sentData = async e => {
        e.preventDefault()
        login(email, password)
    }

    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign In</h1>
            <p className= 'lead'><i className='fas fa-user'/>Create Account</p>
            <form className='form' onSubmit={e => sentData(e)}>

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
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
                <p className="my-1">
                    Dont have an account yet?
                    <br/><Link to='./Register'>Register</Link>
                </p>
        </Fragment>
    )
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

export default connect(mapStateToProps,
    {login})(Login)
