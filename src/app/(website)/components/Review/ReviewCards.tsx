// "use client";
// import Image from "next/image";
// import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// // --- Constants ---
// const REVIEWS_PER_PAGE_MOBILE = 6;
// const LOAD_MORE_DELAY_MS = 750;
// // SKELETONS_DESKTOP and SKELETONS_TABLET are removed as Skeleton component is removed.
// // SKELETONS_MOBILE is effectively REVIEWS_PER_PAGE_MOBILE for initial count and load more increment.

// // --- StarRating Component (Original Styling) ---
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
//           className="inline-block text-primary"
//         />
//       );
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt
//           key={i}
//           className="inline-block text-primary"
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

// // --- ReviewCard Component (Original Styling) ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
//   DateAndTime : string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
//   DateAndTime,
// }) => {
//   return (
//     <div className="rounded-2xl border-gray-600/50 border lg:p-6 p-4 flex flex-col items-start shadow-sm h-full">
//       <div className="flex justify-between items-center gap-4 w-full">
//         <div className="flex items-center gap-3">
//           <img
//             src={avatarUrl}
//             alt={`Avatar of ${reviewerName}`}
//             className="lg:size-16 size-14 rounded-full object-cover flex-shrink-0"
//           />
//           <div className="flex flex-col items-start">
//             <div className="text-mainheadingWhite lg:text-lg text-base capitalize dark:text-primary font-medium">
//               {reviewerName}
//             </div>
//             <StarRating rating={rating} />
//           </div>
//         </div>

//         <div>
//           <Image
//             src="/assets/images/google.svg"
//             alt="logo"
//             height={50}
//             width={50}
//             className="size-10 object-cover"
//           />
//         </div>
//       </div>

//       <div className="text-subheadingWhite lg:text-lg text-base mt-5 flex-grow">
//         {comment}
//       </div>

//       <div className="text-subheadingWhite text-sm mt-5 font-medium capitalize">
//         <span>{DateAndTime}</span>
//       </div>
//     </div>
//   );
// };

// // LoadingDots and ReviewCardSkeleton components are removed.

// // --- Types for review data ---
// interface Review {
//   id: string;
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
//   location?: string;
// }

// interface ReviewGroup {
//   id: string | number;
//   reviews: Omit<Review, "id">[];
// }

// interface ReviewJson {
//   reviewGroups: ReviewGroup[];
// }

// // --- ReviewCards Component (Main Logic) ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [initialLoading, setInitialLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(
//     REVIEWS_PER_PAGE_MOBILE
//   );
//   const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
//   const sentinelRef = useRef<HTMLDivElement | null>(null);

//   const allReviews = useMemo(() => {
//     let flatReviews: Review[] = [];
//     reviewGroups.forEach((group, groupIndex) => {
//       group.reviews.forEach((review, reviewIndex) => {
//         flatReviews.push({
//           ...review,
//           id: `review-${group.id}-${groupIndex}-${reviewIndex}`,
//         });
//       });
//     });
//     return flatReviews;
//   }, [reviewGroups]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       setInitialLoading(true);
//       setError(null);
//       try {
//         // Simulate network delay for testing (optional)
//         // await new Promise(resolve => setTimeout(resolve, 2000));
//         const response = await fetch("/Review.json"); // Ensure this path is correct
//         if (!response.ok)
//           throw new Error(`HTTP error! status: ${response.status}`);
//         const data: ReviewJson = await response.json();
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err);
//       } finally {
//         setInitialLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   const loadMoreReviews = useCallback(() => {
//     if (isLoadingMore || visibleReviewsCount >= allReviews.length) return;
//     setIsLoadingMore(true);
//     setTimeout(() => {
//       setVisibleReviewsCount((prevCount) =>
//         Math.min(prevCount + REVIEWS_PER_PAGE_MOBILE, allReviews.length)
//       );
//       setIsLoadingMore(false);
//     }, LOAD_MORE_DELAY_MS);
//   }, [isLoadingMore, visibleReviewsCount, allReviews.length]);

//   useEffect(() => {
//     if (initialLoading || allReviews.length === 0 || !sentinelRef.current)
//       return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           !isLoadingMore &&
//           visibleReviewsCount < allReviews.length
//         ) {
//           const sentinelIsDisplayed =
//             window.getComputedStyle(entries[0].target).display !== "none";
//           if (sentinelIsDisplayed) {
//             loadMoreReviews();
//           }
//         }
//       },
//       { root: null, rootMargin: "0px 0px 200px 0px", threshold: 0.1 }
//     );
//     const currentSentinel = sentinelRef.current;
//     if (currentSentinel) observer.observe(currentSentinel);
//     return () => {
//       if (currentSentinel) observer.unobserve(currentSentinel);
//       observer.disconnect();
//     };
//   }, [
//     initialLoading,
//     isLoadingMore,
//     loadMoreReviews,
//     allReviews.length,
//     visibleReviewsCount,
//   ]);

