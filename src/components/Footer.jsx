import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Camera, MessageSquare, Play } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const brandLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Our Story', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ];

  const shopLinks = [
    { label: 'All Products', href: '#products' },
    { label: 'H-Series Clip Holder', href: '#products' },
    { label: 'UB Slim Wallet', href: '#products' },
    { label: 'Gift Cards', href: '#' },
  ];

  const supportLinks = [
    { label: 'Contact Us', href: '#' },
    { label: 'Shipping Info', href: '#' },
    { label: 'Returns & Exchanges', href: '#' },
    { label: 'Warranty', href: '#' },
    { label: 'FAQ', href: '#' },
  ];

  return (
    <footer id="footer" className="bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3 className="font-playfair text-2xl text-white tracking-wider mb-4">
              UNBOTHERED
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed mb-6 max-w-xs">
              Premium everyday carry for those who refuse to compromise. 
              Built to last a lifetime.
            </p>
            <div className="flex items-center gap-4">
              {[Camera, MessageSquare, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center border border-brand-border rounded-full text-white/40 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wide">
              Brand
            </h4>
            <ul className="space-y-3">
              {brandLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Shop Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wide">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wide">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-brand-muted">
                <Mail size={14} className="text-brand-gold shrink-0" />
                <span>hello@unbothered.in</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-brand-muted">
                <Phone size={14} className="text-brand-gold shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-brand-muted">
                <MapPin size={14} className="text-brand-gold shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            &copy; {currentYear} UNBOTHERED. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-brand-muted hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-brand-muted hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-brand-muted hover:text-white transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
