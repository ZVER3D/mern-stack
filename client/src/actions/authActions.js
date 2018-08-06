import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import * as at from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(error => 
            dispatch({
                type: at.GET_ERRORS,
                payload: error.response.data
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(error => 
            dispatch({
                type: at.GET_ERRORS,
                payload: error.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: at.SET_CURRENT_USER,
        payload: decoded
    }
}