import React from 'react';
import Image from 'next/image';
import logo from '../../../../public/images/javascript.svg';
import './CategoryCard.css';
import { Category } from '@/types/category';
import Link from "next/link";

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Link href={`/forum/topics?category=${category.name}`} className="category-card-container">
      <div className="category-card-header">
        <div className="category-card-logo-container">
          <Image src={logo} alt={'Javascript'} className="category-card-logo" />
        </div>
        <h3 className="category-card-title">{category.name}</h3>
      </div>
      <p className="category-card-description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, atque
        deleniti, dolorem eos eveniet exercitationem fugiat
      </p>
    </Link>
  );
};

export default CategoryCard;
