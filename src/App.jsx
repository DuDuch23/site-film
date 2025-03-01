import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Selectgenre from './components/Selectgenre';
import Moviepopup from './components/Moviepopup';
import ButtonAddFavorite from './components/AddFavorite';
import { fetchData, sortFilmByGenre, requestUserLogin, createSession, getFavoriteMovies } from './components/Fetch';

function App() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState(null)
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId"));
    const [accountId, setAccountId] = useState(localStorage.getItem("accountId"));

    const handleLogin = async () => {
        await requestUserLogin();
    };

    const handleLogout = () => {
        localStorage.removeItem("sessionId");
        localStorage.removeItem("accountId");
        setSessionId(null);
        setAccountId(null);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("request_token");
    
        if (token) {
            createSession(token).then((session) => {
                if (session) {
                    localStorage.setItem("sessionId", session.sessionId);
                    localStorage.setItem("accountId", session.accountId);
                    
                    setSessionId(session.sessionId);
                    setAccountId(session.accountId);
    
                    window.history.replaceState({}, document.title, "/");
                }
            });
        }
    }, []);

    const changeGenre = (value) => {
        setGenre(value)
    }

    const openPopup = (movie) => {
        setSelectedMovie(movie);
    };

    const closePopup = () => {
        setSelectedMovie(null);
    };

    useEffect(() => {
        fetchData().then((dataMovies) => {
            setMovies(dataMovies.results);
            console.log('Films ',dataMovies.results);
        });
    }, []);

    useEffect(() => {
        if (genre) {
            sortFilmByGenre(genre).then((dataMovies) => {
                setMovies(dataMovies.results);
            });
        }else{
            fetchData().then((dataMovies) => setMovies(dataMovies.results));
        }
    }, [genre]);

    
    return (
        <>
        <Header />
        <Searchbar />
        <Selectgenre onGenreChange={changeGenre}/>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Films du moment</h1>
            {sessionId ? (
                <button onClick={handleLogout}>Se déconnecter</button>
            ) : (
                <button onClick={handleLogin}>Se connecter</button>
            )}
        </div>
        <ul className='films-container'>
            {movies.map((movie) => (
            <li key={movie.id}>
                {!sessionId && !accountId ? (
                    ""
                ) : (
                    <ButtonAddFavorite movie={movie} sessionId={sessionId} accountId={accountId}/>      
                )}
                <button onClick={() => openPopup(movie)}>
                    <p>{movie.title}</p>
                    <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: '200px', borderRadius: '8px' }}
                    />
                </button>
            </li>
            ))}
        </ul>
        {selectedMovie && <Moviepopup movie={selectedMovie} onClose={closePopup} />}
        </>
    );
}

export default App;