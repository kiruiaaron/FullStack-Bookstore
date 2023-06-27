const express = require('express')

const LoanRouter = express.Router();
const {getLoans,borrowBook,ReturnBook} =require('../controllers/LoanController')

LoanRouter.get('/loans',getLoans);
LoanRouter.post('/borrow',borrowBook);
LoanRouter.post('/return',ReturnBook);


module.exports = LoanRouter;