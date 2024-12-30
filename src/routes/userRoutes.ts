import { Router } from "express";
import {
  getAllUsers,
  createUser
} from "../controllers/userController";
import { validateUser } from "../middlewares/validation";
import { logger } from "../middlewares/logger";

const router = Router();

router.use(logger);
router.get("/users", getAllUsers);
router.post("/users", validateUser, createUser);

export default router;
