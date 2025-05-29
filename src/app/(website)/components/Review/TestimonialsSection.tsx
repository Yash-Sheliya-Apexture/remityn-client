// // src/TestimonialsSection.tsx
// import React from 'react';
// import TestimonialCard from './TestimonialCard';
// import { testimonials } from './testimonialData';

// const TestimonialsSection: React.FC = () => {
//   // Slicing testimonials for specific columns based on original HTML structure
//   const col1Testimonials = testimonials.slice(0, 2); // Simon, Jono
//   const col2Testimonials = testimonials.slice(2, 4); // Philip, Martin
//   const col3Testimonial = testimonials[4];           // Alon
//   const col4Testimonials = testimonials.slice(5, 7); // Erik, Sebastiaan
//   const col5Testimonial = testimonials[7];           // Dimitry

//   const maskImageStyle: React.CSSProperties = {
//     maskImage: 'linear-gradient(to top, #00000000, #00000008, #00000019, #0000002d, #00000047, #00000066, #00000088, #000000ab, #000000cb, #000000e6, #000000f8, #000000ff 75%, #000000ff)',
//     WebkitMaskImage: 'linear-gradient(to top, #00000000, #00000008, #00000019, #0000002d, #00000047, #00000066, #00000088, #000000ab, #000000cb, #000000e6, #000000f8, #000000ff 70%, #000000ff)', // For Safari/Webkit
//   };

//   return (
//     <section id="testimonials" className="lg:py-20 py-5">
//       <div className="container mx-auto px-4"> {/* Added mx-auto for container behavior */}
//         <div className="border-subtle-stroke grid grid-cols-12 gap-x-6 pb-10 lg:pb-16 xl:pb-24">
//           <div className="col-span-12 xl:col-start-2 xl:col-end-12">
//             <div
//               className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
//               style={maskImageStyle}
//             >
//               {/* Column 1: Always visible */}
//               <div className="flex flex-col gap-6">
//                 {col1Testimonials.map((testimonial) => (
//                   <TestimonialCard key={testimonial.id} testimonial={testimonial} />
//                 ))}
//               </div>

//               {/* Column 2: Visible from md upwards */}
//               <div className="hidden flex-col gap-6 md:flex">
//                 {col2Testimonials.map((testimonial) => (
//                   <TestimonialCard key={testimonial.id} testimonial={testimonial} />
//                 ))}
//               </div>

//               {/* Column 3 Items - these are individual grid items at lg, causing a masonry effect */}
//               {/* Alon's Testimonial */}
//               <div className="hidden lg:block">
//                 {col3Testimonial && <TestimonialCard testimonial={col3Testimonial} />}
//               </div>

//               {/* Erik's and Sebastiaan's Testimonials in one visual column wrapper */}
//               {/* This div itself is a grid item for the parent grid */}
//               <div className="hidden flex-col gap-6 lg:flex">
//                 {col4Testimonials.map((testimonial) => (
//                   <TestimonialCard key={testimonial.id} testimonial={testimonial} />
//                 ))}
//               </div>

//               {/* Dimitry's Testimonial */}
//               {/* This div itself is a grid item for the parent grid */}
//               <div className="hidden lg:block">
//                 {col5Testimonial && <TestimonialCard testimonial={col5Testimonial} />}
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;

// // src/TestimonialsSection.tsx
// import React from "react";
// import TestimonialCard from "./TestimonialCard"; // Make sure this path is correct
// import { testimonials } from "./testimonialData"; // Make sure this path is correct and data is available

// // Interface for a single testimonial (ensure this matches your actual data structure)
// // interface Testimonial {
// //   id: string | number;
// //   name: string;
// //   quote: string;
// //   title: string;
// //   company: string;
// //   avatar: string; // Or whatever image property you have
// // }

// // Mock TestimonialCard if you need to test this component standalone
// // const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
// //   <div className="p-4 border rounded-lg shadow-lg bg-white">
// //     <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
// //     <h3 className="text-xl font-semibold text-center">{testimonial.name}</h3>
// //     <p className="text-sm text-gray-600 text-center">{testimonial.title} at {testimonial.company}</p>
// //     <p className="mt-2 text-gray-700 italic">"{testimonial.quote}"</p>
// //   </div>
// // );

// // Mock testimonialData if you need to test this component standalone
// // const testimonials: Testimonial[] = Array.from({ length: 10 }, (_, i) => ({
// //   id: `t${i + 1}`,
// //   name: `User ${i + 1}`,
// //   avatar: `https://i.pravatar.cc/80?u=${i + 1}`,
// //   title: `Satisfied Customer ${i + 1}`,
// //   company: `Tech Corp ${i + 1}`,
// //   quote: `This product is fantastic! Changed my workflow for the better. Highly recommend to anyone in the field. Testimonial #${i + 1}.`,
// // }));

// const TestimonialsSection: React.FC = () => {
//   // Slicing testimonials for the new 3-column layout:
//   // Column 1: 4 reviews
//   // Column 2: 3 reviews
//   // Column 3: 3 reviews
//   // Total: 10 reviews. Ensure 'testimonialData' has at least 10 items for full columns.
//   const col1Testimonials = testimonials.slice(0, 4);
//   const col2Testimonials = testimonials.slice(4, 7); // Starts after the first 4
//   const col3Testimonials = testimonials.slice(7, 10); // Starts after the first 7 (4+3)

