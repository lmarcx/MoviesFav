import { query } from "../db";

export async function toggleLikedMovie(userId: number, movieId: number) {
  // Vérifie si le like existe
  const existing = await query(
    "SELECT * FROM LikedMovie WHERE userId = $1 AND movieId = $2",
    [userId, movieId]
  );

  if (existing.rows.length > 0) {
    // Supprime le like
    await query("DELETE FROM LikedMovie WHERE userId = $1 AND movieId = $2", [
      userId,
      movieId,
    ]);
    return { action: "removed" };
  } else {
    // Ajoute le like
    await query(
      "INSERT INTO LikedMovie (userId, movieId) VALUES ($1, $2)",
      [userId, movieId]
    );
    return { action: "added" };
  }
}
