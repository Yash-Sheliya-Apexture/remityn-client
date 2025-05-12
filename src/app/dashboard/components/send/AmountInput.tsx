// // src/app/dashboard/components/send/AmountInput.tsx
// import React from 'react';
// import Image from 'next/image';

// interface AmountInputProps {
//     label: string;
//     currencyCode: string;
//     flagImage?: string;
//     value: string;
//     onValueChange: (value: string) => void;
//     onFocus: () => void;
//     onBlur: () => void;
//     isFocused: boolean;
//     isDimmed?: boolean; // True if the *other* input was last edited
//     hasError?: boolean; // e.g., for insufficient balance indication
//     placeholder?: string;
//     inputId: string; // For label association
//     'data-testid'?: string;
//     labelPrefix?: string; // Optional prefix like "Recipient gets"
//     labelSuffix: string; // e.g., "exactly", "approx."
// }

// const AmountInput: React.FC<AmountInputProps> = ({
//     label,
//     currencyCode,
//     flagImage,
//     value,
//     onValueChange,
//     onFocus,
//     onBlur,
//     isFocused,
//     isDimmed = false,
//     hasError = false,
//     placeholder = "0.00",
//     inputId,
//     'data-testid': dataTestId,
//     labelPrefix = "",
//     labelSuffix
// }) => {
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         // Allow empty input, numbers, and max 2 decimal places
//         const newValue = e.target.value;
//         if (newValue === '' || /^\d*\.?\d{0,2}$/.test(newValue)) {
//             onValueChange(newValue);
//         }
//     };

//     const hasValue = value && parseFloat(value) > 0;

//     return (
//         <div data-testid={dataTestId?.replace('-input', '-section')}>
//             <label htmlFor={inputId} className={`block font-medium mb-1 ml-2 ${ hasValue ? 'text-gray-700' : 'text-neutral-900 '}`}>
//                 {labelPrefix} {label} {labelSuffix}
//             </label>
//             <div className="flex items-center p-3 rounded-lg bg-white relative min-h-[72px] transition-shadow">
//                 <div className="flex items-center bg-lightborder px-2 py-1.5 rounded-full space-x-2 mr-3 pr-3 flex-shrink-0">
//                     <Image src={flagImage || '/assets/icon/generic.svg'} alt={`${currencyCode} flag`} width={24} height={24} className="rounded-full size-8" onError={(e) => { e.currentTarget.src = '/assets/icon/generic.svg'; }} />
//                     <span className="font-semibold text-base text-gray-800">{currencyCode}</span>
//                 </div>
//                 <input
//                     id={inputId}
//                     type="text"
//                     inputMode="decimal"
//                     value={value}
//                     onChange={handleInputChange}
//                     onFocus={onFocus}
//                     onBlur={onBlur}
//                     className={`flex-grow font-bold border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-300 ease-in-out
//                         ${isFocused ? 'text-4xl lg:text-6xl text-mainheading' : hasValue ? 'text-3xl lg:text-4xl' : 'text-3xl lg:text-4xl text-gray-400'}
//                         ${isDimmed && hasValue ? 'text-gray-500 font-medium' : 'text-black'}`} // Dim if the other field was last edited and this one has a value
//                     placeholder={placeholder}
//                     aria-label={label}
//                     data-testid={dataTestId}
//                 />
//             </div>
//         </div>
//     );
// };

// export default AmountInput;

// src/app/dashboard/components/send/AmountInput.tsx
// import React from "react";
// import Image from "next/image";

// interface AmountInputProps {
//   label: string;
//   currencyCode: string;
//   flagImage?: string;
//   value: string;
//   onValueChange: (value: string) => void;
//   onFocus: () => void;
//   onBlur: () => void;
//   isFocused: boolean;
//   isDimmed?: boolean; // True if the *other* input was last edited
//   hasError?: boolean; // e.g., for insufficient balance indication
//   placeholder?: string;
//   inputId: string; // For label association
//   "data-testid"?: string;
//   labelPrefix?: string; // Optional prefix like "Recipient gets"
//   labelSuffix: string; // e.g., "exactly", "approx."
// }

// const AmountInput: React.FC<AmountInputProps> = ({
//   label,
//   currencyCode,
//   flagImage,
//   value,
//   onValueChange,
//   onFocus,
//   onBlur,
//   isFocused,
//   isDimmed = false,
//   hasError = false,
//   placeholder = "0.00",
//   inputId,
//   "data-testid": dataTestId,
//   labelPrefix = "",
//   labelSuffix,
// }) => {
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Allow empty input, numbers, and max 2 decimal places
//     const newValue = e.target.value;
//     if (newValue === "" || /^\d*\.?\d{0,2}$/.test(newValue)) {
//       onValueChange(newValue);
//     }
//   };

