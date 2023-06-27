const express = require('express')
const BookRouter = express.Router();

const {allAvailableBooks,
    fetchBookById,
    createBook,} =require('../controllers/BookController');
//const { tokenVerifier } = require('../utils/token');
const tokenValidatorMiddleware = require('../middlewares/tokenValidatorMiddleware');

//BookRouter.use(tokenValidatorMiddleware);
BookRouter.get('/books',allAvailableBooks);
BookRouter.get('/books/:id',fetchBookById);
BookRouter.post('/newbook',createBook);


module.exports = BookRouter;