import { Router } from "express";
import commentService from "./comment.serviec";
import { isAuthenticated } from "../../middleware/auth.middleware";
const router=Router({mergeParams:true});
router.post("{/:id}",isAuthenticated(),commentService.createcomment)//>> optional in version 5 //2 end point ختيجي عليها 
router.get("/:id",isAuthenticated(),commentService.getcomment)
router.delete("/:id",isAuthenticated(),commentService.hard_deletecomment)
router.patch("/:id",isAuthenticated(),commentService.addreaction)
router.delete("/:id",isAuthenticated(),commentService.soft_deletecomment)
export default router   