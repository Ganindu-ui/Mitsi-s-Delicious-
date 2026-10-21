import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, Clock, MapPin, MessageCircle, ShoppingBag, X, 
  Printer, ShieldCheck, CreditCard, ChevronRight, Flame, Bike, Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '../data/menuData';
import api from '../services/api';
import './OrderSuccessModal.css';

export default function OrderSuccessModal({ orderData, onClose, onResetOrder }) {
  const [liveOrder, setLiveOrder] = useState(orderData);
  const [activeStep, setActiveStep] = useState(() => {
    if (orderData?.status === 'delivered') return 4;
    if (orderData?.status === 'on_the_way') return 3;
    if (orderData?.status === 'preparing') return 2;
    return 1;
  });

  useEffect(() => {
    if (orderData) {
      setLiveOrder(orderData);
      // Fire festive celebratory confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#d9258b', '#f59e0b', '#10b981', '#38bdf8', '#ffffff']
      });

      // Poll live backend order status
      const pollId = setInterval(async () => {
        try {
          const res = await api.getOrder(orderData.orderId);
          if (res && res.success && res.data) {
            setLiveOrder((prev) => ({ ...prev, ...res.data }));
            const st = res.data.status;
            if (st === 'delivered') setActiveStep(4);
            else if (st === 'on_the_way') setActiveStep(3);
            else if (st === 'preparing') setActiveStep(2);
            else setActiveStep(1);
          }
        } catch (err) {
          // Silent polling fail
        }
      }, 3500);

      return () => clearInterval(pollId);
    }
  }, [orderData]);

  if (!orderData) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppNotify = () => {
    let msg = `🍽️ *CONFIRMED WEB ORDER - ${orderData.orderId}*\n`;
    msg += `💳 *Payment:* ${orderData.paymentMethod} (PAID ONLINE)\n`;
    msg += `👤 *Customer:* ${orderData.customerName} (${orderData.phone})\n`;
    msg += `📍 *Destination:* ${orderData.address}\n\n`;
    msg += `*Dishes Ordered:*\n`;

    orderData.items.forEach((item, idx) => {
      const unit = item.customOptions?.customUnitPrice || item.price;
      msg += `${idx + 1}. *${item.name}* x${item.quantity} - LKR ${(unit * item.quantity).toLocaleString()}\n`;
      if (item.customOptions?.side) msg += `   ↳ Side: ${item.customOptions.side}\n`;
      if (item.customOptions?.addOns?.length > 0) {
        msg += `   ↳ Add-ons: ${item.customOptions.addOns.map(a => a.name).join(', ')}\n`;
      }
    });

    msg += `\n*Total Paid:* LKR ${orderData.total.toLocaleString()}\n`;
    msg += `*Transaction Ref:* ${orderData.transactionId || 'ONLINE-PAID'}\n`;
    msg += `Thank you! Please begin preparing my order.`;

    const encoded = encodeURI(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp.replace('+', '')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="order-tracker-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button className="tracker-close-btn" onClick={onClose} aria-label="Close Order Receipt">
          <X size={18} />
        </button>

        {/* Top Success Banner */}
        <div className="tracker-top-banner">
          <div className="success-icon-bubble">
            <CheckCircle2 size={44} className="check-main-icon" />
          </div>
          <div className="tracker-top-titles">
            <div className="payment-status-pill">
              <ShieldCheck size={14} />
              <span>Payment Verified & Confirmed Online</span>
            </div>
            <h2 className="tracker-heading">Order Placed Successfully!</h2>
            <p className="tracker-sub">
              Your order has been sent directly to the kitchen at Mitsi's Delicacies by Arabian Vibes (Colombo 03).
            </p>
          </div>
        </div>

        {/* Live Order Tracker Stages */}
        <div className="order-tracker-timeline">
          <div className={`tracker-stage ${activeStep >= 1 ? 'completed' : ''}`}>
            <div className="stage-icon-circle">
              <Check size={16} />
            </div>
            <div className="stage-info">
              <span className="stage-name">Order & Payment</span>
              <small className="stage-status">Confirmed ({liveOrder.paidAt || 'Just now'})</small>
            </div>
          </div>

          <div className={`tracker-stage-connector ${activeStep >= 2 ? 'completed' : ''}`}></div>

          <div className={`tracker-stage ${activeStep >= 2 ? (activeStep === 2 ? 'active' : 'completed') : ''}`}>
            <div className="stage-icon-circle pulse-flame">
              <Flame size={16} />
            </div>
            <div className="stage-info">
              <span className="stage-name">Kitchen Preparing</span>
              <small className="stage-status">{activeStep >= 2 ? 'Charcoal Grilling' : 'Pending'}</small>
            </div>
          </div>

          <div className={`tracker-stage-connector ${activeStep >= 3 ? 'completed' : ''}`}></div>

          <div className={`tracker-stage ${activeStep >= 3 ? (activeStep === 3 ? 'active' : 'completed') : ''}`}>
            <div className="stage-icon-circle">
              <Bike size={16} />
            </div>
            <div className="stage-info">
              <span className="stage-name">Out for Delivery</span>
              <small className="stage-status">{activeStep >= 3 ? 'Rider on the way' : 'Est: 25-35 mins'}</small>
            </div>
          </div>

          <div className={`tracker-stage-connector ${activeStep >= 4 ? 'completed' : ''}`}></div>

          <div className={`tracker-stage ${activeStep >= 4 ? 'completed' : ''}`}>
            <div className="stage-icon-circle">
              <CheckCircle2 size={16} />
            </div>
            <div className="stage-info">
              <span className="stage-name">Delivered</span>
              <small className="stage-status">{activeStep >= 4 ? 'Enjoy your meal!' : 'Awaiting arrival'}</small>
            </div>
          </div>
        </div>

        {/* Printable Digital Invoice Receipt */}
        <div className="digital-invoice-box printable-area">
          {/* Invoice Header */}
          <div className="invoice-header">
            <div>
              <h3 className="invoice-restaurant-name">Mitsi's Delicacies</h3>
              <p className="invoice-restaurant-sub">by Arabian Vibes Restaurant & Cafe</p>
              <small className="invoice-meta-loc">De Alwis Ave, Colombo 03 • Tel: {RESTAURANT_INFO.phone}</small>
            </div>
            <div className="invoice-right-meta">
              <span className="invoice-tag">TAX INVOICE / RECEIPT</span>
              <div className="inv-num"><strong>{liveOrder.orderId}</strong></div>
              {liveOrder.trackingCode && (
                <small className="inv-track-code">Track: {liveOrder.trackingCode}</small>
              )}
              <small>{liveOrder.date} • {liveOrder.paidAt}</small>
            </div>
          </div>

          <div className="invoice-divider"></div>

          {/* Customer & Payment Meta */}
          <div className="invoice-customer-row">
            <div>
              <span className="inv-lbl">BILLED TO:</span>
              <strong className="inv-val">{orderData.customerName || 'Valued Guest'}</strong>
              <div className="inv-sub-text">{orderData.phone}</div>
              {orderData.address && <div className="inv-sub-text">{orderData.address}</div>}
            </div>
            <div className="inv-payment-box">
              <span className="inv-lbl">PAYMENT METHOD:</span>
              <div className="inv-payment-tag">
                <CreditCard size={14} />
                <strong>{orderData.paymentMethod}</strong>
              </div>
              <div className="inv-ref">Ref: {orderData.transactionId || 'ONLINE-AUTH'}</div>
            </div>
          </div>

          <div className="invoice-divider"></div>

          {/* Itemized Table */}
          <div className="invoice-items-table">
            <div className="table-head">
              <span>Dish Description</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Amount (LKR)</span>
            </div>

            {orderData.items.map((item, idx) => {
              const unit = item.customOptions?.customUnitPrice || item.price;
              const total = unit * item.quantity;
              return (
                <div key={idx} className="table-row">
                  <div className="table-col-desc">
                    <strong className="item-name-bold">{item.name}</strong>
                    {item.customOptions?.side && (
                      <span className="item-opt">Side: {item.customOptions.side}</span>
                    )}
                    {item.customOptions?.addOns?.length > 0 && (
                      <span className="item-opt">
                        Add-ons: {item.customOptions.addOns.map(a => a.name).join(', ')}
                      </span>
                    )}
                  </div>
                  <div className="table-col-qty text-center">{item.quantity}</div>
                  <div className="table-col-amt text-right">{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
              );
            })}
          </div>

          <div className="invoice-divider"></div>

          {/* Totals Breakdown */}
          <div className="invoice-totals-breakdown">
            <div className="total-break-row">
              <span>Subtotal:</span>
              <span>LKR {orderData.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            {orderData.discountAmount > 0 && (
              <div className="total-break-row discount">
                <span>Promotional Discount:</span>
                <span>-LKR {orderData.discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="total-break-row">
              <span>Delivery Fee ({orderData.orderType === 'delivery' ? 'Express' : 'Pickup'}):</span>
              <span>{orderData.deliveryFee === 0 ? 'FREE' : `LKR ${orderData.deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}</span>
            </div>
            <div className="total-break-row grand">
              <span>Total Paid & Authorized:</span>
              <span className="grand-val">LKR {orderData.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="tracker-footer-actions">
          <button 
            type="button" 
            className="btn btn-outline btn-print"
            onClick={handlePrint}
          >
            <Printer size={16} />
            <span>Print Invoice</span>
          </button>

          <button 
            type="button" 
            className="btn btn-gold btn-wa-kitchen"
            onClick={handleWhatsAppNotify}
          >
            <MessageCircle size={18} />
            <span>Notify Kitchen via WhatsApp</span>
          </button>

          <button 
            type="button" 
            className="btn btn-primary btn-more-food"
            onClick={() => {
              onResetOrder();
              onClose();
            }}
          >
            <ShoppingBag size={16} />
            <span>Back to Menu</span>
          </button>
        </div>

      </div>
    </div>
  );
}
