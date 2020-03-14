import{
    ADD_POST,
    ADD_COMMENT,
    GET_POST,
    GET_POSTS,
    CLEAR_POST,
    CLEAR_POSTS,
    DELETE_POST,
    REMOVE_COMMENT,
    POST_ERROR,
    UPDATE_POST_LIKES,
    UPDATE_COMMENT_LIKES
} from '../actions/consts'

const inItialState ={
    posts: [],
    post: null,
    comments: [],
    loading: true,
    error: {}
}

export default function(state = inItialState, action) {
    const {type, data} = action

    switch(type) {
        case GET_POSTS:
            return{
            ...state,
            posts: data,
            loading: false
            }
        case GET_POST:
            return{
                ...state,
                post: data.post,
                comments: data.comments,
                loading:false
            }
        case ADD_POST:
            return{
                ...state,
                posts: [data, ...state.posts],
                loading: false
            }
        case CLEAR_POST:
            return{
                ...state,
                post: null,
                comments: [],
                loading: false
            }
        case CLEAR_POSTS:
            return{
                ...state,
                posts: [],
                loading: false
                    }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post =>
                     post._id !== data),
                loading: false
            }
        case UPDATE_POST_LIKES:
            return{
                ...state,
                posts: state.posts.map(post => 
                    post._id === data.postId ? 
                    {...post, likes: data.likes} : post),
                loading: false
            }
        case UPDATE_COMMENT_LIKES:
            return{
                ...state,
                comments: state.comments.map(comment => 
                    comment._id === data.commentId ? 
                    {...comment, likes: data.likes} : comment),
                loading: false
                }
        case POST_ERROR:
            return{
                ...state,
                error: data,
                loading:false
            }
        case ADD_COMMENT:
            return{
                ...state,
                comments: [data, ...state.comments],
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment =>
                comment._id !== data ),
                loading: false
            }
        default:
            return state
    }
}