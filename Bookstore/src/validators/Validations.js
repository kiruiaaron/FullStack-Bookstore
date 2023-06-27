const Joi = require('joi');

// Members validation

//Members login
const loginSchema = Joi.object({
    EmailAddress: Joi.string().email().required(),
    Password: Joi.string().required()
  });


  //create new member
  const createnewMemberSchema = Joi.object({
    Name: Joi.string().required(),
    EmailAddress: Joi.string().email().regex(/^.+@.+\..+$/).required(),
    Password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/).required(),
  });

 module.exports={
    loginSchema,
    createnewMemberSchema
  }