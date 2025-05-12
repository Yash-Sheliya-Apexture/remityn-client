// // components/CustomCalendar.tsx
// import React, { useState, useEffect } from 'react';
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, getDaysInMonth, getMonth, getYear, isSameDay, isSameMonth, isToday, subMonths, addMonths, getDate } from 'date-fns';

// interface CustomCalendarProps {
//   onDateSelect: (date: Date) => void;
//   selectedDate: Date | null;
//   closeCalendar: () => void;
// }

// const CustomCalendar: React.FC<CustomCalendarProps> = ({ onDateSelect, selectedDate, closeCalendar }) => {
//   const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
//   const [month, setMonth] = useState(getMonth(currentDate));
//   const [year, setYear] = useState(getYear(currentDate));

//   useEffect(() => {
//     setCurrentDate(selectedDate || new Date());
//     setMonth(getMonth(selectedDate || new Date()));
//     setYear(getYear(selectedDate || new Date()));
//   }, [selectedDate]);


//   const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const getDaysOfMonth = () => {
//     const firstDayOfMonth = startOfMonth(new Date(year, month));
//     const lastDayOfMonth = endOfMonth(new Date(year, month));
//     const days = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

//     const paddingDaysStart = getDay(firstDayOfMonth); // Days to pad at the start of the month
//     const totalDays = days.length + paddingDaysStart;
//     const paddingDaysEnd = totalDays > 35 ? (42 - totalDays) : (35 - totalDays) ; // Days to pad at the end of the month to fill 6 weeks grid

//     const prevMonthDays = [];
//     const prevMonthLastDay = endOfMonth(subMonths(firstDayOfMonth, 1)); // Last day of the previous month

//     for (let i = 0; i < paddingDaysStart; i++) {
//         const day = getDate(prevMonthLastDay) - paddingDaysStart + i + 1; // Calculate day number
//         prevMonthDays.push(new Date(getYear(prevMonthLastDay), getMonth(prevMonthLastDay), day)); // Create Date object with calculated day
//     }


//     const nextMonthDays = [];
//     const nextMonthFirstDay = startOfMonth(addMonths(lastDayOfMonth, 1)); // First day of the next month
//     for (let i = 0; i < paddingDaysEnd; i++) {
//         const day = i + 1; // Days are just 1, 2, 3... for next month padding
//         nextMonthDays.push(new Date(getYear(nextMonthFirstDay), getMonth(nextMonthFirstDay), day)); // Create Date object
//     }


//     return [...prevMonthDays, ...days, ...nextMonthDays];
//   };

//   const days = getDaysOfMonth();

//   const handleDateClick = (day: Date) => {
//     onDateSelect(day);
//     closeCalendar(); // Close the calendar after date selection
//   };

//   const prevMonth = () => {
//     const newDate = subMonths(new Date(year, month), 1);
//     setMonth(getMonth(newDate));
//     setYear(getYear(newDate));
//     setCurrentDate(newDate);
//   };

//   const nextMonth = () => {
//     const newDate = addMonths(new Date(year, month), 1);
//     setMonth(getMonth(newDate));
//     setYear(getYear(newDate));
//     setCurrentDate(newDate);
//   };

//   return (
//     <div className="bg-white border border-main rounded-md shadow-md p-4 mt-2 absolute z-10">
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-md">
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
//         </button>
//         <span className="font-semibold">{format(new Date(year, month), 'MMMM yyyy')}</span>
//         <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-md">
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
//         </button>
//       </div>
//       <div className="grid grid-cols-7 gap-1 mb-2">
//         {daysInWeek.map((day, index) => (
//           <div key={index} className="text-center text-gray-500 text-sm">{day}</div>
//         ))}
//       </div>
//       <div className="grid grid-cols-7 gap-1">
//         {days.map((day, index) => (
//           <button
//             key={index}
//             onClick={() => handleDateClick(day)}
//             className={`py-1 px-2 rounded-md text-sm focus:outline-none hover:bg-gray-100
//                         ${isSameMonth(day, new Date(year, month)) ? 'text-gray-800' : 'text-gray-400'}
//                         ${isToday(day) && isSameMonth(day, new Date(year, month)) ? 'font-semibold' : ''}
//                         ${selectedDate && isSameDay(day, selectedDate) ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
//                         ${!isSameMonth(day, new Date(year, month)) ? 'opacity-50 cursor-default hover:bg-transparent' : 'cursor-pointer'}
//                       `}
//             disabled={!isSameMonth(day, new Date(year, month))}
//           >
//             {format(day, 'd')}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomCalendar;









