'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, Code, Users, Zap, ArrowRight, Terminal, Server, Cpu, Database } from 'lucide-react';
import Link from 'next/link';

interface User {
    username: string;
    role: string;
    avatarUrl: string | null;
}

interface LandingPageProps {
    latestUsers: User[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function LandingPage({ latestUsers }: LandingPageProps) {
    // On prend seulement les 4 premiers pour l'affichage statique
    const displayedUsers = latestUsers.slice(0, 4);

    return (
        <div className="home-container">
            {/* BACKGROUND SHAPES (RELIEF) */}
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>

            {/* HERO SECTION */}
            <section className="home-hero-section">
                <motion.div
                    className="home-hero-text"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="badge-new">
                        <Terminal size={14} /> Nouveau Forum 2024
                    </div>
                    <motion.h1 className="home-title" variants={itemVariants}>
                        Coding <span className="highlight">Hub</span>
                    </motion.h1>
                    <motion.p className="home-subtitle" variants={itemVariants}>
                        Le point de rencontre des talents tech de l’ESIEE-IT.
                        Codez, partagez et évoluez ensemble dans un écosystème fait pour vous.
                    </motion.p>

                    <motion.ul className="featuresList" variants={itemVariants}>
                        {[
                            'Accès 100% Gratuit',
                            'Ressources & Entraide',
                            'Mentorat Étudiant'
                        ].map((item, idx) => (
                            <li key={idx} className="featureItem">
                                <div className="checkIconWrapper">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </motion.ul>

                    <motion.div variants={itemVariants} className="hero-cta-group">
                        <Link href="/projects" className="ctaButton primary">
                            Rejoindre le hub <ArrowRight size={18} />
                        </Link>
                        <Link href="/about" className="ctaButton secondary">
                            En savoir plus
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="home-hero-visuals"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="code-visuals-container">
                        {/* Background Code Card (Python) */}
                        <motion.div
                            className="code-card card-back"
                            animate={{ y: [-5, 5] }}
                            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                        >
                            <div className="code-header">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                                <span className="filename">data_analysis.py</span>
                            </div>
                            <div className="code-content">
                                <div className="code-line"><span className="keyword">import</span> pandas <span className="keyword">as</span> pd</div>
                                <div className="code-line"><span className="keyword">import</span> tensorflow <span className="keyword">as</span> tf</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="comment"># Analyze student trends</span></div>
                                <div className="code-line"><span className="var">data</span> = pd.read_csv(<span className="string">"users.csv"</span>)</div>
                                <div className="code-line"><span className="func">print</span>(data.describe())</div>
                            </div>
                        </motion.div>

                        {/* Foreground Code Card (React) */}
                        <motion.div
                            className="code-card card-front"
                            animate={{ y: [5, -5] }}
                            transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                        >
                            <div className="code-header">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                                <span className="filename">App.jsx</span>
                            </div>
                            <div className="code-content">
                                <div className="code-line"><span className="keyword">export default</span> <span className="keyword">function</span> <span className="func">CodingHub</span>() &#123;</div>
                                <div className="code-line indent">  <span className="keyword">const</span> user = <span className="func">useAuth</span>();</div>
                                <div className="code-line"></div>
                                <div className="code-line indent">  <span className="keyword">return</span> (</div>
                                <div className="code-line indent-2">    &lt;<span className="tag">Hero</span> /&gt;</div>
                                <div className="code-line indent-2">    &lt;<span className="tag">Community</span> users=&#123;user&#125; /&gt;</div>
                                <div className="code-line indent">  );</div>
                                <div className="code-line">&#125;</div>
                            </div>
                        </motion.div>

                        {/* Floating Icons */}
                        <div className="floating-icons">
                            <motion.div className="float-icon icon-1" animate={{ y: [-10, 10] }} transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" width={40} /></motion.div>
                            <motion.div className="float-icon icon-2" animate={{ y: [-8, 8] }} transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: 'reverse' }}><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width={40} /></motion.div>
                            <motion.div className="float-icon icon-3" animate={{ y: [-12, 12] }} transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TS" width={40} /></motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* FEATURES SECTION */}
            <section className="about-section">
                <motion.div
                    className="section-header-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Pourquoi <span>Coding Hub</span> ?</h2>
                    <p className="section-subtitle">Une plateforme pensée par des étudiants, pour les étudiants.</p>
                </motion.div>

                <div className="about-grid">
                    <motion.div
                        className="about-card"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-icon"><Code size={28} /></div>
                        <h3 className="card-title">Partage de Code</h3>
                        <p className="card-desc">Snippets, revues de code et debugging collaboratif pour progresser plus vite.</p>
                    </motion.div>

                    <motion.div
                        className="about-card"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="card-icon"><Users size={28} /></div>
                        <h3 className="card-title">Réseau ESIEE-IT</h3>
                        <p className="card-desc">Connectez-vous avec les talents de l'école et formez vos futures équipes.</p>
                    </motion.div>

                    <motion.div
                        className="about-card"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="card-icon"><Zap size={28} /></div>
                        <h3 className="card-title">Boost Carrière</h3>
                        <p className="card-desc">Accédez à des opportunités exclusives et aux conseils des alumni.</p>
                    </motion.div>
                </div>
            </section>

            {/* PRODUCT TEASER SECTION (VPS STYLE) */}
            <section className="product-teaser-section">
                <div className="teaser-content">
                    <p className="overline">PLATFORM</p>
                    <h2 className="teaser-title">Boostez vos projets</h2>
                    <p className="teaser-description">
                        Votre portfolio, votre style.
                        Concevez une page entièrement personnalisée pour présenter vos projets
                        et faire briller votre talent de développeur.
                    </p>
                    <Link href="/projects" className="ctaButton primary">
                        Créer un portfolio <ArrowRight size={16} />
                    </Link>

                    <div className="teaser-links">
                        <Link href="#" className="teaser-link">Explorez les projets de tous les étudiants.</Link>
                    </div>
                </div>

                <div className="teaser-visual">
                    <div className="portfolio-preview-card">
                        {/* Fake Browser/App Header */}
                        <div className="preview-window-header">
                            <div className="window-dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="window-bar">user-portfolio.codinghub.com</div>
                        </div>

                        {/* Portfolio Content */}
                        <div className="preview-content">
                            <div className="preview-banner"></div>
                            <div className="preview-profile-info">
                                <div className="preview-avatar"></div>
                                <div className="preview-text">
                                    <div className="preview-line title"></div>
                                    <div className="preview-line subtitle"></div>
                                </div>
                            </div>
                            <div className="preview-grid">
                                <div className="preview-item"></div>
                                <div className="preview-item"></div>
                                <div className="preview-item"></div>
                            </div>
                        </div>

                        {/* Floating Customization UI */}
                        <motion.div
                            className="floating-palette"
                            animate={{ y: [-5, 5] }}
                            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        >
                            <div className="palette-label">Theme</div>
                            <div className="palette-colors">
                                <div className="p-color c1"></div>
                                <div className="p-color c2"></div>
                                <div className="p-color c3"></div>
                            </div>
                        </motion.div>

                        {/* Background Decorative Element */}
                        <div className="dash-bg-element element-1"><Code size={100} strokeWidth={1} style={{ opacity: 0.1 }} /></div>
                    </div>
                </div>
            </section>
        </div>
    );
}