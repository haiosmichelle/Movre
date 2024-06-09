import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import ReviewList from "./ReviewList";
import AddReview from "./AddReview";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Stare pentru încărcare

  useEffect(() => {
    if (!selectedId) return; // Nu prelua date dacă nu există `selectedId`

    const fetchMovieDetails = async () => {
      console.log(selectedId);
      const token = localStorage.getItem("token");
      setIsLoading(true); // Începem încărcarea
      try {
        const res = await fetch(`http://localhost:8080/movies/${selectedId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("am intrat ", data);
        setMovie(data.data || {}); // Actualizăm starea cu datele filmului
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false); // Încheiem încărcarea
      }
    };

    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (movie.name) {
      document.title = `Movie | ${movie.name}`;
    }
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie.name]);

  const handleAddReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const isWatched = watched.map((movie) => movie.id).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.id === selectedId
  )?.userRating;

  const handleAdd = async () => {
    const token = localStorage.getItem("token");

    try {
      const ratingResponse = await fetch(
        `http://localhost:8080/movies/${selectedId}/rating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ star: userRating }),
        }
      );

      if (!ratingResponse.ok) {
        throw new Error("Network response was not ok for rating");
      }

      const watchListResponse = await fetch(
        `http://localhost:8080/movies/${selectedId}/watchList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!watchListResponse.ok) {
        throw new Error("Network response was not ok for watch list");
      }

      onCloseMovie();
    } catch (error) {
      console.error("Error adding rating or watch list:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="details">
        <header>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
          {movie.imageUrl && (
            <img src={movie.imageUrl} alt={`Poster of ${movie.name}`} />
          )}
          <div className="details-overview">
            <h2>{movie.name}</h2>
            <p>
              {movie.release_year} &bull; {movie.runtime}
            </p>
            <p>
              <span>⭐️</span>
              {movie.raiting} Rating
            </p>
            <p>{movie.type}</p>
            <p>
              <em>{movie.description}</em>
            </p>
          </div>
        </header>

        <section>
          <div className="rating">
            {!isWatched ? (
              <>
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                )}
              </>
            ) : (
              <p>
                You rated this movie {watchedUserRating} <span>⭐️</span>
              </p>
            )}
          </div>
        </section>
      </div>
      <AddReview movieId={selectedId} onAddReview={handleAddReview} />
      <ReviewList movieId={selectedId} reviews={reviews} />
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
