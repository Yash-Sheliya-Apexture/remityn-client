// // src/app/all-reviews/page.tsx
// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// // --- Interfaces for Data Structure (Copied from SocialTrust) ---
// interface Review {
//     reviewerName: string;
//     avatarUrl: string;
//     rating: number;
//     comment: string;
//     // Add a unique ID if your data source provides one, otherwise rely on index (less ideal)
//     id?: string | number;
// }

// interface ReviewGroup {
//     id: string;
//     reviews: Review[];
// }

// interface ReviewData {
//     reviewGroups: ReviewGroup[];
// }

// // --- StarRating Component (Copied from SocialTrust) ---
// interface StarRatingProps {
//     rating: number;
//     maxRating?: number;
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

// // --- ReviewCard Component (Copied from SocialTrust) ---
// interface ReviewCardProps extends Review {} // Use the Review interface directly

// const ReviewCard: React.FC<ReviewCardProps> = ({
//     reviewerName,
//     avatarUrl,
//     rating,
//     comment,
// }) => {
//     return (
//         // Added min-h-[200px] or similar to prevent layout shifts during load
//         <div className="bg-lightgray dark:bg-primarybox rounded-2xl lg:p-6 p-4 flex flex-col items-start h-full min-h-[200px]">
//             <div className="flex md:flex-row items-center w-full justify-center md:justify-start">
//                 <div className="flex flex-col md:flex-row items-center gap-4">
//                     <img
//                         src={avatarUrl}
//                         alt={`Avatar of ${reviewerName}`}
//                         className="size-16 rounded-full object-cover flex-shrink-0" // Added flex-shrink-0
//                         loading="lazy" // Added lazy loading for images
//                     />
//                     <div className="flex flex-col items-center md:items-start">
//                         <div className="text-neutral-900 lg:text-lg text-base capitalize dark:text-primary leading-5 font-medium text-nowrap">
//                             {reviewerName}
//                         </div>
//                         <StarRating rating={rating} />
//                     </div>
//                 </div>
//             </div>

//             <div className="text-gray-500 dark:text-gray-300 lg:text-lg text-base mt-5 flex-grow"> {/* Added flex-grow */}
//                 {comment}
//             </div>
//         </div>
//     );
// };

// // --- Constants for Infinite Scrolling ---
// const INITIAL_MOBILE_LOAD = 6;
// const LOAD_MORE_COUNT = 6; // Number of reviews to load each time

// // --- Main AllReviewsPage Component ---
// const AllReviewsPage: React.FC = () => {
//     const [allReviews, setAllReviews] = useState<Review[]>([]);
//     const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<Error | null>(null);
//     const [isMobile, setIsMobile] = useState<boolean>(false);
//     const [hasMore, setHasMore] = useState<boolean>(false); // Tracks if more reviews can be loaded
//     const [loadingMore, setLoadingMore] = useState<boolean>(false); // Tracks if loading more is in progress

//     const observerRef = useRef<HTMLDivElement | null>(null); // Ref for the intersection observer target

//     // --- 1. Fetch All Reviews ---
//     useEffect(() => {
//         const fetchReviews = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch("/Review.json"); // Ensure this path is correct
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data: ReviewData = await response.json();
//                 if (!data || !Array.isArray(data.reviewGroups)) {
//                     throw new Error("Invalid data structure in Review.json");
//                 }

//                 // Flatten all reviews from all groups into one array
//                 // Add a unique ID based on group and index if not present
//                 const flattenedReviews = data.reviewGroups.flatMap((group, groupIndex) =>
//                     group.reviews.map((review, reviewIndex) => ({
//                         ...review,
//                         id: review.id ?? `g${groupIndex}-r${reviewIndex}`, // Assign a generated ID
//                     }))
//                 );

//                 setAllReviews(flattenedReviews);

//             } catch (err: any) {
//                 console.error("Failed to fetch reviews:", err);
//                 setError(err instanceof Error ? err : new Error("Unknown error"));
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchReviews();
//     }, []); // Fetch only once on component mount

//     // --- 2. Detect Mobile Screen Size ---
//     useEffect(() => {
//         const checkMobile = () => {
//             // Using 768px (Tailwind's `md` breakpoint) as the threshold
//             setIsMobile(window.innerWidth < 768);
//         };

//         checkMobile(); // Initial check
//         window.addEventListener("resize", checkMobile);

//         // Cleanup listener on component unmount
//         return () => window.removeEventListener("resize", checkMobile);
//     }, []);

//     // --- 3. Set Initial Displayed Reviews ---
//     useEffect(() => {
//         if (allReviews.length === 0) return; // Don't run if no reviews fetched yet

//         if (isMobile) {
//             // Mobile: Show initial batch
//             const initialToShow = allReviews.slice(0, INITIAL_MOBILE_LOAD);
//             setDisplayedReviews(initialToShow);
//             // Check if there are more reviews beyond the initial load
//             setHasMore(allReviews.length > INITIAL_MOBILE_LOAD);
//         } else {
//             // Desktop: Show all reviews
//             setDisplayedReviews(allReviews);
//             setHasMore(false); // No "load more" needed for desktop
//         }
//     }, [allReviews, isMobile]); // Rerun when allReviews are loaded or screen size changes

//     // --- 4. Infinite Scroll Logic ---
//     const loadMoreReviews = useCallback(() => {
//         if (loadingMore || !hasMore || !isMobile) return; // Exit if already loading, no more reviews, or not mobile

//         setLoadingMore(true);

//         const currentLength = displayedReviews.length;
//         const nextBatch = allReviews.slice(currentLength, currentLength + LOAD_MORE_COUNT);

