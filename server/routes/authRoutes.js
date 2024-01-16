import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/sign-in", signin);
authRoutes.post("/sign-up", signup);


export default authRoutes;