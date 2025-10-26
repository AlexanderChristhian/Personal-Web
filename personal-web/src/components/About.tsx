import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function About() {
  const [activeCategory, setActiveCategory] = useState("Programming Languages");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.3, false);
  const { ref: introRef, isVisible: introVisible } = useScrollAnimation(0.3, false);
  const { ref: categoriesRef, isVisible: categoriesVisible } = useScrollAnimation(0.2, false);
  const { ref: tabsRef, isVisible: tabsVisible } = useScrollAnimation(0.2, false);
  const { ref: techGridRef, isVisible: techGridVisible } = useScrollAnimation(0.1, false);

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
  
  const techStack = {
    "Programming Languages": [
      { name: "C", icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    ],
    "Frontend": [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
    ],
    "Backend & Database": [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      { name: "NeonDB", icon: "https://avatars.githubusercontent.com/u/77690634?s=200&v=4" },
      { name: "Cloudinary", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Cloudinary_logo.svg" },
    ],
    "DevOps & Cloud": [
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
      { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg" },
      { name: "Alibaba Cloud", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b3/AlibabaCloudLogo.svg" },
    ],
    "Hardware & FPGA": [
      { name: "VHDL", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'%3E%3Cpath fill='%2300a3ff' d='M378.04 424.23H133.96c-26.104 0-47.462-21.357-47.462-47.461v-244.08c0-26.105 21.358-47.462 47.462-47.462h244.08c26.104 0 47.462 21.357 47.462 47.461v244.08c0 26.105-21.358 47.462-47.462 47.462m-39.847-253.059H177.9v160.294h160.294zM182.351 0H152.5v71.768h29.85zm59.879 0h-29.851v71.768h29.85zm59.88 0h-29.851v71.768h29.85zm59.879 0h-29.851v71.768h29.85zM73.039 329.684H0v29.851h73.04zm0-59.878H0v29.85h73.04zm0-59.88H0v29.85h73.04zm0-59.88H0v29.851h73.04zM512 329.684h-73.04v29.851H512zm0-59.878h-73.04v29.85H512zm0-59.88h-73.04v29.85H512zm0-59.88h-73.04v29.851H512zM182.35 440.232H152.5V512h29.85zm59.88 0h-29.851V512h29.85zm59.879 0h-29.851V512h29.85zm59.88 0h-29.851V512h29.85zM151.55 128.902c0-12.272-13.376-19.983-24.018-13.847c-10.643 6.135-10.643 21.557 0 27.693s24.018-1.576 24.018-13.847'/%3E%3C/svg%3E" },
      { name: "Assembly", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'%3E%3Cpath fill='%2300a3ff' d='M378.04 424.23H133.96c-26.104 0-47.462-21.357-47.462-47.461v-244.08c0-26.105 21.358-47.462 47.462-47.462h244.08c26.104 0 47.462 21.357 47.462 47.461v244.08c0 26.105-21.358 47.462-47.462 47.462m-39.847-253.059H177.9v160.294h160.294zM182.351 0H152.5v71.768h29.85zm59.879 0h-29.851v71.768h29.85zm59.88 0h-29.851v71.768h29.85zm59.879 0h-29.851v71.768h29.85zM73.039 329.684H0v29.851h73.04zm0-59.878H0v29.85h73.04zm0-59.88H0v29.85h73.04zm0-59.88H0v29.851h73.04zM512 329.684h-73.04v29.851H512zm0-59.878h-73.04v29.85H512zm0-59.88h-73.04v29.85H512zm0-59.88h-73.04v29.851H512zM182.35 440.232H152.5V512h29.85zm59.88 0h-29.851V512h29.85zm59.879 0h-29.851V512h29.85zm59.88 0h-29.851V512h29.85zM151.55 128.902c0-12.272-13.376-19.983-24.018-13.847c-10.643 6.135-10.643 21.557 0 27.693s24.018-1.576 24.018-13.847'/%3E%3C/svg%3E" },
      { name: "Proteus", icon: "https://upload.wikimedia.org/wikipedia/en/5/5a/Proteus_Design_Suite_Atom_Logo.png" },
      { name: "Vivado", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'%3E%3Cpath fill='%2300a3ff' d='M378.04 424.23H133.96c-26.104 0-47.462-21.357-47.462-47.461v-244.08c0-26.105 21.358-47.462 47.462-47.462h244.08c26.104 0 47.462 21.357 47.462 47.461v244.08c0 26.105-21.358 47.462-47.462 47.462m-39.847-253.059H177.9v160.294h160.294zM182.351 0H152.5v71.768h29.85zm59.879 0h-29.851v71.768h29.85zm59.88 0h-29.851v71.768h29.85zm59.879 0h-29.851v71.768h29.85zM73.039 329.684H0v29.851h73.04zm0-59.878H0v29.85h73.04zm0-59.88H0v29.85h73.04zm0-59.88H0v29.851h73.04zM512 329.684h-73.04v29.851H512zm0-59.878h-73.04v29.85H512zm0-59.88h-73.04v29.85H512zm0-59.88h-73.04v29.851H512zM182.35 440.232H152.5V512h29.85zm59.88 0h-29.851V512h29.85zm59.879 0h-29.851V512h29.85zm59.88 0h-29.851V512h29.85zM151.55 128.902c0-12.272-13.376-19.983-24.018-13.847c-10.643 6.135-10.643 21.557 0 27.693s24.018-1.576 24.018-13.847'/%3E%3C/svg%3E" },
      { name: "Quartus Prime", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'%3E%3Cpath fill='%2300a3ff' d='M378.04 424.23H133.96c-26.104 0-47.462-21.357-47.462-47.461v-244.08c0-26.105 21.358-47.462 47.462-47.462h244.08c26.104 0 47.462 21.357 47.462 47.461v244.08c0 26.105-21.358 47.462-47.462 47.462m-39.847-253.059H177.9v160.294h160.294zM182.351 0H152.5v71.768h29.85zm59.879 0h-29.851v71.768h29.85zm59.88 0h-29.851v71.768h29.85zm59.879 0h-29.851v71.768h29.85zM73.039 329.684H0v29.851h73.04zm0-59.878H0v29.85h73.04zm0-59.88H0v29.85h73.04zm0-59.88H0v29.851h73.04zM512 329.684h-73.04v29.851H512zm0-59.878h-73.04v29.85H512zm0-59.88h-73.04v29.85H512zm0-59.88h-73.04v29.851H512zM182.35 440.232H152.5V512h29.85zm59.88 0h-29.851V512h29.85zm59.879 0h-29.851V512h29.85zm59.88 0h-29.851V512h29.85zM151.55 128.902c0-12.272-13.376-19.983-24.018-13.847c-10.643 6.135-10.643 21.557 0 27.693s24.018-1.576 24.018-13.847'/%3E%3C/svg%3E" },
      { name: "ModelSim", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'%3E%3Cpath fill='%2300a3ff' d='M378.04 424.23H133.96c-26.104 0-47.462-21.357-47.462-47.461v-244.08c0-26.105 21.358-47.462 47.462-47.462h244.08c26.104 0 47.462 21.357 47.462 47.461v244.08c0 26.105-21.358 47.462-47.462 47.462m-39.847-253.059H177.9v160.294h160.294zM182.351 0H152.5v71.768h29.85zm59.879 0h-29.851v71.768h29.85zm59.88 0h-29.851v71.768h29.85zm59.879 0h-29.851v71.768h29.85zM73.039 329.684H0v29.851h73.04zm0-59.878H0v29.85h73.04zm0-59.88H0v29.85h73.04zm0-59.88H0v29.851h73.04zM512 329.684h-73.04v29.851H512zm0-59.878h-73.04v29.85H512zm0-59.88h-73.04v29.85H512zm0-59.88h-73.04v29.851H512zM182.35 440.232H152.5V512h29.85zm59.88 0h-29.851V512h29.85zm59.879 0h-29.851V512h29.85zm59.88 0h-29.851V512h29.85zM151.55 128.902c0-12.272-13.376-19.983-24.018-13.847c-10.643 6.135-10.643 21.557 0 27.693s24.018-1.576 24.018-13.847'/%3E%3C/svg%3E" },
    ],
    "Embedded & IoT": [
      { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg" },
      { name: "ROS2", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ros/ros-original.svg" },
      { name: "MQTT", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Mqtt-hor.svg" },
      { name: "FreeRTOS", icon: "https://upload.wikimedia.org/wikipedia/commons/3/3e/FreeRTOS_logo_2005.svg" },
      { name: "PX4 Autopilot", icon: "https://cdn.brandfetch.io/id6iBYpIo5/w/126/h/60/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1748319227557" },
    ],
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen py-20 px-4 relative overflow-hidden cyber-grid"
    >
      {/* Animated background elements with parallax - lower opacity */}
      <div 
        className="absolute top-1/4 right-10 w-96 h-96 bg-neon-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02] animate-pulse-slow transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`
        }}
      ></div>
      <div 
        className="absolute bottom-1/4 left-10 w-96 h-96 bg-neon-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02] animate-pulse-slow transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
        }}
      ></div>
      
      {/* Floating tech icons in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['{ }', '</>', '[ ]', '( )', '</>'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-neon-blue-500/10 text-4xl font-mono"
            style={{
              left: `${15 + i * 20}%`,
              top: `${10 + (i % 3) * 30}%`,
              animation: `float ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${mousePosition.x * (i * 3)}px, ${mousePosition.y * (i * 3)}px)`,
              transition: 'transform 0.5s ease-out'
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title with enhanced styling and animation */}
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-20 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 
            className="text-5xl md:text-6xl font-bold mb-4 transition-transform duration-300"
            style={{
              transform: `perspective(500px) rotateX(${mousePosition.y * 5}deg)`
            }}
          >
            <span className="neon-text inline-block hover:scale-110 transition-transform duration-300">About Me</span>
          </h2>
          <div 
            className="h-1 bg-gradient-to-r from-transparent via-neon-blue-500 to-transparent mx-auto transition-all duration-300"
            style={{
              width: `${Math.min(300, 128 + Math.abs(mousePosition.x) * 100)}px`
            }}
          ></div>
        </div>
        
        {/* Intro - Full width, no box with wave animation */}
        <div 
          ref={introRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 max-w-5xl mx-auto group transition-all duration-1000 delay-200 ${
            introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative">
            {/* Animated circuit lines */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent to-neon-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-l from-transparent to-neon-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed mb-8 text-center transition-all duration-500 group-hover:text-gray-100">
              I'm a passionate <span className="neon-text font-semibold hover:scale-110 inline-block transition-transform duration-300">Computer Engineering student</span> with 
              expertise spanning the full technology stack from low-level hardware design and embedded systems 
              to modern web applications and cloud infrastructure.
            </p>
          </div>
        </div>
        
        {/* Tech Stack Section */}
        <div className="mb-12">
          <div 
            ref={categoriesRef as React.RefObject<HTMLDivElement>}
            className={`text-center mb-10 transition-all duration-1000 delay-300 ${
              categoriesVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue-400 via-neon-blue-500 to-neon-blue-400 inline-block mb-4">
              Tech Stack & Tools
            </h3>
          </div>
          
          {/* Category Tabs */}
          <div 
            ref={tabsRef as React.RefObject<HTMLDivElement>}
            className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-1000 delay-400 ${
              tabsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {Object.keys(techStack).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 relative overflow-hidden
                  ${activeCategory === category
                    ? 'bg-neon-blue-500 text-black shadow-neon'
                    : 'bg-black/40 backdrop-blur-sm text-neon-blue-400 border-2 border-neon-blue-500/30 hover:border-neon-blue-500/60 hover:bg-neon-blue-500/10'
                  }
                `}
              >
                {activeCategory === category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue-400 via-neon-blue-500 to-neon-blue-400 animate-pulse-slow"></div>
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
          
          {/* Tech Grid - Transparent background */}
          <div 
            ref={techGridRef as React.RefObject<HTMLDivElement>}
            className={`min-h-[350px] transition-all duration-1000 delay-500 ${
              techGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 max-w-6xl mx-auto">
              {techStack[activeCategory as keyof typeof techStack].map((tech, index) => (
                <div
                  key={tech.name}
                  className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-black/40 backdrop-blur-md border-2 border-neon-blue-500/30 hover:border-neon-blue-500/80 hover:bg-black/60 transition-all duration-500 cursor-pointer overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.05}s backwards`,
                    transform: hoveredTech === tech.name 
                      ? `perspective(1000px) translateZ(20px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)` 
                      : 'perspective(1000px) translateZ(0px) rotateX(0deg) rotateY(0deg)'
                  }}
                  title={tech.name}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {/* Glow effect on hover with ripple */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue-500/0 via-neon-blue-500/0 to-neon-blue-500/0 group-hover:from-neon-blue-500/10 group-hover:via-neon-blue-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500"></div>
                  
                  {/* Animated border gradient */}
                  <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue-500/60 via-neon-blue-300/60 to-neon-blue-500/60 blur-md animate-pulse-slow"></div>
                  </div>
                  
                  {/* Ripple effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl border-2 border-neon-blue-400 animate-ping"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-full h-full object-contain group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 drop-shadow-lg group-hover:drop-shadow-[0_0_20px_rgba(0,163,255,0.9)]"
                      style={{
                        filter: hoveredTech === tech.name ? 'brightness(1.2)' : 'brightness(1)'
                      }}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue-500 to-neon-blue-700 flex items-center justify-center text-2xl font-bold text-white shadow-neon';
                        fallback.textContent = tech.name.charAt(0);
                        target.parentElement?.appendChild(fallback);
                      }}
                    />
                  </div>
                  
                  <span className="relative z-10 text-xs text-gray-300 text-center group-hover:text-neon-blue-200 transition-all duration-300 font-medium group-hover:font-bold">
                    {tech.name}
                  </span>
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-blue-500/0 group-hover:border-neon-blue-400 rounded-tr-2xl transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-blue-500/0 group-hover:border-neon-blue-400 rounded-bl-2xl transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default About;
