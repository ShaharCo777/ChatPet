import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {getPosts, sortPosts} from '../../../actions/postActs'
import {textSearch} from '../../../actions/generalActs'

import spinner from '../../../img/spinner.gif'
import PostItem from './PostItem'
import CreatePost from '../forms/CreatePost'

const Posts = ({
    getPosts,
    textSearch,
    sortPosts,
    post: { 
        posts,
        loading
    }
}) => {

  const [searchTerm, setSearchTerm] = useState('')
  const [type, setType] = useState("text")
  const [postsShow, setPostShow] = useState('')

  useEffect(() =>{
    getPosts()
  }, [getPosts])
  
const onChange = async e =>{
  e.preventDefault()
  setSearchTerm(e.target.value)
  setPostShow(await textSearch(e.target.value, posts, type))
}

const onClick = Type =>{
  setSearchTerm('')
  setType(Type)
}

const sortFunc = e =>{
  e.preventDefault()
  sortPosts(e.target.value, posts)
  console.log(e.target.value)

}
    return loading ? (
        <img src={spinner}  alt='Loading...'/>
        ) : (
        <Fragment>
        <h1 className='large text-primary'>Posts</h1>
        {/* <p className='lead'>
          <i className='fas fa-user' /> Welcome to the community
        </p> */}
        <div className='search'>
        <input
        type="text"
        className='half'
        placeholder="Search for a post"
        value={searchTerm}
        onChange={e => onChange(e)}
        />
        <h5>By:<h6> 
        <input type='checkBox' name='text'
        checked={type==='text'}
        onClick={() => onClick('text')}
         />Post text      
        <input type='checkBox' name='text'
        checked={type[0]==='user'}
        onClick={() => onClick(['user', 'name'])}
         />User name
        {/* <input type='checkBox' name='text'
        onClick={() => onClick('comment')}
         />Post text */}
        </h6></h5></div>
        <span className='sort'><h5>
          Sort:<select onChange={(e) => sortFunc(e)}>
            <option value="date">Recent</option>
            <option value="-date">Oldest</option>
            <option value="likes">Most Popular</option>
          </select></h5></span>
        <CreatePost/>
      <div className='posts'>
         {postsShow && postsShow.length > 0 ? postsShow.map(post => (
           post.user && <PostItem key={post._id} post={post} />
         )) : posts.map(post => (
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
    sortPosts: PropTypes.func.isRequired,
    textSearch: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

export default connect(mapStateToProps,
    {getPosts, sortPosts, textSearch})(Posts)
