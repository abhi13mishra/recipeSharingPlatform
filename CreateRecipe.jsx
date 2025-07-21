import React, { useState } from "react";
import { db, storage } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../context/AuthContext";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Main Course");
  const [image, setImage] = useState(null);
  const [quillValue, setQuillValue] = useState(""); // rich text content
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in");

    setLoading(true);

    // 🧠 Uniqueness check
    const allRecipesSnap = await getDocs(collection(db, "recipes"));
    const isDuplicate = allRecipesSnap.docs.some(doc =>
      doc.data().title.toLowerCase() === title.toLowerCase()
    );
    if (isDuplicate) {
      alert("Recipe already exists with same title. Try different.");
      setLoading(false);
      return;
    }

    let imageURL = "";
    if (image) {
      const imageRef = ref(storage, `recipes/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      imageURL = await getDownloadURL(imageRef);
    }

    const newRecipe = {
      title,
      category,
      description: quillValue,
      imageURL,
      author: user.email,
      createdAt: Date.now(),
      views: 0,
      likes: 0,
    };

    await addDoc(collection(db, "recipes"), newRecipe);
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Main Course</option>
          <option>Appetizer</option>
          <option>Dessert</option>
          <option>Vegan</option>
          <option>Quick Meal</option>
        </select>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />

        <ReactQuill
          theme="snow"
          value={quillValue}
          onChange={setQuillValue}
          placeholder="Write instructions, ingredients, etc..."
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Publish Recipe"}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;