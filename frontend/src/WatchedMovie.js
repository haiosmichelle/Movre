export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.imageUrl} alt={`Poster of ${movie.name} movie`} />
      <h3>{movie.name}</h3>
      <div>
        <p>
          <span>🌟</span>
          <span>{movie.raiting}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
