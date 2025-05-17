// import React from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import Image from "next/image";
// import Link from "next/link";
// import USD from "../../../../public/assets/icons/usd.svg";

// const SocialTrustSection = () => {
//   return (
//     <section className="py-16 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex">
//           <div className="w-1/2">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tighter">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//               <div className="p-4 bg-green/10 rounded-full">
//                 <GoArrowLeft size={36} className="text-green" />
//               </div>
//               <div className="p-4 bg-green/10 rounded-full">
//                 <GoArrowRight size={36} className="text-green" />
//               </div>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="w-1/2">

//           <div className="flex flex-nowrap gap-4">

//             <div className="p-10 bg-lightgreen rounded-4xl min-w-md">
//               <div className="w-full pb-20">
//                 <Image src={USD} alt="USD Flag" width={150} height={150} />
//               </div>

//               <div className="flex flex-col gap-4">
//                 <div className="text-green font-medium text-3xl pb-10">
//                   <p>
//                     "They make our life split between two continents possible.
//                     Transfers are simple and very, very fast."
//                   </p>
//                 </div>
//                 <button className="text-left bg-green  rounded-full py-3 px-6 w-fit">
//                   <Link
//                     href=""
//                     className="text-xl font-medium text-lightgreen"
//                   >
//                     Stuart on Trustpilot
//                   </Link>
//                 </button>
//               </div>
//             </div>

//             <div className="p-10 bg-green rounded-4xl min-w-md">
//               <div className="w-full pb-20">
//                 <Image src={USD} alt="USD Flag" width={150} height={150} />
//               </div>

//               <div className="flex flex-col gap-4">
//                 <div className="text-lightgreen font-medium text-3xl mb-10">
//                   <p>
//                     "They make our life split between two continents possible.
//                     Transfers are simple and very, very fast."
//                   </p>
//                 </div>
//                 <button className="text-left bg-lightgreen py-3 px-6 rounded-full w-fit">
//                   <Link
//                     href=""
//                     className="text-xl font-medium text-green"
//                   >
//                     Megan on Trustpilot
//                   </Link>
//                 </button>
//               </div>
//             </div>

//               <div className="p-10 bg-lightgreen rounded-4xl min-w-md">
//               <div className="w-full pb-20">
//                 <Image src={USD} alt="USD Flag" width={150} height={150} />
//               </div>

//               <div className="flex flex-col gap-4">
//                 <div className="text-green font-medium text-3xl pb-10">
//                   <p>
//                     "They make our life split between two continents possible.
//                     Transfers are simple and very, very fast."
//                   </p>
//                 </div>
//                 <button className="text-left bg-green  rounded-full py-3 px-6 w-fit">
//                   <Link
//                     href=""
//                     className="text-xl font-medium text-lightgreen"
//                   >
//                     Stuart on Trustpilot
//                   </Link>
//                 </button>
//               </div>
//             </div>

//           </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SocialTrustSection;

// "use client"
// import React from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "../../components/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tighter">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//                 {/* Left arrow button */}
//               <div className="p-4 bg-green/10 rounded-full">
//                 <GoArrowLeft size={36} className="text-green" />
//               </div>
//               {/* Right arrow button  */}
//               <div className="p-4 bg-green/10 rounded-full">
//                 <GoArrowRight size={36} className="text-green" />
//               </div>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="lg:w-1/2 w-full">
//             <div className="flex flex-nowrap items-stretch gap-4">
//               {Array.from({ length: numberOfCards }).map((_, index) => (
//                 <SocialCard key={index} index={index} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SocialTrustSection;

// "use client"
// import React, { useState } from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "../../components/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;
//   const [startIndex, setStartIndex] = useState(0);

//   const handleNext = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % numberOfCards); // Cycle through the cards
//   };

//   const handlePrev = () => {
//     setStartIndex((prevIndex) =>
//       prevIndex === 0 ? numberOfCards - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tighter">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//               {/* Left arrow button */}
//               <button
//                 onClick={handlePrev}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowLeft size={36} className="text-green" />
//               </button>
//               {/* Right arrow button  */}
//               <button
//                 onClick={handleNext}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowRight size={36} className="text-green" />
//               </button>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="lg:w-1/2 w-full">
//             <div className="flex flex-nowrap gap-4 transition-transform duration-500"

//                 >
//               {Array.from({ length: numberOfCards }).map((_, index) => {
//                 const isActive = index >= startIndex;
//                 return (
//                     <div
//                       key={index}
//                       className={`transition-all duration-500 ${
//                         !isActive ? "scale-0 opacity-0 hidden" : ""
//                       } `}
//                       >
//                     <SocialCard key={index} index={index % numberOfCards} />
//                   </div>
//                 )
//                 }

//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SocialTrustSection;

// "use client"
// import React, { useState, useRef, useEffect } from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "../../components/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;
//   const [startIndex, setStartIndex] = useState(0);
//   const containerRef = useRef(null); // Ref for the card container
//   const [cardWidth, setCardWidth] = useState(0); // Store the card width

//     useEffect(() => {
//         const updateCardWidth = () => {
//             if (containerRef.current) {
//                 //get first children width and set
//                 const firstCard = containerRef.current.firstChild;
//                 if(firstCard){
//                     setCardWidth(firstCard.offsetWidth + 16); // Include margin/gap (assuming gap-4 = 1rem = 16px)
//                 }

//             }
//         };

//     updateCardWidth(); // Initial measurement

//         // recalculate when resize screen
//     window.addEventListener('resize', updateCardWidth);
//     return () => window.removeEventListener('resize', updateCardWidth);
//   }, []);

//   const handleNext = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % numberOfCards);
//   };

//   const handlePrev = () => {
//     setStartIndex((prevIndex) =>
//       prevIndex === 0 ? numberOfCards - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tighter">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//               <button
//                 onClick={handlePrev}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowLeft size={36} className="text-green" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowRight size={36} className="text-green" />
//               </button>
//             </div>
//           </div>

//           <div className="lg:w-1/2 w-full">
//             <div
//               ref={containerRef} // Attach the ref here
//               className="flex flex-nowrap gap-4"
//               style={{ transform: `translateX(-${startIndex * cardWidth}px)`, transition: 'transform 0.5s ease-in-out' }}
//             >
//               {Array.from({ length: numberOfCards }).map((_, index) => (
//                 <div
//                   key={index}
//                   className={`transition-all duration-500 ease-in-out ${
//                     index < startIndex ? "scale-0 opacity-0" : ""
//                   }  min-w-fit `}
//                 >
//                   <SocialCard index={index % numberOfCards} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SocialTrustSection;

// "use client";
// import React, { useState } from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "../../components/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;
//   const [startIndex, setStartIndex] = useState(0);

//   const handleNext = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % numberOfCards);
//   };

//   const handlePrev = () => {
//     setStartIndex((prevIndex) =>
//       prevIndex === 0 ? numberOfCards - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tighter">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//               <button
//                 onClick={handlePrev}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowLeft size={36} className="text-green" />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowRight size={36} className="text-green" />
//               </button>
//             </div>
//           </div>

//           <div className="lg:w-1/2 w-full relative">
//             {/* Use a relative container */}
//             <div className="flex flex-nowrap gap-4 ">
//               {Array.from({ length: numberOfCards }).map((_, index) => {
//                 const offset = index - startIndex;
//                 const isActive = offset >= 0 && offset < 1; // Only one card is fully active
//                 const translateX = offset * 100; // Move by 100% of the card width

//                 return (
//                   <div
//                     key={index}
//                     className={`transition-all duration-500 ease-in-out ${
//                       !isActive ? "opacity-0 scale-75" : "opacity-100 scale-100"
//                     } `}
//                     style={{
//                       transform: `translateX(${translateX}%)`,
//                       minWidth: "350px",
//                     }}
//                   >
//                     <SocialCard index={index % numberOfCards} />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SocialTrustSection;

// "use client"
// import React, { useState } from "react";
// import AppStore from "../../components/AppStore";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "../../components/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;
//   const [startIndex, setStartIndex] = useState(0);

//   const handleNext = () => {
//     setStartIndex((prevIndex) => (prevIndex + 1) % numberOfCards); // Cycle through the cards
//   };

//   const handlePrev = () => {
//     setStartIndex((prevIndex) =>
//       prevIndex === 0 ? numberOfCards - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <AppStore />
//               <div>
//                 <h1 className="text-3xl md:text-6xl xl:text-8xl font-black text-main font-mont uppercase tracking-tight">
//                   For people going places
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 pt-15">
//               {/* Left arrow button */}
//               <button
//                 onClick={handlePrev}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowLeft size={36} className="text-green" />
//               </button>
//               {/* Right arrow button  */}
//               <button
//                 onClick={handleNext}
//                 className="p-4 bg-green/10 rounded-full hover:bg-green/20 transition-colors"
//               >
//                 <GoArrowRight size={36} className="text-green" />
//               </button>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="lg:w-1/2 w-full">
//             <div className="flex flex-nowrap gap-4 transition-transform duration-500"

//                 >
//               {Array.from({ length: numberOfCards }).map((_, index) => {
//                 const isActive = index >= startIndex;
//                 return (
//                     <div
//                       key={index}
//                       className={`transition-all duration-500 min-w-md ${
//                         !isActive ? "scale-0 opacity-0 hidden" : ""
//                       } `}
//                       >
//                     <SocialCard key={index} index={index % numberOfCards} />
//                   </div>
//                 )
//                 }

//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default SocialTrustSection;

// "use client";
// import React, { useState } from "react";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import SocialCard from "@/app/components/ui/SocialCard";

