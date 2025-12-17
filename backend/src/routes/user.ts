import { Router } from "express";
import { toggleLikedMovie } from "../services/likedMovieService";


const router = Router();

router.post("/:userId/liked", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const { movieId } = req.body;

    const result = await toggleLikedMovie(userId, movieId);

    res.status(200).json({ message: `Movie ${result.action}`, action: result.action });
  } catch (err) {
    next(err);
  }
});

export default router;


