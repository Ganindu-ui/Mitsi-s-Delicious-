import React, { useState } from 'react';
import { Star, Clock, Plus, Check, Sliders, ShieldCheck, Leaf } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ item, onAddToCart, onOpenCustomize }) {
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="product-card" onClick={() => onOpenCustomize(item)}>
      {/* Media Wrap */}
      <div className="product-media-wrap">
        <img 
          src={item.image} 
          alt={item.name} 
          className="product-image"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="card-top-badges">
          {item.badge && (
            <span className={`card-badge ${item.badge.includes('#1') ? 'badge-gold' : item.badge.includes('Vegetarian') ? 'badge-emerald' : 'badge-pink'}`}>
              {item.badge}
            </span>
          )}
          {item.dietary === 'vegetarian' ? (
            <span className="dietary-icon-badge veg" title="100% Vegetarian">
              <Leaf size={12} />
            </span>
          ) : (
            <span className="dietary-icon-badge halal" title="Halal Certified">
              <ShieldCheck size={12} />
            </span>
          )}
        </div>

        {/* Hover Quick Overlay */}
        <div className="media-overlay">
          <button 
            className="customize-hint-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCustomize(item);
            }}
          >
            <Sliders size={14} />
            <span>Customize Sides & Toppings</span>
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="product-body">
        {/* Rating & Prep Time meta */}
        <div className="product-meta-row">
          <div className="meta-rating">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>{item.rating}</span>
            <span className="meta-reviews">({item.ratingCount})</span>
          </div>
          <div className="meta-time">
            <Clock size={13} />
            <span>{item.prepTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="product-title">{item.name}</h3>

        {/* Description */}
        <p className="product-desc">{item.description}</p>

        {/* Card Footer: Price & Actions */}
        <div className="product-footer">
          <div className="price-container">
            <span className="currency-label">LKR</span>
            <span className="price-amount">{item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="product-actions">
            <button 
              className="action-customize-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCustomize(item);
              }}
              title="Customize Options"
            >
              <Sliders size={15} />
            </button>

            <button 
              className={`action-add-btn ${justAdded ? 'added' : ''}`}
              onClick={handleQuickAdd}
              disabled={justAdded}
              title="Add To Order"
            >
              {justAdded ? (
                <>
                  <Check size={16} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
