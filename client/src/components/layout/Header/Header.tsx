'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import Link from 'next/link';

const Header = () => {
  return (
    <Container>
      <Left>
        <CustomLogo src={logo} alt={'Coding Hub'} />
        <NavItems>
          <NavLink href={'#'}>Accueil</NavLink>
          <NavLink href={'#'}>Forum</NavLink>
          <NavLink href={'#'}>Ressources</NavLink>
          <NavLink href={'#'}>Messages</NavLink>
        </NavItems>
      </Left>
      <Right>
        <ProfileSVG
          width="25"
          height="25"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.3333 2.66666H10.6667C5.33332 2.66666 2.66666 5.33332 2.66666 10.6667V28C2.66666 28.7333 3.26666 29.3333 3.99999 29.3333H21.3333C26.6667 29.3333 29.3333 26.6667 29.3333 21.3333V10.6667C29.3333 5.33332 26.6667 2.66666 21.3333 2.66666Z"
            stroke="#E4E4E4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.33334 12.6667H22.6667"
            stroke="#E4E4E4"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.33334 19.3333H18.6667"
            stroke="#E4E4E4"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </ProfileSVG>
        <ProfileSVG
          width="25"
          height="25"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 29.3333H20C26.6667 29.3333 29.3334 26.6667 29.3334 20V12C29.3334 5.33332 26.6667 2.66666 20 2.66666H12C5.33335 2.66666 2.66669 5.33332 2.66669 12V20C2.66669 26.6667 5.33335 29.3333 12 29.3333Z"
            stroke="#E4E4E4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.66669 17.3333H7.68002C8.69335 17.3333 9.61335 17.9067 10.0667 18.8133L11.2534 21.2C12 22.6667 13.3334 22.6667 13.6534 22.6667H18.36C19.3734 22.6667 20.2934 22.0933 20.7467 21.1867L21.9334 18.8C22.3867 17.8933 23.3067 17.32 24.32 17.32H29.3067"
            stroke="#E4E4E4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </ProfileSVG>
        <Avatar />
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  background-color: #22233a;
  color: #fff;
  height: 7rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const CustomLogo = styled(Image)`
  width: 4rem;
  height: 4rem;
  border-radius: 10px;
  margin-right: 6rem;
`;

const NavItems = styled.div`
  display: flex;
  gap: 4rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #E4E4E4;
  transition: 0.3s;
  font-size: 1.2rem;
  font-weight: 600;

  &:hover {
    color: #3f69ff;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileSVG = styled.svg`
  cursor: pointer;

  path {
    transition: 0.3s;
  }

  &:hover path {
    stroke: #3f69ff;
    transition: 0.3s;
  }
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #3f69ff;
  border-radius: 50%;
  margin-left: 1rem;
`;

export default Header;
