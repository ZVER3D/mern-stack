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
}

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