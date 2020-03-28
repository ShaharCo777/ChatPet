import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addPost } from '../../../actions/postActs'

const CreatePost = ({ addPost }) => {
  const [text, setText] = useState('')

    return (
    <div className='post-form'>
      <div className='bg-primary p my'>
        <h4>Say Something...</h4>
      </div>
      <form
        className='form my'
        onSubmit={e => {
          e.preventDefault()
          addPost({ text })
          setText('')
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='3'
          placeholder='Create a post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark' value='Submit' />
      </form>
    </div>
  )
}

CreatePost.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null,
{ addPost })(CreatePost)
