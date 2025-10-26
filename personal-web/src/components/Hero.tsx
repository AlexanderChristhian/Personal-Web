import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Hero() {
  const interests = [
    "Software Development",
    "Hardware Engineering",
    "Network Systems"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.2, false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % interests.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [interests.length]);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid py-16 sm:py-20"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue-500 rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              willChange: 'transform'
            }}
          />
        ))}
      </div>
      
      <div 
        ref={contentRef as React.RefObject<HTMLDivElement>}
        className={`relative z-10 px-4 max-w-6xl mx-auto w-full transition-all duration-1000 ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Photo Section */}
          <div className="flex justify-center order-1 md:order-2">
            <div 
              className="relative transition-transform duration-300 ease-out w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${mousePosition.y * -10}deg)`
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Hexagonal grid background with pulse */}
              <div className={`absolute inset-0 opacity-20 transition-opacity duration-300 ${isHovering ? 'opacity-40' : 'opacity-20'}`}>
                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hexagons" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <polygon points="10,0 15,5 15,15 10,20 5,15 5,5" fill="none" stroke="#00a3ff" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#hexagons)" />
                </svg>
              </div>
              
              {/* Rotating border effect with enhanced animation */}
              <div 
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue-500 via-neon-blue-300 to-neon-blue-500 blur-md transition-all duration-300 ${isHovering ? 'opacity-100 scale-110' : 'opacity-75 scale-100'}`}
                style={{ 
                  animation: 'spin 3s linear infinite',
                }}
              ></div>
              
              <div className={`relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-neon-blue-500 shadow-neon transition-all duration-500 ${isHovering ? 'scale-105 shadow-neon-lg' : 'scale-100'}`}>
                <img 
                  src="/Foto_Personal.jpg" 
                  alt="Profile" 
                  loading="eager"
                  className={`w-full h-full object-cover transition-transform duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`}
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
                {/* Scanline effect on hover */}
                {isHovering && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue-500/20 to-transparent animate-pulse" style={{ animation: 'slideDown 2s ease-in-out infinite' }}></div>
                )}
              </div>
              
              {/* Floating code brackets with 3D effect */}
              <div 
                className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 text-xl sm:text-2xl md:text-4xl neon-text animate-pulse font-mono"
              >&lt;/&gt;</div>
              <div 
                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 text-xl sm:text-2xl md:text-4xl neon-text animate-pulse font-mono" 
                style={{ animationDelay: '1s' }}
              >{ }</div>
              
              {/* Binary code streams with flow animation - hidden on mobile */}
              <div 
                className="absolute -right-16 top-10 opacity-30 text-neon-blue-500 text-xs font-mono hidden md:block"
                style={{ animation: 'float 3s ease-in-out infinite' }}
              >
                <div className="animate-pulse">01010011</div>
                <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>01001111</div>
                <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>01000110</div>
              </div>
              
              <div 
                className="absolute -left-16 bottom-10 opacity-30 text-neon-blue-500 text-xs font-mono hidden md:block" 
                style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1.5s' }}
              >
                <div className="animate-pulse">01001000</div>
                <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>01010111</div>
                <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>01001110</div>
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4">
              <span className="text-white">Greetings, I'm </span>
              <span className="neon-text">Alexander Christhian</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-4 sm:mb-6">
              Computer Engineering Student
            </h2>
            
            {/* Animated switching text */}
            <div className="mb-6 sm:mb-8 min-h-[60px] sm:min-h-[80px] md:min-h-[80px] flex items-center justify-center md:justify-start">
              <div className="relative flex flex-wrap items-center justify-center md:justify-start gap-x-2">
                <span className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-400">Passionate about</span>
                <span 
                  className={`
                    text-sm sm:text-base md:text-lg lg:text-2xl font-bold
                    neon-text
                    transition-all duration-500 transform inline-block
                    ${isAnimating 
                      ? 'opacity-0 -translate-y-4 scale-90' 
                      : 'opacity-100 translate-y-0 scale-100'
                    }
                  `}
                  style={{
                    textShadow: isAnimating 
                      ? 'none' 
                      : '0 0 10px rgba(0, 163, 255, 0.8), 0 0 20px rgba(0, 163, 255, 0.6), 0 0 30px rgba(0, 163, 255, 0.4)',
                    filter: isAnimating ? 'blur(4px)' : 'blur(0px)'
                  }}
                >
                  {interests[currentIndex]}
                </span>
                {/* Animated underline */}
                <div 
                  className={`
                    absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-neon-blue-500 to-transparent
                    transition-all duration-500
                    ${isAnimating ? 'w-0 opacity-0' : 'w-full opacity-100'}
                  `}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8">
              <a 
                href="#projects" 
                className="group px-6 sm:px-8 py-3 bg-neon-blue-500 text-black font-semibold rounded-lg hover:shadow-neon transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden text-center"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue-400 to-neon-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#contact" 
                className="group px-6 sm:px-8 py-3 border-2 border-neon-blue-500 text-neon-blue-500 font-semibold rounded-lg hover:bg-neon-blue-500 hover:text-black transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden text-center"
              >
                <span className="relative z-10">Contact Me</span>
                <div className="absolute inset-0 bg-neon-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
