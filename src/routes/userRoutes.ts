import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserById
} from "../controllers/userController";
import { validateUser } from "../middlewares/validation";
import { logger } from "../middlewares/logger";

const router = Router();

router.use(logger);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", validateUser, createUser);

export default router;
