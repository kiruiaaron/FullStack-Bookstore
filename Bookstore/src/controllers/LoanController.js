const mssql = require("mssql");
const config = require("../config/config");

// end point to get all loans
async function getLoans(req, res) {
  const sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(`SELECT * FROM dbo.Loans`);
    let products = results.recordset;

    res.json({
      success: true,
      message: "fetched products successfully",
      results: products,
    });
  } else {
    res.status(500).send("internal server error");
  }
}

// end point to borrow a book
async function borrowBook(req, res) {
  const sql = await mssql.connect(config);

  if (sql.connected) {
    const { BookID, MemberID } = req.body;

    const CurrentDate = new Date(); // Current date
    const finalDate = new Date();
    finalDate.setDate(finalDate.getDate() + 7); // Adding 7 days to the current date

    // Use proper date type instead of strings
    try {
      const results = await sql
        .request()
        .input("BookID", BookID)
        .input("MemberID", MemberID)
        .input("LoanDate", CurrentDate) // Fixed: Pass as Date
        .input("ReturnDate", finalDate) // Fixed: Pass as Date
        .execute("borrowBook");
      console.log(results.recordset);
      if (results.rowsAffected[0] === 0) {
        return res.status(400).json({
          success: false,
          message: "Book is already borrowed",
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "Borrowed a book successfully",
          results: results.recordset,
        });
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
    // Retrieve email and book title
  } else {
    res.status(404).json({
      success: false,
      message: "Failed to borrow a book",
      error: error.message,
    });
  }
}

// endpoint to return a book
async function ReturnBook(req, res) {
  try {
    const sql = await mssql.connect(config);

    if (!sql.connected) {
      return res
        .status(500)
        .json({ success: false, message: "Database connection failed" });
    }

    const { BookID, MemberID } = req.body;

    // ✅ Use Parameterized Query to Check if Book is Borrowed
    const isBorrowedQuery = await sql
      .request()
      .input("BookID", mssql.UniqueIdentifier, BookID)
      .input("MemberID", mssql.UniqueIdentifier, MemberID)
      .query(
        `SELECT 1 FROM dbo.Loans WHERE BookID = @BookID AND MemberID = @MemberID`
      );

    if (isBorrowedQuery.recordset.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Book is not currently borrowed by the specified member",
      });
    }

    // ✅ Execute Stored Procedure Safely
    const results = await sql
      .request()
      .input("BookID", mssql.UniqueIdentifier, BookID)
      .input("MemberID", mssql.UniqueIdentifier, MemberID)
      .execute("returnBook");

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      results: results.recordset,
    });
  } catch (error) {
    console.error(
      "Error returning book:",
      error.originalError?.message || error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.originalError?.message || error.message,
    });
  }
}

const getBorrowedBooksByMember = async (req, res) => {
  try {
    const { MemberID } = req.body;

    if (!MemberID) {
      return res.status(400).json({
        success: false,
        message: "MemberID is required",
      });
    }

    let sql = await mssql.connect(config);

    let result = await sql
      .request()
      .input("MemberID", MemberID)
      .execute("GetBorrowedBooksByMember");

    res.status(200).json({
      success: true,
      books: result.recordset,
    });
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { getLoans, borrowBook, ReturnBook, getBorrowedBooksByMember };
