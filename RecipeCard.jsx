import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const { id, title, imgUrl, tags, createdBy } = recipe;

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105">
      <Link to={`/recipes/${id}`}>
        <img
          src={imgUrl || 'https://via.placeholder.com/300x200'}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
          <p className="text-sm text-gray-500 mb-2">By: {createdBy || 'Anonymous'}</p>
          <div className="flex flex-wrap gap-1">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;