//   const hasValue = value && parseFloat(value) > 0;

//   return (
//     <div data-testid={dataTestId?.replace("-input", "-section")}>
//       <label
//         htmlFor={inputId}
//         className={`block font-medium mb-1 ml-2 ${
//           hasValue ? "text-gray-700" : "text-neutral-900 "
//         }`}
//       >
//         {labelPrefix} {label} {labelSuffix}
//       </label>
//       <div
//         className={`flex items-center p-2 bg-white relative min-h-[72px] transition-shadow ${
//           isFocused ? "border-b" : ""
//         }`}
//       >
//         {" "}
//         {/* Added conditional border class here */}
//         <div className="flex items-center bg-lightborder px-2 py-1.5 rounded-full space-x-2 mr-3 pr-3 flex-shrink-0">
//           <Image
//             src={flagImage || "/assets/icon/generic.svg"}
//             alt={`${currencyCode} flag`}
//             width={24}
//             height={24}
//             className="rounded-full size-8"
//             onError={(e) => {
//               e.currentTarget.src = "/assets/icon/generic.svg";
//             }}
//           />
//           <span className="font-semibold text-base text-gray-800">
//             {currencyCode}
//           </span>
//         </div>
//         <input
//           id={inputId}
//           type="text"
//           inputMode="decimal"
//           value={value}
//           onChange={handleInputChange}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           className={`flex-grow font-black border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-300 ease-in-out
//                         ${
//                           isFocused
//                             ? "text-4xl lg:text-7xl text-mainheading"
//                             : hasValue
//                             ? "text-3xl lg:text-4xl"
//                             : "text-3xl lg:text-5xl text-gray-400"
//                         }
//                         ${
//                           isDimmed && hasValue
//                             ? "text-gray-500 font-medium"
//                             : "text-black"
//                         }`}
//           placeholder={placeholder}
//           aria-label={label}
//           data-testid={dataTestId}
//         />
//       </div>
//     </div>
//   );
// };

// export default AmountInput;

// // src/app/dashboard/components/send/AmountInput.tsx
// import React from "react";
// import Image from "next/image";

// interface AmountInputProps {
//   label: string;
//   currencyCode: string;
//   flagImage?: string;
//   value: string;
//   onValueChange: (value: string) => void;
//   onFocus: () => void;
//   onBlur: () => void;
//   isFocused: boolean;
//   isDimmed?: boolean; // True if the *other* input was last edited
//   hasError?: boolean; // e.g., for insufficient balance indication
//   placeholder?: string;
//   inputId: string; // For label association
//   "data-testid"?: string;
//   labelPrefix?: string; // Optional prefix like "Recipient gets"
//   labelSuffix: string; // e.g., "exactly", "approx."
// }

// const AmountInput: React.FC<AmountInputProps> = ({
//   label,
//   currencyCode,
//   flagImage,
//   value,
//   onValueChange,
//   onFocus,
//   onBlur,
//   isFocused,
//   isDimmed = false,
//   hasError = false,
//   placeholder = "0.00",
//   inputId,
//   "data-testid": dataTestId,
//   labelPrefix = "",
//   labelSuffix,
// }) => {
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Allow empty input, numbers, and max 2 decimal places
//     const newValue = e.target.value;
//     if (newValue === "" || /^\d*\.?\d{0,2}$/.test(newValue)) {
//       onValueChange(newValue);
//     }
//   };

//   const hasValue = value && parseFloat(value) > 0;

//   return (
//     <div data-testid={dataTestId?.replace("-input", "-section")}>
//       <label
//         htmlFor={inputId}
//         className={`block font-medium mb-1 ml-2 dark:text-white ${
//           hasValue ? "text-gray-700" : "text-neutral-900  "
//         }`}
//       >
//         {labelPrefix} {label} {labelSuffix}
//       </label>

//       <div
//         className={`flex items-center p-2 bg-white dark:bg-background relative min-h-[72px] transition-shadow ${
//           isFocused ? "border-b" : ""
//         }`}
//       >
//         {" "}
//         {/* Added conditional border class here */}
//         <div className="flex items-center bg-lightborder dark:bg-background border px-2 py-1.5 rounded-full gap-2.5 pr-5 flex-shrink-0">
//           <Image
//             src={flagImage || "/assets/icon/generic.svg"}
//             alt={`${currencyCode} flag`}
//             width={24}
//             height={24}
//             className="rounded-full size-8"
//             onError={(e) => {
//               e.currentTarget.src = "/assets/icon/generic.svg";
//             }}
//           />
//           <span className="font-bold text-base text-mainheading dark:text-white">
//             {currencyCode}
//           </span>
//         </div>
//         <input
//           id={inputId}
//           type="text"
//           inputMode="decimal"
//           value={value}
//           onChange={handleInputChange}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           className={`flex-grow font-black border-none outline-none p-0 text-right pr-1 w-full bg-transparent transition-all duration-300 ease-in-out
//                         ${
//                           isFocused
//                             ? "text-4xl lg:text-7xl text-mainheading dark:text-white"
//                             : hasValue
//                             ? "text-3xl lg:text-4xl dark:text-white"
//                             : "text-3xl lg:text-5xl text-gray-400"
//                         }
//                         ${
//                           isDimmed && hasValue
//                             ? "text-gray-500 font-medium"
//                             : "text-black"
//                         }`}
//           placeholder={placeholder}
//           aria-label={label}
//           data-testid={dataTestId}
//         />
//       </div>
//     </div>
//   );
// };