//   const reviewsToShowMobile = useMemo(
//     () => allReviews.slice(0, visibleReviewsCount),
//     [allReviews, visibleReviewsCount]
//   );
//   const hasMoreReviewsMobile = visibleReviewsCount < allReviews.length;

//   const tabletLayoutColumns = useMemo(() => {
//     if (allReviews.length === 0) return [];
//     const columns: Review[][] = [[], []];
//     allReviews.forEach((review, index) => {
//       columns[index % 2].push(review);
//     });
//     return columns;
//   }, [allReviews]);

//   const desktopLayoutColumns = useMemo(() => {
//     if (allReviews.length === 0) return [];
//     const columns: Review[][] = [[], [], []];
//     allReviews.forEach((review, index) => {
//       columns[index % 3].push(review);
//     });
//     return columns;
//   }, [allReviews]);

//   const renderHeader = () => (
//     <div className="space-y-4 text-center md:text-left mb-10">
//       <div className="inline-block">
//         <span className="text-subheadingWhite font-medium text-sm uppercase">
//           <span className="text-subheadingWhite/30">[</span> Ours Reviews{" "}
//           <span className="text-subheadingWhite/30">]</span>
//         </span>
//       </div>

//       <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//         <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//           Honest Reviews,{" "}
//           <span className="text-primary">Real Travelers Like You</span>
//         </h2>

//         <p className="text-subheadingWhite md:text-lg text-base max-w-5xl">
//           Discover what real travelers have to say about their experiences with
//           our currency exchange services. From frequent flyers to first-time
//           tourists, our customers share honest feedback about fast, reliable,
//           and secure transactions.
//         </p>
//       </div>

//     </div>
//   );

//   if (initialLoading && allReviews.length === 0) {
//     return (
//       <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//         <div className="container mx-auto px-4">
//           {renderHeader()}
//           <div className="text-center py-10 mt-5">
//             <p className="text-lg text-neutral-700 dark:text-gray-300">
//               Loading reviews...
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//         <div className="container mx-auto px-4">
//           {renderHeader()}
//           <div className="mt-10 text-center p-6 md:p-10 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-md">
//             <h3 className="text-xl md:text-2xl font-semibold text-red-700 dark:text-red-400 mb-3">
//               Oops! Something Went Wrong
//             </h3>
//             <p className="text-red-600 dark:text-red-300 mb-1">
//               We couldn't load the reviews at this time. Please try again later.
//             </p>
//             <p className="mt-2 text-sm text-red-500 dark:text-red-400">
//               Error details: {error.message}
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!initialLoading && allReviews.length === 0 && !error) {
//     return (
//       <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//         <div className="container mx-auto px-4">
//           {renderHeader()}
//           <div className="text-center p-10 mt-10 bg-lightgray dark:bg-primarybox rounded-lg">
//             <p className="text-lg text-neutral-700 dark:text-gray-300">
//               No reviews found. Be the first to share your experience!
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//       <div className="container mx-auto px-4">
//         {renderHeader()}

//         {/* --- Mobile View: 1 Column --- */}
//         <div className="block md:hidden mt-5">
//           <div className="flex flex-col items-center gap-5">
//             <div className="w-full space-y-5">
//               {reviewsToShowMobile.map((review) => (
//                 <div key={review.id}>
//                   <ReviewCard {...review} />
//                 </div>
//               ))}
//             </div>
//             {hasMoreReviewsMobile && (
//               <div
//                 ref={sentinelRef}
//                 style={{ height: "1px" }}
//                 aria-hidden="true"
//               />
//             )}
//             {isLoadingMore && (
//               <div className="w-full text-center py-4">
//                 <p className="text-primary dark:text-white">
//                   Loading more reviews...
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* --- Tablet View: 2 Columns --- */}
//         <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-5 mt-5">
//           {tabletLayoutColumns.map((columnReviews, colIndex) => (
//             <div
//               key={`tablet-col-${colIndex}`}
//               className="space-y-5 flex flex-col"
//             >
//               {columnReviews.map((review) => (
//                 <div key={review.id} className="h-full">
//                   <ReviewCard {...review} />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* --- Desktop View: 3 Columns --- */}
//         <div className="hidden lg:grid lg:grid-cols-3 gap-5 mt-5">
//           {desktopLayoutColumns.map((columnReviews, colIndex) => (
//             <div
//               key={`desktop-col-${colIndex}`}
//               className="space-y-5 flex flex-col"
//             >
//               {columnReviews.map((review) => (
//                 <div key={review.id} className="h-full">
//                   <ReviewCard {...review} />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewCards;

