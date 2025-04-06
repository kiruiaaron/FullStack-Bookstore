import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/topbar";
import "./main.css";
import Books from "../../components/MainSection/Books";
import BorrowedBooks from "../../components/MainSection/BorrowedBooks";
import axios from "axios";
import Sidebar from "../../components/MainSection/Sidebar";

const Main = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("allbooks");
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedMenu]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      switch (selectedMenu) {
        case "allbooks":
          response = await axios.get("http://localhost:5000/books");
          setItem(response.data.data);
          break;
        case "availablebooks":
          response = await axios.get("http://localhost:5000/statusAvailable");
          setItem(response.data.results);
          break;
        case "borrowedbooks":
          response = await axios.get("http://localhost:5000/loanBooks");
          setItem(response.data.results);
          break;
        default:
          response = await axios.get("http://localhost:5000/books");
      }
    } catch (error) {
      setError("Failed to Load Data");
    } finally {
      setLoading(false);
    }
  };
  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    switch (selectedMenu) {
      case "allbooks":
        return (
          <div>
            <Books />
          </div>
        );
      case "availablebooks":
        return (
          <div>
            <Books />
          </div>
        );
      case "borrowedbooks":
        return (
          <div>
            <BorrowedBooks />
          </div>
        );
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <div>
      <Topbar />
      <div className="home-container">
        <Sidebar onSelectMenu={setSelectedMenu} />
        <div className="home-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Main;