// const SocialTrustSection = () => {
//   const numberOfCards = 5;
//   const [startIndex, setStartIndex] = useState(0);

//   const handleNext = () => {
//     if (startIndex < numberOfCards - 1) {
//       setStartIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (startIndex > 0) {
//       setStartIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   return (
//     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex lg:flex-row flex-col gap-6">
//           <div className="lg:w-1/2 w-full">
//             <div className="space-y-5">
//               <div>
//                 <h1 className="text-5xl md:text-6xl xl:text-8xl leading-14 lg:leading-24 font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//                   See Why People
//                   <span className="text-primary"> Trust Us </span>
//                 </h1>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 pt-15">
//               {/* Left arrow button */}
//               <button
//                 onClick={handlePrev}
//                 disabled={startIndex === 0}
//                 className={`inline-flex items-center justify-center lg:w-16 lg:h-16 w-12 h-12 bg-lightborder dark:bg-secondary rounded-full transition-colors cursor-pointer ${
//                   startIndex === 0
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-primaryhover"
//                 }`}
//               >
//                 <GoArrowLeft className="text-mainheading dark:text-primary lg:size-9 size-6" />
//               </button>
//               {/* Right arrow button */}
//               <button
//                 onClick={handleNext}
//                 disabled={startIndex === numberOfCards - 1}
//                 className={`inline-flex items-center justify-center lg:w-16 lg:h-16 w-12 h-12 bg-lightborder dark:bg-secondary rounded-full transition-colors cursor-pointer ${
//                   startIndex === numberOfCards - 1
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-primaryhover"
//                 }`}
//               >
//                 <GoArrowRight className="text-mainheading dark:text-primary lg:size-9 size-6" />
//               </button>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="lg:w-1/2 w-full">
//             <div className="relative rounded-4xl overflow-hidden">
//               <div
//                 className="flex transition-all duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${startIndex * 100}%)` }}
//               >
//                 {Array.from({ length: numberOfCards }).map((_, index) => (
//                   <div
//                     key={index}
//                     className={`w-full flex-shrink-0 ${
//                       index === startIndex
//                         ? "opacity-100 scale-100"
//                         : "opacity-0 scale-75"
//                     }`}
//                   >
//                     <SocialCard index={index % numberOfCards} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SocialTrustSection;

// import React, { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import logo from "../../assets/images/google.svg";

// const StarRating = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(<FaStar key={i} className="inline-block text-[#FBBF24]" />);
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt key={i} className="inline-block text-[#FBBF24]" />
//       );
//     } else {
//       stars.push(<FaStar key={i} className="inline-block" />);
//     }
//   }

//   return <div className="inline-block text-white">{stars}</div>;
// };

// const ReviewCard = ({ reviewerName, avatarUrl, rating, comment }) => {
//   return (
//     <div className="bg-white border border-[#D3D3D3] rounded-medium shadow-main lg:p-6 p-4 flex flex-col items-start relative mb-4">
//       <div className="flex md:flex-row items-center w-full justify-center">
//         <div className="flex flex-col md:flex-row items-center md:mr-auto">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="font-medium text-[#1C1A1D] lg:text-medium text-small text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>

//       <div className="absolute top-4 right-4 md:top-8">
//         <img src={logo} alt="" className="lg:h-10 h-8" />
//       </div>

//       <div className="text-dark-black font-normal mt-4 leading-6">
//         {comment}
//       </div>
//     </div>
//   );
// };

// const ReviewCards = () => {
//   const [reviewGroups, setReviewGroups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const columnRefs = useRef([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setReviewGroups(data.reviewGroups);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   if (loading) {
//     return <div>Loading reviews...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <section className="Reviews md:pt-14 pt-10">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
//           {reviewGroups.map((group, index) => (
//             <div
//               key={group.id}
//               className={`marquee-column marquee-column-${index + 1}`}
//               ref={(el) => (columnRefs.current[index] = el)}
//             >
//               <div className="marquee-content">
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// import { useState } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import logo from "../../../../public/assets/icon/google.svg";

// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(<FaStar key={i} className="inline-block text-[#FBBF24]" />);
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt key={i} className="inline-block text-[#FBBF24]" />
//       );
//     } else {
//       stars.push(<FaStar key={i} className="inline-block" />);
//     }
//   }

//   return <div className="inline-block text-white">{stars}</div>;
// };

// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-white border border-[#D3D3D3] rounded-medium shadow-main lg:p-6 p-4 flex flex-col items-start relative mb-4">
//       <div className="flex md:flex-row items-center w-full justify-center">
//         <div className="flex flex-col md:flex-row items-center md:mr-auto">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="font-medium text-[#1C1A1D] lg:text-medium text-small text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>

//       <div className="absolute top-4 right-4 md:top-8">
//         <img src={logo} alt="" className="lg:h-10 h-8" />
//       </div>

//       <div className="text-dark-black font-normal mt-4 leading-6">
//         {comment}
//       </div>
//     </div>
//   );
// };

// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const columnRefs = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = (await response.json()) as ReviewData; // Type assertion here
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         // Type 'err' as 'any' or 'unknown' or 'Error' if you are sure it's an Error
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   if (loading) {
//     return <div>Loading reviews...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <section className="Reviews md:pt-14 pt-10">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
//           {reviewGroups.map((group, index) => (
//             <div
//               key={group.id}
//               className={`marquee-column marquee-column-${index + 1}`}
//               ref={(el) => (columnRefs.current[index] = el as HTMLDivElement)} // Type assertion here
//             >
//               <div className="marquee-content">
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client"; // Mark this component as a client component

// import { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { FaStarHalf } from "react-icons/fa6";

// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(<FaStar key={i} className="inline-block text-[#FBBF24] dark:text-white" />);
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt  key={i} className="inline-block text-[#FBBF24] dark:text-white" />
//       );
//     } else {
//       stars.push(<FaStar key={i} className="inline-block" />);
//     }
//   }

//   return (
//     <div className="inline-block text-white dark:text-background">{stars}</div>
//   );
// };

// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-white dark:bg-white/5 border rounded-2xl lg:p-6 p-4 flex flex-col items-start relative mb-4">
//       <div className="flex md:flex-row items-center w-full justify-center">
//         <div className="flex flex-col md:flex-row items-center md:mr-auto">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="text-mainheading dark:text-primary font-semibold text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>

//       <div className="text-mainheading dark:text-gray-300 leading-relaxed font-normal mt-8 text-lg">
//         {comment}
//       </div>

//     </div>
//   );
// };

// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const columnRefs = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = (await response.json()) as ReviewData; // Type assertion here
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         // Type 'err' as 'any' or 'unknown' or 'Error' if you are sure it's an Error
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   if (loading) {
//     return <div>Loading reviews...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <section className="Reviews md:py-14 py-10">
//       <div className="container mx-auto">
//         <div className="w-full mb-10">
//           <h1 className="text-5xl md:text-6xl xl:text-8xl leading-14 lg:leading-24 font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Real Reviews from
//             <span className="text-primary"> Real Travelers</span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm max-w-1/2 text-gray-700 leading-relaxed dark:text-gray-300 mt-5">
//             Hear directly from globetrotters who’ve trusted us for their
//             currency exchange needs. From smooth transactions to unbeatable
//             rates, see why travelers around the world choose us every time.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px] max-h-[150vh] overflow-hidden relative">
//           {reviewGroups.map((group, index) => (
//             <div
//               key={group.id}
//               className={`marquee-column marquee-column-${index + 1}`}
//               ref={(el) => (columnRefs.current[index] = el as HTMLDivElement)} // Type assertion here
//             >
//               <div className="marquee-content">
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//               </div>
//             </div>
//           ))}
//           <div className="absolute inset-x-0 bottom-0 h-24 rounded-t-2xl bg-gradient-to-t from-gray-50 dark:from-background"></div>
//           <div className="absolute inset-x-0 top-0 h-24 rounded-2xl bg-gradient-to-b from-gray-50 dark:from-background"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client"; // Mark this component as a client component

// import { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// // Note: FaStarHalf seems unused in the original StarRating, sticking with FaStarHalfAlt
// // import { FaStarHalf } from "react-icons/fa6";

// // --- StarRating Component ---
// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(<FaStar key={`full-${i}`} className="inline-block text-[#FBBF24] dark:text-white" />);
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt key={`half-${i}`} className="inline-block text-[#FBBF24] dark:text-white" />
//       );
//     } else {
//       // Use a different color for empty stars for better contrast
//       stars.push(<FaStar key={`empty-${i}`} className="inline-block text-gray-300 dark:text-gray-600" />);
//     }
//   }

//   return (
//     // Removed text-white dark:text-background as star colors are specific
//     <div className="inline-block">{stars}</div>
//   );
// };

// // --- ReviewCard Component ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-white dark:bg-white/5 border dark:border-gray-700 rounded-2xl lg:p-6 p-4 flex flex-col items-start relative mb-6"> {/* Added mb-6 for spacing */}
//       <div className="flex md:flex-row items-center w-full justify-center">
//         <div className="flex flex-col md:flex-row items-center md:mr-auto">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="text-mainheading dark:text-primary font-semibold text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>

//       <div className="text-mainheading dark:text-gray-300 leading-relaxed font-normal mt-4 md:mt-6 text-base lg:text-lg"> {/* Adjusted margin and text size */}
//         {comment}
//       </div>
//     </div>
//   );
// };

// // --- Interfaces for Review Data ---
// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// // --- ReviewCards Component (Main Component) ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   // Use a more specific type for the ref array if possible, otherwise use any[] or HTMLDivElement[]
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]); // Refs for content wrappers

