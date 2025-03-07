"use client"

import ScrollLink from './ScrollLink';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileCode, Badge, BookOpen, Menu, X } from 'lucide-react';

const MotionScrollLink = motion(ScrollLink);

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <Shield className="h-5 w-5" />,
    label: "Projects",
    href: "projects",
    gradient: "radial-gradient(circle, rgba(100,255,218,0.15) 0%, rgba(100,255,218,0.06) 50%, rgba(100,255,218,0) 100%)",
    iconColor: "text-[#64FFDA]",
  },
  {
    icon: <FileCode className="h-5 w-5" />,
    label: "Skills",
    href: "skills",
    gradient: "radial-gradient(circle, rgba(126,231,250,0.15) 0%, rgba(126,231,250,0.06) 50%, rgba(126,231,250,0) 100%)",
    iconColor: "text-[#64FFDA]",
  },
  {
    icon: <Badge className="h-5 w-5" />,
    label: "Certifications",
    href: "certifications",
    gradient: "radial-gradient(circle, rgba(149,197,252,0.15) 0%, rgba(149,197,252,0.06) 50%, rgba(149,197,252,0) 100%)",
    iconColor: "text-[#64FFDA]",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: "Blog",
    href: "blog",
    gradient: "radial-gradient(circle, rgba(187,162,253,0.15) 0%, rgba(187,162,253,0.06) 50%, rgba(187,162,253,0) 100%)",
    iconColor: "text-[#64FFDA]",
  },
];

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function CyberMenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Close menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.nav
      className="relative z-50"
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-[#64FFDA] z-50 relative"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-7 w-7" strokeWidth={2} />
        ) : (
          <Menu className="h-7 w-7" strokeWidth={2} />
        )}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <motion.div
          className="p-2 rounded-2xl bg-[#0A192F]/80 backdrop-blur-lg border border-[#64FFDA]/20 shadow-lg"
          initial="initial"
          whileHover="hover"
        >
          <ul className="flex items-center gap-2">
            {menuItems.map((item) => (
              <motion.li key={item.label} className="relative">
                <motion.div
                  className="block rounded-xl overflow-visible group relative"
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                >
                  <MotionScrollLink
                    to={item.href}
                    className="flex items-center gap-2 px-4 py-2 bg-transparent text-gray-300 group-hover:text-white transition-colors rounded-xl"
                  >
                    <span className={item.iconColor}>{item.icon}</span>
                    <span>{item.label}</span>
                  </MotionScrollLink>
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0A192F]/95 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeMenu}
          >
            <motion.div
              className="pt-20 px-4"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-md mx-auto space-y-4">
                {menuItems.map((item) => (
                  <ScrollLink
                    key={item.label}
                    to={item.href}
                    className="flex items-center gap-3 px-6 py-4 text-gray-300 hover:text-white transition-colors rounded-xl border border-[#64FFDA]/20"
                    onClick={closeMenu}
                  >
                    <span className={item.iconColor}>{item.icon}</span>
                    <span className="text-lg">{item.label}</span>
                    {item.label === "Blog" && (
                      <span className="ml-auto bg-[#64FFDA] text-[#0A192F] text-xs px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </ScrollLink>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}