import React from 'react';
import { 
  Utensils, Flame, Beef, Sandwich, Layers, 
  CookingPot, Soup, Salad, Sparkles, Coffee, Cake 
} from 'lucide-react';
import { CATEGORIES } from '../data/menuData';
import './CategoryNav.css';

// Map icon string to Lucide component
const ICON_MAP = {
  Utensils,
  Flame,
  Beef,
  Sandwich,
  Wrap: Layers,
  CookingPot,
  Soup,
  Salad,
  Sparkles,
  Coffee,
  Cake
};

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  return (
    <div className="category-nav-wrapper">
      <div className="container">
        <div className="category-scroll-container">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Utensils;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <div className="cat-icon-box">
                  <IconComponent size={16} />
                </div>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-count">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
