import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { validateUser } from "../middlewares/validation";
import { logger } from "../middlewares/logger";

const router = Router();

router.use(logger);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", validateUser, createUser);
router.put("/users/:id", validateUser, updateUser);
router.delete("/users/:id", deleteUser);

export default router;
