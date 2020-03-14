import axios from 'axios'
import { setAlert} from './alertAct'
import {
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    GET_POST,
    GET_POSTS,
    CLEAR_POST,
    CLEAR_POSTS,
    DELETE_POST,
    UPDATE_POST_LIKES,
    UPDATE_COMMENT_LIKES,
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
    dispatch({type: CLEAR_POST})
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


// add like to post
export const addPostLike = postId => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/postLike/${postId}`)

        dispatch({
            type: UPDATE_POST_LIKES,
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


// remove like from post
export const removePostLike = postId => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/postUnlike/${postId}`)

        dispatch({
            type: UPDATE_POST_LIKES,
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

// add like to comment
export const addCommentLike = commentId => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/commentLike/${commentId}`)

        dispatch({
            type: UPDATE_COMMENT_LIKES,
            data: {commentId, likes: res.data}
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


// remove like from post
export const removeCommentLike = commentId => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/commentUnlike/${commentId}`)
        console.log(res.data)
        dispatch({
            type: UPDATE_COMMENT_LIKES,
            data: {commentId, likes: res.data}
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