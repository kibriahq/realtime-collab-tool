import { Router } from "express";
import { myDocs, create, updateName, getDoc } from "../../controllers/doc.js";

const router: Router = Router();

router.get('/my', myDocs);
router.get('/:id', getDoc);
router.post('/', create);
router.post('/update/name/:id', updateName);

export default router;