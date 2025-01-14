// Card.js
import React from 'react';

function Card({ title, count, color, icon }) {
  return (
    <div className={`bg-${color}-100 p-4 rounded-lg shadow-md`}>
      <div className="flex items-center">
        {icon}
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-2xl">{count}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
