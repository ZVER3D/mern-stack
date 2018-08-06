import * as at from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case at.GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}