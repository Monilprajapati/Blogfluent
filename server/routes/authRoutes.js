import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/signin", signin);
authRoutes.post("/signup", signup);


export default authRoutes;