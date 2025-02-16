import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import { fetchData, searchMoviebyTitle } from './components/Fetch';

function App() {
  const [movies, setMovies] = useState([]);
  const [moviesFind, setMoviesFind] = useState([]);

    useEffect(() => {
      fetchData().then((data) => {
        setMovies(data.results); // Stocke les films récupérés dans le state
      });
    }, []);

    useEffect(() => {
      searchMoviebyTitle().then((data) => {
        setMovies(data.results); // Stocke les films récupérés dans le state
      });
    }, []);

  return (
    <>
      <Header />
      <Searchbar />
      <h1>Films du moment</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>

      <ul>
        {moviesFind.map((moviesFind) => (
          <li key={moviesFind.id}>{moviesFind.title}</li>
        ))}
      </ul>

    </>
  );
}

export default App;