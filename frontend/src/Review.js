import React, { useState } from "react";

const Review = ({ review, movieId }) => {
  const [like, setLike] = useState(review.like);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = async () => {
    if (hasLiked) return;

    const token = localStorage.getItem("token");

    try {
      console.log(review);
      const response = await fetch(
        `http://localhost:8080/movies/${movieId}/reviews/${review.id}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setLike(like + 1);
      setHasLiked(true);
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  return (
    <div className="review">
      <p>
        <strong>User:</strong> {review.userName}
      </p>
      <p>
        <strong>Message:</strong> {review.message}
      </p>
      <p>
        <strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Likes:</strong> {like}
      </p>
      <button onClick={handleLike} disabled={hasLiked}>
        {hasLiked ? "Liked" : "Like"}
      </button>
      <style jsx>{`
        .review {
          border: 1px solid #ccc;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Review;
