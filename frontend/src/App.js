import { useEffect, useRef, useState } from "react";
import { useKey } from "./useKey";
import WatchedSummary from "./WatchedSummary";
import MovieDetails from "./MovieDetails";
import WatchedMoviesList from "./WatchedMovieList";
import MovieList from "./MovieList"; // Import the MovieList component
import Login from "./Login";
import AdminLogin from "./AdminLogin";
import AddMovie from "./AddMovie";

const tempMovieData = [];

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [movies, setMovies] = useState(tempMovieData); // Ensure movies is initialized as an array
  const [filteredMovies, setFilteredMovies] = useState([]); // Stare pentru filmele filtrate
  const [watched, setWatched] = useState([]); // Initializat ca un array gol
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false); // New state for admin login status

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem("token");
      console.log(token); // Retrieve token from localStorage

      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/movies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        console.log(data.data);
        setMovies(Array.isArray(data.data) ? data.data : []); // Ensure data is set to an array
        setFilteredMovies(Array.isArray(data.data) ? data.data : []); // Initialize filteredMovies
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error fetching movies: " + error.message);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // You might want to verify the token here with an API call to ensure it's valid
      setIsLoggedIn(true);
      // If you have a way to determine if the token belongs to an admin, you can set that here as well
    }
  }, []);

  useEffect(() => {
    const fetchWatched = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:8080/user/watchList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        console.log(data);
        setWatched(Array.isArray(data.data) ? data.data : []); // Ensure data is set to an array
        console.log(data);
      } catch (error) {
        setError("Error fetching watched movies: " + error.message);
      }
    };

    if (isLoggedIn) {
      fetchWatched();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, movies]);

  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  const updateLogin = (status, admin = false) => {
    setIsLoggedIn(status);
    setAdmin(admin);
  };

  const handleAddMovie = (newMovie) => {
    setMovies((movies) => [...movies, newMovie]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setAdmin(false);
  };

  return (
    <>
      {!isLoggedIn && (
        <>
          <Login updateLogin={updateLogin} />
          <AdminLogin updateLogin={updateLogin} />
        </>
      )}
      {isLoggedIn && (
        <>
          <NavBar>
            <Search query={query} setQuery={setQuery} />
            <NumResults movies={filteredMovies} />
          </NavBar>
          <button className="btn-add" onClick={handleLogout}>
            Logout
          </button>
          {isAdmin && <AddMovie onAddMovie={handleAddMovie} />}
          <Main>
            <Box>
              {isLoading && <Loader />}
              {!isLoading && !error && (
                <MovieList
                  movies={filteredMovies}
                  onSelectMovie={handleSelectMovie}
                />
              )}
              {error && <ErrorMessage message={error} />}
            </Box>

            <Box>
              {selectedId ? (
                <MovieDetails
                  selectedId={selectedId}
                  onCloseMovie={handleCloseMovie}
                  onAddWatched={handleAddWatched}
                  watched={watched}
                />
              ) : (
                <>
                  <WatchedSummary watched={watched} />
                  <WatchedMoviesList
                    watched={watched}
                    onDeleteWatched={handleDeleteWatched}
                  />
                </>
              )}
            </Box>
          </Main>
        </>
      )}
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>Movre</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}
