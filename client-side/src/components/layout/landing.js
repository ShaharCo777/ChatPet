import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

export const Landing = ({isAuthenticated}) => {

    if(isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }

    return (
       <section className="landing">
           <div className='dark-overlay'>
               <div className='landing-inner'>
                   <h1 className="x-large">Welcome to PetChat</h1>
                   <p className='lead'>
                    Here its all about the pets
                   </p>
                   <div className="buttons">
                       <Link to='/register' className='btn btn-primary'>
                           Sign up
                       </Link>
                       <Link to='/login' className='btn btn-light'>
                           Login
                       </Link>
                   </div>
               </div>
           </div>
       </section>
    )
}


Landing.propTypes ={
    isAuthenticated: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(
    mapStateToProps
)(Landing)
