import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Star, Clock, Flame, ShieldCheck, Leaf } from 'lucide-react';
import './CustomizationModal.css';

export default function CustomizationModal({ item, onClose, onAddToCart }) {
  const [selectedSide, setSelectedSide] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Initialize defaults
  useEffect(() => {
    if (item?.options?.sides?.length > 0) {
      setSelectedSide(item.options.sides[0]);
    } else {
      setSelectedSide('');
    }
    setSelectedAddOns([]);
    setSpecialInstructions('');
    setQuantity(1);
  }, [item]);

  if (!item) return null;

  // Toggle AddOn
  const handleToggleAddOn = (addon) => {
    if (selectedAddOns.some(a => a.name === addon.name)) {
      setSelectedAddOns(selectedAddOns.filter(a => a.name !== addon.name));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  // Calculate Unit & Total Price
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = item.price + addOnsTotal;
  const grandTotal = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(item, quantity, {
      side: selectedSide,
      addOns: selectedAddOns,
      instructions: specialInstructions,
      customUnitPrice: unitPrice
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="custom-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Modal Header Image */}
        <div className="modal-media-header">
          <img src={item.image} alt={item.name} className="modal-img" />
          <div className="modal-media-gradient"></div>

          <div className="modal-image-badges">
            {item.badge && <span className="badge badge-gold">{item.badge}</span>}
            {item.dietary === 'vegetarian' ? (
              <span className="badge badge-emerald"><Leaf size={12} /> Vegetarian</span>
            ) : (
              <span className="badge badge-pink"><ShieldCheck size={12} /> Halal</span>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body-scroll">
          <div className="modal-title-row">
            <div>
              <h2 className="modal-title">{item.name}</h2>
              <div className="modal-meta">
                <span className="meta-star">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  {item.rating} ({item.ratingCount} reviews)
                </span>
                <span>•</span>
                <span className="meta-item"><Clock size={14} /> {item.prepTime}</span>
                <span>•</span>
                <span className="meta-item">{item.calories}</span>
              </div>
            </div>
            <div className="modal-base-price">
              <span className="cur">LKR</span>
              <span className="amt">{item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <p className="modal-full-desc">{item.description}</p>

          {/* Section: Choose Side / Preparation */}
          {item.options?.sides?.length > 0 && (
            <div className="option-section">
              <div className="section-label-row">
                <h4 className="option-section-title">Select Included Side / Bread</h4>
                <span className="req-pill">Required (Pick 1)</span>
              </div>
              <div className="radio-options-list">
                {item.options.sides.map((side, idx) => (
                  <label key={idx} className={`radio-card ${selectedSide === side ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="dish-side" 
                      checked={selectedSide === side} 
                      onChange={() => setSelectedSide(side)} 
                    />
                    <span className="radio-label-text">{side}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Section: Add-ons & Extra Sauces */}
          {item.options?.addOns?.length > 0 && (
            <div className="option-section">
              <div className="section-label-row">
                <h4 className="option-section-title">Chef's Gourmet Add-ons</h4>
                <span className="opt-pill">Optional</span>
              </div>
              <div className="checkbox-options-list">
                {item.options.addOns.map((addon, idx) => {
                  const isChecked = selectedAddOns.some(a => a.name === addon.name);
                  return (
                    <label key={idx} className={`check-card ${isChecked ? 'selected' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => handleToggleAddOn(addon)}
                      />
                      <span className="check-title">{addon.name}</span>
                      <span className="addon-price">+LKR {addon.price.toLocaleString()}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section: Special Instructions */}
          <div className="option-section">
            <h4 className="option-section-title">Special Cooking Instructions</h4>
            <textarea
              className="instructions-input"
              rows="2"
              placeholder="E.g., extra spicy, sauce on the side, no onions, cut into 4 pieces..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div className="modal-footer">
          <div className="quantity-counter">
            <button 
              className="qty-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus size={15} />
            </button>
            <span className="qty-number">{quantity}</span>
            <button 
              className="qty-btn"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={15} />
            </button>
          </div>

          <button className="btn btn-primary add-confirm-btn" onClick={handleConfirm}>
            <span>Add to Feast</span>
            <span className="btn-price-tag">LKR {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
