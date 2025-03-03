# Sites de films (API TMDB)

Ce projet utilise l'api TMDB pour obtenir des films, ainsi que des infos de ces derniers, la possibilité de se connecter pour les ajouters en favoris, commenter et mettre une note. Actuellement, 1 Mars 2025, il manque la possibilité de mettre une note et un commentaire

Pour faire fonctionner le projet :

- git clone LIEN_DU_PROJET
- Se placer à la racine du projet et lancé npm install et npm install dotenv
- Créer un .env avec le contenu du .env.example et remplacer API_KEY par votre clé api
- Puis npm run dev pour lancer le projet, il y aura un lien localhost
- Pour créer un nouveau composant, ne pas oublier d'intégrer la variable :
    const credential = import.meta.env.VITE_API_KEY;
