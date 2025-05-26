// // src/components/FeaturesCard.tsx
// import React from "react";
// interface FeaturesCardProps {
//   image: string; // Allow string URL or imported StaticImageData
//   title: string;
//   id: number; // Assuming 'id' is used as a key by the parent mapping this component
//   description?: string;
// }

// const FeaturesCard: React.FC<FeaturesCardProps> = ({
//   id,
//   image,
//   title,
//   description,
// }) => {
//   return (
//     <div
//       key={id}
//       className={`group bg-primarybox relative w-[28rem] h-[24rem] md:w-[36rem] md:h-[28rem]
//                   flex-shrink-0 cursor-pointer overflow-hidden text-white rounded-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-10`}
//     >
//       <img
//         src={image} // Use the validated and correctly typed source
//         alt={title}
//         style={{ objectFit: "cover" }}
//         className="transition-transform duration-500 ease-in-out"
//       />

//       {/* Overlay and text content */}
//       <div className=" flex flex-col justify-end">
//         <div className="p-4 md:p-6 transition-all duration-300 ease-in-out">
//           <h3 className="text-xl text-mainheadingWhite group-hover:text-primary md:text-2xl font-semibold line-clamp-2 mb-2">
//             {title}
//           </h3>
//           <p className="text-subheadingWhite max-h-[10rem] md:max-h-[12rem] overflow-y-auto custom-scrollbar">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturesCard;

// src/components/FeaturesCard.tsx
import React from "react";

interface FeaturesCardProps {
  icon: React.ElementType; // Expecting a React component type for the icon
  title: string;
  id: number;
  description?: string;
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({
  id,
  icon: Icon, // Destructure and rename icon prop to Icon for use as a component
  title,
  description,
}) => {
  return (
    <div
      key={id}
      className={`group bg-background relative w-[24rem] h-[24rem] md:w-[28rem] md:h-[28rem]
                  flex-shrink-0 cursor-pointer overflow-hidden text-white rounded-3xl 
                  transition-all duration-300 ease-in-out transform
                  p-5 md:p-6 flex flex-col`} // Added padding and flex-col here
    >
      {/* Icon */}
      <div className="mb-4">
        {/* Container for icon, provides spacing */}
        <div className="w-24 h-24 rounded-full icon-outer-wrapper flex items-center justify-center">
          <div className="w-18 h-18 rounded-full icon-inner-background flex items-center justify-center">
            <Icon
              className="text-primary transition-colors duration-300 ease-in-out"
              size={28}
            />
          </div>
        </div>
        {/* Adjust size and color as needed */}
      </div>

      {/* Text content */}
      <div className="flex flex-col flex-grow justify-end">
        {/* flex-grow to push description down if card is tall */}
        <h3 className="text-3xl text-mainheadingWhite group-hover:text-primary md:text-2xl font-semibold line-clamp-2 mb-2 transition-colors duration-300 ease-in-out">
          {title}
        </h3>
        {description && (
          <p className="text-subheadingWhite text-lg max-h-[10rem] md:max-h-[12rem] overflow-y-auto custom-scrollbar">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default FeaturesCard;
