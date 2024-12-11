import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaCode, FaUtensils, FaBook } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: "fc1bf28b-4b8a-4a1e-abba-4e495ef0be0e",
          ...formData,
          subject: `New message from ${formData.name}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(data.message || 'Something went wrong!');
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Vivek Vahane",
            "description": "Reach out to Vivek Vahane, a Frontend Developer & Creative Technologist. Contact him through email, LinkedIn, or explore his competitive programming platforms.",
            "url": "https://vahane-vivek-portfolio.vercel.app/contact",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://vahane-vivek-portfolio.vercel.app"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Contact",
                  "item": "https://vahane-vivek-portfolio.vercel.app/contact"
                }
              ]
            },
            "mainEntity": {
              "@type": "Person",
              "name": "Vivek Vahane",
              "jobTitle": "Frontend Developer & Creative Technologist",
              "url": "https://vahane-vivek-portfolio.vercel.app",
              "sameAs": [
                "https://github.com/VIKKY0909",
                "https://linkedin.com/in/vahane-vivek",
                "https://leetcode.com/u/VIKKY0909/",
                "https://www.hackerrank.com/profile/vikivahane"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "vikivahane@gmail.com"
              }
            }
          }`}
        </script>
      </Helmet>
      {/* Background Canvas */}
      <div className="absolute inset-0">
        <Canvas>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate 
            autoRotateSpeed={0.5}
          />
          <Stars 
            radius={300} 
            depth={60} 
            count={20000} 
            factor={7} 
            saturation={0}
            fade={true}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-7xl font-bold text-white mb-4"
              style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>
            Initiate Contact Sequence
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-purple-300 max-w-2xl mx-auto"
          >
            Ready to explore the digital frontier together? Launch your message into my inbox, 
            and let's create something extraordinary in this vast technological universe.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/30"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              <span className="text-purple-400">~/</span>transmission-portal
            </h2>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300"
              >
                <span className="font-mono">Error: </span>{error}
              </motion.div>
            )}

            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300"
              >
                <span className="font-mono">Success: </span>Transmission received! Preparing response sequence... 🚀
              </motion.div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-purple-300 mb-2">
                  <span className="font-mono">{'>'}</span> Identity Matrix
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your designation"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-2">
                  <span className="font-mono">{'>'}</span> Communication Beacon
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@quantum-mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-2">
                  <span className="font-mono">{'>'}</span> Message Payload
                </label>
                <textarea
                  name="message"
                  placeholder="Compose your transmission..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-gray-700/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium relative overflow-hidden group"
                disabled={isSubmitting}
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"/>
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Initializing Transmission...
                  </span>
                ) : (
                  "Launch Transmission 🚀"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-6">
                <span className="text-purple-400">~/</span>quantum-networks
              </h2>
              <div className="space-y-6">
                <motion.a
                  href="https://github.com/VIKKY0909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-800/30 border border-purple-500/20 rounded-lg hover:bg-gray-800/50 transition-all group"
                  whileHover={{ x: 10, backgroundColor: 'rgba(107, 70, 193, 0.2)' }}
                >
                  <div className="flex items-center space-x-4">
                    <FaGithub className="text-3xl text-purple-400 group-hover:text-purple-300 transition-colors" />
                    <div>
                      <div className="font-medium group-hover:text-purple-300 transition-colors">
                        Code Repository
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        Explore my digital constellations
                      </div>
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/vahane-vivek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-800/30 border border-purple-500/20 rounded-lg hover:bg-gray-800/50 transition-all group"
                  whileHover={{ x: 10, backgroundColor: 'rgba(107, 70, 193, 0.2)' }}
                >
                  <div className="flex items-center space-x-4">
                    <FaLinkedin className="text-3xl text-purple-400 group-hover:text-purple-300 transition-colors" />
                    <div>
                      <div className="font-medium group-hover:text-purple-300 transition-colors">
                        Professional Network
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        Connect in the digital sphere
                      </div>
                    </div>
                  </div>
                </motion.a>

                

                <motion.a
                  href="mailto:vikivahane.email@example.com"
                  className="block p-4 bg-gray-800/30 border border-purple-500/20 rounded-lg hover:bg-gray-800/50 transition-all group"
                  whileHover={{ x: 10, backgroundColor: 'rgba(107, 70, 193, 0.2)' }}
                >
                  <div className="flex items-center space-x-4">
                    <FaEnvelope className="text-3xl text-purple-400 group-hover:text-purple-300 transition-colors" />
                    <div>
                      <div className="font-medium group-hover:text-purple-300 transition-colors">
                        Direct Channel
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        Open a secure communication line
                      </div>
                    </div>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Status Indicator */}
            <motion.div
              className="mt-8 p-6 bg-gray-800/30 border border-purple-500/20 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-purple-400 font-mono text-sm mb-2">// NETWORK STATUS</h3>
              <p className="text-green-400 font-mono">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"/>
                All quantum channels operational
              </p>
            </motion.div>
          </motion.div>

          {/* Competitive Platforms */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 mt-12 p-6 bg-gray-800/50 rounded-lg border border-purple-500/30"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              <span className="text-purple-400">~/</span> Competitive Platforms
            </h2>
            <p className="text-lg text-purple-300 mb-6">
              Join me on these platforms to sharpen your skills, tackle challenges, and connect with a vibrant coding community!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.a
                href="https://www.hackerrank.com/profile/vikivahane"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-700/70 border border-purple-500/20 rounded-lg hover:bg-gray-700/90 transition-all group shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(107, 70, 193, 0.3)' }}
              >
                <div className="flex items-center space-x-4">
                  <FaGithub className="text-4xl text-purple-400" /> {/* Replace with HackerRank icon */}
                  <div>
                    <div className="font-semibold text-xl group-hover:text-purple-300 transition-colors">
                      HackerRank
                    </div>
                    <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                      Code your way to success with challenges and competitions.
                    </div>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://leetcode.com/u/VIKKY0909/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-700/70 border border-purple-500/20 rounded-lg hover:bg-gray-700/90 transition-all group shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(107, 70, 193, 0.3)' }}
              >
                <div className="flex items-center space-x-4">
                  <FaCode className="text-4xl text-purple-400" /> {/* Replace with LeetCode icon */}
                  <div>
                    <div className="font-semibold text-xl group-hover:text-purple-300 transition-colors">
                      LeetCode
                    </div>
                    <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                      Master your coding skills with a variety of problems.
                    </div>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://www.codechef.com/users/zeal_trail_49"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-700/70 border border-purple-500/20 rounded-lg hover:bg-gray-700/90 transition-all group shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(107, 70, 193, 0.3)' }}
              >
                <div className="flex items-center space-x-4">
                  <FaUtensils className="text-4xl text-purple-400" /> {/* Replace with CodeChef icon */}
                  <div>
                    <div className="font-semibold text-xl group-hover:text-purple-300 transition-colors">
                      CodeChef
                    </div>
                    <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                      Cook up some code challenges and compete with others.
                    </div>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://www.geeksforgeeks.org/user/vikivahane/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-700/70 border border-purple-500/20 rounded-lg hover:bg-gray-700/90 transition-all group shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(107, 70, 193, 0.3)' }}
              >
                <div className="flex items-center space-x-4">
                  <FaBook className="text-4xl text-purple-400" /> {/* Replace with GeeksforGeeks icon */}
                  <div>
                    <div className="font-semibold text-xl group-hover:text-purple-300 transition-colors">
                      GeeksforGeeks
                    </div>
                    <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                      Learn and conquer coding concepts with tutorials and articles.
                    </div>
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 