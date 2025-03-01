const credential = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjU1MGJhZDNkZjdmNTUzMmY0Y2ZkMTRiMjUwNzIyOCIsIm5iZiI6MTczODc2OTg5OS4yNTMsInN1YiI6IjY3YTM4NWViYWVlZTVjMGUyNTlmZTYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dim49pFAUacYuIBFyGOSQQTwCoFbDLyZOCO-_tVBCMg";

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

export async function fetchCategories() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + credential 
        }
    };
        
    try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Erreur lors de la récupération des catégories :", err);
        return { genres: [] };
    }
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