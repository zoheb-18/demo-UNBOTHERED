import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, ShoppingCart, Eye, Plus, Minus, X } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  cartQuantity,
  onUpdateQuantity,
  onRemoveFromCart,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group bg-brand-bg border border-brand-border/50 rounded-sm overflow-hidden hover:border-brand-gold/30 transition-all duration-500"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-surface">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-brand-surface animate-pulse" />
          )}
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-block px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${
                product.badge === 'BESTSELLER'
                  ? 'bg-brand-gold text-brand-bg'
                  : 'bg-white text-brand-bg'
              }`}
            >
              {product.badge}
            </span>
          </div>

          {/* Wishlist */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onToggleWishlist(product.id)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-brand-bg/80 backdrop-blur-sm rounded-full border border-white/10 hover:border-brand-gold/50 transition-colors duration-300"
          >
            <Heart
              size={15}
              className={`transition-colors duration-300 ${
                isWishlisted
                  ? 'text-red-400 fill-red-400'
                  : 'text-white/60 hover:text-white'
              }`}
            />
          </motion.button>

          {/* Discount badge */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-2.5 py-1 bg-brand-bg/80 backdrop-blur-sm text-[10px] font-semibold text-brand-gold tracking-wide">
              {discount}% OFF
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < Math.floor(product.rating)
                      ? 'text-brand-gold fill-brand-gold'
                      : 'text-white/20'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-brand-muted">
              {product.rating} ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Name */}
          <h3 className="font-playfair text-lg sm:text-xl text-white mb-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-brand-muted leading-relaxed mb-5 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-xl font-semibold text-white">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-sm text-brand-muted line-through">
              ₹{product.mrp.toLocaleString()}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {cartQuantity > 0 ? (
              <div className="flex-1 flex items-center justify-between bg-brand-surface border border-brand-border rounded-sm px-3 py-2.5">
                <button
                  onClick={() => onUpdateQuantity(product.id, cartQuantity - 1)}
                  className="p-1 text-white/60 hover:text-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-medium text-white">{cartQuantity}</span>
                <button
                  onClick={() => onUpdateQuantity(product.id, cartQuantity + 1)}
                  className="p-1 text-white/60 hover:text-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-bg py-2.5 rounded-sm text-sm font-semibold hover:bg-brand-gold-light transition-colors duration-300"
              >
                <ShoppingCart size={15} />
                Add to Cart
              </button>
            )}
            <button
              onClick={() => setShowDetails(true)}
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/70 py-2.5 px-4 rounded-sm text-sm hover:border-brand-gold/50 hover:text-brand-gold transition-all duration-300"
            >
              <Eye size={15} />
              <span className="hidden sm:inline">Details</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-surface-light border border-brand-border rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-video object-cover"
                />
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-brand-bg/80 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-block px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${
                      product.badge === 'BESTSELLER'
                        ? 'bg-brand-gold text-brand-bg'
                        : 'bg-white text-brand-bg'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
                <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-3">
                  {product.name}
                </h2>
                <p className="text-brand-muted leading-relaxed mb-6">
                  {product.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 tracking-wide">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-brand-muted"
                      >
                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl font-semibold text-white">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-base text-brand-muted line-through">
                    ₹{product.mrp.toLocaleString()}
                  </span>
                  <span className="text-sm text-brand-gold font-medium">
                    {discount}% OFF
                  </span>
                </div>

                {cartQuantity > 0 ? (
                  <div className="flex items-center justify-between bg-brand-bg border border-brand-border rounded-sm px-4 py-3">
                    <button
                      onClick={() => onUpdateQuantity(product.id, cartQuantity - 1)}
                      className="p-1.5 text-white/60 hover:text-white transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-base font-medium text-white">
                      {cartQuantity} in cart
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, cartQuantity + 1)}
                      className="p-1.5 text-white/60 hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      setShowDetails(false);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-bg py-3.5 rounded-sm text-sm font-semibold hover:bg-brand-gold-light transition-colors duration-300"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
