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
//   DateAndTime: string;
// }

// // Sample testimonial data
// const testimonialsData: Testimonial[] = [
//   {
//     id: 1,
//     imageSrc: "./assets/images/John.png",
//     quote:
//       "This website has become my go-to for exchanging money before every trip. I always get competitive exchange rates and zero hidden fees. The interface is clean and super easy to navigate, even for first-time users.",
//     name: "John Taylor | Sales Manager",
//     DateAndTime: "4:16 PM · Jul 20, 2023",
//   },
//   {
//     id: 3,
//     imageSrc: "./assets/images/Tom.jpg",
//     quote:
//       "Planning my honeymoon abroad was stressful, but at least exchanging money wasn’t. This site gave me the best rate after comparing a few options online. The instructions were clear.",
//     name: "Tom Diaz | The Sales Booster",
//     DateAndTime: "10:16 AM · Jan 4, 2024",
//   },
//   {
//     id: 4,
//     imageSrc: "./assets/images/Sofia.png",
//     quote:
//       "I found this service while researching currency exchange options before my backpacking trip. It turned out to be a great find with very competitive rates. Signing up was easy, and the whole process was seamless.",
//     name: "Sofia Vyas | Freelance Writer",
//     DateAndTime: "4:05 PM · Jan 9, 2023",
//   },
// ];

// const ClientTestimonialSection: React.FC = () => {
//   return (
//     <>
//       <section className="ClientTestimonialSection sm:py-40 py-10 overflow-hidden">
//         {" "}
//         {/* Note: overflow-hidden might clip some animations if they extend outwards temporarily */}
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="wrpa relative">
//             {" "}
//             {/* Consider renaming 'wrpa' to 'wrapper' if it's a typo */}
//             <div className="absolute left-0 sm:-top-[2px] -top-10 h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
//             <div>
//               <div className="max-w-5xl mx-auto relative">
//                 <div className="absolute sm:-left-[2px] left-4 sm:top-1/2 -top-18 sm:-translate-y-1/2 translate-y-0 w-[2px] sm:h-[calc(100%+300px)] h-[350px] bg-gradient-to-t from-transparent via-white to-transparent sm:block hidden"></div>
//                 <div className="absolute left-auto md:left-[338px] sm:right-auto right-4 sm:top-1/2 -top-18 sm:-translate-y-1/2 translate-y-0 w-[2px] sm:h-[calc(100%+300px)] h-[350px] bg-gradient-to-t from-transparent via-white to-transparent sm:block hidden"></div>

//                 <Swiper
//                   className="!overflow-visible" // Allows peeking slides if slidesPerView > 1 and spaceBetween allows
//                   modules={[Autoplay, Navigation]}
//                   spaceBetween={50}
//                   slidesPerView={1}
//                   loop={false}
//                   // autoplay={{
//                   //   delay: 2500,
//                   //   disableOnInteraction: false,
//                   // }}
//                   navigation={{
//                     nextEl: ".swiper-button-next-custom",
//                     prevEl: ".swiper-button-prev-custom",
//                   }}
//                 >
//                   {testimonialsData.map((testimonial) => (
//                     <SwiperSlide key={testimonial.id}>
//                       <div className="flex flex-col md:flex-row sm:gap-10 gap-0 relative items-center md:items-start">
//                         {/* Target '.imags' for animation */}
//                         <div className="w-full md:w-[338px] relative flex-shrink-0 imags">
//                           {" "}
//                           {/* Added 'imags' class here directly for animation targeting */}
//                           {/* <div className="imags"> Removed inner div to simplify targeting */}
//                           <img
//                             src={testimonial.imageSrc}
//                             alt={testimonial.name}
//                             className="rounded-3xl w-full h-auto sm:h-full object-contain"
//                           />
//                           {/* </div> */}
//                         </div>
//                         <div className="w-full md:w-[calc(100%-338px-2.5rem)]">
//                           {/* Target '.content' for animation */}
//                           <div className="content py-8 md:ps-8 h-full flex flex-col justify-between text-center md:text-left">
//                             <p className="text-xl sm:text-2xl lg:text-3xl text-subheadingWhite font-medium">
//                               ”{testimonial.quote}”
//                             </p>
//                             <div className="mt-5">
//                               <span className="text-primary text-lg sm:text-xl font-semibold block">
//                                 {testimonial.name}
//                               </span>
//                             </div>
//                             <div className="mt-5">
//                               <span className="text-secondheadingWhite text-sm">
//                                 {testimonial.DateAndTime}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 <div className="swiper-button-prev-custom group absolute left-5 sm:left-4 md:-left-12 lg:-left-16 top-1/4 sm:top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/30 hover:bg-black/50 active:bg-black/70 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={2.5}
//                     stroke="white"
//                     className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-primary transition-colors duration-300"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15.75 19.5L8.25 12l7.5-7.5"
//                     />
//                   </svg>
//                 </div>

