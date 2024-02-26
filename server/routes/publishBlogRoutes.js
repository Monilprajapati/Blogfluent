import { Router } from "express";
import { getUploadImageUrl } from "../controllers/blogController.js";

const publishBlogRoutes = Router();
// Here is the route for the getUploadImageUrl function
publishBlogRoutes.get("/get-upload-url", getUploadImageUrl);

export default publishBlogRoutes;
