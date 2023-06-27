const { tokenVerifier } = require("../utils/token");


async  function tokenValidatorMiddleware(req,res, next){
    let token = req.headers['authorization'].split(" ")[1]

    try {
        
         if(!token){
            return next({status:400, message:"Token not provided"})
         }
         let user = await tokenVerifier(token);
         if(user){
            req.user = user;
            next()
         }
    } catch (error) {
        next({ message:error.message});
        
        if(error.message.includes('token')|| error.message.includes('invalid')){
            res.status(401).json({
              success: false,
              message:'Log in again'
            })
            }
    }
}

module.exports = tokenValidatorMiddleware;