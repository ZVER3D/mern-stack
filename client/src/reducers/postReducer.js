import * as at from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case at.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case at.GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            };
        case at.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        case at.POST_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}