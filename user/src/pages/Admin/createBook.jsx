import React, { useState } from "react";
import axios from "axios";
import "./Admin.css"; // Assuming you have some CSS for styling

const CreateBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publicationYear: "",
    status: "available", // default status
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("Title", formData.title);
    form.append("Author", formData.author);
    form.append("PublicationYear", formData.publicationYear);
    form.append("Status", formData.status);
    if (formData.image) {
      form.append("Image", formData.image);
    }

    try {
      const response = await axios.post("http://localhost:5000/newbook", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book created successfully!");
      console.log("Book created:", response.data);

      // **Reset form fields after successful submission**
      setFormData({
        title: "",
        author: "",
        publicationYear: "",
        status: "available",
        image: null, // Reset the image
      });

      // **Reset file input (important for clearing the selected file)**
      document.getElementById("image").value = "";
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="publicationYear">Publication Year:</label>
        <input
          type="number"
          id="publicationYear"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CreateBookForm;
