function Projects() {
  const projects = [
    {
      title: "Smart Home IoT System",
      description: "Developed an IoT-based home automation system using Raspberry Pi, integrating sensors and actuators with a custom web dashboard.",
      tags: ["Python", "Raspberry Pi", "IoT", "React"],
      category: "Hardware + Software"
    },
    {
      title: "Network Traffic Analyzer",
      description: "Built a network packet analyzer to monitor and visualize network traffic patterns in real-time using Python and Wireshark.",
      tags: ["Python", "Networking", "TCP/IP", "Data Visualization"],
      category: "Networking"
    },
    {
      title: "RISC-V Processor Design",
      description: "Designed and simulated a simplified RISC-V processor using Verilog, implementing basic instruction set architecture.",
      tags: ["Verilog", "Computer Architecture", "Digital Design"],
      category: "Hardware"
    },
    {
      title: "Task Management Web App",
      description: "Created a full-stack web application for task management with user authentication and real-time updates.",
      tags: ["React", "Node.js", "MongoDB", "TypeScript"],
      category: "Software"
    },
    {
      title: "Embedded Weather Station",
      description: "Designed an embedded weather station using Arduino with multiple sensors to collect and display environmental data.",
      tags: ["Arduino", "C++", "Sensors", "Embedded Systems"],
      category: "Hardware"
    },
    {
      title: "Network Security Scanner",
      description: "Developed a security tool to scan networks for vulnerabilities and generate comprehensive security reports.",
      tags: ["Python", "Cybersecurity", "Network Security"],
      category: "Networking"
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative overflow-hidden cyber-grid">
      {/* Animated background elements - lower opacity */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-neon-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-neon-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02] animate-pulse-slow"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="neon-text">Featured Projects</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="neon-border rounded-lg p-6 bg-black/50 hover:shadow-neon transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            >
              <div className="mb-4">
                <span className="text-xs text-neon-blue-400 font-semibold uppercase tracking-wide">
                  {project.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIdx) => (
                  <span 
                    key={tagIdx}
                    className="text-xs px-3 py-1 bg-neon-blue-900/30 text-neon-blue-300 rounded-full border border-neon-blue-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border-2 border-neon-blue-500 text-neon-blue-500 font-semibold rounded-lg hover:bg-neon-blue-500 hover:text-black transition-all duration-300"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
