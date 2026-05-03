import { Router } from "express";
import { userSearch, addPermission } from "../../controllers/docPermissions.js";
import { userSearchValidator, userSearchValidatorHandler } from "../../middlewares/validators/doc/userSearchForPermission.js";
import { addPermissionValidator, addPermissionValidatorHandler } from "../../middlewares/validators/doc/addPermission.js";

const router: Router = Router();

router.post('/user-search', userSearchValidator, userSearchValidatorHandler, userSearch);
router.post('/add', addPermissionValidator, addPermissionValidatorHandler, addPermission);

export default router;