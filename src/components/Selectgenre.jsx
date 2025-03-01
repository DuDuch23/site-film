import { useState, useEffect } from "react";
import { fetchCategories } from "./Fetch";

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