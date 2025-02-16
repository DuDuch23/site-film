import { useState } from "react";
import { searchMoviebyTitle } from "./Fetch";

export default function Form() {
    const [search, setSearch] = useState('');

    const auChangementDuTexte = async (event) => {
        const newSearch = event.target.value;
        setSearch(newSearch); // Met à jour le state
        
        if (newSearch.trim().length > 0) {
            const result = await searchMoviebyTitle(newSearch); // Fait la requête API avec la nouvelle valeur
            console.log(result);
        }
    };

    return (
        <input type="text" value={search} name="searchbar" onInput={auChangementDuTexte} />
    );
}