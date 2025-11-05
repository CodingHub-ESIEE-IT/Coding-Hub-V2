'use client'

import React, { useEffect, useState } from 'react';
import './Footer.css';
import Link from 'next/link';

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Forum Dev</h3>
            <p className="footer-text">
              Une communauté de développeurs passionnés pour partager des connaissances,
              résoudre des problèmes et s&apos;entraider.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Liens utiles</h3>
            <div className="footer-links">
              <Link href="/forum" className="footer-link">Forum</Link>
              <Link href="/categories" className="footer-link">Catégories</Link>
              <Link href="/membres" className="footer-link">Membres</Link>
              <Link href="/faq" className="footer-link">FAQ</Link>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <div className="footer-links">
              <Link href="/contact" className="footer-link">Nous contacter</Link>
              <Link href="/about" className="footer-link">À propos</Link>
              <Link href="/terms" className="footer-link">Conditions d&apos;utilisation</Link>
              <Link href="/privacy" className="footer-link">Politique de confidentialité</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {year !== null ? year : ''} Coding Hub. Tous droits réservés.
          </p>
        </div>
      </footer>
  );
};

export default Footer;
