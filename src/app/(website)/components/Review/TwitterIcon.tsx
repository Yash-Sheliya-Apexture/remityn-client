// src/TwitterIcon.tsx
import Image from "next/image";
import React from "react";

interface TwitterIconProps extends React.SVGProps<SVGSVGElement> {}

const TwitterIcon: React.FC<TwitterIconProps> = (props) => (
  <Image
    src="/assets/images/google.svg"
    alt="google logo"
    width={30}
    height={30}
    className="object-cover"
  />
);

export default TwitterIcon;
