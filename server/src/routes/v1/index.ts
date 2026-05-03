import { Router } from "express";
import authRoutes from "./auth.js";
import docRouter from "./docRoute.js";
import { auth } from "../../middlewares/auth.js";

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/docs', auth, docRouter)
// router.use('/search-user', auth, searchUser)

export default router;