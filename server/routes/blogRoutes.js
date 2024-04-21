import { Router } from "express";
import {
  getLatestBlogs,
  getTredingBlogs,
  getUploadImageUrl,
  publishBlog,
  searchBlog,
} from "../controllers/blogController.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const blogRoutes = Router();

blogRoutes.get("/get-upload-url", getUploadImageUrl);
blogRoutes.post("/create-blog", verifyJWT, publishBlog);
blogRoutes.get("/latest-blogs", getLatestBlogs);
blogRoutes.get("/trending-blogs", getTredingBlogs);
blogRoutes.post("/search-blogs", searchBlog);

export default blogRoutes;
