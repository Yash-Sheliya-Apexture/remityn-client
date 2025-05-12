// // components/Filter/Recipients.tsx
// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// interface Recipient {
//   id: string | number; // Add a unique ID for each recipient
//   name: string;
//   accountInfo?: string;
//   initials: string;
//   countryCode?: string;
// }

// interface RecipientsProps {
//   recipients: Recipient[];
//   onRecipientSelectionChange?: (selectedRecipientIds: (string | number)[]) => void; // Optional callback to parent
// }

// const Recipients: React.FC<RecipientsProps> = ({ recipients, onRecipientSelectionChange }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<(string | number)[]>([]);

//   // Effect to call the parent callback when selectedRecipientIds changes
//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   const handleCheckboxChange = (recipientId: string | number, isChecked: boolean) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(selectedRecipientIds.filter((id) => id !== recipientId));
//     }
//   };

//   // Check if a recipient is selected
//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   return (
//     <div>
//       {recipients.map((recipient) => (
//         <div key={recipient.id} className="flex items-center justify-between py-3">
//           <div className="flex items-center">
//             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center relative">
//               <span className="font-bold text-main">{recipient.initials}</span>
//               {recipient.countryCode === 'IN' && (
//                 <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                   <Image src={"/assets/icon/inr.svg"} alt="inr flag" width={20} height={20}/>
//                 </div>
//               )}
//             </div>
//             <div className="ml-4">
//               <h5 className="font-medium text-main">{recipient.name}</h5>
//               {recipient.accountInfo && <p className="text-sm text-gray-600">{recipient.accountInfo}</p>}
//             </div>
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               className="h-5 w-5 rounded border-gray-300 focus:ring-0"
//               checked={isRecipientSelected(recipient.id)}
//               onChange={(e) => handleCheckboxChange(recipient.id, e.target.checked)}
//             />
//           </div>
//         </div>
//       ))}
//       {selectedRecipientIds.length > 0 && (
//         <p className="mt-4 text-sm text-gray-500">
//           {selectedRecipientIds.length} recipient(s) selected.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Recipients;

// // components/Filter/Recipients.tsx
// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// interface Recipient {
//   id: string | number;
//   accountHolderName: string;
//   accountNumber?: string;
//   countryCode?: string;
// }

// interface RecipientsProps {
//   onRecipientSelectionChange?: (selectedRecipientIds: (string | number)[]) => void;
//   selectedRecipientIds: (string | number)[]; // Prop to receive selected recipients from parent
// }

// const Recipients: React.FC<RecipientsProps> = ({ onRecipientSelectionChange, selectedRecipientIds: parentSelectedRecipientIds }) => { // Destructure selectedRecipientIds and rename to parentSelectedRecipientIds
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<(string | number)[]>(parentSelectedRecipientIds); // Initialize local state with prop

//   // Sample Recipients Data
//   const sampleRecipients = [
//     {
//       id: '1',
//       accountHolderName: "Nirav Ramani",
//       accountNumber: "XXXX XXXX XXXX 6009",
//       countryCode: 'IN'
//     },
//     {
//       id: '2',
//       accountHolderName: "kartavya pareshbhai patel",
//       accountNumber: "XXXX XXXX XXXX 1234",
//       countryCode: 'IN'
//     },
//     {
//       id: '3',
//       accountHolderName: "John Doe",
//       accountNumber: "XXXX XXXX XXXX 5678",
//       countryCode: 'IN'
//     },
//   ];

//   // Effect to call the parent callback when selectedRecipientIds changes
//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   // Effect to update local state when parent's selectedRecipientIds prop changes (for persistence)
//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (recipientId: string | number, isChecked: boolean) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(selectedRecipientIds.filter((id) => id !== recipientId));
//     }
//   };

//   // Check if a recipient is selected
//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   const getInitials = (accountHolderName: string): string => {
//     const nameParts = accountHolderName.split(" ");
//     if (nameParts.length >= 2) {
//       return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
//     } else if (nameParts.length === 1) {
//       return `${nameParts[0][0]}`.toUpperCase();
//     } else {
//       return "";
//     }
//   };

