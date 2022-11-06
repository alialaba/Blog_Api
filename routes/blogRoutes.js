const express = require("express");
const passport = require("passport");
const BlogController = require("../controllers/blogController")
// const checkId = require("../checkId")

const blogRouter = express.Router();

blogRouter.get("/", BlogController.getBlogs);
blogRouter.get("/:id", passport.authenticate('jwt', { session: false  }), BlogController.getBlog);
blogRouter.post("/", passport.authenticate('jwt', { session: false  }), BlogController.createBlog);
blogRouter.put("/:id", passport.authenticate('jwt', { session: false  }), BlogController.updateBlogState)
blogRouter.delete("/:id", BlogController.deleteBlog)

module.exports = blogRouter;