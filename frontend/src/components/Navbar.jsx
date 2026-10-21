import React, { useState } from 'react';
import { 
  ShoppingBag, MapPin, Clock, Phone, ExternalLink, ChevronDown, 
  Sparkles, Calendar, Search, ChefHat 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import './Navbar.css';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  orderType, 
  setOrderType, 
  onScrollToMenu,
  onOpenTrackOrder,
  onOpenReservation,
  onOpenKitchenPortal
}) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  return (
    <header className="navbar-wrapper glass-nav">
      {/* Top micro announcement bar */}
      <div className="top-banner">
        <div className="container top-banner-content">
          <div className="top-banner-left">
            <span className="live-pill">
              <span className="status-dot"></span>
              Open For Delivery & Dine-In
            </span>
            <span className="banner-divider">•</span>
            <span className="top-banner-text">Colombo 03 & Greater Colombo Express Delivery</span>
          </div>
          <div className="top-banner-right">
            <button 
              className="kitchen-staff-pill"
              onClick={onOpenKitchenPortal}
              title="Staff & Kitchen Live Dispatch Portal"
            >
              <ChefHat size={13} />
              <span>Kitchen Portal</span>
            </button>
            <a 
              href={RESTAURANT_INFO.uberEatsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="uber-eats-link-pill"
              title="View Mitsi's Delicacies on Uber Eats"
            >
              <span className="uber-dot"></span>
              <span>Uber Eats Store</span>
              <ExternalLink size={12} />
            </a>
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="phone-quick-link">
              <Phone size={13} />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container main-nav">
        {/* Brand Logo & Title */}
        <div className="brand-group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-container">
            <img 
              src="/logo.png" 
              alt="Mitsi's Delicacies by Arabian Vibes" 
              className="brand-logo-img" 
            />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">Mitsi's <span className="delicacies-script">Delicacies</span></h1>
            <p className="brand-sub">by Arabian Vibes • Restaurant & Cafe</p>
          </div>
        </div>

        {/* Order Mode Switcher */}
        <div className="order-mode-toggle">
          <button 
            className={`mode-btn ${orderType === 'delivery' ? 'active' : ''}`}
            onClick={() => setOrderType('delivery')}
          >
            <MapPin size={15} />
            <span>Delivery</span>
          </button>
          <button 
            className={`mode-btn ${orderType === 'takeaway' ? 'active' : ''}`}
            onClick={() => setOrderType('takeaway')}
          >
            <Clock size={15} />
            <span>Takeaway</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="nav-actions">
          <button className="nav-link-btn" onClick={onOpenTrackOrder} title="Track your live order">
            <Search size={15} />
            <span>Track Order</span>
          </button>

          <button className="nav-link-btn" onClick={onOpenReservation} title="Reserve a dining table">
            <Calendar size={15} />
            <span>Book Table</span>
          </button>

          <button className="nav-link-btn" onClick={onScrollToMenu}>
            <Sparkles size={15} />
            <span>Menu</span>
          </button>

          {/* Cart Trigger */}
          <button 
            className="cart-trigger-btn"
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
          >
            <div className="cart-icon-wrap">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="cart-badge-count">{cartCount}</span>
              )}
            </div>
            <span className="cart-label">My Order</span>
          </button>
        </div>
      </div>
    </header>
  );
}
