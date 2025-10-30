import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import OptimizedImage from './OptimizedImage';

interface Project {
  title: string;
  description: string[];
  tags: string[];
  images: string[];
  collaborators?: { name: string; github: string }[];
  github?: string;
  featured?: boolean;
}

export default function Projects() {
  const titleRef = useScrollAnimation(0.2);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [imageSlideDirection, setImageSlideDirection] = useState<'left' | 'right'>('right');

  const projects: Project[] = [
    {
      title: "The Game Library",
      description: [
        "Comprehensive game management system built in C",
        "Custom memory allocation and data structures",
        "Interactive CLI with advanced features"
      ],
      tags: ["C", "Data Structures", "CLI"],
      images: [
        "/Projects/The Game Library/GameLibrary1.png",
        "/Projects/The Game Library/GameLibrary2.png",
        "/Projects/The Game Library/GameLibrary3.png",
        "/Projects/The Game Library/GameLibrary4.png"
      ],
      collaborators: [{ name: "vinend", github: "https://github.com/vinend" }],
      github: "https://github.com/vinend/PAS-02",
      featured: true
    },
    {
      title: "Digilab-NG",
      description: [
        "Full-stack educational platform prototype",
        "Real-time collaboration features with Redis",
        "Containerized deployment with Docker"
      ],
      tags: ["React", "TypeScript", "Express", "PostgreSQL", "Redis", "Docker", "Cloudinary", "Node"],
      images: [
        "/Projects/Digilab-NG/DashboardScreenshot.jpg",
        "/Projects/Digilab-NG/ClassesListScreenshot.jpg",
        "/Projects/Digilab-NG/NewsScreenshot.jpg",
        "/Projects/Digilab-NG/ThreadsScreenshot.jpg"
      ],
      collaborators: [{ name: "DAFFAsd", github: "https://github.com/DAFFAsd" }],
      github: "https://github.com/AlexanderChristhian/Digilab-NG",
      featured: true
    },
    {
      title: "Mie Babi Rodotua",
      description: [
        "E-commerce platform for traditional cuisine",
        "Cloud-based image storage and optimization",
        "Serverless deployment on Vercel"
      ],
      tags: ["React", "Tailwind", "Vite", "JavaScript", "Vercel", "Express", "NeonDB", "PostgreSQL", "Cloudinary", "Node"],
      images: [
        "/Projects/Mie Babi Rodotua/MieBabiRodotua1.png",
        "/Projects/Mie Babi Rodotua/MieBabiRodotua2.png",
        "/Projects/Mie Babi Rodotua/MieBabiRodotua3.png",
        "/Projects/Mie Babi Rodotua/MieBabiRodotua4.png"
      ],
      github: "https://github.com/AlexanderChristhian/CS9-SBD-AlexanderChristhian",
      featured: true
    },
    {
      title: "Space Shooter",
      description: [
        "2D arcade-style space shooter game",
        "Custom physics and collision detection",
        "Power-ups and enemy AI systems"
      ],
      tags: ["C#", "Unity", "Game Development"],
      images: [
        "/Projects/Space Shooter/SpaceShooter1.png",
        "/Projects/Space Shooter/SpaceShooter2.png",
        "/Projects/Space Shooter/SpaceShooter3.png",
        "/Projects/Space Shooter/SpaceShooter4.png"
      ],
      github: "https://github.com/AlexanderChristhian/AlexanderChristhian_OOP_Unity"
    },
    {
      title: "RTOS Scheduler in VHDL",
      description: [
        "Real-time operating system scheduler",
        "Hardware implementation with custom datapath",
        "Task control block memory management"
      ],
      tags: ["VHDL", "Vivado", "FPGA", "RTOS"],
      images: [
        "/Projects/RTOS Scheduler in VHDL/RTOS_Block_Diagram.png",
        "/Projects/RTOS Scheduler in VHDL/Datapath-1.png",
        "/Projects/RTOS Scheduler in VHDL/Control_Unit-1.png",
        "/Projects/RTOS Scheduler in VHDL/Waveform.jpg"
      ],
      github: "https://github.com/AlexanderChristhian/RTOS_Task_Scheduler"
    },
    {
      title: "3x3 Whack A Mole",
      description: [
        "Hardware simulation of classic arcade game",
        "LED matrix display and timing circuits",
        "Score tracking and difficulty progression"
      ],
      tags: ["Proteus Professional", "Circuit Design", "Simulation"],
      images: [
        "/Projects/3x3 Whack A Mole/WhackAMole1.png",
        "/Projects/3x3 Whack A Mole/WhackAMole2.png"
      ],
      github: "https://github.com/AlexanderChristhian/3x3-Whack-A-Mole-"
    },
    {
      title: "8x8 Snake Game Using AVR Assembly",
      description: [
        "Classic snake game on 8x8 LED matrix",
        "Low-level AVR assembly programming",
        "Hardware simulation in Proteus"
      ],
      tags: ["Arduino", "AVR", "Assembly", "Proteus"],
      images: [
        "/Projects/8x8 Snake Game Using AVR Assembly/SnakeGame1.png",
        "/Projects/8x8 Snake Game Using AVR Assembly/SnakeGame2.png",
        "/Projects/8x8 Snake Game Using AVR Assembly/SnakeGame3.png"
      ],
      github: "https://github.com/AlexanderChristhian/8x8-Snake-Game-Using-AVR-Assembly"
    }
  ];

  const handleProjectChange = (direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSlideDirection(direction === 'next' ? 'left' : 'right');
    
    setTimeout(() => {
      if (direction === 'next') {
        setActiveProjectIndex((prev) => (prev + 1) % projects.length);
      } else {
        setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
      setActiveImageIndex(0); // Reset to first image when changing projects
      setIsTransitioning(false);
    }, 300);
  };

  const handleImageChange = (direction: 'next' | 'prev') => {
    if (isImageTransitioning) return;
    
    const currentProject = projects[activeProjectIndex];
    setIsImageTransitioning(true);
    setImageSlideDirection(direction === 'next' ? 'left' : 'right');
    
    setTimeout(() => {
      if (direction === 'next') {
        setActiveImageIndex((prev) => (prev + 1) % currentProject.images.length);
      } else {
        setActiveImageIndex((prev) => (prev - 1 + currentProject.images.length) % currentProject.images.length);
      }
      setIsImageTransitioning(false);
    }, 300);
  };

  const currentProject = projects[activeProjectIndex];
  const contentRef = useScrollAnimation(0.2);

  return (
    <section id="projects" className="min-h-screen py-20 px-6 relative overflow-hidden cyber-grid">
      {/* Floating tech symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['{ }', '</>', '[ ]', '( )', '</>'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-neon-blue-500/10 text-4xl font-mono animate-float"
            style={{
              left: `${15 + i * 20}%`,
              top: `${10 + (i % 3) * 30}%`,
              animation: `float ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 
          ref={titleRef.ref}
          className={`text-5xl font-bold mb-16 text-center text-neon-blue transition-all duration-1000 ${
            titleRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Featured <span className="text-white">Projects</span>
        </h2>

        {/* Project Navigation Arrows - Large and Prominent */}
        <div className="flex justify-between items-center mb-8 gap-2 px-2">
          <button
            onClick={() => handleProjectChange('prev')}
            disabled={isTransitioning}
            className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 bg-gray-900/80 hover:bg-neon-blue/20 text-neon-blue border-2 border-neon-blue/50 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-neon-blue/50 hover:scale-110 hover:-translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-bold text-sm sm:text-lg hidden sm:block">Previous</span>
          </button>

          {/* Project Counter */}
          <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-bold text-neon-blue">{activeProjectIndex + 1}</span>
              <span className="text-gray-400 text-lg sm:text-xl"> / {projects.length}</span>
            </div>
            <div className="hidden sm:flex gap-1.5">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isTransitioning && idx !== activeProjectIndex) {
                      setSlideDirection(idx > activeProjectIndex ? 'left' : 'right');
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setActiveProjectIndex(idx);
                        setActiveImageIndex(0);
                        setIsTransitioning(false);
                      }, 300);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeProjectIndex 
                      ? 'w-8 bg-neon-blue' 
                      : 'w-2 bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => handleProjectChange('next')}
            disabled={isTransitioning}
            className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 bg-gray-900/80 hover:bg-neon-blue/20 text-neon-blue border-2 border-neon-blue/50 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-neon-blue/50 hover:scale-110 hover:translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <span className="font-bold text-sm sm:text-lg hidden sm:block">Next</span>
            <svg className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Single Project Display with Slide Animation */}
        <div 
          ref={contentRef.ref}
          className={`transition-all duration-500 ${
            contentRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`transition-all duration-300 ${
            isTransitioning 
              ? slideDirection === 'left' 
                ? 'opacity-0 -translate-x-20' 
                : 'opacity-0 translate-x-20'
              : 'opacity-100 translate-x-0'
          }`}>
            {/* Split Layout - Details Left, Image Right */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Left Side - Project Information */}
              <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 shadow-xl order-2 lg:order-1">
                {/* Featured Badge */}
                {currentProject.featured && (
                  <div className="mb-4 sm:mb-6">
                    <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-neon-blue/20 text-neon-blue border border-neon-blue/50 text-xs font-bold rounded-lg shadow-lg shadow-neon-blue/30">
                      <span className="text-sm sm:text-base">⭐</span>
                      FEATURED PROJECT
                    </span>
                  </div>
                )}

                {/* Title with GitHub Link */}
                <div className="flex items-start justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white hover:text-neon-blue transition-colors duration-300 flex-1">
                    {currentProject.title}
                  </h3>
                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-2 sm:p-3 bg-gray-800 hover:bg-neon-blue/20 text-neon-blue rounded-xl border-2 border-neon-blue/30 transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/50 hover:scale-110 group"
                      title="View on GitHub"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Description Points */}
                <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                  {currentProject.description.map((desc, descIdx) => (
                    <p 
                      key={descIdx}
                      className="text-gray-300 text-sm sm:text-base flex items-start gap-2 sm:gap-3"
                    >
                      <span className="text-neon-blue text-lg sm:text-xl mt-0.5">▹</span>
                      <span>{desc}</span>
                    </p>
                  ))}
                </div>

                {/* Collaborators */}
                {currentProject.collaborators && (
                  <div className="mb-4 sm:mb-6 flex flex-wrap gap-2 sm:gap-3">
                    {currentProject.collaborators.map((collab, collabIdx) => (
                      <a
                        key={collabIdx}
                        href={collab.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 hover:bg-neon-blue/20 text-neon-blue text-xs sm:text-sm rounded-full border-2 border-neon-blue/30 transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/50 hover:scale-105"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span className="font-semibold">Collaborated with {collab.name}</span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {currentProject.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-800/50 text-neon-blue text-xs sm:text-sm font-medium rounded-lg border border-gray-700 transition-all duration-300 hover:border-neon-blue hover:bg-gray-800 hover:shadow-md hover:shadow-neon-blue/30 hover:scale-105 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Subtle bottom glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/5 to-transparent rounded-2xl pointer-events-none" />
              </div>

              {/* Right Side - Skewed Image with Neon Backlight */}
              <div className="relative order-1 lg:order-2 perspective-1000">
                {/* Pure Blue Neon Backlight Glow - matching other pages */}
                <div className="absolute -inset-8 bg-neon-blue-500/20 blur-3xl opacity-60 rounded-full hidden lg:block" />
                <div className="absolute -inset-6 bg-neon-blue-400/15 blur-2xl opacity-50 rounded-full animate-pulse-slow hidden lg:block" />
                
                {/* Skewed Image Container - skew disabled on mobile */}
                <div 
                  className="relative group transition-all duration-700 hover:scale-105"
                  style={{ 
                    transform: window.innerWidth >= 1024 ? 'perspective(1200px) rotateY(-8deg) rotateX(2deg)' : 'none',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="relative rounded-2xl overflow-hidden border-2 border-neon-blue/60 shadow-2xl shadow-neon-blue/40 transition-all duration-500 group-hover:shadow-neon-blue/80 group-hover:border-neon-blue group-hover:-translate-y-2 bg-gray-950">
                    {/* Image with slide animation */}
                    <div className="relative overflow-hidden">
                      <div className={`transition-all duration-300 ${
                        isImageTransitioning
                          ? imageSlideDirection === 'left'
                            ? 'opacity-0 -translate-x-full'
                            : 'opacity-0 translate-x-full'
                          : 'opacity-100 translate-x-0'
                      }`}>
                        <OptimizedImage
                          src={currentProject.images[activeImageIndex]}
                          alt={`${currentProject.title} screenshot ${activeImageIndex + 1}`}
                          loading="lazy"
                          className="w-full h-auto"
                          objectFit="cover"
                        />
                      </div>
                      
                      {/* Gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-neon-blue/10 pointer-events-none" />
                      
                      {/* Edge highlights - removed white, now neon blue */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
                        <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-neon-blue to-transparent" />
                        <div className="absolute right-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-neon-blue to-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* Additional corner accents - Blue only */}
                  <div className="absolute -top-2 -right-2 w-32 h-32 bg-neon-blue/15 blur-2xl rounded-full animate-pulse-slow" />
                  <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-neon-blue/10 blur-2xl rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
                </div>

                {/* Image Navigation - Below and Skewed */}
                {currentProject.images.length > 1 && (
                  <div 
                    className="mt-4 sm:mt-6 flex gap-2 sm:gap-3 justify-center"
                    style={{ 
                      transform: window.innerWidth >= 1024 ? 'perspective(1200px) rotateY(-8deg) rotateX(2deg)' : 'none',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageChange('prev');
                      }}
                      disabled={isImageTransitioning}
                      className="px-3 sm:px-5 py-2 sm:py-3 bg-gray-900/90 hover:bg-neon-blue/30 text-neon-blue border-2 border-neon-blue/50 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-neon-blue/50 text-sm sm:text-base font-bold hover:scale-110 active:scale-95 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ←
                    </button>
                    <div className="flex gap-1.5 sm:gap-2 items-center px-3 sm:px-5 py-2 sm:py-3 bg-gray-900/90 rounded-xl border-2 border-gray-700 backdrop-blur-sm">
                      {currentProject.images.map((_, imgIdx) => (
                        <button
                          key={imgIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isImageTransitioning && imgIdx !== activeImageIndex) {
                              setImageSlideDirection(imgIdx > activeImageIndex ? 'left' : 'right');
                              setIsImageTransitioning(true);
                              setTimeout(() => {
                                setActiveImageIndex(imgIdx);
                                setIsImageTransitioning(false);
                              }, 300);
                            }
                          }}
                          className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                            imgIdx === activeImageIndex 
                              ? 'w-8 sm:w-10 bg-neon-blue shadow-lg shadow-neon-blue/50' 
                              : 'w-2 sm:w-2.5 bg-gray-500 hover:bg-neon-blue/50'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageChange('next');
                      }}
                      disabled={isImageTransitioning}
                      className="px-3 sm:px-5 py-2 sm:py-3 bg-gray-900/90 hover:bg-neon-blue/30 text-neon-blue border-2 border-neon-blue/50 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-neon-blue/50 text-sm sm:text-base font-bold hover:scale-110 active:scale-95 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Navigation Hint */}
        <div className="mt-8 text-center text-gray-500 text-xs sm:text-sm">
          <p>Use arrow buttons or click dots to navigate between projects</p>
        </div>
      </div>
    </section>
  );
}
