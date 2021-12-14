const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

module.exports = app;