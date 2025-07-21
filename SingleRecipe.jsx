import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/App.css';

const SingleRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchData = async () => {
    const ref = doc(db, 'recipes', id);
    const snap = await getDoc(ref);
    if (snap.exists()) setRecipe({ id: snap.id, ...snap.data() });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const addFavorite = async () => {
    const ref = doc(db, 'recipes', id);
    await updateDoc(ref, {
      favorites: arrayUnion(user.uid)
    });
    fetchData();
  };

  const removeFavorite = async () => {
    const ref = doc(db, 'recipes', id);
    await updateDoc(ref, {
      favorites: arrayRemove(user.uid)
    });
    fetchData();
  };

  const addComment = async () => {
    const ref = doc(db, 'recipes', id);
    await updateDoc(ref, {
      comments: arrayUnion({ text: comment, user: user.email })
    });
    setComment('');
    fetchData();
  };

  const addRating = async () => {
    const ref = doc(db, 'recipes', id);
    await updateDoc(ref, {
      ratings: arrayUnion({ rating, user: user.uid })
    });
    setRating(0);
    fetchData();
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'recipes', id));
    navigate('/');
  };

  if (!recipe) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>{recipe.title}</h2>
        {recipe.imgUrl && (
          <img src={recipe.imgUrl} alt={recipe.title} style={{ height: '250px', objectFit: 'cover' }} />
        )}
        <p style={{ padding: '10px 0' }}>{recipe.description}</p>

        {user && (
          <button onClick={recipe.favorites?.includes(user.uid) ? removeFavorite : addFavorite}>
            {recipe.favorites?.includes(user.uid) ? 'Remove Favorite' : 'Add to Favorite'}
          </button>
        )}

        <div style={{ marginTop: '20px' }}>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={e => setRating(+e.target.value)}
            placeholder="Rating (1-5)"
          />
          <button onClick={addRating} style={{ marginLeft: '10px' }}>Rate</button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <input
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write comment"
            style={{ width: '70%' }}
          />
          <button onClick={addComment} style={{ marginLeft: '10px' }}>Add Comment</button>
        </div>

        <ul style={{ marginTop: '20px', textAlign: 'left' }}>
          {recipe.comments?.map((c, i) => (
            <li key={i}><strong>{c.user}</strong>: {c.text}</li>
          ))}
        </ul>

        {user?.uid === recipe.userId && (
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: 'red',
              color: 'white',
              marginTop: '20px'
            }}
          >
            Delete Recipe
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleRecipe;
