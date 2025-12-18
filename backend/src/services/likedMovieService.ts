import { query } from "../db";

export async function toggleLikedMovie(userId: number, movieId: number) {
  // Vérifie si le like existe
  const existing = await query(
    "SELECT 1 FROM liked_movies WHERE user_id = $1 AND movie_id = $2",
    [userId, movieId]
  );

  if (existing.rows.length > 0) {
    // Supprime le like
    await query("DELETE FROM liked_movies WHERE user_id = $1 AND movie_id = $2", [
      userId,
      movieId,
    ]);
    return { action: "removed" };
  } else {
    // Ajoute le like
    await query(
      "INSERT INTO liked_movies (user_id, movie_id) VALUES ($1, $2)",
      [userId, movieId]
    );
    return { action: "added" };
  }
}
