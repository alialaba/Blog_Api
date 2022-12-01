const joi = require("joi");

const validateUserSignup = async (req,res, next)=>{

    const userSignupPayload= await req.body;
    try {
        await signupValidator.validateAsync(userSignupPayload)
        next()
    } catch (error) {
        console.log(error)
        return res.status(406).send(error.details[0].message)
    }


}

const signupValidator = joi.object({
    email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),


    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

    firstname: joi.string()
    .min(3)
    .max(255)
    .required(),

    lastname: joi.string()
    .min(3)
    .max(255)
    .required(),
    
    create_at: joi.date()
    .default(Date.now()),
})


module.exports = validateUserSignup