import { initialState } from './state';
import * as types from './actions';


export let rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ANSWERS_DATA:
            return {
                ...state,
                answersResult: action.value
            }
        case types.GET_ANSWERS_PLACES:
            return {
                ...state,
                answersPlaces: action.value
            }
        case types.GET_ANSWER_PLACE_DATA:
            return {
                ...state,
                answersResult: {
                    ...state.answersResult,
                    questions: action.value
                }
            }
        case types.GET_NEXT_ANSWER_PLACES:
            let oldPlaces = [...state.answersPlaces.items];
            let newPlaces = oldPlaces.concat(action.value.items);

            return {
                ...state,
                answersPlaces: {
                    items: newPlaces,
                    paginator: action.value.paginator
                },
                answerPlacesPerPage: action.perPage
            }
    }
    return {
        ...state
    }
}