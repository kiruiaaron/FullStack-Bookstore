const { new_user_schema } = require("../model/userSchema");

function newUserValidator(body){
  let user=new_user_schema.validate(body,{abortEarly:false})
   if(user.error?.details.length){
    let message = user.error.details.map(err=>err.message);
    console.log(message.join("\n"))
    throw new Error();
   }else{
    return user;
   }
}

module.exports = {newUserValidator};