const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/post');

router.get('/', auth, postController.getAllPost);
router.post('/', auth, postController.createPost);
router.get('/:id', auth, postController.getOnePost);
router.put('/:id', auth, postController.modifyPost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;