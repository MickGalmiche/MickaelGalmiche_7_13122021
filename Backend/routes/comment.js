const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

router.get('/', commentController.getAllComment);
router.post('/', commentController.createComment);
router.get('/:id', commentController.getOneComment);
router.put('/:id', commentController.modifyComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;