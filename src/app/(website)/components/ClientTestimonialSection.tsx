// "use client"; // Required for Framer Motion

// import React from "react";

// const ClientTestimonialSection: React.FC = () => {
//   return (
//     <>
//       <section className="ClientTestimonialSection py-40">
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="wrpa relative">
//             <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent  via-white to-transparent"></div>
//             <div className="max-w-5xl mx-auto">
//               <div className="flex gap-10 relative">
//                   <div className="absolute -left-[2px] top-1/2 -translate-y-1/2 w-[2px] h-[700px] bg-gradient-to-t from-transparent  via-white to-transparent"></div>
//                   <div className="absolute left-[338px] top-1/2 w-[2px] -translate-y-1/2 h-[700px] bg-gradient-to-t from-transparent  via-white to-transparent"></div>
//                 <div className="w-[338px] relative">
//                   <div className="imags">
//                     <img src="/assets/images/John-Taylor.jpg" alt="" className="rounded-3xl" />
//                   </div>
//                 </div>
//                 <div className="w-[calc(100%-388px)]">
//                     <div className="content py-8 ps-8 h-full flex flex-col justify-between">
//                         <p className="text-3xl text-subheadingWhite font-medium">”I used this site to prepare for a backpacking trip through Southeast Asia. It was a major help.I could exchange small amounts for different currencies, all in one place. That flexibility is rare”</p>
//                         <div className="mt-5">
//                             <span className="text-primary text-xl font-semibold block">Sofia Vyas</span>
//                         </div>
//                     </div>
//                 </div>
//               </div>
//             </div>
//             <div className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent  via-white to-transparent"></div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ClientTestimonialSection;

// "use client"; // Required for Framer Motion and Swiper interactivity

// import React from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// // Import Swiper modules
// import { Autoplay } from "swiper/modules"; // Only Autoplay is needed now

// // Import Swiper styles
// import "swiper/css";
// // import 'swiper/css/autoplay'; // if you use autoplay and need its specific CSS (often not required for basic autoplay)

// // Define a type for your testimonial data
// interface Testimonial {
//   id: number;
//   imageSrc: string;
//   quote: string;
//   name: string;
// }

// // Sample testimonial data
// const testimonialsData: Testimonial[] = [
//   {
//     id: 1,
//     imageSrc: "/assets/images/John-Taylor.jpg",
//     quote:
//       "I used this site to prepare for a backpacking trip through Southeast Asia. It was a major help. I could exchange small amounts for different currencies, all in one place. That flexibility is rare.",
//     name: "Sofia Vyas",
//   },
//   {
//     id: 2,
//     imageSrc: "/assets/images/John-Taylor.jpg", // Replace with another image
//     quote:
//       "The platform is incredibly user-friendly and the rates are very competitive. Customer support was also quick to respond to my queries. Highly recommended!",
//     name: "Jane Doe",
//   },
//   {
//     id: 3,
//     imageSrc: "/assets/images/John-Taylor.jpg", // Replace with another image
//     quote:
//       "A seamless experience from start to finish. Transferring funds internationally has never been easier. I appreciate the transparency and security features.",
//     name: "Alex Smith",
//   },
// ];

// const ClientTestimonialSection: React.FC = () => {
//   return (
//     <>
//       <section className="ClientTestimonialSection py-40 ">
//         {" "}
//         {/* Added bg for visibility */}
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="wrpa relative">
//             {/* These decorative lines frame the entire slider section */}
//             <div className="absolute left-0 -top-[2px] h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
//             <div>
//               <div className="max-w-5xl mx-auto relative">
//                 <div className="absolute -left-[2px] top-1/2 -translate-y-1/2 w-[2px] h-[calc(100%+400px)] bg-gradient-to-t from-transparent via-white to-transparent hidden md:block"></div>
//                 <div className="absolute left-0 md:left-[338px] top-1/2 -translate-y-1/2 w-[2px] h-[calc(100%+400px)] bg-gradient-to-t from-transparent via-white to-transparent hidden md:block"></div>
//                 <Swiper
//                   // Install Swiper modules
//                   modules={[Autoplay]} // Only Autoplay module is included
//                   spaceBetween={50} // Space between slides
//                   slidesPerView={1} // Show one slide at a time
//                   loop={true} // Enable continuous loop mode
//                   autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                   }}
//                 >
//                   {testimonialsData.map((testimonial) => (
//                     <SwiperSlide key={testimonial.id}>
//                       <div className="flex flex-col md:flex-row gap-10 relative items-center md:items-start">
//                         {" "}
//                         {/* Adjusted for responsiveness */}
//                         <div className="w-full md:w-[338px] relative flex-shrink-0">
//                           <div className="imags">
//                             <img
//                               src={testimonial.imageSrc}
//                               alt={testimonial.name}
//                               className="rounded-3xl w-full h-auto object-cover aspect-[3/4] md:aspect-auto" // Added aspect ratio for consistency
//                             />
//                           </div>
//                         </div>
//                         <div className="w-full md:w-[calc(100%-338px-2.5rem)]">
//                           {" "}
//                           {/* 2.5rem is for gap-10 */}
//                           <div className="content py-8 md:ps-8 h-full flex flex-col justify-between text-center md:text-left">
//                             <p className="text-xl sm:text-2xl lg:text-3xl text-subheadingWhite font-medium">
//                               ”{testimonial.quote}”
//                             </p>
//                             <div className="mt-5">
//                               <span className="text-primary text-lg sm:text-xl font-semibold block">
//                                 {testimonial.name}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </div>
//             </div>

