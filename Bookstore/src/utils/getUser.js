
const mssql = require('mssql');
const config = require('../config/config')

async function getUser(){
  
   let sql = await mssql.connect(config);
      if (sql.connected) {
        let results = await sql
          .request()
          .input("MemberID", MemberID)
          .execute("dbo.get_member_byID");

        let user = results.recordset[0];

      }
    }
module.exports =getUser;