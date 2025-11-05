import { ReactNode } from 'react';
import './Container.css';
import Footer from '@/components/layout/Footer/Footer';
import Header from "@/components/layout/Header/Header";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
      <div className="page-wrapper">
        <Header />
        <div className="main-content">
          {children}
        </div>
        <Footer />
      </div>
  );
};

export default Container;
