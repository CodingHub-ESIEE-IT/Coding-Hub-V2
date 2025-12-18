import React from 'react';
import './forum.css';
import CategoryCard from '../../../components/forum/CategoryCard/CategoryCard';
import UserCard from '../../../components/forum/UserCard/UserCard';
import { getCategories } from "@/lib/utils/api/category";
import { Category } from "@/types/category";

const Forum = async () => {
  const categories = await getCategories();
  return (
    <div className="forum-container">
      {/* Forum Hero */}
      <div className="forum-header-section">
        <h1 className="forum-header-title">Espace Communautaire</h1>
        <p className="forum-header-subtitle">
          Rejoignez les discussions, posez vos questions et partagez vos connaissances avec les étudiants de l'ESIEE-IT.
        </p>
      </div>

      <div className="forum-section">
        <h2 className="forum-title">Explorer par Catégorie</h2>
        <div className="categories-list">
          {categories.map((category: Category, index: React.Key | null | undefined) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;
