// app/(website)/components/Hero/UserSuppliedHighlightSVG.tsx
import React from 'react';

interface UserSuppliedHighlightSVGProps {
  idSuffix: string;
  style?: React.CSSProperties; // To control width, height, scale via CSS
  className?: string;
}

const UserSuppliedHighlightSVG: React.FC<UserSuppliedHighlightSVGProps> = ({ idSuffix, style, className }) => {
  const paint0Id = `paint0_linear_69_9_${idSuffix}`;
  const paint1Id = `paint1_linear_69_9_${idSuffix}`;

  return (
    <svg
      width="981" // Intrinsic width from your SVG
      height="980" // Intrinsic height from your SVG
      viewBox="0 0 981 980" // Original viewBox
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style} // Apply styles for scaling (e.g., width: '100%', height: '100%')
      className={className}
      // preserveAspectRatio="xMidYMid meet" is the default and will ensure
      // the 981x980 content is scaled to fit the CSS dimensions and centered.
    >
      <g style={{ mixBlendMode: 'plus-lighter' }}>
        <path
          d="M1.2544 505.787C-1.76863 412.01 22.1959 319.336 70.3 238.78"
          stroke={`url(#${paint0Id})`}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M1.2544 505.787C-1.76863 412.01 22.1959 319.336 70.3 238.78"
          stroke={`url(#${paint1Id})`}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <linearGradient
          id={paint0Id}
          x1="0.996943"
          y1="500.947"
          x2="90.6565"
          y2="108.425"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.245" stopColor="white" stopOpacity="0.3" />
          <stop offset="0.661847" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={paint1Id}
          x1="18.5039"
          y1="372"
          x2="1.00391"
          y2="515"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default UserSuppliedHighlightSVG;