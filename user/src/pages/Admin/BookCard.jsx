import React, { useState, useEffect } from "react";

const BookCard = ({ data = [], onEdit, onDelete }) => {
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    PublicationYear: "",
    Status: "",
  });

  // Sync formData with selected book
  useEffect(() => {
    if (editingBook) {
      const bookToEdit = data.find((book) => book.BookID === editingBook);
      if (bookToEdit) {
        setFormData({
          Title: bookToEdit.Title || "",
          Author: bookToEdit.Author || "",
          PublicationYear: bookToEdit.PublicationYear || "",
          Status: bookToEdit.Status || "Available",
        });
      }
    }
  }, [editingBook, data]); // Re-run when data changes

  const handleEdit = (book) => {
    setEditingBook(book.BookID);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (BookID) => {
    onEdit(BookID, formData);
    setEditingBook(null);
  };

  const handleCancel = () => {
    setEditingBook(null);
  };

  return (
    <div className="book-list-container">
      {data.length > 0 ? (
        <table className="book-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const isEditing = editingBook === item.BookID;
              return (
                <tr key={item.BookID}>
                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${item.Image}`}
                      alt={item.Title}
                      style={{ width: "100px", height: "100" }}
                    />
                  </td>
                  {isEditing ? (
                    <>
                      <td>
                        <input
                          name="Title"
                          value={formData.Title}
                          onChange={handleFormChange}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          name="Author"
                          value={formData.Author}
                          onChange={handleFormChange}
                          className="edit-input"
                        />
                      </td>
                      <td>
                        <input
                          name="PublicationYear"
                          value={formData.PublicationYear}
                          onChange={handleFormChange}
                          className="edit-input"
                          type="number"
                        />
                      </td>
                      <td>
                        <select
                          name="Status"
                          value={formData.Status}
                          onChange={handleFormChange}
                          className="edit-input"
                        >
                          <option value="Available">Available</option>
                          <option value="Borrowed">Borrowed</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="save-btn"
                          onClick={() => handleUpdate(item.BookID)}
                        >
                          Save
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.Title}</td>
                      <td>{item.Author}</td>
                      <td>{item.PublicationYear}</td>
                      <td>{item.Status}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => onDelete(item.BookID)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BookCard;