//                 <div className="swiper-button-next-custom group absolute right-5 sm:right-4 md:-right-12 lg:-right-16 top-1/4 sm:top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/30 hover:bg-black/50 active:bg-black/70 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={2.5}
//                     stroke="white"
//                     className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-primary transition-colors duration-300"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             <div className="absolute left-0 -bottom-[2px] h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
//           </div>
//         </div>

//         {/* Added <style jsx global> for animations */}
//         <style jsx global>{`
//           /* Initial state for elements to be animated */
//           .swiper-slide .imags,
//           .swiper-slide .content {
//             opacity: 0;
//             transform: translateY(25px); /* Start slightly lower */
//             transition: opacity 0.5s ease-out, transform 0.5s ease-out;
//           }

//           /* State for elements in the ACTIVE slide */
//           .swiper-slide-active .imags,
//           .swiper-slide-active .content {
//             opacity: 1;
//             transform: translateY(0);
//           }

//           /* Optional: Stagger the animation for content */
//           .swiper-slide-active .content {
//             transition-delay: 0.15s; /* Content animates slightly after the image */
//           }

//           /* Ensure Swiper container itself has some padding if animations cause temporary overflow */
//           .testimonial-swiper {
//             /* You might need to add this class to your Swiper component if not already present */
//             padding-top: 10px; /* Adjust if animations get clipped at the top */
//             padding-bottom: 10px; /* Adjust if animations get clipped at the bottom */
//           }
//         `}</style>
//       </section>
//     </>
//   );
// };

// export default ClientTestimonialSection;

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

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    imageSrc: "./assets/images/John.png",
    quote:
      "The platform delivers on its promise of simple steps. Quick account setup, easy KYC, and my USD wallet was ready to go. Transferring to India was seamless. Happy with the transaction tracking.",
    name: "Rushil Vaghela",
  },
  {
    id: 2,
    imageSrc: "./assets/images/Lisa-Carter.jpg",
    quote:
      "Finally, a truly user-friendly way to send AED to India! The wallet creation is intuitive, and adding funds was no hassle. Selecting the recipient and sending money was very quick.",
    name: "Noora Al Hammadi",
  },
  {
    id: 3,
    imageSrc: "./assets/images/Tom.jpg",
    quote:
      "I've used a few services to send AED to India, but this one stands out for its simplicity. The signup really is quick, and the KYC verification didn't take long at all. Once that was done, setting up my AED wallet and transferring funds into it from my bank was smooth. The best part for me is managing recipients; I send to different family members, and being able to add all their details (name, bank account, IFSC) and save them is incredibly convenient. Initiating the transfer itself is very intuitive – select wallet, select recipient, enter amount, confirm. The tracking is also a great feature. Definitely my new go-to.",
    name: "Sanjay Parmar",
  },
  {
    id: 4,
    imageSrc: "./assets/images/Sofia.png",
    quote:
      "Used this for a EUR transfer. The process of adding my recipient and their bank details was very clear. I like that I can save them for next time. The digital wallet system is also very convenient.",
    name: "Chelsy Desai",
  },
  {
    id: 5,
    imageSrc: "./assets/images/Ryan.jpg",
    quote:
      "Good overall service for GBP to INR. Signup and KYC were quick. I appreciate being able to manage multiple recipients. The transfer was completed in a reasonable time.",
    name: "Ben Carter",
  },
  {
    id: 6,
    imageSrc: "./assets/images/Emily.avif",
    quote:
      "I was a bit apprehensive about online money transfers, but this website made it so easy. The initial sign-up asked for just basic details. The KYC was a simple verification step, and after that, I had full access to create my GBP wallet. The instructions for adding funds via bank transfer were clear and easy to follow. What I really appreciated was the recipient management – I entered my sister's full name, her Indian bank account number, and the IFSC code, and now she's saved for future transfers. Sending the money was then just a matter of selecting her, my wallet, and the amount. I could even track the transaction status, which was reassuring.",
    name: "Isha Bhatt",
  },
];

