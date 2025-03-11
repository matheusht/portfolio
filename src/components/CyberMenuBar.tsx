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
    label: "Articles",
    href: "articles",
    gradient: "radial-gradient(circle, rgba(187,162,253,0.15) 0%, rgba(187,162,253,0.06) 50%, rgba(187,162,253,0) 100%)",
    iconColor: "text-[#64FFDA]",
  },
];

// Animation variants remain the same
const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export function CyberMenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.nav className="relative z-50">
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

      {/* Desktop Menu with Glow Effects */}
      <div className="hidden md:block">
        <motion.div
          className="p-2 rounded-2xl bg-[#0A192F]/80 backdrop-blur-lg border border-[#64FFDA]/20 shadow-lg relative overflow-hidden"
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            className="absolute -inset-2 bg-gradient-radial from-transparent via-[#64FFDA]/20 to-transparent rounded-3xl z-0 pointer-events-none"
            variants={navGlowVariants}
          />
          
          <ul className="flex items-center gap-2 relative z-10">
            {menuItems.map((item) => (
              <motion.li key={item.label} className="relative">
                <motion.div
                  className="block rounded-xl overflow-visible group relative"
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                >
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    variants={glowVariants}
                    style={{
                      background: item.gradient,
                      opacity: 0,
                      borderRadius: "16px",
                    }}
                  />
                  
                  {/* Front Side */}
                  <MotionScrollLink
                    to={item.href}
                    className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-gray-300 group-hover:text-white transition-colors rounded-xl"
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                  >
                    <span className={`transition-colors duration-300 ${item.iconColor}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {item.label === "Articles" && (
                      <span className="absolute -top-2 -right-3 bg-[#64FFDA] text-[#0A192F] text-xs px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </MotionScrollLink>
                  
                  {/* Back Side */}
                  <MotionScrollLink
                    to={item.href}
                    className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-gray-300 group-hover:text-white transition-colors rounded-xl"
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                  >
                    <span className={`transition-colors duration-300 ${item.iconColor}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {item.label === "Articles" && (
                      <span className="absolute -top-2 -right-3 bg-[#64FFDA] text-[#0a192f] text-xs px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </MotionScrollLink>
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0A192F]/95 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          >
            <div className="pt-20 px-4" onClick={(e) => e.stopPropagation()}>
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
                    {item.label === "Articles" && (
                      <span className="ml-auto bg-[#64FFDA] text-[#0A192F] text-xs px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </ScrollLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}