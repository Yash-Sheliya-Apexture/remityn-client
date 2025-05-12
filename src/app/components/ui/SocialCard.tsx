// // components/Card.js
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const SocialCard = ({ index }: { index: number }) => {
//   const cardData = [
//     {
//       "imageSrc": "/assets/icons/usd.svg",
//       "imageAlt": "USD Flag",
//       "testimonialText": "They make our life split between two continents possible. Transfers are simple and very, very fast.",
//       "authorName": "Stuart",
//       "authorLink": "",
//       "bgColor": "bg-lightgreen",
//       "textColor": "text-green",
//       "buttonBgColor": "bg-green",
//       "buttonTextColor": "text-lightgreen"
//     },
//     {
//       "imageSrc": "/assets/icons/huf.svg",
//       "imageAlt": "USD Flag",
//       "testimonialText": `"Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers."`,
//       "authorName": "Megan",
//       "authorLink": "",
//       "bgColor": "bg-green",
//       "textColor": "text-lightgreen",
//       "buttonBgColor": "bg-lightgreen",
//       "buttonTextColor": "text-green"
//     },
//     {
//       "imageSrc": "/assets/icons/gbp.svg",
//       "imageAlt": "USD Flag",
//       "testimonialText": `"I use Wise to pay a mortgage in a different country each month. Superb. That simple."`,
//       "authorName": "Gerald",
//       "authorLink": "",
//       "bgColor": "bg-lightgreen",
//       "textColor": "text-green",
//       "buttonBgColor": "bg-green",
//       "buttonTextColor": "text-lightgreen"
//     },
//     {
//       "imageSrc": "/assets/icons/usd.svg",
//       "imageAlt": "USD Flag",
//       "testimonialText": `"The best money travel buddy! Wise makes finances easier to deal with instantly."`,
//       "authorName": "Gemma",
//       "authorLink": "",
//       "bgColor": "bg-green",
//       "textColor": "text-lightgreen",
//       "buttonBgColor": "bg-lightgreen",
//       "buttonTextColor": "text-green"
//     },
//     {
//       "imageSrc": "/assets/icons/dkk.svg",
//       "imageAlt": "USD Flag",
//       "testimonialText": `"Wise has been a lifesaver for me as a student in a foreign country."`,
//       "authorName": "Stefani",
//       "authorLink": "",
//       "bgColor": "bg-lightgreen",
//       "textColor": "text-green",
//       "buttonBgColor": "bg-green",
//       "buttonTextColor": "text-lightgreen"
//     }

//   ];

//   const card = cardData[index]; // Access the card data based on the index

//   if (!card) {
//     return null; // Or render a default/error card if index is out of bounds
//   }

//   return (
//     <div className={`p-10 ${card.bgColor} rounded-4xl min-w-md`}>
//       <div className="w-full pb-20">
//         <Image src={card.imageSrc} alt={card.imageAlt} width={150} height={150} />
//       </div>

//       <div className="flex flex-col gap-4">
//         <div className={`${card.textColor} font-medium text-3xl pb-10`}>
//           <p>
//             "{card.testimonialText}"
//           </p>
//         </div>
//         <button className={`text-left ${card.buttonBgColor} rounded-full py-3 px-6 w-fit`}>
//           <Link
//             href={card.authorLink}
//             className={`text-xl font-medium ${card.buttonTextColor}`}
//           >
//             {card.authorName} on Trustpilot
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SocialCard;

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const SocialCard = ({ index }: { index: number }) => {
//   const cardData = [
//     {
//       "imageSrc": "/assets/icons/usd.svg",
//       "imageAlt": "USD Flag",
//       "testimonialText": "They make our life split between two continents possible. Transfers are simple and very, very fast.",
//       "authorName": "Stuart",
//       "authorLink": "",
//       "bgColor": "bg-lightgreen",
//       "textColor": "text-green",
//       "buttonBgColor": "bg-green",
//       "buttonTextColor": "text-lightgreen"
//     },
//     {
//       "imageSrc": "/assets/icons/huf.svg",
//       "imageAlt": "USD Flag",
//       "testimonialText": `"Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers."`,
//       "authorName": "Megan",
//       "authorLink": "",
//       "bgColor": "bg-green",
//       "textColor": "text-lightgreen",
//       "buttonBgColor": "bg-lightgreen",
//       "buttonTextColor": "text-green"
//     },
//     {
//       "imageSrc": "/assets/icons/gbp.svg",
//       "imageAlt": "USD Flag",
//       "testimonialText": `"I use Wise to pay a mortgage in a different country each month. Superb. That simple."`,
//       "authorName": "Gerald",
//       "authorLink": "",
//       "bgColor": "bg-lightgreen",
//       "textColor": "text-green",
//       "buttonBgColor": "bg-green",
//       "buttonTextColor": "text-lightgreen"
//     },
//     {
//       "imageSrc": "/assets/icons/usd.svg",
//       "imageAlt": "USD Flag",
//       "testimonialText": `"The best money travel buddy! Wise makes finances easier to deal with instantly."`,
//       "authorName": "Gemma",
//       "authorLink": "",
//       "bgColor": "bg-green",
//       "textColor": "text-lightgreen",
//       "buttonBgColor": "bg-lightgreen",
//       "buttonTextColor": "text-green"
//     },
//     {
//       "imageSrc": "/assets/icons/dkk.svg",
//       "imageAlt": "USD Flag",
//       "testimonialText": `"Wise has been a lifesaver for me as a student in a foreign country."`,
//       "authorName": "Stefani",
//       "authorLink": "",
//       "bgColor": "bg-lightgreen",
//       "textColor": "text-green",
//       "buttonBgColor": "bg-green",
//       "buttonTextColor": "text-lightgreen"
//     }

//   ];

//   const card = cardData[index]; // Access the card data based on the index

//   if (!card) {
//     return null; // Or render a default/error card if index is out of bounds
//   }

//   return (
//     <div className={`p-10 ${card.bgColor} rounded-4xl`}>
//       <div className="w-full pb-20">
//         <Image src={card.imageSrc} alt={card.imageAlt} width={150} height={150} />
//       </div>

//       <div className="flex flex-col gap-4">
//         <div className={`${card.textColor} font-medium text-3xl pb-10`}>
//           <p>
//             "{card.testimonialText}"
//           </p>
//         </div>
//         <button className={`text-left ${card.buttonBgColor} rounded-full py-3 px-6 w-fit`}>
//           <Link
//             href={card.authorLink}
//             className={`text-xl font-medium ${card.buttonTextColor}`}
//           >
//             {card.authorName} on Trustpilot
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SocialCard;

// // SocialCard.tsx (No changes needed here)
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const SocialCard = ({ index }: { index: number }) => {
//   const cardData = [
//     {
//       imageSrc: "/assets/icon/usd.svg",
//       imageAlt: "USD Flag",
//       testimonialText:
//         "They make our life split between two continents possible. Transfers are simple and very, very fast.",
//       authorName: "Stuart",
//       authorLink: "",
//       bgColor: "bg-lightgreen",
//       textColor: "text-green",
//       buttonBgColor: "bg-green",
//       buttonTextColor: "text-lightgreen",
//     },
//     {
//       imageSrc: "/assets/icon/huf.svg",
//       imageAlt: "USD Flag",
//       testimonialText: `"Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers."`,
//       authorName: "Megan",
//       authorLink: "",
//       bgColor: "bg-green",
//       textColor: "text-lightgreen",
//       buttonBgColor: "bg-lightgreen",
//       buttonTextColor: "text-green",
//     },
//     {
//       imageSrc: "/assets/icon/gbp.svg",
//       imageAlt: "USD Flag",
//       testimonialText: `"I use Wise to pay a mortgage in a different country each month. Superb. That simple."`,
//       authorName: "Gerald",
//       authorLink: "",
//       bgColor: "bg-lightgreen",
//       textColor: "text-green",
//       buttonBgColor: "bg-green",
//       buttonTextColor: "text-lightgreen",
//     },
//     {
//       imageSrc: "/assets/icon/usd.svg",
//       imageAlt: "USD Flag",
//       testimonialText: `"The best money travel buddy! Wise makes finances easier to deal with instantly."`,
//       authorName: "Gemma",
//       authorLink: "",
//       bgColor: "bg-green",
//       textColor: "text-lightgreen",
//       buttonBgColor: "bg-lightgreen",
//       buttonTextColor: "text-green",
//     },
//     {
//       imageSrc: "/assets/icon/dkk.svg",
//       imageAlt: "USD Flag",
//       testimonialText: `"Wise has been a lifesaver for me as a student in a foreign country."`,
//       authorName: "Stefani",
//       authorLink: "",
//       bgColor: "bg-lightgreen",
//       textColor: "text-green",
//       buttonBgColor: "bg-green",
//       buttonTextColor: "text-lightgreen",
//     },
//   ];

//   const card = cardData[index]; // Access the card data based on the index

//   if (!card) {
//     return null; // Or render a default/error card if index is out of bounds
//   }

//   return (
//     <div
//       className={`lg:p-10 p-6 ${card.bgColor} rounded-4xl h-full flex flex-col justify-between`}
//     >
//       <div className="w-full lg:pb-20 pb-6">
//         <Image
//           src={card.imageSrc}
//           alt={card.imageAlt}
//           width={150}
//           height={150}
//           className="lg:w-[150px] w-[80px]"
//         />
//       </div>

//       <div className="flex flex-col gap-4">
//         <div
//           className={`${card.textColor} font-medium text-xl md:text-3xl pb-10`}
//         >
//           <p>"{card.testimonialText}"</p>
//         </div>
//         <button
//           className={`text-left ${card.buttonBgColor} rounded-full py-3 px-6 w-fit`}
//         >
//           <Link
//             href={card.authorLink}
//             className={`text-xl font-medium ${card.buttonTextColor}`}
//           >
//             {card.authorName} on Trustpilot
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SocialCard;

import React from "react";
import Image from "next/image";
import Link from "next/link";

const SocialCard = ({ index }: { index: number }) => {
  const cardData = [
    {
      imageSrc: "/assets/icon/usd.svg",
      imageAlt: "USD Flag",
      testimonialText:
        "They make our life split between two continents possible. Transfers are simple and very, very fast.",
      authorName: "Stuart",
      authorLink: "",
      bgColor: "bg-lightgreen dark:bg-secondary",
      textColor: "text-green dark:text-white",
      buttonBgColor: "bg-green dark:bg-primary dark:hover:bg-primaryhover",
      buttonTextColor: "text-lightgreen dark:text-subheading",
    },
    {
      imageSrc: "/assets/icon/huf.svg",
      imageAlt: "USD Flag",
      testimonialText: `Always fast transactions and good fees. An invaluable online bank for those who live outside their own country or are frequent travellers.`,
      authorName: "Megan",
      authorLink: "",
      bgColor: "bg-green dark:bg-secondary",
      textColor: "text-lightgreen dark:text-white",
      buttonBgColor: "bg-lightgreen dark:bg-primary dark:hover:bg-primaryhover",
      buttonTextColor: "text-subheading",
    },
    {
      imageSrc: "/assets/icon/gbp.svg",
      imageAlt: "USD Flag",
      testimonialText: `I use Wise to pay a mortgage in a different country each month. Superb. That simple.`,
      authorName: "Gerald",
      authorLink: "",
      bgColor: "bg-lightgreen dark:bg-secondary",
      textColor: "text-green dark:text-white",
      buttonBgColor: "bg-green dark:bg-primary dark:hover:bg-primaryhover",
      buttonTextColor: "text-lightgreen dark:text-subheading",
    },
    {
      imageSrc: "/assets/icon/usd.svg",
      imageAlt: "USD Flag",
      testimonialText: `The best money travel buddy! Wise makes finances easier to deal with instantly.`,
      authorName: "Gemma",
      authorLink: "",
      bgColor: "bg-green dark:bg-secondary",
      textColor: "text-lightgreen dark:text-white",
      buttonBgColor: "bg-lightgreen dark:bg-primary dark:hover:bg-primaryhover",
      buttonTextColor: "text-subheading",
    },
    {
      imageSrc: "/assets/icon/dkk.svg",
      imageAlt: "USD Flag",
      testimonialText: `Wise has been a lifesaver for me as a student in a foreign country.`,
      authorName: "Stefani",
      authorLink: "",
      bgColor: "bg-lightgreen dark:bg-secondary",
      textColor: "text-green dark:text-white",
      buttonBgColor: "bg-green dark:bg-primary dark:hover:bg-primaryhover",
      buttonTextColor: "text-lightgreen dark:text-subheading",
    },
  ];

  const card = cardData[index]; // Access the card data based on the index

  if (!card) {
    return null; // Or render a default/error card if index is out of bounds
  }

  return (
    <div
      className={`lg:p-10 p-6 ${card.bgColor} border rounded-4xl  h-full flex flex-col justify-between`}
    >
      <div className="w-full lg:pb-20 pb-6">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          width={150}
          height={150}
          className="lg:w-[150px] w-[80px]"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div
          className={`${card.textColor} font-medium text-xl md:text-3xl pb-10`}
        >
          <p>“{card.testimonialText}”</p>
        </div>
        <button
          className={`text-left ${card.buttonBgColor} rounded-full py-3 px-6 w-fit`}
        >
          <Link
            href={card.authorLink}
            className={`text-xl font-medium h-14 transition-colors duration-300 ease-in-out ${card.buttonTextColor}`}
          >
            {card.authorName} on Trustpilot
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SocialCard;
