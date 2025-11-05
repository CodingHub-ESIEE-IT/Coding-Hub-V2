import React from 'react';
import './Tag.css';

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="custom-tag">
        {children}
      </div>
  );
};

export default Tag;
