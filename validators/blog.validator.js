const joi = require("joi");

const validateBlog = async (req,res,next)=>{

    const blogPayload = req.body;
    console.log(blogPayload)
    try{
      await blogValidator.validateAsync(blogPayload);
      next();

    }catch(error){
     console.log(error);
     return res.status(406).send(error.details[0].message)
    }

}

const blogValidator = joi.object({

title: joi.string()
    .min(10)
    .max(255)
    .required(),
description: joi.string()
    .min(10)
    .max(100)
    .optional(),
state: joi.string()
    .default("draft"),
    // .valid('draft', 'published') use this when user is expected to enter either values
tags: joi.array()
    .items(joi.string()),
body: joi.string()
    .min(100)
    .required(),
create_At: joi.date()
    .default(Date.now()),
updated_at: joi.date()
    .default(Date.now())

})

module.exports = validateBlog;