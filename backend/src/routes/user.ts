import { Router } from "express";
import { prisma } from "../prisma"; // ton PrismaClient

const router = Router();

router.post('/:userId/liked', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.body;

    // Création avec Prisma
    const likedMovie = await prisma.likedMovie.upsert({
      where: {
        userId_movieId: {  // correspond à @@unique([userId, movieId])
          userId: parseInt(userId),
          movieId: movieId
        }
      },
      update: {}, // ne rien faire si déjà existant
      create: {
        userId: parseInt(userId),
        movieId: movieId,
      }
    });

    res.status(201).json({ message: 'Movie added to liked movies', likedMovie });
  } catch (error) {
    next(error);
  }
});

export default router;
