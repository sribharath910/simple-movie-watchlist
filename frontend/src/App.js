import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get('http://localhost:5000/movies');
    setMovies(res.data);
  };

  const addMovie = async () => {
    if (!title || !year) return alert("Please enter both title and year.");
    await axios.post('http://localhost:5000/movies', { title, year });
    setTitle('');
    setYear('');
    fetchMovies();
  };

  const toggleWatched = async (id) => {
    await axios.patch(`http://localhost:5000/movies/${id}`);
    fetchMovies();
  };

  const deleteMovie = async (id) => {
    await axios.delete(`http://localhost:5000/movies/${id}`);
    fetchMovies();
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'container dark' : 'container light'}>
      <div className="headerRow">
        <h1 className="header">🎬 Movie Watchlist</h1>
        <button onClick={handleThemeToggle} className="themeToggle">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="input"
        />
        <button onClick={addMovie} className="addButton">➕ Add</button>
      </div>

      <ul className="movieList">
        {movies.map((movie) => (
          <li key={movie._id} className="movieCard">
            <div className="movieInfo">
              <span className="title">{movie.title}</span> ({movie.year})<br />
              Status: {movie.watched ? "✅ Watched" : "❌ Not Watched"}
            </div>
            <div>
              <button onClick={() => toggleWatched(movie._id)} className="button">
                {movie.watched ? "👁 Mark Unwatched" : "✅ Mark Watched"}
              </button>
              <button onClick={() => deleteMovie(movie._id)} className="deleteButton">
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
