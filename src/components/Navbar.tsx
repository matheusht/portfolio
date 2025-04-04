import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, FolderGit2, FileText } from 'lucide-react';

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Projects", path: "/projects", icon: FolderGit2 },
  { name: "Blog", path: "/blog", icon: BookOpen },
  { name: "Resume", path: "/resume", icon: FileText },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      // Update the last scroll position
      lastScrollY.current = currentScrollY;
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-[#0A192F]/80 backdrop-blur-lg border-b border-[#64FFDA]/20 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 text-sm font-mono transition-colors ${
                    isActive ? 'text-[#64FFDA]' : 'text-gray-400 hover:text-[#64FFDA]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;