//   return (
//     <div>
//       {sampleRecipients.map((recipient) => (
//         <div key={recipient.id} className="flex items-center justify-between py-3">
//           <div className="flex items-center">
//             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center relative">
//               <span className="font-bold text-main">{getInitials(recipient.accountHolderName)}</span>
//               {recipient.countryCode === 'IN' && (
//                 <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                   <Image src={"/assets/icon/inr.svg"} alt="inr flag" width={20} height={20}/>
//                 </div>
//               )}
//             </div>
//             <div className="ml-4">
//               <h5 className="font-medium text-main capitalize">{recipient.accountHolderName}</h5>
//               {recipient.accountNumber && <p className="text-sm text-gray-600">Account ending in {recipient.accountNumber.slice(-4)}</p>}
//             </div>
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               className="h-5 w-5 rounded bg-mai border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//               checked={isRecipientSelected(recipient.id)}
//               onChange={(e) => handleCheckboxChange(recipient.id, e.target.checked)}
//             />
//           </div>
//         </div>
//       ))}
//       {selectedRecipientIds.length > 0 && (
//         <p className="mt-4 text-sm text-gray-500">
//           {selectedRecipientIds.length} recipient(s) selected.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Recipients;

// // components/Filter/Recipients.tsx
// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { sampleRecipients, Recipient } from "../../../../data/transactions"; // Import Recipient interface from data/transactions.ts

// interface RecipientsProps {
//   onRecipientSelectionChange?: (
//     selectedRecipientIds: (string | number)[]
//   ) => void;
//   selectedRecipientIds: (string | number)[];
// }

// const Recipients: React.FC<RecipientsProps> = ({
//   onRecipientSelectionChange,
//   selectedRecipientIds: parentSelectedRecipientIds,
// }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<
//     (string | number)[]
//   >(parentSelectedRecipientIds);

//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (
//     recipientId: string | number,
//     isChecked: boolean
//   ) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(
//         selectedRecipientIds.filter((id) => id !== recipientId)
//       );
//     }
//   };

//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   const getInitials = (accountHolderName: string): string => {
//     const nameParts = accountHolderName.split(" ");
//     if (nameParts.length >= 2) {
//       return `${nameParts[0][0]}${
//         nameParts[nameParts.length - 1][0]
//       }`.toUpperCase();
//     } else if (nameParts.length === 1) {
//       return `${nameParts[0][0]}`.toUpperCase();
//     } else {
//       return "";
//     }
//   };

//   return (
//     <>
//       <h4 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//         Recipients
//       </h4>
//       <div className="pt-4">
//         {sampleRecipients.map((recipient) => (
//           <div
//             key={recipient.id}
//             className="flex items-center justify-between hover:bg-lightgray p-4 rounded-2xl -mx-4 transition-colors duration-500 ease-in-out"
//           >
//             {/* Recipients List */}
//             <div className="flex items-center">
//               <div className="w-12 h-12 rounded-full bg-lightborder flex items-center justify-center relative">
//                 <span className="font-bold text-main">
//                   {getInitials(recipient.accountHolderName)}
//                 </span>
//                 {recipient.countryCode === "INR" && (
//                   <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full overflow-hidden">
//                     <Image
//                       src={"/assets/icon/inr.svg"}
//                       alt="inr flag"
//                       width={20}
//                       height={20}
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="ml-4">
//                 <h5 className="font-medium text-main capitalize">
//                   {recipient.accountHolderName}
//                 </h5>
//                 {recipient.accountNumber && (
//                   <p className="text-sm text-gray-600">
//                    {recipient.countryCode} Account ending in {recipient.accountNumber.slice(-4)}
//                   </p>
//                 )}
//               </div>
//             </div>
//             {/* Recipients List */}

//             <div className="pt-1.5">
//               <input
//                 type="checkbox"
//                 className="h-5 w-5 rounded border-gray-300 focus:ring-0 checked:bg-black checked:border-black"
//                 checked={isRecipientSelected(recipient.id)}
//                 onChange={(e) =>
//                   handleCheckboxChange(recipient.id, e.target.checked)
//                 }
//               />
//             </div>
//           </div>
//         ))}
//         {selectedRecipientIds.length > 0 && (
//           <p className="mt-4 text-sm text-gray-500">
//             {selectedRecipientIds.length} recipient(s) selected.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Recipients;













