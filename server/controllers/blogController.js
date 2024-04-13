import { nanoid } from "nanoid";
import generateUploadUrl from "../utils/generateUploadUrl.js";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

// Controller for uploading image to S3
export const getUploadImageUrl = async (req, res) => {
  generateUploadUrl()
    .then((url) => {
      console.log(url);
      return res.status(200).json({ uploadURL: url });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

export const publishBlog = async (req, res) => {
  const { title, des, banner, tags, content, draft } = req.body;
  let authorId = req.user;
  console.log(authorId, "authorId");
  if (!title || !des || !banner || !tags || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!banner.length) {
    return res.status(400).json({ error: "Banner is required" });
  }

  if (!des.length > 200) {
    return res
      .status(400)
      .json({ error: "Description should be less than 200 characters" });
  }

  if (!content.blocks.length) {
    return res.status(400).json({ error: "Content is required" });
  }

  if (!tags.length || tags.length > 10) {
    return res
      .status(400)
      .json({ error: "Tags are required and should be less than 10" });
  }

  let lowercaseTags = tags.map((tag) => tag.toLowerCase());

  let blog_id =
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();

  let blog = new Blog({
    title,
    des,
    banner,
    content,
    tags: lowercaseTags,
    author: authorId,
    blog_id,
    draft: Boolean(draft),
  });

  blog
    .save()
    .then((blog) => {
      let blogIncrement = draft ? 0 : 1;

      User.findOneAndUpdate(
        { _id: authorId },
        {
          $inc: { "account_info.total_posts": blogIncrement },
          $push: { blogs: blog._id },
        }
      )
        .then((user) => {
          return res.status(201).json({ id: blog.blog_id });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ error: "Failed to update the total number of post" });
        });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};
