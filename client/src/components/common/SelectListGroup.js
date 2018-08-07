import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = (props) => {
    const selectOptions = props.options.map(option => (
        <option key={option.value} value={option.value}>{option.value}</option>
    ));

    return (
        <div className="form-group">
            <select
                className={classnames('form-control form-control-lg', {
                    'is-invalid': props.error
                })}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            >
                {selectOptions}
            </select>
            {props.info && <small className="form-text text-muted">{props.info}</small>}
            {props.error && (<div className="invalid-feedback">{props.error}</div>)}
        </div>
    );
}

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
};


export default SelectListGroup;