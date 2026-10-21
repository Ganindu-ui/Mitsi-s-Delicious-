import React, { useState } from 'react';
import { 
  X, Calendar, Clock, Users, Sparkles, CheckCircle2, 
  MapPin, Phone, Mail, MessageSquare, Utensils, AlertCircle 
} from 'lucide-react';
import api from '../services/api';
import './ReservationModal.css';

export default function ReservationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:30',
    partySize: '2',
    occasion: 'Casual Dining',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guestName.trim() || !formData.phone.trim()) {
      setError('Please provide your name and contact phone number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.createReservation(formData);
      if (res.success && res.data) {
        setConfirmedReservation(res.data);
      } else {
        setError(res.message || 'Could not complete reservation.');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <div className="res-backdrop" onClick={resetAndClose}>
      <div className="res-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button className="res-close-btn" onClick={resetAndClose} aria-label="Close Reservation">
          <X size={18} />
        </button>

        {!confirmedReservation ? (
          <div>
            <div className="res-header">
              <span className="res-badge">Colombo 03 • Fine Dining & Terrace</span>
              <h2 className="res-title">Reserve a Table</h2>
              <p className="res-sub">
                Experience authentic charcoal BBQ, gourmet submarines, and European sweets in our atmospheric Colombo restaurant.
              </p>
            </div>

            {error && (
              <div className="res-error-box animate-fade-in">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="res-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Kasun Fernando"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. +94 77 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Party Size</label>
                  <select 
                    value={formData.partySize}
                    onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                  >
                    <option value="1">1 Guest (Solo Table)</option>
                    <option value="2">2 Guests (Couple / Intimate)</option>
                    <option value="3">3 - 4 Guests (Small Family / Friends)</option>
                    <option value="6">5 - 6 Guests (Gathering)</option>
                    <option value="8">7 - 10 Guests (Large Group)</option>
                    <option value="12">10+ Guests (Private Event)</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Date *</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Time *</label>
                  <select 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="13:00">01:00 PM (Lunch)</option>
                    <option value="14:00">02:00 PM (Late Lunch)</option>
                    <option value="18:30">06:30 PM (Early Dinner)</option>
                    <option value="19:30">07:30 PM (Prime Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner & Dessert)</option>
                    <option value="21:30">09:30 PM (Late Night Feast)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Occasion</label>
                <select 
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                >
                  <option value="Casual Dining">Casual Dining / Dinner</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Business Meeting">Business Dinner / Meeting</option>
                  <option value="Special Date">Romantic Date</option>
                </select>
              </div>

              <div className="form-group">
                <label>Special Requests or Dietary Notes</label>
                <textarea 
                  rows="2"
                  placeholder="e.g. Window booth, birthday candle on Delicacy cake, high chair needed"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="res-submit-btn" disabled={loading}>
                {loading ? 'Confirming Table...' : 'Confirm Table Booking'}
              </button>
            </form>
          </div>
        ) : (
          <div className="res-success-view animate-fade-in">
            <div className="res-success-icon">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="res-success-title">Table Confirmed!</h2>
            <p className="res-success-desc">
              We look forward to hosting you at Mitsi's Delicacies by Arabian Vibes (Colombo 03).
            </p>

            <div className="res-confirmation-card">
              <div className="conf-row">
                <span>Reservation Ref:</span>
                <strong>{confirmedReservation.id}</strong>
              </div>
              <div className="conf-row">
                <span>Guest Name:</span>
                <strong>{confirmedReservation.guestName}</strong>
              </div>
              <div className="conf-row">
                <span>Date & Time:</span>
                <strong>{confirmedReservation.date} at {confirmedReservation.time}</strong>
              </div>
              <div className="conf-row">
                <span>Party Size:</span>
                <strong>{confirmedReservation.partySize} Guests</strong>
              </div>
              <div className="conf-row">
                <span>Occasion:</span>
                <strong>{confirmedReservation.occasion}</strong>
              </div>
            </div>

            <button className="res-done-btn" onClick={resetAndClose}>
              Back to Dining Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
