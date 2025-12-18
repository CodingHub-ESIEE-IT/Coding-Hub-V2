"use client";

import Container from "@/components/layout/Container/Container";
import styles from "./Home.module.css";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import HeroBackground from '../../public/images/hero-technos.png';
import { FaPython, FaHtml5, FaReact, FaJs, FaCss3Alt, FaVuejs } from "react-icons/fa";
import Image from "next/image";
import React from "react";

const TechIcon = ({ icon: Icon, color, style, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        // Animation de flottement continu
        whileHover={{ scale: 1.1 }}
        transition={{
          delay: delay,
          duration: 0.5,
          type: "spring"
        }}
        className={styles.techIcon}
        style={{ color: color, ...style }}
    >
      <Icon />
    </motion.div>
);

export default function Home() {
  return (
      <Container>
        <div className={styles.container}>

          {/* --- SECTION 1: HERO --- */}
          <section className={styles.mainWrapper}>
            <div className={styles.heroSection}>

              {/* Colonne Gauche */}
              <div className={styles.textColumn}>
                <motion.h1
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className={styles.title}
                >
                  Coding <span className={styles.highlight}>Hub</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className={styles.subtitle}
                >
                  Le forum étudiant pour connecter les talents tech de l’ESIEE-IT.
                </motion.p>

                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={styles.featuresList}
                >
                  {[
                    "Accès complet gratuit aux élèves",
                    "Accès aux ressources rapidement"
                  ].map((item, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <div className={styles.checkIconWrapper}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                        {item}
                      </li>
                  ))}
                </motion.ul>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.ctaButton}
                >
                  Découvrir le forum
                </motion.button>
              </div>

              {/* Colonne Droite */}
              <div className={styles.visualColumn}>

                <Image className={styles.heroBackground} src={HeroBackground} alt={'Coding Hub'} />

                {/* Fenêtre de Code */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className={styles.codeWindow}
                >
                  <div className={styles.codeHeader}>
                    <span>coding-hub.js</span>
                    <div className={styles.copyWrapper}>
                      <Copy size={12} /> <span>Copier</span>
                    </div>
                  </div>

                  <div className={styles.codeBody}>
                    <div className={styles.codeLine}>
                      <span className={styles.lineNumber}>1</span>
                      <span><span className={styles.kwd}>def</span> <span className={styles.func}>welcome_to_coding_hub</span>():</span>
                    </div>
                    <div className={styles.codeLine}>
                      <span className={styles.lineNumber}>2</span>
                      <span className={styles.indent}>students = [<span className={styles.str}>"Alice"</span>, <span className={styles.str}>"Bob"</span>]</span>
                    </div>
                    <div className={styles.codeLine}>
                      <span className={styles.lineNumber}>3</span>
                      <span className={styles.indent}>professors = [<span className={styles.str}>"Mr. Smith"</span>]</span>
                    </div>
                    <div className={styles.codeLine}>
                      <span className={styles.lineNumber}>4</span>
                      <span className={styles.indent}><span className={styles.kwd}>for</span> user <span className={styles.kwd}>in</span> students + professors:</span>
                    </div>
                    <div className={styles.codeLine}>
                      <span className={styles.lineNumber}>5</span>
                      <span className={`${styles.indent} ${styles.indent}`}>
                      <span className={styles.num}>print</span>(<span className={styles.func}>f</span><span className={styles.str}>"Bienvenue <span className={styles.func}>{`{user}`}</span>!"</span>)
                    </span>
                    </div>
                    <div className={styles.codeLine}>
                      <span className={styles.lineNumber}>6</span>
                      <span className={styles.indent}><span className={styles.kwd}>return</span> <span className={styles.str}>"Prêt à coder ? 🚀"</span></span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* --- SECTION 2: FONCTIONNALITÉS --- */}
          <section className={styles.mainWrapper} style={{ paddingBottom: '6rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={styles.sectionTitle}
            >
              Pourquoi nous ?
            </motion.div>

            <div className={styles.cardsGrid}>
              {[1, 2, 3].map((i) => (
                  <motion.div
                      key={i}
                      whileHover={{ y: -10 }}
                      className={styles.card}
                  >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Feature {i}</h3>
                    <p style={{ color: '#94a3b8' }}>
                      Description de la fonctionnalité. Ce contenu est facilement modifiable.
                    </p>
                  </motion.div>
              ))}
            </div>
          </section>

          {/* --- SECTION 3: CTA --- */}
          <section className={styles.ctaSection}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
            >
              <h2 className={styles.ctaTitle}>Prêt à coder ?</h2>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className={styles.ctaButton} style={{ backgroundColor: 'white', color: '#131426' }}>
                  Créer un compte
                </button>
                <button className={styles.ctaButton} style={{ background: 'transparent', border: '1px solid white' }}>
                  En savoir plus
                </button>
              </div>
            </motion.div>
          </section>

        </div>
      </Container>
  );
}