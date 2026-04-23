import { motion } from 'framer-motion';
import { Shield, Truck, CreditCard, Gem } from 'lucide-react';
import { features } from '../data/products';

const iconMap = {
  1: Shield,
  2: Truck,
  3: CreditCard,
  4: Gem,
};

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-brand-gold text-xs tracking-[0.2em] uppercase">
            Why Choose Us
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl text-white mt-4">
            Built Different
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.id];
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group p-6 sm:p-8 bg-brand-bg border border-brand-border/50 rounded-sm hover:border-brand-gold/30 transition-all duration-500"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-brand-gold/10 rounded-sm mb-6 group-hover:bg-brand-gold/20 transition-colors duration-500">
                  <Icon size={22} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-white mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
