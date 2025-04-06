const express = require("express");
const BookRouter = express.Router();

const {
  allAvailableBooks,
  fetchBookById,
  createBook,
  availableBooks,
  deleteBook,
  loanBooks,
  updateBook,
} = require("../controllers/BookController");
//const { tokenVerifier } = require('../utils/token');
const tokenValidatorMiddleware = require("../middlewares/tokenValidatorMiddleware");

//BookRouter.use(tokenValidatorMiddleware);
BookRouter.get("/books", allAvailableBooks);
BookRouter.get("/books/:BookID", fetchBookById);
BookRouter.post("/newbook", createBook);
BookRouter.get("/statusAvailable", availableBooks);
BookRouter.get("/loanBooks", loanBooks);
BookRouter.put("/books/:BookID", updateBook); // Assuming updateBook is defined in BookController.js
BookRouter.delete("/books/:BookID", deleteBook);

module.exports = BookRouter;
