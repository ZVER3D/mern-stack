const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');


// @route   GET api/posts
// @desc    Get posts
// @access  Public
// TODO: Add pagination, different sort possibilities and get post of a single user.
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({error: 'No posts fould'}));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({error: 'Post wasn\'t found'}));
});



// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // TODO: get name and avatar from the server side, not from front-end, cuz its retarded, since anyone could
    // fake data w/ postman and do some shitty posts from the name of other user.
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(400).json(err));
});


// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({error: 'Unauthorized'});
                    }

                    // Delete
                    post.remove()
                        .then(() => res.json({ success: true }))
                        .catch(err => res.status(400).json({ success: false }));
                })
                .catch(err => res.status(404).json({ error: 'Post not found' }));
        })
        .catch(err => res.status(401).json({error: 'Unauthorized'}));
});


module.exports = router;