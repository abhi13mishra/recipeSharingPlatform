// src/pages/EditRecipe.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const EditRecipe = () => {
  const { id } = useParams(); // recipeId from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          console.log("No such recipe!");
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "recipes", id);
      await updateDoc(docRef, {
        ...formData,
      });
      navigate("/my-recipes"); // Go back to my recipes after update
    } catch (err) {
      console.error("Error updating recipe:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients"
          required
        ></textarea>
        <br />
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Instructions"
          required
        ></textarea>
        <br />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;