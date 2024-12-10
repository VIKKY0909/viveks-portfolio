import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, SpotLight } from '@react-three/drei';
import { FaReact, FaNodeJs, FaPython, FaGithub, FaDocker, FaHtml5, FaCss3, FaJsSquare } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiTensorflow, SiTypescript, SiAws, SiExpress, SiNumpy, SiJsonwebtokens, SiCloudinary, SiFigma, SiJirasoftware, SiScikitlearn, SiVisualstudiocode } from 'react-icons/si';
import { FaTasks, FaUsers, FaChartBar, FaGitAlt } from 'react-icons/fa';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const skillCategories = {
    frontend: [
      {
        name: "React.js",
        icon: FaReact,
        color: "#61DAFB",
        level: 80,
        description: 
          "Expert in building dynamic, scalable, and responsive user interfaces using React.js. Skilled in managing component-driven development, hooks, Context API, and state management tools like Redux. Experienced in creating reusable design patterns for maintainable frontends."
      },
      {
        name: "HTML5",
        icon: FaHtml5,
        color: "#E34F26",
        level: 90,
        description: 
          "Strong understanding of semantic HTML5 for accessible and SEO-friendly development. Skilled in building well-structured layouts, cross-browser compatibility, and clean markup for robust web applications."
      },
      {
        name: "CSS3",
        icon: FaCss3,
        color: "#1572B6",
        level: 90,
        description: 
          "Advanced skills in CSS3 for crafting visually appealing, responsive designs. Proficient in Flexbox, Grid, animations, and transitions to enhance user experiences with smooth, modern interactions."
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "#06B6D4",
        level: 85,
        description: 
          "Skilled in utility-first CSS for rapid UI development. Expert in creating consistent, responsive, and aesthetic designs while maintaining a clean and scalable codebase. Proficient in component-based design using Tailwind utilities."
      },
      {
        name: "JavaScript (ES6+)",
        icon: FaJsSquare,
        color: "#F7DF1E",
        level: 80,
        description: 
          "Advanced proficiency in modern JavaScript (ES6+). Expertise in asynchronous programming, closures, promises, event handling, and clean, maintainable code. Capable of working with APIs, DOM manipulation, and advanced browser-side logic."
      }
    ],
    
    backend: [
      {
        name: "Node.js",
        icon: FaNodeJs,
        color: "#339933",
        level: 85,
        description: 
          "Proficient in building scalable, high-performance backend applications with Node.js. Skilled in event-driven programming, non-blocking I/O, and real-time applications. Capable of handling server-side logic and file system operations."
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "#000000",
        level: 80,
        description: 
          "Expertise in creating fast, lightweight server-side applications with Express.js. Skilled in creating RESTful APIs, routing, middleware, and secure API endpoints. Adept at handling complex backend logic and integrations."
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#47A248",
        level: 80,
        description: 
          "Hands-on experience with NoSQL databases like MongoDB. Proficient in schema design, data modeling, query optimization, and aggregation pipelines for efficient data storage and retrieval."
      },
      {
        name: "JWT (Authentication)",
        icon: SiJsonwebtokens,
        color: "#E65100",
        level: 75,
        description: 
          "Proficient in user authentication and authorization using JWT. Experienced in implementing secure login systems and user verification flows for web applications."
      },
      {
        name: "Cloudinary (Media Management)",
        icon: SiCloudinary,
        color: "#2F8CBB",
        level: 80,
        description: 
          "Experience with Cloudinary for image and media asset management. Skilled in implementing secure uploads, transformations, and optimizations for efficient content delivery."
      }
    ],
    
    product_management: [
      {
        name: "Agile & Scrum",
        icon: SiJirasoftware,
        color: "#0052CC",
        level: 80,
        description: 
          "Experienced in Agile methodologies and Scrum practices. Skilled in sprint planning, backlog refinement, and cross-functional team collaboration for product development and iterative improvements."
      },
      {
        name: "Project Management",
        icon: FaTasks,
        color: "#1D3557",
        level: 85,
        description: 
          "Skilled in end-to-end project management. Expertise in requirement gathering, stakeholder management, risk assessment, and deadline tracking. Experience in leading teams for successful product delivery."
      },
      {
        name: "Team Collaboration",
        icon: FaUsers,
        color: "#2D4059",
        level: 90,
        description: 
          "Experienced in leading cross-functional teams. Excellent stakeholder communication and interpersonal skills. Successfully led frontend teams for project delivery at 'The Next Move'."
      }
    ],
  
    ai_ml: [
      {
        name: "Python",
        icon: FaPython,
        color: "#3776AB",
        level: 75,
        description: 
          "Comprehensive understanding of Python for machine learning, automation, and web scraping. Proficient in data analysis and scripting with libraries like Pandas and NumPy."
      },
      {
        name: "Machine Learning",
        icon: SiScikitlearn,
        color: "#F7931E",
        level: 55,
        description: 
          "Hands-on experience with machine learning models like logistic regression, decision trees, and ensemble models. Trained to apply data pre-processing and feature engineering techniques."
      },
      {
        name: "TensorFlow",
        icon: SiTensorflow,
        color: "#FF6F00",
        level: 50,
        description: 
          "Familiarity with TensorFlow for building and training deep learning models. Skilled in model evaluation, training loops, and tuning hyperparameters for better model performance."
      },
      {
        name: "Data Analysis",
        icon: FaChartBar,
        color: "#457B9D",
        level: 65,
        description: 
          "Proficient in data analysis and visualization using Python, Pandas, and Matplotlib. Skilled in analyzing trends and extracting actionable insights from datasets."
      }
    ],
    
    tools: [
      {
        name: "Git",
        icon: FaGitAlt,
        color: "#F05032",
        level: 85,
        description: 
          "Proficient in Git for version control, branch management, and collaborative development. Experienced in using GitHub for pull requests, code reviews, and CI/CD workflows."
      },
      {
        name: "GitHub",
        icon: FaGithub,
        color: "#181717",
        level: 85,
        description: 
          "Experience in managing repositories, version control, and collaboration through GitHub. Skilled in pull requests, issue tracking, and contributing to open-source projects."
      },
      {
        name: "VS Code",
        icon: SiVisualstudiocode,
        color: "#007ACC",
        level: 90,
        description: 
          "Proficient with Visual Studio Code as the primary development environment. Experience with extensions for productivity, debugging, and code linting."
      },
      {
        name: "Jira & Task Management",
        icon: SiJirasoftware,
        color: "#0052CC",
        level: 50,
        description: 
          "Experienced in task tracking and issue management using Jira. Skilled in defining user stories, tracking sprints, and managing product backlogs for Agile development."
      }
    ]
  };
  

  const ParticleField = () => {
    const particlesRef = useRef();
    
    useFrame(({ clock }) => {
      if (particlesRef.current) {
        particlesRef.current.rotation.y = clock.getElapsedTime() * 0.5;
        const opacity = hoveredSkill ? 0.8 : 0.5;
        particlesRef.current.material.opacity = opacity;
      }
    });

    return (
      <>
        <color attach="background" args={['#000B1E']} />
        <Stars ref={particlesRef} radius={30} depth={1000} count={1800000} factor={8} saturation={0.8} fade speed={1.5} />
        <ambientLight intensity={0.5} />
        <SpotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.9} color="#4B0082" castShadow />
      </>
    );
  };

  const SkillCard = ({ skill }) => {
    const isHovered = hoveredSkill === skill.name;
    const cardRef = useRef();

    return (
      <motion.div
        ref={cardRef}
        className="relative cursor-pointer perspective-1000"
        onClick={() => setActiveSkill(skill)}
        onHoverStart={() => setHoveredSkill(skill.name)}
        onHoverEnd={() => setHoveredSkill(null)}
        animate={{
          y: [0, 10, 0],
          rotateX: [0, 2, 0],
          rotateY: [0, -2, 0],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
        whileHover={{ 
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1.05,
          transition: { duration: 0.2 } 
        }}
        style={{
          position: 'relative',
          animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`
        }}
      >
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl"
          initial={{ boxShadow: `0 0 20px ${skill.color}40` }}
          animate={{
            boxShadow: isHovered 
              ? `0 0 40px ${skill.color}80, inset 0 0 20px ${skill.color}40`
              : `0 0 20px ${skill.color}40`
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Card Content */}
        <div className="relative bg-white/5 rounded-2xl p-8 border border-white/20 
                      transform-gpu transition-all duration-300 
                      hover:bg-white/10">
          {/* Top Section */}
          <div className="relative mb-6">
            {/* Icon with orbital ring animation */}
            <div className="relative w-24 h-24 mx-auto">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid ${skill.color}40`,
                  borderRadius: '50%'
                }}
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 8,
                  ease: "linear",
                  repeat: Infinity
                }}
              />
              <skill.icon 
                className="w-full h-full p-4"
                style={{ 
                  color: skill.color,
                  filter: isHovered ? `drop-shadow(0 0 30px ${skill.color}) brightness(1.5)` : `drop-shadow(0 0 20px ${skill.color}60)`
                }}
              />
            </div>
            
            {/* Skill Name */}
            <h3 className="text-2xl font-bold text-center text-white mt-4 mb-2">
              {skill.name}
            </h3>
            
            {/* Experience Level Label */}
            <div className="text-center text-white/60 text-sm mb-4">
              {skill.level >= 85 ? 'Expert' : skill.level >= 70 ? 'Advanced' : 'Intermediate'}
            </div>
          </div>

          {/* Proficiency Bar */}
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isHovered ? `${skill.level}%` : '0%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute h-full rounded-full"
              style={{ 
                background: `linear-gradient(90deg, 
                  ${skill.color}80 0%, 
                  ${skill.color} 100%
                )`
              }}
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" 
                   style={{ backgroundColor: skill.color }} />
              <span>Proficiency: {skill.level}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/50" />
              <span>Click for details</span>
            </div>
          </div>

          {/* Hover Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 
                           bg-black/90 text-white px-4 py-2 rounded-lg 
                           whitespace-nowrap
                           border border-white/10"
              >
                <div className="text-sm font-medium">{skill.level}% Mastery Level</div>
                <div className="w-4 h-4 absolute -bottom-2 left-1/2 -translate-x-1/2 
                              rotate-45 bg-black/90 border-r border-b border-white/10" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  const SkillModal = ({ skill, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        // animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: `linear-gradient(135deg, 
            ${skill.color}10 0%, 
            ${skill.color}20 100%
          )`,
          boxShadow: `0 0 40px ${skill.color}40`
        }}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <skill.icon className="w-16 h-16" style={{ color: skill.color }} />
              <div>
                <h2 className="text-4xl font-bold text-white">{skill.name}</h2>
                <p className="text-white/60">Proficiency: {skill.level}%</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-white/60 hover:text-white"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-2xl font-semibold text-white mb-4">Description</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                {skill.description}
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const CategoryFilter = () => (
    <div className="flex justify-center gap-4 mb-12">
      {['all', ...Object.keys(skillCategories)].map(category => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory(category)}
          className={`
            px-6 py-2 rounded-full text-white font-medium
            transition-colors duration-200
            ${selectedCategory === category ? 'bg-white/20' : 'bg-white/5'}
          `}
        >
          {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('/')}
        </motion.button>
      ))}
    </div>
  );

  const filteredSkills = selectedCategory === 'all'
    ? Object.values(skillCategories).flat()
    : skillCategories[selectedCategory] || [];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#000B1E] via-[#1B0B3B] to-[#000B1E]">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
      <div className="absolute inset-0">
        <Canvas>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true} 
            autoRotate 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <ParticleField />
        </Canvas>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-7xl font-bold text-center text-white mb-8"
            style={{
              textShadow: '0 0 30px rgba(255,255,255,0.3)',
            }}
          >
            Tech Arsenal
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-center text-white/80 mb-16 max-w-3xl mx-auto"
          >
            Explore my technical expertise and the tools I use to create exceptional digital experiences
          </motion.p>

          <CategoryFilter />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredSkills.map(skill => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {activeSkill && (
              <SkillModal 
                skill={activeSkill} 
                onClose={() => setActiveSkill(null)} 
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Skills;