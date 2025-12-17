import { prisma } from "../prisma";

export async function toggleLikedMovie(userId: number, movieId: string) {
  // Vérifie si le like existe
  const existing = await prisma.likedMovie.findUnique({
    where: {
      userId_movieId: { userId, movieId },
    },
  });

  if (existing) {
    // Supprime le like
    await prisma.likedMovie.delete({
      where: { userId_movieId: { userId, movieId } },
    });
    return { action: "removed" };
  } else {
    // Ajoute le like
    await prisma.likedMovie.create({
      data: { userId, movieId },
    });
    return { action: "added" };
  }
}
