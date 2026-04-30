import express from "express";
import { login, getMe } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router(); 

router.post("/login", login);
router.get("/me", verifyToken, getMe);

export default router;