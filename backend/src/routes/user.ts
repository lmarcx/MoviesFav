import { Router } from "express";
import { toggleLikedMovie } from "../services/likedMovieService";


const router = Router();

const ensureAuthenticatedUserMatchesParam = (req: any, res: any, next: any) => {
  const authenticatedUserId = req.user && req.user.id;
  if (!authenticatedUserId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const paramUserId = parseInt(req.params.userId, 10);
  if (Number.isNaN(paramUserId)) {
    return res.status(400).json({ message: "Invalid userId parameter" });
  }

  if (authenticatedUserId !== paramUserId) {
    return res.status(403).json({ message: "Forbidden: cannot modify another user's liked movies" });
  }

  next();
};

router.post("/:userId/liked", ensureAuthenticatedUserMatchesParam, async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { movieId } = req.body;

    const result = await toggleLikedMovie(userId, movieId);

    res.status(200).json({ message: `Movie ${result.action}`, action: result.action });
  } catch (err) {
    next(err);
  }
});

export default router;


