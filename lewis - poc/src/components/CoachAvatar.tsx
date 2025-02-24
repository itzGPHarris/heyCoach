/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/CoachAvatar.tsx
import React from 'react';

const CoachAvatar: React.FC<{ size?: number }> = ({ size = 40 }) => (
    <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse opacity="0.3" cx="23" cy="43" rx="13" ry="2" fill="url(#paint0_radial_515_86)"/>
<rect x="2" y="2" width="40" height="40" rx="20" fill="#8CD0FF"/>
<rect x="2" y="2" width="40" height="40" rx="20" fill="url(#paint1_radial_515_86)" fill-opacity="0.3" style={{ mixBlendMode: 'multiply' }}/>
<ellipse cx="17.5" cy="18.4963" rx="13.5" ry="14.5" fill="url(#paint2_radial_515_86)" style={{ mixBlendMode: 'lighten' }}/>
<path opacity="0.5" d="M21.7987 12.4067C20.8342 12.9659 20.2072 13.7896 19.9177 14.8778C20.2072 13.7896 20.0724 12.7632 19.5133 11.7987C18.9542 10.8343 18.1305 10.2073 17.0422 9.91778C18.1305 10.2073 19.1568 10.0725 20.1213 9.51337C21.0858 8.95424 21.7127 8.13054 22.0023 7.04227C21.7127 8.13054 21.8475 9.15691 22.4067 10.1214C22.9658 11.0858 23.7895 11.7128 24.8778 12.0023C23.7895 11.7128 22.7631 11.8476 21.7987 12.4067Z" fill="white"/>
<path opacity="0.5" d="M30.7316 19.5423C29.4456 20.2878 28.6097 21.3861 28.2236 22.8371C28.6097 21.3861 28.4299 20.0176 27.6844 18.7317C26.9389 17.4457 25.8406 16.6097 24.3896 16.2237C25.8406 16.6097 27.2091 16.43 28.4951 15.6845C29.781 14.939 30.617 13.8407 31.003 12.3897C30.617 13.8407 30.7967 15.2092 31.5422 16.4951C32.2877 17.7811 33.386 18.6171 34.837 19.0031C33.386 18.6171 32.0175 18.7968 30.7316 19.5423Z" fill="white"/>
<path opacity="0.9" d="M23.5872 33.348C21.4937 34.5892 20.1327 36.4178 19.5043 38.8338C20.1327 36.4178 19.8401 34.1393 18.6264 31.9982C17.4127 29.8571 15.6248 28.4652 13.2625 27.8225C15.6248 28.4652 17.8527 28.1659 19.9462 26.9247C22.0397 25.6834 23.4007 23.8548 24.0291 21.4388C23.4007 23.8548 23.6933 26.1333 24.907 28.2744C26.1206 30.4155 27.9086 31.8074 30.2709 32.4502C27.9086 31.8074 25.6807 32.1067 23.5872 33.348Z" fill="white"/>
<defs>
<radialGradient id="paint0_radial_515_86" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(23 43) rotate(90) scale(2 13)">
<stop stop-opacity="0.9"/>
<stop offset="0.528864" stop-opacity="0.424022"/>
<stop offset="0.778864" stop-opacity="0.199022"/>
<stop offset="1" stop-opacity="0"/>
</radialGradient>
<radialGradient id="paint1_radial_515_86" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21 20.9963) rotate(-163.009) scale(18.8215)">
<stop stop-color="#005996"/>
<stop offset="0.617647" stop-color="#AFCBDE"/>
<stop offset="1" stop-color="#005996"/>
</radialGradient>
<radialGradient id="paint2_radial_515_86" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.5 18.4963) rotate(90) scale(14.5 13.5)">
<stop stop-color="white" stop-opacity="0.9"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</radialGradient>
</defs>
</svg>

    
);

export default CoachAvatar;