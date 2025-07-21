import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "recipes"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
    });
    return () => unsub();
  }, []);

  return (
    <div className="container">
      <h2>All Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ddd" }}>
          <h3>{recipe.title}</h3>
          <img src={recipe.imageURL} alt="" width="200" />
          <p>{recipe.description.slice(0, 100)}...</p>
          <Link to={`/recipe/${recipe.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;