//             <div className="absolute left-0 -bottom-[2px] h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent "></div>
//           </div>
//         </div>
//         {/* The <style jsx global> block for navigation/pagination has been removed */}
//       </section>
//     </>
//   );
// };

// export default ClientTestimonialSection;



// "use client"; // Required for Framer Motion and Swiper interactivity

// import React from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// // Import Swiper modules
// import { Autoplay, Navigation } from "swiper/modules";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// // import 'swiper/css/autoplay';

// // Define a type for your testimonial data
// interface Testimonial {
//   id: number;
//   imageSrc: string;
//   quote: string;
//   name: string;
// }

// // Sample testimonial data
// const testimonialsData: Testimonial[] = [
//   {
//     id: 1,
//     imageSrc: "/assets/images/John-Taylor.jpg",
//     quote:
//       "I used this site to prepare for a backpacking trip through Southeast Asia. It was a major help. I could exchange small amounts for different currencies, all in one place. That flexibility is rare.",
//     name: "Sofia Vyas",
//   },
//   {
//     id: 2,
//     imageSrc: "/assets/images/John-Taylor.jpg", // Replace with another image
//     quote:
//       "The platform is incredibly user-friendly and the rates are very competitive. Customer support was also quick to respond to my queries. Highly recommended!",
//     name: "Jane Doe",
//   },
//   {
//     id: 3,
//     imageSrc: "/assets/images/John-Taylor.jpg", // Replace with another image
//     quote:
//       "A seamless experience from start to finish. Transferring funds internationally has never been easier. I appreciate the transparency and security features.",
//     name: "Alex Smith",
//   },
// ];

// const ClientTestimonialSection: React.FC = () => {
//   return (
//     <>
//       <section className="ClientTestimonialSection py-40 overflow-hidden">
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="wrpa relative">
//             <div className="absolute left-0 -top-[2px] h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
//             <div>
//               <div className="max-w-5xl mx-auto relative">
//                 <div className="absolute -left-[2px] top-1/2 -translate-y-1/2 w-[2px] h-[calc(100%+400px)] bg-gradient-to-t from-transparent via-white to-transparent hidden md:block"></div>
//                 <div className="absolute left-0 md:left-[338px] top-1/2 -translate-y-1/2 w-[2px] h-[calc(100%+400px)] bg-gradient-to-t from-transparent via-white to-transparent hidden md:block"></div>
                
//                 <Swiper
//                   className="!overflow-visible"
//                   modules={[Autoplay, Navigation]}
//                   spaceBetween={50}
//                   slidesPerView={1}
//                   loop={false} // MODIFIED: Set loop to false
//                   autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false, // Autoplay will resume after user interaction if not on the last slide
//                     // stopOnLastSlide: true, // Default behavior with loop: false, but can be explicit if needed
//                   }}
//                   navigation={{
//                     nextEl: '.swiper-button-next-custom',
//                     prevEl: '.swiper-button-prev-custom',
//                   }}
//                 >
//                   {testimonialsData.map((testimonial) => (
//                     <SwiperSlide key={testimonial.id}>
//                       <div className="flex flex-col md:flex-row gap-10 relative items-center md:items-start">
//                         <div className="w-full md:w-[338px] relative flex-shrink-0">
//                           <div className="imags">
//                             <img
//                               src={testimonial.imageSrc}
//                               alt={testimonial.name}
//                               className="rounded-3xl w-full h-auto object-cover aspect-[3/4] md:aspect-auto"
//                             />
//                           </div>
//                         </div>
//                         <div className="w-full md:w-[calc(100%-338px-2.5rem)]">
//                           <div className="content py-8 md:ps-8 h-full flex flex-col justify-between text-center md:text-left">
//                             <p className="text-xl sm:text-2xl lg:text-3xl text-subheadingWhite font-medium">
//                               ”{testimonial.quote}”
//                             </p>
//                             <div className="mt-5">
//                               <span className="text-primary text-lg sm:text-xl font-semibold block">
//                                 {testimonial.name}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 <div 
//                   className="swiper-button-prev-custom group absolute left-2 sm:left-4 md:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/30 hover:bg-black/50 active:bg-black/70 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-primary transition-colors duration-300">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//                   </svg>
//                 </div>
//                 <div 
//                   className="swiper-button-next-custom group absolute right-2 sm:right-4 md:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/30 hover:bg-black/50 active:bg-black/70 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-primary transition-colors duration-300">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <div className="absolute left-0 -bottom-[2px] h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ClientTestimonialSection;

