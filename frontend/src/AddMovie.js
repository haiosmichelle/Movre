import React, { useState } from "react";

export default function AddMovie({ onAddMovie }) {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [release_year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [raiting, setRating] = useState("");

  const handleFileChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("release_year", release_year);
    formData.append("description", description);
    formData.append("picture", poster);
    formData.append("type", type);
    formData.append("runtime", duration);
    formData.append("raiting", raiting);

    try {
      // const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/admin/add-movie", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        //onAddMovie(data); // Notify parent component about the new movie
        setShowPopup(false); // Close the popup on successful addition
      } else {
        console.error("Failed to add movie");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div>
      <button
        className="btn-add"
        style={{ marginTop: "5px" }}
        onClick={() => setShowPopup(true)}
      >
        Add Movie
      </button>

      {showPopup && (
        <div style={popupStyle}>
          <div style={overlayStyle} onClick={() => setShowPopup(false)} />
          <div style={popupInnerStyle}>
            <h2>Add New Movie</h2>
            <form onSubmit={handleAddMovie}>
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Year:
                  <input
                    type="number"
                    value={release_year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Description:
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Poster:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Type:
                  <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Duration (minutes):
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Rating:
                  <input
                    type="number"
                    step="0.1"
                    value={raiting}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  />
                </label>
              </div>
              <button type="submit" style={{ marginTop: "5px" }}>
                Add Movie
              </button>
              <button
                type="button"
                style={{ marginTop: "5px" }}
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
};

const popupInnerStyle = {
  position: "relative",
  padding: "20px",
  background: "white",
  borderRadius: "10px",
  zIndex: 1001,
};
