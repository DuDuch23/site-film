import {  useState, useEffect } from 'react';
const credential = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjU1MGJhZDNkZjdmNTUzMmY0Y2ZkMTRiMjUwNzIyOCIsIm5iZiI6MTczODc2OTg5OS4yNTMsInN1YiI6IjY3YTM4NWViYWVlZTVjMGUyNTlmZTYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dim49pFAUacYuIBFyGOSQQTwCoFbDLyZOCO-_tVBCMg";

export async function addToFavorite(movieId, sessionId, accountId) {
    console.log("Session ID:", sessionId);
    console.log("Account ID:", accountId);

    if (!sessionId || !accountId) {
        console.error("Erreur : sessionId ou accountId manquant !", sessionId, accountId);
        return;
    }

    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${sessionId}`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer ' + credential 
        },
        body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            favorite: true
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("Réponse TMDb : ", data);
    } catch (error) {
        console.error("Erreur lors de l'ajout en favori :", error);
    }
}

export async function getFavoriteMovies() {
    const accountId = localStorage.getItem("accountId");
    const sessionId = localStorage.getItem("sessionId");

    if (!accountId || !sessionId) {
        console.error("Erreur : accountId ou sessionId manquant dans le localStorage");
        return;
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + credential
        }
    };

    return fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?session_id=${sessionId}`, options)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            return  {result : []};
        });
}

export default function ButtonAddFavorite({ movie, sessionId, accountId }) {
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (!sessionId || !accountId || !movie?.id) return;

        getFavoriteMovies(sessionId, accountId).then((favoriteMovies) => {
            if (favoriteMovies && favoriteMovies.results) {
                const isFavorite = favoriteMovies.results.some((favMovie) => favMovie.id === movie.id);
                setFavorite(isFavorite);
            }
        });
    }, [sessionId, accountId, movie]);

    const handleAddFavorite = () => {
        if (!movie || !movie.id) {
            console.error("Le film est invalide", movie);
            return;
        }
    
        console.log("movie:", movie.id, "sessionId:", sessionId, "accountId:", accountId);
    
        if (sessionId && accountId) {
            addToFavorite(movie.id, sessionId, accountId);
            setFavorite(true);
        } else {
            console.error("Erreur récupération de sessionid ou accountid : sessionId ou accountId est null");
        }
    };

    return (
        <div>
            <button className={`btn-add-favorite ${favorite ? "fill-svg" : ""}`}   onClick={handleAddFavorite}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                        stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </g>
                </svg>
            </button>
        </div>
    );
}