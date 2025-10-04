import { Router } from "express";
import UserService from "./user.sevice";
const router=Router();
router.get("./:id",UserService.getprofile)
export default router;