// "use client";
// import Image from "next/image";
// import { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// // --- Constants ---
// const REVIEWS_PER_PAGE_MOBILE = 6;
// const LOAD_MORE_DELAY_MS = 750;

// // --- StarRating Component (Original Styling) ---
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
//       stars.push(<FaStar key={i} className="inline-block text-yellow-500" />);
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt key={i} className="inline-block text-yellow-500" />
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
//   return <div className="inline-block space-x-[1px]">{stars}</div>;
// };

// // --- ReviewCard Component (Original Styling) ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
//   DateAndTime: string; // This prop is required
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
//   DateAndTime,
// }) => {
//   return (
//     <>
//       <div className="rounded-2xl bg-primary-foreground border border-gray-600/50 lg:p-6 p-4 flex flex-col sm:items-start items-end">
//         <div className="flex justify-between items-center gap-4 w-full">
//           <div className="flex items-center gap-3">
//             <img
//               src={avatarUrl}
//               alt={`Avatar of ${reviewerName}`}
//               className="lg:size-16 size-14 rounded-full object-cover flex-shrink-0"
//             />
//             <div className="flex flex-col items-start">
//               <div className="text-mainheadingWhite lg:text-lg text-base capitalize dark:text-primary font-medium">
//                 {reviewerName}
//               </div>
//               <StarRating rating={rating} />
//             </div>
//           </div>

//           <div className="flex gap-1.5 flex-shrink-0">
//             <Image
//               src="/assets/images/twitters.png"
//               alt="logo"
//               height={50}
//               width={50}
//               className="size-6 object-cover"
//             />
//           </div>
//         </div>

//         <div className="text-subheadingWhite lg:text-lg text-base mt-5">
//           {comment}
//         </div>

//         <div className="mt-5">
//           <span className="text-subheadingWhite text-sm font-medium capitalize">{DateAndTime}</span>
//         </div>
//       </div>
//     </>
//   );
// };

// // --- Types for review data ---
// interface Review {
//   id: string;
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
//   DateAndTime: string; // FIX: Added DateAndTime to the Review interface
//   location?: string;
// }

// interface ReviewGroup {
//   id: string | number;
//   // Omit<Review, "id"> will now correctly include DateAndTime
//   reviews: Omit<Review, "id">[];
// }

// interface ReviewJson {
//   reviewGroups: ReviewGroup[];
// }

// // --- ReviewCards Component (Main Logic) ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [initialLoading, setInitialLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(
//     REVIEWS_PER_PAGE_MOBILE
//   );
//   const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
//   const sentinelRef = useRef<HTMLDivElement | null>(null);

//   const allReviews = useMemo(() => {
//     let flatReviews: Review[] = [];
//     reviewGroups.forEach((group, groupIndex) => {
//       group.reviews.forEach((review, reviewIndex) => {
//         // 'review' (of type Omit<Review, "id">) now includes DateAndTime
//         // So, when spread, it will be available for the ReviewCard
//         flatReviews.push({
//           ...review,
//           id: `review-${group.id}-${groupIndex}-${reviewIndex}`,
//         });
//       });
//     });
//     return flatReviews;
//   }, [reviewGroups]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       setInitialLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("/Review.json"); // Ensure Review.json contains DateAndTime field for each review
//         if (!response.ok)
//           throw new Error(`HTTP error! status: ${response.status}`);
//         const data: ReviewJson = await response.json();
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err);
//       } finally {
//         setInitialLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   const loadMoreReviews = useCallback(() => {
//     if (isLoadingMore || visibleReviewsCount >= allReviews.length) return;
//     setIsLoadingMore(true);
//     setTimeout(() => {
//       setVisibleReviewsCount((prevCount) =>
//         Math.min(prevCount + REVIEWS_PER_PAGE_MOBILE, allReviews.length)
//       );
//       setIsLoadingMore(false);
//     }, LOAD_MORE_DELAY_MS);
//   }, [isLoadingMore, visibleReviewsCount, allReviews.length]);

