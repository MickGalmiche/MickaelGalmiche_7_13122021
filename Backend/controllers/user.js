const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jsonToken = require('jsonwebtoken');

const prisma = new PrismaClient({
    rejectOnNotFound: {
        findUnique: true,
    },
});

exports.signup = async (req, res) => {
    const { email, firstname, lastname, password } = req.body
    const hash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email,
            firstname,
            lastname,
            user_password: hash
        }
    })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch(error => res.status(400).json({ 
            error,
            message: "Utilisateur non créé !" }))
}

exports.login = async (req, res) => {
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
                userRole: user.role,
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

exports.deleteUser = async (req, res) => {
    const { id } = req.params
    const { userId } = req.token

    try {
        const user = await prisma.user.findUnique({
            where: {
                id_user: Number(userId),
            }
        })

        if (id == userId || user.role === 'ADMIN') {
            const deletedUser = await prisma.user.delete({
                where: {
                    id_user: Number(id),
                }
            })
            return res.status(201).json({ message: 'User removed' })
        } else {
            res.status(403).json({ error: 'Permission required' })
        }
    } catch (error) {
        res.status(400).json({ error: 'User not removed '});
    }
}