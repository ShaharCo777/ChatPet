// import React, {useEffect, Fragment} from 'react'
// import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {getUserPets} from '../../../actions/petActs'
// import {
//     getUserProfile,
//     deleteAccount 
// } from '../../../actions/profileActs'
// import spinner from '../../../img/spinner.gif'

// const UserPets = ({
//     getUserPets,
//     deleteAccount,
//     auth: {user},
//     profile:{
//         loading,
//          profile:{
//              profile,
//              profilePets
//          }
//          }}) => {
//     useEffect(() => {
//         getUserPets()
//       }, [])

//     return (
//         loading && profile === null ? 
//         <img src={spinner} alt='Loading...'
//         /> : <Fragment >
//             <Link to='/profiles/profilePicture/update'>
//             <span className='profileImage'>
//             <button>Edit</button>
//              <img  src={profile && profile.profileImage ? (
//                  profile.profileImage):(user && user.avatar)} />
//              </span> </Link>
//              <h1 className='large text-primary'>Home Page</h1>
//                     <p className='lead'>
//                     <i className='fas fa-user'></i>
//                     Welcome to {profilePets && profilePets.name} page</p>
//                 {profile && profile.birthDay ? (
//                 <Fragment>
//                     {profilePets ? ( profilePets.forEach(pet => 
//                       <Link to={`/profiles/me/pet/${pet.id}`}>  
//                       <img  src={pet.profileImage}/> 
//                       </Link>
//                     )) : (null)}
//                 </Fragment>
//                 ) :(
//                 <Fragment>
//                 </Fragment>
//                 )}
//                 <div className='my-2'>
//                 <button className='btn btn-danger' onClick={() => deleteAccount()}>
//                      Delete My Account
//                 </button>
//                 </div>
//              </Fragment>
//     )
// }

// const mapStateToProps = state =>({
//     auth: state.auth,
//     profile: state.profile
// })

// UserPets.propTypes = {
//     getUserProfile: PropTypes.func.isRequired,
//     deleteAccount: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     profile: PropTypes.object.isRequired,
// }

// export default connect(
//     mapStateToProps,
//     { getUserProfile, deleteAccount})(UserPets)
