import React from 'react';
import Category from './Category';
import { CATEGORIES } from '../CATEGORIES';
import './Categories.css';

const Categories = () => {
  return (
    <div className='categories'>
      {CATEGORIES.map((category) => (
        <Category
          key={category.id}
          className="category-wrapper"
          backgroundColor={category.color}
          imageSrc={category.categoryImageUrl}
          categoryName={category.name}
          offerCount={category.offers}
        />
      ))}
    </div>
  );
};

export default Categories;