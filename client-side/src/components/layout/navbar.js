import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { logout } from '../../actions/authActs'


const Navbar = ({auth: { isAuthenticated, loading}, logout}) => { 
  
    const authNav = (
        <ul>
            <li>
                <Link to='/dashboard'>
                <i className = 'fas fa-home'/>
                <span className='hide-sm'> Home Page</span>
                </Link>
           </li>
           {/* <li>
                <Link to='/saleingPage'>
                <i className="fas fa-dollar-sign"/>
                <span className='hide-sm'> Buy/Sell</span>
                </Link>
           </li> */}
            <li>
                <Link to='/posts'>
                <i className='fas fa-newspaper'></i>
                <span className='hide-sm'> Feed</span>
                </Link>
           </li>
           <li>
                <a onClick={logout}> 
                <i className='fas fa-sign-out-alt'></i>
                <span className='hide-sm'> Logout</span></a>
           </li>
        </ul>
    )

    const guestNav =(
    <ul>
       <li>
           <Link to='/register'>Register</Link>
       </li>
       <li>
           <Link to='/login'>Login</Link>
       </li>
    </ul>     
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i/>
                <img id='web-icon' src={require('../../img/Icon.jpg')} /> PetChat </Link>
            </h1>
            { !loading && (<Fragment>{isAuthenticated ? authNav : guestNav}</Fragment>)}

        </nav>
    )
}



const mapStateToProps = state =>({
    auth: state.auth
})

Navbar.prototype ={
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

export default connect(mapStateToProps,
    {logout} )(Navbar)
