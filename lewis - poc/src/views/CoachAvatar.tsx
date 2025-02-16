import React from 'react';

const CoachAvatar = () => {
  return (
    <div className="w-10 h-10 relative">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
      >
        <defs>
          {/* Liquid gradient animation */}
          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0090f2">
              <animate
                attributeName="stop-color"
                values="#0090f2; #7C3AED; #0090f2"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#7C3AED">
              <animate
                attributeName="stop-color"
                values="#7C3AED; #0090f2; #7C3AED"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Turbulence filter for liquid effect */}
          <filter id="liquid">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.001 0.001"
              numOctaves="2"
              seed="1"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01 0.01;0.015 0.015;0.01 0.01"
                dur="10s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              scale="5"
            />
          </filter>

          {/* Soft glow effect */}
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite
              in="SourceGraphic"
              in2="blur"
              operator="over"
            />
          </filter>
        </defs>

        {/* Background circle with liquid gradient */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#liquidGradient)"
          filter="url(#liquid)"
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />

        {/* Your custom SVG goes here */}
        {/* Example: */}
        <g transform="translate(25, 25) scale(0.5)">
          {/* 
            Add your custom SVG paths/elements here
            The transform helps center and scale the SVG within the circle
          */}
          {/* Example placeholder icon */}
          <path
            d="M50 25C37.5 25 27.5 35 27.5 47.5C27.5 60 37.5 70 50 70C62.5 70 72.5 60 72.5 47.5C72.5 35 62.5 25 50 25Z"
            fill="white"
            opacity="0.2"
          />
        </g>
      </svg>
      
    </div>
  );
};

export default CoachAvatar;