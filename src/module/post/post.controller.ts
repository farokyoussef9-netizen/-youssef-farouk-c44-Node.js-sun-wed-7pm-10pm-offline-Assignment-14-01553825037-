import {Router} from "express"
import postService from "./post.service";
import commentRouter from "../COMMENT/comment.controller";
import { isAuthenticated } from "../../middleware/auth.middleware";
const router=Router();
router.use("/:postid/comment",commentRouter)
router.post("/",isAuthenticated(),postService.createPost)
router.patch("/:id",isAuthenticated(),postService.addreaction)
router.get("/:id",postService.get_post)
router.delete("/:id",isAuthenticated(),postService.hard_delete_post)
router.delete("/:id",isAuthenticated(),postService.soft_delete_post)
export default router