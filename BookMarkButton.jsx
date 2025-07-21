import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { ref, get, set, remove } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const BookmarkButton = ({ recipeId }) => {
  const [user, setUser] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const bookmarkRef = ref(db, `bookmarks/${currentUser.uid}/${recipeId}`);
        const snapshot = await get(bookmarkRef);
        setBookmarked(snapshot.exists());
      }
    });

    return unsubscribe;
  }, [recipeId]);

  const handleBookmark = async () => {
    if (!user) return;

    const bookmarkRef = ref(db, `bookmarks/${user.uid}/${recipeId}`);

    if (bookmarked) {
      await remove(bookmarkRef);
      setBookmarked(false);
    } else {
      await set(bookmarkRef, true);
      setBookmarked(true);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className={`px-3 py-1 rounded text-sm ${
        bookmarked ? 'bg-yellow-500 text-white' : 'bg-gray-200'
      }`}
    >
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
};

export default BookmarkButton;