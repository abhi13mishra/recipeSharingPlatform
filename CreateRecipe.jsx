import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateRecipe = () => {
  const [form, setForm] = useState({ title: '', imgUrl: '', description: '' });
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'recipes'), {
      ...form,
      userId: user.uid,
      favorites: [],
      ratings: [],
      comments: []
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Image URL" value={form.imgUrl} onChange={(e) => setForm({ ...form, imgUrl: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateRecipe;