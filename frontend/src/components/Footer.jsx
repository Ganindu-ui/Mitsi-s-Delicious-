import React from 'react';
import { Heart, MapPin, Phone, Clock, ExternalLink, ShieldCheck, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import './Footer.css';

export default function Footer({ onCategoryClick, onOpenTrackOrder, onOpenReservation, onOpenKitchenPortal }) {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        {/* Top Col 1: Brand & Bio */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src="/logo.png" alt="Mitsi's Delicacies" className="footer-logo-img" />
            </div>
            <div>
              <h3 className="footer-brand-title">Mitsi's <span className="script">Delicacies</span></h3>
              <p className="footer-brand-sub">by Arabian Vibes Restaurant & Cafe</p>
            </div>
          </div>

          <p className="footer-bio">
            Colombo's premier dining destination fusing artisan European delicacies with authentic Turkish and Serbian charcoal grills, 12" submarines, and savory shawarmas.
          </p>

          <div className="footer-badges">
            <span className="footer-badge">
              <ShieldCheck size={14} className="text-emerald" /> 100% Halal Kitchen
            </span>
            <span className="footer-badge">
              ⭐ 4.8 Rating Across Colombo
            </span>
          </div>
        </div>

        {/* Col 2: Quick Menus & Services */}
        <div className="footer-col">
          <h4 className="footer-heading">Services & Dining</h4>
          <ul className="footer-links">
            <li><button onClick={onOpenTrackOrder}>📍 Track Live Order</button></li>
            <li><button onClick={onOpenReservation}>📅 Reserve a Dining Table</button></li>
            <li><button onClick={onOpenKitchenPortal}>👨‍🍳 Staff Operations Portal</button></li>
            <li><button onClick={() => onCategoryClick('bbq')}>Turkish & Serbian BBQ</button></li>
            <li><button onClick={() => onCategoryClick('submarine')}>12" Chicken Submarines</button></li>
            <li><button onClick={() => onCategoryClick('delicacies')}>Mitsi's Delicacy Cakes</button></li>
          </ul>
        </div>

        {/* Col 3: Visit & Dine */}
        <div className="footer-col">
          <h4 className="footer-heading">Visit Our Restaurant</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>De Alwis Avenue, Colombo 03 / Dehiwala, Western 00300, Sri Lanka</span>
            </li>
            <li>
              <Clock size={16} className="contact-icon" />
              <span>{RESTAURANT_INFO.openingHours}</span>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <a href={`tel:${RESTAURANT_INFO.phone}`}>{RESTAURANT_INFO.phone}</a>
            </li>
            <li>
              <MessageCircle size={16} className="contact-icon text-emerald" />
              <a 
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                WhatsApp Direct: {RESTAURANT_INFO.whatsapp}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Uber Eats & Delivery Partners */}
        <div className="footer-col partner-col">
          <h4 className="footer-heading">Order Online</h4>
          <p className="partner-desc">
            Craving Mitsi's right now? Order through our live Uber Eats store or connect with us on WhatsApp for rapid direct delivery!
          </p>

          <a 
            href={RESTAURANT_INFO.uberEatsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="uber-eats-footer-btn"
          >
            <div className="uber-logo-box">
              <span className="uber-brand-text">Uber</span>
              <span className="eats-brand-text">Eats</span>
            </div>
            <div className="uber-btn-text">
              <small>Order Now on</small>
              <strong>Uber Eats Store</strong>
            </div>
            <ExternalLink size={16} className="uber-ext-icon" />
          </a>

          <div className="payment-options-note">
            <span>Payment Accepted:</span>
            <div className="payment-pills">
              <span>Cash on Delivery</span>
              <span>Credit / Debit Cards</span>
              <span>Koko</span>
              <span>Mintpay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Mitsi's Delicacies by Arabian Vibes. All Rights Reserved.</p>
          <p className="designed-with">
            Crafted with <Heart size={14} className="heart-icon" /> for food lovers in Colombo
          </p>
        </div>
      </div>
    </footer>
  );
}
