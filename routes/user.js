import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";

import { checkUserAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/user/", getAllUsers);
router.put("/user/:id", checkUserAuth, updateUser);
router.delete("/user/:id", checkUserAuth, deleteUser);

export default router;