//   useEffect(() => {
//     if (initialLoading || allReviews.length === 0 || !sentinelRef.current)
//       return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           entries[0].isIntersecting &&
//           !isLoadingMore &&
//           visibleReviewsCount < allReviews.length
//         ) {
//           const sentinelIsDisplayed =
//             window.getComputedStyle(entries[0].target).display !== "none";
//           if (sentinelIsDisplayed) {
//             loadMoreReviews();
//           }
//         }
//       },
//       { root: null, rootMargin: "0px 0px 200px 0px", threshold: 0.1 }
//     );
//     const currentSentinel = sentinelRef.current;
//     if (currentSentinel) observer.observe(currentSentinel);
//     return () => {
//       if (currentSentinel) observer.unobserve(currentSentinel);
//       observer.disconnect();
//     };
//   }, [
//     initialLoading,
//     isLoadingMore,
//     loadMoreReviews,
//     allReviews.length,
//     visibleReviewsCount,
//   ]);

//   const reviewsToShowMobile = useMemo(
//     () => allReviews.slice(0, visibleReviewsCount),
//     [allReviews, visibleReviewsCount]
//   );
//   const hasMoreReviewsMobile = visibleReviewsCount < allReviews.length;

//   const tabletLayoutColumns = useMemo(() => {
//     if (allReviews.length === 0) return [];
//     const columns: Review[][] = [[], []];
//     allReviews.forEach((review, index) => {
//       columns[index % 2].push(review);
//     });
//     return columns;
//   }, [allReviews]);

//   const desktopLayoutColumns = useMemo(() => {
//     if (allReviews.length === 0) return [];
//     const columns: Review[][] = [[], [], []];
//     allReviews.forEach((review, index) => {
//       columns[index % 3].push(review);
//     });
//     return columns;
//   }, [allReviews]);

//   const renderHeader = () => (
//     <div className="space-y-4 text-center md:text-left mb-10">
//       <div className="inline-block">
//         <span className="text-subheadingWhite font-medium text-sm uppercase">
//           <span className="text-subheadingWhite/30">[</span> Ours Reviews{" "}
//           <span className="text-subheadingWhite/30">]</span>
//         </span>
//       </div>

//       <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//         <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//           Honest Reviews,{" "}
//           <span className="text-primary">Real Travelers Like You</span>
//         </h2>

//         <p className="text-subheadingWhite md:text-lg text-base max-w-5xl">
//           Discover what real travelers have to say about their experiences with
//           our currency exchange services. From frequent flyers to first-time
//           tourists, our customers share honest feedback about fast, reliable,
//           and secure transactions.
//         </p>
//       </div>
//     </div>
//   );

//   if (initialLoading && allReviews.length === 0) {
//     return (
//       <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//         <div className="container mx-auto px-4">
//           {renderHeader()}
//           <div className="text-center py-10 mt-5">
//             <p className="text-lg text-neutral-700 dark:text-gray-300">
//               Loading reviews...
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//         <div className="container mx-auto px-4">
//           {renderHeader()}
//           <div className="mt-10 text-center p-6 md:p-10 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-md">
//             <h3 className="text-xl md:text-2xl font-semibold text-red-700 dark:text-red-400 mb-3">
//               Oops! Something Went Wrong
//             </h3>
//             <p className="text-red-600 dark:text-red-300 mb-1">
//               We couldn't load the reviews at this time. Please try again later.
//             </p>
//             <p className="mt-2 text-sm text-red-500 dark:text-red-400">
//               Error details: {error.message}
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!initialLoading && allReviews.length === 0 && !error) {
//     return (
//       <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//         <div className="container mx-auto px-4">
//           {renderHeader()}
//           <div className="text-center p-10 mt-10 bg-lightgray dark:bg-primarybox rounded-lg">
//             <p className="text-lg text-neutral-700 dark:text-gray-300">
//               No reviews found. Be the first to share your experience!
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Reviews md:pt-14 pt-10 overflow-hidden relative">
//       <div className="container mx-auto px-4 ">
//         {renderHeader()}

//         {/* --- Mobile View: 1 Column --- */}
//         <div className="block md:hidden mt-5">
//           <div className="flex flex-col items-center gap-5">
//             <div className="w-full space-y-5">
//               {reviewsToShowMobile.map((review) => (
//                 <div key={review.id}>
//                   <ReviewCard {...review} />
//                 </div>
//               ))}
//             </div>
//             {hasMoreReviewsMobile && (
//               <div
//                 ref={sentinelRef}
//                 style={{ height: "1px" }}
//                 aria-hidden="true"
//               />
//             )}
//             {isLoadingMore && (
//               <div className="w-full text-center py-4">
//                 <p className="text-primary dark:text-white">
//                   Loading more reviews...
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* --- Tablet View: 2 Columns --- */}
//         <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-5 mt-5">
//           {tabletLayoutColumns.map((columnReviews, colIndex) => (
//             <div
//               key={`tablet-col-${colIndex}`}
//               className="space-y-5 flex flex-col"
//             >
//               {columnReviews.map((review) => (
//                 <div key={review.id} className="">
//                   <ReviewCard {...review} />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* --- Desktop View: 3 Columns --- */}
//         <div className="hidden lg:grid lg:grid-cols-3 gap-5 mt-5">
//           {desktopLayoutColumns.map((columnReviews, colIndex) => (
//             <div
//               key={`desktop-col-${colIndex}`}
//               className="space-y-5 flex flex-col"
//             >
//               {columnReviews.map((review) => (
//                 <div key={review.id} className="">
//                   <ReviewCard {...review} />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* gradient-color */}
//       <div className="absolute bottom-0 sm:h-1/3 h-96 bg-gradient-to-t from-[#22282a]/100 w-full">
//       </div>

