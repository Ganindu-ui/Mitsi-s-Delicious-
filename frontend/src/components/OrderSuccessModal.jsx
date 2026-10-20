import React, { useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, MessageCircle, ShoppingBag, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '../data/menuData';
import './OrderSuccessModal.css';

export default function OrderSuccessModal({ orderData, onClose, onResetOrder }) {
  useEffect(() => {
    if (orderData) {
      // Fire festive celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d9258b', '#f59e0b', '#10b981', '#ffffff']
      });
    }
  }, [orderData]);

  if (!orderData) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="order-success-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button className="success-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="success-icon-wrap">
          <CheckCircle2 size={54} className="check-success-icon" />
        </div>

        <span className="order-pill-status">Order Confirmed & Sent to Kitchen</span>
        <h2 className="success-title">Thank You For Dining With Mitsi's!</h2>
        <p className="success-subtitle">
          Your order has been registered at Mitsi's Delicacies by Arabian Vibes (Colombo 03).
        </p>

        {/* Order Details Card */}
        <div className="order-receipt-box">
          <div className="receipt-header">
            <div>
              <span className="lbl">Order Number</span>
              <strong className="order-id-val">{orderData.orderId}</strong>
            </div>
            <div className="text-right">
              <span className="lbl">Channel</span>
              <strong className="via-val">{orderData.via || 'Direct'}</strong>
            </div>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-stats-grid">
            <div className="r-stat">
              <Clock size={16} className="r-icon" />
              <div>
                <small>Est. Preparation</small>
                <strong>25 - 35 mins</strong>
              </div>
            </div>
            <div className="r-stat">
              <MapPin size={16} className="r-icon" />
              <div>
                <small>Order Type</small>
                <strong>{orderData.type === 'delivery' ? 'Express Delivery' : 'Dine-in / Pickup'}</strong>
              </div>
            </div>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-total-row">
            <span>Total Payable:</span>
            <span className="receipt-grand">LKR {orderData.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Direct WhatsApp Callout */}
        <a 
          href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}?text=Hi%20Mitsi's,%20checking%20status%20for%20order%20${orderData.orderId}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-gold success-wa-btn"
        >
          <MessageCircle size={18} />
          <span>Chat with Kitchen on WhatsApp</span>
        </a>

        <button 
          className="btn btn-outline new-order-btn"
          onClick={() => {
            onResetOrder();
            onClose();
          }}
        >
          <ShoppingBag size={16} />
          <span>Order More Dishes</span>
        </button>
      </div>
    </div>
  );
}
