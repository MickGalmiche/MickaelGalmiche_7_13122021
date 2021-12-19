const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    rejectOnNotFound: {
        findUnique: true,
        findMany: true,
    },
});

exports.getAllComment = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                user: {
                    select: {
                        id_user: true,
                        firstname: true,
                        lastname: true,
                    }
                }
            }
        })
        return res.status(200).json(comments);
    } catch {
        return res.status(404).json({ error: 'Comments not found in database' })
    }
}

exports.createComment = async (req, res) => {
    const { content, authorId, postId } = req.body
    const { userId } = req.token

    if (authorId == userId) {
        try {
            const comment = await prisma.comment.create({
                data: {
                    content,
                    fk_user: authorId,
                    fk_post: postId,
                }
            })
            return res.status(201).json({ message: 'Comment added' })
        } catch (error) {
            return res.status(400).json({ error: 'Comment not added' })
        }
    } else {
        return res.status(403).json({ error: 'Permission required' })
    }
}

exports.getOneComment = async (req, res) => {
    const { id } = req.params

    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id_comment: Number(id),
            },
            include: {
                user: {
                    select: {
                        id_user:true,
                        firstname: true,
                        lastname: true,
                    }
                },
                post: {
                    select: {
                        id_post: true,
                        date: true,
                        title: true,
                        content: true,
                    }
                }
            }
        })
        return res.status(200).json(comment)
    } catch (error) {
        return res.status(404).json({ error: 'Comment not found in database'})
    }
}

exports.modifyComment = async (req, res) => {
    const { id } = req.params
    const { content } = req.body
    const { userId } = req.token

    try {
        const user = await prisma.user.findUnique({
            where: {
                id_user: Number(userId),
            },
        })
        const comment = await prisma.comment.findUnique({
            where: {
                id_comment: Number(id)
            },
        })
        if (comment.fk_user == userId || user.role === 'ADMIN') {
            const updatedComment = await prisma.comment.update({
                where: {
                    id_comment: Number(id),
                },
                data: {
                    content,
                }
            })
            return res.status(201).json({ message: 'Comment updated ! ' })
        } else {
            res.status(403).json({ error: 'Permission required' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Comment not updated' });
    }
}

exports.deleteComment = async (req, res) => {
    const { id } = req.params
    const { userId } = req.token

    try {
        const user = await prisma.user.findUnique({
            where: {
                id_user: Number(userId),
            },
        })
        const comment = await prisma.comment.findUnique({
            where: {
                id_comment: Number(id)
            },
        })

        if (comment.fk_user == userId || user.role === 'ADMIN') {
            const deletedComment = await prisma.comment.delete({
                where: {
                    id_comment: Number(id),
                }
            })
            return res.status(201).json({ message: 'Comment removed' })
        } else {
            return res.status(403).json({ error: 'Permission required' })
        }
    } catch (error) {
        return res.status(400).json({ error: 'Comment not removed' })
    }
}