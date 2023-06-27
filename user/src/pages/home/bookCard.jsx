import React from 'react'

const BookCard = ({data}) => {
  return (
    <div className="availablebooks">
      {
        (data)?(data.map(item=>{
            return(
                <div className="latest-card">
                    <div className='image'>
                    <img src={`${item.image}`}alt="" />
                    </div>
                    <div className="latest-title">
                        <h3>Title:{item.Title}</h3>
                        <p>Author:{item.Athor}</p>
                        <h3>PublicationYear:{item.PublicationYear}</h3>
                        <h3>Start:{item.Status}</h3>

                    </div>
                </div>
            )
        })
        ):""
    }
    </div>
  )
}

export default BookCard 