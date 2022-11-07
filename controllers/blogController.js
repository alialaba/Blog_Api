const {BlogModel }= require("../models");
const {UserModel} = require("../models")
const moment = require("moment")
const readTime = require("../readTimeLogic");


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
        blog.read_count = blog.read_count + 1

        await blog.save();
        return res.json({status:true, blog})

    } catch (error) {
        res.send(error.message)
    }
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
   

   await BlogModel.create(newBlog);
   return res.json({message:"Blog created Successfully"})
   } catch (error) {
    res.send(error.message)
    
   }
}



//authorized user should be able to published their post
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


exports.deleteBlog  = async (req,res)=>{ 
   try {
    const {id} = req.params;

    const blog = await BlogModel.deleteOne({_id:id});
    console.log(blog)
    return res.status(200).json({message:"Deleted Successful" , blog})
   } catch (error) {
    res.send(error.message)
   }
}
