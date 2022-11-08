const express = require("express");
const passport = require("passport");
const BlogController = require("../controllers/blogController")


const blogRouter = express.Router();

blogRouter.get("/", BlogController.getBlogs);
// blogRouter.get("/", passport.authenticate('jwt', { session: false  }), BlogController.getUserBlogs);
blogRouter.get("/:id", BlogController.getBlog);
blogRouter.post("/", passport.authenticate('jwt', { session: false  }), BlogController.createBlog);
blogRouter.put("/:id", passport.authenticate('jwt', { session: false  }), BlogController.updateBlog);
blogRouter.patch("/:id", passport.authenticate('jwt', { session: false  }), BlogController.updateBlogState)
blogRouter.delete("/:id", passport.authenticate('jwt', { session: false  }), BlogController.deleteBlog)


module.exports = blogRouter;