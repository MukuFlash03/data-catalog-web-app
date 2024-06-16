import { Router } from 'express';
import * as UsersController from "../controllers/users";

const router = Router();

router.post("/signup", UsersController.createUser);
router.post("/login", UsersController.authenticateUser);

export default router;
