import React from 'react';
import styled from 'styled-components';

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
    <SectionContainer $width={sectionWidth} $margin={margin}>
      <Title>{title}</Title>
      {children}
    </SectionContainer>
  );
};

const SectionContainer = styled.div<{ $width: string; $margin: string }>`
  padding: 1.5rem 2rem;
  background: #22233a;
  border-radius: 10px;
  margin: ${({ $margin }) => $margin};
  width: ${({ $width }) => $width};
`;

const Title = styled.h2`
  color: #e4e4e4;
  font-size: 1.05rem;
  font-weight: 600;
`;

export default Section;
