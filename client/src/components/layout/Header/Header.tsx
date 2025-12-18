import React from 'react';
import './Header.css';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-left">
        <Image
          src={logo}
          alt={'Coding Hub'}
          className="custom-logo"
        />
        <div className="nav-items">
          <Link href={'/'} className="nav-link">Accueil</Link>
          <Link href={'/forum'} className="nav-link">Forum</Link>
          <Link href={'/projects'} className="nav-link">Projets</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
