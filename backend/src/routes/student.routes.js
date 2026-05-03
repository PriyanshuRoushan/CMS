import express from "express";
import { getStudentProfile } from "../controller/student.controller.js";
import { verifyToken, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, authorize("admin"), getStudentProfile);

export default router;

