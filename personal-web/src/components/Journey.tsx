import { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import OptimizedImage from './OptimizedImage';

interface JourneyItem {
  id: number;
  year: string;
  title: string;
  organization: string;
  description: string[];
  image: string;
  type: 'education' | 'organization' | 'professional';
}

const Journey = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.3, false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])]);
            } else {
              setVisibleItems((prev) => prev.filter((i) => i !== index));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const journeyData: JourneyItem[] = [
    {
      id: 1,
      year: 'July 2023 - Present',
      title: 'Computer Engineering Student',
      organization: 'Universitas Indonesia',
      description: [
        'GPA : 3.79/4.00',
        'Focusing on hardware-software integration',
        'Learning embedded systems and digital design',
      ],
      image: '/Universitas Indonesia/Foto_UI.jpg',
      type: 'education'
    },
    {
      id: 2,
      year: 'February 2024 - December 2024',
      title: 'Staff of Academic and Profession',
      organization: 'Ikatan Mahasiswa Elektro (IME)',
      description: [
        'Assigned as PIC of Sharing Registrasi 2025 event',
        'Assigned on creating Fundamentals of Digital Systems, Computer Organization, and Statistics modules',
        'Supporting various academic and career development programs',
      ],
      image: '/Akpro IME/Foto_Akpro.jpg',
      type: 'organization'
    },
    {
      id: 3,
      year: 'February 2025 - December 2025',
      title: 'Programming Division Staff',
      organization: 'AUAV VTOL Team',
      description: [
        'Working on autonomous VTOL aircraft programming',
        'Assigned on developing QR code-based navigation system',
        'Assigned on implementing YOLOv11 for object detection',
      ],
      image: '/AUAV/Foto_VTOL.jpg',
      type: 'professional'
    },
    {
      id: 4,
      year: '2025 - Present',
      title: 'Digital Laboratory Assistant',
      organization: 'Department of Electrical Engineering FTUI',
      description: [
        'Assigned as PIC of Digital System Design laboratory sessions',
        'Helping in various laboratory practicums activities',
      ],
      image: '/Digilab/Foto_Digilab.png',
      type: 'professional'
    }
  ];

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'education': return 'from-neon-blue-400 to-neon-blue-600';
      case 'organization': return 'from-purple-400 to-purple-600';
      case 'professional': return 'from-cyan-400 to-cyan-600';
      default: return 'from-neon-blue-400 to-neon-blue-600';
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="journey" 
      className="min-h-screen py-20 px-4 relative overflow-hidden cyber-grid"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="neon-text">My Journey</span>
          </h2>
          <p className="text-gray-400 text-lg">
            A timeline of my academic and professional experiences
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue-500 via-neon-blue-400 to-neon-blue-500 opacity-30 hidden md:block"></div>
          
          {/* Glowing dot at top - hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-4 h-4 bg-neon-blue-400 rounded-full shadow-neon animate-pulse-slow hidden md:block"></div>
          
          {/* Glowing dot at bottom - hidden on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-4 h-4 bg-neon-blue-400 rounded-full shadow-neon animate-pulse-slow hidden md:block"></div>

          {/* Journey items */}
          <div className="space-y-8 md:space-y-12">
            {journeyData.map((item, index) => (
              <div 
                key={item.id}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`relative flex flex-col md:flex-row items-stretch transition-all duration-1000 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } group ${
                  visibleItems.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0'
                }`}
              >
                {/* Content card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} flex items-center mb-4 md:mb-0`}>
                  <div className="bg-cyber-black-100/50 backdrop-blur-sm border border-neon-blue-500/30 rounded-lg p-4 sm:p-6 hover:border-neon-blue-500 transition-all duration-300 hover:shadow-neon group-hover:scale-105 w-full">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 bg-gradient-to-r ${getTypeColor(item.type)} text-white`}>
                      {item.year}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neon-blue-400 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-300 mb-3 font-semibold">
                      {item.organization}
                    </p>
                    <ul className={`text-sm sm:text-base text-gray-400 leading-relaxed space-y-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      {item.description.map((point, idx) => (
                        <li key={idx} className={`flex items-start gap-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                          <span className="text-neon-blue-400 mt-1">•</span>
                          <span className="flex-1">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center node - hidden on mobile */}
                <div className="hidden md:flex w-2/12 justify-center items-center relative z-10">
                  <div className="w-6 h-6 rounded-full bg-neon-blue-500 shadow-neon group-hover:scale-125 transition-transform duration-300 group-hover:shadow-neon-lg"></div>
                </div>

                {/* Image on the other side */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className="rounded-lg overflow-hidden border-2 border-neon-blue-500/50 shadow-neon group-hover:border-neon-blue-500 group-hover:shadow-neon-lg transition-all duration-300 group-hover:scale-105 w-full">
                    <OptimizedImage 
                      src={item.image} 
                      alt={item.organization}
                      loading="lazy"
                      className="w-full h-48 sm:h-full"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
