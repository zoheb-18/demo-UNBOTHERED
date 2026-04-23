import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Truck, ArrowRight } from 'lucide-react';

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const freeShippingThreshold = 2499;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 bottom-0 z-[60] w-full max-w-md bg-brand-surface-light border-l border-brand-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-brand-gold" />
                <h2 className="font-playfair text-xl text-white">Your Cart</h2>
                <span className="text-xs text-brand-muted">
                  ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <ShoppingBag
                    size={48}
                    className="text-white/10 mb-4"
                    strokeWidth={1}
                  />
                  <p className="text-white/50 text-sm mb-2">Your cart is empty</p>
                  <p className="text-brand-muted text-xs">
                    Add some premium essentials to get started
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <AnimatePresence mode="popLayout">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 p-4 bg-brand-bg border border-brand-border/50 rounded-sm"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-sm shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium text-white truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-white/30 hover:text-red-400 transition-colors shrink-0"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-brand-muted mt-1">
                            ₹{item.price.toLocaleString()}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 bg-brand-surface-light border border-brand-border rounded-sm">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1.5 text-white/50 hover:text-white transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-medium text-white w-5 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-1.5 text-white/50 hover:text-white transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="text-sm font-semibold text-white">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 border-t border-brand-border bg-brand-bg"
              >
                {/* Shipping notice */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-brand-surface-light border border-brand-border/50 rounded-sm">
                  <Truck size={14} className="text-brand-gold" />
                  <p className="text-xs text-brand-muted">
                    {shipping === 0 ? (
                      <span className="text-brand-gold">
                        You qualify for free shipping!
                      </span>
                    ) : (
                      <>
                        Add ₹{(freeShippingThreshold - subtotal).toLocaleString()}{' '}
                        more for free shipping
                      </>
                    )}
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-muted">Subtotal</span>
                    <span className="text-white">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-muted">Shipping</span>
                    <span className={shipping === 0 ? 'text-brand-gold' : 'text-white'}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold pt-3 border-t border-white/10">
                    <span className="text-white">Total</span>
                    <span className="text-white">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="group w-full inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-bg py-4 text-sm font-semibold tracking-wide hover:bg-brand-gold-light transition-colors duration-300"
                >
                  Proceed to Checkout
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
