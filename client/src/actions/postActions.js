import axios from 'axios';

import * as at from './types';

// Add post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
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

// Delete post
export const deletePost = id => dispatch => {
    axios.delete(`/api/posts/${id}`)
        .then(res => dispatch({
            type: at.DELETE_POST,
            payload: id
        }))
        .catch(err => dispatch({
            type: at.GET_ERRORS,
            payload: err.response.data
        }));
};

// Add like
export const addLike = id => dispatch => {
    axios.post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: at.GET_ERRORS,
            payload: err.response.data
        }));
};

// Remove like
export const removeLike = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: at.GET_ERRORS,
            payload: err.response.data
        }));
};

// Add comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios.post(`/api/posts/comment/${postId}`, commentData)
        .then(res => dispatch({
            type: at.GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: at.GET_ERRORS,
            payload: err.response.data
        }));
};

// Get post
export const getPost = id => dispatch => {
    dispatch(setPostsLoading());
    axios.get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: at.GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: at.GET_POST,
            payload: null
        }));
};

// Delete comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch({
            type: at.GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: at.GET_ERRORS,
            payload: err.response.data
        }));
};

// Set loading state
export const setPostsLoading = () => {
    return {
        type: at.POST_LOADING
    };
}

// Clear errors
export const clearErrors = () => {
    return {
        type: at.CLEAR_ERRORS
    };
}