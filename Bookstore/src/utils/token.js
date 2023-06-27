const jwt = require('jsonwebtoken');
require('dotenv').config()

const tokenGenerator = async(data)=>{

   return jwt.sign(data, process.env.SECRET);

}

function tokenVerifier(token){
   return jwt.verify(token,process.env.SECRET, {expiresIn:'1h'})
}

module.exports ={tokenGenerator,tokenVerifier};