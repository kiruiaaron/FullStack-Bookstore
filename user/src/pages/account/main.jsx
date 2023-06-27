import React from 'react'
import Topbar from '../../components/topbar/topbar'
import './main.css'
import Books from '../../components/MainSection/Books'
import BorrowedBooks from '../../components/MainSection/BorrowedBooks'

const Main = () => {
  return (
    <div>
        <Topbar/>
        <div className="homeContainer">
          <div className="allBooks">
            <Books/>
            <BorrowedBooks/>
          </div>
        </div>
    </div>
  )
}

export default Main