//         // Simulate network delay for loading indicator visibility (optional)
//         setTimeout(() => {
//             setDisplayedReviews(prev => [...prev, ...nextBatch]);
//             setHasMore(currentLength + nextBatch.length < allReviews.length);
//             setLoadingMore(false);
//         }, 300); // Adjust delay as needed

//     }, [allReviews, displayedReviews.length, hasMore, isMobile, loadingMore]);

//     // --- 5. Setup Intersection Observer ---
//     useEffect(() => {
//         // Only run observer setup on mobile and if there's potentially more to load
//         if (!isMobile || !hasMore) return;

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 // isIntersecting is true when the target element enters the viewport
//                 if (entries[0].isIntersecting && hasMore && !loadingMore) {
//                     loadMoreReviews();
//                 }
//             },
//             {
//                 root: null, // Use the viewport as the root
//                 rootMargin: '0px',
//                 threshold: 0.1 // Trigger when 10% of the target is visible
//             }
//         );

//         // If the observerRef exists, start observing it
//         const currentObserverRef = observerRef.current;
//         if (currentObserverRef) {
//             observer.observe(currentObserverRef);
//         }

//         // Cleanup function: disconnect the observer when the component unmounts
//         // or when dependencies change (isMobile, hasMore)
//         return () => {
//             if (currentObserverRef) {
//                 observer.unobserve(currentObserverRef);
//             }
//         };
//     }, [isMobile, hasMore, loadMoreReviews, loadingMore]); // Dependencies for the observer effect

//     if (error) {
//         return (
//             <div className="text-center p-10 text-red-500">
//                 Error loading reviews: {error.message}
//             </div>
//         );
//     }

//     if (allReviews.length === 0) {
//         return (
//             <div className="text-center p-10 text-gray-700 dark:text-gray-300">
//                 No reviews have been submitted yet.
//             </div>
//         );
//     }

//     return (
//       <section className="AllReviews bg-white dark:bg-background py-10">
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-mainheading dark:text-white mb-8 text-center">
//             What Our Customers Say
//           </h1>

//           {/* Grid for displaying reviews */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {displayedReviews.map((review) => (
//               <ReviewCard key={review.id} {...review} />
//             ))}
//           </div>

//           {/* --- Observer Target & Loading Indicator (Mobile Only) --- */}
//           {isMobile && (
//             <div
//               ref={observerRef}
//               className="h-10 flex justify-center items-center mt-8"
//             >
//               {loadingMore && (
//                 /* From Uiverse.io by yohohopizza */
//                 <div className="flex flex-row gap-2">
//                   <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
//                   <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
//                   <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
//                 </div>
//               )}
//               {!hasMore && displayedReviews.length > INITIAL_MOBILE_LOAD && (
//                 <div className="text-center text-gray-500 dark:text-gray-400">
//                   You've reached the end!
//                 </div>
//               )}
//             </div>
//           )}
//           {/* Optionally, add a "Load More" button for non-mobile if desired, */}
//           {/* but the request specified infinite scroll *only* for mobile */}
//         </div>
//       </section>
//     );
// };

// export default AllReviewsPage;

// // // // src/app/all-reviews/page.tsx
// "use client";
// import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// // --- Interfaces ---
// interface Review {
//     reviewerName: string;
//     avatarUrl: string;
//     rating: number;
//     comment: string;
//     id: string | number; // Made ID non-optional after generation
// }

// interface ReviewGroup {
//     id: string;
//     reviews: Omit<Review, 'id'>[]; // Original reviews might not have an ID
// }

// interface ReviewData {
//     reviewGroups: ReviewGroup[];
// }

// // --- Constants ---
// const INITIAL_MOBILE_LOAD = 6;
// const LOAD_MORE_COUNT = 6;
// const MOBILE_BREAKPOINT = 768; // Tailwind's `md` breakpoint
// const LOAD_MORE_DELAY_MS = 1000; // 1 seconds delay

// // --- Helper Functions ---
// const generateReviewId = (groupIndex: number, reviewIndex: number): string => `g${groupIndex}-r${reviewIndex}`;

// // --- StarRating Component (Optimized slightly with useMemo for stars array) ---
// interface StarRatingProps {
//     rating: number;
//     maxRating?: number;
//     iconSize?: number;
//     className?: string;
//     starColor?: string;
//     emptyStarColor?: string;
// }

// const StarRating: React.FC<StarRatingProps> = ({
//     rating,
//     maxRating = 5,
//     iconSize = 18,
//     className = "",
//     starColor = "text-[#FBBF24] dark:text-white", // Yellow for filled
//     emptyStarColor = "text-gray-300 dark:text-gray-500", // Lighter gray for empty
// }) => {
//     const stars = useMemo(() => {
//         const starElements = [];
//         const fullStars = Math.floor(rating);
//         const hasHalfStar = rating % 1 !== 0;

//         for (let i = 0; i < maxRating; i++) {
//             if (i < fullStars) {
//                 starElements.push(<FaStar key={`star-${i}`} className={starColor} size={iconSize} />);
//             } else if (i === fullStars && hasHalfStar) {
//                 starElements.push(<FaStarHalfAlt key={`star-${i}`} className={starColor} size={iconSize} />);
//             } else {
//                 starElements.push(<FaStar key={`star-${i}`} className={emptyStarColor} size={iconSize} />);
//             }
//         }
//         return starElements;
//     }, [rating, maxRating, iconSize, starColor, emptyStarColor]);

//     return <div className={`inline-flex items-center ${className}`}>{stars}</div>;
// };

