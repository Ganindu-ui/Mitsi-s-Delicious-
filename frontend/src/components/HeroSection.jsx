import React from 'react';
import { Star, Clock, ShieldCheck, Flame, ExternalLink, ArrowRight, Award, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import './HeroSection.css';

export default function HeroSection({ onExploreMenu, onQuickAdd }) {
  return (
    <section className="hero-section">
      <div className="hero-bg-overlay"></div>
      
      <div className="container hero-container">
        {/* Left Column: Brand Story & CTAs */}
        <div className="hero-content">
          {/* Top Trust Badges */}
          <div className="hero-badges">
            <span className="hero-badge badge-gold">
              <Star size={13} fill="#f59e0b" color="#f59e0b" />
              {RESTAURANT_INFO.rating} Rating (500+ Foodies)
            </span>
            <span className="hero-badge badge-pink">
              <Flame size={13} />
              Authentic Turkish & Serbian BBQ
            </span>
            <span className="hero-badge badge-emerald">
              <ShieldCheck size={13} />
              100% Halal Certified
            </span>
          </div>

          <h1 className="hero-heading">
            Where European Fine Delicacies Meet <span className="highlight-text">Rich Arabian Charcoal Flavors</span>
          </h1>

          <p className="hero-description">
            Experience the legendary culinary collaboration in Colombo 03. From signature 
            <strong> 12-inch Chicken Submarines</strong> and succulent <strong>Turkish Lamb Chops</strong> 
            to velvety <strong>Alfredo Pastas</strong> and Mitsi’s famous handcrafted European desserts.
          </p>

          {/* Quick Metrics */}
          <div className="hero-stats-bar">
            <div className="stat-item">
              <Clock size={18} className="stat-icon" />
              <div>
                <span className="stat-val">{RESTAURANT_INFO.deliveryTime}</span>
                <span className="stat-lbl">Fast Delivery</span>
              </div>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-item">
              <Award size={18} className="stat-icon" />
              <div>
                <span className="stat-val">Free Over LKR 5,000</span>
                <span className="stat-lbl">Island Delivery</span>
              </div>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-item">
              <div className="uber-circle">
                <span className="uber-text">Uber</span>
              </div>
              <div>
                <span className="stat-val">Live On Uber Eats</span>
                <span className="stat-lbl">{RESTAURANT_INFO.uberEatsRating}</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="hero-cta-group">
            <button className="btn btn-primary btn-hero" onClick={onExploreMenu}>
              <span>Order Food Now</span>
              <ArrowRight size={18} />
            </button>
            <a 
              href={RESTAURANT_INFO.uberEatsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline btn-hero uber-cta"
            >
              <span>Order on Uber Eats</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}?text=Hello%20Mitsi's%20Delicacies!%20I%20would%20like%20to%20place%20an%20order.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-ghost btn-hero whatsapp-quick"
            >
              <MessageCircle size={18} color="#25D366" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Promo Callout */}
          <div className="promo-callout">
            <span className="promo-pill">PROMO CODE</span>
            <span className="promo-text">Use <strong>MITSI10</strong> at checkout for 10% OFF your entire meal!</span>
          </div>
        </div>

        {/* Right Column: Hero Floating Visual Cards */}
        <div className="hero-visual">
          <div className="hero-visual-card main-showcase-card animate-float">
            <div className="card-media-wrap">
              <img 
                src="/images/lamb_chops.jpg" 
                alt="Gourmet Lamb Chops" 
                className="showcase-img"
              />
              <span className="floating-badge badge-gold">#2 Most Liked Dish</span>
            </div>
            <div className="card-info">
              <div className="card-header-row">
                <h3 className="card-title">Gourmet Turkish Lamb Chops</h3>
                <span className="card-price">LKR 9,250</span>
              </div>
              <p className="card-brief">Char-grilled with Mediterranean herbs, grilled potatoes & two artisan sauces.</p>
              <button 
                className="btn btn-sm btn-primary add-quick-btn"
                onClick={() => onQuickAdd("bbq-lamb-chops")}
              >
                + Add to Feast
              </button>
            </div>
          </div>

          {/* Secondary Floating Card */}
          <div className="secondary-floating-card">
            <img 
              src="/images/chicken_submarine.jpg" 
              alt="Classic Chicken Submarine" 
              className="secondary-img"
            />
            <div className="secondary-info">
              <span className="badge badge-pink">#1 Most Liked</span>
              <h4>Classic Chicken Sub 12"</h4>
              <span className="secondary-price">LKR 2,150</span>
            </div>
          </div>

          {/* Third Mini Tag Badge */}
          <div className="sweet-pill-float">
            <span className="sweet-spark">✨</span>
            <div>
              <strong>European Delicacy Cakes</strong>
              <small>Artisan Chocolate & Berry Mousse</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