//   const maskImageStyle: React.CSSProperties = {
//     maskImage:
//       "linear-gradient(to top, #00000000, #00000008, #00000019, #0000002d, #00000047, #00000066, #00000088, #000000ab, #000000cb, #000000e6, #000000f8, #000000ff 75%, #000000ff)",
//     WebkitMaskImage:
//       "linear-gradient(to top, #00000000, #00000008, #00000019, #0000002d, #00000047, #00000066, #00000088, #000000ab, #000000cb, #000000e6, #000000f8, #000000ff 70%, #000000ff)", // For Safari/Webkit
//   };

//   return (
//     <section id="testimonials" className="lg:py-20 py-5">
//       <div className="container mx-auto px-4">
//         <div className="border-subtle-stroke grid grid-cols-12 gap-x-6 pb-10 lg:pb-16 xl:pb-24">
//           <div className="col-span-12 xl:col-start-2 xl:col-end-12">
//             {/*
//               This grid container dictates the number of columns at different breakpoints
//               for the immediate children (our three new column divs).
//               - Small screens (default): 1 column (grid-cols-1)
//               - Medium screens (md): 2 columns (md:grid-cols-2)
//               - Large screens (lg): 3 columns (lg:grid-cols-3)
//             */}
//             <div
//               className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
//               style={maskImageStyle}
//             >
//               {/* Column 1: Displays 4 testimonials */}
//               <div className="flex flex-col gap-6">
//                 {col1Testimonials.map((testimonial) => (
//                   <TestimonialCard
//                     key={testimonial.id}
//                     testimonial={testimonial}
//                   />
//                 ))}
//               </div>

//               {/* Column 2: Displays 3 testimonials */}
//               <div className="flex flex-col gap-6">
//                 {col2Testimonials.map((testimonial) => (
//                   <TestimonialCard
//                     key={testimonial.id}
//                     testimonial={testimonial}
//                   />
//                 ))}
//               </div>

//               {/* Column 3: Displays 3 testimonials */}
//               <div className="flex flex-col gap-6">
//                 {col3Testimonials.map((testimonial) => (
//                   <TestimonialCard
//                     key={testimonial.id}
//                     testimonial={testimonial}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;

// src/TestimonialsSection.tsx
import React from "react";
import TestimonialCard from "./TestimonialCard"; // Make sure this path is correct
import { testimonials } from "./testimonialData"; // Make sure this path is correct and data is available

// Interface for a single testimonial (ensure this matches your actual data structure)
// interface Testimonial {
//   id: string | number;
//   name: string;
//   quote: string;
//   title: string;
//   company: string;
//   avatar: string; // Or whatever image property you have
// }

// Mock TestimonialCard if you need to test this component standalone
// const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
//   <div className="p-4 border rounded-lg shadow-lg bg-white">
//     <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
//     <h3 className="text-xl font-semibold text-center">{testimonial.name}</h3>
//     <p className="text-sm text-gray-600 text-center">{testimonial.title} at {testimonial.company}</p>
//     <p className="mt-2 text-gray-700 italic">"{testimonial.quote}"</p>
//   </div>
// );

// Mock testimonialData if you need to test this component standalone
// const testimonialsDataExample: Testimonial[] = Array.from({ length: 10 }, (_, i) => ({
//   id: `t${i + 1}`,
//   name: `User ${i + 1}`,
//   avatar: `https://i.pravatar.cc/80?u=${i + 1}`,
//   title: `Satisfied Customer ${i + 1}`,
//   company: `Tech Corp ${i + 1}`,
//   quote: `This product is fantastic! Changed my workflow for the better. Highly recommend to anyone in the field. Testimonial #${i + 1}. This one is a bit longer to test varying heights. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
// }));
// // To use mock data, uncomment above and replace `testimonials` with `testimonialsDataExample` below.



const TestimonialsSection: React.FC = () => {
  // The fixed slicing into col1, col2, col3 is removed.
  // All testimonials will be mapped directly into the grid.

  const maskImageStyle: React.CSSProperties = {
    maskImage:
      "linear-gradient(to top, #00000000, #00000008, #00000019, #0000002d, #00000047, #00000066, #00000088, #000000ab, #000000cb, #000000e6, #000000f8, #000000ff 75%, #000000ff)",
    WebkitMaskImage:
      "linear-gradient(to top, #00000000, #00000008, #00000019, #0000002d, #00000047, #00000066, #00000088, #000000ab, #000000cb, #000000e6, #000000f8, #000000ff 70%, #000000ff)", // For Safari/Webkit
  };

  return (
    <section id="testimonials" className="lg:py-20 py-5">
      <div className="container mx-auto px-4">
        <div className="border-subtle-stroke grid grid-cols-12 gap-x-6 pb-10 lg:pb-16 xl:pb-24">
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">
            <div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              style={maskImageStyle}
            >
              {/* All testimonials are mapped here directly. The grid handles flow. */}
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id} // Assuming testimonial objects have a unique 'id' property
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