// // --- ReviewCard Component (Memoized) ---
// interface ReviewCardProps extends Review {}

// const ReviewCard: React.FC<ReviewCardProps> = React.memo(({
//     reviewerName,
//     avatarUrl,
//     rating,
//     comment,
// }) => {
//     return (
//         <div className="bg-lightgray dark:bg-primarybox rounded-2xl lg:p-6 p-4 flex flex-col items-start h-full min-h-[200px] shadow-sm"> {/* Added subtle shadow */}
//             <div className="flex items-center gap-4 w-full"> {/* Adjusted spacing */}
//                 <img
//                     src={avatarUrl}
//                     alt={`Avatar of ${reviewerName}`}
//                     className="size-14 rounded-full object-cover flex-shrink-0" // Slightly smaller avatar, added margin
//                     loading="lazy"
//                     width={56} // Added explicit width/height
//                     height={56}
//                 />
//                 <div className="flex flex-col items-start">
//                     <h3 className="text-neutral-900 lg:text-lg text-base capitalize dark:text-primary leading-8 font-medium text-nowrap"> {/* Adjusted styles, added line-clamp */}
//                         {reviewerName}
//                     </h3>
//                     <StarRating rating={rating} iconSize={16} /> {/* Slightly smaller stars */}
//                 </div>
//             </div>

//             <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base mt-5 flex-grow"> {/* Adjusted text size/color, added line-clamp */}
//                 {comment}
//             </p>
//         </div>
//     );
// });
// ReviewCard.displayName = 'ReviewCard'; // Add display name for React DevTools

// // --- Main AllReviewsPage Component ---
// const AllReviewsPage: React.FC = () => {
//     const [allReviews, setAllReviews] = useState<Review[]>([]);
//     const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
//     const [isMobile, setIsMobile] = useState<boolean>(false); // Default to false, check in effect
//     const [hasMore, setHasMore] = useState<boolean>(false);
//     const [loadingMore, setLoadingMore] = useState<boolean>(false);

//     const observerRef = useRef<HTMLDivElement | null>(null);

//     // --- 1. Fetch All Reviews ---
//     useEffect(() => {
//         let isMounted = true; // Prevent state update on unmounted component
//         const fetchReviews = async () => {
//             try {
//                 const response = await fetch("/Review.json");
//                 if (!isMounted) return; // Check if component is still mounted

//                 if (!response.ok) {
//                     console.error(`HTTP error! status: ${response.status}`);
//                     setAllReviews([]); // Set empty on error
//                     return;
//                 }
//                 const data: ReviewData = await response.json();
//                 if (!isMounted) return; // Check again after await

//                 if (!data || !Array.isArray(data.reviewGroups)) {
//                     console.error("Invalid data structure in Review.json");
//                     setAllReviews([]); // Set empty on invalid data
//                     return;
//                 }

//                 // Flatten and assign unique IDs
//                 const flattenedReviews = data.reviewGroups.flatMap((group, groupIndex) =>
//                     group.reviews.map((review, reviewIndex) => ({
//                         ...review,
//                         id: generateReviewId(groupIndex, reviewIndex), // Use helper for ID
//                     }))
//                 );

//                 setAllReviews(flattenedReviews);

//             } catch (err: any) {
//                 if (isMounted) {
//                     console.error("Failed to fetch reviews:", err);
//                     setAllReviews([]); // Set empty on fetch error
//                 }
//             }
//         };
//         fetchReviews();

//         // Cleanup function
//         return () => {
//             isMounted = false;
//         };
//     }, []); // Fetch only once on component mount

//     // --- 2. Detect Mobile Screen Size ---
//     useEffect(() => {
//         // Check if window exists (for SSR safety)
//         if (typeof window === 'undefined') return;

//         const checkMobile = () => {
//             setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//         };

//         checkMobile(); // Initial check
//         window.addEventListener("resize", checkMobile, { passive: true }); // Use passive listener

//         // Cleanup listener
//         return () => window.removeEventListener("resize", checkMobile);
//     }, []);

//     // --- 3. Set Initial Displayed Reviews based on allReviews & isMobile ---
//     useEffect(() => {
//         if (allReviews.length === 0) {
//             setDisplayedReviews([]);
//             setHasMore(false);
//             return;
//         }

//         const limit = isMobile ? INITIAL_MOBILE_LOAD : allReviews.length;
//         setDisplayedReviews(allReviews.slice(0, limit));
//         setHasMore(isMobile && allReviews.length > INITIAL_MOBILE_LOAD);

//     }, [allReviews, isMobile]); // Dependencies: run when allReviews load or screen size changes

//     // --- 4. Infinite Scroll Logic (Memoized with useCallback) ---
//     const loadMoreReviews = useCallback(() => {
//         // Combined exit conditions for clarity
//         if (loadingMore || !hasMore || !isMobile) return;

//         setLoadingMore(true);

//         // Calculate next batch directly without intermediate variables
//         const nextBatch = allReviews.slice(
//             displayedReviews.length,
//             displayedReviews.length + LOAD_MORE_COUNT
//         );

//         // Use setTimeout for the requested delay
//         setTimeout(() => {
//             setDisplayedReviews(prev => [...prev, ...nextBatch]);
//             // Update hasMore based on the *new* potential length
//             setHasMore(displayedReviews.length + nextBatch.length < allReviews.length);
//             setLoadingMore(false);
//         }, LOAD_MORE_DELAY_MS);

//     }, [allReviews, displayedReviews.length, hasMore, isMobile, loadingMore]); // Dependencies for useCallback

//     // --- 5. Setup Intersection Observer ---
//     useEffect(() => {
//         // Observer setup only needed on mobile when there might be more items
//         if (!isMobile || !hasMore) return;

