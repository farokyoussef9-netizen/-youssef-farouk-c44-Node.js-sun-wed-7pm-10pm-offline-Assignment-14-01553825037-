import {Router} from "express"
    import authService from "./auth.service";
    import { registerSchema } from "./auth.vaidation";
    import { isvalid } from "../../middleware";
    import { isAuthenticated } from "../../middleware/auth.middleware";


    const router=Router();
    router.post("/register",isvalid(registerSchema),authService.register)
    router.post("/verify",isAuthenticated(),authService.verifyAccount)

    router.post("/login",authService.Login)
    export default router;