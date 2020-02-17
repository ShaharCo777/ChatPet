import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getPost } from '../../../../actions/postActs'

import spinner from '../../../../img/spinner.gif'
import PostItem from '../PostItem'
import CreateComment from '../../forms/CreateComment'
import CommentItem from './CommentItem'

const Post = ({
     getPost,
     post: { 
          post,
          comments,
          loading
         },
      match }) => {
  useEffect(() => {
    getPost(match.params.postId)
  }, [getPost, match])
  return loading || post === null ? (
    <img src={spinner} alt='Loading...'/>
    ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CreateComment postId={post._id} />
      <div className='comments'>
        {comments.map(comment => (
          <CommentItem key={comment._id} comment={comment}/>
        ))}
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps,
{ getPost })(Post)
