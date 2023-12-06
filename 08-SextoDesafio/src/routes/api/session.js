import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
} from "../../controllers/auth.controller.js";
import { showProfile } from "../../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", logOutUser);

export default router;