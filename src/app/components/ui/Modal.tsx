// // frontend/src/components/ui/Modal.js
// import React from 'react';
// import ReactDOM from 'react-dom';

// const Modal = ({ isOpen, children }) => {
//     if (!isOpen) return null;

//     return ReactDOM.createPortal(
//         <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//             <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                 <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//                 <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
//                 <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                         {children}
//                     </div>
//                 </div>
//             </div>
//         </div>,
//         document.getElementById('portal-root') // Make sure you have a <div id="portal-root"></div> in your root layout (e.g., body in _document.js or layout.js)
//     );
// };

// export default Modal;



// frontend/src/components/ui/Modal.tsx
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import ReactDOM from 'react-dom';

// 1. Define an interface for the component's props
interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode; // Use React.ReactNode for children
    // You could add other props here, like onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
    // 3. Use state to store the portal element, ensuring it's found client-side
    const [portalElement, setPortalElement] = useState<Element | null>(null);

    useEffect(() => {
        // Find the element only on the client-side after the component mounts
        // This prevents errors during Server-Side Rendering (SSR) where `document` doesn't exist
        const el = document.getElementById('portal-root');
        if (el) {
            setPortalElement(el);
        } else {
            // Log an error if the portal root is missing. Crucial for debugging.
            console.error("Modal: Portal root element with ID 'portal-root' not found in the DOM.");
        }
    }, []); // Empty dependency array means this effect runs once after initial mount

    // 2. Early return if modal shouldn't be open OR if the portal element hasn't been found yet
    if (!isOpen || !portalElement) {
        return null;
    }

    // 4. Render the portal using the state variable which is guaranteed to be an Element here
    return ReactDOM.createPortal(
        <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"> {/* Increased z-index just in case */}
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span> {/* Use HTML entity for zero-width space */}

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {children}
                    </div>
                    {/* You might want to add a standard place for close buttons or actions here */}
                    {/* Example:
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                            Close
                        </button>
                    </div>
                    */}
                </div>
            </div>
        </div>,
        portalElement // Use the state variable
    );
};

export default Modal;