import React from 'react';
import PropTypes from 'prop-types';

import CommentItem from './CommentItem';

const commentFeed = (props) => {
    const { comments, postId } = props;
    return comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={postId} />);
}

commentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
};

export default commentFeed;