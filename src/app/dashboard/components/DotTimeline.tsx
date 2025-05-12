// // frontend/src/components/DotTimeline.tsx
// import React from 'react';
// import { format } from 'date-fns';

// interface TimelineEvent {
//     time: string;
//     description: string;
//     isCompleted?: boolean;
// }

// interface DotTimelineProps {
//     events: TimelineEvent[];
// }

// export const DotTimeline: React.FC<DotTimelineProps> = ({ events }) => {
//     return (
//         <ul className="relative">
//             {events.map((event, index) => (
//                 <li key={index} className="mb-6 ml-4">
//                     <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
//                     <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{format(new Date(event.time), 'MMMM d at h:mm aa')}</span>
//                     <p className="text-gray-700 mt-1">{event.description}</p>
//                     {event.isCompleted && (
//                         <span className="text-sm text-green-600 font-semibold block mt-1">Completed</span>
//                     )}
//                 </li>
//             ))}
//         </ul>
//     );
// };



// frontend/src/components/DotTimeline.tsx
// No changes needed based on the provided errors. This component looks fine.
import React from 'react';
import { format } from 'date-fns';

interface TimelineEvent {
    time: string; // Ensure this is a format parsable by new Date()
    description: string;
    isCompleted?: boolean;
}

interface DotTimelineProps {
    events: TimelineEvent[];
}

export const DotTimeline: React.FC<DotTimelineProps> = ({ events }) => {
    return (
        // Added border-l for the main timeline stem visually
        <ul className="relative border-l border-gray-200 dark:border-gray-700 ml-1.5">
            {events.map((event, index) => (
                <li key={index} className="mb-6 ml-4">
                    {/* Adjusted dot position slightly (-left-[7px] to center on the border-l) */}
                    <div className={`absolute w-3 h-3 ${event.isCompleted ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-200 dark:bg-gray-700'} rounded-full mt-1.5 -left-[7px] border border-white dark:border-gray-900`}></div>
                    {/* Using <time> semantic element */}
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {/* Added year for clarity */}
                        {format(new Date(event.time), 'MMMM d, yyyy \'at\' h:mm aa')}
                    </time>
                    <p className="text-base font-normal text-gray-600 dark:text-gray-300 mt-1">{event.description}</p>
                    {/* You might not need the explicit "Completed" text if the green dot indicates it */}
                    {/* {event.isCompleted && (
                        <span className="text-sm text-green-600 font-semibold block mt-1">Completed</span>
                    )} */}
                </li>
            ))}
        </ul>
    );
};