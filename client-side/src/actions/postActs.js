import axios from 'axios'
import { setAlert} from './alertAct'
import {
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    GET_POST,
    GET_POSTS,
    DELETE_POST,
    UPDATE_LIKES,
    POST_ERROR

} from './consts'


// add post
export const addPost = post => async dispatch =>{    
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }

        const res = await axios.post('/api/posts', post, config)

        console.log(res.data)
        dispatch({
            type: ADD_POST,
            data: res.data
        })

        dispatch(setAlert('Post Created', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            data: { 
                msg: err,
                status: err
            }
        })
    }
}


// add a comment
export const addComment = (postId, comment) => async dispatch =>{    
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }

        const res = await axios.post(`/api/posts/comment/${postId}`, comment, config)

        dispatch({
            type: ADD_COMMENT,
            data: res.data
        })

        dispatch(setAlert('Comment Added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            data: { 
                msg: err,
                status: err
            }
        })
    }
}


//get spesific post
export const getPost = postId => async dispatch =>{
    try {
        const res = await axios.get(`/api/posts/${postId}`)
        dispatch({
            type: GET_POST,
            data: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            data: { 
                msg: err,
                status: err
            }
        })
    }
}


//get all the posts
export const getPosts = () => async dispatch =>{
    try {
        const res = await axios.get('/api/posts')

        dispatch({
            type: GET_POSTS,
            data: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            data: { 
                msg: err,
                status: err
            }
        })
    }
}


// delete post
export const deletePost = postId => async dispatch =>{
    try {
        await axios.delete(`/api/posts/${postId}`)

        dispatch({
            type: DELETE_POST,
            data: postId
        })

        dispatch(setAlert('Post Removed', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            data: { 
                msg: err,
                status: err
            }
        })
    }
}


// delete a comment
export const deleteComment = (commentId) => async dispatch =>{    
    try {
        await axios.delete(`/api/posts/comment/${commentId}`)

        dispatch({
            type: REMOVE_COMMENT,
            data: commentId
        })

        dispatch(setAlert('Comment Removed', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            data: { 
                msg: err,
                status: err
            }
        })
    }
}


// add like
export const addLike = postId => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)

        dispatch({
            type: UPDATE_LIKES,
            data: {postId, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            data: { 
                msg: err,
                status: err
            }
        })
    }
}


// remove like
export const removeLike = postId => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)

        dispatch({
            type: UPDATE_LIKES,
            data: {postId, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            data: { 
                msg: err,
                status: err
            }
        })
    }
}