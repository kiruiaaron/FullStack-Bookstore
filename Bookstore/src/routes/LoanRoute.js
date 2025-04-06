const express = require("express");

const LoanRouter = express.Router();
const {
  getLoans,
  borrowBook,
  ReturnBook,
  getBorrowedBooksByMember,
} = require("../controllers/LoanController");

LoanRouter.get("/loans", getLoans);
LoanRouter.post("/borrow", borrowBook);
LoanRouter.post("/return", ReturnBook);
LoanRouter.post("/borrowed", getBorrowedBooksByMember);

module.exports = LoanRouter;
