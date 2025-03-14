'use client';
import React from 'react';
import styled from 'styled-components';

interface UserCardProps {
  name: string;
  pseudo: string;
  role: string
}

const UserCard = ({ name, pseudo, role }: UserCardProps) => {
  return (
    <CardContainer>
      <CardLogoContainer />
      <Title>{name}</Title>
      <Pseudo>@{pseudo}</Pseudo>
      <Tag>{role}</Tag>
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
  width: 15rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h3`
  color: #e4e4e4;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Pseudo = styled.p`
  color: #aaaaaa;
  font-size: 0.75rem;
  font-weight: 500;
`;

const CardLogoContainer = styled.div`
  background-color: #22233a;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tag = styled.div`
    border-radius: 3px;
    background-color: #32ca9a;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    margin-top: 0.4rem;
`;

export default UserCard;
