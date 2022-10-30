const express = require("express");
const BlogController = require("../controllers/blogController")

const blogRouter = express.Router();

blogRouter.get("/", BlogController.getBlogs);
blogRouter.post("/", BlogController.createBlog);
blogRouter.put("/:id", BlogController.updateBlogState)
blogRouter.delete("/:id", BlogController.deleteBlog)

module.exports = blogRouter;