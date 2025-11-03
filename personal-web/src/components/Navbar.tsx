import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', href: '#home', icon: '🏠', delay: 0 },
    { name: 'About', href: '#about', icon: '👨‍💻', delay: 0.1 },
    { name: 'Journey', href: '#journey', icon: '🚀', delay: 0.2 },
    { name: 'Projects', href: '#projects', icon: '💼', delay: 0.3 },
    { name: 'Contact', href: '#contact', icon: '📧', delay: 0.4 },
  ];

  // Initialize position on mount
  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: window.innerWidth - 120,
        y: window.innerHeight - 120,
      });
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Constrain within viewport
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, dragStart]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Small delay to allow animation before scrolling
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div 
        className="fixed z-50 transition-none"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {/* Navigation buttons - appear when menu is open */}
        <div 
          className={`
            absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-4
            ${position.y < 400 ? 'top-20' : '-top-[400px]'}
          `}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`
                flex items-center gap-3 group
                transform transition-all duration-300 ease-out
                ${isOpen 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-20 opacity-0 pointer-events-none'
                }
              `}
              style={{ 
                transitionDelay: isOpen ? `${link.delay}s` : '0s',
              }}
            >
              {/* Icon button */}
              <div className="
                w-12 h-12 rounded-full bg-white dark:bg-black border-2 border-neon-blue-500
                flex items-center justify-center text-xl
                hover:shadow-neon hover:scale-110 transition-all duration-300
                cursor-pointer relative group
              ">
                {link.icon}
                {/* Button label - appears on hover */}
                <span className="
                  absolute left-1/2 -translate-x-1/2 -top-10
                  bg-neon-blue-500 text-black px-3 py-1 rounded-lg font-semibold text-xs
                  opacity-0 group-hover:opacity-100 transform group-hover:-translate-y-1
                  transition-all duration-300 whitespace-nowrap shadow-neon pointer-events-none
                ">
                  {link.name}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`
            absolute -left-20 top-1/2 -translate-y-1/2
            w-12 h-12 rounded-full 
            bg-neon-blue-500 text-black
            flex items-center justify-center
            shadow-neon hover:shadow-neon-lg
            transition-all duration-300
            transform hover:scale-110 active:scale-95
            select-none
          `}
          aria-label="Toggle Theme"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        {/* Main FAB button */}
        <button
          onMouseDown={handleMouseDown}
          onClick={() => {
            // Only toggle menu if not dragging
            if (!isDragging) {
              setIsOpen(!isOpen);
            }
          }}
          className={`
            w-16 h-16 rounded-full 
            bg-neon-blue-500 text-black
            flex items-center justify-center
            shadow-neon-lg hover:shadow-neon
            transition-all duration-300
            transform hover:scale-110 active:scale-95
            ${isOpen ? 'rotate-45' : 'rotate-0'}
            select-none
          `}
          aria-label="Navigation Menu"
        >
          <svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>

        {/* Background overlay when menu is open */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default Navbar;
