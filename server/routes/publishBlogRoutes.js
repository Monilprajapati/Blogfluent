import { Router } from "express";
import {
  getUploadImageUrl,
  publishBlog,
} from "../controllers/blogController.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const publishBlogRoutes = Router();

publishBlogRoutes.get("/get-upload-url", getUploadImageUrl);
publishBlogRoutes.post("/create-blog", verifyJWT, publishBlog);

export default publishBlogRoutes;
