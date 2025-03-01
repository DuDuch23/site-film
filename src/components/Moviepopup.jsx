export default function Moviepopup({ movie, onClose }) {
    if (!movie) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2>{movie.title}</h2>
                <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '200px', borderRadius: '8px' }} />
                <p>{movie.overview}</p>
                <p><strong>Note :</strong> {movie.vote_average}</p>
                <p><strong>Date de sortie :</strong> {movie.release_date}</p>
                <button onClick={onClose}>Fermer</button>
            </div>
        </div>
    );
}