// // Latest Code Without Date Picker
// // components/DateInput.tsx
// import React from "react";

// interface DateInputProps {
//   placeholder: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const DateInput: React.FC<DateInputProps> = ({ placeholder, value, onChange }) => {
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Basic date validation can be done here if needed beyond HTML5 validation
//     const enteredValue = e.target.value;

//     // Example: You could add more complex validation here, like checking for valid date ranges, formats, etc.
//     // For now, we'll just pass the value directly to the onChange prop.

//     onChange(e); // Call the onChange prop to update the parent component's state
//   };

//   return (
//     <div>
//       <div className="relative mt-1">
//         <div className="bg-white border border-main rounded-lg shadow-sm focus:ring-0">
//           <div className=" flex items-center justify-between">
//             <input
//               type="date" // Changed input type to 'date' for date picker
//               className="block w-full px-3 py-3 text-gray-500 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 sm:text-sm border-none rounded-none shadow-none"
//               placeholder={placeholder}
//               value={value}
//               onChange={handleInputChange} // Use the handleInputChange function
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DateInput;





// // components/Filter/DateInput.tsx
// import React, { useState, useRef, useEffect } from "react";
// import CustomCalendar from "../../CustomCalendar";
// import { format } from 'date-fns';

// interface DateInputProps {
//     placeholder: string;
//     value: string;
//     onChange: (date: string) => void;
// }

// const DateInput: React.FC<DateInputProps> = ({ placeholder, value, onChange }) => {
//     const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//     const [selectedDate, setSelectedDate] = useState<Date | null>(value ? parseDateString(value) : null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     const calendarRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         setSelectedDate(value ? parseDateString(value) : null);
//     }, [value]);

//     const toggleCalendar = () => {
//         setIsCalendarOpen(!isCalendarOpen);
//     };

//     const closeCalendar = () => {
//         setIsCalendarOpen(false);
//     };

//     const handleDateSelect = (date: Date) => {
//         setSelectedDate(date);
//         const formattedDate = format(date, 'dd-MM-yyyy');
//         onChange(formattedDate);
//         closeCalendar();
//     };

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (isCalendarOpen && calendarRef.current && !calendarRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
//                 closeCalendar();
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isCalendarOpen]);


//     function parseDateString(dateString: string | null): Date | null {
//         if (!dateString) return null;
//         const parts = dateString.split('-');
//         if (parts.length === 3) {
//             const day = parseInt(parts[0], 10);
//             const month = parseInt(parts[1], 10) - 1;
//             const year = parseInt(parts[2], 10);
//             const date = new Date(year, month, day);
//             if (!isNaN(date.getTime())) {
//                 return date;
//             }
//         }
//         return null;
//     }


//     const displayValue = selectedDate ? format(selectedDate, 'dd-MM-yyyy') : '';


//     return (
//         <div className="relative">
//             <div className="relative mt-1">
//                 <div className="bg-white border border-main rounded-lg shadow-sm focus:ring-0">
//                     <div className=" flex items-center justify-between">
//                         <input
//                             ref={inputRef}
//                             type="text"
//                             className="block w-full px-3 py-3 text-gray-500 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 cursor-pointer"
//                             placeholder={placeholder}
//                             value={displayValue}
//                             onClick={toggleCalendar}
//                             readOnly
//                         />
//                     </div>
//                 </div>
//             </div>
//             {isCalendarOpen && (
//                 <div ref={calendarRef} style={{ zIndex: 10 }}>
//                     <CustomCalendar
//                         onDateSelect={handleDateSelect}
//                         selectedDate={selectedDate}
//                         closeCalendar={closeCalendar}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DateInput;


// components/Filter/DateInput.tsx
import React, { useState, useRef, useEffect } from "react";
import CustomCalendar from "../../CustomCalendar";
import { format } from 'date-fns';

interface DateInputProps {
    placeholder: string;
    value: string;
    onChange: (date: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ placeholder, value, onChange }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(value ? parseDateString(value) : null);
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedDate(value ? parseDateString(value) : null);
    }, [value]);

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const closeCalendar = () => {
        setIsCalendarOpen(false);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        const formattedDate = format(date, 'dd-MM-yyyy');
        onChange(formattedDate);
        closeCalendar();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isCalendarOpen && calendarRef.current && !calendarRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
                closeCalendar();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCalendarOpen]);


    function parseDateString(dateString: string | null): Date | null {
        if (!dateString) return null;
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            const date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return null;
    }


    const displayValue = selectedDate ? format(selectedDate, 'dd-MM-yyyy') : '';


    return (
        <div className="relative">
            <div className="relative mt-1">
                <div className="bg-white dark:bg-background">
                    <div className="flex items-center justify-between">
                        <input
                           ref={inputRef}
                            type="text"
                            className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none ease-linear duration-75 focus:border-[#5f5f5f]"
                            placeholder={placeholder}
                            value={displayValue}
                            onClick={toggleCalendar}
                            readOnly
                        />
                    </div>
                </div>
            </div>
            {isCalendarOpen && (
                <div ref={calendarRef} style={{ zIndex: 10 }}>
                    <CustomCalendar
                        onDateSelect={handleDateSelect}
                        selectedDate={selectedDate}
                        closeCalendar={closeCalendar}
                    />
                </div>
            )}
        </div>
    );
};

export default DateInput;