import { useEffect } from 'react'
const credential = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjU1MGJhZDNkZjdmNTUzMmY0Y2ZkMTRiMjUwNzIyOCIsIm5iZiI6MTczODc2OTg5OS4yNTMsInN1YiI6IjY3YTM4NWViYWVlZTVjMGUyNTlmZTYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dim49pFAUacYuIBFyGOSQQTwCoFbDLyZOCO-_tVBCMg";

export function fetchData() {
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

export function searchMoviebyTitle(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjU1MGJhZDNkZjdmNTUzMmY0Y2ZkMTRiMjUwNzIyOCIsIm5iZiI6MTczODc2OTg5OS4yNTMsInN1YiI6IjY3YTM4NWViYWVlZTVjMGUyNTlmZTYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dim49pFAUacYuIBFyGOSQQTwCoFbDLyZOCO-_tVBCMg'
        }
    };
      
    return fetch('https://api.themoviedb.org/3/search/movie?query=sonic&include_adult=false&language=en-US&page=1', options)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            return  {result : []};
        });
}