//         const observerCallback: IntersectionObserverCallback = (entries) => {
//             // Check intersection and ensure not already loading
//             if (entries[0]?.isIntersecting && !loadingMore) {
//                 loadMoreReviews();
//             }
//         };

//         const observer = new IntersectionObserver(observerCallback, {
//             root: null, // Use viewport
//             rootMargin: '0px',
//             threshold: 0.1 // Trigger early
//         });

//         const currentObserverTarget = observerRef.current;
//         if (currentObserverTarget) {
//             observer.observe(currentObserverTarget);
//         }

//         // Cleanup: disconnect observer
//         return () => {
//             if (currentObserverTarget) {
//                 observer.unobserve(currentObserverTarget);
//             }
//             // Ensure observer itself is cleaned up if needed, though unobserve usually sufficient
//              observer.disconnect();
//         };
//     }, [isMobile, hasMore, loadMoreReviews, loadingMore]); // Dependencies ensure observer is correctly managed

//     // --- Render Logic ---

//     // Display message if no reviews are available after fetch attempt
//     if (allReviews.length === 0 && !loadingMore) { // Avoid flash during loadMore
//          return (
//             <section className="bg-white dark:bg-background py-10 min-h-screen flex items-center justify-center">
//                  <div className="text-center p-10 text-gray-500 dark:text-gray-300">
//                      No reviews available at the moment.
//                  </div>
//             </section>
//          );
//     }

//     return (
//       <section className="AllReviews lg:py-10 py-5 bg-white dark:bg-background">
//         <div className="container mx-auto px-4">
//             <div className="space-y-4 text-center md:text-left">
//                 <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
//                     <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
//                         Genuine Customer Reviews
//                     </span>
//                 </div>

//                 <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//                     Honest Reviews
//                     <span className="text-primary">Real Travelers Like You</span>
//                 </h1>

//                 <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
//                     Discover what real travelers have to say about their experiences
//                     with our currency exchange services. From frequent flyers to
//                     first-time tourists, our customers share honest feedback about
//                     fast, reliable, and secure transactions.
//                 </p>
//             </div>

//           {/* Review Grid - Use gap-x/gap-y for better control */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mt-6">
//             {displayedReviews.map((review) => (
//               <ReviewCard key={review.id} {...review} />
//             ))}
//           </div>

//           {/* --- Observer Target & Loading Indicator (Mobile Only) --- */}
//           {isMobile &&
//             hasMore && ( // Only render observer/loader if needed
//               <div
//                 ref={observerRef}
//                 className="h-20 flex justify-center items-center mt-8" // Increased height for better visibility
//               >
//                 {loadingMore && (
//                   <div
//                     className="flex flex-row gap-2"
//                     aria-label="Loading more reviews..."
//                   >
//                     <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
//                     <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
//                     <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
//                   </div>
//                 )}
//               </div>
//             )}
//           {/* "End Message" REMOVED */}
//         </div>
//       </section>
//     );
// };

// export default AllReviewsPage;

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// // Props for StarRating
// interface StarRatingProps {
//   rating: number;
//   maxRating?: number;
// }

// // StarRating component
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
//       // Added missing default text color for empty stars
//       stars.push(
//         <FaStar
//           key={i}
//           className="inline-block text-gray-300 dark:text-gray-600"
//         />
//       );
//     }
//   }
//   // Removed redundant text-white, relies on individual star colors now
//   return <div className="inline-block">{stars}</div>;
// };

// // Props for individual ReviewCard
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// // ReviewCard component
// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
// }) => {
//   return (
//     <div className="bg-lightgray dark:bg-primarybox rounded-2xl lg:p-6 p-4 flex flex-col items-start shadow-sm">
//       <div className="flex items-center gap-4 w-full">
//         <img
//           src={avatarUrl}
//           alt={`Avatar of ${reviewerName}`}
//           className="lg:size-16 size-14 rounded-full object-cover flex-shrink-0"
//         />
//         <div className="flex flex-col items-start">
//           <div className="text-neutral-900 lg:text-lg text-base capitalize dark:text-primary font-medium text-nowrap">
//             {reviewerName}
//           </div>
//           <StarRating rating={rating} />
//         </div>
//       </div>

//       <div className="text-gray-500 dark:text-gray-300 lg:text-lg text-base mt-5 flex-grow">
//         {comment}
//       </div>
//     </div>
//   );
// };

// // Types for review data
// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string | number;
//   reviews: Review[];
// }

// interface ReviewJson {
//   reviewGroups: ReviewGroup[];
// }

