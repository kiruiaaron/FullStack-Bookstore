const mssql = require('mssql');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const {generateTokens} = require('../tokens/Tokens');
const sendMail = require('../controllers/Email');
const { tokenGenerator } = require('../utils/token');
const {sendLoginMail} =require('../controllers/Email')
const {registerUser} =require('../controllers/Email')


async function connectToDatabase() {
    try {
        await mssql.connect(config);
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error);
        console.error('Stack trace:', error.stack);
    }
}

async function getMember(req, res) {
    let sql = await mssql.connect(config)
    if (sql.connect) {
        let result = await sql.query("SELECT * FROM Members")
        res.status(400).json({
            success: "true",
            message: "All members",
            result: result.recordset
        })
    }
}
//get a member by id
async function getMemberId(req, res) {
    let sql = await mssql.connect(config)
    if (sql.connect) {
        const { id } = req.params
        let result = await sql.request()
            .input('id', Number(id))
            .execute('select_member_id');
        res.status(400).json({
            success: "true",
            message: "Member",
            result: result.recordset
        })
    }
}
//authenticaion
async function loginMember(req, res) {
    // Login validation
  
    let sql = await mssql.connect(config);
    if (sql.connect) {
        const { Email, Password } = req.body
        let result = await sql.request()
            .input('Email', Email)
            .execute('select_member_Email')

        let user = result.recordset[0]
        console.log(user)
        if (user) {
           // let password_match = await bcrypt.compare//(Password,user.Password)
            if(user ){
                let token = await tokenGenerator({
                    Email: user.Email
                })
    
             res.status(200).json({ success: "true", message: "Login Successful",token })
                       //sending mail
           sendLoginMail(`${user.EmailAddress}`, "Logged in", "Logged in successfully");
           
            }else{res.status(404).json({
                     success: "false",
                     message: "Password does not match"
                 })
                } 
        } else {
          res.status(404).json({
            success: false,
            message: "Authentication Failed"
          });
        }
      } 
     else {
      res.status(404).json({
        success: false,
        message: "Internal Server problem"
      });
    }
  }
  




async function createNewMember(req, res) {
    const sql = await mssql.connect(config);
    if (sql.connected) {
        const { Name,userName, Address,ContactNumber,Email, Password,confirmPassword } = req.body;

        //const hashedPassword = await bcrypt.hash(Password, 8)
        const result = await sql.request()
            .input('Name', Name)
            .input('userName', userName)
            .input('Address',Address)
            .input('ContactNumber',ContactNumber)
            .input('Email', Email)
            .input('Password',Password)
            .input('confirmPassword',confirmPassword)
            .execute('add_New_Member');

        res.status(200).json({
            success: true,
            message: 'New member added',
            result: result.recordset

 
        });
        registerUser(Email);
    }
}


async function getMembersWithBorrowedBook(req, res) {
    let sql = await mssql.connect(config)
    if (sql.connect) {
        let result = await sql.request()
            .execute('getMembersWithBorrowedBook')

        res.status(200).json({
            success: 'true',
            message: 'Members with borrowed books',
            result: result.recordset
        })
    } else {
        res.status(200).json({
            success: 'false',
            message: 'Failed to fetch members with borrowed books',

        })
    }
}


module.exports = {
    connectToDatabase,
    getMember,
    getMemberId,
    createNewMember,
    getMembersWithBorrowedBook,
    loginMember
};
