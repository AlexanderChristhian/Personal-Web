function Contact() {
  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative overflow-hidden cyber-grid">
      {/* Animated background elements - lower opacity */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-neon-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-neon-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.02] animate-pulse-slow"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="neon-text">Get In Touch</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-neon-blue-400 mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                I'm always interested in hearing about new projects, opportunities, 
                or just connecting with fellow tech enthusiasts. Feel free to reach out!
              </p>
            </div>
            
            <div className="space-y-4">
              <a 
                href="mailto:your.email@example.com" 
                className="flex items-center gap-4 p-4 neon-border rounded-lg hover:shadow-neon-sm transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-neon-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-neon-blue-500/30 transition-colors">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-neon-blue-400">your.email@example.com</p>
                </div>
              </a>
              
              <a 
                href="https://linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 neon-border rounded-lg hover:shadow-neon-sm transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-neon-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-neon-blue-500/30 transition-colors">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">LinkedIn</p>
                  <p className="text-neon-blue-400">linkedin.com/in/yourprofile</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 neon-border rounded-lg hover:shadow-neon-sm transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-neon-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-neon-blue-500/30 transition-colors">
                  <span className="text-2xl">🔗</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">GitHub</p>
                  <p className="text-neon-blue-400">github.com/yourusername</p>
                </div>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="neon-border rounded-lg p-6 bg-black/50">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-cyber-black-200 border border-neon-blue-700/50 rounded-lg focus:outline-none focus:border-neon-blue-500 focus:shadow-neon-sm transition-all text-white"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-cyber-black-200 border border-neon-blue-700/50 rounded-lg focus:outline-none focus:border-neon-blue-500 focus:shadow-neon-sm transition-all text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 bg-cyber-black-200 border border-neon-blue-700/50 rounded-lg focus:outline-none focus:border-neon-blue-500 focus:shadow-neon-sm transition-all text-white resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-neon-blue-500 text-black font-semibold rounded-lg hover:shadow-neon transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
