import { motion } from 'framer-motion';
import { Truck, Shield, CreditCard } from 'lucide-react';

export default function AnnouncementBar() {
  const items = [
    { icon: Truck, text: 'Free Shipping' },
    { icon: CreditCard, text: 'COD Available' },
    { icon: Shield, text: 'Lifetime Warranty' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-brand-surface border-b border-brand-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 sm:gap-10 py-2.5">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon size={13} className="text-brand-gold" />
              <span className="text-xs sm:text-sm text-white/70 tracking-wide">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
