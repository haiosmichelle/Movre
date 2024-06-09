export default function WatchedSummary({ watched }) {
  const avgUserRating =
    watched.length > 0
      ? watched.reduce((acc, movie) => acc + movie.raiting, 0) / watched.length
      : 0;
  const avgRuntime =
    watched.length > 0
      ? watched.reduce((acc, movie) => acc + movie.runtime, 0) / watched.length
      : 0;

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
