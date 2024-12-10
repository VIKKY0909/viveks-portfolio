// Required imports
import React, { useEffect, useState } from 'react'; // React essentials
import { Canvas, useLoader } from '@react-three/fiber'; // 3D canvas and loader
import { OrbitControls } from '@react-three/drei'; // Controls for 3D interaction
import { motion } from 'framer-motion'; // For animations
import * as THREE from 'three'; // Three.js core library
import { TextureLoader } from 'three'; // For loading textures
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'; // For loading custom fonts
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'; // For 3D text geometry
import { FaGithub, FaLeetCode, FaHackerrank, FaLinkedin } from 'react-icons/fa'; // React Icons for icons
import { SiCodechef, SiLeetcode } from "react-icons/si";
import { Html } from '@react-three/drei';
const platforms = [
  {
    id: 1,
    name: "GitHub",
    icon: <FaGithub />,
    shape: "hexagon",
    color: "#181717",
    url: "https://github.com/VIKKY0909",
    description: "Explore my open-source contributions and personal projects."
  },
  {
    id: 2,
    name: "LeetCode",
    icon: <SiLeetcode />,
    shape: "cube",
    color: "#FFA116",
    url: "https://leetcode.com/u/VIKKY0909/",
    description: "Check out my coding solutions and problem-solving skills."
  },
  {
    id: 3,
    name: "HackerRank",
    icon: <FaHackerrank />,
    shape: "badge",
    color: "#2EC866",
    url: "https://www.hackerrank.com/profile/vikivahane",
    description: "View my coding achievements on HackerRank."
  },
  {
    id: 4,
    name: "CodeChef",
    icon: <SiCodechef />,
    shape: "medal",
    color: "#5B4638",
    url: "https://www.codechef.com/users/vikivahane",
    description: "Check out my competitive programming on CodeChef."
  },
  {
    id: 5,
    name: "LinkedIn",
    icon: <FaLinkedin />,
    shape: "pill",
    color: "#0077B5",
    url: "https://www.linkedin.com/in/vivek-vahane",
    description: "Connect with me on LinkedIn."
  }
];

const Hologram = ({ name, color, shape, icon, onClick }) => {
  // Use the default font
  const geometry =
    shape === 'hexagon' ? <cylinderGeometry args={[1, 1, 1, 6]} /> : <boxGeometry args={[1, 1, 1]} />;

  return (
    <motion.mesh
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {geometry}
      <meshStandardMaterial color={color} transparent opacity={0.8} />
      <mesh position={[0, 1, 0]}>
        <primitive
          object={new TextGeometry(name, { size: 0.2, height: 0.05 })}
        />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, -0.75, 0]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial color={0xffffff} />
        {icon}
      </mesh>
    </motion.mesh>
  );
};

const CentralHub = () => {
  return (
    <motion.mesh
      position={[0, 0, 0]}
      animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#ffffff" emissive="#00ffcc" />
    </motion.mesh>
  );
};

const MyDigitalFootprint = () => {
  const handlePlatformClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 relative overflow-hidden">
      <h1 className="text-5xl text-white text-center py-10 animate-pulse">My Digital Footprint</h1>
      <h2 className="text-xl text-gray-300 text-center mb-10">Explore the platforms where my skills leave their mark.</h2>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
        <CentralHub />
        {platforms.map((platform, index) => (
          <Hologram
            key={platform.id}
            name={platform.name}
            color={platform.color}
            shape={platform.shape}
            icon={platform.icon}
            onClick={() => handlePlatformClick(platform.url)}
            position={[index * 2 - platforms.length, 0, 0]} // Adjust position for floating effect
          />
        ))}
      </Canvas>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          View All Platforms
        </motion.button>
      </div>
    </div>
  );
};

export default MyDigitalFootprint;
