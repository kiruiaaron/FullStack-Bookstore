import axios from "axios";
import React, { useState } from "react";

const AvailableCard = ({ data, onBorrow }) => {
  const [message, setMessage] = useState("Book borrowed successfully");

  const handleBorrow = async (BookID, e) => {
    e.preventDefault();
    const MemberID = localStorage.getItem("MemberID");

    console.log(MemberID);

    if (!MemberID) {
      alert("Error: MemberID is missing. Please log in again.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/borrow", {
        BookID,
        MemberID,
      });
      //setMessage(response.data.message);
      alert(response.data.message);
      if (response.data.success) {
        onBorrow(BookID);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="accountbooks">
      {data
        ? data.map((item) => {
            return (
              <div className="latest-card" key={item.BookID}>
                <div className="latest-title">
                  <img
                    src={`http://localhost:5000/uploads/${item.Image}`}
                    alt={item.Title}
                    style={{ width: "100px", height: "100" }}
                  />
                  <h3>Title:{item.Title}</h3>
                  <p>Author:{item.Author}</p>
                  <h3>PublicationYear:{item.PublicationYear}</h3>
                  <h3>Status:{item.Status}</h3>
                  <button
                    className="b-btn"
                    onClick={(e) => handleBorrow(item.BookID, e)}
                  >
                    Borrow
                  </button>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default AvailableCard;
