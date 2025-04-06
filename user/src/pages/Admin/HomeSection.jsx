import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./Admin.css";
import axios from "axios";
import BookCard from "./BookCard";
import MemberCard from "./MemberCard";
import CreateBookForm from "./createBook";

const HomeSection = () => {
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
        case "createbook":
          break;
        case "viewmembers":
          response = await axios.get("http://localhost:5000/members");
          setItem(response.data.result);
          break;
        case "memberswithborrowedbooks":
          response = await axios.get("http://localhost:5000/loan");
          setItem(response.data.result);
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

  const handleDeleteBook = async (BookID) => {
    if (!BookID) {
      setError("BookID is missing");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/books/${BookID}`
      );
      console.log("Response:", response.data);

      if (response.data.success) {
        alert("Book deleted successfully");
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete book");
    }
  };

  const handleEditBook = async (BookID, updatedData) => {
    try {
      console.log("Sending updatedData:", updatedData);
      const response = await axios.put(
        `http://localhost:5000/books/${BookID}`,
        updatedData
      );
      console.log(response);

      if (response.data.success) {
        alert("Book updated successfully");
      }
    } catch (error) {
      console.error(
        "Error updating the book:",
        error.response || error.message
      );
    }
  };

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    switch (selectedMenu) {
      case "allbooks":
        return (
          <div>
            {!item ? (
              <p>Not Found</p>
            ) : (
              <BookCard
                data={item}
                onDelete={handleDeleteBook}
                onEdit={handleEditBook}
              />
            )}
          </div>
        );
      case "availablebooks":
        return (
          <div>
            {!item ? (
              <p>Not Found</p>
            ) : (
              <BookCard
                data={item}
                onDelete={handleDeleteBook}
                onEdit={handleEditBook}
              />
            )}
          </div>
        );
      case "borrowedbooks":
        return (
          <div>
            {!item ? (
              <p>Not Found</p>
            ) : (
              <BookCard
                data={item}
                onDelete={handleDeleteBook}
                onEdit={handleEditBook}
              />
            )}
          </div>
        );
      case "createbook":
        return <CreateBookForm />;
      case "viewmembers":
        return !item ? <p>Not Found</p> : <MemberCard data={item} />;
      case "memberswithborrowedbooks":
        return !item ? <p>Not Found</p> : <MemberCard data={item} />;
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <div className="home-container">
      <SideBar onSelectMenu={setSelectedMenu} />
      <div className="home-content">{renderContent()}</div>
    </div>
  );
};

export default HomeSection;
