import * as ActionTypes from './ActionTypes';

export const destinations = (state = {
    isLoading: true,
    errMess: null,
    destinations: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DESTINATIONS:
            return { ...state, isLoading: false, errMess: null, destinations: action.payload };

        case ActionTypes.DESTINATIONS_LOADING:
            return { ...state, isLoading: true, errMess: null, destinations: [] }

        case ActionTypes.DESTINATIONS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};