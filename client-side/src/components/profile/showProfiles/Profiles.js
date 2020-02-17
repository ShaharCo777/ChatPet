import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {getProfiles} from '../../../actions/profileActs'

import spinner from '../../../img/spinner.gif'
import ProfileItem from './ProfileItem'

const Profiles = ({getProfiles,
     profile: {profiles, loading}}) => {

    useEffect(() =>{
        getProfiles()
    }, [getProfiles])

    return (
    <Fragment>
        {loading?         
        <img src={spinner} alt='Loading...'
        />  : <Fragment>   
            <h1 className='large text-primary'>Found People</h1>
            <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
                        more pet lovers
            </p>
            <div className='profiles'>
            {profiles.length > 0 ? (
            profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
            ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>}

    </Fragment>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
})

Profiles.propTypes = {
 getProfiles: PropTypes.func.isRequired,
 profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps,
{getProfiles})(Profiles)
