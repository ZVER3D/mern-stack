import React from 'react';
import PropTypes from 'prop-types';

import PostItem from './PostItem';

const postFeed = props => (
    props.posts.map(post => <PostItem key={post._id} post={post} />)
);

postFeed.propTypes = {
    posts: PropTypes.array.isRequired
};

export default postFeed;