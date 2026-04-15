import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const springX = useSpring(mousePosition.x - 16, { damping: 25, stiffness: 250 });
  const springY = useSpring(mousePosition.y - 16, { damping: 25, stiffness: 250 });

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 2 : 1,
          backgroundColor: isHovered ? 'rgba(0, 242, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
          borderColor: isHovered ? '#00f2ff' : 'rgba(255, 255, 255, 0.5)',
        }}
        className="w-full h-full rounded-full border border-white/30 backdrop-blur-sm transition-colors duration-300 flex items-center justify-center"
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
