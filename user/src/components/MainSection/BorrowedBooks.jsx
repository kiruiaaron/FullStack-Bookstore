import axios from "axios";
import React, { useEffect, useState } from "react";
import BorrowedCard from "./borrowedCard";

const BorrowedBooks = () => {
  const [books, setBooks] = useState([]);
  const [item, setItem] = useState("");
  const MemberID = localStorage.getItem("MemberID");

  useEffect(() => {
    if (!MemberID) {
      alert("Error: MemberID is missing. Please log in again.");
      return;
    }

    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.post("http://localhost:5000/borrowed", {
          MemberID,
        });
        console.log(response.data);
        if (response.data.success) {
          setBooks(response.data.books);
          setItem(response.data.books);
        } else {
          alert("Failed to fetch borrowed books.");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBorrowedBooks();
  }, [MemberID]);

  return (
    <div className="borrowed">
      <h1> Books You have borrowed</h1>

      <p>Return Your Book before deadline</p>
      {!item ? <p>Not Found</p> : <BorrowedCard data={item} />}
    </div>
  );
};

export default BorrowedBooks;
