import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductCard from './components/ProductCard';
import BundleCTA from './components/BundleCTA';
import Reviews from './components/Reviews';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import SuccessScreen from './components/SuccessScreen';
import { products } from './data/products';

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [toasts, setToasts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successScreen, setSuccessScreen] = useState(false);
  const [orderId, setOrderId] = useState('');

  const addToast = useCallback((message, type = 'cart') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      addToast(`${product.name} added to cart`);
    },
    [addToast]
  );

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        const next = new Set(prev);
        if (next.has(productId)) {
          next.delete(productId);
          addToast('Removed from wishlist', 'wishlist');
        } else {
          next.add(productId);
          addToast('Saved to wishlist', 'wishlist');
        }
        return next;
      });
    },
    [addToast]
  );

  const addBundleToCart = useCallback(() => {
    products.forEach((product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
    });
    addToast('Bundle added to cart — 2 items');
    setCartOpen(true);
  }, [addToast]);

  const scrollToProducts = useCallback(() => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handlePlaceOrder = useCallback(() => {
    const id =
      'UB-' +
      Math.random().toString(36).substring(2, 8).toUpperCase() +
      '-' +
      Date.now().toString(36).substring(4, 8).toUpperCase();
    setOrderId(id);
    setCheckoutOpen(false);
    setCartOpen(false);
    setCart([]);
    setSuccessScreen(true);
  }, []);

  const handleSuccessClose = useCallback(() => {
    setSuccessScreen(false);
    setOrderId('');
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-bg text-white">
      <AnnouncementBar />
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero
          onShopNow={scrollToProducts}
          onBuyBundle={addBundleToCart}
        />
        <Features />

        {/* Products Section */}
        <section id="products" className="py-20 sm:py-28 bg-brand-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-center mb-16"
            >
              <span className="text-brand-gold text-xs tracking-[0.2em] uppercase">
                The Collection
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl text-white mt-4">
                Premium Essentials
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.has(product.id)}
                  onToggleWishlist={toggleWishlist}
                  onAddToCart={addToCart}
                  cartQuantity={
                    cart.find((item) => item.id === product.id)?.quantity || 0
                  }
                  onUpdateQuantity={updateQuantity}
                  onRemoveFromCart={removeFromCart}
                />
              ))}
            </div>
          </div>
        </section>

        <BundleCTA onBuyBundle={addBundleToCart} />
        <Reviews />
      </main>

      <Footer />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cart}
        onPlaceOrder={handlePlaceOrder}
      />

      <Toast toasts={toasts} removeToast={removeToast} />

      <AnimatePresence>
        {successScreen && (
          <SuccessScreen orderId={orderId} onClose={handleSuccessClose} />
        )}
      </AnimatePresence>
    </div>
  );
}
