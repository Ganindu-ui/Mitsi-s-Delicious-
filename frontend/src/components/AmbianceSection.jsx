import React from 'react';
import { MapPin, Phone, Clock, Utensils, HeartHandshake, Award, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import './AmbianceSection.css';

export default function AmbianceSection() {
  return (
    <section className="ambiance-section">
      <div className="container ambiance-container">
        {/* Left Side: Ambiance Image Showcase */}
        <div className="ambiance-media-column">
          <div className="ambiance-img-card">
            <img 
              src="/ambiance.jpg" 
              alt="Mitsi's Delicacies & Arabian Vibes Ambiance" 
              className="ambiance-img"
            />
            <div className="ambiance-badge-float">
              <HeartHandshake size={20} className="badge-icon-heart" />
              <div>
                <strong>A Colombo Favorite</strong>
                <small>Authentic Flavors & Gourmet Delicacies</small>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Narrative & Details */}
        <div className="ambiance-text-column">
          <span className="badge badge-pink">Our Culinary Heritage</span>
          
          <h2 className="ambiance-title">
            Two Iconic Traditions, <br />
            <span className="gradient-title">One Unforgettable Dining Experience</span>
          </h2>

          <p className="ambiance-desc">
            <strong>Mitsi's Delicacies by Arabian Vibes</strong> brings together two beloved culinary worlds under one roof in Colombo 03. 
            On one side, the rich, smoky charcoal perfection of Turkish and Serbian barbecue, spiced slow-roasted shawarmas, and savory 12-inch submarines. On the other, Mitsi's iconic, delicate European cakes, decadent cheesecakes, and artisanal dessert creations that have won hearts across Sri Lanka.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-box">
                <Utensils size={18} />
              </div>
              <div>
                <h4>Charcoal Grill Masters</h4>
                <p>Authentic Turkish marinades grilled fresh over natural charcoal embers.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box gold">
                <Award size={18} />
              </div>
              <div>
                <h4>Mitsi's Signature Sweets</h4>
                <p>Artisanal European cakes, berry mousse, and burnt Basque cheesecakes.</p>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="dining-info-box">
            <div className="info-row">
              <MapPin size={18} className="info-icon" />
              <div>
                <span className="info-label">Address</span>
                <span className="info-value">De Alwis Avenue, Colombo 03 / Dehiwala, Western 00300</span>
              </div>
            </div>

            <div className="info-row">
              <Clock size={18} className="info-icon" />
              <div>
                <span className="info-label">Dine-In & Delivery Hours</span>
                <span className="info-value">{RESTAURANT_INFO.openingHours}</span>
              </div>
            </div>

            <div className="info-row">
              <Phone size={18} className="info-icon" />
              <div>
                <span className="info-label">Hotline & Reservations</span>
                <span className="info-value">{RESTAURANT_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
