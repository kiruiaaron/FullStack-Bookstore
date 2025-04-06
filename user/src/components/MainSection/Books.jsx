import React, { useEffect, useState } from "react";
import "./books.css";
import axios from "axios";
import AvailableCard from "./availableCard";

const Books = () => {
  const [books, setBooks] = useState("");
  const [item, setItem] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(
        "http://localhost:5000/statusAvailable",
        books
      );
      setItem(res.data.results);
      console.log(res.data);
    };
    fetchBooks();
  }, [books]);

  return (
    <div className="Mainbooks">
      <h1>Featured Boooks</h1>

      <p>Feel free to borrow your favourite book</p>
      {!item ? <p>Not Found</p> : <AvailableCard data={item} />}
    </div>
  );
};

export default Books;
