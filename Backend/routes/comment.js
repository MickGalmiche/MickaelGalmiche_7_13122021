const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/comment');

router.get('/', auth, commentController.getAllComment);
router.post('/', auth, commentController.createComment);
router.get('/:id', auth, commentController.getOneComment);
router.put('/:id', auth, commentController.modifyComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;