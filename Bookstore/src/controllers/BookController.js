const mssql = require("mssql");
const config = require("../config/config");
const upload = require("../middlewares/uplodImageMiddleware");

// create a new book
async function createBook(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({
        status: false,
        message: "Error uploading image",
        error: err,
      });
    } else {
      // Extract book details
      const { Title, Author, PublicationYear, Status } = req.body;
      const Image = req.file ? req.file.filename : null; // Get filename for saved image
      console.log(req.file.path);
      console.log(req.file.destination);

      try {
        const sql = await mssql.connect(config);
        if (sql.connected) {
          let createBookResult = await sql
            .request()
            .input("Title", Title)
            .input("Author", Author)
            .input("PublicationYear", PublicationYear)
            .input("Image", Image)
            .input("Status", Status)
            .execute("createBook");

          res.status(201).json({
            status: true,
            message: "Book created successfully",
            books: createBookResult.recordset,
          });
        } else {
          res.status(400).json({
            status: false,
            message: "Failed to connect to database",
          });
        }
      } catch (error) {
        res.status(400).json({
          status: false,
          message: "Failed to create Book",
          error: error.message,
        });
      }
    }
  });
}

// get a book by BookID
async function fetchBookById(req, res) {
  let sql = await mssql.connect(config);
  const { id } = req.params;
  if (sql.connected) {
    let result = await sql.query(`SELECT * FROM Books WHERE BookID = ${id}`);
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
    res.json({
      success: true,
      message: "listed all available books ok",
      data: result.recordset,
    });
  }
}

async function loanBooks(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(
      "SELECT * FROM Books WHERE Status ='Borrowed'"
    );
    console.log(results.recordset);
    res.json({
      success: true,
      message: "all available books",
      results: results.recordset,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "no available books ",
    });
  }
}

async function availableBooks(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(
      "SELECT * FROM Books WHERE Status ='available'"
    );
    res.json({
      success: true,
      message: "all available books",
      results: results.recordset,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "no available books ",
    });
  }
}

async function updateBook(req, res) {
  const { BookID } = req.params;
  const { Title, Author, PublicationYear, Status } = req.body;
  const Image = req.file ? req.file.filename : null; // Handle image update if provided

  try {
    const sql = await mssql.connect(config);
    if (sql.connected) {
      let updateBookResult = await sql
        .request()
        .input("BookID", BookID)
        .input("Title", Title)
        .input("Author", Author)
        .input("PublicationYear", PublicationYear)
        .input("Image", Image)
        .input("Status", Status)
        .execute("updateBook");

      console.log(updateBookResult.recordset); // Log the result for debugging

      res.status(200).json({
        status: true,
        message: "Book updated successfully",
        books: updateBookResult.recordset,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Failed to connect to database",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Failed to update Book",
      error: error.message,
    });
  }
}

async function deleteBook(req, res) {
  try {
    let sql = await mssql.connect(config);
    const BookID = req.params.BookID; // Correctly access the parameter
    console.log("BookID received:", BookID);

    if (!BookID) {
      return res
        .status(400)
        .json({ success: false, message: "BookID is required" });
    }

    if (sql.connected) {
      let result = await sql
        .request()
        .input("BookID", BookID) // Use parameterized query to prevent SQL injection
        .query("DELETE FROM Books WHERE BookID = @BookID");
      console.log("Delete result:", result); // Log the result for debugging
      res.json({
        success: true,
        message: "Deleted the book successfully",
        data: result.recordset,
      });
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = {
  createBook,
  allAvailableBooks,
  fetchBookById,
  availableBooks,
  loanBooks,
  updateBook,
  deleteBook,
};
