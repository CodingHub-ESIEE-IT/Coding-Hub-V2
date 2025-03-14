'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Footer = () => {
  return (
      <FooterContainer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>Forum Dev</FooterTitle>
            <FooterText>
              Une communauté de développeurs passionnés pour partager des connaissances,
              résoudre des problèmes et s&apos;entraider.
            </FooterText>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Liens utiles</FooterTitle>
            <FooterLinks>
              <FooterLink href="/forum">Forum</FooterLink>
              <FooterLink href="/categories">Catégories</FooterLink>
              <FooterLink href="/membres">Membres</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Contact</FooterTitle>
            <FooterLinks>
              <FooterLink href="/contact">Nous contacter</FooterLink>
              <FooterLink href="/about">À propos</FooterLink>
              <FooterLink href="/terms">Conditions d&apos;utilisation</FooterLink>
              <FooterLink href="/privacy">Politique de confidentialité</FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>© {new Date().getFullYear()} Coding Hub. Tous droits réservés.</Copyright>
        </FooterBottom>
      </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #22233a;
  color: #e4e4e4;
  padding: 3rem 3rem 1.5rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: #ffffff;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #aaaaaa;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled(Link)`
  color: #aaaaaa;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #3a3b56;
  padding-top: 1.5rem;
  text-align: center;
`;

const Copyright = styled.p`
  font-size: 0.85rem;
  color: #888888;
`;

export default Footer;
