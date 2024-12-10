// src/components/Hero.js
import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D, Environment, PerspectiveCamera, Float, useTexture, useGLTF, shaderMaterial } from '@react-three/drei';
import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';

// Custom shader material for fog effect
const FogMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.1, 0.1, 0.1),
  },
  // vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    
    void main() {
      vec2 position = vUv * 2.0 - 1.0;
      float d = length(position) * 0.5;
      vec3 fogColor = color;
      float strength = smoothstep(0.0, 0.8, sin(d * 10.0 - time));
      gl_FragColor = vec4(fogColor, strength * 0.3);
    }
  `
);

extend({ FogMaterial });

const Fog = () => {
  const materialRef = useRef();
  
  useFrame((state) => {
    materialRef.current.time = state.clock.elapsedTime;
  });

  return (
    <mesh>
      <planeGeometry args={[50, 50]} />
      <fogMaterial ref={materialRef} transparent={true} />
    </mesh>
  );
};

// Custom 3D text component with enhanced materials and effects
const AnimatedText3D = ({ text, position, size, color, emissive }) => {
  const meshRef = useRef();
  const { viewport } = useThree();

  // Adjust size based on viewport width
  const responsiveSize = viewport.width < 5 ? size * 0.6 : size;

  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <Text3D
      ref={meshRef}
      font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
      size={responsiveSize}
      height={responsiveSize * 0.15}
      curveSegments={64}
      bevelEnabled
      bevelThickness={responsiveSize * 0.03}
      bevelSize={responsiveSize * 0.02}
      bevelOffset={0}
      bevelSegments={16}
    >
      <meshPhysicalMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={1.2}
        metalness={0.9}
        roughness={0.1}
        clearcoat={1.5}
        clearcoatRoughness={0.1}
        reflectivity={1}
        transmission={0.1}
      >
        {text}
      </meshPhysicalMaterial>
    </Text3D>
  );
};

// Animated Text using Framer Motion
const AnimatedText = ({ text, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="whitespace-normal break-words"
  >
    {text.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.2, color: '#00ff88' }}
        transition={{ duration: 0.5, delay: delay + index * 0.05 }}
        style={{ display: 'inline-block' }}
      >
        {char}
      </motion.span>
    ))}
  </motion.div>
);

// Damaged Helmet 3D Model with Mouse Interaction
const DamagedHelmet = () => {
  const { scene } = useGLTF('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf');
  const meshRef = useRef();
  const { viewport } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  // Adjust scale based on viewport width
  const scale = viewport.width < 5 ? 1.2 : 2;
  const xPosition = viewport.width < 5 ? -1 : -2;

  useFrame((state) => {
    const mouse = state.mouse;
    targetRotation.current.y = mouse.x * 0.5;
    targetRotation.current.x = -mouse.y * 0.3;

    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

    meshRef.current.rotation.x = currentRotation.current.x + -Math.PI/12;
    meshRef.current.rotation.y = currentRotation.current.y + Math.PI/9;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      position={[xPosition, 0, 0]}
      rotation={[-Math.PI/12, Math.PI/9, 0]}
      scale={scale}
    />
  );
};

useGLTF.preload('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf');

// Main Hero Component
const Hero = () => {
  const [theme, setTheme] = useState('dark');
  const mousePosition = useRef({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const Scene = () => {
    const { viewport } = useThree();
    
    return (
      <Suspense fallback={null}>
        <Environment preset={theme === 'dark' ? "night" : "sunset"} />
        
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={1} />

        <Float speed={1.5} rotationIntensity={0.7} floatIntensity={0.6}>
          <group position={[0, viewport.width < 5 ? 0.5 : 1, 0]}>
            <AnimatedText3D
              text="Vivek Vahane"
              size={0.5}
              color={theme === 'dark' ? "#5f9fff" : "#3a5da9"}
              emissive={theme === 'dark' ? "#2e4ca9" : "#5f9fff"}
            />
          </group>
        </Float>

        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
          <group position={[0, viewport.width < 5 ? -0.5 : 0, 0]}>
            <AnimatedText3D
              text="Frontend Developer & Creative Technologist"
              size={viewport.width < 5 ? 0.08 : 0.12}
              color={theme === 'dark' ? "#ff7b7b" : "#a94343"}
              emissive={theme === 'dark' ? "#762121" : "#ff7b7b"}
            />
          </group>
        </Float>

        <pointLight position={[0, 2, -1]} intensity={1} />
        <ambientLight intensity={theme === 'dark' ? 0.2 : 0.5} />
        <directionalLight position={[5, 5, 5]} intensity={theme === 'dark' ? 0.5 : 1} color={theme === 'dark' ? "#4f8fff" : "#ffffff"} />
        <directionalLight position={[-5, -5, -5]} intensity={theme === 'dark' ? 0.3 : 0.5} color={theme === 'dark' ? "#ff6b6b" : "#ffaa77"} />

        <group position={[0, -viewport.height / 4, 1]}>
          <Fog />
        </group>
      </Suspense>
    );
  };

  return (
    <section className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'} transition-colors duration-700`}>
      <div className="relative w-full h-screen">
        <Canvas 
          className="absolute inset-0" 
          dpr={[1, 2]} 
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <DamagedHelmet />
          <OrbitControls enabled={true} />
          <Stars radius={400} depth={500} count={100000} factor={4} fade={true} speed={1.5} />
          <Scene />
        </Canvas>

        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center md:items-end pointer-events-none px-4 md:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold mb-4 md:mb-6 text-gray-500">
              <AnimatedText text="Vivek Vahane" />
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-4xl text-gray-500 mb-8 md:mb-12 font-semibold">
              <AnimatedText text="Frontend Developer & Creative Technologist" delay={0.5} />
            </h2>
            <motion.button
              className={`px-6 md:px-12 py-3 md:py-5 rounded-full text-lg md:text-xl font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-lg transition-all pointer-events-auto backdrop-blur-sm`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
            >
              Explore More
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;