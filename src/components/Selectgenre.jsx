import { useState, useEffect } from "react";
const credential = "moncredential";


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

export default function Selectgenre({onGenreChange}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories().then((dataCategories) => {
            setCategories(dataCategories.genres);
            console.log('Catégories ', dataCategories.genres);
        });
    }, []);

    return (
        <div>
            <select name="select-genre" onChange={(event) => onGenreChange(event.target.value)}>
                <option value="">-- Sélectionnez un genre --</option>
            {
                categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                ))
            }
            </select>
        </div>
    );
}