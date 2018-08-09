import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
    onDelete = id => {
        this.props.deletePost(id);
    }

    onLike = id => {
        if (this.findUserLike(this.props.post.likes)) {
            this.props.removeLike(id);
        } else {
            this.props.addLike(id);
        }
    }

    findUserLike = likes => {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        }
        return false;
    }

    render() {
        const { post, auth } = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="profile.html">
                            <img 
                                className="rounded-circle d-none d-md-block"
                                src={post.avatar}
                                alt={post.name}
                            />
                        </Link>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        <button onClick={() => this.onLike(post._id)} type="button" className="btn btn-light mr-1">
                            <i className={classnames('fas fa-thumbs-up', {
                                'text-info': this.findUserLike(post.likes)
                            })} />
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">Comments</Link>
                        {post.user === auth.user.id ? (
                            <button onClick={() => this.onDelete(post._id)} type="button" className="btn btn-danger mr-1">
                                <i className="fas fa-times" />
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);