// export default AmountInput;

// // src/app/dashboard/components/send/AmountInput.tsx
// import React from "react";
// import Image from "next/image";
// import clsx from "clsx"; // Import clsx for cleaner conditional classNames

// interface AmountInputProps {
//   label: string;
//   currencyCode: string;
//   flagImage?: string;
//   value: string;
//   onValueChange: (value: string) => void;
//   onFocus: () => void;
//   onBlur: () => void;
//   isFocused: boolean;
//   isDimmed?: boolean; // True if the *other* input was last edited
//   hasError?: boolean; // e.g., for insufficient balance indication
//   placeholder?: string;
//   inputId: string; // For label association
//   "data-testid"?: string;
//   labelPrefix?: string; // Optional prefix like "Recipient gets"
//   labelSuffix: string; // e.g., "exactly", "approx."
// }

// const AmountInput: React.FC<AmountInputProps> = ({
//   label,
//   currencyCode,
//   flagImage,
//   value,
//   onValueChange,
//   onFocus,
//   onBlur,
//   isFocused,
//   isDimmed = false,
//   hasError = false, // Default hasError to false
//   placeholder = "0.00",
//   inputId,
//   "data-testid": dataTestId,
//   labelPrefix = "",
//   labelSuffix,
// }) => {
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Allow empty input, numbers, and max 2 decimal places
//     const newValue = e.target.value;
//     // Allow starting with a decimal point
//     if (newValue === "" || /^\d*\.?\d{0,2}$/.test(newValue)) {
//       onValueChange(newValue);
//     }
//   };

//   const hasValue = value && parseFloat(value) > 0;

//   // Determine text size class based on focus and value presence
//   const textSizeClass = isFocused
//     ? "text-4xl lg:text-7xl"
//     : hasValue
//       ? "text-3xl lg:text-4xl"
//       : "text-3xl lg:text-5xl"; // Larger size for placeholder state

//   // Determine text color and weight class based on error, dimmed state, focus, and value presence
//   const textColorClass = clsx({
//     "text-red-500 dark:text-red-400": hasError, // Error state takes priority
//     "text-gray-500 font-medium": !hasError && isDimmed && hasValue, // Dimmed state (when no error)
//     "text-mainheading dark:text-white": !hasError && !isDimmed && isFocused, // Focused state (when no error/dim)
//     "text-black dark:text-white": !hasError && !isDimmed && !isFocused && hasValue, // Has value, not focused/dimmed/error
//     "text-gray-400": !hasError && !isDimmed && !isFocused && !hasValue, // Placeholder state
//   });

//   return (
//     <div data-testid={dataTestId?.replace("-input", "-section")}>
//       <label
//         htmlFor={inputId}
//         className={clsx(
//           "block font-medium mb-1 ml-2 dark:text-white",
//           {
//             "text-gray-700": hasValue,
//             "text-neutral-900": !hasValue, // Adjusted from original slightly
//             "text-red-600 dark:text-red-500": hasError, // Optionally make label red on error too
//           }
//         )}
//       >
//         {labelPrefix} {label} {labelSuffix}
//       </label>

//       <div
//         className={clsx(
//           "flex items-center p-2 bg-white dark:bg-background relative min-h-[72px] transition-shadow", // Add base border
//           {
//             "border-b": isFocused && !hasError, // Bottom border on focus (only if no error)
//             "border-red-500 dark:border-red-400 rounded-md": hasError, // Red border on error (overrides focus border)
//             "border-transparent": !isFocused && !hasError, // Transparent border otherwise to maintain layout
//           }
//         )}
//       >
//         <div className="flex items-center bg-lightborder dark:bg-primarybox border px-2 py-1.5 rounded-full gap-2.5 pr-5 flex-shrink-0">
//           <Image
//             src={flagImage || "/assets/icon/generic.svg"}
//             alt={`${currencyCode} flag`}
//             width={24}
//             height={24}
//             className="rounded-full size-8"
//             onError={(e) => {
//               e.currentTarget.src = "/assets/icon/generic.svg";
//             }}
//           />
//           <span className="font-bold text-base text-mainheading dark:text-white">
//             {currencyCode}
//           </span>
//         </div>