//   // Effect to fetch reviews
//   useEffect(() => {
//     const fetchReviews = async () => {
//       setLoading(true); // Set loading true at the start
//       setError(null); // Reset error
//       try {
//         // Ensure the path is correct relative to your public folder
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = (await response.json()) as ReviewData;
//         // Make sure reviewGroups exist and is an array
//         if (data && Array.isArray(data.reviewGroups)) {
//            setReviewGroups(data.reviewGroups);
//         } else {
//            console.error("Fetched data is not in the expected format:", data);
//            setReviewGroups([]); // Set to empty array if format is wrong
//            throw new Error("Review data is not in the expected format.");
//         }
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err instanceof Error ? err : new Error("An unknown error occurred"));
//         setReviewGroups([]); // Clear reviews on error
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []); // Empty dependency array: fetch only once on mount

//   // Effect for setting up infinite scrolling
//   useEffect(() => {
//     // Only run if reviews are loaded and refs are available
//     if (loading || error || reviewGroups.length === 0) {
//        return;
//     }

//     const cleanupFunctions: (() => void)[] = [];

//     reviewGroups.forEach((_, index) => {
//       const columnEl = columnRefs.current[index];
//       const contentEl = contentRefs.current[index];

//       if (columnEl && contentEl) {
//         // --- Cloning Logic ---
//         // Clear previous clones if any (e.g., on hot reload or data change)
//         const existingClones = columnEl.querySelectorAll('.marquee-content-clone');
//         existingClones.forEach(clone => clone.remove());

//         // Clone the original content
//         const clonedContent = contentEl.cloneNode(true) as HTMLDivElement;
//         clonedContent.classList.add('marquee-content-clone'); // Mark as clone
//         clonedContent.setAttribute('aria-hidden', 'true'); // Hide from screen readers

//         // Append the clone
//         columnEl.appendChild(clonedContent);

//         // --- Dynamic Animation Duration ---
//         // Calculate duration based on height for consistent speed
//         const contentHeight = contentEl.offsetHeight; // Height of the original content
//         // Adjust the factor (e.g., 35) to control speed: lower = faster, higher = slower
//         const duration = contentHeight / 35; // pixels per second

//         // Apply animation dynamically
//         // Ensure animation names match CSS (scroll-up-1, scroll-up-2, etc.)
//         const animationName = `scroll-up-${(index % 3) + 1}`; // Cycle through 3 animations
//         columnEl.style.setProperty('--marquee-duration', `${duration}s`);
//         columnEl.style.animationName = animationName;
//         columnEl.style.animationDuration = `var(--marquee-duration)`;
//         columnEl.style.animationTimingFunction = 'linear';
//         columnEl.style.animationIterationCount = 'infinite';

//          // Add to cleanup
//          cleanupFunctions.push(() => {
//              const clone = columnEl.querySelector('.marquee-content-clone');
//              if(clone) clone.remove();
//              columnEl.style.animationName = ''; // Remove animation properties on cleanup
//              columnEl.style.animationDuration = '';
//              columnEl.style.animationTimingFunction = '';
//              columnEl.style.animationIterationCount = '';
//          });

//       } else {
//          console.warn(`Ref missing for column or content at index ${index}`);
//       }
//     });

//      // Cleanup function to run when component unmounts or dependencies change
//      return () => {
//          cleanupFunctions.forEach(cleanup => cleanup());
//      };

//   // Rerun this effect if reviewGroups data changes, or loading/error state changes
//   }, [reviewGroups, loading, error]);

//   if (loading) {
//     return <div className="text-center py-10">Loading reviews...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-500">Error loading reviews: {error.message}</div>;
//   }

//   if (!reviewGroups || reviewGroups.length === 0) {
//      return <div className="text-center py-10">No reviews available.</div>
//   }

//   return (
//     <section className="Reviews md:py-14 py-10 bg-gray-50 dark:bg-background"> {/* Added background */}
//       <div className="container mx-auto px-4"> {/* Added horizontal padding */}
//         <div className="w-full mb-10 md:mb-16 text-center"> {/* Centered heading */}
//           <h1 className="text-4xl md:text-6xl xl:text-7xl leading-tight lg:leading-tight font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Real Reviews from
//             <span className="text-primary"> Real Travelers</span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm max-w-3xl mx-auto text-gray-600 dark:text-gray-400 mt-5 leading-relaxed"> {/* Centered paragraph, adjusted width/color */}
//             Hear directly from globetrotters who’ve trusted us for their
//             currency exchange needs. From smooth transactions to unbeatable
//             rates, see why travelers around the world choose us every time.
//           </p>
//         </div>

//         {/* --- Grid for Review Columns --- */}
//         {/*
//            - Added 'overflow-hidden' to the grid container.
//            - Set a fixed height `h-[700px]` and max-h `max-h-[80vh]` for responsiveness.
//            - `relative` is needed for the absolute positioned gradient overlays.
//         */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px] max-h-[80vh] overflow-hidden relative">
//           {reviewGroups.map((group, index) => (
//             <div
//               key={group.id || `group-${index}`} // Added fallback key
//               className={`marquee-column marquee-column-${(index % 3) + 1}`} // Cycle classes 1, 2, 3
//               ref={(el) => (columnRefs.current[index] = el)} // Assign ref to the column container
//               style={{ animationPlayState: 'running' }} // Ensure animation runs
//             >
//               {/* Original Content Wrapper */}
//               <div
//                 className="marquee-content"
//                 ref={(el) => (contentRefs.current[index] = el)} // Assign ref to the content wrapper
//                >
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//                </div>
//                {/* Cloned content will be appended here by useEffect */}
//             </div>
//           ))}

//           {/* --- Gradient Overlays --- */}
//           {/* Top Fade */}
//           <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gray-50 dark:from-background pointer-events-none"></div>
//            {/* Bottom Fade */}
//           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-50 dark:from-background pointer-events-none"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client"; // Mark this component as a client component

// import React, { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// // FaStarHalf is imported but not used in the original StarRating, keeping it just in case
// // import { FaStarHalf } from "react-icons/fa6";

// // --- StarRating Component ---
// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//         /> // Adjusted dark mode color slightly
//       );
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//         /> // Adjusted dark mode color slightly
//       );
//     } else {
//       // Use a different color for empty stars for better contrast
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-gray-300 dark:text-white"
//         />
//       );
//     }
//   }

//   // Adjusted text color for better visibility in both modes
//   return <div className="inline-block">{stars}</div>;
// };

// // --- ReviewCard Component ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-white dark:bg-white/5 border rounded-2xl lg:p-6 p-4 flex flex-col items-start relative mb-4 flex-shrink-0">
//       {/* Added flex-shrink-0 */}
//       <div className="flex md:flex-row items-center w-full justify-center md:justify-start">
//         {/* Adjusted alignment */}
//         <div className="flex flex-col md:flex-row items-center">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="text-mainheading dark:text-primary font-semibold text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>
//       <div className="text-mainheading dark:text-gray-300 leading-relaxed font-normal mt-4 md:mt-6 text-base md:text-xl">
//         {comment}
//       </div>
//     </div>
//   );
// };

// // --- Interfaces for Data Structure ---
// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// // --- ReviewCards Component (Main Component) ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   // Ref to hold references to the column divs
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // --- Fetch Data ---
//   useEffect(() => {
//     const fetchReviews = async () => {
//       setLoading(true); // Start loading
//       setError(null); // Reset error
//       try {
//         const response = await fetch("/Review.json"); // Make sure this path is correct
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = await response.json();
//         // Ensure data conforms to expected structure (basic check)
//         if (!data || !Array.isArray(data.reviewGroups)) {
//           throw new Error("Invalid data structure received from Review.json");
//         }
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err); // Log error for debugging
//         setError(
//           err instanceof Error ? err : new Error("An unknown error occurred")
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []); // Empty dependency array means this runs once on mount

//   // --- Infinite Scroll Setup ---
//   useEffect(() => {
//     // Only run this effect if data is loaded and we have groups
//     if (loading || error || reviewGroups.length === 0) {
//       return;
//     }

//     const columns = columnRefs.current;

//     columns.forEach((columnEl) => {
//       if (!columnEl) return; // Skip if ref is null for some reason

//       const contentEl =
//         columnEl.querySelector<HTMLDivElement>(".marquee-content");
//       if (!contentEl) return; // Skip if content element not found

//       // --- Content Duplication Logic ---
//       // Check if content is already duplicated to prevent duplication on hot reloads/re-renders
//       const originalContentHeight = contentEl.scrollHeight / 2; // Assumes content is already duplicated by CSS or previous runs
//       const currentScrollHeight = contentEl.scrollHeight;
//       const childrenCount = contentEl.children.length;
//       const expectedChildrenCount = reviewGroups[0]?.reviews.length * 2; // Estimate based on first group

//       // Basic check to see if duplication likely already happened
//       // This isn't foolproof but helps prevent infinite duplication loops during development HMR
//       let needsDuplication = true;
//       if (childrenCount > 0 && childrenCount === expectedChildrenCount) {
//         // console.log("Skipping duplication, seems already done.");
//         needsDuplication = false;
//       }
//       // More robust check: see if the scrollHeight is roughly double the height of its first child * number of original items
//       if (contentEl.children.length > 0) {
//         const firstChildHeight = (contentEl.children[0] as HTMLElement)
//           .offsetHeight;
//         const estimatedOriginalHeight = firstChildHeight * (childrenCount / 2); // Approximate original height
//         // If current height is already much larger than estimated original height, assume duplication happened
//         // Add some tolerance with margins/paddings
//         if (currentScrollHeight > estimatedOriginalHeight * 1.8) {
//           // console.log("Skipping duplication based on height check.");
//           needsDuplication = false;
//         }
//       }

