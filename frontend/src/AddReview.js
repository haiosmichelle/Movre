import React, { useState } from "react";

const AddReview = ({ movieId, onAddReview }) => {
  const [newReview, setNewReview] = useState({ message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddReview = async () => {
    if (newReview.message) {
      const token = localStorage.getItem("token");
      const reviewWithDate = {
        ...newReview,
        post_date: new Date().toISOString(),
      };
      try {
        const response = await fetch(
          `http://localhost:8080/movies/${movieId}/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(reviewWithDate),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        onAddReview(data.review); // Assuming the server response includes the added review
        setNewReview({ message: "" });
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <h3>Add a Review</h3>
      <textarea
        name="message"
        value={newReview.message}
        onChange={handleInputChange}
        placeholder="Write your review here"
        rows="4"
        cols="50"
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleAddReview}>Add Review</button>
    </div>
  );
};

export default AddReview;
