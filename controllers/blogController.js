const {BlogModel }= require("../models");

async  function getBlogs(req,res){
   
    const blogs = await BlogModel.find({});
    return res.json({status: true, blogs})
}

async function createBlog(req,res){
   const body = req.body;

   const blog = await BlogModel.create(body);
  
   return  res.json({status: true, blog});

}

async function  updateBlogState(req,res){

    const {id} = req.params;
    const {state} = req.body;

    const blog = await BlogModel.findById(id);
    if(!blog){
        return res.status(404).json({status: false, blog: null})
    }

    blog.state = state //update state
    await blog.save();
    return res.json({status: true, blog })

}

async function deleteBlog(req,res){
    const {id} = req.params;

    const blog = await BlogModel.deleteOne({_id:id});
    return res.json({status:true , blog})
}
module.exports={
    getBlogs,
    createBlog,
    updateBlogState,
    deleteBlog
}