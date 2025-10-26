
import React from 'react';
import { Category } from '../types';

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  isDisabled: boolean;
}

const TravelIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>);
const RealEstateIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>);
const EcommerceIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>);
const FoodIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0c-.454-.303-.977-.454-1.5-.454V5.73c0-1.268.523-2.427 1.36-3.264C4.138 1.628 5.29 1 6.42 1h11.16c1.13 0 2.282.628 3.064 1.466C21.477 3.303 22 4.462 22 5.73v9.816zM3.83 21.036a1.5 1.5 0 01-1.06-.44l-1.62-1.62a1.5 1.5 0 01.44-2.58l1.62 1.62a.5.5 0 00.707 0l1.62-1.62a1.5 1.5 0 012.12 2.12l-1.62 1.62a1.5 1.5 0 01-1.06.44z" /></svg>);

const categoryOptions = [
  { id: Category.Travel, label: 'Travel', icon: <TravelIcon /> },
  { id: Category.RealEstate, label: 'Real Estate', icon: <RealEstateIcon /> },
  { id: Category.Ecommerce, label: 'E-commerce', icon: <EcommerceIcon /> },
  { id: Category.Food, label: 'Food', icon: <FoodIcon /> },
];

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onCategoryChange, isDisabled }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">Select a Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categoryOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onCategoryChange(option.id)}
            disabled={isDisabled}
            className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500
              ${selectedCategory === option.id ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'}
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {option.icon}
            <span className="mt-2 text-xs sm:text-sm font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
