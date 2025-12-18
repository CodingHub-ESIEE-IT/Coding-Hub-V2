import React from 'react';
import './home.css';
import Container from "@/components/layout/Container/Container";
import HeroBackground from '../../public/images/hero-technos.png';
import Image from "next/image";
import styles from "@/app/Home.module.css";
import {Copy} from "lucide-react";

const Home = () => {
  return (
      <Container>
        <div className={"home-container"}>
          <section className={"home-hero-section"}>
            <div className={"home-hero-text"}>
              <h1 className={"home-title"}>Coding <span className={'highlight'}>Hub</span></h1>
              <p className={"home-subtitle"}>Le forum étudiant pour connecter les talents tech de l’ESIEE-IT.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10rem', marginTop: '-3.5rem' }}>
              <Image
                  src={HeroBackground}
                  alt="Technologies"
                  className={"home-hero-image"}
              />
              <div
                  className={styles.codeWindow}
              >
                <div className={styles.codeHeader}>
                  <span>coding-hub.js</span>
                  <div className={styles.copyWrapper}>
                    <Copy size={12}/> <span>Copier</span>
                  </div>
                </div>
                <div className={styles.codeBody}>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>1</span>
                    <span><span className={styles.kwd}>def</span> <span
                        className={styles.func}>welcome_to_coding_hub</span>():</span>
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>2</span>
                    <span className={styles.indent}>students = [<span className={styles.str}>"Alice"</span>, <span
                        className={styles.str}>"Bob"</span>]</span>
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>3</span>
                    <span className={styles.indent}>professors = [<span
                        className={styles.str}>"Mr. Smith"</span>]</span>
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>4</span>
                    <span className={styles.indent}><span className={styles.kwd}>for</span> user <span
                        className={styles.kwd}>in</span> students + professors:</span>
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>5</span>
                    <span className={`${styles.indent} ${styles.indent}`}>
                      <span className={styles.num}>print</span>(<span className={styles.func}>f</span><span
                        className={styles.str}>"Bienvenue <span className={styles.func}>{`{user}`}</span>!"</span>)
                    </span>
                  </div>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>6</span>
                    <span className={styles.indent}><span className={styles.kwd}>return</span> <span
                        className={styles.str}>"Prêt à coder ? 🚀"</span></span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
  );
};

export default Home;