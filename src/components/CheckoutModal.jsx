import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  ArrowRight,
  Truck,
  ShieldCheck,
} from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onPlaceOrder,
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 2499 ? 0 : 99;
  const total = subtotal + shipping;

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'card', label: 'Card', icon: CreditCard },
    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = 'Enter valid 10-digit number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter valid email';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^[0-9]{6}$/.test(formData.pincode))
      newErrors.pincode = 'Enter valid 6-digit pincode';

    if (paymentMethod === 'upi' && !upiId.trim())
      newErrors.upiId = 'UPI ID is required';
    if (paymentMethod === 'card') {
      if (!cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!cardExpiry.trim()) newErrors.cardExpiry = 'Expiry is required';
      if (!cardCvv.trim()) newErrors.cardCvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onPlaceOrder({
        ...formData,
        paymentMethod,
        upiId: paymentMethod === 'upi' ? upiId : undefined,
        cardNumber: paymentMethod === 'card' ? cardNumber : undefined,
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[70] bg-brand-surface-light border border-brand-border rounded-sm w-full sm:w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-brand-surface-light border-b border-brand-border">
              <div>
                <h2 className="font-playfair text-xl text-white">Checkout</h2>
                <p className="text-xs text-brand-muted mt-1">
                  Complete your order securely
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Shipping Details */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4 tracking-wide flex items-center gap-2">
                  <Truck size={15} className="text-brand-gold" />
                  Shipping Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { field: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                    { field: 'phone', label: 'Phone Number', type: 'tel', placeholder: '9876543210' },
                    { field: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com', colSpan: true },
                    { field: 'address', label: 'Address', type: 'text', placeholder: '123, Main Street', colSpan: true },
                    { field: 'city', label: 'City', type: 'text', placeholder: 'Mumbai' },
                    { field: 'pincode', label: 'Pincode', type: 'text', placeholder: '400001' },
                  ].map(({ field, label, type, placeholder, colSpan }) => (
                    <div key={field} className={colSpan ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs text-brand-muted mb-1.5">
                        {label}
                      </label>
                      <input
                        type={type}
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        placeholder={placeholder}
                        className={`w-full bg-brand-bg border rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors ${
                          errors[field]
                            ? 'border-red-500/50'
                            : 'border-brand-border'
                        }`}
                      />
                      {errors[field] && (
                        <p className="text-xs text-red-400 mt-1">{errors[field]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4 tracking-wide flex items-center gap-2">
                  <CreditCard size={15} className="text-brand-gold" />
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-sm border transition-all duration-300 ${
                          isSelected
                            ? 'border-brand-gold bg-brand-gold/10'
                            : 'border-brand-border bg-brand-bg hover:border-white/20'
                        }`}
                      >
                        <Icon
                          size={20}
                          className={
                            isSelected ? 'text-brand-gold' : 'text-white/40'
                          }
                        />
                        <span
                          className={`text-xs ${
                            isSelected ? 'text-brand-gold' : 'text-white/50'
                          }`}
                        >
                          {method.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Conditional fields */}
                <AnimatePresence mode="wait">
                  {paymentMethod === 'upi' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <label className="block text-xs text-brand-muted mb-1.5">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          if (errors.upiId)
                            setErrors((p) => {
                              const n = { ...p };
                              delete n.upiId;
                              return n;
                            });
                        }}
                        placeholder="yourname@upi"
                        className={`w-full bg-brand-bg border rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors ${
                          errors.upiId
                            ? 'border-red-500/50'
                            : 'border-brand-border'
                        }`}
                      />
                      {errors.upiId && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.upiId}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs text-brand-muted mb-1.5">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => {
                              setCardNumber(e.target.value);
                              if (errors.cardNumber)
                                setErrors((p) => {
                                  const n = { ...p };
                                  delete n.cardNumber;
                                  return n;
                                });
                            }}
                            placeholder="1234 5678 9012 3456"
                            className={`w-full bg-brand-bg border rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors ${
                              errors.cardNumber
                                ? 'border-red-500/50'
                                : 'border-brand-border'
                            }`}
                          />
                          {errors.cardNumber && (
                            <p className="text-xs text-red-400 mt-1">
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-brand-muted mb-1.5">
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => {
                                setCardExpiry(e.target.value);
                                if (errors.cardExpiry)
                                  setErrors((p) => {
                                    const n = { ...p };
                                    delete n.cardExpiry;
                                    return n;
                                  });
                              }}
                              placeholder="12/26"
                              className={`w-full bg-brand-bg border rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors ${
                                errors.cardExpiry
                                  ? 'border-red-500/50'
                                  : 'border-brand-border'
                              }`}
                            />
                            {errors.cardExpiry && (
                              <p className="text-xs text-red-400 mt-1">
                                {errors.cardExpiry}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs text-brand-muted mb-1.5">
                              CVV
                            </label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => {
                                setCardCvv(e.target.value);
                                if (errors.cardCvv)
                                  setErrors((p) => {
                                    const n = { ...p };
                                    delete n.cardCvv;
                                    return n;
                                  });
                              }}
                              placeholder="123"
                              maxLength={4}
                              className={`w-full bg-brand-bg border rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold/50 transition-colors ${
                                errors.cardCvv
                                  ? 'border-red-500/50'
                                  : 'border-brand-border'
                              }`}
                            />
                            {errors.cardCvv && (
                              <p className="text-xs text-red-400 mt-1">
                                {errors.cardCvv}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="p-5 bg-brand-bg border border-brand-border/50 rounded-sm">
                <h3 className="text-sm font-semibold text-white mb-4 tracking-wide flex items-center gap-2">
                  <ShieldCheck size={15} className="text-brand-gold" />
                  Order Summary
                </h3>
                <div className="space-y-2.5 mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-white/70">
                        {item.name}{' '}
                        <span className="text-brand-muted">
                          x{item.quantity}
                        </span>
                      </span>
                      <span className="text-white">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-muted">Subtotal</span>
                    <span className="text-white">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-muted">Shipping</span>
                    <span
                      className={
                        shipping === 0 ? 'text-brand-gold' : 'text-white'
                      }
                    >
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold pt-3 border-t border-white/10">
                    <span className="text-white">Total</span>
                    <span className="text-brand-gold">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="group w-full inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-bg py-4 text-sm font-semibold tracking-wide hover:bg-brand-gold-light transition-colors duration-300"
              >
                {paymentMethod === 'cod' ? (
                  <>
                    Place Order
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </>
                ) : (
                  <>
                    Pay & Place Order
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
