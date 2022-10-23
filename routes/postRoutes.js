const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

// CREATE A POST
router.post('/', postController.createPost)

// UPDATE A POST
router.put('/:id', postController.updatePost)


// DELETE A POST
router.delete('/:id', postController.deletePost)

// LIKE A POST
router.put('/:id/like', postController.likePost)


// DISLIKE A POST
router.put('/:id/dislike', postController.dislikePost)


// GET A POST
router.get('/post/:id', postController.getPost)


// GET TIMELINE POST 
router.get('/timeline', postController.timelinePosts)

module.exports = router