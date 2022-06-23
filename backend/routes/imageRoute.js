import { Router } from "express";
import {
    get_Image,

} from "../controller/imageController.js";



const router = Router();

//@desc     GET image
//@route    GET /image/:generation
///@access  Public
router.get("/:generation/:id", get_Image)


export default router;