// // ReviewCards component
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   // Initialize the ref array correctly
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         // Ensure the path is correct relative to the public folder
//         const response = await fetch("/Review.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewJson = await response.json();
//         // Initialize the refs array size based on fetched data
//         columnRefs.current = Array(data.reviewGroups.length).fill(null);
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err); // Added console log for debugging
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   if (loading) {
//     // Added basic loading state styling
//     return <div className="text-center p-10">Loading reviews...</div>;
//   }

//   if (error) {
//     // Added basic error state styling
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error loading reviews: {error.message}
//       </div>
//     );
//   }

//   // Added check for empty data
//   if (!reviewGroups || reviewGroups.length === 0) {
//     return <div className="text-center p-10">No reviews found.</div>;
//   }

//   return (
//     <section className="Reviews md:pt-14 pt-10">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
//           {reviewGroups.map((group, index) => (
//             <div
//               key={group.id}
//               className={`marquee-column marquee-column-${index + 1}`}
//               // --- FIX IS HERE ---
//               // Wrap the assignment in curly braces to ensure the function returns void
//               ref={(el) => {
//                 columnRefs.current[index] = el;
//               }}
//               // --- END FIX ---
//             >
//               {/* Check if group.reviews exists and has items before mapping */}
//               {group.reviews && group.reviews.length > 0 ? (
//                 <div className="marquee-content space-y-5">
//                   {group.reviews.map((review, reviewIndex) => (
//                     <ReviewCard key={reviewIndex} {...review} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center p-4 text-gray-500">
//                   No reviews in this group.
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
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
//           className="inline-block text-gray-300 dark:text-gray-600"
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
//     <div className="bg-lightgray dark:bg-primarybox rounded-2xl lg:p-6 p-4 flex flex-col items-start shadow-sm h-full">
//       {" "}
//       {/* Added h-full for consistent card heights if needed */}
//       <div className="flex items-center gap-4 w-full">
//         <img
//           src={avatarUrl}
//           alt={`Avatar of ${reviewerName}`}
//           className="lg:size-16 size-14 rounded-full object-cover flex-shrink-0"
//         />
//         <div className="flex flex-col items-start">
//           <div className="text-neutral-900 lg:text-lg text-base capitalize dark:text-primary font-medium text-nowrap">
//             {reviewerName}
//           </div>
//           <StarRating rating={rating} />
//         </div>
//       </div>
//       <div className="text-gray-500 dark:text-gray-300 lg:text-lg text-base mt-5 flex-grow">
//         {comment}
//       </div>
//     </div>
//   );
// };

// // --- Types for review data (No changes needed) ---
// interface Review {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string | number;
//   reviews: Review[];
// }

// interface ReviewJson {
//   reviewGroups: ReviewGroup[];
// }

// // --- ReviewCards Component (With Framer Motion) ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   // Refs are kept in case you still need them for a marquee effect later,
//   // but they are not directly used by *this* Framer Motion animation.
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch("/Review.json"); // Ensure this path is correct
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewJson = await response.json();
//         columnRefs.current = Array(data.reviewGroups.length).fill(null);
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   // --- Framer Motion Variants ---

//   // Variants for the container of cards within each column
//   const columnContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         // Stagger the animation of children (cards)
//         staggerChildren: 0.25, // Time delay between each card animation
//         delayChildren: 0.1, // Optional delay before the first child starts
//       },
//     },
//   };

//   // Variants for each individual ReviewCard
//   const cardVariants = {
//     hidden: {
//       opacity: 0,
//       y: 30, // Start 30px below final position
//       scale: 0.95, // Start slightly smaller
//     },
//     visible: {
//       opacity: 1,
//       y: 0, // Animate to final position
//       scale: 1, // Animate to full size
//       transition: {
//         duration: 0.7, // Animation duration
//         ease: "easeOut", // Animation easing function
//       },
//     },
//   };

//   // --- Loading and Error States ---
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

//   if (!reviewGroups || reviewGroups.length === 0) {
//     return <div className="text-center p-10">No reviews found.</div>;
//   }

//   // --- Render Component ---
//   return (
//     <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//       {/* Added overflow-hidden to section */}
//       <div className="container mx-auto px-4">
//         <div className="space-y-4 text-center md:text-left">
//           <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
//             <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
//               Genuine Customer Reviews
//             </span>
//           </div>

//           <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//             Honest Reviews
//             <span className="text-primary">Real Travelers Like You</span>
//           </h1>

//           <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base pb-10">
//             Discover what real travelers have to say about their experiences
//             with our currency exchange services. From frequent flyers to
//             first-time tourists, our customers share honest feedback about fast,
//             reliable, and secure transactions.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
//           {reviewGroups.map((group, index) => (
//             <div
//               key={group.id}
//               className={`marquee-column marquee-column-${index + 1}`} // Keep class if needed for marquee JS/CSS
//               ref={(el) => {
//                 columnRefs.current[index] = el;
//               }}
//             >
//               {/* Check if group.reviews exists and has items */}
//               {group.reviews && group.reviews.length > 0 ? (
//                 // Wrap the content that contains the cards in a motion.div
//                 <motion.div
//                   className="marquee-content space-y-5"
//                   variants={columnContainerVariants}
//                   initial="hidden"
//                   // Trigger animation when the container scrolls into view
//                   whileInView="visible"
//                   // Run animation only once when it enters the viewport
//                   viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the column is visible
//                 >
//                   {group.reviews.map((review, reviewIndex) => (
//                     // Wrap each ReviewCard in its own motion.div
//                     <motion.div
//                       key={reviewIndex}
//                       variants={cardVariants}
//                       // No need for initial/animate here, inherits from parent
//                       className="h-full" // Ensure motion div takes full height for layout consistency
//                     >
//                       <ReviewCard {...review} />
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               ) : (
//                 <div className="text-center p-4 text-gray-500">
//                   No reviews in this group.
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client";

// import { useState, useEffect, useRef, useMemo } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion"; // Import motion & AnimatePresence

// // --- Constants ---
// const MOBILE_BREAKPOINT = 768; // pixels, adjust as needed
// const REVIEWS_PER_PAGE_MOBILE = 6;

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
//           className="inline-block text-gray-300 dark:text-gray-600"
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
//     <div className="bg-lightgray dark:bg-primarybox rounded-2xl lg:p-6 p-4 flex flex-col items-start shadow-sm h-full">
//       {" "}
//       <div className="flex items-center gap-4 w-full">
//         <img
//           src={avatarUrl}
//           alt={`Avatar of ${reviewerName}`}
//           className="lg:size-16 size-14 rounded-full object-cover flex-shrink-0"
//         />
//         <div className="flex flex-col items-start">
//           <div className="text-neutral-900 lg:text-lg text-base capitalize dark:text-primary font-medium text-nowrap">
//             {reviewerName}
//           </div>
//           <StarRating rating={rating} />
//         </div>
//       </div>
//       <div className="text-gray-500 dark:text-gray-300 lg:text-lg text-base mt-5 flex-grow">
//         {comment}
//       </div>
//     </div>
//   );
// };

// // --- Loading Dots Component ---
// const LoadingDots: React.FC = () => (
//   <div className="flex justify-center items-center space-x-1.5 py-4">
//     <motion.div
//       className="size-2.5 bg-primary dark:bg-white rounded-full"
//       animate={{
//         y: ["0rem", "-0.4rem", "0rem"],
//       }}
//       transition={{
//         duration: 0.8,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: 0,
//       }}
//     />
//     <motion.div
//       className="size-2.5 bg-primary dark:bg-white rounded-full"
//       animate={{
//         y: ["0rem", "-0.4rem", "0rem"],
//       }}
//       transition={{
//         duration: 0.8,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: 0.2,
//       }}
//     />
//     <motion.div
//       className="size-2.5 bg-primary dark:bg-white rounded-full"
//       animate={{
//         y: ["0rem", "-0.4rem", "0rem"],
//       }}
//       transition={{
//         duration: 0.8,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: 0.4,
//       }}
//     />
//   </div>
// );

// // --- Types for review data (No changes needed) ---
// interface Review {
//   id: string | number; // Add an ID to each review for unique keys
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
// }

// interface ReviewGroup {
//   id: string | number;
//   reviews: Omit<Review, 'id'>[]; // Original reviews don't need an ID here
// }

// interface ReviewJson {
//   reviewGroups: ReviewGroup[];
// }

// // --- ReviewCards Component (With Mobile Load More Logic) ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(
//     REVIEWS_PER_PAGE_MOBILE
//   );
//   const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

//   // Refs are kept for potential future use but not for this animation logic
//   const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // --- Flatten reviews for mobile pagination ---
//   const allReviews = useMemo(() => {
//     let flatReviews: Review[] = [];
//     reviewGroups.forEach((group, groupIndex) => {
//       group.reviews.forEach((review, reviewIndex) => {
//         flatReviews.push({
//           ...review,
//           // Create a unique ID for each review based on group and index
//           id: `${group.id}-${groupIndex}-${reviewIndex}`,
//         });
//       });
//     });
//     return flatReviews;
//   }, [reviewGroups]);

//   // --- Effect for fetching data ---
//   useEffect(() => {
//     const fetchReviews = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("/Review.json"); // Ensure this path is correct
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ReviewJson = await response.json();
//         setReviewGroups(data.reviewGroups);
//         // Initialize refs based on group length (though not used for mobile anim)
//         columnRefs.current = Array(data.reviewGroups.length).fill(null);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   // --- Effect for detecting mobile screen size ---
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     };

