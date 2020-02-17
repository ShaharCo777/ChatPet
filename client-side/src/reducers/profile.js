import {
    GET_PROFILE,
    GET_PROFILES,
    CLEAR_PROFILE,
    PROFILE_ERROR
     } from "../actions/consts"

const initialState ={
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}



export default function(state = initialState, action){
    const {type, data} = action


    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profile: data,
                loading: false 
            }
        case GET_PROFILES:
            return{
                ...state,
                profiles: data,
                loading: false 
            }
        case PROFILE_ERROR:
            return {
                ...state,
                profile:null,
                error: data,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state
    }
}