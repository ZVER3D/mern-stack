const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.avatar = !isEmpty(data.avatar) ? data.avatar : '';

    if (data.text.length < 10) {
        errors.text = 'Post should contain at least 10 characters';
    }
    
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required, dirty hacker';
    }

    if (Validator.isEmpty(data.avatar)) {
        errors.avatar = 'Avatar is required, dirty hacker';
    }

    return {
        errors,
        isValid: isEmpty(errors)
     };
}