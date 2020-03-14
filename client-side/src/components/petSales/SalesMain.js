import React from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import PrivateRoute from '../../components/routes/PrivateRouting'

import PetsForSale from './buy_pets/PetsForSale'
import SalseNav from './SalseNav'
const Main = () => {
    return (
        <Router>
            <SalseNav/>
            <section className="container">
            <Switch>
            <PrivateRoute exact path='/saleingPage/pets' component={PetsForSale}/>  
            </Switch>
            </section>
        </Router>

    )
}

Main.propTypes = {

}

export default Main
