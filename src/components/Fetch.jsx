import { useState, useEffect, useCallback } from 'react'
const credential = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjU1MGJhZDNkZjdmNTUzMmY0Y2ZkMTRiMjUwNzIyOCIsIm5iZiI6MTczODc2OTg5OS4yNTMsInN1YiI6IjY3YTM4NWViYWVlZTVjMGUyNTlmZTYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dim49pFAUacYuIBFyGOSQQTwCoFbDLyZOCO-_tVBCMg";

export async function fetchData() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjU1MGJhZDNkZjdmNTUzMmY0Y2ZkMTRiMjUwNzIyOCIsIm5iZiI6MTczODc2OTg5OS4yNTMsInN1YiI6IjY3YTM4NWViYWVlZTVjMGUyNTlmZTYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dim49pFAUacYuIBFyGOSQQTwCoFbDLyZOCO-_tVBCMg'
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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjU1MGJhZDNkZjdmNTUzMmY0Y2ZkMTRiMjUwNzIyOCIsIm5iZiI6MTczODc2OTg5OS4yNTMsInN1YiI6IjY3YTM4NWViYWVlZTVjMGUyNTlmZTYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dim49pFAUacYuIBFyGOSQQTwCoFbDLyZOCO-_tVBCMg'
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