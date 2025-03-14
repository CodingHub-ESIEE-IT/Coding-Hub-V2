'use client';
import Header from '@/components/layout/Header/Header';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Footer from '@/components/layout/Footer/Footer';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <PageWrapper>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
`;

export default Container;
