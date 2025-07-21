import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ rating, onRate }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => onRate(currentRating)}
              className="hidden"
            />
            <FaStar
              className={`cursor-pointer transition-colors duration-200 ${
                currentRating <= (hover || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              size={20}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingStars;