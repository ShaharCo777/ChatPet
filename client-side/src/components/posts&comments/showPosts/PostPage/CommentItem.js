import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import { deleteComment } from '../../../../actions/postActs'

const CommentItem = ({
  comment: {
    _id,
    text,
    date,
    user
},
  auth,
  deleteComment
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user._id}`}>
        <img className='round-img' src={user.avatar} alt='' />
        <h4>{user.name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!auth.loading && user._id === auth.user._id && (
        <button
          onClick={() => deleteComment(_id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  </div>
)

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps,
{ deleteComment })(CommentItem)
