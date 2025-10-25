import { useState, useEffect, useRef } from 'react';

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid"
    >
      {/* Animated background circles with parallax - lower opacity */}
      <div 
        className="absolute top-20 left-20 w-72 h-72 bg-neon-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-[0.02] animate-pulse-slow transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
        }}
      ></div>
      <div 
        className="absolute bottom-20 right-20 w-72 h-72 bg-neon-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-[0.02] animate-pulse-slow animation-delay-2000 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
        }}
      ></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue-500 rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translate(${mousePosition.x * (i * 2)}px, ${mousePosition.y * (i * 2)}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo Section */}
          <div className="flex justify-center order-1 md:order-2">
            <div 
              className="relative transition-transform duration-300 ease-out"
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
              
              <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-neon-blue-500 shadow-neon transition-all duration-500 ${isHovering ? 'scale-105 shadow-neon-lg' : 'scale-100'}`}>
                <img 
                  src="/Foto_Personal.jpg" 
                  alt="Profile" 
                  className={`w-full h-full object-cover transition-transform duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`}
                />
                {/* Scanline effect on hover */}
                {isHovering && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue-500/20 to-transparent animate-pulse" style={{ animation: 'slideDown 2s ease-in-out infinite' }}></div>
                )}
              </div>
              
              {/* Floating code brackets with 3D effect */}
              <div 
                className="absolute -top-2 -left-2 text-3xl md:text-4xl neon-text animate-pulse font-mono transition-transform duration-300"
                style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
              >&lt;/&gt;</div>
              <div 
                className="absolute -bottom-2 -right-2 text-3xl md:text-4xl neon-text animate-pulse font-mono transition-transform duration-300" 
                style={{ 
                  animationDelay: '1s',
                  transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
                }}
              >{ }</div>
              
              {/* Binary code streams with flow animation */}
              <div 
                className="absolute -right-16 top-10 opacity-30 text-neon-blue-500 text-xs font-mono transition-all duration-300"
                style={{ 
                  animation: 'float 3s ease-in-out infinite',
                  transform: `translateY(${mousePosition.y * 20}px)`
                }}
              >
                <div className="animate-pulse">01010011</div>
                <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>01001111</div>
                <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>01000110</div>
              </div>
              
              <div 
                className="absolute -left-16 bottom-10 opacity-30 text-neon-blue-500 text-xs font-mono transition-all duration-300" 
                style={{ 
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: '1.5s',
                  transform: `translateY(${mousePosition.y * -20}px)`
                }}
              >
                <div className="animate-pulse">01001000</div>
                <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>01010111</div>
                <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>01001110</div>
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-white">Greetings, I'm </span>
              <span className="neon-text">Alexander Christhian</span>
            </h1>
            <h2 className="text-2xl md:text-4xl text-gray-300 mb-6">
              Computer Engineering Student
            </h2>
            
            {/* Animated switching text */}
            <div className="mb-8 h-16 md:h-20 flex items-center justify-center md:justify-start">
              <div className="relative">
                <span className="text-lg md:text-2xl text-gray-400 mr-3">Passionate about</span>
                <span 
                  className={`
                    text-lg md:text-2xl font-bold
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

            <div className="flex justify-center md:justify-start gap-4 mt-8">
              <a 
                href="#projects" 
                className="group px-8 py-3 bg-neon-blue-500 text-black font-semibold rounded-lg hover:shadow-neon transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue-400 to-neon-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#contact" 
                className="group px-8 py-3 border-2 border-neon-blue-500 text-neon-blue-500 font-semibold rounded-lg hover:bg-neon-blue-500 hover:text-black transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
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
