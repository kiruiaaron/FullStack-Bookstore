import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BorrowedCard from './borrowedCard'

const BorrowedBooks = () => {

    
    const [books, setBooks] =useState('')
    const [item, setItem] =useState('')
    
    useEffect(()=>{
      const fetchBooks =async()=>{
         const res = await axios.get('http://localhost:5000/books', books)
         setItem(res.data.data)
         console.log(res.data.data)
      }
      fetchBooks();
    },[books])

    
    
  return (
    <div className='borrowed'>
        <h1> Boooks You have borrowed</h1>
      
      <p>
        Return Your Book before deadline
      </p>
         {
           (!item)?<p>Not Found</p>:<BorrowedCard data={item}/> 
         }
    </div>
  )
}

export default BorrowedBooks