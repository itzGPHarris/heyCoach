import { useEffect, useState } from 'react';

const CoachAvatar = () => {
    const [isThinking, setIsThinking] = useState(false);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setIsThinking(prev => !prev);
      }, 3000);
      
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="w-full h-full relative">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0090fc', stopOpacity: 1 }} />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

             {/* Highlight gradient for glass effect */}
             <linearGradient id="glassHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.4 }} />
              <stop offset="50%" style={{ stopColor: 'white', stopOpacity: 0 }} />
              <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0.1 }} />
            </linearGradient>
            
            {/* Enhanced glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Drop shadow filter */}
            <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feOffset in="SourceAlpha" dx="0" dy="2" />
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor="#000000" floodOpacity="0.2" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

  
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#avatarGradient)"
            className={`transition-all duration-1000 ${isThinking ? 'opacity-90' : 'opacity-100'}`}
          />
  
          {/* Background orbiting dot */}
          <circle
            cx="95"
            cy="50"
            r="4"
            fill="white"
            opacity="0.3"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="15s"
              repeatCount="indefinite"
            />
          </circle>
  
          {/* Rotating orbital system */}
          <g>
            {/* Full rotation animation for the entire system */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="7s"
              repeatCount="indefinite"
            />
  
            {/* Center dot */}
            <circle
              cx="50"
              cy="50"
              r="3.4"
              fill="white"
              filter="url(#glow)"
              className="animate-pulse"
              style={{ animationDuration: '3s' }}
            />
            
            {/* Orbiting dots with connecting lines */}
            {[0, 120, 240].map((rotation, index) => (
              <g key={index}>
                {/* Connecting line */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="20"
                  stroke="white"
                  strokeWidth=".5"
                  opacity="0.5"
                  transform={`rotate(${rotation} 50 50)`}
                />
                
                {/* Orbiting dot */}
                <circle
                  cx="50"
                  cy="20"
                  r={index === 0 ? 5 : index === 1 ? 3 : 8}
                  fill="white"
                  transform={`rotate(${rotation} 50 50)`}
                  className="animate-pulse"
                  style={{ animationDuration: `${3 + index}s` }}
                >
                  <animate
                    attributeName="opacity"
                    values={`${index % 2 === 0 ? '0.3;0.7;0.9' : '0.1;0.5;0.3'}`}
                    dur={`${3 + index}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </g>
        </svg>
      </div>
    );
  };
  
  export default CoachAvatar;