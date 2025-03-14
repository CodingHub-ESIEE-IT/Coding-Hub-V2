'use client';
import React from 'react';
import styled from 'styled-components';

const TopicCard = ({ topicSolved = 'false' }: { topicSolved?: string }) => {
  return (
    <CardContainer $solved={topicSolved}>
      {topicSolved === 'true' && (
        <ResolutionBadge>Sujet résolu le 18/02/2024</ResolutionBadge>
      )}
      <Header>
        <LeftHeader>
          <CardLogoContainer />
          <div>
            <Title>Bug d’affichage des erreurs PHP</Title>
            <TextDate>Dernière activité il y a 5 jours</TextDate>
          </div>
        </LeftHeader>
        <CategoryTag>PHP</CategoryTag>
      </Header>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, atque
        deleniti, dolorem eos eveniet exercitationem fugiat
      </Description>
      <CardFooter>
        <CardLeftFooter>
          <Author>Axel Demorest</Author>
          <p>-</p>
          <CreatedDate>Crée le 12/03/2025</CreatedDate>
        </CardLeftFooter>
      </CardFooter>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ $solved: string }>`
  background-color: #2f314f;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.$solved === 'true' ? '#2CAD72' : '#606060')};
  padding: 20px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    transform: translateX(-5px);
  }
`;

const ResolutionBadge = styled.div`
  position: absolute;
  top: -15px;
  right: 140px;
  background-color: #2cad72;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  color: #e4e4e4;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #e4e4e4;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
`;

const CardLogoContainer = styled.div`
  background-color: #22233a;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
`;

const TextDate = styled.p`
  color: #bdbdbd;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Author = styled.span`
  color: #32ca9a;
  font-weight: 700;
  font-size: 0.85rem;
  margin-right: 0.5rem;
`;

const CreatedDate = styled.p`
  color: #bdbdbd;
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

const CardLeftFooter = styled.div`
  display: flex;
  align-items: center;

  p {
    color: #bdbdbd;
  }
`;

const CategoryTag = styled.div`
  background-color: #292b48;
  border: 0.9px solid #606060;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.3rem 1rem;
  border-radius: 5px;
`;

export default TopicCard;
