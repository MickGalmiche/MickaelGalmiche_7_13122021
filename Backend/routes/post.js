const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.get('/', postController.getAllPost);
router.post('/', postController.createPost);
router.get('/:id', postController.getOnePost);
router.put('/:id', postController.modifyPost);
router.delete('/:id', postController.deletePost);
router.get('/:id/comment', postController.getCommentInPost);

module.exports = router;