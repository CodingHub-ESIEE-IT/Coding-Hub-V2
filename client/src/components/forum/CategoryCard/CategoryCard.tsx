'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '../../../../public/images/javascript.svg';

const CategoryCard = () => {
  return (
    <CardContainer>
      <Header>
        <CardLogoContainer>
          <CardLogo src={logo} alt={'Javascript'} />
        </CardLogoContainer>
        <Title>JavaScript</Title>
      </Header>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, atque
        deleniti, dolorem eos eveniet exercitationem fugiat
      </Description>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background-color: #2f314f;
  border-radius: 8px;
  border: 1px solid #606060;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  color: #e4e4e4;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #aaaaaa;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
`;

const CardLogoContainer = styled.div`
    background-color: #22233a;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.8rem;
`;

const CardLogo = styled(Image)`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 5px;
`;

export default CategoryCard;
