import { motion } from 'framer-motion';
import { Package, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function BundleCTA({ onBuyBundle }) {
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const totalMrp = products.reduce((sum, p) => sum + p.mrp, 0);
  const savings = totalMrp - totalPrice;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden bg-brand-surface-light border border-brand-border/50 rounded-sm"
        >
          {/* Gold accent strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

          <div className="p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="inline-flex items-center gap-2 text-brand-gold text-xs tracking-[0.2em] uppercase mb-4">
                    <Package size={14} />
                    Exclusive Bundle
                  </span>
                  <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
                    The Complete
                    <br />
                    <span className="text-brand-gold italic">Unbothered</span> Set
                  </h2>
                  <p className="text-brand-muted leading-relaxed max-w-md mb-8">
                    Own both our flagship products at an exclusive bundle price. 
                    The H-Series Clip Holder and UB Slim Wallet — engineered to 
                    complement each other perfectly.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                >
                  <button
                    onClick={onBuyBundle}
                    className="group inline-flex items-center gap-3 bg-brand-gold text-brand-bg px-8 py-4 text-sm font-semibold tracking-wide hover:bg-brand-gold-light transition-all duration-300"
                  >
                    Add Bundle to Cart
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-semibold text-white">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-brand-muted line-through">
                      ₹{totalMrp.toLocaleString()}
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-xs text-brand-gold mt-3"
                >
                  You save ₹{savings.toLocaleString()} with this bundle
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="relative aspect-square bg-brand-bg border border-brand-border/30 rounded-sm overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-brand-bg to-transparent">
                        <p className="text-xs text-white font-medium truncate">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