// components/CustomCalendar.tsx
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, getMonth, getYear, isSameDay, isSameMonth, isToday, subMonths, addMonths, getDate } from 'date-fns';

interface CustomCalendarProps {
    onDateSelect: (date: Date) => void;
    selectedDate: Date | null;
    closeCalendar: () => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ onDateSelect, selectedDate, closeCalendar }) => {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
    const [month, setMonth] = useState(getMonth(currentDate));
    const [year, setYear] = useState(getYear(currentDate));

    useEffect(() => {
        setCurrentDate(selectedDate || new Date());
        setMonth(getMonth(selectedDate || new Date()));
        setYear(getYear(selectedDate || new Date()));
    }, [selectedDate]);


    const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysOfMonth = () => {
        const firstDayOfMonth = startOfMonth(new Date(year, month));
        const lastDayOfMonth = endOfMonth(new Date(year, month));
        const days = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

        const paddingDaysStart = getDay(firstDayOfMonth); // Days to pad at the start of the month
        const totalDays = days.length + paddingDaysStart;
        const paddingDaysEnd = totalDays > 35 ? (42 - totalDays) : (35 - totalDays) ; // Days to pad at the end of the month to fill 6 weeks grid

        const prevMonthDays = [];
        const prevMonthLastDay = endOfMonth(subMonths(firstDayOfMonth, 1)); // Last day of the previous month

        for (let i = 0; i < paddingDaysStart; i++) {
            const day = getDate(prevMonthLastDay) - paddingDaysStart + i + 1; // Calculate day number
            prevMonthDays.push(new Date(getYear(prevMonthLastDay), getMonth(prevMonthLastDay), day)); // Create Date object with calculated day
        }


        const nextMonthDays = [];
        const nextMonthFirstDay = startOfMonth(addMonths(lastDayOfMonth, 1)); // First day of the next month
        for (let i = 0; i < paddingDaysEnd; i++) {
            const day = i + 1; // Days are just 1, 2, 3... for next month padding
            nextMonthDays.push(new Date(getYear(nextMonthFirstDay), getMonth(nextMonthFirstDay), day)); // Create Date object
        }


        return [...prevMonthDays, ...days, ...nextMonthDays];
    };

    const days = getDaysOfMonth();

    const handleDateClick = (day: Date) => {
        onDateSelect(day);
        closeCalendar(); // Close the calendar after date selection
    };

    const prevMonth = () => {
        const newDate = subMonths(new Date(year, month), 1);
        setMonth(getMonth(newDate));
        setYear(getYear(newDate));
        setCurrentDate(newDate);
    };

    const nextMonth = () => {
        const newDate = addMonths(new Date(year, month), 1);
        setMonth(getMonth(newDate));
        setYear(getYear(newDate));
        setCurrentDate(newDate);
    };

    return (
        <div className="bg-white dark:bg-background sm:w-96 w-full rounded-2xl shadow border mt-2 p-4 absolute sm:left-20 left-0 z-10">
            <div className="flex justify-between items-center mb-4">
                <button onClick={prevMonth} className="p-2 hover:bg-primary text-main dark:hover:text-main dark:text-white transition-colors duration-300 ease-in-out cursor-pointer rounded-md">
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <span className="font-semibold">{format(new Date(year, month), 'MMMM yyyy')}</span>
                <button onClick={nextMonth} className="p-2 hover:bg-primary text-main dark:hover:text-main dark:text-white transition-colors duration-300 ease-in-out cursor-pointer rounded-md">
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {daysInWeek.map((day, index) => (
                    <div key={index} className="text-center text-main dark:text-white font-semibold text-sm">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
                {days.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => handleDateClick(day)}
                        className={`rounded-sm size-10 focus:outline-none
                            ${isSameMonth(day, new Date(year, month)) ? 'text-gray-500 dark:text-gray-300 font-medium' : 'text-gray'}
                            ${isToday(day) && isSameMonth(day, new Date(year, month)) ? 'font-semibold' : ''}
                            ${selectedDate && isSameDay(day, selectedDate) ? 'bg-primary text-white dark:text-main' : ''}
                            ${!isSameMonth(day, new Date(year, month)) ? 'opacity-50 cursor-default hover:bg-transparent' : 'cursor-pointer'}
                          `}
                        disabled={!isSameMonth(day, new Date(year, month))}
                    >
                        {format(day, 'd')}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CustomCalendar;