//     </section>
//   );
// };

// export default ReviewCards;

// "use client";
// import Image from "next/image";
// import { useState, useEffect, useMemo } from "react"; // Removed useRef, useCallback as they were for infinite scroll
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// // --- Constants ---
// const INITIAL_REVIEWS_COUNT = 6; // Number of reviews to show initially

// // --- StarRating Component (Original Styling) ---
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
//       stars.push(<FaStar key={i} className="inline-block text-yellow-500" />);
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt key={i} className="inline-block text-yellow-500" />
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
//   return <div className="inline-block space-x-[1px]">{stars}</div>;
// };

// // --- ReviewCard Component (Original Styling) ---
// interface ReviewCardProps {
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
//   DateAndTime: string;
// }

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   reviewerName,
//   avatarUrl,
//   rating,
//   comment,
//   DateAndTime,
// }) => {
//   return (
//     <>
//       <div className="rounded-2xl bg-primary-foreground border border-gray-600/50 lg:p-6 p-4 flex flex-col sm:items-start items-end h-full">
//         {" "}
//         {/* Added h-full for consistent card height in columns */}
//         <div className="flex justify-between items-center gap-4 w-full">
//           <div className="flex items-center gap-3">
//             <img
//               src={avatarUrl}
//               alt={`Avatar of ${reviewerName}`}
//               className="lg:size-16 size-14 rounded-full object-cover flex-shrink-0"
//             />
//             <div className="flex flex-col items-start">
//               <div className="text-mainheadingWhite lg:text-lg text-base capitalize dark:text-primary font-medium">
//                 {reviewerName}
//               </div>
//               <StarRating rating={rating} />
//             </div>
//           </div>

//           <div className="flex gap-1.5 flex-shrink-0">
//             <Image
//               src="/assets/images/twitters.png"
//               alt="logo"
//               height={50}
//               width={50}
//               className="size-6 object-cover"
//             />
//           </div>
//         </div>
//         <div className="text-subheadingWhite lg:text-lg text-base mt-5 flex-grow">
//           {" "}
//           {/* Added flex-grow to push date to bottom */}
//           {comment}
//         </div>
//         <div className="mt-5">
//           <span className="text-subheadingWhite text-sm font-medium capitalize">
//             {DateAndTime}
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };

// // --- Types for review data ---
// interface Review {
//   id: string;
//   reviewerName: string;
//   avatarUrl: string;
//   rating: number;
//   comment: string;
//   DateAndTime: string;
//   location?: string;
// }

// interface ReviewGroup {
//   id: string | number;
//   reviews: Omit<Review, "id">[];
// }

// interface ReviewJson {
//   reviewGroups: ReviewGroup[];
// }

// // --- ReviewCards Component (Main Logic) ---
// const ReviewCards: React.FC = () => {
//   const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
//   const [initialLoading, setInitialLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

//   const allReviews = useMemo(() => {
//     let flatReviews: Review[] = [];
//     reviewGroups.forEach((group, groupIndex) => {
//       group.reviews.forEach((review, reviewIndex) => {
//         flatReviews.push({
//           ...review,
//           id: `review-${group.id}-${groupIndex}-${reviewIndex}`,
//         });
//       });
//     });
//     return flatReviews;
//   }, [reviewGroups]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       setInitialLoading(true);
//       setError(null);
//       try {
//         const response = await fetch("/Review.json");
//         if (!response.ok)
//           throw new Error(`HTTP error! status: ${response.status}`);
//         const data: ReviewJson = await response.json();
//         setReviewGroups(data.reviewGroups);
//       } catch (err: any) {
//         console.error("Failed to fetch reviews:", err);
//         setError(err);
//       } finally {
//         setInitialLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   const reviewsToDisplay = useMemo(() => {
//     if (
//       showAllReviews ||
//       !allReviews ||
//       allReviews.length <= INITIAL_REVIEWS_COUNT
//     ) {
//       return allReviews;
//     }
//     return allReviews.slice(0, INITIAL_REVIEWS_COUNT);
//   }, [allReviews, showAllReviews]);

