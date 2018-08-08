import * as at from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case at.PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case at.GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case at.GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };
        case at.CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };
        default:
            return state;
    }
}