const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ratingController = require('../controllers/rating');

router.get('/post/:id', auth, ratingController.getAllRating);

module.exports = router;