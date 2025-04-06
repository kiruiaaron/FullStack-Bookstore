const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const { generateTokens } = require("../tokens/Tokens");
const sendMail = require("../controllers/Email");
const { tokenGenerator } = require("../utils/token");
const { sendLoginMail } = require("../controllers/Email");
const { registerUser } = require("../controllers/Email");

async function connectToDatabase() {
  try {
    await mssql.connect(config);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    console.error("Stack trace:", error.stack);
  }
}

async function getMember(req, res) {
  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      // Ensure the connection is successful
      let result = await sql.request().execute("getMembers");
      console.log(result.recordset);
      res.status(200).json({
        // Change status code to 200
        success: "true",
        message: "All members",
        result: result.recordset, // Ensure you return the recordset
      });
    } else {
      res.status(500).json({
        success: "false",
        message: "Database connection failed",
      });
    }
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({
      success: "false",
      message: "Internal server error",
    });
  }
}
//get a member by id
async function getMemberId(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connect) {
    const { id } = req.params;
    let result = await sql
      .request()
      .input("id", Number(id))
      .execute("select_member_id");
    res.status(400).json({
      success: "true",
      message: "Member",
      result: result.recordset,
    });
  }
}
//authenticaion
async function loginMember(req, res) {
  // Login validation

  let sql = await mssql.connect(config);
  if (sql.connect) {
    const { EmailAddress, Password } = req.body;
    let result = await sql
      .request()
      .input("EmailAddress", EmailAddress)
      .execute("select_member_Email");

    let user = result.recordset[0];
    if (user) {
      let password_match = await bcrypt.compare(Password, user.Password);
      if (password_match) {
        let token = await tokenGenerator({
          EmailAddress: user.EmailAddress,
          role: user.Role,
        });

        res.status(200).json({
          success: "true",
          message: "Login Successful",
          token,
          MemberID: user.MemberID,
          EmailAddress: user.EmailAddress,
          Name: user.Name,
          role: user.Role,
        });
      } else {
        res.status(404).json({
          success: "false",
          message: "Password does not match",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Wrong Credentials check your email and password",
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "Internal Server problem",
    });
  }
}

async function createNewMember(req, res) {
  try {
    const sql = await mssql.connect(config);
    if (sql.connected) {
      const {
        Name,
        Address,
        ContactNumber,
        EmailAddress,
        Password,
        ConfirmPassword,
      } = req.body;
      const defaultRole = "user";

      // Debugging
      //nsole.log("Received Data:", req.body);

      // Validation
      if (!Password || !ConfirmPassword) {
        return res
          .status(400)
          .json({ error: "Password and ConfirmPassword are required" });
      } else if (Password !== ConfirmPassword) {
        return res
          .status(400)
          .json({ error: "Password and ConfirmPassword do not match" });
      }
      // Check if user already exists
      const userExists = await sql
        .request()
        .input("EmailAddress", EmailAddress)
        .execute("select_member_Email");
      if (userExists.recordset.length > 0) {
        return res
          .status(400)
          .json({ error: "User already exists, Please use a different email" });
      }

      // Hash passwords
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(String(Password), saltRounds);
      const hashedConfirmPassword = await bcrypt.hash(
        String(ConfirmPassword),
        saltRounds
      );

      // Execute stored procedure
      const result = await sql
        .request()
        .input("Name", Name)
        .input("Address", Address)
        .input("ContactNumber", ContactNumber)
        .input("EmailAddress", EmailAddress)
        .input("Password", hashedPassword)
        .input("ConfirmPassword", hashedConfirmPassword)
        .input("Role", defaultRole)
        .execute("add_New_Member");

      res.status(200).json({
        success: true,
        message: "New member added",
        result: result.recordset,
      });

      registerUser(EmailAddress, "Registered", "Registered successfully");
    }
  } catch (error) {
    console.error("Error in createNewMember:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMembersWithBorrowedBook(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connect) {
    let result = await sql.request().execute("getMembersWithBorrowedBook");

    res.status(200).json({
      success: "true",
      message: "Members with borrowed books",
      result: result.recordset,
    });
  } else {
    res.status(200).json({
      success: "false",
      message: "Failed to fetch members with borrowed books",
    });
  }
}

module.exports = {
  connectToDatabase,
  getMember,
  getMemberId,
  createNewMember,
  getMembersWithBorrowedBook,
  loginMember,
};
