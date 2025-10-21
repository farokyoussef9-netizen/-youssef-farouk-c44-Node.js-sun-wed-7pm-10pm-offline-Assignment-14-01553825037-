import { Router } from "express";
import UserService from "./user.sevice";
import { isAuthenticated } from "../../middleware/auth.middleware";
import { isvalid } from "../../middleware/validation.middleware";
import { schema_send_request } from "./user.validation";
const router=Router();
router.get("/profile",isAuthenticated(),UserService.getprofile)
router.post("/sendrequest/:friendID",isAuthenticated(),isvalid(schema_send_request),UserService.sendrequest)
router.put("/acceptrequest/:friendID",isAuthenticated(),UserService.acceptrequest)
router.delete("/deleterequset/:friendID",isAuthenticated(),UserService.deleterequset)
router.put("/unfriend/:friendID",isAuthenticated(),UserService.unfriend)
export default router;
