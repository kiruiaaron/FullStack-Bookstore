import React from "react";
import "./BookCard.css";

const BookCard = ({ data = [] }) => {
  return (
    <div className="book-list-container">
      {data.map((item) => (
        <div className="book-card" key={item.BookID}>
          <div className="book-cover">
            <div className="book-details">
              <h2 className="book-title">Title: {item.Title}</h2>
              <p className="book-author">Author: {item.Author}</p>
              <p className="book-year">
                Publication Year: {item.PublicationYear}
              </p>
              <p className="status">
                Status: {item.Status}
              </p>
            </div>
            <div className="book-spine"></div>
            <img
              src={`http://localhost:5000/uploads/${item.Image}`}
              alt={item.Title}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCard;