//       if (needsDuplication) {
//         // console.log(`Duplicating content for column...`);
//         const originalChildren = Array.from(contentEl.children);
//         originalChildren.forEach((child) => {
//           const clone = child.cloneNode(true);
//           contentEl.appendChild(clone);
//         });
//       }

//       // --- Start Animation (handled by CSS) ---
//       // No JS needed to manually start/control animation timing if using CSS animations correctly
//     });

//     // No cleanup needed for this specific effect as we are only manipulating the DOM once
//     // and relying on CSS for the continuous animation loop.
//   }, [loading, error, reviewGroups]); // Rerun when loading/error state changes or data arrives

//   // --- Render Logic ---
//   if (loading) {
//     // Optional: Add a more visually appealing loader
//     return <div className="text-center p-10">Loading reviews...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error loading reviews: {error.message}
//       </div>
//     );
//   }

//   if (reviewGroups.length === 0) {
//     return (
//       <div className="text-center p-10 text-gray-700">
//         No reviews available yet.
//       </div>
//     );
//   }

//   return (
//     <section className="Reviews md:py-14 py-10 bg-gray-50 dark:bg-background">
//       {/* Added background */}
//       <div className="container mx-auto px-4">
//         {/* Added horizontal padding */}
//         <div className="w-full mb-10 lg:mb-16">
//           <h1 className="text-5xl md:text-6xl xl:text-8xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Honest Reviews
//             <span className="text-primary"> Real Travelers Like You </span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm max-w-full md:max-w-3xl text-gray-700 leading-relaxed dark:text-gray-300 mt-5 text-left">
//             {/* Adjusted max-width and alignment */}
//             Hear directly from globetrotters who’ve trusted us for their
//             currency exchange needs. From smooth transactions to unbeatable
//             rates, see why travelers around the world choose us every time.
//           </p>
//         </div>
//         {/* Ensure the parent has a defined height and overflow hidden */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-[600px] md:h-[1000px] overflow-hidden relative">
//           {/* Adjusted height and gap */}
//           {reviewGroups.slice(0, 3).map(
//             (
//               group,
//               index // Ensure only max 3 groups are rendered if more exist
//             ) => (
//               <div
//                 key={group.id || `group-${index}`} // Add fallback key
//                 // Assign specific classes for CSS animation targeting
//                 className={`lg:marquee-column marquee-column-${index + 1}`}
//                 // Assign ref to the array element
//                 ref={(el: HTMLDivElement | null) => {
//                   // Ensure type and use curly braces
//                   columnRefs.current[index] = el;
//                 }}
//               >
//                 {/* This div will contain the duplicated content */}
//                 <div className="marquee-content flex flex-col space-y-4 md:space-y-6">
//                   {/* Added spacing */}
//                   {group.reviews.map((review, reviewIndex) => (
//                     <ReviewCard
//                       key={reviewIndex} // Key should be unique within this list
//                       {...review}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )
//           )}
//           {/* Gradient Fades */}
//           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none"></div>
//           <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gray-50 via-gray-50/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// // --- StarRating Component ---
// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//         />
//       );
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//         />
//       );
//     } else {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-gray-300 dark:text-white"
//         />
//       );
//     }
//   }

//   return <div className="inline-block">{stars}</div>;
// };

// // --- ReviewCard Component ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-white dark:bg-white/5 rounded-2xl lg:p-6 p-4 flex flex-col items-start relative mb-4 flex-shrink-0">
//       <div className="flex md:flex-row items-center w-full justify-center md:justify-start">
//         <div className="flex flex-col md:flex-row items-center">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-4"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="text-mainheading dark:text-primary font-semibold text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>
//       <div className="text-mainheading dark:text-gray-300 leading-relaxed font-normal mt-4 md:mt-6 text-base md:text-xl">
//         {comment}
//       </div>
//     </div>
//   );
// };

