const mssql = require('mssql');
const config=require('../config/config')

// create a new book
async function createBook(req, res) {
  try {
    const { Title, Athor, PublicationYear,Image, Status } = req.body;

    const sql = await mssql.connect(config);
    if (sql.connected) {
      
      let createBookResult = await sql.request()
        .input('Title', Title)
        .input('Athor', Athor)
        .input('PublicationYear', PublicationYear)
        .input('image',Image)
        .input('Status', Status)
        .execute('createNewBook') // name of stored procedure


      res.status(201).json({
        status: true,
        message: 'Book created successfully',
        books: createBookResult.recordset
      });
    } else {
      res.status(400).json({
        status: false,
        message: 'Failed'

      })
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Failed to create Book',
      error: error.message
    });
  }
}


// get a book by BookID 
async function fetchBookById(req, res) {
    let sql = await mssql.connect(config);
    const { id } = req.params;
    if (sql.connected) {
      let result = await sql.query(
        `SELECT * FROM Books WHERE BookID = ${id}`
      );
      console.log(result);
      res.json({
        success: true,
        message: "fetched the book successfully",
        data: result.recordset,
      });
    }
  }


// list all available books
async function allAvailableBooks(req, res) {
    let sql = await mssql.connect(config);
    if (sql.connected) {
        let result = await sql.query("SELECT * FROM Books");
        console.log(result);
        res.json({
            success: true,
            message: "listed all available books ok",
            data: result.recordset,
        });
    }
}

async function availableBooks(req,res){
   let sql = await mssql.connect(config);
   if(sql.connected){
    let results = await sql.query("SELECT * FROM Books WHERE Status ='available'");
    res.json({
      success:true,
      message:'all available books',
      results:results.recordset,

    });
   }
   else{
    res.status(404).json({
      success:false,
      message:'no available books '
      
    })
   }
}

async function LoanBooks(req,res){
  let sql = await mssql.connect(config);
  if(sql.connected){
   let results = await sql.query("SELECT * FROM Books WHERE Status ='loaned'");
   res.json({
     success:true,
     message:'all loaned books',
     results:results.recordset,

   });
  }
  else{
   res.status(404).json({
     success:false,
     message:'no loaned books '
     
   })
  }
}


module.exports = {
    createBook,
    allAvailableBooks,
    fetchBookById,
    availableBooks,
    LoanBooks
};