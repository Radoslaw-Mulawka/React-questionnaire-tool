import axios from 'axios';
import {store} from './store';

export const GET_ANSWERS_DATA = 'GET_ANSWERS_DATA';
export const GET_ANSWERS_PLACES = 'GET_ANSWERS_PLACES'
export const GET_ANSWER_PLACE_DATA = 'GET_ANSWER_PLACE_DATA';
export const GET_NEXT_ANSWER_PLACES = 'GET_NEXT_ANSWER_PLACES';

export const getAnswersData = (campaignId)=>{
    return (dispatch)=>{
        axios.get(`/answers${campaignId}`).then(response => {
             dispatch({
                 type: GET_ANSWERS_DATA,
                 value: response.data.data
             })
        })
    }
}

export const getAnswersPlaces = (campaignId, placesPerPage)=>{
    return (dispatch)=>{
        axios.get(`/answers${campaignId}/places?per_page=${placesPerPage}`).then(response => {
             dispatch({
                 type: GET_ANSWERS_PLACES,
                 value: response.data.data
             })
        })
    }
}


export const getAnswerPlaceData = (campaignId,placeId)=>{
    return dispatch=>{
        axios.get(`/answers${campaignId}/places/${placeId}`).then(response => {
            dispatch({
                type: GET_ANSWER_PLACE_DATA,
                value: response.data.data.questions
            })
       })
    }
}

export const getNextAnswerPlaces = (link,placesPerPage)=>{
    return dispatch=>{
        axios.get(link).then(response => {
            dispatch({
                type: GET_NEXT_ANSWER_PLACES,
                value: response.data.data,
                perPage: placesPerPage + 2
            })
       })
    }
}