// // --- Interfaces for Data Structure ---
// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// // --- Main Component ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = await response.json();
//         if (!data || !Array.isArray(data.reviewGroups)) {
//           throw new Error("Invalid data structure received from Review.json");
//         }
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err instanceof Error ? err : new Error("Unknown error"));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   useEffect(() => {
//     if (loading || error || reviewGroups.length === 0) return;

//     const columns = columnRefs.current;

//     columns.forEach((columnEl) => {
//       if (!columnEl) return;
//       const contentEl =
//         columnEl.querySelector<HTMLDivElement>(".marquee-content");
//       if (!contentEl) return;

//       const childrenCount = contentEl.children.length;
//       const expectedChildrenCount = reviewGroups[0]?.reviews.length * 2;
//       let needsDuplication = true;

//       if (childrenCount === expectedChildrenCount) {
//         needsDuplication = false;
//       }

//       if (contentEl.children.length > 0) {
//         const firstChildHeight = (contentEl.children[0] as HTMLElement)
//           .offsetHeight;
//         const estimatedOriginalHeight = firstChildHeight * (childrenCount / 2);
//         if (contentEl.scrollHeight > estimatedOriginalHeight * 1.8) {
//           needsDuplication = false;
//         }
//       }

//       if (needsDuplication) {
//         const originalChildren = Array.from(contentEl.children);
//         originalChildren.forEach((child) => {
//           const clone = child.cloneNode(true);
//           contentEl.appendChild(clone);
//         });
//       }
//     });
//   }, [loading, error, reviewGroups]);

//   if (loading) {
//     return <div className="text-center p-10">Loading reviews...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error loading reviews: {error.message}
//       </div>
//     );
//   }

//   if (reviewGroups.length === 0) {
//     return (
//       <div className="text-center p-10 text-gray-700">
//         No reviews available yet.
//       </div>
//     );
//   }

//   return (
//     <section className="Reviews md:py-14 py-10 bg-[#F2F4F7] dark:bg-background" id="review">
//       <div className="container mx-auto px-4">
//         <div className="w-full mb-10 lg:mb-16">
//           {/* heading and paragraph */}
//           <h1 className="text-5xl md:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//             Honest Reviews
//             <span className="text-primary"> Real Travelers Like You </span>
//           </h1>

//           <p className="lg:text-lg sm:text-base text-sm max-w-full md:max-w-3xl text-gray-700 leading-relaxed dark:text-gray-300 mt-5 text-left">
//             Hear directly from globetrotters who’ve trusted us for their
//             currency exchange needs. From smooth transactions to unbeatable
//             rates, see why travelers around the world choose us every time.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-[600px] md:h-[1000px] overflow-hidden relative">
//           {reviewGroups.slice(0, 3).map((group, index) => (
//             <div
//               key={group.id || `group-${index}`}
//               className={`lg:marquee-column marquee-column-${index + 1}`}
//               ref={(el: HTMLDivElement | null) => {
//                 columnRefs.current[index] = el;
//               }}
//             >
//               <div className="marquee-content flex flex-col space-y-4 md:space-y-6">
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//               </div>
//             </div>
//           ))}
//           {/* Gradient Fades */}
//           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F2F4F7] via-gray-50 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none"></div>
//           <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F2F4F7] via-gray-50 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none"></div>
//         </div>
//       </div>

//       {/* Custom CSS for marquee animation */}
//       <style jsx global>{`
//         .marquee-column {
//           overflow: hidden;
//           height: 100%;
//           position: relative;
//         }

//         .marquee-content {
//           animation: scroll-up 30s linear infinite;
//         }

//         .marquee-column:hover .marquee-content {
//           animation-play-state: paused;
//         }

//         @keyframes scroll-up {
//           0% {
//             transform: translateY(0);
//           }
//           100% {
//             transform: translateY(-50%);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { useRouter, usePathname } from "next/navigation";

// // --- StarRating Component ---
// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//         />
//       );
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//         />
//       );
//     } else {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-lightgray dark:text-white"
//         />
//       );
//     }
//   }

//   return <div className="inline-block">{stars}</div>;
// };

// // --- ReviewCard Component ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-lightgray dark:bg-white/5 rounded-2xl lg:p-6 p-4 flex flex-col items-start relative mb-4 flex-shrink-0">
//       <div className="flex md:flex-row items-center w-full justify-center md:justify-start">
//         <div className="flex flex-col md:flex-row items-center">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-2.5"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="text-mainheading dark:text-primary font-medium text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>
//       <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-normal mt-4 md:mt-6 text-sm lg:text-lg">
//         {comment}
//       </div>
//     </div>
//   );
// };

// // --- Interfaces for Data Structure ---
// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// // --- Main Component ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const pathname = usePathname();

//   useEffect(() => {
//     const fetchReviews = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = await response.json();
//         if (!data || !Array.isArray(data.reviewGroups)) {
//           throw new Error("Invalid data structure received from Review.json");
//         }
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err instanceof Error ? err : new Error("Unknown error"));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   useEffect(() => {
//     if (loading || error || reviewGroups.length === 0) return;

//     const columns = columnRefs.current;

//     columns.forEach((columnEl) => {
//       if (!columnEl) return;
//       const contentEl =
//         columnEl.querySelector<HTMLDivElement>(".marquee-content");
//       if (!contentEl) return;

//       const childrenCount = contentEl.children.length;
//       const expectedChildrenCount = reviewGroups[0]?.reviews.length * 2;
//       let needsDuplication = true;

//       if (childrenCount === expectedChildrenCount) {
//         needsDuplication = false;
//       }

//       if (contentEl.children.length > 0) {
//         const firstChildHeight = (contentEl.children[0] as HTMLElement)
//           .offsetHeight;
//         const estimatedOriginalHeight = firstChildHeight * (childrenCount / 2);
//         if (contentEl.scrollHeight > estimatedOriginalHeight * 1.8) {
//           needsDuplication = false;
//         }
//       }

//       if (needsDuplication) {
//         const originalChildren = Array.from(contentEl.children);
//         originalChildren.forEach((child) => {
//           const clone = child.cloneNode(true);
//           contentEl.appendChild(clone);
//         });
//       }
//     });
//   }, [loading, error, reviewGroups]);

//   if (loading) {
//     return <div className="text-center p-10">Loading reviews...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error loading reviews: {error.message}
//       </div>
//     );
//   }

//   if (reviewGroups.length === 0) {
//     return (
//       <div className="text-center p-10 text-gray-700">
//         No reviews available yet.
//       </div>
//     );
//   }

//   const isHomePage = pathname === "/";

//   const heading = isHomePage ? (
//     <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//       Honest Reviews
//       <span className="text-primary"> Real Travelers Like You </span>
//     </h1>
//   ) : (
//     <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//       Trusted Currency Exchange
//       <span className="text-primary"> Feedback & Rating </span>
//     </h1>
//   );

//   const paragraph = isHomePage ? (
//     <p className="lg:text-lg sm:text-base text-sm max-w-full md:max-w-3xl text-gray-700 leading-relaxed dark:text-gray-300 mt-5 text-left">
//       Hear directly from globetrotters who’ve trusted us for their currency
//       exchange needs. From smooth transactions to unbeatable rates, see why
//       travelers around the world choose us every time.
//     </p>
//   ) : (
//     <p className="lg:text-lg sm:text-base text-sm max-w-full md:max-w-3xl text-gray-700 leading-relaxed dark:text-gray-300 mt-5 text-left">
//       Read honest customer reviews about our currency exchange services. See why
//       travelers, investors, and expats trust us for fast, reliable, and
//       competitive rates. Our clients appreciate the transparency, excellent
//       support, and real-time rates.
//     </p>
//   );

//   return (
//     <section
//       className="Reviews py-10 bg-white dark:bg-background px-4"
//       id="review"
//     >
//       <div className="container mx-auto">
//         <div className="w-full mb-10">
//           {/* heading and paragraph */}
//           {heading}
//           {paragraph}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 h-[600px] md:h-[1000px] overflow-hidden relative">
//           {reviewGroups.slice(0, 3).map((group, index) => (
//             <div
//               key={group.id || `group-${index}`}
//               className={`lg:marquee-column marquee-column-${index + 1}`}
//               ref={(el: HTMLDivElement | null) => {
//                 columnRefs.current[index] = el;
//               }}
//             >
//               <div className="marquee-content flex flex-col space-y-4 md:space-y-6">
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//               </div>
//             </div>
//           ))}
//           {/* Gradient Fades */}
//           <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-gray-50 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none"></div>
//           <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white via-gray-50 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none"></div>
//         </div>
//       </div>

//       {/* Custom CSS for marquee animation */}
//       <style jsx global>{`
//         .marquee-column {
//           overflow: hidden;
//           height: 100%;
//           position: relative;
//         }

//         .marquee-content {
//           animation: scroll-up 30s linear infinite;
//         }

//         .marquee-column:hover .marquee-content {
//           animation-play-state: paused;
//         }

//         @keyframes scroll-up {
//           0% {
//             transform: translateY(0);
//           }
//           100% {
//             transform: translateY(-50%);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { useRouter, usePathname } from "next/navigation";
// import { motion } from "framer-motion"; // Import motion

// // --- StarRating Component (No changes needed) ---
// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//         />
//       );
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//         />
//       );
//     } else {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-lightgray dark:text-white" // Consider dark:text-gray-600 for better contrast
//         />
//       );
//     }
//   }

//   return <div className="inline-block">{stars}</div>;
// };

// // --- ReviewCard Component (No changes needed) ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     // Adjusted min-height for better consistency if needed, but h-full on wrapper might be better
//     <div className="bg-lightgray dark:bg-white/5 rounded-2xl lg:p-6 p-4 flex flex-col items-start relative flex-shrink-0 h-full">
//       <div className="flex md:flex-row items-center w-full justify-center md:justify-start">
//         <div className="flex flex-col md:flex-row items-center">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-2.5"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="text-mainheading dark:text-primary font-medium text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>
//       <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-normal mt-4 md:mt-6 text-sm lg:text-lg">
//         {comment}
//       </div>
//     </div>
//   );
// };

// // --- Interfaces for Data Structure (No changes needed) ---
// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// // --- Animation Variants ---
// const sectionVariants = {
//   hidden: {}, // Parent doesn't need explicit animation, just controls trigger
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger direct children (text block, grid container)
//     },
//   },
// };

// const textBlockVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// const gridContainerVariants = {
//   hidden: {}, // Grid container itself doesn't animate, just staggers its children
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger the review cards within the grid
//       delayChildren: 0.2, // Start staggering cards slightly after text block appears
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.9, y: 30 }, // Start slightly smaller, down, and invisible
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0, // Animate to full size and original position
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
// };

// // --- Main Component ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const pathname = usePathname();
//   // Removed columnRefs and marquee duplication logic
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const columns = columnRefs.current;

//     const fetchReviews = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("/Review.json"); // Make sure this path is correct
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = await response.json();
//         if (!data || !Array.isArray(data.reviewGroups)) {
//           throw new Error("Invalid data structure received from Review.json");
//         }
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err instanceof Error ? err : new Error("Unknown error"));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   // Removed the marquee duplication useEffect

//   if (loading) {
//     return <div className="text-center p-10">Loading reviews...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error loading reviews: {error.message}
//       </div>
//     );
//   }

//   if (reviewGroups.length === 0) {
//     return (
//       <div className="text-center p-10 text-gray-700">
//         No reviews available yet.
//       </div>
//     );
//   }

//   const isHomePage = pathname === "/";

//   const heading = isHomePage ? (
//     <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//       Honest Reviews
//       <span className="text-primary"> Real Travelers Like You </span>
//     </h1>
//   ) : (
//     <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//       Trusted Currency Exchange
//       <span className="text-primary"> Feedback & Rating </span>
//     </h1>
//   );

//   const paragraph = isHomePage ? (
//     <p className="lg:text-lg sm:text-base text-sm max-w-full md:max-w-3xl text-gray-700 leading-relaxed dark:text-gray-300 mt-5 text-left">
//       Hear directly from globetrotters who’ve trusted us for their currency
//       exchange needs. From smooth transactions to unbeatable rates, see why
//       travelers around the world choose us every time.
//     </p>
//   ) : (
//     <p className="lg:text-lg sm:text-base text-sm max-w-full md:max-w-3xl text-gray-700 leading-relaxed dark:text-gray-300 mt-5 text-left">
//       Read honest customer reviews about our currency exchange services. See why
//       travelers, investors, and expats trust us for fast, reliable, and
//       competitive rates. Our clients appreciate the transparency, excellent
//       support, and real-time rates.
//     </p>
//   );

//   // Flatten the reviews from the first 3 groups into a single array for easier grid mapping
//   const allReviews = reviewGroups.slice(0, 3).flatMap((group) => group.reviews);

//   return (
//     <motion.section
//       className="Reviews py-10 bg-white dark:bg-background px-4 overflow-hidden" // Added overflow-hidden
//       id="review"
//       variants={sectionVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ amount: 0.1, once: false }} // Trigger when 10% visible, repeat animation
//     >
//       <div className="container mx-auto">
//         {/* Text Block Animation */}
//         <motion.div
//           className="w-full mb-10"
//           variants={textBlockVariants}
//           // Inherits trigger from parent section
//         >
//           {heading}
//           {paragraph}
//         </motion.div>

//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 h-[600px] md:h-[1000px] overflow-hidden relative"
//           variants={gridContainerVariants}
//         >
//           {reviewGroups.slice(0, 3).map((group, index) => (
//             <motion.div
//               variants={cardVariants}
//               key={group.id || `group-${index}`}
//               className={`lg:marquee-column marquee-column-${index + 1}`}
//               ref={(el: HTMLDivElement | null) => {
//                 columnRefs.current[index] = el;
//               }}
//             >
//               <div className="marquee-content flex flex-col space-y-4 md:space-y-6">
//                 {group.reviews.map((review, reviewIndex) => (
//                   <ReviewCard key={reviewIndex} {...review} />
//                 ))}
//               </div>
//             </motion.div>
//           ))}

//           <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none z-10"></div>
//           <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none z-10"></div>
//         </motion.div>
//       </div>

//       {/* <style jsx globale> block for marquee */}
//       <style jsx global>{`
//         .marquee-column {
//           overflow: hidden;
//           height: 100%;
//           position: relative;
//         }

//         .marquee-content {
//           animation: scroll-up 30s linear infinite;
//         }

//         .marquee-column:hover .marquee-content {
//           animation-play-state: paused;
//         }

//         @keyframes scroll-up {
//           0% {
//             transform: translateY(0);
//           }
//           100% {
//             transform: translateY(-50%);
//           }
//         }
//       `}</style>
//     </motion.section>
//   );
// };

// export default ReviewCards;

// // //reviewcard section

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { useRouter, usePathname } from "next/navigation";
// import { motion } from "framer-motion"; // Import motion

// // --- StarRating Component (No changes needed) ---
// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//         />
//       );
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//         />
//       );
//     } else {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-lightgray dark:text-white" // Consider dark:text-gray-600 for better contrast
//         />
//       );
//     }
//   }

//   return <div className="inline-block">{stars}</div>;
// };

// // --- ReviewCard Component (No changes needed) ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-lightgray dark:bg-white/5 rounded-2xl lg:p-6 p-4 flex flex-col items-start relative flex-shrink-0 h-full">
//       <div className="flex md:flex-row items-center w-full justify-center md:justify-start">
//         <div className="flex flex-col md:flex-row items-center">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover mb-2 md:mb-0 md:mr-2.5"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="text-mainheading dark:text-primary font-medium text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>
//       <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-normal mt-4 md:mt-6 text-sm lg:text-lg">
//         {comment}
//       </div>
//     </div>
//   );
// };

// // --- Interfaces for Data Structure (No changes needed) ---
// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// // --- Animation Variants ---
// const sectionVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger text block and columns container
//     },
//   },
// };

// const textBlockVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// // Variants for the container holding the columns
// const columnsContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Stagger the appearance of each column
//       delayChildren: 0.2, // Delay start slightly after text appears
//     },
//   },
// };

// // Variants for each column wrapper (to stagger cards within)
// const columnItemVariants = {
//   hidden: { opacity: 0 }, // Column itself can just fade in or have no visual effect
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1, // Stagger the cards *inside* this column
//     },
//   },
// };

// // Variants for individual review card entrance animation
// const cardEntranceVariants = {
//   hidden: { opacity: 0, y: 30, scale: 0.95 }, // Start invisible, down, and slightly smaller
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1, // Animate to visible, original position, and full size
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
// };

// // --- Main Component ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const pathname = usePathname();
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]); // Keep refs for marquee duplication

