export default function Searchbar({onSearchChange}) {
    return (
        <div>
            <input
                type="text"
                name="searchbar"
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Rechercher un film..."
            />
        </div>
    );
}