//     checkScreenSize(); // Initial check
//     window.addEventListener("resize", checkScreenSize);

//     // Cleanup listener on component unmount
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // --- Framer Motion Variants ---
//   const columnContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.25,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: {
//       opacity: 0,
//       y: 30,
//       scale: 0.95,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.7,
//         ease: "easeOut",
//       },
//     },
//      // Added exit animation for potential future use with AnimatePresence
//      exit: {
//         opacity: 0,
//         y: -20,
//         scale: 0.98,
//         transition: {
//           duration: 0.3,
//           ease: "easeIn",
//         },
//       },
//   };

//   // --- Function to load more reviews on mobile ---
//   const loadMoreReviews = () => {
//     if (isLoadingMore || visibleReviewsCount >= allReviews.length) return;

//     setIsLoadingMore(true);
//     // Simulate loading time
//     setTimeout(() => {
//       setVisibleReviewsCount((prevCount) =>
//         Math.min(prevCount + REVIEWS_PER_PAGE_MOBILE, allReviews.length)
//       );
//       setIsLoadingMore(false);
//     }, 750); // Adjust delay as needed
//   };

//   // --- Loading and Error States ---
//   if (loading && reviewGroups.length === 0) { // Show initial loading only if no groups yet
//     return <div className="text-center p-10">Loading reviews...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center p-10 text-red-500">
//         Error loading reviews: {error.message}
//       </div>
//     );
//   }

//   if (!loading && reviewGroups.length === 0 && !error) {
//     return <div className="text-center p-10">No reviews found.</div>;
//   }

//   // Determine which reviews to display based on screen size and load state
//   const reviewsToShowMobile = allReviews.slice(0, visibleReviewsCount);
//   const hasMoreReviews = visibleReviewsCount < allReviews.length;

//   // --- Render Component ---
//   return (
//     <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//       <div className="container mx-auto px-4">
//         {/* Header Section (No Changes) */}
//         <div className="space-y-4 text-center md:text-left">
//           <div className="inline-block px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
//             <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
//               Genuine Customer Reviews
//             </span>
//           </div>
//           <h1 className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase">
//             Honest Reviews{" "}
//             <span className="text-primary">Real Travelers Like You</span>
//           </h1>
//           <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base pb-10">
//             Discover what real travelers have to say about their experiences
//             with our currency exchange services. From frequent flyers to
//             first-time tourists, our customers share honest feedback about fast,
//             reliable, and secure transactions.
//           </p>
//         </div>

