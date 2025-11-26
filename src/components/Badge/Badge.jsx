import React from 'react';
import './Badge.scss';

const Badge = ({ status }) => {
  // Convert text like "Expiring Soon" -> "expiring-soon" for the CSS class
  const variant = status.toLowerCase().replace(/\s+/g, '-');

  return (
    <span 
      className={`
        app-badge 
        app-badge--${variant}
        flex items-center justify-center 
      `}
    >
      {status}
    </span>
  );
};

export default Badge;