//   const tabletLayoutColumns = useMemo(() => {
//     if (!reviewsToDisplay || reviewsToDisplay.length === 0) return [];
//     const columns: Review[][] = [[], []];
//     reviewsToDisplay.forEach((review, index) => {
//       columns[index % 2].push(review);
//     });
//     return columns;
//   }, [reviewsToDisplay]);

//   const desktopLayoutColumns = useMemo(() => {
//     if (!reviewsToDisplay || reviewsToDisplay.length === 0) return [];
//     const columns: Review[][] = [[], [], []];
//     reviewsToDisplay.forEach((review, index) => {
//       columns[index % 3].push(review);
//     });
//     return columns;
//   }, [reviewsToDisplay]);

//   const renderHeader = () => (
//     <div className="space-y-4 text-center md:text-left mb-10">
//       <div className="inline-block">
//         <span className="text-subheadingWhite font-medium text-sm uppercase">
//           <span className="text-subheadingWhite/30">[</span> Ours Reviews{" "}
//           <span className="text-subheadingWhite/30">]</span>
//         </span>
//       </div>
//       <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//         <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
//           Honest Reviews,{" "}
//           <span className="text-primary">Real Travelers Like You</span>
//         </h2>
//         <p className="text-subheadingWhite md:text-lg text-base max-w-5xl">
//           Discover what real travelers have to say about their experiences with
//           our currency exchange services. From frequent flyers to first-time
//           tourists, our customers share honest feedback about fast, reliable,
//           and secure transactions.
//         </p>
//       </div>
//     </div>
//   );

//   if (initialLoading && allReviews.length === 0) {
//     return (
//       <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//         <div className="container mx-auto px-4">
//           {renderHeader()}
//           <div className="text-center py-10 mt-5">
//             <p className="text-lg text-neutral-700 dark:text-gray-300">
//               Loading reviews...
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//         <div className="container mx-auto px-4">
//           {renderHeader()}
//           <div className="mt-10 text-center p-6 md:p-10 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-md">
//             <h3 className="text-xl md:text-2xl font-semibold text-red-700 dark:text-red-400 mb-3">
//               Oops! Something Went Wrong
//             </h3>
//             <p className="text-red-600 dark:text-red-300 mb-1">
//               We couldn't load the reviews at this time. Please try again later.
//             </p>
//             <p className="mt-2 text-sm text-red-500 dark:text-red-400">
//               Error details: {error.message}
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!initialLoading && allReviews.length === 0 && !error) {
//     return (
//       <section className="Reviews md:pt-14 pt-10 overflow-hidden">
//         <div className="container mx-auto px-4">
//           {renderHeader()}
//           <div className="text-center p-10 mt-10 bg-lightgray dark:bg-primarybox rounded-lg">
//             <p className="text-lg text-neutral-700 dark:text-gray-300">
//               No reviews found. Be the first to share your experience!
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="Reviews md:pt-14 pt-10 overflow-hidden relative pb-10 sm:pb-16">
//       {" "}
//       {/* Added padding-bottom */}
//       <div className="container mx-auto px-4">
//         {renderHeader()}

//         {/* --- Mobile View: 1 Column --- */}
//         <div className="block md:hidden mt-5">
//           <div className="flex flex-col items-center gap-5">
//             <div className="w-full space-y-5">
//               {reviewsToDisplay.map((review) => (
//                 <div key={review.id}>
//                   <ReviewCard {...review} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* --- Tablet View: 2 Columns --- */}
//         <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-5 mt-5">
//           {tabletLayoutColumns.map((columnReviews, colIndex) => (
//             <div
//               key={`tablet-col-${colIndex}`}
//               className="space-y-5 flex flex-col"
//             >
//               {columnReviews.map((review) => (
//                 <div key={review.id} className="">
//                   {" "}
//                   {/* Added h-full for consistent card height */}
//                   <ReviewCard {...review} />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* --- Desktop View: 3 Columns --- */}
//         <div className="hidden lg:grid lg:grid-cols-3 gap-5 mt-5">
//           {desktopLayoutColumns.map((columnReviews, colIndex) => (
//             <div
//               key={`desktop-col-${colIndex}`}
//               className="space-y-5 flex flex-col"
//             >
//               {columnReviews.map((review) => (
//                 <div key={review.id} className="">
//                   {" "}
//                   {/* Added h-full for consistent card height */}
//                   <ReviewCard {...review} />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* "Read More" Button */}
//         {allReviews &&
//           allReviews.length > INITIAL_REVIEWS_COUNT &&
//           !showAllReviews && (
//             <div className="text-center relative z-10">
//               {" "}
//               {/* Ensure button is above gradient */}
//               <button
//                 onClick={() => setShowAllReviews(true)}
//                 className="border border-gray-700/50 hover:border-gray-600/50 text-subheadingWhite cursor-pointer font-semibold py-3 px-8 rounded-full transition-all ease-linear duration-75"
//               >
//                 Read More
//               </button>
//             </div>
//           )}
//       </div>

//       {/* Conditional Gradient Overlay */}
//       {allReviews &&
//         allReviews.length > INITIAL_REVIEWS_COUNT &&
//         !showAllReviews && (
//           <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#22282a]/100 pointer-events-none w-full z-0"></div>
//         )}
//     </section>
//   );
// };

// export default ReviewCards;




"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

// --- Constants ---
const INITIAL_REVIEWS_COUNT = 6; // Number of reviews to show initially and to load on "Read More"

// --- StarRating Component (Original Styling) ---
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
      stars.push(<FaStar key={i} className="inline-block text-yellow-500" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key={i} className="inline-block text-yellow-500" />
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
  return <div className="inline-block space-x-[1px]">{stars}</div>;
};

// --- ReviewCard Component (Original Styling) ---
interface ReviewCardProps {
  reviewerName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  DateAndTime: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  avatarUrl,
  rating,
  comment,
  DateAndTime,
}) => {
  return (
    // No motion.div here, it will be applied by the parent rendering this card
    <div className="rounded-2xl bg-primary-foreground border border-gray-600/50 lg:p-6 p-4 flex flex-col sm:items-start items-end h-full">
      <div className="flex justify-between items-center gap-4 w-full">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl} // Assuming avatarUrl is a correct path e.g., /assets/images/Tom.jpg
            alt={`Avatar of ${reviewerName}`}
            className="lg:size-16 size-14 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex flex-col items-start">
            <div className="text-mainheadingWhite lg:text-lg text-base capitalize dark:text-primary font-medium">
              {reviewerName}
            </div>
            <StarRating rating={rating} />
          </div>
        </div>

        <div className="flex gap-1.5 flex-shrink-0">
          <Image
            src="/assets/images/twitters.png" // Assuming this path is correct from public folder
            alt="logo"
            height={50}
            width={50}
            className="size-6 object-cover"
          />
        </div>
      </div>
      <div className="text-subheadingWhite lg:text-lg text-base mt-5 flex-grow">
        {comment}
      </div>
      <div className="mt-5">
        <span className="text-subheadingWhite text-sm font-medium capitalize">
          {DateAndTime}
        </span>
      </div>
    </div>
  );
};