//         <input
//           id={inputId}
//           type="text"
//           inputMode="decimal" // Use decimal for better mobile keyboard
//           value={value}
//           onChange={handleInputChange}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           className={clsx(
//             `flex-grow border-none font-bold outline-none p-0 dark:text-white text-mainheading text-right pr-1 w-full bg-transparent transition-all duration-300 ease-in-out`,
//             textSizeClass,
//             textColorClass // Apply the calculated text color/weight class
//           )}
//           placeholder={placeholder}
//           aria-label={label}
//           aria-invalid={hasError} // Indicate error state for accessibility
//           data-testid={dataTestId}
//         />
//       </div>
//     </div>
//   );
// };

// export default AmountInput;

// src/app/dashboard/components/send/AmountInput.tsx
import React, { forwardRef } from "react"; // Import forwardRef
import Image from "next/image";
import clsx from "clsx";

interface AmountInputProps {
  label: string;
  currencyCode: string;
  flagImage?: string;
  value: string;
  onValueChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  isDimmed?: boolean;
  hasError?: boolean;
  placeholder?: string;
  inputId: string;
  "data-testid"?: string;
  labelPrefix?: string;
  labelSuffix: string;
}

// Wrap component with forwardRef to accept a ref
const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      label,
      currencyCode,
      flagImage,
      value,
      onValueChange,
      onFocus,
      onBlur,
      isFocused,
      isDimmed = false,
      hasError = false,
      placeholder = "0.00",
      inputId,
      "data-testid": dataTestId,
      labelPrefix = "",
      labelSuffix,
    },
    ref
  ) => {
    // Add ref parameter here
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (newValue === "" || /^\d*\.?\d{0,2}$/.test(newValue)) {
        onValueChange(newValue);
      }
    };

    const hasValue = value && parseFloat(value) > 0;

    const textSizeClass = isFocused
      ? "text-4xl lg:text-7xl"
      : hasValue
      ? "text-3xl lg:text-4xl"
      : "text-3xl lg:text-5xl";

    const textColorClass = clsx({
      "text-red-500 dark:text-red-400": hasError,
      "text-gray-500 font-medium": !hasError && isDimmed && hasValue,
      "text-mainheading dark:text-white": !hasError && !isDimmed && isFocused,
      "text-black dark:text-white":
        !hasError && !isDimmed && !isFocused && hasValue,
      "text-gray-400": !hasError && !isDimmed && !isFocused && !hasValue,
    });

    return (
      <div data-testid={dataTestId?.replace("-input", "-section")}>
        <label
          htmlFor={inputId}
          className={clsx("block font-medium mb-1 ml-2 dark:text-white", {
            "text-gray-700": hasValue,
            "text-neutral-900": !hasValue,
            "text-red-600 dark:text-red-500": hasError,
          })}
        >
          {labelPrefix} {label} {labelSuffix}
        </label>

        <div
          className={clsx(
            "flex items-center p-2 bg-white dark:bg-background relative min-h-[72px] transition-shadow",
            {
              "border-b": isFocused && !hasError,
              "border-red-500 dark:border-red-400 rounded-md": hasError,
              "border-transparent": !isFocused && !hasError,
            }
          )}
        >
          <div className="flex items-center bg-lightborder dark:bg-primarybox border px-2 py-1.5 rounded-full gap-2.5 pr-5 flex-shrink-0">
            <Image
              src={flagImage || "/assets/icon/generic.svg"}
              alt={`${currencyCode} flag`}
              width={24}
              height={24}
              className="rounded-full size-8"
              onError={(e) => {
                e.currentTarget.src = "/assets/icon/generic.svg";
              }}
            />
            <span className="font-bold text-base text-mainheading dark:text-white">
              {currencyCode}
            </span>
          </div>

          <input
            ref={ref} // Assign the forwarded ref to the input element
            id={inputId}
            type="text"
            inputMode="decimal"
            value={value}
            onChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={clsx(
              `flex-grow border-none font-bold outline-none p-0 dark:text-white text-mainheading text-right pr-1 w-full bg-transparent transition-all duration-300 ease-in-out`,
              textSizeClass,
              textColorClass
            )}
            placeholder={placeholder}
            aria-label={label}
            aria-invalid={hasError}
            data-testid={dataTestId}
          />
        </div>
      </div>
    );
  }
);

// Set display name for the component (useful for debugging)
AmountInput.displayName = "AmountInput";

export default AmountInput;
