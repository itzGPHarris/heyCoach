/* eslint-disable react-hooks/rules-of-hooks */
import {  useState } from 'react';
import React from 'react';


const CoachSpinner = () => {
   const [isThinking] = useState(false);
    
    {/*useEffect(() => {
      const interval = setInterval(() => {
        setIsThinking(prev => !prev);
      }, 3000);
      
      return () => clearInterval(interval);
    }, []);
  */}
    return (
      <div className="w-full h-full relative">
        <svg 
          viewBox="0 0 120 120" 
          className="w-full h-full"
        >
          <defs>
            {/* Base gradient */}
            <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0090fc', stopOpacity: 1 }} />
            </linearGradient>

            {/* Spherical highlight gradient */}
            <radialGradient id="sphereHighlight" cx="30%" cy="30%" r="70%">
              <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.4 }} />
              <stop offset="50%" style={{ stopColor: 'white', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
            </radialGradient>

            {/* Edge highlight */}
            <linearGradient id="edgeHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.2 }} />
              <stop offset="15%" style={{ stopColor: 'white', stopOpacity: 0 }} />
              <stop offset="85%" style={{ stopColor: 'white', stopOpacity: 0 }} />
              <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0.2 }} />
            </linearGradient>

            {/* Blur filter for shadow */}
            <filter id="shadowBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>

            {/* Glow effect for dots */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Main avatar group with lift */}
          <g transform="translate(0, -1)">
            {/* Blurred shadow */}
            <ellipse
              cx="45"
              cy="92"
              rx="28"
              ry="6"
              fill="black"
              opacity="0.32"
              filter="url(#shadowBlur)"
            />

            {/* Main sphere group */}
            <g>
              {/* Base circle with gradient */}
              <circle
                cx="45"
                cy="45"
                r="43"
                fill="url(#avatarGradient)"
                className={`transition-all duration-1000 ${isThinking ? 'opacity-90' : 'opacity-100'}`}
              />
  {/* Background orbiting dot */}
              <circle
                cx="95"
                cy="50"
                r="8"
                fill="#f9d800"
                opacity="0.5"
                className="animate-pulse"
              >
              {/* Spherical highlight overlay */}
              <circle
                cx="45"
                cy="45"
                r="45"
                fill="url(#sphereHighlight)"
              />

              {/* Edge highlight */}
              <circle
                cx="45"
                cy="45"
                r="45"
                fill="url(#edgeHighlight)"
              />

            
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
                  cx="45"
                  cy="45"
                  r="2.4"
                  fill="#16d335"
                  filter="url(#glow)"
                  className="animate-pulse"
                  style={{ animationDuration: '3s' }}
                />
                
                {/* Orbiting dots with connecting lines */}
                {[0, 120, 240].map((rotation, index) => (
                  <g key={index}>
                    {/* Connecting line */}
                    <line
                      x1="45"
                      y1="45 "
                      x2="48"
                      y2="20"
                      stroke="#16d335"
                      strokeWidth=".5"
                      opacity="0.5"
                      transform={`rotate(${rotation} 50 50)`}
                    />
                    
                    {/* Orbiting dot */}
                    <circle
                      cx="48"
                      cy="20"
                      r={index === 0 ? 5 : index === 1 ? 3 : 8}
                      fill="#16d335"
                      transform={`rotate(${rotation} 50 50)`}
                      className="animate-pulse"
                      style={{ animationDuration: `${.5 + index}s` }}
                    >
                      <animate
                        attributeName="opacity"
                        values={`${index % 2 === 0 ? '0.7;0.3;0.9' : '0.1;0.5;0.7'}`}
                        dur={`${1 + index}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
};

export default CoachSpinner;