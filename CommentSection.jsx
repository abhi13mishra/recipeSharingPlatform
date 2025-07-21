import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  ref,
  push,
  onValue,
  off,
  serverTimestamp,
} from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const CommentSection = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const commentRef = ref(db, `comments/${recipeId}`);
    onValue(commentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedComments = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setComments(parsedComments);
      } else {
        setComments([]);
      }
    });

    return () => {
      authUnsub();
      off(commentRef);
    };
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !user) return;

    const commentRef = ref(db, `comments/${recipeId}`);
    await push(commentRef, {
      text,
      author: user.email,
      timestamp: serverTimestamp(),
    });
    setText('');
  };

  return (
    <div className="mt-6 p-4 border-t">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full border p-2 rounded"
          rows="2"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
        >
          Post
        </button>
      </form>

      <div className="space-y-2">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border p-2 rounded bg-gray-50"
          >
            <div className="text-sm text-gray-600 mb-1">
              {comment.author}
            </div>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;