import React from 'react';
import './forum.css';
import CategoryCard from '../../../components/forum/CategoryCard/CategoryCard';
import UserCard from '../../../components/forum/UserCard/UserCard';
import {getCategories} from "@/lib/utils/category";
import {Category} from "@/types/category";

const Forum = async () => {
  const categories = await getCategories();
  return (
      <div className="forum-container">
        <div className="forum-section" style={{ marginBottom: '2rem' }}>
          <h2 className="forum-title">Liste des catégories</h2>
          <div className="categories-list">
            {categories.map((category: Category, index: React.Key | null | undefined) => (
                <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
        <div className="forum-section">
          <h2 className="forum-title">Derniers inscrits</h2>
          <div className="users-list">
            <UserCard
                name={'John Doe'}
                pseudo={'johndoe'}
                role={'Développeur'}
            />
            <UserCard
                name={'James Jackson'}
                pseudo={'jamesJK'}
                role={'Étudiant'}
            />
          </div>
        </div>
      </div>
  );
};

export default Forum;
