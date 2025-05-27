// src/components/ui/ParamnemaDotsSVG.tsx (or a similar path)
"use client"; // If using Next.js App Router and `useMemo`

import React, { useMemo } from "react";

interface ParamnemaDotsSVGProps {
  numStars?: number;
  starColor?: string;
  skyColor?: string;
  className?: string;
}

const ParamnemaDotsSVG: React.FC<ParamnemaDotsSVGProps> = ({
  numStars = 75, // Default number of stars
  starColor = "white",
  skyColor = "#0D0E1F", // Dark blue/black for the sky
  className,
}) => {
  const viewBoxWidth = 1000;
  // Approximate aspect ratio of the original visual (wide and short arc)
  const viewBoxHeight = 300; // Adjusted slightly for a bit more vertical space for the arc

  const stars = useMemo(() => {
    const generatedStars = [];
    for (let i = 0; i < numStars; i++) {
      generatedStars.push({
        id: `star-${i}`,
        cx: Math.random() * viewBoxWidth,
        // Distribute stars more towards the top, within the typical arc area
        cy: Math.random() * (viewBoxHeight * 0.85), // Concentrate in upper 85%
        r: Math.random() * 1.2 + 0.4, // Star radius: 0.4 to 1.6
      });
    }
    return generatedStars;
  }, [numStars, viewBoxWidth, viewBoxHeight]);

  // Define the shape of the sky arc for the clipPath
  // M (move to), Q (quadratic Bezier curve), L (line to), Z (close path)
  const topArcEdgeY = viewBoxHeight * 0.25; // e.g., 75 if viewBoxHeight is 300
  const topArcDipControlY = viewBoxHeight * 0.05; // e.g., 15 if viewBoxHeight is 300 (lower value = deeper dip)

  const clipPathShape = `
    M0,${topArcEdgeY}
    Q${viewBoxWidth / 2},${topArcDipControlY} ${viewBoxWidth},${topArcEdgeY}
    L${viewBoxWidth},${viewBoxHeight}
    L0,${viewBoxHeight}
    Z
  `;

  const clipPathId = useMemo(() => `skyClipPath-${Math.random().toString(36).substr(2, 9)}`, []);


  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice" // Fill the container, maintaining aspect ratio, may slice parts of SVG
      className={className}
      aria-hidden="true" // Decorative
    >
      <defs>
        <clipPath id={clipPathId}>
          <path d={clipPathShape} />
        </clipPath>
      </defs>

      {/* Apply the clip path to a group containing the sky and stars */}
      <g clipPath={`url(#${clipPathId})`}>
        {/* Sky Background */}
        <rect
          width={viewBoxWidth}
          height={viewBoxHeight}
          fill={skyColor}
        />

        {/* Stars */}
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill={starColor}
            opacity={Math.random() * 0.5 + 0.5} // Slight opacity variation
          />
        ))}
      </g>
    </svg>
  );
};

export default ParamnemaDotsSVG;