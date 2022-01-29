const { PrismaClient } = require('@prisma/client');
const express = require('express');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const ratingRoutes = require('./routes/rating')

const prisma = new PrismaClient();
const app = express();

prisma.$connect()
    .then(() => console.log('Connexion à MySql réussie !'))
    .catch(() => console.log('Connexion à MySql échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/rating', ratingRoutes);

module.exports = app;