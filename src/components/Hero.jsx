import { motion } from 'framer-motion';
import { ArrowRight, Package } from 'lucide-react';

export default function Hero({ onShopNow, onBuyBundle }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg to-brand-surface-light" />
      
      {/* Subtle gold accent glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-gold/3 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-block text-brand-gold text-xs sm:text-sm tracking-[0.2em] uppercase mb-6">
                Premium Everyday Carry
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] text-white mb-6"
            >
              Stay
              <br />
              <span className="text-brand-gold italic">Unbothered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-lg mb-10"
            >
              Crafted for those who demand more from their everyday essentials. 
              Military-grade materials meet uncompromising design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={onShopNow}
                className="group inline-flex items-center justify-center gap-3 bg-brand-gold text-brand-bg px-8 py-4 rounded-none text-sm font-semibold tracking-wide hover:bg-brand-gold-light transition-all duration-300"
              >
                Shop Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
              <button
                onClick={onBuyBundle}
                className="group inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 rounded-none text-sm font-medium tracking-wide hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
              >
                <Package size={16} />
                Buy Bundle
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10"
            >
              <div>
                <p className="font-playfair text-2xl sm:text-3xl text-white">10K+</p>
                <p className="text-xs text-brand-muted mt-1">Happy Customers</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="font-playfair text-2xl sm:text-3xl text-white">4.9</p>
                <p className="text-xs text-brand-muted mt-1">Average Rating</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="font-playfair text-2xl sm:text-3xl text-white">∞</p>
                <p className="text-xs text-brand-muted mt-1">Lifetime Warranty</p>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
              <div className="absolute inset-4 bg-brand-gold/10 rounded-sm" />
              <img
                src="/images/hero-product.jpg"
                alt="UNBOTHERED Premium Collection"
                className="relative w-full h-full object-cover rounded-sm"
              />
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -bottom-4 -left-4 sm:bottom-6 sm:left-6 bg-brand-surface-light border border-brand-border px-5 py-3 rounded-sm"
              >
                <p className="text-xs text-brand-muted">Starting from</p>
                <p className="font-playfair text-xl text-brand-gold">₹2,499</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
