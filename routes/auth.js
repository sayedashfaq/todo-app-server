import express from "express";
import {
  changeUserPassword,
  loggedUser,
  loginUser,
  registerUser,
} from "../controllers/auth.js";
import { checkUserAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/changepassword", changeUserPassword);
router.get("/loggeduser", loggedUser);

router.use("/changepassword", checkUserAuth);
router.use("/loggeduser", checkUserAuth);

export default router;