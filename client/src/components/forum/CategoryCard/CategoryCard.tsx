import React from 'react';
import './CategoryCard.css';
import { Category } from '@/types/category';
import Link from "next/link";
import {
  Code,
  Terminal,
  Database,
  Cpu,
  Globe,
  Smartphone,
  Server,
  Box,
  Hash
} from 'lucide-react';

// Helper to get icon based on category name (case-insensitive partial match)
const getCategoryIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('java') || n.includes('script') || n.includes('react') || n.includes('node')) return <Code size={24} />;
  if (n.includes('data') || n.includes('sql') || n.includes('base')) return <Database size={24} />;
  if (n.includes('devops') || n.includes('server') || n.includes('cloud')) return <Server size={24} />;
  if (n.includes('mobile') || n.includes('android') || n.includes('ios')) return <Smartphone size={24} />;
  if (n.includes('web') || n.includes('html') || n.includes('css')) return <Globe size={24} />;
  if (n.includes('hardware') || n.includes('iot')) return <Cpu size={24} />;
  if (n.includes('api') || n.includes('backend')) return <Terminal size={24} />;
  if (n.includes('design') || n.includes('ux')) return <Box size={24} />;
  return <Hash size={24} />;
};

const getRandomColor = (name: string) => {
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#6366f1'];
  // Consistent color hashing
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

const CategoryCard = ({ category }: { category: Category }) => {
  const icon = getCategoryIcon(category.name); // Corrected function name call
  const accentColor = getRandomColor(category.name);

  return (
    <Link
      href={`/forum/topics?category=${category.name}`}
      className="category-card-container"
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <div className="category-card-glow" />
      <div className="category-card-header">
        <div className="category-card-logo-container">
          {icon}
        </div>
        <h3 className="category-card-title">{category.name}</h3>
      </div>
      <p className="category-card-description">
        Découvrez les dernières discussions, tutoriels et questions sur {category.name}. Reghoignez la communauté !
      </p>
      <div className="category-card-footer">
        <span className="view-topics-link">Voir les sujets &rarr;</span>
      </div>
    </Link>
  );
};

export default CategoryCard;

