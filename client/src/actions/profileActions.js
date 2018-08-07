import axios from 'axios';

import * as at from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: at.GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: at.GET_PROFILE,
                payload: {}
            })
        )
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: at.GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Profile loading
export const setProfileLoading = () => {
    return {
        type: at.PROFILE_LOADING
    }
};

// Clear profile
export const clearProfile = () => {
    return {
        type: at.CLEAR_CURRENT_PROFILE
    }
};