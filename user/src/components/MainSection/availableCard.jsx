import React from 'react'

const AvailableCard = ({data}) => {
  return (
    <div className="accountbooks">
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
                        <h3>Status:{item.Status}</h3>
                         <button className='b-btn'>Borrow</button>
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