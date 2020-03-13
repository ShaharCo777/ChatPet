import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Navbar from "./components/layout/navbar"
import Landing from "./components/layout/landing"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routes/PrivateRouting'

//profiles
import CreateProfile from './components/profile/forms/CreateProfile'
import EditProfile from './components/profile/forms/EditProfile'
import UpDatePicture from './components/profile/forms/ProfilePicture'
import Profiles from './components/profile/showProfiles/Profiles'
import Profile from './components/profile/showProfiles/profilePage/Profile'

//pets
import CreatePetProfile from './components/PetProfile/forms/CreatePetProfile'
import EditPetProfile from './components/PetProfile/forms/EditPetProfile'
import PetProfile from './components/PetProfile/showPets/PetProfile'
import PetProfilePicture from './components/PetProfile/forms/PetProfilePicture'

//posts
import Posts from './components/posts&comments/showPosts/Posts'
import Post from './components/posts&comments/showPosts/PostPage/Post'

//sales
import PetsForSale from './components/petSales/buy_pets/PetsForSale'
import SalesMain from './components/petSales/SalesMain'

//authentication
import Alert from './components/layout/Alert'
import {loadUser} from './actions/authActs'
import setAuthToken from './setAuthToken'

//combine react and redux redux
import {Provider} from 'react-redux'
import store from './store'

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const  App = () =>{
useEffect(() => {
  store.dispatch(loadUser())
}, [])

return(
  <Provider store={store}>
<Router>
  <Navbar/>
  <Route exact path='/' component={Landing}/>
  <section className="container">
    <Alert/>
    <Switch>
      {/* main */}
    <Route exact path='/register' component={Register}/>
    <Route exact path='/login' component={Login}/>    
    <PrivateRoute exact path='/dashboard' component={Dashboard}/>  

    {/* profile setting   */}
    <PrivateRoute exact path='/profiles/new' component={CreateProfile}/>    
    <PrivateRoute exact path='/profiles/editProfile' component={EditProfile}/>
    <PrivateRoute exact path='/profiles/profilePicture/update' component={UpDatePicture}/>

    {/* profile show  */}
    <Route exact path='/profiles' component={Profiles}/>
    <Route exact path='/profile/:id' component={Profile}/>

    {/* pet setting */}
    <PrivateRoute exact path='/pets/new' component={CreatePetProfile}/>  
    <PrivateRoute exact path='/pets/edit/:petId' component={EditPetProfile}/>  
    <PrivateRoute exact path='/pets/profilePicture/update' component={PetProfilePicture}/>  

    {/* pet show */}
    <PrivateRoute exact path='/pet/profile/:petId' component={PetProfile}/>


    {/* post sow */}
    <PrivateRoute exact path='/posts' component={Posts}/>  
    <PrivateRoute exact path='/posts/:postId' component={Post}/>  

    {/* sales */}
    <PrivateRoute path='/saleingPage' component={SalesMain}/>  
    </Switch>

  </section>
</Router>
</Provider>
)}

export default App;
