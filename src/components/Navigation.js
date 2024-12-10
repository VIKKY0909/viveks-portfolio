import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaBrain, FaEnvelope } from 'react-icons/fa';

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home', color: '#4F46E5' },
    { path: '/about', icon: FaUser, label: 'About', color: '#7C3AED' },
    { path: '/projects', icon: FaCode, label: 'Projects', color: '#EC4899' },
    { path: '/skills', icon: FaBrain, label: 'Skills', color: '#8B5CF6' },
    { path: '/contact', icon: FaEnvelope, label: 'Contact', color: '#06B6D4' }
  ];

  const navStyles = isMobile ? {
    container: "fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-lg border-t border-white/10 px-6 py-4 z-50",
    list: "flex justify-around items-center max-w-md mx-auto",
    item: "relative"
  } : {
    container: "fixed left-8 top-1/2 -translate-y-1/2 z-50",
    list: "flex flex-col gap-8",
    item: "relative group"
  };

  return (
    <nav className={navStyles.container}>
      <ul className={navStyles.list}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <li key={item.path} className={navStyles.item}>
              <Link 
                to={item.path}
                onMouseEnter={() => !isMobile && setHoveredItem(item.path)}
                onMouseLeave={() => !isMobile && setHoveredItem(null)}
                className="relative block"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10"
                >
                  <Icon 
                    className={`text-2xl transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/50 hover:text-white'
                    }`}
                  />
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -inset-2 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>

                {/* Label for desktop */}
                {!isMobile && (
                  <AnimatePresence>
                    {hoveredItem === item.path && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-900/90 
                                 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10"
                        style={{
                          boxShadow: `0 0 20px ${item.color}40`,
                          minWidth: '100px'
                        }}
                      >
                        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 
                                    w-2 h-2 bg-gray-900/90 border-l border-b border-white/10 
                                    transform rotate-45" />
                        <p className="text-white whitespace-nowrap font-medium">
                          {item.label}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)`,
                    filter: 'blur(8px)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: isActive ? [0.5, 0.7, 0.5] : [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation; 