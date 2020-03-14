import {
    GET_PET,
    GET_PETS,
    PET_PHOTOS,
    ADD_PHOTO,
    CLEAR_PET,
    CLEAR_PETS,
    DELETE_PET,
    DELETE_PHOTO,
    PET_ERROR
     } from "../actions/consts"

const initialState ={
    pet: null,
    pets: [],
    photos:[],
    loading: true,
    error: {}
}



export default function(state = initialState, action){
    const {type, data} = action


    switch(type){
        case GET_PET:
            return{
                ...state,
                pet: data,
                loading: false 
            }
        case GET_PETS:
            return{
                ...state,
                pets: data,
                loading: false 
            }
        case PET_PHOTOS:
            return{
                ...state,
                photos: data
            }
        case ADD_PHOTO:
            return{
                ...state,
                photos:[data, ...state.photos]
            }
        case PET_ERROR:
            return {
                ...state,
                pets:null,
                photos: null,
                error: data,
                loading: false
            }
        case CLEAR_PET:
            return {
                ...state,
                pet: null,
                photos: [],
                loading: false
            }
        case CLEAR_PETS:
            return {
                ...state,
                pets: [],
                loading: false
            }
        case DELETE_PHOTO:
            return {
                ...state,
                photos: state.photos.filter(photo =>
                    photo._id !== data),
               loading: false
            }
        case DELETE_PET:
            return{
                ...state,
                pet: null,
                photos: null,
                pets: state.pets.filter(pet =>
                    pet._id !== data)
            }
        default:
            return state
    }
}