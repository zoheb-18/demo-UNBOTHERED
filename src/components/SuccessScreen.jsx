import { motion } from 'framer-motion';
import { CheckCircle2, Package, Truck, Clock, Mail } from 'lucide-react';

export default function SuccessScreen({ orderId, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[80] bg-brand-bg flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-8 flex items-center justify-center bg-brand-gold/10 rounded-full border border-brand-gold/30"
        >
          <CheckCircle2 size={40} className="text-brand-gold" />
        </motion.div>

        <h2 className="font-playfair text-3xl sm:text-4xl text-white mb-3">
          Order Confirmed
        </h2>
        <p className="text-brand-muted mb-8 leading-relaxed">
          Thank you for choosing UNBOTHERED. Your order has been placed 
          successfully and is being processed.
        </p>

        <div className="bg-brand-surface border border-brand-border rounded-sm p-6 mb-8">
          <p className="text-xs text-brand-muted uppercase tracking-wider mb-2">
            Order ID
          </p>
          <p className="font-mono text-lg text-brand-gold tracking-wider">
            {orderId}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: Package, label: 'Packed', sub: 'In 24h' },
            { icon: Truck, label: 'Shipped', sub: '3-5 Days' },
            { icon: Clock, label: 'Delivered', sub: 'At Door' },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-brand-surface border border-brand-border rounded-full">
                <step.icon size={16} className="text-brand-gold" />
              </div>
              <div>
                <p className="text-xs text-white font-medium">{step.label}</p>
                <p className="text-[10px] text-brand-muted">{step.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-brand-muted mb-8">
          <Mail size={14} className="text-brand-gold" />
          <span>A confirmation email has been sent to you</span>
        </div>

        <button
          onClick={onClose}
          className="inline-flex items-center justify-center bg-brand-gold text-brand-bg px-10 py-3.5 text-sm font-semibold tracking-wide hover:bg-brand-gold-light transition-colors duration-300"
        >
          Continue Shopping
        </button>
      </motion.div>
    </motion.div>
  );
}
