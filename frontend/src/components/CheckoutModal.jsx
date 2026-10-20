import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, CreditCard, Lock, ArrowRight, ArrowLeft, 
  MapPin, Phone, User, Mail, Clock, AlertCircle, Building, QrCode, 
  Banknote, Sparkles, CheckCircle2, Copy 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import './CheckoutModal.css';

// Colombo delivery zones
const COLOMBO_AREAS = [
  'Colombo 03 - Colpetty (Free Delivery)',
  'Colombo 04 - Bambalapitiya',
  'Colombo 02 - Slave Island / Union Place',
  'Colombo 07 - Cinnamon Gardens',
  'Colombo 05 - Havelock Town',
  'Colombo 06 - Wellawatte',
  'Dehiwala - De Alwis Ave & Galle Rd',
  'Mount Lavinia',
  'Rajagiriya / Nawala',
  'Nugegoda / Kohuwala',
  'Other Colombo Area'
];

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  orderType, 
  subtotal, 
  discountAmount, 
  deliveryFee, 
  grandTotal, 
  promoCode,
  onPaymentComplete 
}) {
  const [step, setStep] = useState(1); // 1: Delivery info, 2: Payment Gateway, 3: Processing
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'koko' | 'mintpay' | 'lankaqr' | 'cod'

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState(COLOMBO_AREAS[0]);
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [deliveryTiming, setDeliveryTiming] = useState('asap'); // 'asap' | 'schedule'

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Form error states
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(val);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setCardExpiry(val);
  };

  // Quick autofill demo test card for instant testing
  const handleFillDemoCard = () => {
    setCardNumber('4532 8190 2840 9182');
    setCardExpiry('08/28');
    setCardCvv('789');
    setCardHolder(fullName || 'Ganindu Wickramasinghe');
  };

  // Validation
  const validateStep1 = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    if (!phone.trim()) errs.phone = 'Valid phone number is required';
    if (orderType === 'delivery' && !address.trim()) {
      errs.address = 'Delivery address is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  // Trigger Online Payment Simulation
  const handleSubmitPayment = (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        alert('Please enter a valid 16-digit card number or click "Auto-fill Test Card".');
        return;
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        alert('Please enter a valid MM/YY expiry date.');
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        alert('Please enter a valid 3-digit CVV.');
        return;
      }
    }

    // Start animated payment gateway processing
    setIsProcessing(true);
    setProcessingStatus('Connecting to 256-Bit Secure Bank Gateway...');

    setTimeout(() => {
      setProcessingStatus('Verifying 3D-Secure Bank Authentication...');
    }, 1000);

    setTimeout(() => {
      setProcessingStatus(`Authorizing LKR ${grandTotal.toLocaleString()} with Card Issuer...`);
    }, 2000);

    setTimeout(() => {
      setProcessingStatus('Payment Authorized & Confirmed!');
      setIsProcessing(false);

      const generatedOrderId = 'MITSI-' + Math.floor(100000 + Math.random() * 900000);
      const transactionId = 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase();

      onPaymentComplete({
        orderId: generatedOrderId,
        transactionId,
        customerName: fullName,
        phone,
        email,
        address: orderType === 'delivery' ? `${address}, ${area}` : 'Pickup at Mitsi\'s Colombo 03',
        deliveryNotes,
        orderType,
        items: cartItems,
        subtotal,
        discountAmount,
        deliveryFee,
        total: grandTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        paidOnline: paymentMethod !== 'cod',
        paidAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      onClose();
    }, 3200);
  };

  // Koko / Mintpay installment calculation (divide by 3)
  const installmentAmount = Math.ceil(grandTotal / 3);

  return (
    <div className="checkout-backdrop" onClick={onClose}>
      <div className="checkout-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        
        {/* Processing Gateway Overlay */}
        {isProcessing && (
          <div className="processing-overlay animate-fade-in">
            <div className="processing-box">
              <div className="spinner-glow"></div>
              <Lock size={26} className="lock-icon-spin" />
              <h3 className="proc-title">Processing Payment</h3>
              <p className="proc-status-text">{processingStatus}</p>
              <span className="proc-badge">
                <ShieldCheck size={14} /> 256-Bit SSL Encrypted Transaction
              </span>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="checkout-header">
          <div className="checkout-header-left">
            <h2 className="checkout-title">
              {step === 1 ? 'Customer & Delivery Details' : 'Secure Online Payment'}
            </h2>
            <div className="checkout-step-indicator">
              <span className={`step-dot ${step === 1 ? 'active' : 'done'}`}>1. Contact</span>
              <span className="step-arrow">→</span>
              <span className={`step-dot ${step === 2 ? 'active' : ''}`}>2. Payment Gateway</span>
            </div>
          </div>
          <button className="checkout-close-btn" onClick={onClose} aria-label="Close Checkout">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="checkout-body">
          {/* STEP 1: CONTACT & DELIVERY */}
          {step === 1 && (
            <div className="step-container animate-fade-in">
              <div className="info-banner">
                <Sparkles size={16} className="sparkle-gold" />
                <span>
                  Order Type: <strong>{orderType === 'delivery' ? 'Express Doorstep Delivery' : 'Dine-In / Store Pickup'}</strong>
                </span>
              </div>

              {/* Personal Details */}
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    <User size={14} /> Full Name *
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="e.g. Ganindu Wickramasinghe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && <span className="field-err">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Phone size={14} /> Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="+94 77 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <span className="field-err">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={14} /> Email Address (For digital receipt)
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Delivery Address (if Delivery) */}
              {orderType === 'delivery' && (
                <>
                  <div className="form-group">
                    <label className="form-label">
                      <Building size={14} /> Select Delivery Area / Zone *
                    </label>
                    <select 
                      className="form-select"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    >
                      {COLOMBO_AREAS.map((a, idx) => (
                        <option key={idx} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MapPin size={14} /> Street Address & Building / Landmark *
                    </label>
                    <textarea
                      className={`form-input textarea-address ${errors.address ? 'error' : ''}`}
                      rows="2"
                      placeholder="e.g. Apt 4B, Lotus Apartments, 28 De Alwis Avenue, Colombo 03"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <span className="field-err">{errors.address}</span>}
                  </div>
                </>
              )}

              {/* Special Instructions & Timing */}
              <div className="form-group">
                <label className="form-label">
                  <Clock size={14} /> Delivery Time Preference
                </label>
                <div className="timing-options">
                  <label className={`timing-pill ${deliveryTiming === 'asap' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="timing" 
                      checked={deliveryTiming === 'asap'} 
                      onChange={() => setDeliveryTiming('asap')} 
                    />
                    <span>🚀 As Soon As Possible (30-45 mins)</span>
                  </label>
                  <label className={`timing-pill ${deliveryTiming === 'schedule' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="timing" 
                      checked={deliveryTiming === 'schedule'} 
                      onChange={() => setDeliveryTiming('schedule')} 
                    />
                    <span>🕒 Schedule for Later Today</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Delivery / Kitchen Instructions</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Ring the bell twice, leave with security, extra napkins..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT GATEWAY SELECTION */}
          {step === 2 && (
            <div className="step-container animate-fade-in">
              <div className="payment-methods-grid">
                {/* 1. Credit / Debit Card */}
                <div 
                  className={`payment-method-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="pm-header">
                    <div className="pm-icon-wrap">
                      <CreditCard size={20} />
                    </div>
                    <div className="pm-title-wrap">
                      <span className="pm-title">Credit / Debit Card</span>
                      <small className="pm-sub">Visa, Mastercard, AMEX</small>
                    </div>
                  </div>
                  <span className="pm-tag instant">Instant 0% Fee</span>
                </div>

                {/* 2. Koko Buy Now Pay Later */}
                <div 
                  className={`payment-method-card ${paymentMethod === 'koko' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('koko')}
                >
                  <div className="pm-header">
                    <div className="pm-icon-wrap koko-icon">
                      <span className="brand-koko">KOKO</span>
                    </div>
                    <div className="pm-title-wrap">
                      <span className="pm-title">Koko Pay in 3</span>
                      <small className="pm-sub">3 x LKR {installmentAmount.toLocaleString()}</small>
                    </div>
                  </div>
                  <span className="pm-tag bnpl">0% Interest</span>
                </div>

                {/* 3. Mintpay */}
                <div 
                  className={`payment-method-card ${paymentMethod === 'mintpay' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('mintpay')}
                >
                  <div className="pm-header">
                    <div className="pm-icon-wrap mintpay-icon">
                      <span className="brand-mintpay">mint</span>
                    </div>
                    <div className="pm-title-wrap">
                      <span className="pm-title">Mintpay in 3</span>
                      <small className="pm-sub">3 x LKR {installmentAmount.toLocaleString()}</small>
                    </div>
                  </div>
                  <span className="pm-tag bnpl">0% Interest</span>
                </div>

                {/* 4. LankaQR / Bank Transfer */}
                <div 
                  className={`payment-method-card ${paymentMethod === 'lankaqr' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('lankaqr')}
                >
                  <div className="pm-header">
                    <div className="pm-icon-wrap">
                      <QrCode size={20} />
                    </div>
                    <div className="pm-title-wrap">
                      <span className="pm-title">LankaQR / Transfer</span>
                      <small className="pm-sub">Commercial Bank, Sampath</small>
                    </div>
                  </div>
                  <span className="pm-tag bank">Direct Pay</span>
                </div>

                {/* 5. Cash on Delivery */}
                <div 
                  className={`payment-method-card ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="pm-header">
                    <div className="pm-icon-wrap">
                      <Banknote size={20} />
                    </div>
                    <div className="pm-title-wrap">
                      <span className="pm-title">Cash on Delivery</span>
                      <small className="pm-sub">Pay at doorstep</small>
                    </div>
                  </div>
                  <span className="pm-tag cod">COD</span>
                </div>
              </div>

              {/* PAYMENT DETAILS FOR SELECTED METHOD */}

              {/* A. Credit / Debit Card Form & Realistic Interactive Mockup */}
              {paymentMethod === 'card' && (
                <div className="card-payment-form animate-fade-in">
                  {/* Interactive Card Visual */}
                  <div className="card-mockup">
                    <div className="card-mockup-top">
                      <span className="card-chip"></span>
                      <span className="card-network">VISA / MC</span>
                    </div>
                    <div className="card-mockup-number">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="card-mockup-bottom">
                      <div>
                        <small>CARDHOLDER</small>
                        <span>{cardHolder.toUpperCase() || 'VALUED GUEST'}</span>
                      </div>
                      <div>
                        <small>EXPIRES</small>
                        <span>{cardExpiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Auto-fill test card button */}
                  <div className="test-card-fill-row">
                    <span className="test-hint">Testing online payment?</span>
                    <button type="button" className="btn-autofill" onClick={handleFillDemoCard}>
                      ⚡ Auto-fill Test Card Details
                    </button>
                  </div>

                  {/* Card input fields */}
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <div className="input-with-icon">
                      <CreditCard size={16} className="field-icon" />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="4532 0000 0000 0000"
                        maxLength="19"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="MM/YY"
                        maxLength="5"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">CVV / CVC</label>
                      <div className="input-with-icon">
                        <Lock size={14} className="field-icon" />
                        <input
                          type="password"
                          className="form-input"
                          placeholder="•••"
                          maxLength="4"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Name on Card</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. GANINDU WICKRAMASINGHE"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* B. Koko Installment Details */}
              {paymentMethod === 'koko' && (
                <div className="bnpl-info-card animate-fade-in">
                  <div className="bnpl-header">
                    <h4>Pay in 3 Interest-Free Installments with Koko</h4>
                    <span className="bnpl-badge">KOKO Approved</span>
                  </div>
                  <div className="installments-timeline">
                    <div className="timeline-node active">
                      <span className="node-num">1</span>
                      <span className="node-date">Today</span>
                      <strong className="node-amt">LKR {installmentAmount.toLocaleString()}</strong>
                    </div>
                    <div className="timeline-line"></div>
                    <div className="timeline-node">
                      <span className="node-num">2</span>
                      <span className="node-date">In 30 Days</span>
                      <strong className="node-amt">LKR {installmentAmount.toLocaleString()}</strong>
                    </div>
                    <div className="timeline-line"></div>
                    <div className="timeline-node">
                      <span className="node-num">3</span>
                      <span className="node-date">In 60 Days</span>
                      <strong className="node-amt">LKR {installmentAmount.toLocaleString()}</strong>
                    </div>
                  </div>
                  <p className="bnpl-note">
                    Your registered phone ({phone || 'provided phone'}) will receive an instant payment link to authorize via Koko App.
                  </p>
                </div>
              )}

              {/* C. Mintpay Installments */}
              {paymentMethod === 'mintpay' && (
                <div className="bnpl-info-card animate-fade-in mintpay-theme">
                  <div className="bnpl-header">
                    <h4>Split into 3 Monthly Payments with Mintpay</h4>
                    <span className="bnpl-badge mintpay-bg">0% Markup</span>
                  </div>
                  <div className="installments-timeline">
                    <div className="timeline-node active">
                      <span className="node-num">1</span>
                      <span className="node-date">First Payment Today</span>
                      <strong className="node-amt">LKR {installmentAmount.toLocaleString()}</strong>
                    </div>
                    <div className="timeline-line"></div>
                    <div className="timeline-node">
                      <span className="node-num">2</span>
                      <span className="node-date">Month 2</span>
                      <strong className="node-amt">LKR {installmentAmount.toLocaleString()}</strong>
                    </div>
                    <div className="timeline-line"></div>
                    <div className="timeline-node">
                      <span className="node-num">3</span>
                      <span className="node-date">Month 3</span>
                      <strong className="node-amt">LKR {installmentAmount.toLocaleString()}</strong>
                    </div>
                  </div>
                  <p className="bnpl-note">Works with any Sri Lankan debit or credit card through Mintpay.</p>
                </div>
              )}

              {/* D. LankaQR / Direct Bank Transfer */}
              {paymentMethod === 'lankaqr' && (
                <div className="qr-info-card animate-fade-in">
                  <div className="qr-box-wrap">
                    <div className="fake-qr-code">
                      <QrCode size={110} color="#0c0a10" />
                      <span className="qr-center-lbl">LANKA QR</span>
                    </div>
                    <div className="qr-text-info">
                      <h4>Scan to Pay via Any Bank App</h4>
                      <p>Scan with Commercial Bank Flash, BOC SmartPay, FriMi, Sampath WePay, etc.</p>
                      <div className="bank-acc-details">
                        <div><strong>Bank:</strong> Commercial Bank of Ceylon</div>
                        <div><strong>Account:</strong> 1000 8492 0184</div>
                        <div><strong>Name:</strong> Mitsi's Delicacies by Arabian Vibes</div>
                        <div><strong>Branch:</strong> Colombo 03 (Colpetty)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* E. Cash on Delivery */}
              {paymentMethod === 'cod' && (
                <div className="cod-info-card animate-fade-in">
                  <Banknote size={36} className="cod-icon" />
                  <h4>Cash on Delivery / Card POS Machine at Doorstep</h4>
                  <p>Our rider will arrive with your hot meal. You can pay cash or swipe any card on the handheld POS terminal.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Sticky Footer */}
        <div className="checkout-footer">
          <div className="checkout-total-summary">
            <span className="total-label">Total to Authorize:</span>
            <span className="total-amount">
              LKR {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="checkout-btn-group">
            {step === 2 && (
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            )}

            {step === 1 ? (
              <button 
                type="button" 
                className="btn btn-primary btn-checkout-action"
                onClick={handleNextStep}
              >
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                type="button" 
                className="btn btn-primary btn-checkout-action btn-pay-now"
                onClick={handleSubmitPayment}
              >
                <Lock size={16} />
                <span>Pay LKR {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
