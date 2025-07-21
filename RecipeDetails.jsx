import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRecipe({ id: docSnap.id, ...data });
        setLikeCount(data.likes || 0);
        await updateDoc(docRef, { views: increment(1) }); // 👁 View count++
      }
    };
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const q = query(collection(db, "comments"), where("recipeId", "==", id));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(list);
    });
    return () => unsub();
  }, [id]);

  const handleComment = async () => {
    if (!user) return alert("Login to comment");
    if (!commentText) return;

    await addDoc(collection(db, "comments"), {
      recipeId: id,
      user: user.email,
      text: commentText,
      createdAt: Date.now(),
    });
    setCommentText("");
  };

  const handleLike = async () => {
    const docRef = doc(db, "recipes", id);
    await updateDoc(docRef, { likes: increment(1) });
    setLikeCount((prev) => prev + 1);
  };

  if (!recipe) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <h2>{recipe.title}</h2>
      <p><strong>Category:</strong> {recipe.category}</p>
      <img src={recipe.imageURL} alt="" width="300" />
      <div dangerouslySetInnerHTML={{ __html: recipe.description }} />

      <p>👁 Views: {recipe.views || 0} | ❤️ Likes: {likeCount}</p>
      {user && <button onClick={handleLike}>Like</button>}

      <hr />
      <h3>Comments</h3>
      {user && (
        <>
          <textarea
            rows="3"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleComment}>Post</button>
        </>
      )}
      {!user && <p>Login to comment</p>}
      {comments.map((c) => (
        <div key={c.id} style={{ borderBottom: "1px solid #ccc", marginTop: "1rem" }}>
          <strong>{c.user}</strong>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeDetails;