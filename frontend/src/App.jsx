import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryNav from './components/CategoryNav';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import CustomizationModal from './components/CustomizationModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import AmbianceSection from './components/AmbianceSection';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import { MENU_ITEMS, CATEGORIES, RESTAURANT_INFO } from './data/menuData';
import { ExternalLink, Utensils, Sparkles, Heart } from 'lucide-react';
import './App.css';

export default function App() {
  // Cart state with localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mitsis_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'takeaway'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'popular' | 'vegetarian' | 'budget'
  const [sortBy, setSortBy] = useState('featured');
  const [selectedDishForCustomize, setSelectedDishForCustomize] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  const menuSectionRef = useRef(null);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('mitsis_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Cart persistence failed', e);
    }
  }, [cartItems]);

  // Scroll to menu helper
  const handleScrollToMenu = () => {
    if (menuSectionRef.current) {
      menuSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add Item to Cart (Simple or Customized)
  const handleAddToCart = (item, quantity = 1, customOptions = null) => {
    setCartItems((prev) => {
      // If customized, treat as unique item if options differ
      const existingIdx = prev.findIndex((cartItem) => {
        if (cartItem.id !== item.id) return false;
        if (!customOptions && !cartItem.customOptions) return true;
        return (
          cartItem.customOptions?.side === customOptions?.side &&
          JSON.stringify(cartItem.customOptions?.addOns) === JSON.stringify(customOptions?.addOns) &&
          cartItem.customOptions?.instructions === customOptions?.instructions
        );
      });

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { ...item, quantity, customOptions }];
      }
    });
  };

  // Quick Add from Hero
  const handleQuickAdd = (itemId) => {
    const dish = MENU_ITEMS.find((d) => d.id === itemId);
    if (dish) {
      handleAddToCart(dish, 1, null);
      setIsCartOpen(true);
    }
  };

  // Update item quantity in cart
  const handleUpdateQty = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  // Remove item
  const handleRemoveItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Total cart items count
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  // Financial Totals
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const unit = item.customOptions?.customUnitPrice || item.price;
      return sum + (unit * item.quantity);
    }, 0);
  }, [cartItems]);

  const isDelivery = orderType === 'delivery';
  const isFreeDelivery = subtotal >= RESTAURANT_INFO.freeDeliveryThreshold;
  const deliveryFee = isDelivery ? (isFreeDelivery ? 0 : RESTAURANT_INFO.deliveryFee) : 0;
  const discountAmount = 0; // standard checkout base before coupon
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Filter & Sort Logic
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category Filter
      if (activeCategory === 'featured') {
        if (!item.isFeatured) return false;
      } else if (activeCategory !== 'all') {
        if (item.category !== activeCategory) return false;
      }

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      // 3. Dietary / Value Chips
      if (activeFilter === 'vegetarian' && item.dietary !== 'vegetarian') {
        return false;
      }
      if (activeFilter === 'popular' && !item.badge) {
        return false;
      }
      if (activeFilter === 'budget' && item.price > 2500) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Featured: items with badge or featured flag first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [activeCategory, searchQuery, activeFilter, sortBy]);

  // Selected Category Object
  const currentCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        orderType={orderType}
        setOrderType={setOrderType}
        onScrollToMenu={handleScrollToMenu}
      />

      {/* Hero Showcase */}
      <HeroSection
        onExploreMenu={handleScrollToMenu}
        onQuickAdd={handleQuickAdd}
      />

      {/* Main Menu Section */}
      <section ref={menuSectionRef} id="menu-section" className="menu-section">
        {/* Sticky Category Pills */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
            handleScrollToMenu();
          }}
        />

        {/* Search, Filter, Sort Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          matchCount={filteredDishes.length}
        />

        {/* Menu Section Header */}
        <div className="container menu-header-container">
          <div className="menu-title-block">
            <span className="menu-pre-title">Handcrafted In Colombo 03</span>
            <h2 className="menu-main-title">
              {currentCategoryObj ? currentCategoryObj.name : 'Authentic Delicacies'}
            </h2>
            <p className="menu-sub-desc">
              Every dish is freshly prepared to order using prime ingredients, authentic Turkish spices, and European confectionery precision.
            </p>
          </div>

          <div className="uber-sync-pill">
            <span className="live-badge">UBER EATS LIVE MENU</span>
            <span>Accurate Colombo 03 Uber Eats Prices</span>
          </div>
        </div>

        {/* Dish Grid */}
        <div className="container product-grid-container">
          {filteredDishes.length > 0 ? (
            <div className="product-grid">
              {filteredDishes.map((dish) => (
                <ProductCard
                  key={dish.id}
                  item={dish}
                  onAddToCart={(item) => handleAddToCart(item, 1, null)}
                  onOpenCustomize={(item) => setSelectedDishForCustomize(item)}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-box">
              <Utensils size={48} className="no-results-icon" />
              <h3>No dishes match your filter</h3>
              <p>Try clearing your search query or choosing another category.</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                  setActiveCategory('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Ambiance & Heritage Section */}
      <AmbianceSection />

      {/* Footer */}
      <Footer onCategoryClick={(catId) => {
        setActiveCategory(catId);
        handleScrollToMenu();
      }} />

      {/* Customization Modal */}
      {selectedDishForCustomize && (
        <CustomizationModal
          item={selectedDishForCustomize}
          onClose={() => setSelectedDishForCustomize(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Side Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        orderType={orderType}
        setOrderType={setOrderType}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onCheckoutSuccess={(orderInfo) => {
          setIsCartOpen(false);
          setCompletedOrder(orderInfo);
          setCartItems([]);
        }}
      />

      {/* Full Online Checkout & Payment Gateway Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          orderType={orderType}
          subtotal={subtotal}
          discountAmount={discountAmount}
          deliveryFee={deliveryFee}
          grandTotal={grandTotal}
          onPaymentComplete={(orderInfo) => {
            setIsCheckoutOpen(false);
            setCompletedOrder(orderInfo);
            setCartItems([]);
          }}
        />
      )}

      {/* Order Confirmed Live Tracker & Tax Invoice Modal */}
      {completedOrder && (
        <OrderSuccessModal
          orderData={completedOrder}
          onClose={() => setCompletedOrder(null)}
          onResetOrder={() => setCompletedOrder(null)}
        />
      )}

      {/* Floating Bottom Bar for Mobile Devices */}
      <MobileBottomBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
