import { useState, useRef, useEffect } from 'react';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
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
      {/* Animated background circles with parallax - lower opacity */}
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-5xl font-bold mb-4">
            <span className="neon-text">My Journey</span>
          </h2>
          <p className="text-gray-400 text-lg">
            A timeline of my academic and professional experiences
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue-500 via-neon-blue-400 to-neon-blue-500 opacity-30"></div>
          
          {/* Glowing dot at top */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-4 h-4 bg-neon-blue-400 rounded-full shadow-neon animate-pulse-slow"></div>
          
          {/* Glowing dot at bottom */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-4 h-4 bg-neon-blue-400 rounded-full shadow-neon animate-pulse-slow"></div>

          {/* Journey items */}
          <div className="space-y-12">
            {journeyData.map((item, index) => (
              <div 
                key={item.id}
                className={`relative flex items-stretch ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } animate-fadeInUp group`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Content card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'} flex items-center`}>
                  <div className="bg-cyber-black-100/50 backdrop-blur-sm border border-neon-blue-500/30 rounded-lg p-6 hover:border-neon-blue-500 transition-all duration-300 hover:shadow-neon group-hover:scale-105 w-full">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 bg-gradient-to-r ${getTypeColor(item.type)} text-white`}>
                      {item.year}
                    </div>
                    <h3 className="text-2xl font-bold text-neon-blue-400 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-lg text-gray-300 mb-3 font-semibold">
                      {item.organization}
                    </p>
                    <ul className={`text-gray-400 leading-relaxed space-y-2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      {item.description.map((point, idx) => (
                        <li key={idx} className={`flex items-start gap-2 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                          <span className="text-neon-blue-400 mt-1">•</span>
                          <span className="flex-1">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center node */}
                <div className="w-2/12 flex justify-center items-center relative z-10">
                  <div className="w-6 h-6 rounded-full bg-neon-blue-500 shadow-neon group-hover:scale-125 transition-transform duration-300 group-hover:shadow-neon-lg"></div>
                </div>

                {/* Image on the other side */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pl-12' : 'pr-12'} flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className="rounded-lg overflow-hidden border-2 border-neon-blue-500/50 shadow-neon group-hover:border-neon-blue-500 group-hover:shadow-neon-lg transition-all duration-300 group-hover:scale-105">
                    <img 
                      src={item.image} 
                      alt={item.organization}
                      className="w-full h-full object-cover"
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
