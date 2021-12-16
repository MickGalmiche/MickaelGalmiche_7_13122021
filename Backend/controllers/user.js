const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jsonToken = require('jsonwebtoken');

const prisma = new PrismaClient({
    rejectOnNotFound: {
        findUnique: true,
    },
});

exports.signup = async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, 10)

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            user_password: hash
        }
    })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch(error => res.status(400).json({ 
            error,
            message: "Utilisateur non créé !" }))
}

exports.login = async (req, res, next) => {
    async function validPassword(req, user) {
        return await bcrypt.compare(req.body.password, user.user_password);
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
                }
            })
        const valid = await validPassword(req, user)
        if (valid) {
            res.status(200).json({
                userId: user.id_user,
                token: jsonToken.sign(
                    { userId: user.id_user },
                    process.env.TOKEN_KEY,
                    { expiresIn: '24h' }
                )
            })
        } else {
            return res.status(401).json({ error: 'Mot de passe incorrect !' })
        }
    } catch (error) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' })
    }
}