//   useEffect(() => {
//     const fetchReviews = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("/Review.json"); // Make sure this path is correct
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewData = await response.json();
//         if (!data || !Array.isArray(data.reviewGroups)) {
//           throw new Error("Invalid data structure received from Review.json");
//         }
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err instanceof Error ? err : new Error("Unknown error"));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   // Marquee Duplication Logic (Keep this as it was)
//   useEffect(() => {
//     if (loading || error || reviewGroups.length === 0) return;

//     const columns = columnRefs.current;

//     // Timeout to allow initial render and Framer Motion animations potentially
//     const timer = setTimeout(() => {
//       columns.forEach((columnEl) => {
//         if (!columnEl) return;
//         const contentEl =
//           columnEl.querySelector<HTMLDivElement>(".marquee-content");
//         if (!contentEl) return;

//         // Simple check: if content is less than 1.5x the column height, duplicate
//         // Adjust the multiplier (1.5) as needed based on card sizes and column height
//         if (contentEl.scrollHeight < columnEl.offsetHeight * 1.5) {
//           // Avoid duplicating if already duplicated
//           const originalChildrenCount = group.reviews.length; // Assuming group is accessible or use a fixed number
//           if (contentEl.children.length <= originalChildrenCount) {
//             const originalChildren = Array.from(contentEl.children);
//             originalChildren.forEach((child) => {
//               const clone = child.cloneNode(true) as HTMLElement;
//               // Remove Framer Motion specific attributes/styles from clones if they cause issues
//               clone.removeAttribute("style"); // Basic style removal, might need more specific cleanup
//               contentEl.appendChild(clone);
//             });
//           }
//         }
//       });
//     }, 500); // Delay duplication slightly

//     return () => clearTimeout(timer); // Cleanup timer
//   }, [loading, error, reviewGroups]); // Rerun if data changes

//   if (loading) {
//     return <div className="text-center p-10">Loading reviews...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error loading reviews: {error.message}
//       </div>
//     );
//   }

//   if (reviewGroups.length === 0) {
//     return (
//       <div className="text-center p-10 text-gray-700">
//         No reviews available yet.
//       </div>
//     );
//   }

//   const isHomePage = pathname === "/";

//   const heading = isHomePage ? (
//     <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//       Honest Reviews
//       <span className="text-primary"> Real Travelers Like You </span>
//     </h1>
//   ) : (
//     <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-mont text-mainheading dark:text-white uppercase tracking-tight">
//       Trusted Currency Exchange
//       <span className="text-primary"> Feedback & Rating </span>
//     </h1>
//   );

//   const paragraph = isHomePage ? (
//     <p className="lg:text-lg sm:text-base text-sm max-w-full md:max-w-3xl text-gray-700 leading-relaxed dark:text-gray-300 mt-5 text-left">
//       Hear directly from globetrotters who’ve trusted us for their currency
//       exchange needs. From smooth transactions to unbeatable rates, see why
//       travelers around the world choose us every time.
//     </p>
//   ) : (
//     <p className="lg:text-lg sm:text-base text-sm max-w-full md:max-w-3xl text-gray-700 leading-relaxed dark:text-gray-300 mt-5 text-left">
//       Read honest customer reviews about our currency exchange services. See why
//       travelers, investors, and expats trust us for fast, reliable, and
//       competitive rates. Our clients appreciate the transparency, excellent
//       support, and real-time rates.
//     </p>
//   );

//   return (
//     <motion.section
//       className="Reviews py-10 bg-white dark:bg-background px-4 overflow-hidden" // Added overflow-hidden
//       id="review"
//       variants={sectionVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ amount: 0.1, once: false }} // Trigger when 10% visible, repeat animation
//     >
//       <div className="container mx-auto">
//         {/* Text Block Animation */}
//         <motion.div
//           className="w-full mb-10"
//           variants={textBlockVariants}
//           // Inherits trigger
//         >
//           {heading}
//           {paragraph}
//         </motion.div>
//         {/* --- Grid Container for Columns --- */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 h-[600px] md:h-[1000px] overflow-hidden relative" // Keep fixed height for marquee
//           variants={columnsContainerVariants} // Controls staggering of columns
//           // Inherits trigger
//         >
//           {/* Map through the review groups for columns */}
//           {reviewGroups.slice(0, 3).map((group, index) => (
//             // --- Column Wrapper for Staggering Cards Within ---
//             <motion.div
//               key={group.id || `group-${index}`}
//               variants={columnItemVariants} // Controls staggering of cards inside
//               // This motion.div wraps the column structure but doesn't interfere with marquee ref/class
//             >
//               {/* Actual Column Structure with Marquee Ref */}
//               <div
//                 className={`lg:marquee-column marquee-column-${index + 1}`}
//                 ref={(el: HTMLDivElement | null) => {
//                   columnRefs.current[index] = el;
//                 }}
//               >
//                 {/* Marquee Content Div (NO motion here) */}
//                 <div className="marquee-content flex flex-col space-y-4 md:space-y-6">
//                   {/* Map through reviews WITHIN the group */}
//                   {group.reviews.map((review, reviewIndex) => (
//                     // --- Individual Card Wrapper for Entrance Animation ---
//                     <motion.div
//                       key={reviewIndex}
//                       variants={cardEntranceVariants} // Apply entrance animation HERE
//                     >
//                       <ReviewCard {...review} />
//                     </motion.div>
//                   ))}
//                 </div>{" "}
//                 {/* End marquee-content */}
//               </div>{" "}
//               {/* End marquee-column div with ref */}
//             </motion.div> // End column wrapper motion.div
//           ))}

//           {/* Gradient Fades */}
//           <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none z-10"></div>
//           <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none z-10"></div>
//         </motion.div>{" "}
//         {/* End grid container */}
//       </div>

//       {/* KEEP the marquee CSS */}
//       <style jsx global>{`
//         .marquee-column {
//           overflow: hidden;
//           height: 100%;
//           position: relative;
//         }

//         .marquee-content {
//           /* Ensure it can be positioned absolutely if needed, but transform is better */
//           /* display: block; /* Or flex if needed */
//           /* position: relative; /* Keep relative for transform */
//           animation: scroll-up 40s linear infinite; /* Slower animation? */
//         }

//         .marquee-column:hover .marquee-content {
//           animation-play-state: paused;
//         }

//         @keyframes scroll-up {
//           0% {
//             transform: translateY(0%);
//           }
//           100% {
//             /* This assumes duplication. Adjust if duplication logic changes */
//             transform: translateY(-50%);
//           }
//         }
//       `}</style>
//     </motion.section>
//   );
// };

// export default ReviewCards;

// // src/app/(website)/components/SocialTrust.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion"; // Import motion

// // --- StarRating Component (No changes needed) ---
// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < maxRating; i++) {
//     if (i < fullStars) {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//           size={18}
//         />
//       );
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt
//           key={i}
//           className="inline-block text-[#FBBF24] dark:text-white"
//           size={18}
//         />
//       );
//     } else {
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-lightgray dark:text-white"
//           size={18}
//         />
//       );
//     }
//   }

//   return <div className="inline-block">{stars}</div>;
// };

// // --- ReviewCard Component (No changes needed) ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-lightgray dark:bg-primarybox rounded-2xl lg:p-6 p-4 flex flex-col items-start relative flex-shrink-0 h-full">
//       <div className="flex md:flex-row items-center w-full justify-center md:justify-start">
//         <div className="flex flex-col md:flex-row items-center gap-4">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="size-16 rounded-full object-cover"
//           />
//           <div className="flex flex-col items-center md:items-start">
//             <div className="text-mainheading lg:text-lg text-base capitalize dark:text-primary leading-5 font-medium text-nowrap">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>
//       </div>

//       <div className="text-gray-500 dark:text-gray-300 lg:text-lg text-base mt-5">
//         {comment}
//       </div>
//     </div>
//   );
// };

// // --- Interfaces for Data Structure (No changes needed) ---
// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string;
//   reviews: Review[];
// }

// interface ReviewData {
//   reviewGroups: ReviewGroup[];
// }

// // --- Animation Variants (No changes needed) ---
// const sectionVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.1, // Stagger text block and columns container
//     },
//   },
// };

// const textBlockVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// // Variants for the container holding the columns
// const columnsContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15, // Stagger the appearance of each column
//       delayChildren: 0.2, // Delay start slightly after text appears
//     },
//   },
// };

