import { Router } from "express";
import { myDocs, create } from "../../controllers/doc.js";

const router: Router = Router();

router.get('/my', myDocs);
router.post('/', create);

export default router;