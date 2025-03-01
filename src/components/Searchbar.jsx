import { useState, useEffect } from "react";
const credential = "moncredential";


export async function searchMoviebyTitle(search) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + credential
        }
    };

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&include_adult=false&language=en-US&page=1`;
    
    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.json();
        })
        .catch((err) => {
            console.error(err);
            return { result: [] };
        });
}

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