import React, { useState } from 'react';
import { 
  X, Search, Clock, MapPin, CheckCircle2, Flame, Bike, 
  ShoppingBag, ShieldCheck, AlertCircle, ArrowRight 
} from 'lucide-react';
import api from '../services/api';
import './TrackOrderModal.css';

export default function TrackOrderModal({ isOpen, onClose, initialOrderId = '' }) {
  const [searchId, setSearchId] = useState(initialOrderId);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await api.getOrder(searchId.trim());
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setError('Order not found. Please check your Order ID or tracking code.');
      }
    } catch (err) {
      setError(err.message || 'Could not find order. Please verify your Order ID.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const getStageIndex = (status) => {
    switch (status) {
      case 'received':
      case 'confirmed':
        return 1;
      case 'preparing':
        return 2;
      case 'on_the_way':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  const currentStage = order ? getStageIndex(order.status) : 1;

  return (
    <div className="track-modal-backdrop" onClick={onClose}>
      <div className="track-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button className="track-close-btn" onClick={onClose} aria-label="Close Tracker">
          <X size={18} />
        </button>

        <div className="track-header">
          <div className="track-badge">Live Colombo 03 Kitchen Dispatch</div>
          <h2 className="track-title">Track Your Order Status</h2>
          <p className="track-sub">Enter your Order ID (e.g. MITSI-888326) or Tracking Code</p>
        </div>

        <form onSubmit={handleSearch} className="track-search-form">
          <div className="track-input-wrap">
            <Search size={18} className="track-search-icon" />
            <input 
              type="text" 
              className="track-input"
              placeholder="e.g. MITSI-123456 or TRK-XXXXXX"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="track-submit-btn" disabled={loading || !searchId.trim()}>
            {loading ? 'Locating...' : 'Track Order'}
          </button>
        </form>

        {error && (
          <div className="track-error-alert animate-fade-in">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {order && (
          <div className="track-results animate-fade-in">
            {/* Top Status Bar */}
            <div className="track-status-summary">
              <div>
                <span className="order-id-pill">{order.orderId}</span>
                <span className="order-tracking-tag">Code: {order.trackingCode}</span>
              </div>
              <div className="order-status-badge">
                <span className={`status-indicator ${order.status}`}></span>
                <strong>{order.status.replace(/_/g, ' ').toUpperCase()}</strong>
              </div>
            </div>

            {/* Stages Visualizer */}
            <div className="track-stages-bar">
              <div className={`stage-step ${currentStage >= 1 ? 'completed' : ''}`}>
                <div className="step-circle"><CheckCircle2 size={16} /></div>
                <span>Confirmed</span>
              </div>
              <div className={`stage-line ${currentStage >= 2 ? 'active' : ''}`}></div>
              <div className={`stage-step ${currentStage >= 2 ? (currentStage === 2 ? 'current' : 'completed') : ''}`}>
                <div className="step-circle"><Flame size={16} /></div>
                <span>Preparing</span>
              </div>
              <div className={`stage-line ${currentStage >= 3 ? 'active' : ''}`}></div>
              <div className={`stage-step ${currentStage >= 3 ? (currentStage === 3 ? 'current' : 'completed') : ''}`}>
                <div className="step-circle"><Bike size={16} /></div>
                <span>On The Way</span>
              </div>
              <div className={`stage-line ${currentStage >= 4 ? 'active' : ''}`}></div>
              <div className={`stage-step ${currentStage >= 4 ? 'completed' : ''}`}>
                <div className="step-circle"><ShoppingBag size={16} /></div>
                <span>Delivered</span>
              </div>
            </div>

            {/* Order Details Details Grid */}
            <div className="track-details-grid">
              <div className="track-info-item">
                <span className="track-label">Customer</span>
                <strong className="track-val">{order.customer?.name} ({order.customer?.phone})</strong>
              </div>
              <div className="track-info-item">
                <span className="track-label">Delivery Destination</span>
                <strong className="track-val">{order.customer?.address || 'Pick-up at Restaurant'}</strong>
              </div>
              <div className="track-info-item">
                <span className="track-label">Payment Mode</span>
                <strong className="track-val">
                  {order.payment?.method} • {order.payment?.status === 'paid' ? 'Paid Online' : 'Pay on Delivery'}
                </strong>
              </div>
              <div className="track-info-item">
                <span className="track-label">Estimated Delivery</span>
                <strong className="track-val text-gold">{order.estimatedTime || '30 - 45 mins'}</strong>
              </div>
            </div>

            {/* Ordered Dishes List */}
            <div className="track-dishes-box">
              <h4 className="track-items-heading">Ordered Items ({order.items?.length})</h4>
              <div className="track-dishes-list">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="track-dish-row">
                    <div>
                      <strong>{item.name}</strong> <span className="dish-qty-tag">x{item.quantity}</span>
                      {item.customOptions?.side && (
                        <div className="dish-custom-mini">↳ Side: {item.customOptions.side}</div>
                      )}
                    </div>
                    <span className="dish-price-total">
                      LKR {((item.customOptions?.customUnitPrice || item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="track-total-bar">
                <span>Grand Total:</span>
                <strong>LKR {Number(order.pricing?.total).toLocaleString()}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