// // components/Filter/Recipients.tsx
// import React, { useState, useEffect } from "react";
// import { sampleRecipients } from "../../../../data/transactions";
// import RecipientList from "../../RecipientList"; // Import the new RecipientListItem component

// interface RecipientsProps {
//   onRecipientSelectionChange?: (
//     selectedRecipientIds: (string | number)[]
//   ) => void;
//   selectedRecipientIds: (string | number)[];
// }

// const Recipients: React.FC<RecipientsProps> = ({
//   onRecipientSelectionChange,
//   selectedRecipientIds: parentSelectedRecipientIds,
// }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<
//     (string | number)[]
//   >(parentSelectedRecipientIds);

//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (
//     recipientId: string | number,
//     isChecked: boolean
//   ) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(
//         selectedRecipientIds.filter((id) => id !== recipientId)
//       );
//     }
//   };

//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   return (
//     <>
//       <h4 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//         Recipients
//       </h4>
//       <div className="pt-4 space-y-2">
//         {sampleRecipients.map((recipient) => (
//           <RecipientList
//             key={recipient.id}
//             recipient={recipient}
//             isSelected={isRecipientSelected(recipient.id)}
//             onCheckboxChange={handleCheckboxChange}
//           />
//         ))}
//         {selectedRecipientIds.length > 0 && (
//           <p className="mt-4 text-sm text-gray-500">
//             {selectedRecipientIds.length} recipient(s) selected.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Recipients; 




// // Latest Updated Code
// // components/Filter/Recipients.tsx
// import React, { useState, useEffect } from "react";
// import { sampleRecipients } from "../../../../data/transactions";
// import RecipientList from "../../RecipientList"; // Import the new RecipientListItem component

// interface RecipientsProps {
//   onRecipientSelectionChange?: (
//     selectedRecipientIds: (string | number)[]
//   ) => void;
//   selectedRecipientIds: (string | number)[];
// }

// const Recipients: React.FC<RecipientsProps> = ({
//   onRecipientSelectionChange,
//   selectedRecipientIds: parentSelectedRecipientIds,
// }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<
//     (string | number)[]
//   >(parentSelectedRecipientIds);

//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (
//     recipientId: string | number,
//     isChecked: boolean
//   ) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(
//         selectedRecipientIds.filter((id) => id !== recipientId)
//       );
//     }
//   };

//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   return (
//     <>
//       <h4 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//         Recipients
//       </h4>
//       <div className="pt-4 space-y-2">
//         {sampleRecipients.map((recipient) => (
//           <RecipientList
//             key={recipient.id}
//             recipient={recipient}
//             isSelected={isRecipientSelected(recipient.id)}
//             onCheckboxChange={handleCheckboxChange}
//           />
//         ))}
//         {selectedRecipientIds.length > 0 && (
//           <p className="mt-4 text-sm text-gray-500">
//             {selectedRecipientIds.length} recipient(s) selected.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Recipients;



// // components/Filter/Recipients.tsx
// import React, { useState, useEffect } from "react";
// import RecipientList from "../../RecipientList";
// import recipientService from "../../../../services/recipient"; // Import your recipient service
// import { useAuth } from "../../../../hooks/useAuth"; // Import useAuth hook

// interface RecipientsProps {
//   onRecipientSelectionChange?: (
//     selectedRecipientIds: (string | number)[]
//   ) => void;
//   selectedRecipientIds: (string | number)[];
// }

