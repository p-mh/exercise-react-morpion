import React from 'react';

import './cell.css';

export default function Cell({ onClick, value, win }) {
  return (
    <div
      className="cell"
      onClick={onClick}
      style={win ? { backgroundColor: '#e3bc24' } : null}
    >
      {value === 'o' && <i className="fas fa-circle" />}
      {value === 'x' && <i className="fas fa-times" />}
    </div>
  );
}
