import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { fetchData } from './components/Fetch';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      setMovies(data.results); // Stocke les films récupérés dans le state
    });
  }, []);

  return (
    <>
      <Header />
      <h1>Films du moment</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;