import express from "express";
import { createStudent } from "../controller/student.controller.js";
import { verifyToken, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, authorize(["admin"]), createStudent);

export default router;

