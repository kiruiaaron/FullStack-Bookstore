import React, { useEffect, useState } from "react";
import "./home.css";
import TopNavBar from "./top/topNavBar";
import axios from "axios";
import BookCard from "./bookCard";
import Hero from "./hero";

const Home = () => {
  const [books, setBooks] = useState("");
  const [item, setItem] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get("http://localhost:5000/books", books);
      setItem(res.data.data);
      console.log(res.data.data);
    };
    fetchBooks();
  }, [books]);

  return (
    <div className="home">
      <TopNavBar />
      <Hero />
      <section className="service">
        <div className="services">
          <h1>Our Services</h1>
          <div className="dec">
            <p>
              You can access services like borrowing a book and returning it.
              <br />
              You have also an opportunity to see the books we have, the books
              that you have borrowed .
              <br />
              You can borrow books after which you return it after a certain
              period of time
            </p>
          </div>
          <div className="pic"></div>
        </div>
      </section>
      <section className="books">
        {!item ? <p>Not Found</p> : <BookCard data={item} />}
      </section>
    </div>
  );
};

export default Home;
