const {BlogModel }= require("../models");
const {UserModel} = require("../models")
const moment = require("moment")
const readTime = require("../utilis/readTimeLogic");


//logged in  && not logged in should get to see a published blogs
exports.getBlogs = async (req,res)=>{
try {
    const {query} = req;
    const { 
        created_at, 
        state= "published", 
        title,
        description,
        tags,
        author,
        reading_time,
        blog = 'asc', 
        blog_by = 'created_at', 
        page = 0, 
        per_page = 10 
    } = query;
   
    const findQuery={}

    if (created_at) {
        findQuery.created_at = {
            $gt: moment(created_at).startOf('day').toDate(), 
            $lt: moment(created_at).endOf('day').toDate(),
        }
    } 

    if (state) {
        findQuery.state = state;
    }

    if(title){
        findQuery.title = title;
    }
    if(description){
        findQuery.description = description;
    }

    if(tags){
        findQuery.tags =tags
    }
    if(author){
        findQuery.author = author
    }

    if(reading_time){
        findQuery.reading_time = reading_time
    }
    
    const sortQuery = {};

    const sortAttributes = blog_by.split(',')

    for (const attribute of sortAttributes) {
        if (blog === 'asc' && blog_by) {
            sortQuery[attribute] = 1
        }
    
        if (blog === 'desc' && blog_by) {
            sortQuery[attribute] = -1
        }
    }

    const blogs = await BlogModel
    .find(findQuery)
    .sort(sortQuery)
    .skip(page)
    .limit(per_page)

    
    return res.status(200).json({status: true, blogs });
 
} catch (error) {
    res.send(error.message)
}

      
}

//logged in  && not logged in should get to see a published blog
exports.getBlog = async  (req,res)=>{

    try {
        const {id} = req.params;

        const blog = await BlogModel.findById({_id:id})
        if(blog.state !== "published"){
            return res.status(400).json({status:false, message:"Blog is not published"})
        }

        //update blog read count
        blog.read_count = blog.read_count + 1

        await blog.save();
        return res.json({status:true, blog})

    } catch (error) {
        res.send(error.message)
    }
}

exports.getUserBlogs = async (req,res)=>{
    const user = req.user._id
    const userBlogs = await UserModel.findById(user).populate("blogs",{title:1} )
   const blogs =  userBlogs.blogs
   console.log(blogs)
}


//Authorised users should be able to create a blog
exports.createBlog = async (req,res)=>{
   try {
    const newBlog = req.body; 

   //readingTime
   const readingTime = await readTime.getReadTime(newBlog.body);
   newBlog.reading_time = readingTime;   

   const blogCreator = await UserModel.findOne({_id:req.user._id});
   newBlog.author = blogCreator;
   

   const newBlogCreated = await BlogModel.create(newBlog);
   return res.json({status: true ,message:"Blog created Successfully" , newBlogCreated})
   } catch (error) {
    res.send(error.message)
    
   }
}


//authorised user should be able to publish their blog
exports.updateBlogState = async (req,res)=>{
    try {
        const {id} = req.params;
    const {state }= req.body;

    const blog = await BlogModel.findOne({_id:id});  

    if(!blog){
        return res.status(404).json({status: false, blog: null})
    }

    blog.state = state //update state
    await blog.save();
    return res.json({status: true, blog })
    } catch (error) {
        res.send(error.message)
    }
}


//authorized user should be able to update their blog
exports.updateBlog = async (req,res)=>{

    try {
        const {id} = req.params;
        const user = req.user;
        const body = req.body;
   
    const blogOwner = await UserModel.findById(user._id)
    
    const blog = await BlogModel.findById(id);  
   

    if(!blog){
        return res.status(404).json({status: false, blog: null})
    }
    const ownerId = JSON.stringify(blogOwner._id);
    const postAuthorId = JSON.stringify(blog.author)
    
    //check if the user is the author
    if(ownerId !== postAuthorId){
        return res.status(401).json({
            message:"Unauthorised"
        })
    }

    //update blog body
    const updateBlog = await blog.updateOne(body)

    return res.json({status: true,message:"updated successfully", updateBlog})

    } catch (error) {
        res.send(error.message)
    }
   

}



//Delete Blog by authorised user
exports.deleteBlog  = async (req,res)=>{ 
   try {
    const {id} = req.params;
    const user = req.user;

    const blogOwner = await UserModel.findById(user._id)//author id
    
    const blog = await BlogModel.findById(id);  //blog id
  

    if(!blog){
        return res.status(404).json({status: false, blog: null})
    }
    const ownerId = JSON.stringify(blogOwner._id);
    const postAuthorId = JSON.stringify(blog.author)
    
    //check if the user is the author
    if(ownerId !== postAuthorId){
        return res.status(401).json({
            message:"Unauthorised"
        })
    }


    const deleteBlog = await BlogModel.deleteOne({_id:id});
    return res.status(201).json({status:true, message:"Deleted Successful" , deleteBlog})
   } catch (error) {
    res.send(error.message)
   }
}
