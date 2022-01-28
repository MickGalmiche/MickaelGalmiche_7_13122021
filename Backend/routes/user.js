const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user');

router.get('/profile/:id', auth, userController.getProfile);
router.put('/profile/:id', auth, userController.updateProfile);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.delete('/delete/:id', auth, userController.deleteUser);

module.exports = router;