// --- Types for review data ---
interface Review {
  id: string;
  reviewerName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  DateAndTime: string;
  location?: string;
}

interface ReviewGroup {
  id: string | number;
  reviews: Omit<Review, "id">[];
}

interface ReviewJson {
  reviewGroups: ReviewGroup[];
}

// --- Animation Variants ---
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.10, // Stagger children by 0.1s
      delayChildren: 0.2, // Delay before children start animating
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// --- ReviewCards Component (Main Logic with Load More & Animation) ---
const ReviewCards: React.FC = () => {
  const [reviewGroups, setReviewGroups] = useState<ReviewGroup[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [numVisibleReviews, setNumVisibleReviews] = useState<number>(
    INITIAL_REVIEWS_COUNT
  );

  const allReviews = useMemo(() => {
    let flatReviews: Review[] = [];
    reviewGroups.forEach((group, groupIndex) => {
      group.reviews.forEach((review, reviewIndex) => {
        flatReviews.push({
          ...review,
          id: `review-${group.id}-${groupIndex}-${reviewIndex}`, // Ensure unique ID for keys
        });
      });
    });
    return flatReviews;
  }, [reviewGroups]);

  useEffect(() => {
    const fetchReviews = async () => {
      setInitialLoading(true);
      setError(null);
      try {
        const response = await fetch("/Review.json"); // Assuming Review.json is in the public folder
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: ReviewJson = await response.json();
        setReviewGroups(data.reviewGroups);
      } catch (err: any) {
        console.error("Failed to fetch reviews:", err);
        setError(err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const reviewsToDisplay = useMemo(() => {
    if (!allReviews) return [];
    return allReviews.slice(0, numVisibleReviews);
  }, [allReviews, numVisibleReviews]);

  const tabletLayoutColumns = useMemo(() => {
    if (!reviewsToDisplay || reviewsToDisplay.length === 0) return [];
    const columns: Review[][] = [[], []];
    reviewsToDisplay.forEach((review, index) => {
      columns[index % 2].push(review);
    });
    return columns;
  }, [reviewsToDisplay]);

  const desktopLayoutColumns = useMemo(() => {
    if (!reviewsToDisplay || reviewsToDisplay.length === 0) return [];
    const columns: Review[][] = [[], [], []];
    reviewsToDisplay.forEach((review, index) => {
      columns[index % 3].push(review);
    });
    return columns;
  }, [reviewsToDisplay]);

  const handleLoadMore = () => {
    setNumVisibleReviews((prevCount) =>
      Math.min(prevCount + INITIAL_REVIEWS_COUNT, allReviews.length)
    );
  };

  const canLoadMore = useMemo(() => {
    return allReviews && numVisibleReviews < allReviews.length;
  }, [allReviews, numVisibleReviews]);

  const renderHeader = () => (
    <div className="space-y-4 text-center md:text-left mb-10">
      <div className="inline-block">
        <span className="text-subheadingWhite font-medium text-sm uppercase">
          <span className="text-subheadingWhite/30">[</span> Ours Reviews{" "}
          <span className="text-subheadingWhite/30">]</span>
        </span>
      </div>
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-mainheadingWhite lg:max-w-3xl max-w-full">
          Honest Reviews,{" "}
          <span className="text-primary">Real Travelers Like You</span>
        </h2>
        <p className="text-subheadingWhite md:text-lg text-base lg:max-w-5xl max-w-full">
          Discover what real travelers have to say about their experiences with
          our currency exchange services. From frequent flyers to first-time
          tourists, our customers share honest feedback about fast, reliable,
          and secure transactions.
        </p>
      </div>
    </div>
  );

  if (error) {
    return (
      <section className="Reviews md:pt-14 pt-10 overflow-hidden">
        <div className="container mx-auto px-4">
          {renderHeader()}
          <div className="mt-10 text-center p-6 md:p-10 border border-red-500 bg-red-900/25 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold text-red-400 mb-3">
              Oops! Something Went Wrong
            </h3>
            <p className="text-red-500 mb-1">
              We couldn't load the reviews at this time. Please try again later.
            </p>
            <p className="mt-2 text-sm text-red-500">
              Error details: {error.message}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!initialLoading && allReviews.length === 0 && !error) {
    return (
      <section className="Reviews md:pt-14 pt-10 overflow-hidden">
        <div className="container mx-auto px-4">
          {renderHeader()}
          <div className="text-center p-10 mt-10 bg-lightgray dark:bg-primarybox rounded-lg">
            <p className="text-lg text-neutral-700 dark:text-gray-300">
              No reviews found. Be the first to share your experience!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="Reviews md:pt-14 pt-10 overflow-hidden relative pb-10 sm:pb-16">
      <div className="container mx-auto px-4">
        {renderHeader()}

        {/* --- Mobile View: 1 Column --- */}
        <div className="block md:hidden mt-5">
          <motion.div
            className="w-full space-y-5"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* AnimatePresence is useful if items can be removed. For additive lists, it's less critical but doesn't hurt. */}
            <AnimatePresence>
              {reviewsToDisplay.map((review) => (
                <motion.div key={review.id} variants={cardItemVariants} layout>
                  <ReviewCard {...review} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- Tablet View: 2 Columns --- */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-5 mt-5">
          {tabletLayoutColumns.map((columnReviews, colIndex) => (
            <motion.div
              key={`tablet-col-${colIndex}`}
              className="space-y-5 flex flex-col"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {columnReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={cardItemVariants}
                    layout
                  >
                    <ReviewCard {...review} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* --- Desktop View: 3 Columns --- */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5 mt-5">
          {desktopLayoutColumns.map((columnReviews, colIndex) => (
            <motion.div
              key={`desktop-col-${colIndex}`}
              className="space-y-5 flex flex-col"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {columnReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={cardItemVariants}
                    layout
                  >
                    <ReviewCard {...review} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* "Read More" Button */}
        {canLoadMore && (
          <div className="text-center relative z-10 mt-8">
            <button
              onClick={handleLoadMore}
              className="border border-gray-700/50 text-sm hover:border-gray-600/50 text-subheadingWhite cursor-pointer font-semibold py-3 px-10 rounded-full sm:-mt-10 mt-0 transition-all ease-linear duration-75"
            >
              Read More
            </button>
          </div>
        )}
      </div>

      {/* Conditional Gradient Overlay */}
      {canLoadMore && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 sm:h-1/3 h-96 bg-gradient-to-t from-[#22282a]/100 pointer-events-none w-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      )}
    </section>
  );
};

export default ReviewCards;
