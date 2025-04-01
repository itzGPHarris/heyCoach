import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

/**
 * Component to display a confetti animation when scoring a run
 */
const Confetti: React.FC<ConfettiProps> = ({ active, duration = 2000 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const startTimeRef = useRef<number | null>(null);
  
  // Configuration for confetti particles
  const particleCount = 150;
  const particleColors = [
    '#f44336', // red
    '#2196f3', // blue
    '#ffeb3b', // yellow
    '#4caf50', // green
    '#9c27b0', // purple
    '#ff9800', // orange
  ];
  
  // Create confetti particles
  const createConfetti = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
      });
    }
    
    particlesRef.current = particles;
    startTimeRef.current = Date.now();
  };
  
  // Animate confetti
  const animateConfetti = () => {
    if (!canvasRef.current || !startTimeRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate elapsed time
    const elapsedTime = Date.now() - startTimeRef.current;
    
    // Stop animation if duration is exceeded
    if (elapsedTime > duration) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    
    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.rotation += particle.rotationSpeed;
      
      // Draw particle
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      ctx.restore();
    });
    
    animationFrameRef.current = requestAnimationFrame(animateConfetti);
  };
  
  // Start confetti animation when active is true
  useEffect(() => {
    if (active) {
      createConfetti();
      animationFrameRef.current = requestAnimationFrame(animateConfetti);
    } else {
      // Cancel animation when not active
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Clear canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    }
    
    // Cleanup function
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
        display: active ? 'block' : 'none',
      }}
    />
  );
};

export default Confetti;