//         {/* Conditional Rendering: Mobile vs Desktop */}
//         {isMobile ? (
//           // --- Mobile View (Single Column with Load More) ---
//           <div className="flex flex-col items-center gap-5">
//             <motion.div
//               className="w-full space-y-5"
//               // AnimatePresence helps manage entering/exiting items if needed,
//               // though here we are just adding items.
//               // Apply stagger to the container for initial load animation
//               variants={columnContainerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {/* Use AnimatePresence if you want exit animations when items are removed (not typical for load more) */}
//               {/* <AnimatePresence> */}
//                 {reviewsToShowMobile.map((review) => (
//                   <motion.div
//                     key={review.id} // Use the unique review ID
//                     variants={cardVariants}
//                      // Apply layout prop for smoother additions/removals if using AnimatePresence heavily
//                     layout="position"
//                      // Initial/animate are inherited from parent for stagger,
//                      // but defining here ensures they animate individually if parent isn't staggering
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit" // Define exit animation if using AnimatePresence
//                   >
//                     <ReviewCard {...review} />
//                   </motion.div>
//                 ))}
//               {/* </AnimatePresence> */}
//             </motion.div>

//             {/* Loading Indicator */}
//             {isLoadingMore && <LoadingDots />}

//             {/* Load More Button */}
//             {!isLoadingMore && hasMoreReviews && (
//               <motion.button
//                 onClick={loadMoreReviews}
//                 className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition-colors duration-200"
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Load More Reviews
//               </motion.button>
//             )}
//           </div>
//         ) : (
//           // --- Desktop View (Grid with Column Animation) ---
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
//             {reviewGroups.map((group, index) => (
//               <div
//                 key={group.id}
//                 className={`marquee-column marquee-column-${index + 1}`} // Keep class if needed for other JS/CSS
//                 ref={(el) => {
//                   columnRefs.current[index] = el;
//                 }}
//               >
//                 {group.reviews && group.reviews.length > 0 ? (
//                   <motion.div
//                     className="marquee-content space-y-5"
//                     variants={columnContainerVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.1 }}
//                   >
//                     {group.reviews.map((review, reviewIndex) => (
//                        // Add unique key here as well
//                       <motion.div
//                         key={`${group.id}-card-${reviewIndex}`}
//                         variants={cardVariants}
//                         className="h-full"
//                       >
//                         {/* Pass down review props, ensure unique keys within group map */}
//                         <ReviewCard
//                             reviewerName={review.reviewerName}
//                             avatarUrl={review.avatarUrl}
//                             rating={review.rating}
//                             comment={review.comment}
//                          />
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 ) : (
//                   <div className="text-center p-4 text-gray-500">
//                     No reviews in this group.
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// --- Constants ---
const MOBILE_BREAKPOINT = 768;
const REVIEWS_PER_PAGE_MOBILE = 6;
const LOAD_MORE_DELAY_MS = 750;

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
          key={i}
          className="inline-block text-[#FBBF24] dark:text-white"
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className="inline-block text-[#FBBF24] dark:text-white"
        />
      );
    } else {
      stars.push(
        <FaStar
          key={i}
          className="inline-block text-gray-300 dark:text-gray-600"
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
    <div className="bg-lightgray dark:bg-primarybox rounded-2xl lg:p-6 p-4 flex flex-col items-start shadow-sm h-full">
      <div className="flex items-center gap-4 w-full">
        <img
          src={avatarUrl}
          alt={`Avatar of ${reviewerName}`}
          className="lg:size-16 size-14 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex flex-col items-start">
          <div className="text-neutral-900 lg:text-lg text-base capitalize dark:text-primary font-medium text-nowrap">
            {reviewerName}
          </div>
          <StarRating rating={rating} />
        </div>
      </div>
      <div className="text-gray-500 dark:text-gray-300 lg:text-lg text-base mt-5 flex-grow">
        {comment}
      </div>
    </div>
  );
};

// --- Loading Dots Component (No changes needed) ---
const LoadingDots: React.FC = () => (
  <div className="flex justify-center items-center space-x-1.5 py-4">
    <motion.div
      className="size-2.5 bg-primary dark:bg-white rounded-full"
      animate={{ y: ["0rem", "-0.4rem", "0rem"] }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0,
      }}
    />
    <motion.div
      className="size-2.5 bg-primary dark:bg-white rounded-full"
      animate={{ y: ["0rem", "-0.4rem", "0rem"] }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }}
    />
    <motion.div
      className="size-2.5 bg-primary dark:bg-white rounded-full"
      animate={{ y: ["0rem", "-0.4rem", "0rem"] }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      }}
    />
  </div>
);

// --- Types for review data (No changes needed) ---
interface Review {
  id: string | number;
  reviewerName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
}

interface ReviewGroup {
  id: string | number;
  reviews: Omit<Review, "id">[];
}

interface ReviewJson {
  reviewGroups: ReviewGroup[];
}