// // Variants for each column wrapper (to stagger cards within)
// const columnItemVariants = {
//   hidden: { opacity: 0 }, // Column itself can just fade in or have no visual effect
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1, // Stagger the cards *inside* this column
//     },
//   },
// };

// // Variants for individual review card entrance animation
// const cardEntranceVariants = {
//   hidden: { opacity: 0, y: 30, scale: 0.95 }, // Start invisible, down, and slightly smaller
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1, // Animate to visible, original position, and full size
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
// };

// // --- Main Component ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const pathname = usePathname();
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]); // Keep refs for marquee duplication

//   useEffect(() => {
//     const fetchReviews = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Ensure the path to Review.json is correct relative to the public folder
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(
//             `HTTP error! status: ${response.status} fetching /Review.json`
//           );
//         }
//         const data: ReviewData = await response.json();
//         if (!data || !Array.isArray(data.reviewGroups)) {
//           throw new Error("Invalid data structure received from Review.json");
//         }
//         // Only take the first 3 groups for display
//         setReviewGroups(data.reviewGroups.slice(0, 3));
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err instanceof Error ? err : new Error("Unknown error"));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   // Marquee Duplication Logic - CORRECTED
//   useEffect(() => {
//     // Only run if data is loaded, no error, and we have groups and refs
//     if (
//       loading ||
//       error ||
//       reviewGroups.length === 0 ||
//       columnRefs.current.length === 0
//     ) {
//       return;
//     }

//     const columns = columnRefs.current;

//     // Timeout to allow initial render and Framer Motion animations potentially
//     const timer = setTimeout(() => {
//       // Iterate through refs using index
//       columns.forEach((columnEl, index) => {
//         if (!columnEl) return;
//         const contentEl =
//           columnEl.querySelector<HTMLDivElement>(".marquee-content");
//         if (!contentEl) return;

//         // *** FIX: Get the corresponding review group using the index ***
//         const currentGroup = reviewGroups[index];
//         // Safety check: Ensure the group exists for this index
//         if (!currentGroup) {
//           console.warn(`No review group found for column index ${index}`);
//           return;
//         }

//         // Check if content needs duplication
//         if (contentEl.scrollHeight < columnEl.offsetHeight * 1.5) {
//           // *** FIX: Use the correct group's review count ***
//           const originalChildrenCount = currentGroup.reviews.length;

//           // Avoid duplicating if already duplicated (or more items than original somehow)
//           if (contentEl.children.length <= originalChildrenCount) {
//             const originalChildren = Array.from(contentEl.children);
//             originalChildren.forEach((child) => {
//               const clone = child.cloneNode(true) as HTMLElement;
//               // Remove Framer Motion specific attributes/styles from clones if they cause issues
//               // Basic style removal, might need more specific cleanup (e.g., removing data attributes)
//               clone.removeAttribute("style");
//               // Optionally remove Framer motion data attributes if they interfere
//               // Object.keys(clone.dataset).forEach(key => {
//               //    if (key.startsWith('motion') || key.startsWith('framer')) {
//               //        delete clone.dataset[key];
//               //    }
//               // });
//               contentEl.appendChild(clone);
//             });
//             console.log(`Duplicated content for column ${index + 1}`);
//           } else {
//             console.log(
//               `Skipping duplication for column ${
//                 index + 1
//               } - already duplicated`
//             );
//           }
//         } else {
//           console.log(
//             `Skipping duplication for column ${index + 1} - content tall enough`
//           );
//         }
//       });
//     }, 300); // Delay duplication slightly

//     return () => clearTimeout(timer); // Cleanup timer
//     // Rerun if data changes, loading state changes, or error state changes
//   }, [loading, error, reviewGroups]);

//   if (loading) {
//     return (
//       <div className="text-center p-6">
//         Loading reviews please you can wait...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error loading reviews: {error.message}
//       </div>
//     );
//   }

//   if (reviewGroups.length === 0) {
//     return (
//       <div className="text-center p-10 text-gray-700">
//         No reviews available yet.
//       </div>
//     );
//   }

//   const isHomePage = pathname === "/";

//   const heading = isHomePage ? (
//     <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//       Honest Reviews
//       <span className="text-primary"> Real Travelers Like You </span>
//     </h1>
//   ) : (
//     <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//       Trusted Currency Exchange
//       <span className="text-primary"> Feedback & Rating </span>
//     </h1>
//   );

//   const paragraph = isHomePage ? (
//     <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base lg:max-w-5xl max-w-full">
//       Discover what real travelers have to say about their experiences with our
//       currency exchange services. From frequent flyers to first-time tourists,
//       our customers share honest feedback about fast, reliable, and secure
//       transactions.
//     </p>
//   ) : (
//     <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base lg:max-w-5xl max-w-full">
//       Read honest customer reviews about our currency exchange services. See why
//       travelers, investors, and expats trust us for fast, reliable, and
//       competitive rates. Our clients appreciate the transparency, excellent
//       support, and real-time rates.
//     </p>
//   );

//   return (
//     <motion.section
//       className="Reviews-Cards lg:py-10 py-5 bg-white dark:bg-background overflow-hidden" // Added overflow-hidden
//       id="review"
//       variants={sectionVariants}
//       initial="hidden"
//       whileInView="visible"
//       // *** FIX: Set once to true for single animation trigger ***
//       viewport={{ amount: 0.2, once: true }} // Trigger when 10% visible, animate ONLY ONCE
//     >
//       <div className="container mx-auto px-4">
//         {/* Text Block Animation */}
//         <motion.div
//           className="w-full mb-10 space-y-4 text-center md:text-left"
//           variants={textBlockVariants}
//           // Inherits trigger from parent section
//         >
//           {heading}
//           {paragraph}
//         </motion.div>
//         {/* --- Grid Container for Columns --- */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[1000px] overflow-hidden relative" // Keep fixed height for marquee
//           variants={columnsContainerVariants} // Controls staggering of columns
//           // Inherits trigger from parent section
//         >
//           {/* Map through the review groups for columns */}
//           {reviewGroups.map(
//             (
//               group,
//               index // We already slice to max 3 groups in fetch useEffect
//             ) => (
//               // --- Column Wrapper for Staggering Cards Within ---
//               <motion.div
//                 key={group.id || `group-${index}`}
//                 variants={columnItemVariants} // Controls staggering of cards inside
//                 // This motion.div wraps the column structure but doesn't interfere with marquee ref/class
//               >
//                 {/* Actual Column Structure with Marquee Ref */}
//                 <div
//                   className={`marquee-column marquee-column-${index + 1}`}
//                   ref={(el: HTMLDivElement | null) => {
//                     // Assign the ref to the correct index
//                     if (el) columnRefs.current[index] = el;
//                   }}
//                 >
//                   {/* Marquee Content Div (NO motion here) */}
//                   <div className="marquee-content flex flex-col gap-6">
//                     {/* Map through reviews WITHIN the group */}
//                     {group.reviews.map((review, reviewIndex) => (
//                       // --- Individual Card Wrapper for Entrance Animation ---
//                       <motion.div
//                         // Use a more unique key if possible, e.g., review ID if available
//                         key={`${group.id}-review-${reviewIndex}`}
//                         variants={cardEntranceVariants} // Apply entrance animation HERE
//                       >
//                         <ReviewCard {...review} />
//                       </motion.div>
//                     ))}
//                   </div>{" "}
//                   {/* End marquee-content */}
//                 </div>{" "}
//                 {/* End marquee-column div with ref */}
//               </motion.div> // End column wrapper motion.div
//             )
//           )}

//           {/* Gradient Fades */}
//           <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none z-10"></div>
//           <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none z-10"></div>
//         </motion.div>
//       </div>

//       <style jsx global>{`
//         .marquee-column {
//           overflow: hidden;
//           height: 100%;
//           position: relative;
//         }

//         .marquee-content {
//           // display: block; /* Or flex if needed */
//           // position: relative; /* Keep relative for transform */
//           animation: scroll-up 40s linear infinite; /* Slower animation? */
//         }

//         .marquee-column:hover .marquee-content {
//           animation-play-state: paused;
//         }

//         @keyframes scroll-up {
//           0% {
//             transform: translateY(0%);
//           }
//           100% {
//             /* This assumes duplication. Adjust if duplication logic changes */
//             transform: translateY(-50%);
//           }
//         }
//       `}</style>

//     </motion.section>
//   );
// };

// export default ReviewCards;

// src/app/(website)/components/SocialTrust.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// --- StarRating Component (No changes needed) ---
interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < maxRating; i++) {
    if (i < fullStars) {
      stars.push(
        <FaStar
          key={`star-full-${i}`}
          className="inline-block text-[#FBBF24] dark:text-white"
          size={18}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key={`star-half-${i}`}
          className="inline-block text-[#FBBF24] dark:text-white"
          size={18}
        />
      );
    } else {
      stars.push(
        <FaStar
          key={`star-empty-${i}`}
          className="inline-block text-lightgray dark:text-white"
          size={18}
        />
      );
    }
  }

  return <div className="inline-block">{stars}</div>;
};

