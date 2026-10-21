import React, { useState, useEffect } from 'react';
import { 
  X, RefreshCw, ChefHat, Bike, CheckCircle2, Clock, 
  MapPin, Phone, Calendar, AlertCircle, ShoppingBag, Shield 
} from 'lucide-react';
import api from '../services/api';
import './KitchenPortalModal.css';

export default function KitchenPortalModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'reservations'
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [orderRes, resRes] = await Promise.allSettled([
        api.getOrders(),
        api.getReservations()
      ]);

      if (orderRes.status === 'fulfilled' && orderRes.value?.success) {
        setOrders(orderRes.value.data || []);
      }
      if (resRes.status === 'fulfilled' && resRes.value?.success) {
        setReservations(resRes.value.data || []);
      }
    } catch (err) {
      console.error('Failed to load kitchen data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    setActionLoading(orderId);
    try {
      const res = await api.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => (o.orderId === orderId ? res.data : o))
        );
      }
    } catch (err) {
      alert(`Status update failed: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'all') return true;
    return o.status === statusFilter;
  });

  return (
    <div className="kitchen-backdrop" onClick={onClose}>
      <div className="kitchen-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="kitchen-header">
          <div className="kitchen-title-wrap">
            <div className="chef-icon-circle">
              <ChefHat size={22} />
            </div>
            <div>
              <div className="kitchen-meta">
                <span className="live-pill">Live Backend Connected</span>
                <span className="port-tag">Port 5001</span>
              </div>
              <h2 className="kitchen-heading">Kitchen & Operations Dispatch Portal</h2>
            </div>
          </div>

          <div className="kitchen-header-actions">
            <button className="refresh-btn" onClick={loadData} disabled={loading} title="Refresh Live Data">
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
              <span>Refresh</span>
            </button>
            <button className="kitchen-close-btn" onClick={onClose} aria-label="Close Portal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="kitchen-tabs">
          <button 
            className={`kitchen-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={16} />
            <span>Customer Orders ({orders.length})</span>
          </button>
          <button 
            className={`kitchen-tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            <Calendar size={16} />
            <span>Table Reservations ({reservations.length})</span>
          </button>
        </div>

        {/* Orders View */}
        {activeTab === 'orders' && (
          <div className="kitchen-content">
            <div className="orders-filter-row">
              <span className="filter-label">Filter Orders:</span>
              <div className="filter-chips">
                {['all', 'confirmed', 'preparing', 'on_the_way', 'delivered'].map((st) => (
                  <button
                    key={st}
                    className={`filter-chip ${statusFilter === st ? 'active' : ''}`}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st === 'all' ? 'All Orders' : st.replace(/_/g, ' ').toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="empty-kitchen-box">
                <ChefHat size={40} className="empty-icon" />
                <p>No orders match this filter.</p>
              </div>
            ) : (
              <div className="kitchen-orders-list">
                {filteredOrders.map((order) => (
                  <div key={order.orderId} className={`kitchen-order-card ${order.status}`}>
                    <div className="k-order-top">
                      <div>
                        <strong className="k-order-id">{order.orderId}</strong>
                        <span className="k-order-channel">{order.channel || 'Online Web'}</span>
                        <span className="k-order-time">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="k-status-pill">
                        <span className={`status-dot ${order.status}`}></span>
                        <strong>{order.status.replace(/_/g, ' ').toUpperCase()}</strong>
                      </div>
                    </div>

                    <div className="k-order-body">
                      <div className="k-customer-meta">
                        <div>
                          <strong>{order.customer?.name}</strong> • 
                          <a href={`tel:${order.customer?.phone}`} className="k-phone">{order.customer?.phone}</a>
                        </div>
                        <div className="k-address">
                          <MapPin size={13} />
                          <span>{order.customer?.address || 'Restaurant Pick-Up'}</span>
                        </div>
                        {order.customer?.deliveryNotes && (
                          <div className="k-note">
                            <strong>Note:</strong> "{order.customer?.deliveryNotes}"
                          </div>
                        )}
                      </div>

                      {/* Items */}
                      <div className="k-items-table">
                        {order.items?.map((it, idx) => (
                          <div key={idx} className="k-item-line">
                            <span className="k-item-qty">{it.quantity}x</span>
                            <span className="k-item-name">{it.name}</span>
                            {it.customOptions?.side && (
                              <span className="k-item-side">({it.customOptions.side})</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="k-pricing-bar">
                        <span>Total Paid: <strong>LKR {Number(order.pricing?.total).toLocaleString()}</strong></span>
                        <span className="k-pay-badge">{order.payment?.method} ({order.payment?.status})</span>
                      </div>
                    </div>

                    {/* Action Controls for Staff */}
                    <div className="k-actions-bar">
                      <span className="k-advance-label">Update Status:</span>
                      <div className="k-action-buttons">
                        {order.status === 'confirmed' && (
                          <button
                            className="k-btn btn-prep"
                            disabled={actionLoading === order.orderId}
                            onClick={() => handleUpdateStatus(order.orderId, 'preparing')}
                          >
                            <ChefHat size={14} /> Start Preparing
                          </button>
                        )}
                        {order.status === 'preparing' && (
                          <button
                            className="k-btn btn-dispatch"
                            disabled={actionLoading === order.orderId}
                            onClick={() => handleUpdateStatus(order.orderId, 'on_the_way')}
                          >
                            <Bike size={14} /> Dispatch with Rider
                          </button>
                        )}
                        {order.status === 'on_the_way' && (
                          <button
                            className="k-btn btn-deliver"
                            disabled={actionLoading === order.orderId}
                            onClick={() => handleUpdateStatus(order.orderId, 'delivered')}
                          >
                            <CheckCircle2 size={14} /> Mark Delivered
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <span className="k-completed-text">✅ Order Fulfilled & Delivered</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reservations View */}
        {activeTab === 'reservations' && (
          <div className="kitchen-content">
            {reservations.length === 0 ? (
              <div className="empty-kitchen-box">
                <Calendar size={40} className="empty-icon" />
                <p>No table reservations currently booked.</p>
              </div>
            ) : (
              <div className="kitchen-res-list">
                {reservations.map((res) => (
                  <div key={res.id} className="kitchen-res-card">
                    <div className="k-res-header">
                      <div>
                        <strong className="k-res-id">{res.id}</strong>
                        <span className="k-res-occasion">{res.occasion}</span>
                      </div>
                      <span className="k-res-confirmed-pill">Confirmed</span>
                    </div>

                    <div className="k-res-body">
                      <div className="k-res-row">
                        <span>Guest Name:</span>
                        <strong>{res.guestName}</strong>
                      </div>
                      <div className="k-res-row">
                        <span>Contact:</span>
                        <strong>{res.phone} {res.email ? `• ${res.email}` : ''}</strong>
                      </div>
                      <div className="k-res-row">
                        <span>Date & Time:</span>
                        <strong>{res.date} at {res.time} ({res.partySize} Guests)</strong>
                      </div>
                      {res.specialRequests && (
                        <div className="k-res-row requests">
                          <span>Special Requests:</span>
                          <em>"{res.specialRequests}"</em>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
