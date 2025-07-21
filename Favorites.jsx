import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      const snapshot = await getDocs(collection(db, 'recipes'));
      const favs = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(r => r.favorites?.includes(user.uid));
      setRecipes(favs);
    };
    if (user) fetchFavorites();
  }, [user]);

  return (
    <div className="container">
      <h2>Your Favorite Recipes</h2>
      {recipes.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div className="grid">
          {recipes.map(r => (
            <div className="card" key={r.id}>
              <Link to={`/recipe/${r.id}`}>
                {r.imgUrl ? (
                  <img src={r.imgUrl} alt={r.title} />
                ) : (
                  <p>No image</p>
                )}
                <h3>{r.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
