const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    rejectOnNotFound: {
        findUnique: true,
        findMany: true,
    },
});

exports.getAllPost = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                id_post: 'desc',
            },
            include: {
                user: {
                    select: {
                        id_user: true,
                        firstname: true,
                        lastname: true,
                    }
                },
                _count: {
                    select: {
                        comment: true
                    }
                }
            }
        })
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(404).json({ error: 'Posts not found in database' })
    }
}

exports.createPost = async (req, res) => {
    const { title, content, authorId } = req.body
    const { userId } = req.token

    if(authorId == userId) {
        try {
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    fk_user: authorId,
                }
            })
            return res.status(201).json({ message: 'Post added!' })
        } catch (error) {
            return res.status(400).json({ error: 'Post not added' })
        }
    } else {
        return res.status(403).json({ error: 'Permission required' })
    }
}

exports.getOnePost = async (req, res) => {
    const { id } = req.params
    const { userId } = req.token

    try {
        const post = await prisma.post.findUnique({
            where: {
                id_post: Number(id),
            },
            include: {
                user: {
                    select: {
                        id_user: true,
                        firstname: true,
                        lastname: true,
                    }
                },
                _count: {
                    select: {
                        comment: true
                    }
                },
                comment: {
                    select: {
                        id_comment: true,
                        date: true,
                        content: true,
                        user: {
                            select: {
                                id_user: true,
                                firstname: true,
                                lastname: true,
                                user_password: false
                            }
                        }
                    }
                },
                rating: {
                    select: {
                        id_rating: true,
                        rating: true,
                        user: {
                            select: {
                                id_user: true,
                                firstname: true,
                                lastname: true,
                                user_password: false
                            }
                        }
                    }
                }
            }
        })
        let likeArray = []
        let dislikeArray = []
        const ratings = post.rating;

        ratings.forEach(element => {
            if (element.rating === 'LIKE') {
                likeArray.push(element)
            } else if (element.rating === 'DISLIKE') {
                dislikeArray.push(element)
            }
        });

        const userRating = ratings.find(element => element.user.id_user == userId);
        const likeCount = likeArray.length
        const dislikeCount = dislikeArray.length
        
        const response = {
            post: {
                id_post: post.id_post,
                date: post.date,
                title: post.title,
                content: post.content,
            },
            author: post.user,
            comment: {
                count: post._count.comment,
                comments: post.comment
            },
            rating: {
                likeCount,
                dislikeCount,
                userRating
            }
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({ error: 'Post not found in database' })
    }
}

exports.modifyPost = async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body
    const { userId } = req.token

    try {
        const user = await prisma.user.findUnique({
            where: {
                id_user: Number(userId),
            },
        })
        const post = await prisma.post.findUnique({
            where: {
                id_post: Number(id)
            },
        })
        if (post.fk_user == userId || user.role === 'ADMIN') {
            const updatedPost = await prisma.post.update({
                where: {
                    id_post: Number(id),
                },
                data: {
                    title,
                    content,
                }
            })
            return res.status(201).json({ message: 'Post updated ! ' })
        } else {
            res.status(403).json({ error: 'Permission required' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Post not updated' });
    }
}

exports.deletePost = async (req, res) => {
    const { id } = req.params
    const { userId } = req.token

    try {
        const user = await prisma.user.findUnique({
            where: {
                id_user: Number(userId),
            },
        })
        const post = await prisma.post.findUnique({
            where: {
                id_post: Number(id)
            },
        })
        
        if (post.fk_user == userId || user.role === 'ADMIN') {
            const deletedPost = await prisma.post.delete({
                where: {
                    id_post: Number(id),
                }
            })
            return res.status(201).json({ message: 'Post removed! '})
        } else {
            res.status(403).json({ error: 'Permission required' })
        }

    } catch (error) {
        res.status(400).json({ error: 'Post not removed' });
    }
}