// --- ReviewCards Component ---
const ReviewCards: React.FC = () => {
  const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(
    REVIEWS_PER_PAGE_MOBILE
  );
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  // --- Flatten reviews ---
  const allReviews = useMemo(() => {
    let flatReviews: Review[] = [];
    reviewGroups.forEach((group, groupIndex) => {
      group.reviews.forEach((review, reviewIndex) => {
        flatReviews.push({
          ...review,
          id: `${group.id}-${groupIndex}-${reviewIndex}`,
        });
      });
    });
    return flatReviews;
  }, [reviewGroups]);

  // --- Fetch initial data ---
  useEffect(() => {
    const fetchReviews = async () => {
      setInitialLoading(true);
      setError(null);
      try {
        const response = await fetch("/Review.json");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: ReviewJson = await response.json();
        setReviewGroups(data.reviewGroups);
        columnRefs.current = Array(data.reviewGroups.length).fill(null);
      } catch (err: any) {
        console.error("Failed to fetch reviews:", err);
        setError(err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // --- Detect mobile screen size ---
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // --- Framer Motion Variants ---

  // Variants for the HEADER section container (to stagger children)
  const headerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2, // Small delay before the first item starts
        staggerChildren: 0.2, // Delay between each child animation (badge, h1, p)
      },
    },
  };

  // Variants for INDIVIDUAL header items (badge, h1, p)
  const headerItemVariants = {
    hidden: { opacity: 0, y: 25 }, // Start transparent and slightly lower
    visible: {
      opacity: 1,
      y: 0, // Animate to full opacity and original y position
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Variants for review card columns/container (Desktop)
  const columnContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.1 },
    },
  };

  // Variants for individual review cards (Mobile & Desktop)
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: {
      // For AnimatePresence
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  // --- Load more reviews function ---
  const loadMoreReviews = useCallback(() => {
    if (isLoadingMore || visibleReviewsCount >= allReviews.length) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleReviewsCount((prevCount) =>
        Math.min(prevCount + REVIEWS_PER_PAGE_MOBILE, allReviews.length)
      );
      setIsLoadingMore(false);
    }, LOAD_MORE_DELAY_MS);
  }, [isLoadingMore, visibleReviewsCount, allReviews.length]);

  // --- Intersection Observer for mobile auto-load ---
  useEffect(() => {
    if (!isMobile || initialLoading || allReviews.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMoreReviews();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);
    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
      observer.disconnect();
    };
  }, [
    isMobile,
    initialLoading,
    isLoadingMore,
    loadMoreReviews,
    allReviews.length,
  ]);

  // --- Loading and Error States ---
  if (initialLoading && reviewGroups.length === 0) {
    return <div className="text-center p-10">Loading reviews...</div>;
  }
  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        Error loading reviews: {error.message}
      </div>
    );
  }
  if (!initialLoading && reviewGroups.length === 0 && !error) {
    return <div className="text-center p-10">No reviews found.</div>;
  }

  const reviewsToShowMobile = allReviews.slice(0, visibleReviewsCount);
  const hasMoreReviews = visibleReviewsCount < allReviews.length;

  // --- Render Component ---
  return (
    <section className="Reviews md:pt-14 pt-10 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* === Animated Header Section === */}
        <motion.div // Parent container for staggering header items
          className="space-y-4 text-center md:text-left"
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible" // Trigger animation when this div scrolls into view
          viewport={{ once: true, amount: 0.2 }} // Trigger once, when 20% is visible
        >
          {/* Animated Badge */}
          <motion.div // Apply item variants to the wrapper div of the badge
            className="inline-block" // Keep inline-block for layout
            variants={headerItemVariants}
            // No need for initial/animate here, inherited from parent
          >
            <div className="px-4 py-1.5 bg-lightgray dark:bg-primarybox rounded-full">
              <span className="text-neutral-900 dark:text-white font-medium text-sm capitalize">
                Genuine Customer Reviews
              </span>
            </div>
          </motion.div>

          {/* Animated Heading */}
          <motion.h1 // Apply item variants directly to h1
            className="text-3xl md:text-4xl xl:text-6xl font-black text-mainheading dark:text-white uppercase"
            variants={headerItemVariants}
          >
            Honest Reviews{" "}
            <span className="text-primary">Real Travelers Like You</span>
          </motion.h1>

          {/* Animated Paragraph */}
          <motion.p // Apply item variants directly to p
            className="text-gray-500 dark:text-gray-300 lg:text-lg text-base pb-10"
            variants={headerItemVariants}
          >
            Discover what real travelers have to say about their experiences
            with our currency exchange services. From frequent flyers to
            first-time tourists, our customers share honest feedback about fast,
            reliable, and secure transactions.
          </motion.p>
        </motion.div>
        {/* === End Animated Header Section === */}

        {/* Conditional Rendering: Mobile vs Desktop */}
        {isMobile ? (
          // --- Mobile View (Single Column with Auto Load More) ---
          <div className="flex flex-col items-center gap-5">
            <motion.div
              className="w-full space-y-5"
              // Using layout on the container might help if container size changes drastically
              // layout
            >
              <AnimatePresence initial={false}>
                {reviewsToShowMobile.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={cardVariants} // Use card variants for mobile too
                    layout="position"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ReviewCard {...review} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Sentinel Element */}
            {hasMoreReviews && (
              <div
                ref={sentinelRef}
                style={{ height: "10px" }}
                aria-hidden="true"
              />
            )}

            {/* Loading Indicator */}
            <AnimatePresence>
              {isLoadingMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoadingDots />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // --- Desktop View (Grid with Column Animation) ---
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
            {reviewGroups.map((group, index) => (
              <div
                key={group.id}
                className={`marquee-column marquee-column-${index + 1}`}
                ref={(el) => {
                  columnRefs.current[index] = el;
                }}
              >
                {group.reviews && group.reviews.length > 0 ? (
                  <motion.div
                    className="marquee-content space-y-5"
                    variants={columnContainerVariants} // Use column variants for desktop columns
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }} // Lower amount for columns
                  >
                    {group.reviews.map((review, reviewIndex) => (
                      <motion.div
                        key={`${group.id}-card-${reviewIndex}`}
                        variants={cardVariants} // Use card variants for cards inside columns
                        className="h-full" // Keep for layout consistency
                      >
                        <ReviewCard {...review} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center p-4 text-gray-500">
                    No reviews in this group.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewCards;
