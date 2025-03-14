'use client';
import React from 'react';
import styled from 'styled-components';
import CategoryCard from '../../components/forum/CategoryCard/CategoryCard';
import UserCard from '../../components/forum/UserCard/UserCard';

const Forum = () => {
  return (
    <Container>
      <Section style={{ marginBottom: '2rem' }}>
        <Title>Liste des catégories</Title>
        <CategoriesList>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </CategoriesList>
      </Section>
      <Section>
        <Title>Derniers inscrits</Title>
        <UsersList>
          <UserCard
            name={'John Doe'}
            pseudo={'johndoe'}
            role={'Développeur'}
          />
          <UserCard
            name={'James Jackson'}
            pseudo={'jamesJK'}
            role={'Étudiant'}
          />
        </UsersList>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem;
`;

const Title = styled.h2`
  color: #e4e4e4;
  font-size: 1.05rem;
  font-weight: 600;
`;

const CategoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-top: 1rem;
`;

const UsersList = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 1rem;
  padding-top: 1rem;
`;

const Section = styled.div`
  padding: 1.5rem 2rem;
  background: #22233a;
  border-radius: 10px;
`;

export default Forum;
