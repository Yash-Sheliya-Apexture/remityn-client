// // frontend/src/app/admin/components/FilterSidebar.tsx
// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";

// interface FilterSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onApplyFilters: (filters: any) => void;
//   onClearFilters: () => void;
//   filters: any;
// }

// const FilterSidebar: React.FC<FilterSidebarProps> = ({
//   isOpen,
//   onClose,
//   onApplyFilters,
//   onClearFilters,
//   filters: initialFilters,
// }) => {
//   const [localFilters, setLocalFilters] = useState(initialFilters);

//   useEffect(() => {
//     setLocalFilters(initialFilters); // Update local filters when initialFilters prop changes
//   }, [initialFilters]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setLocalFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setLocalFilters((prevFilters) => {
//       let updatedStatuses = [...prevFilters.status];
//       if (checked) {
//         updatedStatuses.push(value);
//       } else {
//         updatedStatuses = updatedStatuses.filter((status) => status !== value);
//       }
//       return { ...prevFilters, status: updatedStatuses };
//     });
//   };

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setLocalFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value ? new Date(value) : null, // Convert to Date object or null
//     }));
//   };

//   const applyFilters = () => {
//     onApplyFilters(localFilters);
//   };

//   const clearFilters = () => {
//     setLocalFilters({
//       transactionId: "",
//       user: "",
//       status: [],
//       startDate: null,
//       endDate: null,
//     });
//     onClearFilters(); // Call clear filters in parent to reset data if needed
//   };

//   const statusOptions = [
//     { value: "pending", label: "Pending" },
//     { value: "processing", label: "Processing" },
//     { value: "completed", label: "Completed" },
//     { value: "failed", label: "Failed" },
//     { value: "canceled", label: "Canceled" },
//   ];

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       <div className="p-6 relative">
//         <h2 className="text-xl font-semibold mb-4 text-main">
//           Filter Transfers
//         </h2>
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
//         >
//           <X size={20} />
//         </button>

//         {/* Filter Inputs */}
//         <div className="mb-4">
//           <label
//             htmlFor="transactionId"
//             className="block text-gray-700 text-sm font-bold mb-2"
//           >
//             Transaction ID
//           </label>
//           <input
//             type="text"
//             id="transactionId"
//             name="transactionId"
//             value={localFilters.transactionId}
//             onChange={handleInputChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="user"
//             className="block text-gray-700 text-sm font-bold mb-2"
//           >
//             User
//           </label>
//           <input
//             type="text"
//             id="user"
//             name="user"
//             value={localFilters.user}
//             onChange={handleInputChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Status
//           </label>
//           {statusOptions.map((option) => (
//             <div key={option.value} className="mb-2">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
//                   value={option.value}
//                   checked={localFilters.status.includes(option.value)}
//                   onChange={handleStatusChange}
//                 />
//                 <span className="ml-2 text-gray-700 capitalize">
//                   {option.label}
//                 </span>
//               </label>
//             </div>
//           ))}
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="startDate"
//             className="block text-gray-700 text-sm font-bold mb-2"
//           >
//             Start Date
//           </label>
//           <input
//             type="date"
//             id="startDate"
//             name="startDate"
//             value={
//               localFilters.startDate
//                 ? new Date(localFilters.startDate).toISOString().split("T")[0]
//                 : ""
//             }
//             onChange={handleDateChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="endDate"
//             className="block text-gray-700 text-sm font-bold mb-2"
//           >
//             End Date
//           </label>
//           <input
//             type="date"
//             id="endDate"
//             name="endDate"
//             value={
//               localFilters.endDate
//                 ? new Date(localFilters.endDate).toISOString().split("T")[0]
//                 : ""
//             }
//             onChange={handleDateChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         <div className="flex justify-end gap-4">
//           <button
//             onClick={clearFilters}
//             className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Clear
//           </button>
//           <button
//             onClick={applyFilters}
//             className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;



// frontend/src/app/admin/components/FilterSidebar.tsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

// Define a type for the filters object
interface FilterValues {
  transactionId: string;
  user: string;
  status: string[];
  startDate: Date | null;
  endDate: Date | null;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterValues) => void; // Use FilterValues type
  onClearFilters: () => void;
  filters: FilterValues; // Use FilterValues type
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  onClearFilters,
  filters: initialFilters,
}) => {
  // Initialize with the correct type
  const [localFilters, setLocalFilters] = useState<FilterValues>(initialFilters);

  useEffect(() => {
    setLocalFilters(initialFilters); // Update local filters when initialFilters prop changes
  }, [initialFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setLocalFilters((prevFilters) => {
      let updatedStatuses = [...prevFilters.status];
      if (checked) {
        updatedStatuses.push(value);
      } else {
        updatedStatuses = updatedStatuses.filter((status) => status !== value);
      }
      return { ...prevFilters, status: updatedStatuses };
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value ? new Date(value) : null, // Convert to Date object or null
    }));
  };

  const applyFilters = () => {
    onApplyFilters(localFilters);
  };

  const clearFilters = () => {
     // Use the FilterValues structure for clearing
    setLocalFilters({
      transactionId: "",
      user: "",
      status: [],
      startDate: null,
      endDate: null,
    });
    onClearFilters(); // Call clear filters in parent to reset data if needed
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
    { value: "canceled", label: "Canceled" },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 relative h-full flex flex-col"> {/* Added flex structure for button positioning */}
        <div className="flex-grow overflow-y-auto"> {/* Added scroll for content */}
          <h2 className="text-xl font-semibold mb-4 text-main">
            Filter Transfers
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close filters" // Added aria-label
          >
            <X size={20} />
          </button>

          {/* Filter Inputs */}
          <div className="mb-4">
            <label
              htmlFor="transactionId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              value={localFilters.transactionId}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="user"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              User
            </label>
            <input
              type="text"
              id="user"
              name="user"
              value={localFilters.user}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            {statusOptions.map((option) => (
              <div key={option.value} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                    value={option.value}
                    checked={localFilters.status.includes(option.value)}
                    onChange={handleStatusChange}
                  />
                  <span className="ml-2 text-gray-700 capitalize">
                    {option.label}
                  </span>
                </label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={
                localFilters.startDate instanceof Date // Check if it's a Date object
                  ? localFilters.startDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={handleDateChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6"> {/* Changed mb-4 to mb-6 */}
            <label
              htmlFor="endDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={
                 localFilters.endDate instanceof Date // Check if it's a Date object
                  ? localFilters.endDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={handleDateChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div> {/* End flex-grow */}

        {/* Buttons container */}
        <div className="mt-auto pt-4 border-t border-gray-200 flex justify-end gap-4"> {/* Stick buttons to bottom */}
          <button
            onClick={clearFilters}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Clear
          </button>
          <button
            onClick={applyFilters}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" // Assuming primary colors are defined in Tailwind config
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;