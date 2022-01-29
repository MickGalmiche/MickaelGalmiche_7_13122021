const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    rejectOnNotFound: {
        findUnique: true,
        findMany: true,
    },
});

exports.getAllRating = async (req, res) => {
    const { id } = req.params
    const { userId } = req.token

    try {
        const ratings = await prisma.rating.findMany({
            where: {
                fk_post: Number(id)
            },
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

        let likeArray = []
        let dislikeArray = []

        ratings.forEach(element => {
            if (element.rating === 'LIKE') {
                likeArray.push(element)
            } else if (element.rating === 'DISLIKE') {
                dislikeArray.push(element)
            }
        });
        
        const userRating = ratings.find(element => element.fk_user === userId);

        const response = {
            likeArray,
            dislikeArray,
            userRating
        }

        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).json({ error: 'Ratings not found in database' })
    }
}