const ClientTestimonialSection: React.FC = () => {
  return (
    <>
      <section className="ClientTestimonialSection sm:py-40 py-10 overflow-hidden">
        {" "}
        {/* Note: overflow-hidden might clip some animations if they extend outwards temporarily */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="wrpa relative">
            {" "}
            {/* Consider renaming 'wrpa' to 'wrapper' if it's a typo */}
            <div className="absolute left-0 sm:-top-[2px] -top-10 h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <div>
              <div className="max-w-5xl mx-auto relative">
                <div className="absolute sm:-left-[2px] left-4 sm:top-1/2 -top-18 sm:-translate-y-1/2 translate-y-0 w-[2px] sm:h-[calc(100%+300px)] h-[350px] bg-gradient-to-t from-transparent via-white to-transparent sm:block hidden"></div>
                <div className="absolute left-auto md:left-[338px] sm:right-auto right-4 sm:top-1/2 -top-18 sm:-translate-y-1/2 translate-y-0 w-[2px] sm:h-[calc(100%+300px)] h-[350px] bg-gradient-to-t from-transparent via-white to-transparent sm:block hidden"></div>

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
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                >
                  {testimonialsData.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <div className="flex flex-col md:flex-row lg:gap-10 relative items-center md:items-start">
                        {/* Target '.imags' for animation */}
                        <div className="w-[240px] md:w-[338px] relative flex-shrink-0 imags">
                          {" "}
                          {/* Added 'imags' class here directly for animation targeting */}
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
                          <div className="content lg:py-8 sm:py-4 py-8 h-full flex flex-col justify-between text-center md:text-left">
                            <p className="text-xl sm:text-2xl lg:text-3xl text-subheadingWhite font-medium line-clamp-5">
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

                <div className="swiper-button-prev-custom inline-block group absolute left-0 top-1/4 sm:left-4 md:left-4 md:-bottom-26 md:top-auto xl:-left-20 xl:top-1/2 xl:bottom-auto -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/30 hover:bg-black/50 active:bg-black/70 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="white"
                    className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-primary transition-colors duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </div>
                <div className="swiper-button-next-custom inline-block group absolute right-0 top-1/4 sm:right-4 md:right-[414px] md:-bottom-26 md:top-auto lg:right-[664px] xl:bottom-auto xl:-right-20 xl:top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/30 hover:bg-black/50 active:bg-black/70 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:cursor-not-allowed">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="white"
                    className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-primary transition-colors duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute left-0 -bottom-[2px] h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
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
          .testimonial-swiper {
            /* You might need to add this class to your Swiper component if not already present */
            padding-top: 10px; /* Adjust if animations get clipped at the top */
            padding-bottom: 10px; /* Adjust if animations get clipped at the bottom */
          }
        `}</style>
      </section>
    </>
  );
};

export default ClientTestimonialSection;



// "use client";

// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, EffectCards } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-cards";

// interface Testimonial {
//   id: number;
//   imageSrc: string; // Ensure these paths are correct, e.g., /assets/images/nelson-dunk.jpg
//   quote: string;
//   name: string; // Format: "Name | Title"
// }

// const testimonialsData: Testimonial[] = [
//   {
//     id: 1,
//     imageSrc: "/assets/images/nelson-dunk.jpg", // Replace with actual path to Nelson Dunk's image
//     quote:
//       "Phenomenal job. We are a very niche market and I'm sure it took some extra digging to find all the information for the market research report. The report is incredibly detailed, accurate and well written. Very very happy with the work!",
//     name: "Nelson Dunk | CHIEF CREATIVE OFFICE AT SKYLIGIIT VISUAL MEDIA",
//   },
//   {
//     id: 2,
//     imageSrc: "/assets/images/ben-cane.jpg",
//     quote:
//       "Working with Addiffico was a pleasure. Despite needing market research and competitor analysis in a niche area, they delivered beyond my expectations. All of the work was comprehensive, well-structured and extremely detailed. The communication was perfect and they operated with great professionalism.",
//     name: "Ben Cane | FOUNDER OF MUNITY",
//   },
//   {
//     id: 3,
//     imageSrc: "/assets/images/deshawn-robinson.jpg",
//     quote:
//       "Addiffico was phenomenal and worked quickly to help me get the information I needed. In addition to purchasing one of the programs/plans they had, they helped me figure out what I needed best. They were able to also help me break down the data and provided some additional feedback on my pitch deck. I look forward to working with them further as I expand on my project. Highly recommend.",
//     name: "Deshawn Robinson | CEO AT DOORS OPEN CONNECT",
//   },
//   {
//     id: 4,
//     imageSrc: "/assets/images/Tom.jpg",
//     quote:
//       "Planning my honeymoon abroad was stressful, but at least exchanging money wasn’t. This site gave me the best rate after comparing a few options online. The instructions were clear.",
//     name: "Tom Diaz | The Sales Booster",
//   },
//   {
//     id: 5,
//     imageSrc: "/assets/images/Sofia.png",
//     quote:
//       "I found this service while researching currency exchange options before my backpacking trip. It turned out to be a great find with very competitive rates. Signing up was easy, and the whole process was seamless.",
//     name: "Sofia Vyas | Freelance Writer",
//   },
//   {
//     id: 6,
//     imageSrc: "/assets/images/Ryan.jpg",
//     quote:
//       "I was amazed by how quickly my money reached my family abroad. The exchange rates beat every other service I’ve used, and the process was smooth from start to finish. Highly recommend this platform for all international travelers.",
//     name: "Ryan Michael | Traveler",
//   },
// ];

// const ClientTestimonialSection: React.FC = () => {
//   const [swiperInstance, setSwiperInstance] = useState<any>(null);

//   return (
//     <>
//       <section className="ClientTestimonialSection bg-[#2A302E] sm:py-40 py-20 overflow-hidden"> {/* Matched background from video */}
//         <div className="container mx-auto px-4 relative z-10">
//           {/* This div helps center the swiper within a larger layout if needed */}
//           <div className="max-w-7xl mx-auto flex justify-center items-center"> {/* Increased max-w for wider layouts */}
//             {/* Relative container for Swiper and its custom navigation */}
//             <div className="relative w-full flex justify-center items-center min-h-[650px] sm:min-h-[700px] lg:min-h-[750px]">
//               <Swiper
//                 className="!overflow-visible testimonial-swiper-card"
//                 modules={[Navigation, EffectCards, Autoplay]} // Added Autoplay back if you want it
//                 effect={'cards'}
//                 grabCursor={true}
//                 loop={false}
//                 // autoplay={{ // Uncomment if you want autoplay
//                 //   delay: 7000,
//                 //   disableOnInteraction: false,
//                 // }}
//                 navigation={{
//                   nextEl: ".swiper-button-next-custom",
//                   prevEl: ".swiper-button-prev-custom",
//                 }}
//                 onSwiper={setSwiperInstance}
//                 onSlideChange={() => {
//                   if (swiperInstance) {
//                     setSwiperInstance({ ...swiperInstance }); // Force update for pagination
//                   }
//                 }}
//               >
//                 {testimonialsData.map((testimonial, index) => {
//                   const [name, title] = testimonial.name.split(' | ');
//                   return (
//                     <SwiperSlide key={testimonial.id}>
//                       <div className="relative bg-[#e9f0ef] text-gray-800 rounded-2xl sm:rounded-3xl p-6 md:p-8 flex flex-col h-full w-full overflow-hidden">
                        
//                         {/* Background Decorative Quote Mark */}
//                         <div className="absolute top-5 right-5 sm:top-6 sm:right-6 text-[10rem] sm:text-[12rem] md:text-[13rem] text-[#d7e0de] font-bold opacity-100 leading-none z-0 select-none pointer-events-none">
//                           “
//                         </div>

//                         {/* Top section: Pagination and Read More button */}
//                         <div className="flex justify-between items-center mb-4 sm:mb-6 z-20">
//                           <div className="px-3 py-1 bg-[#d7e0de] rounded-full text-[11px] sm:text-xs font-medium text-gray-700">
//                             {swiperInstance ? `${swiperInstance.realIndex + 1} of ${testimonialsData.length}` : `${index + 1} of ${testimonialsData.length}`}
//                           </div>
//                           <button className="px-3 py-1 bg-[#d7e0de] rounded-full text-[11px] sm:text-xs font-medium text-gray-700 hover:bg-opacity-80 transition-colors">
//                             Read more
//                           </button>
//                         </div>

//                         {/* Main testimonial quote */}
//                         <div className="flex-grow overflow-y-auto my-4 sm:my-5 z-10 relative">
//                           <p className="text-sm sm:text-[15px] text-gray-800 font-normal leading-relaxed sm:leading-7">
//                             {testimonial.quote}
//                           </p>
//                         </div>

//                         {/* Bottom section: User image, Name, and Title */}
//                         <div className="mt-auto flex items-center gap-3 sm:gap-4 z-10 pt-4 sm:pt-5">
//                           <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
//                             <img
//                               src={testimonial.imageSrc}
//                               alt={name}
//                               className="rounded-full w-full h-full object-cover shadow-sm" // Removed explicit border
//                             />
//                           </div>
//                           <div>
//                             <span className="text-gray-900 text-base sm:text-lg font-semibold block">
//                               {name}
//                             </span>
//                             {title && (
//                               <span className="text-gray-500 text-[10px] sm:text-xs font-medium tracking-wide block"> {/* Added tracking-wide */}
//                                 {title.toUpperCase()} {/* Ensuring title is uppercase */}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                   );
//                 })}
//               </Swiper>

//               {/* Custom navigation buttons - positioned further out */}
//               <div className="swiper-button-prev-custom hidden sm:inline-block group absolute left-0 xl:-left-8 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/20 hover:bg-black/40 active:bg-black/60 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-gray-200 transition-colors duration-300">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//                 </svg>
//               </div>
//               <div className="swiper-button-next-custom hidden sm:inline-block group absolute right-0 xl:-right-8 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/20 hover:bg-black/40 active:bg-black/60 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-gray-200 transition-colors duration-300">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//         <style jsx global>{`
//           .testimonial-swiper-card {
//             width: 450px; 
//             height: 600px; 
//             margin: 0 auto;
//           }

//           /* Responsive adjustments for card dimensions */
//           @media (max-width: 1280px) { /* xl breakpoint or similar */
//             .swiper-button-prev-custom { left: -10px; }
//             .swiper-button-next-custom { right: -10px; }
//           }
//           @media (max-width: 1024px) { /* lg */
//             .testimonial-swiper-card {
//               width: 420px;
//               height: 580px;
//             }
//             .swiper-button-prev-custom { left: -5px; }
//             .swiper-button-next-custom { right: -5px; }
//           }
//           @media (max-width: 768px) { /* md */
//             .testimonial-swiper-card {
//               width: 380px;
//               height: 540px;
//             }
//              .swiper-button-prev-custom { left: 0px; } /* Closer or on edge */
//             .swiper-button-next-custom { right: 0px; }
//           }
//           @media (max-width: 640px) { /* sm */
//             .testimonial-swiper-card {
//               width: 88vw; /* Use viewport width for smaller screens */
//               max-width: 350px; /* Cap the max width */
//               height: 500px; 
//             }
//             /* On very small screens, nav buttons might be hidden or need different placement */
//              .swiper-button-prev-custom,
//              .swiper-button-next-custom {
//                 /* Example: hide on very small screens if they clutter */
//                 /* display: none; */ 
//                 /* Or adjust positioning further */
//                 top: auto;
//                 bottom: -45px; /* Position below the card */
//                 transform: translateY(0);
//              }
//              .swiper-button-prev-custom { left: 35%; transform: translateX(-50%); }
//              .swiper-button-next-custom { right: 35%; transform: translateX(50%); }

//           }
//            @media (max-width: 420px) { /* even smaller */
//             .testimonial-swiper-card {
//               height: 480px; 
//             }
//             .swiper-button-prev-custom { left: 30%;}
//             .swiper-button-next-custom { right: 30%;}
//            }


//           .testimonial-swiper-card .swiper-slide {
//             border-radius: 1.5rem; /* 24px */
//             background-color: #e9f0ef; 
//             box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); 
//             overflow: hidden;
//             -webkit-backface-visibility: hidden;
//             backface-visibility: hidden;
//             -webkit-transform: translate3d(0, 0, 0);
//             transform: translate3d(0, 0, 0);
//           }

//           .testimonial-swiper-card .swiper-slide > div {
//             height: 100%;
//             width: 100%;
//             display: flex;
//             flex-direction: column;
//           }
//         `}</style>
//       </section>
//     </>
//   );
// };

// export default ClientTestimonialSection;


// "use client";

// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, EffectCards } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-cards";
// import Link from "next/link";

// interface Testimonial {
//   id: number;
//   imageSrc: string;
//   quote: string;
//   name: string; // Format: "Name | Title"
// }

// // Sample data (ensure image paths are correct for your project)
// const testimonialsData: Testimonial[] = [
//   {
//     id: 1,
//     imageSrc: "/assets/images/nelson-dunk.jpg",
//     quote:
//       "Phenomenal job. We are a very niche market and I'm sure it took some extra digging to find all the information for the market research report. The report is incredibly detailed, accurate and well written. Very very happy with the work!",
//     name: "Nelson Dunk | CHIEF CREATIVE OFFICE AT SKYLIGIIT VISUAL MEDIA",
//   },
//   {
//     id: 2,
//     imageSrc: "/assets/images/ben-cane.jpg",
//     quote:
//       "Working with Addiffico was a pleasure. Despite needing market research and competitor analysis in a niche area, they delivered beyond my expectations. All of the work was comprehensive, well-structured and extremely detailed. The communication was perfect and they operated with great professionalism.",
//     name: "Ben Cane | FOUNDER OF MUNITY",
//   },
//   {
//     id: 3,
//     imageSrc: "/assets/images/deshawn-robinson.jpg",
//     quote:
//       "Addiffico was phenomenal and worked quickly to help me get the information I needed. In addition to purchasing one of the programs/plans they had, they helped me figure out what I needed best. They were able to also help me break down the data and provided some additional feedback on my pitch deck. I look forward to working with them further as I expand on my project. Highly recommend.",
//     name: "Deshawn Robinson | CEO AT DOORS OPEN CONNECT",
//   },
//   {
//     id: 4,
//     imageSrc: "/assets/images/Tom.jpg",
//     quote:
//       "Planning my honeymoon abroad was stressful, but at least exchanging money wasn’t. This site gave me the best rate after comparing a few options online. The instructions were clear.",
//     name: "Tom Diaz | THE SALES BOOSTER",
//   },
//   {
//     id: 5,
//     imageSrc: "/assets/images/Sofia.png",
//     quote:
//       "I found this service while researching currency exchange options before my backpacking trip. It turned out to be a great find with very competitive rates. Signing up was easy, and the whole process was seamless.",
//     name: "Sofia Vyas | FREELANCE WRITER",
//   },
// ];

// const ClientTestimonialSection: React.FC = () => {
//   const [swiperInstance, setSwiperInstance] = useState<any>(null);

//   return (
//     <>
//       <section className="ClientTestimonialSection py-20 sm:py-32 lg:py-40 overflow-hidden">
//         <div className="container mx-auto px-4">
//           <div className="lg:flex lg:items-center lg:gap-12 xl:gap-20">
//             {/* Left Content: Heading and Buttons */}
//             <div className="lg:w-2/5 xl:w-[38%] text-center lg:text-left mb-12 lg:mb-0">

//             <div className="space-y-4 text-center md:text-left">
//               <div className="lg:inline-block hidden">
//                 <span className="text-subheadingWhite font-medium text-sm uppercase">
//                   <span className="text-subheadingWhite/30">[</span> Built for
//                   safety. Trusted worldwide{" "}
//                   <span className="text-subheadingWhite/30">]</span>
//                 </span>
//               </div>
              
//               <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto md:mx-0">
//                 <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite lg:block hidden">
//                   Hear it from {" "}
//                   <span className="text-primary">our clients</span>
//                 </h3>
//                 <p className="text-subheadingWhite md:text-lg text-base max-w-5xl">
//                   Exchange currency with confidence—fast, secure, and
//                   dependable. Enjoy competitive rates, zero hidden fees, and
//                   complete encryption for peace of mind at every step. Thousands
//                   trust us for our transparency, real-time tracking, and
//                   round-the-clock support. Your money, your rules—simple, safe,
//                   and always secure.
//                 </p>
//               </div>
              
//               <div className="flex justify-center md:justify-start mt-8">
//                 <Link
//                   href="/faqs"
//                   className="inline-block" // Added inline-block
//                 >
//                   <button className="bg-primary hover:bg-primaryhover text-neutral-900 cursor-pointer font-medium text-base lg:text-lg py-3 px-8 h-12.5 rounded-full transition-all duration-75 ease-linear flex items-center justify-center">
//                     How we keep your money safe
//                   </button>
//                 </Link>
//               </div>
//             </div>
//             </div>

//             {/* Right Content: Swiper Testimonials */}
//             <div className="lg:w-3/5 xl:w-[62%]">
//               <div className="relative w-full flex justify-center lg:justify-end items-center min-h-[550px] sm:min-h-[600px] lg:min-h-[650px]"> {/* Adjusted min-height */}
//                 <Swiper
//                   className="!overflow-visible testimonial-swiper-card"
//                   modules={[Navigation, EffectCards, Autoplay]}
//                   effect={'cards'}
//                   grabCursor={true}
//                   loop={false} // Keep loop false for "X of X+1" pagination to make sense
//                   // autoplay={{
//                   //   delay: 7000,
//                   //   disableOnInteraction: false,
//                   // }}
//                   navigation={{
//                     nextEl: ".swiper-button-next-custom",
//                     prevEl: ".swiper-button-prev-custom",
//                   }}
//                   onSwiper={setSwiperInstance}
//                   onSlideChange={() => { // Ensure pagination updates on slide change
//                     if (swiperInstance) {
//                       setSwiperInstance({ ...swiperInstance });
//                     }
//                   }}
//                 >
//                   {testimonialsData.map((testimonial, index) => {
//                     const [name, title] = testimonial.name.split(' | ');
//                     const currentSlideDisplay = swiperInstance ? swiperInstance.realIndex : index;
//                     return (
//                       <SwiperSlide key={testimonial.id}>
//                         <div className="relative bg-primarybox text-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col h-full w-full overflow-hidden">
                          
//                           <div className="absolute top-5 right-5 sm:top-6 sm:right-6 text-[9rem] sm:text-[10rem] md:text-[11rem] text-subheadingWhite/30 font-bold opacity-100 leading-none z-0 select-none pointer-events-none">
//                             “
//                           </div>

//                           <div className="flex justify-between items-center mb-4 sm:mb-5 z-20">
//                             <div className="px-6 py-2.5 bg-secondarybox rounded-full sm:text-sm font-medium text-mainheadingWhite">
//                               {/* Custom Pagination: X of X+1 */}
//                               {`${currentSlideDisplay} of ${currentSlideDisplay + 1}`}
//                             </div>
//                             {/* "Read more" button removed */}
//                           </div>

//                           <div className="flex-grow overflow-y-auto my-3 sm:my-4 z-10 relative">
//                             <p className="text-sm sm:text-2xl text-mainheadingWhite font-normal leading-relaxed sm:leading-7">
//                               {testimonial.quote}
//                             </p>
//                           </div>

//                           <div className="mt-auto flex items-center gap-3 sm:gap-4 z-10 pt-3 sm:pt-4">
//                             <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0">
//                               <img
//                                 src={testimonial.imageSrc}
//                                 alt={name}
//                                 className="rounded-full w-full h-full object-cover shadow-sm"
//                               />
//                             </div>
//                             <div>
//                               <span className="text-mainheadingWhite text-sm sm:text-base font-semibold block">
//                                 {name}
//                               </span>
//                               {title && (
//                                 <span className="text-subheadingWhite text-[10px] sm:text-xs font-medium tracking-wide block">
//                                   {title.toUpperCase()}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                     );
//                   })}
//                 </Swiper>

//                 {/* Custom navigation buttons */}
//                 {/* Adjusted positioning: hidden on mobile, then appear relative to the swiper container */}
//                 <div className="swiper-button-prev-custom hidden md:inline-block group absolute left-0 lg:-left-4 xl:-left-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/20 hover:bg-black/40 active:bg-black/60 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed">
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-gray-200 transition-colors duration-300">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//                   </svg>
//                 </div>
//                 <div className="swiper-button-next-custom hidden md:inline-block group absolute right-0 lg:-right-4 xl:-right-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer p-2 md:p-3 bg-black/20 hover:bg-black/40 active:bg-black/60 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed">
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-gray-200 transition-colors duration-300">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//                   </svg>
//                 </div>

//                 {/* Navigation for smaller screens (below card) */}
//                 <div className="md:hidden flex justify-center gap-6 mt-6 w-full">
//                     <div className="swiper-button-prev-custom group cursor-pointer p-3 bg-black/20 hover:bg-black/40 active:bg-black/60 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 group-hover:stroke-gray-200 transition-colors duration-300">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//                         </svg>
//                     </div>
//                     <div className="swiper-button-next-custom group cursor-pointer p-3 bg-black/20 hover:bg-black/40 active:bg-black/60 rounded-full transition-all duration-300 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5 group-hover:stroke-gray-200 transition-colors duration-300">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//                         </svg>
//                     </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//         <style jsx global>{`
//           .testimonial-swiper-card {
//             /* Base dimensions for the swiper card itself */
//             width: 430px; /* Default width, good for lg screens */
//             height: 580px; /* Default height */
//           }
          
//           @media (max-width: 1280px) { /* xl */
//              .testimonial-swiper-card {
//                 width: 410px;
//                 height: 560px;
//              }
//           }
//           @media (max-width: 1024px) { /* lg - swiper takes more central stage if left col shrinks */
//             .testimonial-swiper-card {
//               width: 400px; 
//               height: 550px;
//             }
//           }
//           @media (max-width: 767px) { /* md - below lg, stack layout, swiper centered */
//             .testimonial-swiper-card {
//               width: 360px; /* Slightly smaller for md */
//               height: 520px;
//             }
//           }
//           @media (max-width: 640px) { /* sm */
//             .testimonial-swiper-card {
//               width: 85vw; /* Responsive width */
//               max-width: 340px; /* Cap width */
//               height: 490px; 
//             }
//           }
//            @media (max-width: 420px) {
//             .testimonial-swiper-card {
//               width: 90vw;
//               max-width: 320px;
//               height: 470px; 
//             }
//            }

//           .testimonial-swiper-card .swiper-slide {
//             border-radius: 1.5rem; /* 24px */
//             background-color: #394247; 
//             box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); 
//             overflow: hidden;
//             -webkit-backface-visibility: hidden;
//             backface-visibility: hidden;
//             -webkit-transform: translate3d(0, 0, 0);
//             transform: translate3d(0, 0, 0);
//           }

//           .testimonial-swiper-card .swiper-slide > div {
//             height: 100%;
//             width: 100%;
//             display: flex;
//             flex-direction: column;
//           }
//         `}</style>
//       </section>
//     </>
//   );
// };

// export default ClientTestimonialSection;