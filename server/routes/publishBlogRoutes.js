import { Router } from "express";
import { getUploadImageUrl } from "../controllers/blogController.js";

const publishBlogRoutes = Router();

publishBlogRoutes.get("/get-upload-url", getUploadImageUrl);

export default publishBlogRoutes;
