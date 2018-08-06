import axios from 'axios';

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