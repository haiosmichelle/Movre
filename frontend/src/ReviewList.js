import React, { useEffect, useState } from "react";
import Review from "./Review";

const ReviewList = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      try {
        const response = await fetch(
          `http://localhost:8080/movies/${movieId}/reviews`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in request headers
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized");
          } else {
            throw new Error("Network response was not ok");
          }
        }

        const data = await response.json();
        console.log(data);
        setReviews(data.data || []); // Ensure data is set to an array
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Error fetching reviews: " + error.message);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews available for this movie.</p>;
  }

  const reviewListStyle = {
    marginTop: "20px",
  };

  return (
    <div style={reviewListStyle}>
      {reviews.map((review) => (
        <Review key={review.id} review={review} movieId={movieId} />
      ))}
    </div>
  );
};

export default ReviewList;
