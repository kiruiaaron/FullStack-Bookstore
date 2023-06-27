import axios from 'axios'
import React, { useState } from 'react'

const AvailableCard = ({data}) => {

const [message,setMessage] = useState('Book borrowed successfully')

  const handleBorrow =async(BookID,e)=>{
     e.preventDefault();
   try {
    const response = await axios.post('http://localhost:5000/borrow', { BookID });
    setMessage(response.data.message);
    console.log(response.data)
    alert(message)
   } catch (error) {
    console.log(error);
   }

  }


  return (
    <div className="accountbooks">
      {
        (data)?(data.map(item=>{
            return(
                <div className="latest-card" key={item.BookID}>
                    <div className='image'>
                    <img src={`${item.image}`}alt="" />
                    </div>
                    <div className="latest-title">
                        <h3>Title:{item.Title}</h3>
                        <p>Author:{item.Athor}</p>
                        <h3>PublicationYear:{item.PublicationYear}</h3>
                        <h3>Status:{item.Status}</h3>
                         <button className='b-btn' onClick={() => handleBorrow(item.BookID)}>Borrow</button>
                    </div>
                </div>
            )
        })
        ):""
    }
    </div>
  )
}

export default  AvailableCard