// --- ReviewCard Component (No changes needed) ---
interface ReviewCardProps {
  reviewerName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  avatarUrl,
  rating,
  comment,
}) => {
  return (
    <div className="bg-lightgray dark:bg-primarybox rounded-2xl lg:p-6 p-4 flex flex-col items-start relative flex-shrink-0 h-full">
      <div className="flex md:flex-row items-center w-full justify-center md:justify-start">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <img
            src={avatarUrl}
            alt={`Avatar of ${reviewerName}`}
            className="size-16 rounded-full object-cover"
          />
          <div className="flex flex-col items-center md:items-start">
            <div className="text-mainheading lg:text-lg text-base capitalize dark:text-primary leading-5 font-medium text-nowrap">
              {reviewerName}
            </div>
            <StarRating rating={rating} />
          </div>
        </div>
      </div>

      <div className="text-gray-500 dark:text-gray-300 lg:text-lg text-base mt-5">
        {comment}
      </div>
    </div>
  );
};

// --- Interfaces for Data Structure ---
interface Review {
  reviewerName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  location?: string; // From original JSON, though not used in ReviewCard
}

interface ReviewGroup {
  id: number; // JSON uses number for group id
  reviews: Review[];
}

interface ReviewData {
  reviewGroups: ReviewGroup[];
}

// --- Animation Variants (Largely unchanged) ---
const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const textBlockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const columnsContainerVariants = {
  // For the flex container holding the 3 columns
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Stagger the appearance of each column wrapper
      delayChildren: 0.2,
    },
  },
};

const columnItemVariants = {
  // For each of the 3 column wrappers
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the cards *inside* this column
    },
  },
};

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// --- Main Component ---
const ReviewCards: React.FC = () => {
  const [allReviewsFlat, setAllReviewsFlat] = useState<Review[]>([]);
  const [marqueeColumnContents, setMarqueeColumnContents] = useState<
    Review[][]
  >([[], [], []]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const pathname = usePathname();
  // Refs for the 3 marquee column divs
  const columnRefs = useRef<(HTMLDivElement | null)[]>(new Array(3).fill(null));

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/Review.json"); // Assuming Review.json is in public folder
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} fetching /Review.json`
          );
        }
        const data: ReviewData = await response.json();
        if (!data || !Array.isArray(data.reviewGroups)) {
          throw new Error("Invalid data structure received from Review.json");
        }
        const flatReviews = data.reviewGroups.flatMap((group) => group.reviews);
        setAllReviewsFlat(flatReviews);
      } catch (err: any) {
        console.error("Failed to fetch reviews:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Distribute flat reviews into 3 columns for marquee effect
  useEffect(() => {
    if (allReviewsFlat.length > 0) {
      const columns: Review[][] = [[], [], []];
      allReviewsFlat.forEach((review, index) => {
        columns[index % 3].push(review); // Round-robin distribution
      });
      setMarqueeColumnContents(columns);
    } else {
      setMarqueeColumnContents([[], [], []]); // Clear if no reviews
    }
  }, [allReviewsFlat]);

  // Marquee Duplication Logic
  useEffect(() => {
    // Ensure data is loaded, no errors, and refs are set.
    // Also check that there's actual content in at least one column.
    if (
      loading ||
      error ||
      marqueeColumnContents.every((col) => col.length === 0) ||
      columnRefs.current.some((ref) => !ref)
    ) {
      return;
    }

    const columnsToProcess = columnRefs.current;

    const timer = setTimeout(() => {
      columnsToProcess.forEach((columnEl, index) => {
        if (!columnEl) return; // Skip if ref for this column is not set

        const contentEl =
          columnEl.querySelector<HTMLDivElement>(".marquee-content");
        if (!contentEl) return;

        const reviewsInThisColumn = marqueeColumnContents[index];
        // Skip if this column has no reviews
        if (!reviewsInThisColumn || reviewsInThisColumn.length === 0) return;

        // Check if content needs duplication (e.g., content shorter than 1.5x viewport height)
        if (
          contentEl.scrollHeight > 0 &&
          columnEl.offsetHeight > 0 &&
          contentEl.scrollHeight < columnEl.offsetHeight * 1.5
        ) {
          const originalChildrenCount = reviewsInThisColumn.length;

          // Avoid re-duplicating if already duplicated
          if (contentEl.children.length === originalChildrenCount) {
            const originalChildren = Array.from(contentEl.children);
            originalChildren.forEach((child) => {
              const clone = child.cloneNode(true) as HTMLElement;
              // Basic cleanup of styles/attributes from clones that might interfere
              clone.removeAttribute("style");
              Object.keys(clone.dataset).forEach((key) => {
                if (key.startsWith("motion") || key.startsWith("framer")) {
                  delete clone.dataset[key];
                }
              });
              clone.classList.add("marquee-clone"); // For potential debugging/styling
              contentEl.appendChild(clone);
            });
            // console.log(`Duplicated content for column ${index + 1}`);
          }
        }
      });
    }, 300); // Delay duplication slightly to allow Framer Motion and layout settlement

    return () => clearTimeout(timer); // Cleanup timer
  }, [loading, error, marqueeColumnContents]); // Rerun if data, loading, or error state changes

  if (loading) {
    return (
      <div className="text-center p-6">
        Loading reviews please you can wait...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        Error loading reviews: {error.message}
      </div>
    );
  }

  if (allReviewsFlat.length === 0 && !loading) {
    return (
      <div className="text-center p-10 text-gray-700">
        No reviews available yet.
      </div>
    );
  }

  const isHomePage = pathname === "/";
  // Dynamic heading and paragraph (no changes needed here)
  const heading = isHomePage ? (
    <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
      Honest Reviews
      <span className="text-primary"> Real Travelers Like You </span>
    </h1>
  ) : (
    <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
      Trusted Currency Exchange
      <span className="text-primary"> Feedback & Rating </span>
    </h1>
  );

  const paragraph = isHomePage ? (
    <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base lg:max-w-5xl max-w-full">
      Discover what real travelers have to say about their experiences with our
      currency exchange services. From frequent flyers to first-time tourists,
      our customers share honest feedback about fast, reliable, and secure
      transactions.
    </p>
  ) : (
    <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base lg:max-w-5xl max-w-full">
      Read honest customer reviews about our currency exchange services. See why
      travelers, investors, and expats trust us for fast, reliable, and
      competitive rates. Our clients appreciate the transparency, excellent
      support, and real-time rates.
    </p>
  );

  // Helper to get responsive classes for each of the 3 columns
  const getColumnResponsiveClasses = (index: number): string => {
    // Base classes: flex item, full height, allows shrinking, acts as a flex column for its content
    let classes = "h-full flex-1 min-w-0 flex flex-col";
    // `min-w-0` is crucial for flex items that might contain overflowing content.
    // `flex-1` allows columns to grow and shrink equally to fill space.

    if (index === 0) {
      // First column is always visible (effectively `block` or `flex`)
    } else if (index === 1) {
      classes += " hidden md:flex"; // Hidden on mobile, becomes flex item from md breakpoint
    } else if (index === 2) {
      classes += " hidden lg:flex"; // Hidden on mobile and sm, becomes flex item from lg breakpoint
    }
    return classes;
  };

  return (
    <motion.section
      className="Reviews-Cards lg:py-10 py-5 bg-white dark:bg-background overflow-hidden"
      id="review"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1, once: true }} // Animate once when 10% is visible
    >
      <div className="container mx-auto px-4">
        {/* Text Block Animation */}
        <motion.div
          className="w-full mb-10 space-y-4 text-center md:text-left"
          variants={textBlockVariants}
        >
          {heading}
          {paragraph}
        </motion.div>

        {/* Container for the 3 (conditionally visible) marquee columns */}
        <motion.div
          className="flex gap-6 h-[1000px] relative" // Flex row, fixed height for marquee viewport
          variants={columnsContainerVariants} // Animates the container of columns
        >
          {marqueeColumnContents.map((reviewsInColumn, index) => (
            // Wrapper for each column, handles its visibility and staggering
            <motion.div
              key={`marquee-col-wrapper-${index}`}
              variants={columnItemVariants} // Staggers appearance of each column itself
              className={getColumnResponsiveClasses(index)}
            >
              {/* This div is the actual column for marquee mechanics & ref */}
              <div
                className={`marquee-column marquee-column-${
                  index + 1
                } flex-grow overflow-hidden h-full`}
                ref={(el: HTMLDivElement | null) => {
                  if (el) columnRefs.current[index] = el;
                }}
              >
                {/* Content that scrolls within the column */}
                <div className="marquee-content flex flex-col gap-6">
                  {reviewsInColumn.map((review, reviewIndex) => (
                    // Wrapper for individual card entrance animation
                    <motion.div
                      key={`${review.reviewerName}-${review.rating}-${reviewIndex}-${index}`} // Unique key
                      variants={cardEntranceVariants}
                    >
                      <ReviewCard {...review} />
                    </motion.div>
                  ))}
                </div>{" "}
                {/* End marquee-content */}
              </div>{" "}
              {/* End marquee-column div with ref */}
            </motion.div> // End column wrapper motion.div
          ))}

          {/* Gradient Fades at top and bottom of the column container */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent pointer-events-none z-10"></div>
        </motion.div>
      </div>

      <style jsx global>{`
        /* .marquee-column styles are now applied via Tailwind: flex-grow overflow-hidden h-full */

        .marquee-content {
          /* Already a flex column with gap via Tailwind */
          animation: scroll-up 60s linear infinite; /* Adjust duration as needed */
          /* Slower animation: higher duration value */
        }

        /* Pause animation on hover for any individual column's content */
        .marquee-column:hover .marquee-content {
          animation-play-state: paused;
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0%);
          }
          100% {
            /* Assumes content is duplicated. Scrolls one full "original content height" up. */
            transform: translateY(-50%);
          }
        }

        /* Optional: class to identify cloned items for debugging or specific styling if needed */
        .marquee-clone {
          /* Example: opacity: 0.8; /* to visually distinguish clones during testing */
        }
      `}</style>
    </motion.section>
  );
};

export default ReviewCards;
