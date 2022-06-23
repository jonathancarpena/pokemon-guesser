import { Router } from "express";
const router = Router();
import {
    get_Scores,
    get_ScoresByGeneration,
    get_ScoresByGenerationAndDifficulty,
    post_Score
} from '../controller/highScoreController.js';


//@desc     GET current high scores
//@route    GET /api/scores
///@access  Public
router.get("/", get_Scores)

//@desc     GET current high scores by generation
//@route    GET /api/scores/:generation
///@access  Public
router.get("/:generation", get_ScoresByGeneration)

//@desc     GET current high scores by generation and difficulty
//@route    GET /api/scores/:generation/:difficulty
///@access  Public
router.get("/:generation/:difficulty", get_ScoresByGenerationAndDifficulty)


//@desc     GET current high scores
//@route    GET /api/scores/add
///@access  Public
router.post("/add", post_Score)

export default router;