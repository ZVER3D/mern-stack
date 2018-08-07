import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = (props) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={props.icon} />
                </span>
            </div>
            <input
                type={props.type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': props.error
                })} 
                placeholder={props.placeholder} 
                name={props.name}
                value={props.value}
                onChange={props.onChange} />
            {props.error && (<div className="invalid-feedback">{props.error}</div>)}
        </div>
    );
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    error: PropTypes.string
};

InputGroup.defaultProps = {
    type: 'text'
};

export default InputGroup;