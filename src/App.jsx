import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Selectgenre from './components/Selectgenre';
import Moviepopup from './components/Moviepopup';
import ButtonAddFavorite from './components/AddFavorite';

const credential = import.meta.env.VITE_API_KEY;

export async function fetchData() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + credential
        }
    };
  
    return fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', options)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            return  {result : []};
        });
}

export async function sortFilmByGenre(genreId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + credential 
        }
    };

    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en`;

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

export async function getToken() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + credential
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', options);
    const data = await response.json();
    return data.request_token;
}

export async function requestUserLogin() {
    const token = await getToken();
    if (token) {
        window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173/`;
        console.log(token);
    }else{
        console.err("probleme token" , token)
    }
}

export async function createSession(requestToken) {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + credential
        },
        body: JSON.stringify({ request_token: requestToken })
    };

    try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/session/new', options);
        const data = await response.json();
        if (!response.ok) {
            console.error("Erreur lors de la création de la session :", data);
            return null;
        }
        const sessionId = data.session_id;

        if (sessionId) {
            // console.log("Session créée : ", sessionId);
            
            const accountResponse = await fetch(`https://api.themoviedb.org/3/account?session_id=${sessionId}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + credential
                }
            });

            const accountData = await accountResponse.json();
            // console.log("Account ID récupéré : ", accountData.id);

            return { sessionId, accountId: accountData.id };
        }

    } catch (error) {
        console.error("Erreur lors de la création de la session :", error);
    }

    return null;
}

function App() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState(null);
    const [search, setSearch] = useState('');
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
                console.log(token);
                createSession(token).then((session) => {
                    if (session) {
                        localStorage.setItem("sessionId", session.sessionId);
                        localStorage.setItem("accountId", session.accountId);
                        localStorage.setItem("requestToken", token)
                        
                        setSessionId(session.sessionId);
                        setAccountId(session.accountId);
                    }
                });
            }else{
                console.log(token);
            }
        }, []);   

    const changeGenre = (value) => {
        setGenre(value)
    }

    const changeSearch = (value) => {
        setSearch(value)
    }

    const openPopup = (movie) => {
        setSelectedMovie(movie);
    };

    const closePopup = () => {
        setSelectedMovie(null);
    };


    useEffect(() => {
        if (genre) {
            sortFilmByGenre(genre).then((dataMovies) => {
                setMovies(dataMovies.results);
                console.log('Films trouvés par genre ', dataMovies.results);
            });
        }else if(search.trim().length > 0){
            searchMoviebyTitle(search).then((dataMovies) => {
                console.log('Films trouvés par recherche', dataMovies.results);
                setMovies(dataMovies.results);
            });
        }
        else{
            fetchData().then((dataMovies) =>{
                setMovies(dataMovies.results)
                console.log('Films par défaut ', movies);
                } 
            );
        }
    }, [genre, search]);

    console.log(movies);
    return (
        <>
        <Header />
        <h2>Recherche pour : {search}</h2>
        <Searchbar onSearchChange={changeSearch}/>
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