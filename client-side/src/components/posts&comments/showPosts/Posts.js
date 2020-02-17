import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {getPosts} from '../../../actions/postActs'

import spinner from '../../../img/spinner.gif'
import PostItem from './PostItem'
import CreatePost from '../forms/CreatePost'

const Posts = ({
    getPosts,
    post: { 
        posts,
        loading
    }
}) => {

    useEffect(() =>{
        getPosts()
    }, [getPosts])

    return loading ? (
        <img src={spinner}  alt='Loading...'/>
        ) : (
        <Fragment>
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome to the community
        </p>
        <CreatePost/>
        <div className='posts'>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </Fragment>
    )
}

const mapStateToProps = state => ({
    post: state.post
})

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

export default connect(mapStateToProps,
    {getPosts})(Posts)
