import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const SalseNav = props => {
    return (
        <nav className="navbar navbar_sale bg-warning">
            <h1>
            <Link to='/saleingPage'><span>
            <i className=' fas fa-dollar-sign'/>
            <i className='fas fa-paw'/>
            </span>
                    PetSales </Link>
            </h1>
            <ul>
            <li>
                <Link to='/saleingPage'>
                <i className = 'fas fa-store-alt'/>
                <span className='hide-sm'> Pet's equipment</span>
                </Link>
           </li>
           <li>
                <Link to='/saleingPage/pets'>
                <i className="fas fa-dog"/>
                <span className='hide-sm'> Pets</span>
                </Link>
           </li>
            <li>
                <Link to='/pets'>
                <i className="fas fa-drumstick-bite"></i>
                <span className='hide-sm'> Pet's food</span>
                </Link>
           </li>
           <li>
                <Link to='/pets'>
                <i className='fas fa-bone'></i>
                <span className='hide-sm'> Pet's toys</span>
                </Link>
           </li>
        </ul>
        </nav>
    )
}

SalseNav.propTypes = {

}

export default SalseNav
