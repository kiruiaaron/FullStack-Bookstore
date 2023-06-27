const joi= require('joi');

const new_user_schema = joi.object({
    Name:joi.string()
             .min(3)
             .required(),
    userName:joi.string()
              .required(),
    Address:joi.string()
                .required()
                .min(5)
                .max(30),
        
    ContactNumber: joi.string()
                      .required()
                      .min(5)
                      .max(9),
     
    Email:joi.string()
           .required()
           .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    Password:joi.string()
               .required()
               .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword:joi.ref('Password')
})

module.exports ={new_user_schema};