// const Recipients: React.FC<RecipientsProps> = ({
//   onRecipientSelectionChange,
//   selectedRecipientIds: parentSelectedRecipientIds,
// }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<
//     (string | number)[]
//   >(parentSelectedRecipientIds);
//   const [recipients, setRecipients] = useState([]); // State to store recipients from API
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth(); // Get the token from AuthContext

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         if (!token) {
//           setError("Authentication token is missing.");
//           setLoading(false);
//           return;
//         }
//         const data = await recipientService.getUserRecipients(token);
//         setRecipients(data);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message || "Failed to load recipients.");
//         setLoading(false);
//         console.error("Error fetching recipients:", err);
//       }
//     };

//     fetchRecipients();
//   }, [token]); // Fetch recipients when component mounts or token changes

//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (
//     recipientId: string | number,
//     isChecked: boolean
//   ) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(
//         selectedRecipientIds.filter((id) => id !== recipientId)
//       );
//     }
//   };

//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   if (loading) {
//     return <p>Loading recipients...</p>; // Or a loading spinner
//   }

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   return (
//     <>
//       <h4 className="text-gray font-medium relative after:content-[''] after:block after:w-full after:h-0.5 after:rounded-full after:bg-gray/20 after:mt-1">
//         Recipients
//       </h4>
//       <div className="pt-4 space-y-2">
//         {recipients.map((recipient: any) => ( // Type 'recipient' as 'any' initially, adjust if you have a specific type
//           <RecipientList
//             key={recipient._id} // Use _id from API data
//             recipient={recipient}
//             isSelected={isRecipientSelected(recipient._id)} // Use _id for selection
//             onCheckboxChange={handleCheckboxChange}
//           />
//         ))}
//         {selectedRecipientIds.length > 0 && (
//           <p className="mt-4 text-sm text-gray-500">
//             {selectedRecipientIds.length} recipient(s) selected.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Recipients;








// // components/Filter/Recipients.tsx
// import React, { useState, useEffect } from "react";
// import RecipientList from "../../RecipientList";
// import recipientService from "../../../../services/recipient"; // Import your recipient service
// import { useAuth } from "../../../../contexts/AuthContext"; // Import useAuth hook

// interface RecipientsProps {
//   onRecipientSelectionChange?: (
//     selectedRecipientIds: (string | number)[]
//   ) => void;
//   selectedRecipientIds: (string | number)[];
// }

// const Recipients: React.FC<RecipientsProps> = ({
//   onRecipientSelectionChange,
//   selectedRecipientIds: parentSelectedRecipientIds,
// }) => {
//   const [selectedRecipientIds, setSelectedRecipientIds] = useState<
//     (string | number)[]
//   >(parentSelectedRecipientIds);
//   const [recipients, setRecipients] = useState([]); // State to store recipients from API
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useAuth(); // Get the token from AuthContext

//   useEffect(() => {
//     const fetchRecipients = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         if (!token) {
//           setError("Authentication token is missing.");
//           setLoading(false);
//           return;
//         }
//         const data = await recipientService.getUserRecipients(token);
//         setRecipients(data);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message || "Failed to load recipients.");
//         setLoading(false);
//         console.error("Error fetching recipients:", err);
//       }
//     };

//     fetchRecipients();
//   }, [token]); // Fetch recipients when component mounts or token changes

//   useEffect(() => {
//     if (onRecipientSelectionChange) {
//       onRecipientSelectionChange(selectedRecipientIds);
//     }
//   }, [selectedRecipientIds, onRecipientSelectionChange]);

//   useEffect(() => {
//     setSelectedRecipientIds(parentSelectedRecipientIds);
//   }, [parentSelectedRecipientIds]);

//   const handleCheckboxChange = (
//     recipientId: string | number,
//     isChecked: boolean
//   ) => {
//     if (isChecked) {
//       setSelectedRecipientIds([...selectedRecipientIds, recipientId]);
//     } else {
//       setSelectedRecipientIds(
//         selectedRecipientIds.filter((id) => id !== recipientId)
//       );
//     }
//   };

//   const isRecipientSelected = (recipientId: string | number) => {
//     return selectedRecipientIds.includes(recipientId);
//   };

//   if (loading) {
//     return <p>Loading recipients...</p>; // Or a loading spinner
//   }

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   return (
//     <>
//       {recipients.length > 0 && (
//         <>
//           <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b">
//             Recipients
//           </h4>
//           <div className="space-y-2">
//             {recipients.map((recipient: any) => ( // Type 'recipient' as 'any' initially, adjust if you have a specific type
//               <RecipientList
//                 key={recipient._id} // Use _id from API data
//                 recipient={recipient}
//                 isSelected={isRecipientSelected(recipient._id)} // Use _id for selection
//                 onCheckboxChange={handleCheckboxChange}
//               />
//             ))}
//             {selectedRecipientIds.length > 0 && (
//               <p className="mt-4 text-sm dark:text-gray-300 text-gray-500">
//                 {selectedRecipientIds.length} recipient(s) selected.
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Recipients;

// components/Filter/Recipients.tsx
import React, { useState, useEffect } from "react";
import RecipientList from "../../RecipientList"; // Adjusted relative path assuming RecipientList is in ../../
import recipientService from "../../../../services/recipient";
import { useAuth } from "../../../../contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

interface RecipientData { // Define a type for your recipient data if possible
    _id: string | number;
    accountHolderName: string;
    accountNumber?: string;
    currency?: {
      code: string;
      flagImage?: string;
      currencyName?: string; // Optional based on your data
    };
    // Add other relevant fields
}

interface RecipientsProps {
  // Changed: This component now receives the currently selected IDs directly
  selectedRecipientIds: (string | number)[];
  // Changed: This component now calls this when selection changes *need* to happen
  onRecipientSelectionChange: (
    selectedRecipientIds: (string | number)[]
  ) => void;
}

const Recipients: React.FC<RecipientsProps> = ({
  selectedRecipientIds, // Use the prop directly
  onRecipientSelectionChange,
}) => {
  // Removed internal state: const [selectedRecipientIds, setSelectedRecipientIds] = useState(...)

  const [recipients, setRecipients] = useState<RecipientData[]>([]); // Use the defined type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRecipients = async () => {
      setLoading(true);
      setError(null);
      setRecipients([]); // Clear previous recipients
      try {
        if (!token) {
          setError("Authentication token is missing.");
          setLoading(false);
          return;
        }
        // Assuming service returns data conforming to RecipientData[]
        const data: RecipientData[] = await recipientService.getUserRecipients(token);
        setRecipients(data);
      } catch (err: any) {
        setError(err.message || "Failed to load recipients.");
        console.error("Error fetching recipients:", err);
      } finally {
         setLoading(false);
      }
    };

    fetchRecipients();
  }, [token]);

  // Removed useEffect that watched internal state

  // Removed useEffect that synced prop to internal state

  // Modified: This function now calculates the *new* state and calls the prop function
  const handleCheckboxChange = (
    recipientId: string | number,
    isChecked: boolean
  ) => {
    let newSelectedIds: (string | number)[];
    if (isChecked) {
      // Add the ID if it's not already there (safety check)
      newSelectedIds = selectedRecipientIds.includes(recipientId)
        ? selectedRecipientIds
        : [...selectedRecipientIds, recipientId];
    } else {
      // Remove the ID
      newSelectedIds = selectedRecipientIds.filter((id) => id !== recipientId);
    }
    // Call the callback provided by FilterModal to update *its* state
    onRecipientSelectionChange(newSelectedIds);
  };

  // Modified: Check against the prop directly
  const isRecipientSelected = (recipientId: string | number): boolean => {
    return selectedRecipientIds.includes(recipientId);
  };

  // Loading Skeleton
  if (loading) {
     return (
        <div>
          {/* Optional: Add a heading skeleton if needed */}
          {/* <Skeleton className="h-6 w-24 mb-3" /> */}
          <div className="space-y-2">
            {Array(3).fill(0).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-2 sm:p-4">
                    <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                    <div className="flex-grow space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-6 rounded" /> {/* Checkbox Skeleton */}
                </div>
             ))}
          </div>
        </div>
      );
  }

  if (error) {
    return (
        <div>
            <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
              Recipients
            </h4>
             <p className="text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded-md text-sm">Error loading recipients: {error}</p>
        </div>
      );
  }

  // Only render the section if recipients exist
  if (recipients.length === 0) {
      return null; // Don't render anything if no recipients fetched
  }

  return (
    <>
      {/* Keep the heading */}
      <h4 className="text-gray-500 dark:text-gray-300 font-medium mb-3 leading-8 border-b border-neutral-200 dark:border-neutral-700">
        Recipients
      </h4>
      <div className="space-y-2">
        {recipients.map((recipient) => (
          <RecipientList
            key={recipient._id}
            recipient={recipient}
            // Pass selection status based on the prop
            isSelected={isRecipientSelected(recipient._id)}
            // Pass the modified handler
            onCheckboxChange={handleCheckboxChange}
            // showCheckbox is implicitly true here, but you could pass it if needed elsewhere
          />
        ))}
        {/* Optional: Display selected count based on the prop */}
        {/* {selectedRecipientIds.length > 0 && (
          <p className="mt-4 text-sm dark:text-gray-300 text-gray-500">
            {selectedRecipientIds.length} recipient(s) selected.
          </p>
        )} */}
      </div>
    </>
  );
};

export default Recipients;