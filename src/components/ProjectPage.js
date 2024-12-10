import { motion, useScroll, useTransform, useMotionValue, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import tnm from'../assets/TNM.png';
import schl from '../assets/school.png';
import motivation from '../assets/motivation.png';
import port from '../assets/port.png';
// Particle component for mouse-reactive particles
const Particles = ({ mouseX, mouseY }) => {
  const particlesRef = useRef();
  
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.001;
      particlesRef.current.rotation.y += mouseX.get() * 0.001;
      particlesRef.current.rotation.z += mouseY.get() * 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <float32BufferAttribute attach="attributes-position" count={1000} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#8B5CF6" />
    </points>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [letterIndex, setLetterIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);
  const parallaxOffset = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const titleText = "Explore My Projects";

  useEffect(() => {
    const timer = setInterval(() => {
      setLetterIndex(prev => (prev < titleText.length ? prev + 1 : prev));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const projects = [
    {
      id: 1,
      title: "FutureScope AI",
      tagline: "Predicting global trends with AI-driven insights",
      description: "A platform for real-time analysis of trends in technology, business, finance, and culture using AI and ML models. It provides actionable insights and interactive dashboards.",
      technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "HuggingFace Transformers", "Facebook Prophet"],
      features: [
        "Trend prediction using AI models",
        "Interactive dashboards and reports",
        "Zero-cost platform with free-tier services",
        "Multiple monetization strategies (freemium, affiliate, content sponsorship)"
      ],
      image: "",
      featured: true,
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "The Next Move (Web Application)",
      tagline: "",
      description: "Developed and managed the frontend of an e-commerce web application for The Next Move, enhancing user experience with responsive design and seamless navigation. Built and tested the Admin Panel to enable streamlined product management and user controls.",
      technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Figma"],
      features: [
        "Admin panel for product management",
        "User authentication and authorization",
        "Dynamic product listing with CRUD operations",
        "Responsive, cross-device compatibility",
      ],
      image: tnm,
      featured: false,
      demoUrl: "https://the-next-move-ruby.vercel.app/",
      githubUrl: "#",
    },
    {
        id: 3,
        title: "Lorence Public School",
        tagline: "Modern School Website",
        description: "Developed a modern, responsive, and accessible school website to improve engagement, usability, and online visibility for Lorence Public School.",
        technologies: ["HTML", "CSS", "JavaScript"],
        features: [
          "Responsive design for mobile, tablet, and desktop",
          "Interactive event calendar for school activities",
          "Resource portal for learning materials",
          "News feed and announcement section"
        ],
        image:schl,
        featured: false,
        demoUrl: "#",
        githubUrl: "#",
      },
    
    {
        id: 4,
        title: "Space-Themed 3D Portfolio",
        tagline: "An interactive 3D developer portfolio",
        description: "An immersive portfolio experience with space-themed 3D animations and interactive elements using Three.js and GSAP for smooth transitions.",
        technologies: ["Three.js", "React", "GSAP", "Tailwind CSS"],
        features: [
          "3D interactive animations",
          "Smooth scroll-based transitions",
          "Responsive and immersive design",
          "Custom space-themed visual effects"
        ],
        image: port,
        featured: true,
        demoUrl: "#",
        githubUrl: "#",
      },
      {
        id: 5,
        title: "Get Inspired (Web Application)",
        tagline: "Dynamic motivational quote generator with shareable images",
        description: 
          "Developed an interactive web app that generates motivational quotes with unique backgrounds. Users can capture images of quotes and share them directly on social media.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Web3Forms", "Imgur API"],
        features: [
          "Random quote generation with Picsum Photos API",
          "Image capture and download functionality",
          "Social media sharing (Twitter, Facebook, etc.)",
          "Contact form with secure submission",
        ],
        image: motivation, // Add your own image here
        demoUrl: "https://get-inspired-ashy.vercel.app/", // Link to the live website
        githubUrl: "#", // Add the GitHub repo link if applicable
      },
    
    
  ];

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 z-50"
        style={{ scaleX: scrollYProgress }}
        initial={{ scaleX: 0 }}
      />

      {/* Parallax Background with Interactive Particles */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 bg-gray-900">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <group rotation={[0, 0, 0]}>
            <Stars 
              radius={400} 
              depth={500} 
              count={100000} 
              factor={4} 
              fade={false}
              speed={1.5} 
              size={5}
            />
            <Particles mouseX={mouseX} mouseY={mouseY} />
          </group>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.9} />
        </Canvas>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Animated Title with Enhanced Effects */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-6xl font-bold mb-4 text-white"
            style={{ y: parallaxOffset }}
            transition={{ duration: 0.8 }}
          >
            {titleText.split('').map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={index <= letterIndex ? { 
                  opacity: 1, 
                  y: 0,
                  rotateY: [0, 360],
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }
                } : {}}
                className="inline-block"
                style={{
                  textShadow: '0 0 10px rgba(168,85,247,0.5)',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="text-xl text-purple-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ y: parallaxOffset }}
          >
            Showcasing my work in web development, product design, and immersive experiences
          </motion.p>
        </div>

        {/* Featured Project with Enhanced 3D Effects */}
        {projects.filter(p => p.featured).map(project => (
          <motion.div
            key={project.id}
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                style={{ rotateX, rotateY }}
                whileHover={{ scale: 1.02 }}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-purple-300 mb-6">{project.description}</p>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-purple-500/30 rounded-full text-purple-300 text-sm"
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "rgba(168,85,247,0.4)"
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.div
                  className="relative rounded-lg overflow-hidden perspective-1000"
                  style={{ 
                    rotateX, 
                    rotateY,
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 rounded-t-lg flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover mt-8"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Enhanced Project Timeline */}
        <div ref={timelineRef} className="relative">
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-purple-500/30"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5 }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.filter(p => !p.featured).map((project, index) => (
              <motion.div
                key={project.id}
                className={`relative ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:col-start-2'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute top-0 w-4 h-4 rounded-full bg-purple-500"
                  style={{
                    left: index % 2 === 0 ? 'auto' : '0',
                    right: index % 2 === 0 ? '0' : 'auto',
                    transform: 'translateX(-50%)',
                    boxShadow: '0 0 20px rgba(168,85,247,0.6)'
                  }}
                  whileHover={{ scale: 1.5 }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168,85,247,0.6)',
                      '0 0 40px rgba(168,85,247,0.8)',
                      '0 0 20px rgba(168,85,247,0.6)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
                
                <motion.div
                  className="w-full rounded-xl perspective-1000 cursor-pointer"
                  style={{
                    rotateX,
                    rotateY,
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                  onClick={() => setFlippedCard(flippedCard === project.id ? null : project.id)}
                >
                  <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg mb-6"
                      whileHover={{ scale: 1.05 }}
                    />
                    <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-purple-300 mb-4">{project.tagline}</p>
                    
                    <AnimatePresence>
                      {flippedCard === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }}
                        >
                          <div className="pt-4 border-t border-purple-500/30">
                            <h4 className="text-xl font-semibold text-white mb-2">Key Features</h4>
                            <ul className="list-disc list-inside text-gray-300 mb-6">
                              {project.features.map((feature, idx) => (
                                <motion.li 
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                >
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                            
                            <div className="flex gap-4">
                              <motion.a
                                href={project.demoUrl}
                                whileHover={{ 
                                  scale: 1.05,
                                  backgroundColor: "#9333EA"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 py-2 bg-purple-600 rounded-lg text-white text-center font-semibold transition-colors"
                              >
                                View Live
                              </motion.a>
                              <motion.a
                                href={project.githubUrl}
                                whileHover={{ 
                                  scale: 1.05,
                                  backgroundColor: "rgba(147,51,234,0.2)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 py-2 border border-purple-600 rounded-lg text-purple-400 text-center font-semibold transition-colors"
                              >
                                GitHub
                              </motion.a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Want to see more? Let's collaborate on something extraordinary.
          </h2>
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              y: [0, -5, 0],
              boxShadow: [
                '0 0 20px rgba(168,85,247,0.4)',
                '0 0 30px rgba(168,85,247,0.6)',
                '0 0 20px rgba(168,85,247,0.4)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg shadow-lg"
            style={{
              textShadow: '0 0 10px rgba(255,255,255,0.5)',
            }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;