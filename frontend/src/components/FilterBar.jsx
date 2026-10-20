import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';
import './FilterBar.css';

export default function FilterBar({ 
  searchQuery, 
  setSearchQuery, 
  activeFilter, 
  setActiveFilter, 
  sortBy, 
  setSortBy,
  matchCount 
}) {
  const filterChips = [
    { id: 'all', label: 'All Items' },
    { id: 'popular', label: '★ Most Liked & Popular' },
    { id: 'vegetarian', label: '🌱 Vegetarian' },
    { id: 'budget', label: '🏷️ Under LKR 2,500' },
  ];

  return (
    <div className="filter-bar-wrapper">
      <div className="container filter-container">
        {/* Top Search & Sort Row */}
        <div className="filter-top-row">
          {/* Live Search Input */}
          <div className="search-input-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Submarine, Lamb, Shawarma, Pasta...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-field"
            />
            {searchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                title="Clear Search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="sort-box">
            <ArrowUpDown size={15} className="sort-icon" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured / Uber Eats Ranking</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Chips & Count Row */}
        <div className="filter-bottom-row">
          <div className="filter-chips-group">
            {filterChips.map((chip) => (
              <button
                key={chip.id}
                className={`filter-chip ${activeFilter === chip.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(chip.id)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="result-count">
            <Sparkles size={14} className="count-sparkle" />
            <span>Showing <strong>{matchCount}</strong> authentic delicacies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
