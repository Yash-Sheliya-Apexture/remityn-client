// src/types.ts (or your preferred location for types)
import React from "react";
import { IconType } from "react-icons";

export interface ContentBlock {
  text: string;
  type?: "default" | "success" | "warning" | "secondry";
}

export interface StepData {
  id: number;
  iconDefault: IconType;
  iconActive: IconType;
  contentTitle: string;
  contentSubtitle: React.ReactNode;
  contentImages: {
    img: string;
    imgTitle: string; // <-- ADD THIS LINE
  };
  contentBlocks?: ContentBlock[];
}