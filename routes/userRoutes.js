const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// UPDATE USER
router.put('/:id', userController.updateUser)

// DELETE USER
router.delete('/:id', userController.deleteUser)

// GET USER
router.get('/:id', userController.getUser)

// FOLLOW A  USER
router.put('/:id/follow', userController.followUser)

// UNFOLLOW A  USER
router.put('/:id/unfollow', userController.unfollowUser)


module.exports = router