"use client"; // Required for Framer Motion and Swiper interactivity

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper modules
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import 'swiper/css/autoplay';

// Define a type for your testimonial data
interface Testimonial {
  id: number;
  imageSrc: string;
  quote: string;
  name: string;
}

// Sample testimonial data
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    imageSrc: "/assets/images/John-Taylor.jpg",
    quote:
      "I used this site to prepare for a backpacking trip through Southeast Asia. It was a major help. I could exchange small amounts for different currencies, all in one place. That flexibility is rare.",
    name: "Sofia Vyas",
  },
  {
    id: 2,
    imageSrc: "/assets/images/John-Taylor.jpg", // Replace with another image
    quote:
      "The platform is incredibly user-friendly and the rates are very competitive. Customer support was also quick to respond to my queries. Highly recommended!",
    name: "Jane Doe",
  },
  {
    id: 3,
    imageSrc: "/assets/images/John-Taylor.jpg", // Replace with another image
    quote:
      "A seamless experience from start to finish. Transferring funds internationally has never been easier. I appreciate the transparency and security features.",
    name: "Alex Smith",
  },
];

const ClientTestimonialSection: React.FC = () => {
  return (
    <>
      <section className="ClientTestimonialSection py-40 overflow-hidden"> {/* Note: overflow-hidden might clip some animations if they extend outwards temporarily */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="wrpa relative"> {/* Consider renaming 'wrpa' to 'wrapper' if it's a typo */}
            <div className="absolute left-0 -top-[2px] h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <div>
              <div className="max-w-5xl mx-auto relative">
                <div className="absolute sm:-left-[2px] left-[20%] sm:top-1/2 -top-18 sm:-translate-y-1/2 translate-y-0 w-[2px] sm:h-[calc(100%+300px)] h-[350px] bg-gradient-to-t from-transparent via-white to-transparent "></div>
                <div className="absolute left-auto md:left-[338px] sm:right-auto right-[20%] sm:top-1/2 -top-18 sm:-translate-y-1/2 translate-y-0 w-[2px] sm:h-[calc(100%+300px)] h-[350px] bg-gradient-to-t from-transparent via-white to-transparent"></div>
                
                <Swiper
                  className="!overflow-visible" // Allows peeking slides if slidesPerView > 1 and spaceBetween allows
                  modules={[Autoplay, Navigation]}
                  spaceBetween={50}
                  slidesPerView={1}
                  loop={false} 
                  // autoplay={{
                  //   delay: 5000,
                  //   disableOnInteraction: false,
                  // }}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                >
                  {testimonialsData.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <div className="flex flex-col md:flex-row gap-10 relative items-center md:items-start">
                        {/* Target '.imags' for animation */}
                        <div className="w-[200px] md:w-[338px] relative flex-shrink-0 imags"> {/* Added 'imags' class here directly for animation targeting */}
                          {/* <div className="imags"> Removed inner div to simplify targeting */}
                            <img
                              src={testimonial.imageSrc}
                              alt={testimonial.name}
                              className="rounded-3xl w-full h-auto object-cover"
                            />
                          {/* </div> */}
                        </div>
                        <div className="w-full md:w-[calc(100%-338px-2.5rem)]">
                          {/* Target '.content' for animation */}
                          <div className="content py-8 md:ps-8 h-full flex flex-col justify-between text-center md:text-left">
                            <p className="text-xl sm:text-2xl lg:text-3xl text-subheadingWhite font-medium">
                              ”{testimonial.quote}”
                            </p>
                            <div className="mt-5">
                              <span className="text-primary text-lg sm:text-xl font-semibold block">
                                {testimonial.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div 
                  className="swiper-button-prev-custom group absolute left-2 sm:left-4 md:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/30 hover:bg-black/50 active:bg-black/70 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-primary transition-colors duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </div>
                <div 
                  className="swiper-button-next-custom group absolute right-2 sm:right-4 md:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/30 hover:bg-black/50 active:bg-black/70 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-primary transition-colors duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute left-0 sm:-bottom-[2px] sm:top-auto top-[200px] h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </div>
        </div>
        
        {/* Added <style jsx global> for animations */}
        <style jsx global>{`
          /* Initial state for elements to be animated */
          .swiper-slide .imags,
          .swiper-slide .content {
            opacity: 0;
            transform: translateY(25px); /* Start slightly lower */
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }

          /* State for elements in the ACTIVE slide */
          .swiper-slide-active .imags,
          .swiper-slide-active .content {
            opacity: 1;
            transform: translateY(0);
          }

          /* Optional: Stagger the animation for content */
          .swiper-slide-active .content {
            transition-delay: 0.15s; /* Content animates slightly after the image */
          }

          /* Ensure Swiper container itself has some padding if animations cause temporary overflow */
           .testimonial-swiper { /* You might need to add this class to your Swiper component if not already present */
            padding-top: 10px; /* Adjust if animations get clipped at the top */
            padding-bottom: 10px; /* Adjust if animations get clipped at the bottom */
          }
        `}</style>
      </section>
    </>
  );
};

export default ClientTestimonialSection;