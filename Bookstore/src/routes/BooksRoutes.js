const express = require('express')
const BookRouter = express.Router();

const {allAvailableBooks,
    fetchBookById,
    createBook,
    availableBooks,
    LoanBooks,} =require('../controllers/BookController');
//const { tokenVerifier } = require('../utils/token');
const tokenValidatorMiddleware = require('../middlewares/tokenValidatorMiddleware');

//BookRouter.use(tokenValidatorMiddleware);
BookRouter.get('/books',allAvailableBooks);
BookRouter.get('/books/:id',fetchBookById);
BookRouter.post('/newbook',createBook);
BookRouter.get('/statusAvailable',availableBooks);
BookRouter.get('/loans',LoanBooks)


module.exports = BookRouter;