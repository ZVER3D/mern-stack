import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const postItem = (props) => (
    <div className="card card-body mb-3">
        <div className="row">
            <div className="col-md-2">
                <Link to="profile.html">
                    <img 
                        className="rounded-circle d-none d-md-block"
                        src={props.post.avatar}
                        alt={props.post.name}
                    />
                </Link>
                <br />
                <p className="text-center" style={{textTransform: 'capitalize'}}>{props.post.name}</p>
            </div>
            <div className="col-md-10">
                <p className="lead">{props.post.text}</p>
            </div>
        </div>
    </div>
);

postItem.propTypes = {
    post: PropTypes.object.isRequired
};

export default postItem;