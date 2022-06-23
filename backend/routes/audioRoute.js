import { Router } from "express";
import {
    get_Audio,

} from "../controller/audioController.js";



const router = Router();

//@desc     GET audio
//@route    GET /audio/:generation/:id
///@access  Public
router.get("/:generation/:id", get_Audio)


export default router;