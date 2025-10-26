import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Contact() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.3, false);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation(0.2, false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const contacts = [
    {
      id: 'email',
      label: 'Email',
      value: 'alexanderchristian100@gmail.com',
      link: 'mailto:alexanderchristian100@gmail.com',
      icon: (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      color: 'from-red-500 to-orange-500',
      hoverColor: 'hover:shadow-red-500/50'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'alexanderchristhian',
      link: 'https://www.linkedin.com/in/alexanderchristhian',
      icon: (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      color: 'from-blue-600 to-blue-400',
      hoverColor: 'hover:shadow-blue-500/50'
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'AlexanderChristhian',
      link: 'https://github.com/AlexanderChristhian',
      icon: (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'from-purple-600 to-pink-500',
      hoverColor: 'hover:shadow-purple-500/50'
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-6 relative overflow-hidden cyber-grid">
      {/* Floating code symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['@', '#', '$', '%', '&'].map((symbol, i) => (
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
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-center transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="neon-text">Get In Touch</span>
        </h2>

        <p className={`text-center text-gray-400 text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto px-4 transition-all duration-1000 delay-200 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
        </p>
        
        {/* Contact Cards */}
        <div 
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4"
        >
          {contacts.map((contact, index) => (
            <a
              key={contact.id}
              href={contact.link}
              target={contact.id !== 'email' ? '_blank' : undefined}
              rel={contact.id !== 'email' ? 'noopener noreferrer' : undefined}
              onMouseEnter={() => setHoveredCard(contact.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative transition-all duration-1000 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Animated background gradient */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${contact.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-all duration-500`}></div>
              
              {/* Card content */}
              <div className={`relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border-2 border-gray-800 group-hover:border-neon-blue transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 ${contact.hoverColor} hover:shadow-2xl`}>
                {/* Icon container */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className={`relative transition-all duration-500 ${
                    hoveredCard === contact.id ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${contact.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative text-neon-blue group-hover:text-white transition-colors duration-300 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                      <div className="scale-75 sm:scale-100">
                        {contact.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-xl sm:text-2xl font-bold text-center text-white mb-2 sm:mb-3 group-hover:text-neon-blue transition-colors duration-300">
                  {contact.label}
                </h3>

                {/* Value */}
                <p className="text-center text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300 break-all px-2">
                  {contact.value}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-neon-blue text-xs sm:text-sm font-semibold flex items-center gap-2">
                    Click to {contact.id === 'email' ? 'send email' : 'visit'}
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${contact.color} blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full`}></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
