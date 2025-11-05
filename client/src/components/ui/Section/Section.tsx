import React from 'react';
import './Section.css';

const Section = ({
     children,
     title,
     sectionWidth = '70%',
     margin = '0',
   }: {
  children: React.ReactNode;
  title: string;
  sectionWidth?: string;
  margin?: string;
}) => {
  return (
      <div
          className="section-container"
          style={{
            width: sectionWidth,
            margin: margin
          }}
      >
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
  );
};

export default Section;
