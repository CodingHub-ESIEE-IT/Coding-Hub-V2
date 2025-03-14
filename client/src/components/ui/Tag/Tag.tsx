import React from 'react';
import styled from "styled-components";

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
      <CustomTag>
        {children}
      </CustomTag>
  );
};

const CustomTag = styled.div`
  background-color: #292b48;
  border-radius: 6px;
  border: 1px solid #606060;
  padding: 0.4rem 0.8rem;
  color: #e4e4e4;
  font-size: 0.8rem;
  display: inline-block;
`;

export default Tag;