"use client"; // Required for Framer Motion and event handlers

import React from "react";
import { motion } from "framer-motion";
import {
  FiTrendingUp,    // For Market Trends Analysis (alternative: BsGraphUp)
  FiUsers,         // For Customer Research
  FiDisc,          // For Market Sizing (alternative: BsBullseye)
  FiAward,         // For Competitive Analysis (alternative: MdLeaderboard)
  FiFileText,      // For Business Plan & Pitch Deck
  FiDollarSign,    // For Financial Modeling
  FiTarget,        // For Go-to-Market Strategy
  FiBriefcase,     // For Business Development Strategy
  FiArrowUpRight,  // Arrow icon for cards
} from "react-icons/fi"; // Using react-icons/fi for a consistent set

// --- Service Data ---
interface Service {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const servicesData: Service[] = [
  {
    id: 1,
    icon: FiTrendingUp,
    title: "Market Trends Analysis",
    description: "We analyze market data to spot emerging trends.",
  },
  {
    id: 2,
    icon: FiUsers,
    title: "Customer Research",
    description: "Understand your customers better than ever before.",
  },
  {
    id: 3,
    icon: FiDisc,
    title: "Market Sizing and Forecasting",
    description: "Estimate market potential and forecast growth accurately.",
  },
  {
    id: 4,
    icon: FiAward,
    title: "Competitive Analysis",
    description: "Gain a competitive edge with in-depth analysis.",
  },
  {
    id: 5,
    icon: FiFileText,
    title: "Business Plan & Pitch Deck",
    description: "Craft compelling business plans and pitch decks.",
  },
  {
    id: 6,
    icon: FiDollarSign,
    title: "Financial Modeling & Forecasting",
    description: "Develop robust financial models for decision making.",
  },
  {
    id: 7,
    icon: FiTarget,
    title: "Go-to-Market Strategy",
    description: "Create effective strategies to launch and grow.",
  },
  {
    id: 8,
    icon: FiBriefcase,
    title: "Business Development Strategy",
    description: "Identify and pursue new business opportunities.",
  },
];

// --- Animation Variants ---

// Variants for the overall section container
const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Variants for the heading
const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.5,
    },
  },
};

// Variants for the cards container (to stagger cards within)
const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2, // Delay after heading is mostly visible
    },
  },
};

// Variants for each individual service card
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60, // Start 60px below
  },
  visible: {
    opacity: 1,
    y: 0, // Animate to final position
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 90,
      duration: 0.4,
    },
  },
  hover: {
    backgroundColor: "rgba(54, 74, 67, 1)", // Slightly lighter green: #364A43
    scale: 1.03,
    transition: { duration: 0.2 },
  },
};

const descriptionVariants = {
  initial: { opacity: 0, y: 15, height: 0 },
  hover: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.3, delay: 0.1 },
  },
};

const arrowVariants = {
  initial: { color: "rgba(160, 176, 170, 1)" }, // #A0B0AA - Dimmer text
  hover: { color: "rgba(127, 234, 130, 1)" }, // #7FEA82 - Bright green
};


// --- ServicesSection Component ---
const ServicesSection: React.FC = () => {
  return (
    <motion.section
      className="bg-[#1E2A26] py-16 sm:py-24 overflow-hidden" // Darkest green-gray background
      id="services"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of section is visible
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-100 mb-12 sm:mb-16 text-left"
          variants={headingVariants}
        >
          Services
        </motion.h2>

        <motion.div
          className="flex overflow-x-auto space-x-6 pb-6 scrollbar-thin scrollbar-thumb-[#364A43] scrollbar-track-transparent scrollbar-thumb-rounded"
          variants={cardsContainerVariants}
        >
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              className="bg-[#2A3A35] rounded-2xl p-6 flex-shrink-0 w-72 sm:w-80 h-auto min-h-[15rem] flex flex-col justify-between cursor-pointer group" // Dark green-gray card, fixed width, min height
              variants={cardVariants}
              initial="initial" // refers to variants defined on parent Framer component if not defined here
              whileHover="hover" // custom state for hover effects
              // `animate` prop will be controlled by parent's `whileInView` -> `visible`
            >
              {/* Top part: Icon and Arrow */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <service.icon className="w-10 h-10 text-[#7FEA82]" /> {/* Bright green icon */}
                  <motion.div variants={arrowVariants}>
                    <FiArrowUpRight className="w-6 h-6" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold text-[#C0D0CA] mb-3 group-hover:text-white transition-colors duration-200"> {/* Light green text */}
                  {service.title}
                </h3>
              </div>

              {/* Description - animates on hover */}
              <motion.p
                className="text-sm text-[#A0B0AA] overflow-hidden" // Dimmer text, overflow hidden for height animation
                variants={descriptionVariants}
                // `initial` and `animate` states are driven by parent's `whileHover`
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;