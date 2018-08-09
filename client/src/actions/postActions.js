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