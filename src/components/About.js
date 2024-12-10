import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, OrbitControls, PerspectiveCamera, Environment, useGLTF, Points } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { Particles } from "@tsparticles/react";



const About = () => {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading3D, setLoading3D] = useState(true);
  const [flippedCard, setFlippedCard] = useState(null);
  const containerRef = useRef(null);
  const snowflakesRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const navigate= useNavigate();
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const philosophies = [
    {
      title: "Innovative Solutions",
      icon: "💡",
      description: "Transforming complex challenges into elegant solutions through creative thinking and technical expertise",
      fact: '"Innovation is not about saying yes to everything. It\'s about saying NO to all but the most crucial features." - Steve Jobs'
    },
    {
      title: "Cosmic Exploration",
      icon: "🌌", 
      description: "Exploring the intersection of technology and imagination to create immersive digital experiences",
      fact: '"The universe is not only stranger than we imagine, it is stranger than we can imagine." - Arthur C. Clarke'
    },
    {
      title: "Lifelong Learning",
      icon: "📚",
      description: "Embracing continuous growth and adaptation in the ever-evolving tech landscape",
      fact: '"Live as if you were to die tomorrow. Learn as if you were to live forever." - Mahatma Gandhi'
    },
    {
      title: "Digital Artistry",
      icon: "🎨",
      description: "Crafting seamless experiences where code meets creativity",
      fact: '"Technology is best when it brings people together." - Matt Mullenweg'
    }
  ];

  const PhilosophyCard = ({ philosophy, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardClasses = `absolute w-full h-full backface-hidden bg-gradient-to-br rounded-xl p-6 
      flex flex-col items-center justify-center border border-purple-500/30 
      hover:border-purple-400/50 transition-all duration-300`;
    
    return (
      <motion.div
        className={`relative ${isMobile ? 'w-full' : 'w-64'} h-80 cursor-pointer perspective-1000`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative preserve-3d transition-transform duration-700"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card */}
          <div 
            className={`${cardClasses} from-purple-900 to-indigo-900`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <motion.span 
              className={`${isMobile ? 'text-5xl' : 'text-4xl'} mb-4`}
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {philosophy.icon}
            </motion.span>
            <h3 className={`${isMobile ? 'text-2xl' : 'text-xl'} font-bold text-white mb-3`}>{philosophy.title}</h3>
            <p className={`text-purple-200 text-center ${isMobile ? 'text-base' : 'text-sm'} leading-relaxed`}>{philosophy.description}</p>
            <motion.div
              className="absolute bottom-4 text-purple-300 text-sm"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isMobile ? 'Tap to flip ↺' : 'Click to flip ↺'}
            </motion.div>
          </div>

          {/* Back of card */}
          <div 
            className={`${cardClasses} from-indigo-900 to-purple-900`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-white text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className={`${isMobile ? 'text-xl' : 'text-lg'} font-bold mb-4`}>Words of Wisdom</h4>
                <p className={`text-purple-200 italic ${isMobile ? 'text-base' : 'text-sm'} leading-relaxed`}>
                  {philosophy.fact}
                </p>
              </motion.div>
            </div>
            <motion.div
              className="absolute bottom-4 text-purple-300 text-sm"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isMobile ? 'Tap to flip ↺' : 'Click to flip ↺'}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Optimize snowflakes initialization
  useEffect(() => {
    const getSnowflakeCount = () => {
      if (windowSize.width < 480) return 30; // Mobile
      if (windowSize.width < 768) return 50; // Tablet
      if (windowSize.width < 1024) return 75; // Small desktop
      return 100; // Large desktop
    };

    const getSnowflakeSize = () => {
      if (windowSize.width < 480) return { min: 1, max: 2.5 };
      if (windowSize.width < 768) return { min: 1.5, max: 3 };
      if (windowSize.width < 1024) return { min: 2, max: 3.5 };
      return { min: 2, max: 4 };
    };

    const getSnowflakeSpeed = () => {
      if (windowSize.width < 480) return { min: 0.5, max: 1 };
      if (windowSize.width < 768) return { min: 0.75, max: 1.25 };
      if (windowSize.width < 1024) return { min: 1, max: 1.5 };
      return { min: 1, max: 2 };
    };

    const snowflakeCount = getSnowflakeCount();
    const sizeRange = getSnowflakeSize();
    const speedRange = getSnowflakeSpeed();

    snowflakesRef.current = Array(snowflakeCount).fill().map(() => ({
      x: Math.random() * windowSize.width,
      y: -20,
      size: Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min,
      speed: Math.random() * (speedRange.max - speedRange.min) + speedRange.min,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01
    }));

    const animateSnow = () => {
      const snowflakes = document.querySelectorAll('.snowflake');
      snowflakesRef.current = snowflakesRef.current.map((flake, i) => {
        flake.y += flake.speed;
        flake.wobble += flake.wobbleSpeed;
        
        // Add gentle horizontal wobble
        const wobbleX = Math.sin(flake.wobble) * 2;
        
        if (flake.y > windowSize.height) {
          flake.y = -20;
          flake.x = Math.random() * windowSize.width;
        }
        
        if (snowflakes[i]) {
          snowflakes[i].style.transform = `translate(${flake.x + wobbleX}px, ${flake.y}px)`;
          snowflakes[i].style.opacity = Math.random() * 0.3 + 0.7; // Random opacity for twinkling effect
        }
        
        return flake;
      });
      requestAnimationFrame(animateSnow);
    };

    animateSnow();
  }, [windowSize]);

  useEffect(() => {
    console.log('Loading state:', loading3D);
    
    const timer = setTimeout(() => {
      setLoading3D(false);
    }, isMobile ? 2000 : 3000);

    return () => clearTimeout(timer);
  }, [isMobile]);

  const skills = {
    Technical: [
      { name: "React/Next.js", proficiency: 95, icon: "🚀", description: "Building modern, high-performance web applications with ease" },
      { name: "Three.js/GSAP", proficiency: 90, icon: "🌌", description: "Crafting 3D interactive experiences and animations" },
      { name: "Node.js/Express", proficiency: 90, icon: "⚙️", description: "Backend development for fast, scalable server-side applications" },
      { name: "MongoDB/Database Management", proficiency: 85, icon: "🗄️", description: "Designing efficient, data-driven backends" },
      { name: "Cloudinary/Image Handling", proficiency: 85, icon: "☁️", description: "Seamless cloud-based image and asset management" },
      { name: "AI/ML Research", proficiency: 80, icon: "🧠", description: "Exploring cutting-edge AI concepts and human-AI connection research" }
    ],
    
    Leadership: [
      { name: "Marketing & Strategy", proficiency: 90, icon: "📈", description: "Driving impactful campaigns and strategic growth" },
      { name: "Project Leadership", proficiency: 95, icon: "📊", description: "Leading teams and projects with a clear, structured approach" },
      { name: "Community Building", proficiency: 90, icon: "🤝", description: "Fostering collaborative environments for growth and innovation" },
      { name: "Team Collaboration", proficiency: 92, icon: "👥", description: "Effective teamwork and coordination in cross-functional teams" }
    ]
  };

  const CircularProgress = ({ percentage, icon, name, description }) => (
    <motion.div 
      className={`relative ${isMobile ? 'w-full' : 'w-full max-w-sm'} m-4 p-4`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-2">
        <motion.span 
          className={`${isMobile ? 'text-3xl' : 'text-2xl'}`}
          whileHover={{ rotate: [0, 10, -10, 0] }}
          style={{ filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.5))' }}
        >
          {icon}
        </motion.span>
        <span className={`${isMobile ? 'text-base' : 'text-sm'} text-white font-semibold`}>{name}</span>
      </div>

      <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      <motion.div 
        className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <p className={`${isMobile ? 'text-base' : 'text-sm'} text-center text-white px-4`}>{description}</p>
      </motion.div>
    </motion.div>
  );

  const experiences = [
    {
      year: "2024",
      role: "Quality Assurance Intern",
      company: "",
      description: "Conducting automation testing and ensuring software quality for web applications.",
      achievements: [""],
      tech: ["Automation Testing", "QA Tools", "Software Testing Lifecycle (STLC)","Selenium", "Java"]
    },
    {
      year: "2024",
      role: "Fullstack Developer Intern",
      company: "The Next Move",
      description: "Building dynamic, interactive, web applications with a focus on immersive user experiences.",
      achievements: [
        "Developed a Product Management System with image uploads (Cloudinary) and CRUD functionality",
        "Built a fully functional Blog Website with JWT authentication and Cloudinary image integration",
        "Collaborated with designers and developers to build visually engaging user interfaces",
        "Optimized user experience and ensured responsive design across all devices",
        "Enhanced frontend speed and performance, leading to a 30% increase in load speed"
      ],
      tech: ["React","Node.js", "MongoDB", "JWT", "Cloudinary", "Tailwind CSS", "Frontend Optimization"]
    },
    {
      year: "2024",
      role: "Marketing Head & AI Enthusiast",
      company: "PU AI Society",
      description: "Leading AI-driven initiatives, marketing campaigns, and fostering AI awareness.",
      achievements: [
        "Spearheaded AI research and innovative event campaigns",
        "Built a strong community of AI enthusiasts at Parul University",
        "Organized workshops and seminars on emerging AI technologies"
      ],
      tech: ["AI/ML", "Community Building", "Marketing Strategies"]
    },
  ];

  const FloatingPortrait = () => {
    const meshRef = useRef();
    
    useFrame((state) => {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    });

    return (
      <Float
        speed={isMobile ? 1 : 1.5}
        rotationIntensity={isMobile ? 0.1 : 0.2}
        floatIntensity={isMobile ? 0.3 : 0.5}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[isMobile ? 1 : 1.5, 64, 64]} />
          <meshStandardMaterial 
            color={theme === 'dark' ? '#4B0082' : '#9F2B68'}
            emissive={theme === 'dark' ? '#4B0082' : '#9F2B68'}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    );
  };

  // Optimize SpinningStars component
  const SpinningStars = () => {
    const starsRef = useRef();
    const radius = isMobile ? 200 : 300;
    
    useFrame((state) => {
      if (starsRef.current) {
        const time = state.clock.getElapsedTime();
        const angle = time * (isMobile ? 0.05 : 0.1);
        
        starsRef.current.position.x = Math.cos(angle) * radius * 0.02;
        starsRef.current.position.z = Math.sin(angle) * radius * 0.02;
        starsRef.current.rotation.y = time * (isMobile ? 0.03 : 0.05);
        
        const blinkScale = 1 + Math.sin(time * 2) * (isMobile ? 0.05 : 0.1);
        starsRef.current.scale.set(blinkScale, blinkScale, blinkScale);
      }
    });

    return (
      <group ref={starsRef}>
        <Stars 
          radius={radius} 
          depth={isMobile ? 50 : 100} 
          count={isMobile ? 3500 : 7000} 
          factor={4} 
          saturation={0.9}
          fade
          speed={isMobile ? 1 : 1.5}
        />
        <Stars
          radius={radius * 0.5} 
          depth={isMobile ? 25 : 50}
          count={isMobile ? 1500 : 3000}
          factor={6}
          saturation={0.9}
          fade
          speed={isMobile ? 1.5 : 2}
        />
      </group>
    );
  };

  const LoadingSpinner = () => (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`relative ${isMobile ? 'w-24 h-24' : 'w-32 h-32'} flex items-center justify-center`}
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className={`absolute ${isMobile ? 'w-16 h-16' : 'w-20 h-20'} rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-60`}
          animate={{
            scale: [1, 1.4],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.span className={`relative ${isMobile ? 'text-5xl' : 'text-6xl'} text-purple-300`}>💫</motion.span>
      </motion.div>

      {[...Array(isMobile ? 5 : 10)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-pink-300 rounded-full`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.8,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * (isMobile ? 20 : 40)],
            y: [0, (Math.random() - 0.5) * (isMobile ? 20 : 40)],
            scale: [1, 0.8, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.p
        className={`absolute mt-48 text-white ${isMobile ? 'text-base' : 'text-lg'} font-semibold tracking-wide`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Preparing Your Experience...
      </motion.p>
    </motion.div>
  );
  
  // Add new component for CTA
  const ConnectCTA = () => (
    <motion.div
      className="mt-16 mb-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.p
        className={`${isMobile ? 'text-xl' : 'text-2xl'} text-white font-bold mb-6`}
        animate={{ 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "linear" 
        }}
        style={{
          backgroundImage: 'linear-gradient(90deg, #9333EA, #EC4899, #9333EA)',
          backgroundSize: '200%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}
      >
        Let's build something extraordinary together!
      </motion.p>
      
      <motion.button
        className={`
          ${isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4 text-base'}
          bg-gradient-to-r from-purple-600 to-pink-600
          text-white font-semibold rounded-full
          shadow-lg shadow-purple-500/30
          hover:shadow-purple-500/50
          transition-all duration-300
        `}
        whileHover={{ 
          scale: 1.05,
          y: -2
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/about')}
      >
        <span className="flex items-center gap-2">
          Connect With Me
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            →
          </motion.span>
        </span>
      </motion.button>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-b from-black to-purple-900' : 'bg-gradient-to-b from-gray-100 to-purple-200'} relative overflow-hidden transition-all duration-700`}>
      {/* Snow overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {snowflakesRef.current.map((_, i) => (
          <div
            key={i}
            className="snowflake absolute rounded-full bg-white opacity-80"
            style={{
              width: `${snowflakesRef.current[i].size}px`,
              height: `${snowflakesRef.current[i].size}px`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {loading3D && <LoadingSpinner />}
      </AnimatePresence>

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} min-h-screen`}>
        {/* Left Section - 3D Portrait */}
        <div className={`relative ${isMobile ? 'h-[40vh]' : 'h-[50vh] lg:h-screen'}`}>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 4 : 5]} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2.5}
            />
            <Suspense fallback={null}>
              <Environment preset={theme === 'dark' ? "night" : "sunset"} />
              <ambientLight intensity={theme === 'dark' ? 0.3 : 0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <spotLight
                position={[-10, 10, -10]}
                angle={0.3}
                penumbra={1}
                intensity={theme === 'dark' ? 1 : 0.5}
                color={theme === 'dark' ? "#4B0082" : "#9F2B68"}
              />
              <SpinningStars />
              <group>
                <FloatingPortrait />
                <Points 
                  count={isMobile ? 1000 : 2000}
                  size={isMobile ? 0.01 : 0.015}
                  color={theme === 'dark' ? "#4B0082" : "#9F2B68"}
                  opacity={0.5}
                  sizeAttenuation={true}
                  depthWrite={false}
                />
              </group>
            </Suspense>
          </Canvas>
          
          <motion.div 
            className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10 ${isMobile ? 'w-full px-4 ml-20' : 'w-3/4 px-8'} ${isMobile ? 'text-sm' : 'text-base'} ${isMobile ? 'max-w-xs' : 'max-w-lg'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loading3D ? 0 : 1, y: loading3D ? 20 : 0 }}
            transition={{ delay: 2.5 }}
          >
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl lg:text-5xl'} font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4`}>
              Digital Craftsman
            </h1>
            <p className={`${isMobile ? 'text-sm' : 'text-base lg:text-lg'} text-gray-300 ${isMobile ? 'text-xs' : 'text-base'} ${isMobile ? 'max-w-xs' : 'max-w-lg'} mx-auto`}>
              Blending technology and creativity to build immersive digital experiences
            </p>
          </motion.div>
        </div>

        {/* Right Section - Content */}
        <div className={`relative ${isMobile ? 'p-4' : 'p-8 lg:p-16'} overflow-y-auto`}>
          {/* Philosophy Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loading3D ? 0 : 1 }}
            transition={{ delay: 2.5 }}
            className="mb-16"
          >
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-8`}>Personal Philosophy</h2>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-6'} mb-12`}>
              {philosophies.map((philosophy, index) => (
                <PhilosophyCard key={index} philosophy={philosophy} index={index} />
              ))}
            </div>
            
            {/* Scrolling Mission Statement */}
            <div className="relative overflow-hidden h-16 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl">
              <motion.p
                className={`absolute whitespace-nowrap ${isMobile ? 'text-base' : 'text-lg'} text-purple-200 py-4`}
                animate={{
                  x: ["100%", "-100%"]
                }}
                transition={{
                  duration: isMobile ? 15 : 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                "Crafting digital experiences that inspire wonder and push the boundaries of what's possible. Every line of code is an opportunity to create something extraordinary." 
              </motion.p>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: loading3D ? 0 : 1 }}
            transition={{ delay: 2.5 }}
            className="mb-16"
          >
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-8`}>Expertise</h2>
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.2 }}
                className="mb-12"
              >
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} text-purple-300 mb-6`}>{category}</h3>
                <div className="flex flex-wrap justify-center">
                  {skillList.map((skill) => (
                    <CircularProgress
                      key={skill.name}
                      percentage={skill.proficiency}
                      icon={skill.icon}
                      name={skill.name}
                      description={skill.description}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loading3D ? 0 : 1 }}
            transition={{ delay: 2.5 }}
            className="relative"
          >
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-8`}>Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                >
                  <motion.div 
                    className={`backdrop-blur-lg bg-white/5 rounded-2xl ${isMobile ? 'p-4' : 'p-6'} border border-white/10 cursor-pointer
                      ${expandedCard === index ? 'border-purple-500' : 'hover:border-white/20'}`}
                    animate={{ height: expandedCard === index ? 'auto' : 'auto' }}
                  >
                    <div className={`flex items-center gap-4 mb-4 ${isMobile ? 'flex-col text-center' : ''}`}>
                      <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center`}>
                        <span className="text-white font-bold">{exp.year}</span>
                      </div>
                      <div>
                        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white`}>{exp.role}</h3>
                        <h4 className="text-purple-400">{exp.company}</h4>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedCard === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <p className={`text-gray-300 mb-4 ${isMobile ? 'text-sm' : ''}`}>{exp.description}</p>
                          <ul className={`list-disc list-inside text-gray-300 mb-4 ${isMobile ? 'text-sm' : ''}`}>
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="mb-2">{achievement}</li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((tech) => (
                              <span key={tech} className={`px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Add CTA at the end */}
          <ConnectCTA />
        </div>
      </div>
    </div>
  );
};

export default About;