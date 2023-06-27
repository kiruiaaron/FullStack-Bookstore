
const jwt = require('jsonwebtoken')
require('dotenv').config();


//function to generate tokens
async function generateTokens(member){
    const payload ={
        memberId: member.memberId
    }

    const options={
        expires: '1hr'
    };
    const secret = process.env.DB_SECRETKEY
    return jwt.sign(payload,secret,)
}

module.exports ={
    generateTokens,
}