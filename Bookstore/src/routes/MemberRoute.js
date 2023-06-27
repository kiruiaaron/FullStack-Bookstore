const express = require('express')
const {
    connectToDatabase,
    getMember, getMemberId,
    createNewMember,
    getMembersWithBorrowedBook,
    loginMember,
} = require('../controllers/MemberController');

const protectedRouter = require('./protectedRoute');
const newUserMiddleware = require('../middlewares/newUserMiddleware');

const MemberRouter = express.Router();

MemberRouter.get('/', connectToDatabase)
MemberRouter.get('/members', getMember)
MemberRouter.get('/members/:id', getMemberId)
MemberRouter.get('/loan', getMembersWithBorrowedBook)
MemberRouter.post('/newmember',createNewMember)
MemberRouter.post('/login',loginMember)

//token 
MemberRouter.post('/login/protected',protectedRouter)

module.exports = MemberRouter;
