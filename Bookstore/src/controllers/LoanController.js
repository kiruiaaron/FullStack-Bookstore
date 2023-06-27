const mssql = require('mssql')
const config=require('../config/config')
const { sendMailBorrowedBook, sendMailReturnBook } = require('./Email')
console.log(config)

// end point to get all loans
async function getLoans(req,res){
  const sql = await mssql.connect(config)
  if(sql.connected){
    let results=await  sql.query(`SELECT * FROM Loans`)
    let products = results.recordset;
    res.json({
     success:true,
     message: "fetched products successfully",
     results:products
    })
  }else{
     res.status(500).send("internal server error")
  }
   
 }

 

 // end point to borrow a book
    async function borrowBook(req,res){
      const sql = await mssql.connect(config)

     if(sql.connected){
      const {BookID, MemberID} = req.body;

      const CurrentDate = new Date(); // Current date
     const finalDate = new Date();
      finalDate.setDate(finalDate.getDate() + 7); // Adding 14 days to the current date

 

// Format the dates
        const LoanDate = CurrentDate.toDateString();
        console.log(LoanDate)
        const ReturnDate = finalDate.toDateString();
        console.log(ReturnDate)

         const results = sql.request()
                             .input('BookID',BookID)
                             .input('MemberID',MemberID)
                             .input('LoanDate',LoanDate)
                             .input('ReturnDate',ReturnDate)
                             .execute('borrowBook');
     

                           res.status(201).json({
                            success:true,
                            message:'Borrowed book successfully',
                            results: results.recordset
                           })  
      //retrive email and booktitle

      const email =  sql.query(`SELECT Email from Members WHERE MemberID= ${MemberID}`)
      const bookTitle = sql.query(`SELECT Title from Books WHERE BookID =${BookID}`)


      // Send a response indicating the book has been borrowed successfully
      sendMailBorrowedBook(email,bookTitle);
      
      
    }else{
       res.status(404).json({
        success:true,
        message:'failed to borrow a book',
        error:error.message
       })
    };
  };


 
  
 

// endpoint to return a book
async function ReturnBook(req,res){
  const sql = await mssql.connect(config)

 if(sql.connected){
 const {  BookID,MemberID } = req.body;
 const results = await sql.request()
                          .input('BookID',mssql.Int,BookID)
                          .input('MemberID',mssql.Int,MemberID)
                          .execute('returnBook');

          res.status(201).json({
            success:true,
            message:'Book returned successfully',
            
          })

 // Update the book status in the database

   const email =  sql.query(`SELECT Email from Members WHERE MemberID= ${MemberID}`)
   const bookTitle = sql.query(`SELECT Title from Books WHERE BookID =${BookID}`)
   
sendMailReturnBook(email,bookTitle)
   res.status(200).json({ message: 'Book returned successfully.' ,
                            results:results.recordset});
}
else{
  res.status(404).json({
    success: "false",
    message:'failed to return the book',
    error:message.error
    
  })
}
}


module.exports = {getLoans, borrowBook,ReturnBook}




