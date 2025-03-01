import { useState, useEffect } from "react";
import { searchMoviebyTitle } from "./Fetch";

export default function Searchbar() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (search.trim().length > 0) {
            searchMoviebyTitle(search).then((data) => {
                setResults(data.results || []);
                console.log('Films trouvés ', data.results);
            });
        } else {
            setResults([]); // Efface les résultats si la barre est vide
        }
    }, [search]);

    return (
        <div>
            <h2>Recherche pour : {search}</h2>
            <input
                type="text"
                value={search}
                name="searchbar"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un film..."
            />
            <ul className='films-container'>
                {results.map((result) => (
                <li key={result.id}>
                    <button onClick={() => openPopup(movie)}>
                        <p>{result.title}</p>
                        <p>{result.release_date}</p>
                        <img
                        src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                        alt={result.title}
                        style={{ width: '200px', borderRadius: '8px' }}
                        />
                        <p>{result.genre_ids}</p>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}