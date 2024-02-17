import { Router } from "express";
import { signin, signup, googleAuth } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/signin", signin);
authRoutes.post("/signup", signup);
authRoutes.post("/google-auth" ,googleAuth)


export default authRoutes;