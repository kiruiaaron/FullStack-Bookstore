import axios from "axios";

const BorrowedCard = ({ data }) => {
  const handleReturn = async (BookID, e) => {
    e.preventDefault();
    const MemberID = localStorage.getItem("MemberID");

    if (!MemberID) {
      alert("Error: Please log in again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/return", {
        BookID,
        MemberID,
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Failed to return book. Please try again.");
    }
  };

  return (
    <div className="accountbooks">
      {data
        ? data.map((item) => {
            return (
              <div className="latest-card">
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
                    onClick={(e) => handleReturn(item.BookID, e)}
                  >
                    Return
                  </button>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default BorrowedCard;
