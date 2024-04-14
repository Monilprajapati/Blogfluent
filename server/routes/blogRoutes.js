import { Router } from "express";
import {
  getLatestBlogs,
  getTredingBlogs,
  getUploadImageUrl,
  publishBlog,
} from "../controllers/blogController.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const blogRoutes = Router();

blogRoutes.get("/get-upload-url", getUploadImageUrl);
blogRoutes.post("/create-blog", verifyJWT, publishBlog);
blogRoutes.get("/latest-blogs", getLatestBlogs);
blogRoutes.get("/trending-blogs", getTredingBlogs)

export default blogRoutes;
