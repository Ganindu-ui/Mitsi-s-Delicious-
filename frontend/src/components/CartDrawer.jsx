import React, { useState } from 'react';
import { 
  X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, 
  Tag, MessageCircle, ExternalLink, Check, AlertCircle, Sparkles 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import './CartDrawer.css';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart,
  orderType,
  setOrderType,
  onCheckoutSuccess
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  if (!isOpen) return null;

  // Totals Calculation
  const subtotal = cartItems.reduce((sum, item) => {
    const unit = item.customOptions?.customUnitPrice || item.price;
    return sum + (unit * item.quantity);
  }, 0);

  // Discount
  const discountAmount = appliedPromo ? Math.round(subtotal * appliedPromo.percent) : 0;
  
  // Delivery Fee
  const isDelivery = orderType === 'delivery';
  const isFreeDelivery = subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
  const deliveryFee = isDelivery ? (isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee) : 0;
  const freeDeliveryRemaining = Math.max(0, RESTAURANT_INFO.freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / RESTAURANT_INFO.freeDeliveryThreshold) * 100);

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Handle Promo Application
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'MITSI10') {
      setAppliedPromo({ code: 'MITSI10', percent: 0.1, label: '10% Welcome Discount' });
      setPromoCode('');
    } else if (code === 'ARABIAN20' && subtotal >= 4000) {
      setAppliedPromo({ code: 'ARABIAN20', percent: 0.2, label: '20% Feast Discount' });
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon. Try "MITSI10" for 10% off!');
    }
  };

  // Generate WhatsApp Order Link
  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let message = `🍽️ *NEW ORDER - MITSI'S DELICACIES BY ARABIAN VIBES*\n`;
    message += `───────────────────\n`;
    message += `📋 *Order Mode:* ${orderType.toUpperCase()}\n`;
    if (customerName) message += `👤 *Customer:* ${customerName}\n`;
    if (customerAddress && isDelivery) message += `📍 *Delivery Address:* ${customerAddress}\n`;
    message += `\n*Items Ordered:*\n`;

    cartItems.forEach((item, idx) => {
      const unit = item.customOptions?.customUnitPrice || item.price;
      message += `${idx + 1}. *${item.name}* x${item.quantity} — LKR ${(unit * item.quantity).toLocaleString()}\n`;
      if (item.customOptions?.side) {
        message += `   ↳ Side: ${item.customOptions.side}\n`;
      }
      if (item.customOptions?.addOns?.length > 0) {
        const addonsStr = item.customOptions.addOns.map(a => a.name).join(', ');
        message += `   ↳ Add-ons: ${addonsStr}\n`;
      }
      if (item.customOptions?.instructions) {
        message += `   ↳ Note: "${item.customOptions.instructions}"\n`;
      }
    });

    message += `\n───────────────────\n`;
    message += `*Subtotal:* LKR ${subtotal.toLocaleString()}\n`;
    if (discountAmount > 0) {
      message += `*Discount (${appliedPromo.code}):* -LKR ${discountAmount.toLocaleString()}\n`;
    }
    if (isDelivery) {
      message += `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `LKR ${deliveryFee.toLocaleString()}`}\n`;
    }
    message += `*TOTAL AMOUNT:* LKR ${grandTotal.toLocaleString()}\n`;
    message += `*Payment:* ${paymentMethod.toUpperCase()}\n`;
    if (customerNotes) message += `*Notes:* ${customerNotes}\n`;
    message += `───────────────────\n`;
    message += `Please confirm my order & estimated delivery time. Thank you!`;

    const encoded = encodeURI(message);
    const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}?text=${encoded}`;
    window.open(waUrl, '_blank');
    onCheckoutSuccess({
      orderId: 'MITSI-' + Math.floor(100000 + Math.random() * 900000),
      items: cartItems,
      total: grandTotal,
      type: orderType,
      via: 'WhatsApp'
    });
  };

  // Direct In-App Checkout
  const handleDirectCheckout = () => {
    onCheckoutSuccess({
      orderId: 'MITSI-' + Math.floor(100000 + Math.random() * 900000),
      items: cartItems,
      total: grandTotal,
      type: orderType,
      customerName: customerName || 'Valued Guest',
      via: 'Direct'
    });
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} className="cart-header-icon" />
            <div>
              <h3>Your Food Bag</h3>
              <span className="cart-item-count">{cartItems.length} unique dish{cartItems.length === 1 ? '' : 'es'}</span>
            </div>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Delivery / Takeaway Switch */}
        <div className="cart-type-switch">
          <button 
            className={`type-tab ${orderType === 'delivery' ? 'active' : ''}`}
            onClick={() => setOrderType('delivery')}
          >
            Delivery (Express)
          </button>
          <button 
            className={`type-tab ${orderType === 'takeaway' ? 'active' : ''}`}
            onClick={() => setOrderType('takeaway')}
          >
            Takeaway / Pick-up
          </button>
        </div>

        {/* Free Delivery Bar (if delivery) */}
        {isDelivery && (
          <div className="free-delivery-tracker">
            <div className="tracker-text">
              {isFreeDelivery ? (
                <span className="free-unlocked">🎉 You unlocked <strong>FREE Delivery!</strong></span>
              ) : (
                <span>Add <strong>LKR {freeDeliveryRemaining.toLocaleString()}</strong> more for FREE delivery</span>
              )}
            </div>
            <div className="tracker-bar">
              <div className="tracker-progress" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        )}

        {/* Scrollable Cart Items */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-icon-wrap">
                <ShoppingBag size={48} />
              </div>
              <h4>Your food bag is empty</h4>
              <p>Explore our signature Turkish BBQ, 12" Submarines, Shawarmas, and European sweets!</p>
              <button className="btn btn-primary" onClick={onClose}>
                Browse Mitsi's Menu
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item, idx) => {
                const unit = item.customOptions?.customUnitPrice || item.price;
                const itemTotal = unit * item.quantity;

                return (
                  <div key={idx} className="cart-item-card">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    
                    <div className="cart-item-details">
                      <div className="item-title-row">
                        <h4 className="item-name">{item.name}</h4>
                        <button 
                          className="remove-item-btn"
                          onClick={() => onRemoveItem(idx)}
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Customization Details */}
                      {item.customOptions?.side && (
                        <div className="item-sub-tag">Side: {item.customOptions.side}</div>
                      )}
                      {item.customOptions?.addOns?.length > 0 && (
                        <div className="item-sub-tag">
                          Add-ons: {item.customOptions.addOns.map(a => a.name).join(', ')}
                        </div>
                      )}
                      {item.customOptions?.instructions && (
                        <div className="item-instruction-tag">Note: "{item.customOptions.instructions}"</div>
                      )}

                      <div className="item-pricing-row">
                        <div className="cart-qty-ctrl">
                          <button 
                            className="qty-mini-btn"
                            onClick={() => onUpdateQty(idx, item.quantity - 1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button 
                            className="qty-mini-btn"
                            onClick={() => onUpdateQty(idx, item.quantity + 1)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="item-total-price">
                          LKR {itemTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cart Footer (Only if items exist) */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-form">
              <div className="promo-input-wrap">
                <Tag size={15} className="promo-icon" />
                <input
                  type="text"
                  placeholder="Enter Promo Code (e.g. MITSI10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button type="submit" className="apply-promo-btn">Apply</button>
              </div>
            </form>

            {appliedPromo && (
              <div className="applied-promo-pill">
                <Sparkles size={14} />
                <span>Coupon '{appliedPromo.code}' applied: {appliedPromo.label}</span>
                <button className="remove-promo" onClick={() => setAppliedPromo(null)}>×</button>
              </div>
            )}
            {promoError && <p className="promo-error-msg">{promoError}</p>}

            {/* Bill Summary */}
            <div className="bill-summary">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>LKR {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              {discountAmount > 0 && (
                <div className="bill-row discount">
                  <span>Special Discount ({appliedPromo.code})</span>
                  <span>-LKR {discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              {isDelivery && (
                <div className="bill-row">
                  <span>Express Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="free-text">FREE</strong> : `LKR ${deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}</span>
                </div>
              )}

              <div className="bill-divider"></div>

              <div className="bill-row grand-total-row">
                <span>Grand Total</span>
                <span className="grand-price">
                  LKR {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Order Action Buttons */}
            <div className="cart-action-buttons">
              {/* WhatsApp Direct Order Button */}
              <button 
                className="btn btn-gold full-btn whatsapp-order-btn"
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle size={18} />
                <span>Order Direct via WhatsApp</span>
              </button>

              {/* In-App Direct Checkout Button */}
              <button 
                className="btn btn-primary full-btn"
                onClick={handleDirectCheckout}
              >
                <span>Confirm Order & Pay</span>
                <ArrowRight size={18} />
              </button>

              {/* Uber Eats Alternative Link */}
              <a 
                href={RESTAURANT_INFO.uberEatsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="uber-alt-link"
              >
                <span>Prefer Uber Eats App? Order on Uber Eats</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
