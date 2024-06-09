export default function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.id)}>
      <img src={movie.imageUrl} alt={`${movie.name} poster`} />
      <h3>{movie.name}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.release_year}</span>
        </p>
      </div>
    </li>
  );
}
