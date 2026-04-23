import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '../data/products';

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-brand-gold text-xs tracking-[0.2em] uppercase">
            Testimonials
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl text-white mt-4">
            What They Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative p-6 sm:p-8 bg-brand-surface border border-brand-border/50 rounded-sm hover:border-brand-gold/20 transition-all duration-500"
            >
              <Quote
                size={28}
                className="text-brand-gold/20 mb-4"
                strokeWidth={1}
              />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className="text-brand-gold fill-brand-gold"
                  />
                ))}
              </div>

              <p className="text-sm text-white/80 leading-relaxed mb-6">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-gold/10 rounded-full text-brand-gold text-xs font-bold">
                  {review.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{review.name}</p>
                  <p className="text-xs text-brand-muted">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
