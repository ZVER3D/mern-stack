import axios from 'axios';

import * as at from './types';

// Add post
export const addPost = postData => dispatch => {
    axios.post('/api/posts', postData)
        .then(res => dispatch({
            type: at.ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: at.GET_ERRORS,
            payload: err.response.data
        }));
};

// Get posts
export const getPosts = () => dispatch => {
    dispatch(setPostsLoading());
    axios.get('/api/posts')
        .then(res => dispatch({
            type: at.GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: at.GET_POSTS,
            payload: null
        }));
};

// Set loading state
export const setPostsLoading = () => {
    return {
        type: at.POST_LOADING
    };
}