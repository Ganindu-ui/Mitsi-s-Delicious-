import React from 'react';
import { ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import './MobileBottomBar.css';

export default function MobileBottomBar({ cartItems, onOpenCart }) {
  if (cartItems.length === 0) return null;

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const unit = item.customOptions?.customUnitPrice || item.price;
    return sum + (unit * item.quantity);
  }, 0);

  return (
    <div className="mobile-bottom-bar animate-fade-in">
      <div className="mobile-bar-inner">
        <div className="mobile-bar-summary" onClick={onOpenCart}>
          <div className="mobile-cart-badge">
            <ShoppingBag size={18} />
            <span className="badge-count-num">{totalCount}</span>
          </div>
          <div>
            <span className="mobile-total-label">Subtotal</span>
            <span className="mobile-total-price">
              LKR {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="mobile-bar-actions">
          <button className="btn btn-primary btn-mobile-checkout" onClick={onOpenCart}>
            <span>View Feast</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
