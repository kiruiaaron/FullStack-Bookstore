import React from "react";
import "./Admin.css";

const MemberCard = ({ data = [], onEdit, onDelete }) => {
  return (
    <div className="book-list-container">
      {data.length > 0 ? (
        <table className="book-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Email Address</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.MemberID}>
                <td>{item.Name}</td>
                <td>{item.Address}</td>
                <td>{item.ContactNumber}</td>
                <td>{item.EmailAddress}</td>
                <td>{item.Role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Members available</p>
      )}
    </div>
  );
};

export default MemberCard;
