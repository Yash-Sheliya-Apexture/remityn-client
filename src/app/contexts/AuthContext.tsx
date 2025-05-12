// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { debounce } from 'lodash';

// const AuthContext = createContext();
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minute for testing
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();
//     const logoutTimerRef = useRef(null);
//     const broadcastChannel = typeof window !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

//     // Logout function using useRef to maintain stable reference
//     const logout = useCallback((isBroadcastLogout = false) => {
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         if (!isBroadcastLogout && broadcastChannel) {
//             broadcastChannel.postMessage('logout');
//         }
//     }, [broadcastChannel]);

//     // Store logout in ref to maintain stable reference
//     const logoutRef = useRef(logout);

//     // Update ref when logout changes
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         logout();
//         console.log('logoutDueToInactivity called - redirecting to login with autoLogout=true');

//         // Use window.location.href for a hard navigation instead of Next.js router
//         // This ensures the query parameter is properly passed and the page fully reloads
//         if (typeof window !== 'undefined') {
//             window.location.href = '/auth/login?autoLogout=true';
//         }
//     }, [logout]);

//     // Create the debounced function ONCE using useRef
//     const resetInactivityTimerRef = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             if (user && token) { // Only set timer if user is logged in
//                 logoutTimerRef.current = setTimeout(() => {
//                     logoutDueToInactivity();
//                 }, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     );

//     // Update the debounced function when dependencies change
//     useEffect(() => {
//         resetInactivityTimerRef.current = debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             if (user && token) { // Only set timer if user is logged in
//                 logoutTimerRef.current = setTimeout(() => {
//                     logoutDueToInactivity();
//                 }, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS);
//     }, [logoutDueToInactivity, user, token]);

//     // Stable resetInactivityTimer function that uses the ref
//     const resetInactivityTimer = useCallback(() => {
//         resetInactivityTimerRef.current();
//     }, []);

//     const login = useCallback((userData, authToken) => {
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         resetInactivityTimer();
//     }, [resetInactivityTimer]);

//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             setToken(storedToken);
//             try {
//                 setUser(JSON.parse(storedUser));
//             } catch (e) {
//                 setUser(null);
//                 localStorage.removeItem('user');
//             }
//         } else {
//             setUser(null);
//         }
//         setLoading(false);
//     }, []);

//     // Separate effect to start timer after user/token are set
//     useEffect(() => {
//         if (user && token) {
//             resetInactivityTimer();
//         }
//         return () => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         };
//     }, [user, token, resetInactivityTimer]);

//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event) => {
//             if (event.data === 'logout') {
//                 logoutRef.current(true);
//             }
//         };

//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//     }, [broadcastChannel]);

//     useEffect(() => {
//         if (!user || !token) return; // Only add listeners when logged in

//         const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         const handleActivity = resetInactivityTimer;

//         events.forEach(event => window.addEventListener(event, handleActivity));
//         return () => events.forEach(event => window.removeEventListener(event, handleActivity));
//     }, [resetInactivityTimer, user, token]);

//     const contextValue = {
//         user,
//         token,
//         loading,
//         login,
//         logout,
//     };

//     return (
//         <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
// export { AuthContext };

// 'use client'; // THIS LINE IS CRUCIAL - Mark this as a client component

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef,useMemo  } from 'react';
// import { useRouter } from 'next/navigation';
// import { debounce } from 'lodash';

// // Define a type for the User object for better type safety (as in your previous corrected code)
// interface User {
//     id: string;
//     fullName: string;
//     email: string;
//     role: string;
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     login: (userData: User, authToken: string) => void;
//     logout: () => void;
//     isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const router = useRouter();
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannel = typeof window !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

//     const logout = useCallback((isBroadcastLogout = false) => {
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         if (!isBroadcastLogout && broadcastChannel) {
//             broadcastChannel.postMessage('logout');
//         }
//     }, [broadcastChannel]);

//     const logoutRef = useRef(logout);

//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         logout();
//         console.log('logoutDueToInactivity called - redirecting to login with autoLogout=true');

//         if (typeof window !== 'undefined') {
//             window.location.href = '/auth/login?autoLogout=true';
//         }
//     }, [logout]);

//     const resetInactivityTimerRef = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             if (user && token) {
//                 logoutTimerRef.current = setTimeout(() => {
//                     logoutDueToInactivity();
//                 }, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     );

//     useEffect(() => {
//         resetInactivityTimerRef.current = debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             if (user && token) {
//                 logoutTimerRef.current = setTimeout(() => {
//                     logoutDueToInactivity();
//                 }, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS);
//     }, [logoutDueToInactivity, user, token]);

//     const resetInactivityTimer = useCallback(() => {
//         resetInactivityTimerRef.current();
//     }, []);

//     const login = useCallback((userData: User, authToken: string) => {
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         resetInactivityTimer();
//     }, [resetInactivityTimer]);

//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             setToken(storedToken);
//             try {
//                 setUser(JSON.parse(storedUser));
//             } catch (e) {
//                 setUser(null);
//                 localStorage.removeItem('user');
//             }
//         } else {
//             setUser(null);
//         }
//         setLoading(false);
//     }, []);

//     useEffect(() => {
//         if (user && token) {
//             resetInactivityTimer();
//         }
//         return () => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         };
//     }, [user, token, resetInactivityTimer]);

//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 logoutRef.current(true);
//             }
//         };

//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//     }, [broadcastChannel]);

//     useEffect(() => {
//         if (!user || !token) return;

//         const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         const handleActivity = resetInactivityTimer;

//         events.forEach(event => window.addEventListener(event, handleActivity));
//         return () => events.forEach(event => window.removeEventListener(event, handleActivity));
//     }, [resetInactivityTimer, user, token]);

//     const isAdmin = useMemo(() => user && user.role === 'admin', [user]);

//     const contextValue: AuthContextType = {
//         user,
//         token,
//         loading,
//         login,
//         logout,
//         isAdmin,
//     };

//     return (
//         <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>
//     );
// };

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export { AuthContext };

// 'use client'; // THIS LINE IS CRUCIAL - Mark this as a client component

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// // Remove useRouter import if using window.location.href for redirects
// // import { useRouter } from 'next/navigation';
// import { debounce } from 'lodash';
// import axios from 'axios'; // Import axios

// // Define a type for the User object
// interface User {
//     // Ensure your user object matches the structure returned by your backend login
//     _id: string; // Changed id to _id to match backend model typically
//     fullName: string;
//     email: string;
//     role: string;
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     login: (userData: User, authToken: string) => void;
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual') => void; // Add reason parameter
//     isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 24 * 60 * 60 * 1000; // 24 hours (matches token expiration) - Adjust as needed
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     // const router = useRouter(); // Remove if using window.location.href
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannel = typeof window !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

//     // Use a ref for logout to avoid stale closures in interceptors/timers
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});

//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;

//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         // Redirect to login page
//         if (typeof window !== 'undefined' && !isBroadcastLogout) { // Only redirect primary tab
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                  redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             // Use window.location.href for a full page reload, ensuring clean state
//             window.location.href = redirectUrl;
//         }
//     }, [broadcastChannel]);

//     // Keep the ref updated with the latest logout function
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out.');
//         logoutRef.current('inactivity');
//     }, []); // Dependency on logoutRef is implicit via the ref itself

//      // Debounced timer reset function using a ref
//      const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             // Only set timer if user is logged in
//             if (localStorage.getItem('token')) { // Check localStorage directly as state might not be updated yet
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000}s)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current; // Get the debounced function from the ref

//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; // Set auth header on login
//         resetInactivityTimerDebounced(); // Start inactivity timer on login
//     }, [resetInactivityTimerDebounced]); // Include dependency

//     // Effect to load initial state from localStorage
//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser = JSON.parse(storedUser);
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`; // Set auth header on initial load
//                 resetInactivityTimerDebounced(); // Start timer if logged in from storage
//             } catch (e) {
//                 console.error('Failed to parse stored user. Clearing auth state.');
//                 logoutRef.current('manual', true); // Logout without redirect if user data is corrupted
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization']; // Clear auth header if not logged in
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced]); // Add reset timer dependency

//     // Effect for Axios interceptor
//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response && error.response.status === 401) {
//                     // Check if the error is due to token issues (backend message helps)
//                     const errorMessage = error.response.data?.message || '';
//                      console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);
//                     // Trigger logout if token failed or no token provided
//                     if (errorMessage.includes('token failed') || errorMessage.includes('no token') || errorMessage.includes('User not found') ) {
//                        console.log('Detected token failure or missing token. Logging out.');
//                        logoutRef.current('sessionExpired'); // Use ref to call logout with reason
//                     } else {
//                         console.log('401 error, but not a token failure message. Passing error along.');
//                     }
//                 } else {
//                      console.log('Axios interceptor caught non-401 error or error without response.');
//                 }
//                 return Promise.reject(error); // Pass the error along for specific API call handling
//             }
//         );

//         // Clean up the interceptor when the component unmounts
//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // Empty dependency array: Run only once on mount

//     // Effect for broadcast channel listener
//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 // Call logout directly, ensuring it knows it's a broadcast event to prevent redirect loops
//                 logoutRef.current('manual', true);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//             // Consider closing the channel if appropriate, though usually not needed
//             // broadcastChannel.close();
//         };
//     }, [broadcastChannel]);

//     // Effect for user activity listeners
//     useEffect(() => {
//         // Only add listeners if the user is logged in
//         if (!user || !token) {
//             // Ensure timer is cleared if user logs out manually or token expires
//              if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             return;
//         };

//         console.log('Setting up user activity listeners.');
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'visibilitychange'];

//         const handleActivity = () => {
//             // console.log('User activity detected. Resetting inactivity timer.'); // Too noisy, comment out
//             resetInactivityTimerDebounced();
//         };

//         events.forEach(event => window.addEventListener(event, handleActivity, { passive: true }));

//         // Clean up listeners
//         return () => {
//             console.log('Removing user activity listeners.');
//             events.forEach(event => window.removeEventListener(event, handleActivity));
//              resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced call
//              if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current); // Clear the timer on cleanup
//                 console.log('Cleared inactivity timer on activity listener cleanup.');
//             }
//         };
//     }, [user, token, resetInactivityTimerDebounced]); // Rerun if user/token state changes

//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Provide the ref's current function
//         isAdmin,
//     }), [user, token, loading, login, isAdmin]); // Include login in dependencies

//     // Render children only when not loading initial state
//     return (
//         <AuthContext.Provider value={contextValue}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the auth context
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export { AuthContext }; // Export context for direct use if needed

// 'use client'; // THIS LINE IS CRUCIAL - Mark this as a client component

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// // Remove useRouter import if using window.location.href for redirects
// // import { useRouter } from 'next/navigation';
// import { debounce } from 'lodash';
// import axios from 'axios'; // Import axios

// // Define a type for the User object
// interface User {
//     // Ensure your user object matches the structure returned by your backend login
//     _id: string; // Changed id to _id to match backend model typically
//     fullName: string;
//     email: string;
//     role: string;
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     login: (userData: User, authToken: string) => void;
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual') => void; // Add reason parameter
//     isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// // --- START OF FIX ---
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes for inactivity logout
// // --- END OF FIX ---
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     // const router = useRouter(); // Remove if using window.location.href
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannel = typeof window !== 'undefined' ? new BroadcastChannel(BROADCAST_CHANNEL_NAME) : null;

//     // Use a ref for logout to avoid stale closures in interceptors/timers
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});

//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;

//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         // Redirect to login page
//         if (typeof window !== 'undefined' && !isBroadcastLogout) { // Only redirect primary tab
//             console.log('Redirection block entered.'); // Debugging log
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                  redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             // Use window.location.assign for redirection
//             window.location.assign(redirectUrl); // <-- CHANGED TO assign
//         }
//     }, [broadcastChannel]);

//     // Keep the ref updated with the latest logout function
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out due to inactivity.'); // Debugging log
//         logoutRef.current('inactivity');
//     }, []); // Dependency on logoutRef is implicit via the ref itself

//      // Debounced timer reset function using a ref
//      const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             // Only set timer if user is logged in
//             if (localStorage.getItem('token')) { // Check localStorage directly as state might not be updated yet
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000}s)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current; // Get the debounced function from the ref

//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; // Set auth header on login
//         resetInactivityTimerDebounced(); // Start inactivity timer on login
//     }, [resetInactivityTimerDebounced]); // Include dependency

//     // Effect to load initial state from localStorage
//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser = JSON.parse(storedUser);
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`; // Set auth header on initial load
//                 resetInactivityTimerDebounced(); // Start timer if logged in from storage
//             } catch (e) {
//                 console.error('Failed to parse stored user. Clearing auth state.');
//                 logoutRef.current('manual', true); // Logout without redirect if user data is corrupted
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization']; // Clear auth header if not logged in
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced]); // Add reset timer dependency

//     // Effect for Axios interceptor
//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response && error.response.status === 401) {
//                     // Check if the error is due to token issues (backend message helps)
//                     const errorMessage = error.response.data?.message || '';
//                      console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);
//                     // Trigger logout if token failed or no token provided
//                     if (errorMessage.includes('token failed') || errorMessage.includes('no token') || errorMessage.includes('User not found') ) {
//                        console.log('Detected token failure or missing token. Logging out.');
//                        logoutRef.current('sessionExpired'); // Use ref to call logout with reason
//                     } else {
//                         console.log('401 error, but not a token failure message. Passing error along.');
//                     }
//                 } else {
//                      console.log('Axios interceptor caught non-401 error or error without response.');
//                 }
//                 return Promise.reject(error); // Pass the error along for specific API call handling
//             }
//         );

//         // Clean up the interceptor when the component unmounts
//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // Empty dependency array: Run only once on mount

//     // Effect for broadcast channel listener
//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 // Call logout directly, ensuring it knows it's a broadcast event to prevent redirect loops
//                 logoutRef.current('manual', true);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//             // Consider closing the channel if appropriate, though usually not needed
//             // broadcastChannel.close();
//         };
//     }, [broadcastChannel]);

//     // Effect for user activity listeners
//     useEffect(() => {
//         // Only add listeners if the user is logged in
//         if (!user || !token) {
//             // Ensure timer is cleared if user logs out manually or token expires
//              if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             return;
//         };

//         console.log('Setting up user activity listeners.');
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'visibilitychange'];

//         const handleActivity = () => {
//             // console.log('User activity detected. Resetting inactivity timer.'); // Too noisy, comment out
//             resetInactivityTimerDebounced();
//         };

//         events.forEach(event => window.addEventListener(event, handleActivity, { passive: true }));

//         // Clean up listeners
//         return () => {
//             console.log('Removing user activity listeners.');
//             events.forEach(event => window.removeEventListener(event, handleActivity));
//              resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced call
//              if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current); // Clear the timer on cleanup
//                 console.log('Cleared inactivity timer on activity listener cleanup.');
//             }
//         };
//     }, [user, token, resetInactivityTimerDebounced]); // Rerun if user/token state changes

//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Provide the ref's current function
//         isAdmin,
//     }), [user, token, loading, login, isAdmin]); // Include login in dependencies

//     // Render children only when not loading initial state
//     return (
//         <AuthContext.Provider value={contextValue}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the auth context
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export { AuthContext }; // Export context for direct use if needed

// 'use client'; // THIS LINE IS CRUCIAL - Mark this as a client component

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// // Remove useRouter import if using window.location.href for redirects
// // import { useRouter } from 'next/navigation';
// import { debounce } from 'lodash';
// import axios from 'axios'; // Import axios

// // Define a type for the User object
// interface User {
//     // Ensure your user object matches the structure returned by your backend login
//     _id: string; // Changed id to _id to match backend model typically
//     fullName: string;
//     email: string;
//     role: string;
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     login: (userData: User, authToken: string) => void;
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual') => void; // Add reason parameter
//     isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes for inactivity logout
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     // const router = useRouter(); // Remove if using window.location.href
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     // --- START OF FIX 1: Memoize broadcastChannel ---
//     // Memoize the broadcast channel initialization to prevent it from causing
//     // dependency changes in useCallback/useEffect hooks on every render.
//     const broadcastChannel = useMemo(() => {
//         if (typeof window !== 'undefined') {
//             console.log('Initializing BroadcastChannel:', BROADCAST_CHANNEL_NAME);
//             return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         }
//         return null;
//     }, []); // Empty dependency array ensures it's created only once client-side
//     // --- END OF FIX 1 ---

//     // Use a ref for logout to avoid stale closures in interceptors/timers
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});

//     // --- START OF FIX 1 (Explanation): The `logout` function depends on `broadcastChannel`.
//     // By memoizing `broadcastChannel` above, this useCallback hook now has stable dependencies.
//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete axios.defaults.headers.common['Authorization']; // Clear auth header on logout

//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         // Redirect to login page - only if not triggered by broadcast
//         if (typeof window !== 'undefined' && !isBroadcastLogout) {
//             console.log('Redirection block entered.'); // Debugging log
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                  redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             // Use window.location.assign for redirection
//             window.location.assign(redirectUrl);
//         }
//     }, [broadcastChannel]); // Dependency on broadcastChannel is now stable
//     // --- END OF FIX 1 (Explanation) ---

//     // Keep the ref updated with the latest logout function
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out due to inactivity.'); // Debugging log
//         logoutRef.current('inactivity');
//     }, []); // Dependency on logoutRef is implicit via the ref itself

//      // Debounced timer reset function using a ref
//      const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             // Only set timer if user is logged in
//             if (localStorage.getItem('token')) { // Check localStorage directly
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000}s)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;

//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; // Set auth header on login
//         resetInactivityTimerDebounced(); // Start inactivity timer on login
//     }, [resetInactivityTimerDebounced]);

//     // Effect to load initial state from localStorage
//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser = JSON.parse(storedUser);
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`; // Set auth header on initial load
//                 resetInactivityTimerDebounced(); // Start timer if logged in from storage
//             // --- START OF FIX 2: Use the error variable in catch block ---
//             } catch (error) { // Changed 'e' to 'error' and log it
//                 console.error('Failed to parse stored user. Clearing auth state.', error);
//             // --- END OF FIX 2 ---
//                 logoutRef.current('manual', true); // Logout without redirect if user data is corrupted
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             // Ensure auth state is cleared if nothing found
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization'];
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced]); // Add reset timer dependency

//     // Effect for Axios interceptor
//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 // Check specifically for 401 Unauthorized
//                 if (error.response && error.response.status === 401) {
//                     const errorMessage = error.response.data?.message || '';
//                     console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);

//                     // Check if we actually have a token stored. If not, it's not a session expiry issue.
//                     const currentToken = localStorage.getItem('token');
//                     if (!currentToken) {
//                         console.log('Caught 401, but no token was stored. Likely accessing protected route while logged out.');
//                          // Don't automatically logout here, let the route handler manage redirection.
//                          // Or, if preferred, redirect manually:
//                          // if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth/login')) {
//                          //    window.location.assign('/auth/login?unauthorized=true');
//                          // }
//                     }
//                     // If a token *is* present, then a 401 likely means it's invalid/expired
//                     else if (errorMessage.includes('token failed') || errorMessage.includes('User not found') || errorMessage.includes('Invalid token')) {
//                        console.log('Detected token failure or invalid token with 401. Logging out.');
//                        logoutRef.current('sessionExpired'); // Use ref to call logout with reason
//                     }
//                      // Handle 'no token' case specifically if backend sends it despite interceptor checking `currentToken`
//                      else if (errorMessage.includes('no token')) {
//                           console.log('Caught 401 with "no token" message, but a token might exist locally? Logging out to be safe.');
//                           logoutRef.current('sessionExpired');
//                      }
//                     else {
//                         console.log('401 error, but not a recognized token failure message. Passing error along.');
//                     }
//                 } else if (error.message === 'Network Error') {
//                      console.error('Network Error caught by interceptor. Could not connect to the server.');
//                      // Optionally handle network errors (e.g., show a notification)
//                 }
//                  else {
//                      console.log('Axios interceptor caught non-401 error or error without response.', error);
//                 }
//                 return Promise.reject(error); // Pass the error along
//             }
//         );

//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // Run only once on mount

//     // Effect for broadcast channel listener
//     // --- START OF FIX 1 (Explanation): This useEffect depends on `broadcastChannel`.
//     // By memoizing `broadcastChannel`, this hook now has stable dependencies.
//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 // Call logout directly, marking it as a broadcast event
//                 logoutRef.current('manual', true);
//             } else if (event.data === 'login') {
//                  // Optional: Handle login broadcast if needed (e.g., refresh data in other tabs)
//                  console.log('Received login message via BroadcastChannel. Reloading state from localStorage.');
//                  // Force reload from localStorage to sync state (might cause brief flicker)
//                  const storedToken = localStorage.getItem('token');
//                  const storedUser = localStorage.getItem('user');
//                  if (storedToken && storedUser) {
//                      try {
//                         const parsedUser = JSON.parse(storedUser);
//                         setUser(parsedUser);
//                         setToken(storedToken);
//                         axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                         resetInactivityTimerDebounced(); // Start timer in this tab too
//                      } catch (error) {
//                         console.error('Failed to parse stored user after broadcast login.', error);
//                         logoutRef.current('manual', true);
//                      }
//                  }
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//             // Avoid closing the channel here, as other instances might still use it.
//             // It will be garbage collected when all references are gone.
//         };
//     }, [broadcastChannel, resetInactivityTimerDebounced]); // Dependency now stable. Added reset timer dependency.
//     // --- END OF FIX 1 (Explanation) ---

//     // Effect for user activity listeners
//     useEffect(() => {
//         // Only add listeners if the user is logged in
//         if (!user || !token) {
//              if (logoutTimerRef.current) {
//                  clearTimeout(logoutTimerRef.current);
//                  logoutTimerRef.current = null; // Clear timer ref
//                  console.log('Cleared inactivity timer because user is not logged in.');
//              }
//             return; // No need for listeners or timer if not logged in
//         };

//         console.log('Setting up user activity listeners.');
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'visibilitychange'];

//         // Handler that resets the debounced timer function
//         const handleActivity = () => {
//             // console.log('User activity detected. Resetting inactivity timer.'); // Keep commented unless debugging noise
//             resetInactivityTimerDebounced();
//         };

//         // Initial timer start when listeners are added (covers page load/login)
//         resetInactivityTimerDebounced();

//         events.forEach(event => window.addEventListener(event, handleActivity, { passive: true }));

//         // Clean up listeners and the timer itself
//         return () => {
//             console.log('Removing user activity listeners.');
//             events.forEach(event => window.removeEventListener(event, handleActivity));
//              resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced call
//              if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current); // Clear the active timer
//                 logoutTimerRef.current = null; // Clear timer ref
//                 console.log('Cleared inactivity timer on activity listener cleanup.');
//             }
//         };
//     }, [user, token, resetInactivityTimerDebounced]); // Rerun if user/token state changes

//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Provide the ref's current function
//         isAdmin,
//     }), [user, token, loading, login, isAdmin]); // Include login and isAdmin

//     // Render children only when not loading initial state
//     return (
//         <AuthContext.Provider value={contextValue}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the auth context
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export { AuthContext }; // Export context for direct use if needed

// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// import { debounce } from 'lodash';
// import axios from 'axios';

// // Define a type for the User object
// interface User {
//     _id: string;
//     fullName: string; // Assuming this field exists based on previous context
//     email: string;
//     role: string; // 'admin' or other roles
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean; // Renamed from loadingAuth if that was intended
//     login: (userData: User, authToken: string) => void;
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual') => void;
//     isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes for inactivity logout
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce activity checks

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true); // This is the loading state
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//     // Memoize BroadcastChannel to stabilize dependencies
//     const broadcastChannel = useMemo(() => {
//         if (typeof window !== 'undefined') {
//             console.log('Initializing BroadcastChannel:', BROADCAST_CHANNEL_NAME);
//             return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         }
//         return null;
//     }, []);

//     // Use a ref for logout to avoid stale closures
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});

//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete axios.defaults.headers.common['Authorization'];

//         // Broadcast logout to other tabs
//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         // Redirect only if not a broadcast logout and running in browser
//         if (typeof window !== 'undefined' && !isBroadcastLogout) {
//             console.log('Redirection block entered for logout.');
//             let redirectUrl = '/auth/login'; // Ensure this path is correct
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                  redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             window.location.assign(redirectUrl); // Use assign for redirection
//         }
//     }, [broadcastChannel]); // Stable dependency

//     // Keep logoutRef updated
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out due to inactivity.');
//         logoutRef.current('inactivity');
//     }, []); // No external dependencies needed here

//     // Debounced timer reset function
//     const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//             // Only set timer if user is actually logged in (check state or localStorage)
//             if (localStorage.getItem('token')) { // More reliable check
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             } else {
//                  console.log('Attempted to reset inactivity timer, but user is not logged in.');
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current; // .current gives the debounced function

//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         // Broadcast login to other tabs
//         if (broadcastChannel) {
//             console.log('Broadcasting login message');
//             broadcastChannel.postMessage('login');
//         }

//         resetInactivityTimerDebounced(); // Start/reset inactivity timer on login
//     }, [broadcastChannel, resetInactivityTimerDebounced]); // Add dependencies

//     // Effect to load initial state from localStorage
//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         setLoading(true); // Start loading
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser: User = JSON.parse(storedUser);
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                 resetInactivityTimerDebounced(); // Start timer
//             } catch (error) {
//                 console.error('Failed to parse stored user. Clearing auth state.', error);
//                 // Call logout directly to clear state, mark as broadcast to prevent redirect loop if other tabs exist
//                 logoutRef.current('manual', true);
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             // Ensure clean state if nothing found
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization'];
//         }
//         setLoading(false); // Finish loading
//     // Include resetInactivityTimerDebounced in dependency array
//     }, [resetInactivityTimerDebounced]);

//     // Effect for Axios response interceptor
//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response,
//             (error) => {
//                 if (error.response && error.response.status === 401) {
//                     const errorMessage = error.response.data?.message || error.message || '';
//                     console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);
//                     const currentToken = localStorage.getItem('token');

//                     if (!currentToken) {
//                         console.log('Caught 401, but no token was stored locally. User likely needs to log in.');
//                         // Decide if redirection is needed here or handled by page/component logic
//                     } else {
//                         // If a token exists, 401 strongly implies it's invalid/expired
//                         console.log('Detected likely token failure (401 with existing local token). Logging out.');
//                         logoutRef.current('sessionExpired'); // Use ref for logout
//                     }
//                 } else if (error.message === 'Network Error') {
//                      console.error('Network Error caught by interceptor. Server connection failed.');
//                      // Potentially show a global notification about connection issues
//                 } else {
//                      console.log('Axios interceptor caught non-401 error or error without response:', error);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // Run only once

//     // Effect for broadcast channel listener
//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 // Logout this tab without causing another broadcast or redirect
//                 logoutRef.current('manual', true);
//             } else if (event.data === 'login') {
//                  console.log('Received login message via BroadcastChannel. Reloading state.');
//                  // Reload state from localStorage to sync
//                  const storedToken = localStorage.getItem('token');
//                  const storedUser = localStorage.getItem('user');
//                  setLoading(true); // Indicate loading during sync
//                  if (storedToken && storedUser) {
//                      try {
//                         const parsedUser = JSON.parse(storedUser);
//                         setUser(parsedUser);
//                         setToken(storedToken);
//                         axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                         resetInactivityTimerDebounced(); // Start timer in this tab
//                      } catch (error) {
//                         console.error('Failed to parse stored user after broadcast login.', error);
//                         logoutRef.current('manual', true); // Logout if sync fails
//                      }
//                  } else {
//                      // If login broadcast received but no data found, logout this tab
//                      console.warn("Login broadcast received, but no auth data found in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  }
//                  setLoading(false);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//         };
//         // Add resetInactivityTimerDebounced as dependency
//     }, [broadcastChannel, resetInactivityTimerDebounced]);

//     // Effect for user activity listeners
//     useEffect(() => {
//         // Only attach listeners and timer if logged in
//         if (!token || !user) {
//             // Clear any existing timer if user logs out
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//                 logoutTimerRef.current = null;
//                 console.log('Cleared inactivity timer (user logged out).');
//             }
//             return;
//         }

//         console.log('Setting up user activity listeners.');
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'visibilitychange'];

//         const handleActivity = () => {
//             // console.log('Activity detected'); // Reduce console noise
//             resetInactivityTimerDebounced();
//         };

//         // Start the timer initially when listeners are added
//         resetInactivityTimerDebounced();

//         events.forEach(event => window.addEventListener(event, handleActivity, { passive: true }));

//         return () => {
//             console.log('Removing user activity listeners.');
//             events.forEach(event => window.removeEventListener(event, handleActivity));
//             resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced call
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current); // Clear the active timer
//                 logoutTimerRef.current = null;
//                 console.log('Cleared inactivity timer on cleanup.');
//             }
//         };
//         // Rerun when login state changes or the debounced function ref changes (should be stable)
//     }, [user, token, resetInactivityTimerDebounced]);

//     // Memoize isAdmin check
//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // Memoize context value
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading, // Use the correct 'loading' state
//         login,
//         logout: logoutRef.current, // Provide the stable logout function via ref
//         isAdmin,
//     }), [user, token, loading, login, isAdmin]); // Add dependencies

//     // Don't render children until initial loading from localStorage is complete
//     return (
//         <AuthContext.Provider value={contextValue}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the auth context
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) { // Check for undefined specifically
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Export context for potential direct use (though hook is preferred)
// export { AuthContext };

// 'use client';

// import React from 'react';
// import { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// // Ensure you have run: npm install --save-dev @types/lodash OR yarn add --dev @types/lodash
// import debounce from 'lodash/debounce'; // Keep original import, but ensure types are installed
// // Alternatively, try: import { debounce } from 'lodash';
// import axios from 'axios';

// // Define a type for the User object
// interface User {
//     name: string;
//     _id: string;
//     fullName: string; // Assuming this field exists based on previous context
//     email: string;
//     role: string; // 'admin' or other roles
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     login: (userData: User, authToken: string) => void;
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void; // Added optional flag type
//     isAdmin: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes for inactivity logout
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce activity checks

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//     const broadcastChannel = useMemo(() => {
//         if (typeof window !== 'undefined') {
//             console.log('Initializing BroadcastChannel:', BROADCAST_CHANNEL_NAME);
//             return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         }
//         return null;
//     }, []);

//     const logoutRef = useRef<AuthContextType['logout']>(() => {});

//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) {
//             // FIX: clearTimeout takes only one argument
//             clearTimeout(logoutTimerRef.current);
//         }
//         logoutTimerRef.current = null;
//         delete axios.defaults.headers.common['Authorization'];

//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         if (typeof window !== 'undefined' && !isBroadcastLogout) {
//             console.log('Redirection block entered for logout.');
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                  redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             window.location.assign(redirectUrl);
//         }
//     }, [broadcastChannel]);

//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out due to inactivity.');
//         logoutRef.current('inactivity');
//     }, []); // logoutRef is stable, dependency not strictly needed but harmless

//     const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) {
//                 // FIX: clearTimeout takes only one argument
//                 clearTimeout(logoutTimerRef.current);
//             }
//             if (localStorage.getItem('token')) {
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             } else {
//                  console.log('Attempted to reset inactivity timer, but user is not logged in.');
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;

//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData));
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         if (broadcastChannel) {
//             console.log('Broadcasting login message');
//             broadcastChannel.postMessage('login');
//         }

//         resetInactivityTimerDebounced();
//     }, [broadcastChannel, resetInactivityTimerDebounced]);

//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser: User = JSON.parse(storedUser);
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                 resetInactivityTimerDebounced();
//             } catch (error) {
//                 console.error('Failed to parse stored user. Clearing auth state.', error);
//                 // Call logout via ref, mark as broadcast to prevent redirect loop
//                 logoutRef.current('manual', true);
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization'];
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced, logoutRef]); // Added logoutRef dependency

//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response,
//             (error) => {
//                 if (error.response && error.response.status === 401) {
//                     const errorMessage = error.response.data?.message || error.message || '';
//                     console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);
//                     const currentToken = localStorage.getItem('token');

//                     if (!currentToken) {
//                         console.log('Caught 401, but no token was stored locally. User likely needs to log in.');
//                     } else {
//                         console.log('Detected likely token failure (401 with existing local token). Logging out.');
//                         logoutRef.current('sessionExpired'); // Use ref for logout
//                     }
//                 } else if (error.message === 'Network Error') {
//                      console.error('Network Error caught by interceptor. Server connection failed.');
//                 } else {
//                      console.log('Axios interceptor caught non-401 error or error without response:', error);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, [logoutRef]);

//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 logoutRef.current('manual', true);
//             } else if (event.data === 'login') {
//                  console.log('Received login message via BroadcastChannel. Reloading state.');
//                  const storedToken = localStorage.getItem('token');
//                  const storedUser = localStorage.getItem('user');
//                  setLoading(true);
//                  if (storedToken && storedUser) {
//                      try {
//                         const parsedUser = JSON.parse(storedUser);
//                         setUser(parsedUser);
//                         setToken(storedToken);
//                         axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                         resetInactivityTimerDebounced();
//                      } catch (error) {
//                         console.error('Failed to parse stored user after broadcast login.', error);
//                         logoutRef.current('manual', true);
//                      }
//                  } else {
//                      console.warn("Login broadcast received, but no auth data found in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  }
//                  setLoading(false);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//         };
//     }, [broadcastChannel, resetInactivityTimerDebounced, logoutRef]);

//     useEffect(() => {
//         if (!token || !user) {
//             if (logoutTimerRef.current) {
//                 // FIX: clearTimeout takes only one argument
//                 clearTimeout(logoutTimerRef.current);
//                 logoutTimerRef.current = null;
//                 console.log('Cleared inactivity timer (user logged out).');
//             }
//             return;
//         }

//         console.log('Setting up user activity listeners.');
//         const events: (keyof WindowEventMap | string)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'visibilitychange'];

//         const handleActivity = () => {
//             resetInactivityTimerDebounced();
//         };

//         resetInactivityTimerDebounced();

//         events.forEach(event => window.addEventListener(event as keyof WindowEventMap, handleActivity, { passive: true })); // Cast to satisfy TS for string union

//         return () => {
//             console.log('Removing user activity listeners.');
//             events.forEach(event => window.removeEventListener(event as keyof WindowEventMap, handleActivity)); // Cast to satisfy TS for string union
//             resetInactivityTimerDebounced.cancel();
//             if (logoutTimerRef.current) {
//                 // FIX: clearTimeout takes only one argument
//                 clearTimeout(logoutTimerRef.current);
//                 logoutTimerRef.current = null;
//                 console.log('Cleared inactivity timer on cleanup.');
//             }
//         };
//     }, [user, token, resetInactivityTimerDebounced]);

//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current,
//         isAdmin,
//     }), [user, token, loading, login, isAdmin, logoutRef]);

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export { AuthContext };

// 'use client';

// import React from 'react';
// import { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// // Ensure you have run: npm install --save-dev @types/lodash OR yarn add --dev @types/lodash
// import debounce from 'lodash/debounce'; // Keep original import, but ensure types are installed
// // Alternatively, try: import { debounce } from 'lodash';
// import axios from 'axios';
// // ... imports (React, useState, useEffect, etc.)
// import { useRouter } from 'next/navigation'; // Import useRouter

// // Define a type for the User object
// interface User {
//     name: string;
//     _id: string;
//     fullName: string; // Assuming this field exists based on previous context
//     email: string;
//     role: string; // 'admin' or 'user'
//     kycStatus: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped'; // Add KYC status
//     kycRejectionReason?: string | null; // Optional rejection reason
// }

// interface AuthContextType {
//     user: User | null;
//     token: string | null;
//     loading: boolean;
//     login: (userData: User, authToken: string) => void;
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void; // Added optional flag type
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>; // Add a function to refetch user data if needed
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes for inactivity logout
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce activity checks

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//     const broadcastChannel = useMemo(() => {
//         if (typeof window !== 'undefined') {
//             console.log('Initializing BroadcastChannel:', BROADCAST_CHANNEL_NAME);
//             return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         }
//         return null;
//     }, []);

//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter(); // <<< Add useRouter

//      // --- Logout Function (Consider KYC redirection logic here too) ---
//      const logout = useCallback(/* ... existing logout logic ... */ (reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         if (logoutTimerRef.current) {
//             clearTimeout(logoutTimerRef.current);
//         }
//         logoutTimerRef.current = null;
//         delete axios.defaults.headers.common['Authorization'];

//         if (!isBroadcastLogout && broadcastChannel) {
//             console.log('Broadcasting logout message');
//             broadcastChannel.postMessage('logout');
//         }

//         // Redirect logic depends on whether it's a broadcast or direct logout
//         if (typeof window !== 'undefined' && !isBroadcastLogout) {
//             let redirectUrl = '/auth/login'; // Default redirect
//             if (reason === 'sessionExpired') {
//                 redirectUrl += '?sessionExpired=true';
//             } else if (reason === 'inactivity') {
//                 redirectUrl += '?autoLogout=true';
//             }
//             console.log(`Redirecting to: ${redirectUrl}`);
//             // Use router.push for Next.js navigation instead of window.location.assign
//             router.push(redirectUrl);
//         }
//     }, [broadcastChannel, router]); // <<< Add router dependency

//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached. Logging out due to inactivity.');
//         logoutRef.current('inactivity');
//     }, []); // logoutRef is stable, dependency not strictly needed but harmless

//     const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) {
//                 // FIX: clearTimeout takes only one argument
//                 clearTimeout(logoutTimerRef.current);
//             }
//             if (localStorage.getItem('token')) {
//                 console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                 logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             } else {
//                  console.log('Attempted to reset inactivity timer, but user is not logged in.');
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;

//     // --- Login Function ---
//     const login = useCallback((userData: User, authToken: string) => {
//         console.log('Logging in user:', userData.email, 'KYC Status:', userData.kycStatus);
//         setUser(userData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         localStorage.setItem('user', JSON.stringify(userData)); // Store updated user object
//         axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         if (broadcastChannel) {
//             console.log('Broadcasting login message');
//             broadcastChannel.postMessage('login');
//         }

//         // --- KYC Redirection Logic ---
//         // Redirect based on KYC status AFTER successful login
//         // This logic might be better placed in a component that consumes the context
//         // or immediately after the login call completes in the login page.
//         // We'll handle redirection in the login page effect for clarity.

//         resetInactivityTimerDebounced();
//     }, [broadcastChannel, resetInactivityTimerDebounced]);

//     // --- Add Refetch User Function ---
//     // Useful if KYC status changes and needs to be updated without full re-login
//     const refetchUser = useCallback(async () => {
//         const storedToken = localStorage.getItem('token');
//         if (!storedToken) {
//             console.log("Refetch failed: No token found.");
//             logoutRef.current('sessionExpired', true); // Logout if token is missing
//             return;
//         }
//         try {
//             setLoading(true);
//              // Assume you have an endpoint like /api/users/me to get current user data
//              // This endpoint MUST return the updated User structure including kycStatus
//             const response = await axios.get('/api/users/me', { // CREATE THIS ENDPOINT
//                  headers: { Authorization: `Bearer ${storedToken}` }
//             });
//             const updatedUserData: User = response.data;
//             console.log("Refetched user data:", updatedUserData);
//             setUser(updatedUserData);
//             localStorage.setItem('user', JSON.stringify(updatedUserData));
//             setLoading(false);
//         } catch (error) {
//             console.error("Failed to refetch user data:", error);
//             // If refetch fails (e.g., 401), log out
//             logoutRef.current('sessionExpired'); // Trigger logout with redirect
//             setLoading(false);
//         }
//     }, [logoutRef]);

//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser: User = JSON.parse(storedUser);
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                 resetInactivityTimerDebounced();
//             } catch (error) {
//                 console.error('Failed to parse stored user. Clearing auth state.', error);
//                 // Call logout via ref, mark as broadcast to prevent redirect loop
//                 logoutRef.current('manual', true);
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization'];
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced, logoutRef]); // Added logoutRef dependency

//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = axios.interceptors.response.use(
//             (response) => response,
//             (error) => {
//                 if (error.response && error.response.status === 401) {
//                     const errorMessage = error.response.data?.message || error.message || '';
//                     console.log(`Axios interceptor caught 401. Message: "${errorMessage}"`);
//                     const currentToken = localStorage.getItem('token');

//                     if (!currentToken) {
//                         console.log('Caught 401, but no token was stored locally. User likely needs to log in.');
//                     } else {
//                         console.log('Detected likely token failure (401 with existing local token). Logging out.');
//                         logoutRef.current('sessionExpired'); // Use ref for logout
//                     }
//                 } else if (error.message === 'Network Error') {
//                      console.error('Network Error caught by interceptor. Server connection failed.');
//                 } else {
//                      console.log('Axios interceptor caught non-401 error or error without response:', error);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, [logoutRef]);

//     useEffect(() => {
//         if (!broadcastChannel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 logoutRef.current('manual', true);
//             } else if (event.data === 'login') {
//                  console.log('Received login message via BroadcastChannel. Reloading state.');
//                  const storedToken = localStorage.getItem('token');
//                  const storedUser = localStorage.getItem('user');
//                  setLoading(true);
//                  if (storedToken && storedUser) {
//                      try {
//                         const parsedUser = JSON.parse(storedUser);
//                         setUser(parsedUser);
//                         setToken(storedToken);
//                         axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                         resetInactivityTimerDebounced();
//                      } catch (error) {
//                         console.error('Failed to parse stored user after broadcast login.', error);
//                         logoutRef.current('manual', true);
//                      }
//                  } else {
//                      console.warn("Login broadcast received, but no auth data found in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  }
//                  setLoading(false);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         broadcastChannel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             broadcastChannel.removeEventListener('message', handleBroadcastMessage);
//         };
//     }, [broadcastChannel, resetInactivityTimerDebounced, logoutRef]);

//     useEffect(() => {
//         console.log('AuthProvider mounting. Checking localStorage...');
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('user');

//         if (storedToken && storedUser) {
//             console.log('Found token and user in localStorage.');
//             setToken(storedToken);
//             try {
//                 const parsedUser: User = JSON.parse(storedUser);
//                 // Ensure kycStatus exists, provide default if upgrading from old structure
//                 if (!parsedUser.kycStatus) {
//                     parsedUser.kycStatus = 'not_started';
//                 }
//                 setUser(parsedUser);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                 resetInactivityTimerDebounced();
//             } catch (error) {
//                 console.error('Failed to parse stored user. Clearing auth state.', error);
//                 logoutRef.current('manual', true);
//             }
//         } else {
//             console.log('No token/user found in localStorage.');
//              // Ensure user/token are null if nothing is stored
//             setUser(null);
//             setToken(null);
//             delete axios.defaults.headers.common['Authorization'];
//         }
//         setLoading(false);
//     }, [resetInactivityTimerDebounced]); // Removed logoutRef dep here as it's stable

//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current,
//         isAdmin,
//         refetchUser, // Provide refetch function
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Added refetchUser

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {/* Don't render children until loading is false */}
//             {!loading ? children : <p>Loading application...</p>} {/* Or a global spinner */}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// export { AuthContext };

// // frontend/src/app/contexts/AuthContext.tsx
// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// import debounce from 'lodash/debounce';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import apiConfig from '../config/apiConfig'; // Ensure path is correct

// // Define a type for the User object (matching backend structure)
// export interface User {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kyc: { // Embed the KYC subdocument structure
//         status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//         rejectionReason?: string | null;
//         // Include other KYC fields if needed directly in AuthContext user state
//         // firstName?: string;
//         // lastName?: string;
//     };
//     createdAt: string; // Or Date
//     updatedAt: string; // Or Date
// }

// // Simpler type for context value, deriving kycStatus/Reason
// interface UserContextState {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kycStatus: User['kyc']['status']; // Derived status
//     kycRejectionReason?: string | null; // Derived reason
// }

// interface AuthContextType {
//     user: UserContextState | null; // Use the simpler state type here
//     token: string | null;
//     loading: boolean;
//     login: (backendUser: User, authToken: string) => void; // Expect full User object from backend
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void;
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500;

// // Axios instance configured for API calls
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<UserContextState | null>(null); // Store simplified state
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter();

//     // Initialize BroadcastChannel only once on the client
//     useEffect(() => {
//         if (typeof window !== 'undefined' && !broadcastChannelRef.current) {
//             console.log('Initializing BroadcastChannel:', BROADCAST_CHANNEL_NAME);
//             broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         }
//         // Cleanup function to close the channel
//         return () => {
//             if (broadcastChannelRef.current) {
//                 console.log('Closing BroadcastChannel');
//                 broadcastChannelRef.current.close();
//                 broadcastChannelRef.current = null;
//             }
//         };
//     }, []);

//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         const wasLoggedIn = !!localStorage.getItem('token'); // Check if user was actually logged in before clearing

//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user'); // Clear stored user data
//         if (logoutTimerRef.current) {
//             clearTimeout(logoutTimerRef.current);
//         }
//         logoutTimerRef.current = null;
//         delete apiClient.defaults.headers.common['Authorization']; // Clear token from axios instance

//         // Broadcast logout only if it wasn't triggered by a broadcast message
//         if (!isBroadcastLogout && broadcastChannelRef.current) {
//             console.log('Broadcasting logout message');
//             try {
//                 broadcastChannelRef.current.postMessage('logout');
//             } catch (error) {
//                 console.error("Broadcast channel postMessage error:", error);
//             }
//         }

//         // Redirect logic: only redirect if the logout wasn't from a broadcast
//         // and if the user was actually logged in before this call.
//         if (typeof window !== 'undefined' && !isBroadcastLogout && wasLoggedIn) {
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') redirectUrl += '?sessionExpired=true';
//             else if (reason === 'inactivity') redirectUrl += '?autoLogout=true';
//             console.log(`Redirecting to: ${redirectUrl}`);
//             router.push(redirectUrl); // Use Next.js router
//         }
//     }, [router]); // No dependency on broadcastChannelRef as it's stable via useRef

//     // Keep logout function reference up-to-date
//     useEffect(() => {
//         logoutRef.current = logout;
//     }, [logout]);

//     const logoutDueToInactivity = useCallback(() => {
//         console.log('Inactivity timeout reached.');
//         logoutRef.current('inactivity');
//     }, []); // logoutRef is stable

//     // Debounced function to reset the inactivity timer
//     const resetInactivityTimerDebounced = useRef(
//         debounce(() => {
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//             }
//             // Only reset timer if a token exists (user is logged in)
//             if (localStorage.getItem('token')) {
//                  // console.log(`Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                  logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;

//      // Login function: Expects the full User object from the backend
//      const login = useCallback((backendUser: User, authToken: string) => {
//         if (!backendUser || !backendUser._id || !backendUser.kyc) {
//              console.error("Login failed: Invalid user data received from backend.", backendUser);
//              // Optionally logout or show an error
//              logoutRef.current('manual', true); // Logout without redirect
//              return;
//         }
//         console.log('AuthContext: Logging in user:', backendUser.email, 'KYC Status:', backendUser.kyc.status);

//         // Prepare the simplified state for the context
//         const userContextData: UserContextState = {
//             _id: backendUser._id,
//             fullName: backendUser.fullName,
//             email: backendUser.email,
//             role: backendUser.role,
//             kycStatus: backendUser.kyc.status,
//             kycRejectionReason: backendUser.kyc.rejectionReason,
//         };

//         setUser(userContextData);
//         setToken(authToken);
//         localStorage.setItem('token', authToken);
//         // Store the full backend user object in localStorage for rehydration
//         localStorage.setItem('user', JSON.stringify(backendUser));

//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; // Set token for axios instance

//         if (broadcastChannelRef.current) {
//             console.log('Broadcasting login message');
//              try { broadcastChannelRef.current.postMessage('login'); } catch (e) { console.error(e); }
//         }

//         resetInactivityTimerDebounced(); // Start inactivity timer
//         // Redirection logic is handled in the login page component after calling login()
//     }, [resetInactivityTimerDebounced]); // Removed broadcastChannelRef dep

//      // Function to refetch user data from the backend
//      const refetchUser = useCallback(async () => {
//         const storedToken = localStorage.getItem('token');
//         if (!storedToken) {
//             console.log("Refetch failed: No token found.");
//             // logoutRef.current('sessionExpired', true); // Logout without redirect if no token
//             return;
//         }
//         console.log("AuthContext: Refetching user data...");
//         setLoading(true); // Indicate loading during refetch
//         try {
//             // Use the specific /api/dashboard/users/me endpoint
//             const response = await apiClient.get<User>('/dashboard/users/me', {
//                  headers: { Authorization: `Bearer ${storedToken}` }
//             });
//             const updatedBackendUser: User = response.data;

//             if (!updatedBackendUser || !updatedBackendUser._id || !updatedBackendUser.kyc) {
//                  throw new Error("Invalid user data structure received from /users/me");
//             }

//             console.log("Refetched user data:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);

//              // Prepare simplified state
//              const userContextData: UserContextState = {
//                 _id: updatedBackendUser._id,
//                 fullName: updatedBackendUser.fullName,
//                 email: updatedBackendUser.email,
//                 role: updatedBackendUser.role,
//                 kycStatus: updatedBackendUser.kyc.status,
//                 kycRejectionReason: updatedBackendUser.kyc.rejectionReason,
//             };

//             setUser(userContextData); // Update context state
//             // Update the full user object in localStorage
//             localStorage.setItem('user', JSON.stringify(updatedBackendUser));

//         } catch (error: any) {
//             console.error("Failed to refetch user data:", error.response?.data || error.message);
//             // If refetch fails (e.g., 401 Unauthorized), log the user out
//             if (error.response?.status === 401) {
//                 logoutRef.current('sessionExpired'); // Logout with redirect
//             }
//         } finally {
//             setLoading(false); // Finish loading indicator
//         }
//     }, []); // Removed logoutRef dep

//     // Effect for initializing state from localStorage on mount
//     useEffect(() => {
//         console.log('AuthProvider initializing...');
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         const storedUserString = localStorage.getItem('user');
//         let initialUser: UserContextState | null = null;

//         if (storedToken && storedUserString) {
//             console.log('Found token and user in localStorage.');
//             try {
//                 const parsedBackendUser: User = JSON.parse(storedUserString);
//                  // Validate essential fields after parsing
//                 if (parsedBackendUser?._id && parsedBackendUser?.kyc) {
//                     // Prepare the simplified state
//                      initialUser = {
//                         _id: parsedBackendUser._id,
//                         fullName: parsedBackendUser.fullName,
//                         email: parsedBackendUser.email,
//                         role: parsedBackendUser.role,
//                         kycStatus: parsedBackendUser.kyc.status || 'not_started', // Default if missing
//                         kycRejectionReason: parsedBackendUser.kyc.rejectionReason,
//                     };
//                     setToken(storedToken);
//                     apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                     resetInactivityTimerDebounced(); // Start timer
//                 } else {
//                      throw new Error("Stored user data is incomplete or invalid.");
//                 }
//             } catch (error) {
//                 console.error('Failed to parse stored user data. Clearing auth state.', error);
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('user');
//                 // No need to call logout here, state is already null initially
//             }
//         } else {
//             console.log('No valid token/user found in localStorage.');
//             // Ensure defaults are null
//             setToken(null);
//             delete apiClient.defaults.headers.common['Authorization'];
//         }

//         setUser(initialUser); // Set the initial user state
//         setLoading(false); // Initial load complete
//         console.log('AuthProvider initialization complete. Loading:', false, 'User:', initialUser?.email || 'null');
//     }, [resetInactivityTimerDebounced]); // Only depends on the timer reset function

//      // Effect for handling Axios 401 errors
//     useEffect(() => {
//         console.log('Setting up Axios response interceptor.');
//         const responseInterceptor = apiClient.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response?.status === 401) {
//                     console.log(`Axios interceptor caught 401: ${error.config.url}`);
//                     // Check if the error was on the '/users/me' refetch endpoint specifically
//                     // to avoid logout loops if the initial token load fails validation immediately.
//                     const isRefetchError = error.config.url?.endsWith('/dashboard/users/me');

//                     // Only trigger logout if a token *was* present, indicating a likely expired/invalid token
//                     if (localStorage.getItem('token')) {
//                         console.log('Detected token failure (401). Logging out.');
//                         // Trigger logout *with* redirect if it's not an immediate refetch error upon loading
//                         logoutRef.current('sessionExpired', isRefetchError);
//                     } else {
//                          console.log('Caught 401, but no token was present locally.');
//                     }
//                 } else {
//                      // console.log('Axios interceptor caught non-401 error:', error);
//                 }
//                 return Promise.reject(error); // Important to reject the promise
//             }
//         );

//         // Cleanup function to eject the interceptor
//         return () => {
//             console.log('Ejecting Axios response interceptor.');
//             apiClient.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // No dependency on logoutRef needed

//     // Effect for handling BroadcastChannel messages
//     useEffect(() => {
//         const channel = broadcastChannelRef.current; // Get the current channel instance
//         if (!channel) return; // Exit if channel is not initialized

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('Received logout message via BroadcastChannel.');
//                 // Call logout but mark as broadcast to prevent redirect loop
//                 logoutRef.current('manual', true);
//             } else if (event.data === 'login') {
//                  console.log('Received login message via BroadcastChannel. Reloading state from localStorage.');
//                  // Re-read from localStorage as the source of truth after another tab logged in
//                  const storedToken = localStorage.getItem('token');
//                  const storedUserString = localStorage.getItem('user');
//                  setLoading(true);
//                  if (storedToken && storedUserString) {
//                      try {
//                         const parsedBackendUser: User = JSON.parse(storedUserString);
//                          if (parsedBackendUser?._id && parsedBackendUser?.kyc) {
//                              const userContextData: UserContextState = { /* ... prepare state ... */
//                                 _id: parsedBackendUser._id,
//                                 fullName: parsedBackendUser.fullName,
//                                 email: parsedBackendUser.email,
//                                 role: parsedBackendUser.role,
//                                 kycStatus: parsedBackendUser.kyc.status || 'not_started',
//                                 kycRejectionReason: parsedBackendUser.kyc.rejectionReason,
//                              };
//                             setUser(userContextData);
//                             setToken(storedToken);
//                             apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//                             resetInactivityTimerDebounced();
//                          } else { throw new Error("Invalid stored user data on broadcast login."); }
//                      } catch (error) {
//                         console.error('Failed to process stored data after broadcast login.', error);
//                         logoutRef.current('manual', true); // Logout this tab if data is bad
//                      }
//                  } else {
//                      console.warn("Login broadcast received, but no auth data found in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true); // Logout if data is missing
//                  }
//                  setLoading(false);
//             }
//         };

//         console.log('Adding BroadcastChannel message listener.');
//         channel.addEventListener('message', handleBroadcastMessage);
//         // Cleanup listener on unmount or channel change
//         return () => {
//             console.log('Removing BroadcastChannel message listener.');
//             channel.removeEventListener('message', handleBroadcastMessage);
//         };
//     }, [resetInactivityTimerDebounced]); // Removed broadcastChannelRef dep, depends on timer

//     // Add activity listeners to reset the timer
//     useEffect(() => {
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         console.log('Adding activity listeners for inactivity timer.');
//         events.forEach(event => window.addEventListener(event, resetInactivityTimerDebounced));

//         // Cleanup listeners
//         return () => {
//             console.log('Removing activity listeners.');
//             events.forEach(event => window.removeEventListener(event, resetInactivityTimerDebounced));
//             resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced calls
//         };
//     }, [resetInactivityTimerDebounced]);

//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // Memoize the context value
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Provide the stable logout function
//         isAdmin,
//         refetchUser,
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Added refetchUser dependency

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {/* Optionally show a global loading indicator */}
//             {loading ? <GlobalLoadingIndicator /> : children}
//         </AuthContext.Provider>
//     );
// };

// // Hook to use the auth context
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Simple global loading component (optional)
// const GlobalLoadingIndicator = () => (
//      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
//          <p>Loading Application...</p>
//          {/* You could use a spinner icon here */}
//      </div>
//  );

// export { AuthContext }; // Export context for direct consumption if needed

// // frontend/src/app/contexts/AuthContext.tsx
// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// import debounce from 'lodash/debounce';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import apiConfig from '../config/apiConfig'; // Ensure path is correct
// import { Loader2 } from 'lucide-react'; // For loading indicator

// // --- Types ---

// // Full User object structure from backend (used internally for fetching)
// export interface User {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kyc: {
//         status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//         rejectionReason?: string | null;
//     };
//     createdAt: string; // Or Date
//     updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context
// // IMPORTANT: This is now only held in React state, NOT localStorage
// interface UserContextState {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kycStatus: User['kyc']['status'];
//     kycRejectionReason?: string | null;
// }

// // AuthContext structure
// interface AuthContextType {
//     user: UserContextState | null; // Still holds the user data in React state
//     token: string | null;          // Token is still managed
//     loading: boolean;              // Indicates if auth state is being determined (fetching user)
//     login: (backendUser: User, authToken: string) => void; // Login still receives full user initially
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void;
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>; // Function to manually refresh user data
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for activity listener

// // --- Axios Instance ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<UserContextState | null>(null); // User data in React state
//     const [token, setToken] = useState<string | null>(null);          // Token in React state
//     const [loading, setLoading] = useState<boolean>(true);           // Initial loading is true
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter();

//     // Initialize BroadcastChannel
//     useEffect(() => {
//         if (typeof window !== 'undefined' && !broadcastChannelRef.current) {
//             try {
//                 broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//                  console.log('BroadcastChannel initialized:', BROADCAST_CHANNEL_NAME);
//             } catch (error) {
//                  console.error("Failed to initialize BroadcastChannel:", error);
//             }
//         }
//         return () => {
//             if (broadcastChannelRef.current) {
//                 broadcastChannelRef.current.close();
//                 broadcastChannelRef.current = null;
//                  console.log('BroadcastChannel closed.');
//             }
//         };
//     }, []);

//     // --- Logout Function ---
//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         const wasLoggedIn = !!localStorage.getItem('token'); // Check *before* clearing

//         // Clear React state
//         setUser(null);
//         setToken(null);

//         // Clear localStorage (only token)
//         localStorage.removeItem('token');

//         // Clear timer and Axios header
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete apiClient.defaults.headers.common['Authorization'];

//         // Broadcast if not caused by broadcast
//         if (!isBroadcastLogout && broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting logout message');
//             try { broadcastChannelRef.current.postMessage('logout'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         // Redirect if appropriate
//         if (typeof window !== 'undefined' && !isBroadcastLogout && wasLoggedIn) {
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') redirectUrl += '?sessionExpired=true';
//             else if (reason === 'inactivity') redirectUrl += '?autoLogout=true';
//             console.log(`AuthContext: Redirecting to: ${redirectUrl}`);
//             router.push(redirectUrl);
//         }
//     }, [router]); // router dependency

//     // Keep logout reference updated
//     useEffect(() => { logoutRef.current = logout; }, [logout]);

//     // --- Inactivity Handling ---
//     const logoutDueToInactivity = useCallback(() => {
//         console.log('AuthContext: Inactivity timeout reached.');
//         logoutRef.current('inactivity');
//     }, []); // Stable ref

//     // Debounced function to reset inactivity timer
//     const resetInactivityTimerDebounced = useRef(
//         debounce((currentToken: string | null) => { // Pass current token to check
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//             }
//             // Only reset timer if a token exists
//             if (currentToken) {
//                  // console.log(`AuthContext: Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                  logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;

//     // --- Refetch User Data ---
//     // Used for manual refreshes or broadcast updates
//     const refetchUser = useCallback(async () => {
//         const currentToken = token; // Use token from state
//         if (!currentToken) {
//             console.log("AuthContext: Refetch skipped - no token in state.");
//             if (user !== null) setUser(null); // Ensure user state is cleared if no token
//             return;
//         }
//         console.log("AuthContext: Refetching user data manually...");
//         setLoading(true); // Indicate loading
//         try {
//             const response = await apiClient.get<User>('/dashboard/users/me', {
//                  headers: { Authorization: `Bearer ${currentToken}` }
//             });
//             const updatedBackendUser: User = response.data;
//             if (!updatedBackendUser?._id || !updatedBackendUser?.kyc) {
//                  throw new Error("Invalid user data structure received from /users/me");
//             }
//             console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);
//              const userContextData: UserContextState = {
//                 _id: updatedBackendUser._id,
//                 fullName: updatedBackendUser.fullName,
//                 email: updatedBackendUser.email,
//                 role: updatedBackendUser.role,
//                 kycStatus: updatedBackendUser.kyc.status,
//                 kycRejectionReason: updatedBackendUser.kyc.rejectionReason,
//              };
//             setUser(userContextData); // Update context state
//         } catch (error: any) {
//             console.error("AuthContext: Failed to refetch user data:", error.response?.data?.message || error.message);
//              if (error.response?.status === 401) {
//                 logoutRef.current('sessionExpired'); // Logout with redirect
//              }
//              // Consider clearing user state on other errors too?
//              // else { setUser(null); }
//         } finally {
//             setLoading(false); // Finish loading indicator
//         }
//     }, [token, user]); // Depends on current token and user state

//     // --- Login Function ---
//     const login = useCallback((backendUser: User, authToken: string) => {
//         if (!backendUser?._id || !backendUser?.kyc) {
//              console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//              logoutRef.current('manual', true); // Logout without redirect
//              return;
//         }
//         console.log('AuthContext: Logging in user:', backendUser.email, 'KYC Status:', backendUser.kyc.status);

//         const userContextData: UserContextState = {
//             _id: backendUser._id,
//             fullName: backendUser.fullName,
//             email: backendUser.email,
//             role: backendUser.role,
//             kycStatus: backendUser.kyc.status,
//             kycRejectionReason: backendUser.kyc.rejectionReason,
//         };

//         // Update React state
//         setUser(userContextData);
//         setToken(authToken);

//         // Store ONLY token in localStorage
//         localStorage.setItem('token', authToken);

//         // Set Axios header
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         // Broadcast login
//         if (broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting login message');
//              try { broadcastChannelRef.current.postMessage('login'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         resetInactivityTimerDebounced(authToken); // Pass token to timer reset
//     }, [resetInactivityTimerDebounced]); // Dependencies

//     // --- Initialization Effect (Mount) ---
//     useEffect(() => {
//         console.log('AuthProvider: Initializing state (Mount)...');
//         let isMounted = true; // Flag to prevent state updates after unmount
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');

//         const initializeAuth = async () => {
//             if (storedToken && isMounted) {
//                 console.log('AuthProvider: Found token. Setting token state and fetching user.');
//                 // Set token in state and Axios header *before* fetching
//                 setToken(storedToken);
//                 apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

//                 try {
//                     console.log('AuthProvider: Fetching initial user data...');
//                     // Fetch user data *directly* using the token/header set above
//                     const response = await apiClient.get<User>('/dashboard/users/me');
//                     const fetchedUser: User = response.data;

//                     if (!fetchedUser?._id || !fetchedUser?.kyc) {
//                         throw new Error("Invalid user data structure during init.");
//                     }

//                     if (isMounted) {
//                         const userContextData: UserContextState = {
//                             _id: fetchedUser._id,
//                             fullName: fetchedUser.fullName,
//                             email: fetchedUser.email,
//                             role: fetchedUser.role,
//                             kycStatus: fetchedUser.kyc.status,
//                             kycRejectionReason: fetchedUser.kyc.rejectionReason,
//                         };
//                         setUser(userContextData);
//                         console.log('AuthProvider: Initial user fetch successful.');
//                         resetInactivityTimerDebounced(storedToken); // Start timer after successful fetch
//                     }
//                 } catch (error: any) {
//                     console.error("AuthProvider: Failed to fetch user during init:", error.response?.data?.message || error.message);
//                     if (isMounted) {
//                          // Clear potentially invalid token and state if initial fetch fails
//                         localStorage.removeItem('token');
//                         setToken(null);
//                         setUser(null);
//                         delete apiClient.defaults.headers.common['Authorization'];
//                     }
//                      // Redirect if 401 during init, preventing loops
//                      if (error.response?.status === 401 && typeof window !== 'undefined') {
//                         // Avoid redirecting if already on login page
//                         if (!window.location.pathname.startsWith('/auth/login')) {
//                              console.log("AuthProvider: Redirecting to login due to 401 during init fetch.");
//                              router.push('/auth/login?sessionExpired=true');
//                         }
//                      }
//                 } finally {
//                      if (isMounted) {
//                         console.log("AuthProvider: Initial fetch process complete, setting loading false.");
//                         setLoading(false);
//                      }
//                 }
//             } else {
//                 console.log('AuthProvider: No token found.');
//                 if (isMounted) {
//                      // Ensure clean state if no token
//                      setUser(null);
//                      setToken(null);
//                      delete apiClient.defaults.headers.common['Authorization'];
//                      setLoading(false); // No fetch needed, loading finished
//                 }
//             }
//         };

//         initializeAuth();

//         // Cleanup function
//         return () => {
//             console.log("AuthProvider: Unmounting initialization effect.");
//             isMounted = false;
//         };

//     // Run only once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Empty dependency array for mount effect

//     // --- Axios 401 Interceptor ---
//     useEffect(() => {
//         console.log('AuthProvider: Setting up Axios response interceptor.');
//         const responseInterceptor = apiClient.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response?.status === 401) {
//                     const requestUrl = error.config?.url || 'Unknown URL';
//                     console.log(`Axios interceptor caught 401: ${requestUrl}`);
//                     // Check if a token was actually present when the 401 occurred
//                     // Using localStorage check is okay here for quick verification
//                     if (localStorage.getItem('token')) {
//                         console.log('AuthProvider: Detected token failure (401). Logging out.');
//                         // Use 'sessionExpired' to trigger appropriate message on login page
//                         logoutRef.current('sessionExpired'); // Always redirect on 401 if token was present
//                     } else {
//                          console.log('AuthProvider: Caught 401, but no token was present locally. Ignoring logout.');
//                     }
//                 }
//                 return Promise.reject(error); // Important to reject the promise
//             }
//         );
//         return () => {
//             console.log('AuthProvider: Ejecting Axios response interceptor.');
//             apiClient.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // No dependency on logoutRef needed as it uses the stable ref

//     // --- BroadcastChannel Listener ---
//     useEffect(() => {
//         const channel = broadcastChannelRef.current;
//         if (!channel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('AuthProvider: Received logout message via BroadcastChannel.');
//                  if (user !== null) { // Only logout if currently logged in this tab
//                      logoutRef.current('manual', true); // Logout this tab without redirect
//                  }
//             } else if (event.data === 'login') {
//                  console.log('AuthProvider: Received login message via BroadcastChannel.');
//                  const currentLocalToken = localStorage.getItem('token');
//                  // Refetch if:
//                  // 1. This tab has no token but localStorage now does.
//                  // 2. This tab's token differs from localStorage's token.
//                  if (currentLocalToken && (!token || token !== currentLocalToken)) {
//                      console.log("AuthProvider: Token mismatch or missing locally after login broadcast. Updating token and refetching user.");
//                      setToken(currentLocalToken); // Update local token state first
//                      apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentLocalToken}`;
//                      refetchUser(); // Fetch user for the new token
//                  } else if (!currentLocalToken && token) {
//                      // Logged in this tab, but localStorage cleared? Logout this tab.
//                      console.warn("AuthProvider: Login broadcast, but no token in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  } else if (currentLocalToken && token === currentLocalToken && !user) {
//                      // Token matches, but user state is somehow null? Refetch.
//                      console.log("AuthProvider: Token matches after login broadcast, but user state is null. Refetching.");
//                      refetchUser();
//                  }
//             }
//         };

//         console.log('AuthProvider: Adding BroadcastChannel message listener.');
//         channel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('AuthProvider: Removing BroadcastChannel message listener.');
//             if (channel) { // Check if channel still exists before removing listener
//                 channel.removeEventListener('message', handleBroadcastMessage);
//             }
//         };
//     }, [user, token, refetchUser]); // Dependencies

//     // --- Inactivity Event Listeners ---
//     useEffect(() => {
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         // Create the function inside useEffect to capture the current token value
//         const resetTimer = () => resetInactivityTimerDebounced(token);
//         // console.log('AuthProvider: Adding activity listeners.');
//         events.forEach(event => window.addEventListener(event, resetTimer));
//         return () => {
//             // console.log('AuthProvider: Removing activity listeners.');
//             events.forEach(event => window.removeEventListener(event, resetTimer));
//             resetInactivityTimerDebounced.cancel(); // Cancel pending debounced calls
//         };
//     }, [resetInactivityTimerDebounced, token]); // Depend on token now

//     // --- Derived State ---
//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // --- Context Value ---
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Use the stable ref
//         isAdmin,
//         refetchUser,
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Added refetchUser

//     // --- Render ---
//     return (
//         <AuthContext.Provider value={contextValue}>
//              {/* You can keep the GlobalLoadingIndicator or remove it */}
//              {/* It might show briefly during the initial token check/fetch */}
//              {loading && <GlobalLoadingIndicator />}
//              {!loading && children}
//              {/* Or simply: {children} and let consumers check context.loading */}
//         </AuthContext.Provider>
//     );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Optional Global Loading Indicator
// const GlobalLoadingIndicator = () => (
//      <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/90 backdrop-blur-sm">
//          <div className="text-center">
//              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
//              {/* <p className="text-lg font-semibold text-muted-foreground">Loading Session...</p> */}
//          </div>
//      </div>
//  );

// export { AuthContext }; // Export context for direct consumption if needed

// 'use client';

// import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
// import debounce from 'lodash/debounce';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import apiConfig from '../config/apiConfig'; // Ensure path is correct
// import { Loader2 } from 'lucide-react'; // For loading indicator

// // --- Types ---

// // Full User object structure from backend (used internally for fetching)
// export interface User {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kyc: {
//         status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//         rejectionReason?: string | null;
//     };
//     createdAt: string; // Or Date
//     updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context
// // IMPORTANT: This is now only held in React state, NOT localStorage
// interface UserContextState {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kycStatus: User['kyc']['status'];
//     kycRejectionReason?: string | null;
// }

// // AuthContext structure
// interface AuthContextType {
//     user: UserContextState | null; // Still holds the user data in React state
//     token: string | null;          // Token is still managed
//     loading: boolean;              // Indicates if auth state is being determined (fetching user)
//     login: (backendUser: User, authToken: string) => void; // Login still receives full user initially
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void;
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>; // Function to manually refresh user data
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for activity listener

// // --- Axios Instance ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<UserContextState | null>(null); // User data in React state
//     const [token, setToken] = useState<string | null>(null);          // Token in React state
//     const [loading, setLoading] = useState<boolean>(true);           // Initial loading is true
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter();

//     // Initialize BroadcastChannel
//     useEffect(() => {
//         if (typeof window !== 'undefined' && !broadcastChannelRef.current) {
//             try {
//                 broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//                  console.log('BroadcastChannel initialized:', BROADCAST_CHANNEL_NAME);
//             } catch (error) {
//                  console.error("Failed to initialize BroadcastChannel:", error);
//             }
//         }
//         return () => {
//             if (broadcastChannelRef.current) {
//                 broadcastChannelRef.current.close();
//                 broadcastChannelRef.current = null;
//                  console.log('BroadcastChannel closed.');
//             }
//         };
//     }, []);

//     // --- Logout Function ---
//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         const wasLoggedIn = !!localStorage.getItem('token'); // Check *before* clearing

//         // Clear React state
//         setUser(null);
//         setToken(null);

//         // Clear localStorage (only token)
//         localStorage.removeItem('token');

//         // Clear timer and Axios header
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete apiClient.defaults.headers.common['Authorization'];

//         // Broadcast if not caused by broadcast
//         if (!isBroadcastLogout && broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting logout message');
//             try { broadcastChannelRef.current.postMessage('logout'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         // Redirect if appropriate (not broadcast, was logged in, and not already on login)
//         if (typeof window !== 'undefined' && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith('/auth/login')) {
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') redirectUrl += '?sessionExpired=true';
//             else if (reason === 'inactivity') redirectUrl += '?autoLogout=true';
//             console.log(`AuthContext: Redirecting to: ${redirectUrl}`);
//             router.push(redirectUrl);
//         } else if (!isBroadcastLogout && wasLoggedIn) {
//              console.log(`AuthContext: Logout occurred but already on login page or no window access. No redirect needed.`);
//         }
//     }, [router]); // router dependency

//     // Keep logout reference updated
//     useEffect(() => { logoutRef.current = logout; }, [logout]);

//     // --- Inactivity Handling ---
//     const logoutDueToInactivity = useCallback(() => {
//         console.log('AuthContext: Inactivity timeout reached.');
//         logoutRef.current('inactivity');
//     }, []); // Stable ref

//     // Debounced function to reset inactivity timer
//     const resetInactivityTimerDebounced = useRef(
//         debounce((currentToken: string | null) => { // Pass current token to check
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//             }
//             // Only reset timer if a token exists
//             if (currentToken) {
//                  // console.log(`AuthContext: Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                  logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;

//     // --- Refetch User Data ---
//     // Used for manual refreshes or broadcast updates
//     const refetchUser = useCallback(async () => {
//         const currentToken = token; // Use token from state
//         if (!currentToken) {
//             console.log("AuthContext: Refetch skipped - no token in state.");
//             if (user !== null) {
//                  console.log("AuthContext: Clearing user state as token is missing during refetch.");
//                  setUser(null); // Ensure user state is cleared if no token
//             }
//             return;
//         }
//         console.log("AuthContext: Refetching user data manually...");
//         setLoading(true); // Indicate loading
//         try {
//             // Ensure Authorization header is set for this specific request, just in case
//              apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
//             const response = await apiClient.get<User>('/dashboard/users/me');
//             const updatedBackendUser: User = response.data;

//             if (!updatedBackendUser?._id || !updatedBackendUser?.email || !updatedBackendUser?.kyc) { // Added email check
//                  throw new Error("Invalid user data structure received from /users/me during refetch");
//             }
//             console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);
//              const userContextData: UserContextState = {
//                 _id: updatedBackendUser._id,
//                 fullName: updatedBackendUser.fullName,
//                 email: updatedBackendUser.email,
//                 role: updatedBackendUser.role,
//                 kycStatus: updatedBackendUser.kyc.status,
//                 kycRejectionReason: updatedBackendUser.kyc.rejectionReason,
//              };
//             setUser(userContextData); // Update context state
//         } catch (error: any) {
//             console.error("AuthContext: Failed to refetch user data:", error.response?.status, error.response?.data?.message || error.message);
//              if (error.response?.status === 401) {
//                  console.error("AuthContext: 401 error during refetch, initiating logout.");
//                 logoutRef.current('sessionExpired'); // Logout with redirect
//              } else {
//                 // For other errors during refetch, maybe don't clear user state immediately
//                 // as it might be a temporary network issue. Log it.
//                 console.error("AuthContext: Non-401 error during refetch. User state preserved for now.");
//              }
//         } finally {
//             setLoading(false); // Finish loading indicator
//         }
//     }, [token, user]); // Depends on current token and user state

//     // --- Login Function ---
//     const login = useCallback((backendUser: User, authToken: string) => {
//         if (!backendUser?._id || !backendUser?.email || !backendUser?.kyc) { // Added email check
//              console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//              logoutRef.current('manual', true); // Logout without redirect
//              return;
//         }
//         console.log('AuthContext: Logging in user:', backendUser.email, 'KYC Status:', backendUser.kyc.status);

//         const userContextData: UserContextState = {
//             _id: backendUser._id,
//             fullName: backendUser.fullName,
//             email: backendUser.email,
//             role: backendUser.role,
//             kycStatus: backendUser.kyc.status,
//             kycRejectionReason: backendUser.kyc.rejectionReason,
//         };

//         // Update React state
//         setUser(userContextData);
//         setToken(authToken);

//         // Store ONLY token in localStorage
//         localStorage.setItem('token', authToken);

//         // Set Axios header
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         // Broadcast login
//         if (broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting login message');
//              try { broadcastChannelRef.current.postMessage('login'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         resetInactivityTimerDebounced(authToken); // Pass token to timer reset
//     }, [resetInactivityTimerDebounced]); // Dependencies

//     // --- Initialization Effect (Mount) ---
//     useEffect(() => {
//         console.log('AuthProvider: Initializing state (Mount)...');
//         let isMounted = true; // Flag to prevent state updates after unmount
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         console.log(`AuthProvider: Found token in localStorage? ${storedToken ? 'Yes' : 'No'}`);

//         const initializeAuth = async () => {
//             if (storedToken && isMounted) {
//                 console.log('AuthProvider: Token found. Setting token state and Axios header.');
//                 // Set token in state and Axios header *before* fetching
//                 setToken(storedToken);
//                 apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

//                 try {
//                     console.log('AuthProvider: Attempting to fetch initial user data from /dashboard/users/me...');
//                     const response = await apiClient.get<User>('/dashboard/users/me'); // No headers needed, default is set
//                     const fetchedUser: User = response.data;
//                     console.log('AuthProvider: Initial user fetch API call successful.');

//                     if (!fetchedUser?._id || !fetchedUser?.email || !fetchedUser?.kyc) { // Added email check
//                         throw new Error("AuthProvider: Invalid user data structure received during init.");
//                     }

//                     if (isMounted) {
//                         const userContextData: UserContextState = {
//                             _id: fetchedUser._id,
//                             fullName: fetchedUser.fullName,
//                             email: fetchedUser.email,
//                             role: fetchedUser.role,
//                             kycStatus: fetchedUser.kyc.status,
//                             kycRejectionReason: fetchedUser.kyc.rejectionReason,
//                         };
//                         setUser(userContextData);
//                         console.log('AuthProvider: User state updated successfully:', userContextData.email, 'KYC:', userContextData.kycStatus);
//                         resetInactivityTimerDebounced(storedToken); // Start timer after successful fetch
//                     } else {
//                          console.log('AuthProvider: Component unmounted before user state could be set.');
//                     }
//                 } catch (error: any) {
//                     console.error("AuthProvider: Failed to fetch user during init:", error.response?.status, error.response?.data?.message || error.message);
//                     if (isMounted) {
//                          console.log('AuthProvider: Clearing token and user state due to fetch error.');
//                         localStorage.removeItem('token');
//                         setToken(null);
//                         setUser(null);
//                         delete apiClient.defaults.headers.common['Authorization'];
//                         // Redirect if 401 during init, preventing loops
//                          if (error.response?.status === 401 && typeof window !== 'undefined') {
//                             // Avoid redirecting if already on login page
//                             if (!window.location.pathname.startsWith('/auth/login')) {
//                                  console.log("AuthProvider: Redirecting to login due to 401 during init fetch.");
//                                  router.push('/auth/login?sessionExpired=true');
//                             } else {
//                                 console.log("AuthProvider: 401 during init, but already on login page. No redirect.");
//                             }
//                          }
//                     } else {
//                         console.log('AuthProvider: Component unmounted before error handling could complete.');
//                     }
//                 } finally {
//                      if (isMounted) {
//                         console.log("AuthProvider: Initial fetch process complete, setting loading = false.");
//                         setLoading(false);
//                      }
//                 }
//             } else {
//                 console.log('AuthProvider: No token found in localStorage. Setting loading = false.');
//                 if (isMounted) {
//                      // Ensure clean state if no token
//                      setUser(null);
//                      setToken(null);
//                      delete apiClient.defaults.headers.common['Authorization'];
//                      setLoading(false); // No fetch needed, loading finished
//                 }
//             }
//         };

//         initializeAuth();

//         // Cleanup function
//         return () => {
//             console.log("AuthProvider: Unmounting initialization effect.");
//             isMounted = false;
//         };
//     // Run only once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Empty dependency array for mount effect

//     // --- Axios 401 Interceptor ---
//     useEffect(() => {
//         console.log('AuthProvider: Setting up Axios response interceptor.');
//         const responseInterceptor = apiClient.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response?.status === 401) {
//                     const requestUrl = error.config?.url || 'Unknown URL';
//                     console.log(`Axios interceptor caught 401 from request to: ${requestUrl}`);
//                     // Check if a token was actually present when the 401 occurred
//                     // Using localStorage check is okay here for quick verification
//                     if (localStorage.getItem('token')) {
//                         console.log('AuthProvider: Detected token failure (401). Logging out.');
//                         // Use 'sessionExpired' to trigger appropriate message on login page
//                         logoutRef.current('sessionExpired'); // Always redirect on 401 if token was present
//                     } else {
//                          console.log('AuthProvider: Caught 401, but no token was present locally. Ignoring logout.');
//                     }
//                 }
//                 return Promise.reject(error); // Important to reject the promise
//             }
//         );
//         return () => {
//             console.log('AuthProvider: Ejecting Axios response interceptor.');
//             apiClient.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // No dependency on logoutRef needed as it uses the stable ref

//     // --- BroadcastChannel Listener ---
//     useEffect(() => {
//         const channel = broadcastChannelRef.current;
//         if (!channel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('AuthProvider: Received logout message via BroadcastChannel.');
//                  if (user !== null) { // Only logout if currently logged in this tab
//                      console.log('AuthProvider: Performing logout in this tab due to broadcast.');
//                      logoutRef.current('manual', true); // Logout this tab without redirect
//                  } else {
//                       console.log('AuthProvider: Received logout broadcast, but already logged out in this tab.');
//                  }
//             } else if (event.data === 'login') {
//                  console.log('AuthProvider: Received login message via BroadcastChannel.');
//                  const currentLocalToken = localStorage.getItem('token');
//                  // Refetch if:
//                  // 1. This tab has no token but localStorage now does.
//                  // 2. This tab's token differs from localStorage's token.
//                  if (currentLocalToken && (!token || token !== currentLocalToken)) {
//                      console.log("AuthProvider: Token mismatch or missing locally after login broadcast. Updating token and refetching user.");
//                      setToken(currentLocalToken); // Update local token state first
//                      apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentLocalToken}`;
//                      refetchUser(); // Fetch user for the new token
//                  } else if (!currentLocalToken && token) {
//                      // Logged in this tab, but localStorage cleared? Logout this tab.
//                      console.warn("AuthProvider: Login broadcast received, but no token in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  } else if (currentLocalToken && token === currentLocalToken && !user) {
//                      // Token matches, but user state is somehow null? Refetch.
//                      console.log("AuthProvider: Token matches after login broadcast, but user state is null. Refetching.");
//                      refetchUser();
//                  } else {
//                      console.log("AuthProvider: Received login broadcast, state seems consistent. No action needed.");
//                  }
//             }
//         };

//         console.log('AuthProvider: Adding BroadcastChannel message listener.');
//         channel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('AuthProvider: Removing BroadcastChannel message listener.');
//             if (channel) { // Check if channel still exists before removing listener
//                 channel.removeEventListener('message', handleBroadcastMessage);
//             }
//         };
//     }, [user, token, refetchUser]); // Dependencies

//     // --- Inactivity Event Listeners ---
//     useEffect(() => {
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         // Create the function inside useEffect to capture the current token value
//         const resetTimer = () => resetInactivityTimerDebounced(token);
//         // console.log('AuthProvider: Adding activity listeners.');
//         events.forEach(event => window.addEventListener(event, resetTimer));
//         return () => {
//             // console.log('AuthProvider: Removing activity listeners.');
//             events.forEach(event => window.removeEventListener(event, resetTimer));
//             resetInactivityTimerDebounced.cancel(); // Cancel pending debounced calls
//         };
//     }, [resetInactivityTimerDebounced, token]); // Depend on token now

//     // --- Derived State ---
//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // --- Context Value ---
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Use the stable ref
//         isAdmin,
//         refetchUser,
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Added refetchUser

//     // --- Render ---
//     return (
//         <AuthContext.Provider value={contextValue}>
//              {/* Global Loading Indicator - shows during initial check */}
//              {loading && <GlobalLoadingIndicator />}
//              {/* Render children only when loading is complete */}
//              {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Optional Global Loading Indicator
// const GlobalLoadingIndicator = () => (
//      <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/90 backdrop-blur-sm" aria-label="Loading session">
//          <div className="text-center">
//              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
//              {/* <p className="text-lg font-semibold text-muted-foreground">Loading Session...</p> */}
//          </div>
//      </div>
//  );

// export { AuthContext }; // Export context for direct consumption if needed

// 'use client';

// import React, {
//     createContext,
//     useState,
//     useEffect,
//     useContext,
//     useCallback,
//     useRef,
//     useMemo,
//     ReactNode // Import ReactNode
// } from 'react';
// import debounce from 'lodash/debounce';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import apiConfig from '../config/apiConfig'; // Ensure path is correct
// import { Loader2 } from 'lucide-react'; // For loading indicator

// // --- Types ---

// // Full User object structure from backend (used internally for fetching)
// export interface User {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kyc: { // Ensure this structure matches your backend response
//         status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//         rejectionReason?: string | null;
//     };
//     createdAt: string; // Or Date
//     updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context
// // IMPORTANT: This is now only held in React state, NOT localStorage
// interface UserContextState {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kycStatus: User['kyc']['status']; // Correctly typed
//     kycRejectionReason?: string | null; // Correctly typed
// }

// // AuthContext structure
// interface AuthContextType {
//     user: UserContextState | null; // Still holds the user data in React state
//     token: string | null;          // Token is still managed
//     loading: boolean;              // Indicates if auth state is being determined (fetching user)
//     login: (backendUser: User, authToken: string) => void; // Login still receives full user initially
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void;
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>; // Function to manually refresh user data
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for activity listener

// // --- Axios Instance ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => { // Use ReactNode
//     const [user, setUser] = useState<UserContextState | null>(null); // User data in React state
//     const [token, setToken] = useState<string | null>(null);          // Token in React state
//     const [loading, setLoading] = useState<boolean>(true);           // Initial loading is true
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter();

//     // Initialize BroadcastChannel
//     useEffect(() => {
//         if (typeof window !== 'undefined' && !broadcastChannelRef.current) {
//             try {
//                 broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//                  console.log('BroadcastChannel initialized:', BROADCAST_CHANNEL_NAME);
//             } catch (error) {
//                  console.error("Failed to initialize BroadcastChannel:", error);
//             }
//         }
//         return () => {
//             if (broadcastChannelRef.current) {
//                 broadcastChannelRef.current.close();
//                 broadcastChannelRef.current = null;
//                  console.log('BroadcastChannel closed.');
//             }
//         };
//     }, []);

//     // --- Logout Function ---
//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         const wasLoggedIn = !!localStorage.getItem('token'); // Check *before* clearing

//         // Clear React state
//         setUser(null);
//         setToken(null);

//         // Clear localStorage (only token)
//         localStorage.removeItem('token');

//         // Clear timer and Axios header
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete apiClient.defaults.headers.common['Authorization'];

//         // Broadcast if not caused by broadcast
//         if (!isBroadcastLogout && broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting logout message');
//             try { broadcastChannelRef.current.postMessage('logout'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         // Redirect if appropriate (not broadcast, was logged in, and not already on login)
//         if (typeof window !== 'undefined' && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith('/auth/login')) {
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') redirectUrl += '?sessionExpired=true';
//             else if (reason === 'inactivity') redirectUrl += '?autoLogout=true';
//             console.log(`AuthContext: Redirecting to: ${redirectUrl}`);
//             router.push(redirectUrl);
//         } else if (!isBroadcastLogout && wasLoggedIn) {
//              console.log(`AuthContext: Logout occurred but already on login page or no window access. No redirect needed.`);
//         }
//     }, [router]); // router dependency

//     // Keep logout reference updated
//     useEffect(() => { logoutRef.current = logout; }, [logout]);

//     // --- Inactivity Handling ---
//     const logoutDueToInactivity = useCallback(() => {
//         console.log('AuthContext: Inactivity timeout reached.');
//         logoutRef.current('inactivity');
//     }, []); // Stable ref

//     // Debounced function to reset inactivity timer
//     const resetInactivityTimerDebounced = useRef(
//         debounce((currentToken: string | null) => { // Pass current token to check
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//             }
//             // Only reset timer if a token exists
//             if (currentToken) {
//                  // console.log(`AuthContext: Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                  logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;

//     // --- Refetch User Data ---
//     // Used for manual refreshes or broadcast updates
//     const refetchUser = useCallback(async () => {
//         const currentToken = token; // Use token from state
//         if (!currentToken) {
//             console.log("AuthContext: Refetch skipped - no token in state.");
//             if (user !== null) {
//                  console.log("AuthContext: Clearing user state as token is missing during refetch.");
//                  setUser(null); // Ensure user state is cleared if no token
//             }
//             return;
//         }
//         console.log("AuthContext: Refetching user data manually...");
//         // Indicate loading ONLY IF not already loading (prevents flicker if called rapidly)
//         if (!loading) setLoading(true);
//         try {
//             // Ensure Authorization header is set for this specific request, just in case
//              apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
//             const response = await apiClient.get<User>('/dashboard/users/me');
//             const updatedBackendUser: User = response.data;

//             // ---- VERIFY THIS PART (Checks kyc and kyc.status) ----
//             if (!updatedBackendUser?._id || !updatedBackendUser?.email || !updatedBackendUser?.kyc?.status) { // Added email check
//                  throw new Error("Invalid user data structure received from /users/me during refetch");
//             }
//             console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);
//              const userContextData: UserContextState = {
//                 _id: updatedBackendUser._id,
//                 fullName: updatedBackendUser.fullName,
//                 email: updatedBackendUser.email,
//                 role: updatedBackendUser.role,
//                 kycStatus: updatedBackendUser.kyc.status, // Make sure this is assigned
//                 kycRejectionReason: updatedBackendUser.kyc.rejectionReason, // Make sure this is assigned
//              };
//             setUser(userContextData); // Update context state
//             // ---- END VERIFY ----
//         } catch (error: any) {
//             console.error("AuthContext: Failed to refetch user data:", error.response?.status, error.response?.data?.message || error.message);
//              if (error.response?.status === 401) {
//                  console.error("AuthContext: 401 error during refetch, initiating logout.");
//                 logoutRef.current('sessionExpired'); // Logout with redirect
//              } else {
//                 // For other errors during refetch, maybe don't clear user state immediately
//                 // as it might be a temporary network issue. Log it.
//                 console.error("AuthContext: Non-401 error during refetch. User state preserved for now.");
//              }
//         } finally {
//             setLoading(false); // Finish loading indicator
//         }
//      // Dependencies: token ensures it runs with the current token,
//      // loading prevents unnecessary setLoading(true) calls.
//      // user is not strictly needed unless logic *inside* depended on the *previous* user state.
//     }, [token, loading]);

//     // --- Login Function ---
//     const login = useCallback((backendUser: User, authToken: string) => {
//         if (!backendUser?._id || !backendUser?.email || !backendUser?.kyc?.status) { // Added email & kyc.status check
//              console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//              logoutRef.current('manual', true); // Logout without redirect
//              return;
//         }
//         console.log('AuthContext: Logging in user:', backendUser.email, 'KYC Status:', backendUser.kyc.status);

//         const userContextData: UserContextState = {
//             _id: backendUser._id,
//             fullName: backendUser.fullName,
//             email: backendUser.email,
//             role: backendUser.role,
//             kycStatus: backendUser.kyc.status,
//             kycRejectionReason: backendUser.kyc.rejectionReason,
//         };

//         // Update React state
//         setUser(userContextData);
//         setToken(authToken);

//         // Store ONLY token in localStorage
//         localStorage.setItem('token', authToken);

//         // Set Axios header
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         // Broadcast login
//         if (broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting login message');
//              try { broadcastChannelRef.current.postMessage('login'); } catch (e) { console.error("BC postMessage error:", e); }
//         }

//         resetInactivityTimerDebounced(authToken); // Pass token to timer reset
//     }, [resetInactivityTimerDebounced]); // Dependencies

//     // --- Initialization Effect (Mount) ---
//     useEffect(() => {
//         console.log('AuthProvider: Initializing state (Mount)...');
//         let isMounted = true; // Flag to prevent state updates after unmount
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         console.log(`AuthProvider: Found token in localStorage? ${storedToken ? 'Yes' : 'No'}`);

//         const initializeAuth = async () => {
//             if (storedToken && isMounted) {
//                 console.log('AuthProvider: Token found. Setting token state and Axios header.');
//                 // Set token in state and Axios header *before* fetching
//                 setToken(storedToken);
//                 apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

//                 try {
//                     console.log('AuthProvider: Attempting to fetch initial user data from /dashboard/users/me...');
//                     const response = await apiClient.get<User>('/dashboard/users/me'); // No headers needed, default is set
//                     const fetchedUser: User = response.data;
//                     console.log('AuthProvider: Initial user fetch API call successful.');

//                     if (!fetchedUser?._id || !fetchedUser?.email || !fetchedUser?.kyc?.status) { // Added email & kyc.status check
//                         throw new Error("AuthProvider: Invalid user data structure received during init.");
//                     }

//                     if (isMounted) {
//                         const userContextData: UserContextState = {
//                             _id: fetchedUser._id,
//                             fullName: fetchedUser.fullName,
//                             email: fetchedUser.email,
//                             role: fetchedUser.role,
//                             kycStatus: fetchedUser.kyc.status,
//                             kycRejectionReason: fetchedUser.kyc.rejectionReason,
//                         };
//                         setUser(userContextData);
//                         console.log('AuthProvider: User state updated successfully:', userContextData.email, 'KYC:', userContextData.kycStatus);
//                         resetInactivityTimerDebounced(storedToken); // Start timer after successful fetch
//                     } else {
//                          console.log('AuthProvider: Component unmounted before user state could be set.');
//                     }
//                 } catch (error: any) {
//                     console.error("AuthProvider: Failed to fetch user during init:", error.response?.status, error.response?.data?.message || error.message);
//                     if (isMounted) {
//                          console.log('AuthProvider: Clearing token and user state due to fetch error.');
//                         localStorage.removeItem('token');
//                         setToken(null);
//                         setUser(null);
//                         delete apiClient.defaults.headers.common['Authorization'];
//                         // Redirect if 401 during init, preventing loops
//                          if (error.response?.status === 401 && typeof window !== 'undefined') {
//                             // Avoid redirecting if already on login page
//                             if (!window.location.pathname.startsWith('/auth/login')) {
//                                  console.log("AuthProvider: Redirecting to login due to 401 during init fetch.");
//                                  router.push('/auth/login?sessionExpired=true');
//                             } else {
//                                 console.log("AuthProvider: 401 during init, but already on login page. No redirect.");
//                             }
//                          }
//                     } else {
//                         console.log('AuthProvider: Component unmounted before error handling could complete.');
//                     }
//                 } finally {
//                      if (isMounted) {
//                         console.log("AuthProvider: Initial fetch process complete, setting loading = false.");
//                         setLoading(false);
//                      }
//                 }
//             } else {
//                 console.log('AuthProvider: No token found in localStorage. Setting loading = false.');
//                 if (isMounted) {
//                      // Ensure clean state if no token
//                      setUser(null);
//                      setToken(null);
//                      delete apiClient.defaults.headers.common['Authorization'];
//                      setLoading(false); // No fetch needed, loading finished
//                 }
//             }
//         };

//         initializeAuth();

//         // Cleanup function
//         return () => {
//             console.log("AuthProvider: Unmounting initialization effect.");
//             isMounted = false;
//         };
//     // Run only once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Empty dependency array for mount effect

//     // --- Axios 401 Interceptor ---
//     useEffect(() => {
//         console.log('AuthProvider: Setting up Axios response interceptor.');
//         const responseInterceptor = apiClient.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response?.status === 401) {
//                     const requestUrl = error.config?.url || 'Unknown URL';
//                     console.log(`Axios interceptor caught 401 from request to: ${requestUrl}`);
//                     // Check if a token was actually present when the 401 occurred
//                     // Using localStorage check is okay here for quick verification
//                     if (localStorage.getItem('token')) {
//                         console.log('AuthProvider: Detected token failure (401). Logging out.');
//                         // Use 'sessionExpired' to trigger appropriate message on login page
//                         logoutRef.current('sessionExpired'); // Always redirect on 401 if token was present
//                     } else {
//                          console.log('AuthProvider: Caught 401, but no token was present locally. Ignoring logout.');
//                     }
//                 }
//                 return Promise.reject(error); // Important to reject the promise
//             }
//         );
//         return () => {
//             console.log('AuthProvider: Ejecting Axios response interceptor.');
//             apiClient.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // No dependency on logoutRef needed as it uses the stable ref

//     // --- BroadcastChannel Listener ---
//     useEffect(() => {
//         const channel = broadcastChannelRef.current;
//         if (!channel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//             if (event.data === 'logout') {
//                 console.log('AuthProvider: Received logout message via BroadcastChannel.');
//                  if (user !== null) { // Only logout if currently logged in this tab
//                      console.log('AuthProvider: Performing logout in this tab due to broadcast.');
//                      logoutRef.current('manual', true); // Logout this tab without redirect
//                  } else {
//                       console.log('AuthProvider: Received logout broadcast, but already logged out in this tab.');
//                  }
//             } else if (event.data === 'login') {
//                  console.log('AuthProvider: Received login message via BroadcastChannel.');
//                  const currentLocalToken = localStorage.getItem('token');
//                  // Refetch if:
//                  // 1. This tab has no token but localStorage now does.
//                  // 2. This tab's token differs from localStorage's token.
//                  if (currentLocalToken && (!token || token !== currentLocalToken)) {
//                      console.log("AuthProvider: Token mismatch or missing locally after login broadcast. Updating token and refetching user.");
//                      setToken(currentLocalToken); // Update local token state first
//                      apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentLocalToken}`;
//                      refetchUser(); // Fetch user for the new token
//                  } else if (!currentLocalToken && token) {
//                      // Logged in this tab, but localStorage cleared? Logout this tab.
//                      console.warn("AuthProvider: Login broadcast received, but no token in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  } else if (currentLocalToken && token === currentLocalToken && !user) {
//                      // Token matches, but user state is somehow null? Refetch.
//                      console.log("AuthProvider: Token matches after login broadcast, but user state is null. Refetching.");
//                      refetchUser();
//                  } else {
//                      console.log("AuthProvider: Received login broadcast, state seems consistent. No action needed.");
//                  }
//             }
//         };

//         console.log('AuthProvider: Adding BroadcastChannel message listener.');
//         channel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('AuthProvider: Removing BroadcastChannel message listener.');
//             if (channel) { // Check if channel still exists before removing listener
//                 channel.removeEventListener('message', handleBroadcastMessage);
//             }
//         };
//     }, [user, token, refetchUser]); // Dependencies

//     // --- Inactivity Event Listeners ---
//     useEffect(() => {
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         // Create the function inside useEffect to capture the current token value
//         const resetTimer = () => resetInactivityTimerDebounced(token);
//         // console.log('AuthProvider: Adding activity listeners.');
//         events.forEach(event => window.addEventListener(event, resetTimer));
//         return () => {
//             // console.log('AuthProvider: Removing activity listeners.');
//             events.forEach(event => window.removeEventListener(event, resetTimer));
//             resetInactivityTimerDebounced.cancel(); // Cancel pending debounced calls
//         };
//     }, [resetInactivityTimerDebounced, token]); // Depend on token now

//     // --- Derived State ---
//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // --- Context Value ---
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Use the stable ref
//         isAdmin,
//         refetchUser, // Include refetchUser in the context value
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Add refetchUser dependency

//     // --- Render ---
//     return (
//         <AuthContext.Provider value={contextValue}>
//              {/* Global Loading Indicator - shows during initial check */}
//              {loading && <GlobalLoadingIndicator />}
//              {/* Render children only when loading is complete */}
//              {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Optional Global Loading Indicator
// const GlobalLoadingIndicator = () => (
//      <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/90 backdrop-blur-sm" aria-label="Loading session">
//          <div className="text-center">
//              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
//              {/* <p className="text-lg font-semibold text-muted-foreground">Loading Session...</p> */}
//          </div>
//      </div>
//  );

// export { AuthContext }; // Export context for direct consumption if needed

// 'use client';

// import React, {
//     createContext,
//     useState,
//     useEffect,
//     useContext,
//     useCallback,
//     useRef,
//     useMemo,
//     ReactNode // Import ReactNode
// } from 'react';
// import debounce from 'lodash/debounce';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import apiConfig from '../config/apiConfig'; // Ensure path is correct
// import { Loader2 } from 'lucide-react'; // For loading indicator

// // --- Types ---

// // Full User object structure from backend (used internally for fetching)
// export interface User {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kyc: { // Ensure this structure matches your backend response
//         status: 'not_started' | 'pending' | 'verified' | 'rejected' | 'skipped';
//         rejectionReason?: string | null;
//     };
//     createdAt: string; // Or Date
//     updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context
// // IMPORTANT: This is now only held in React state, NOT localStorage
// interface UserContextState {
//     _id: string;
//     fullName: string;
//     email: string;
//     role: 'user' | 'admin';
//     kycStatus: User['kyc']['status']; // Correctly typed
//     kycRejectionReason?: string | null; // Correctly typed
// }

// // AuthContext structure
// interface AuthContextType {
//     user: UserContextState | null; // Still holds the user data in React state
//     token: string | null;          // Token is still managed
//     loading: boolean;              // Indicates if auth state is being determined (fetching user)
//     login: (backendUser: User, authToken: string) => void; // Login still receives full user initially
//     logout: (reason?: 'inactivity' | 'sessionExpired' | 'manual', isBroadcastLogout?: boolean) => void;
//     isAdmin: boolean;
//     refetchUser: () => Promise<void>; // Function to manually refresh user data
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 05 minutes
// const BROADCAST_CHANNEL_NAME = 'wise-auth-channel';
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for activity listener

// // --- Axios Instance ---
// const apiClient = axios.create({
//     baseURL: apiConfig.baseUrl,
// });

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => { // Use ReactNode
//     const [user, setUser] = useState<UserContextState | null>(null); // User data in React state
//     const [token, setToken] = useState<string | null>(null);          // Token in React state
//     const [loading, setLoading] = useState<boolean>(true);           // Initial loading is true
//     const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//     const logoutRef = useRef<AuthContextType['logout']>(() => {});
//     const router = useRouter();

//     // Initialize BroadcastChannel
//     useEffect(() => {
//         if (typeof window !== 'undefined' && !broadcastChannelRef.current) {
//             try {
//                 broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//                  console.log('AuthContext: BroadcastChannel initialized:', BROADCAST_CHANNEL_NAME);
//             } catch (error) {
//                  console.error("AuthContext: Failed to initialize BroadcastChannel:", error);
//             }
//         }
//         return () => {
//             if (broadcastChannelRef.current) {
//                 broadcastChannelRef.current.close();
//                 broadcastChannelRef.current = null;
//                  console.log('AuthContext: BroadcastChannel closed.');
//             }
//         };
//     }, []);

//     // --- Logout Function ---
//     const logout = useCallback((reason: 'inactivity' | 'sessionExpired' | 'manual' = 'manual', isBroadcastLogout = false) => {
//         console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//         const wasLoggedIn = !!localStorage.getItem('token'); // Check *before* clearing

//         // Clear React state
//         setUser(null);
//         setToken(null);

//         // Clear localStorage (only token)
//         localStorage.removeItem('token');

//         // Clear timer and Axios header
//         if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         delete apiClient.defaults.headers.common['Authorization'];

//         // Broadcast if not caused by broadcast
//         if (!isBroadcastLogout && broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting logout message');
//             try { broadcastChannelRef.current.postMessage('logout'); } catch (e) { console.error("AuthContext: BC postMessage error:", e); }
//         }

//         // Redirect if appropriate (not broadcast, was logged in, and not already on login)
//         if (typeof window !== 'undefined' && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith('/auth/login')) {
//             let redirectUrl = '/auth/login';
//             if (reason === 'sessionExpired') redirectUrl += '?sessionExpired=true';
//             else if (reason === 'inactivity') redirectUrl += '?autoLogout=true';
//             console.log(`AuthContext: Redirecting to: ${redirectUrl}`);
//             router.push(redirectUrl);
//         } else if (!isBroadcastLogout && wasLoggedIn) {
//              console.log(`AuthContext: Logout occurred but already on login page or no window access. No redirect needed.`);
//         }
//     }, [router]); // router dependency

//     // Keep logout reference updated
//     useEffect(() => { logoutRef.current = logout; }, [logout]);

//     // --- Inactivity Handling ---
//     const logoutDueToInactivity = useCallback(() => {
//         console.log('AuthContext: Inactivity timeout reached.');
//         logoutRef.current('inactivity');
//     }, []); // Stable ref

//     // Debounced function to reset inactivity timer
//     const resetInactivityTimerDebounced = useRef(
//         debounce((currentToken: string | null) => { // Pass current token to check
//             if (logoutTimerRef.current) {
//                 clearTimeout(logoutTimerRef.current);
//             }
//             // Only reset timer if a token exists
//             if (currentToken) {
//                  // console.log(`AuthContext: Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//                  logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//             }
//         }, DEBOUNCE_WAIT_MS)
//     ).current;

//     // --- Refetch User Data ---
//     // Used for manual refreshes or broadcast updates
//     const refetchUser = useCallback(async () => {
//         const currentToken = token; // Use token from state at the time of call
//         if (!currentToken) {
//             console.log("AuthContext: Refetch skipped - no token in state.");
//             if (user !== null) {
//                  console.log("AuthContext: Clearing user state as token is missing during refetch.");
//                  setUser(null); // Ensure user state is cleared if no token
//             }
//             return;
//         }
//         console.log("AuthContext: Refetching user data...");
//         // Indicate loading ONLY IF not already loading (prevents flicker if called rapidly)
//         if (!loading) setLoading(true);
//         try {
//             // Ensure Authorization header is set for this specific request
//             apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
//             const response = await apiClient.get<User>('/dashboard/users/me');
//             const updatedBackendUser: User = response.data;

//              // Validate the received structure (important!)
//              if (!updatedBackendUser?._id || !updatedBackendUser?.email || !updatedBackendUser?.kyc || typeof updatedBackendUser?.kyc?.status === 'undefined') {
//                  throw new Error("Invalid user data structure received from /users/me during refetch");
//             }
//             console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status, "Reason:", updatedBackendUser.kyc.rejectionReason);

//              // Create the state structure directly from the FULL fetched user data
//              const userContextData: UserContextState = {
//                 _id: updatedBackendUser._id,
//                 fullName: updatedBackendUser.fullName,
//                 email: updatedBackendUser.email,
//                 role: updatedBackendUser.role,
//                 kycStatus: updatedBackendUser.kyc.status, // Direct assignment
//                 kycRejectionReason: updatedBackendUser.kyc.rejectionReason, // Direct assignment
//              };
//             setUser(userContextData); // Update context state WITH THE LATEST DATA
//             // --- End Refetch Update ---

//         } catch (error: any) {
//             console.error("AuthContext: Failed to refetch user data:", error.response?.status, error.response?.data?.message || error.message);
//              if (error.response?.status === 401) {
//                  console.error("AuthContext: 401 error during refetch, initiating logout.");
//                 logoutRef.current('sessionExpired'); // Logout with redirect
//              } else {
//                 // For other errors during refetch, log it but maybe don't clear state immediately
//                 console.error("AuthContext: Non-401 error during refetch. User state preserved for now.");
//              }
//         } finally {
//              // Ensure loading is false even if called when already loading=false
//              setLoading(false);
//         }
//      // Dependencies: token ensures it runs with the current token state.
//      // loading helps prevent rapid setLoading(true) calls.
//      // user is NOT needed as a dependency here; we only care about the token.
//     }, [token, loading]);

//     // --- Login Function ---
//     const login = useCallback((backendUser: User, authToken: string) => {
//          // Validate the incoming user object rigorously
//          if (!backendUser?._id || !backendUser?.email || !backendUser?.kyc || typeof backendUser?.kyc?.status === 'undefined') {
//              console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//              logoutRef.current('manual', true); // Logout without redirect (internal error)
//              return;
//         }
//         console.log('AuthContext: Logging in user:', backendUser.email, 'KYC Status:', backendUser.kyc.status, 'Reason:', backendUser.kyc.rejectionReason);

//          // Create state directly from the provided full User object
//          const userContextData: UserContextState = {
//             _id: backendUser._id,
//             fullName: backendUser.fullName,
//             email: backendUser.email,
//             role: backendUser.role,
//             kycStatus: backendUser.kyc.status,
//             kycRejectionReason: backendUser.kyc.rejectionReason,
//         };

//         // Update React state
//         setUser(userContextData);
//         setToken(authToken);

//         // Store ONLY token in localStorage
//         localStorage.setItem('token', authToken);

//         // Set Axios header
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

//         // Broadcast login
//         if (broadcastChannelRef.current) {
//             console.log('AuthContext: Broadcasting login message');
//              try { broadcastChannelRef.current.postMessage('login'); } catch (e) { console.error("AuthContext: BC postMessage error:", e); }
//         }

//         resetInactivityTimerDebounced(authToken); // Pass token to timer reset
//     }, [resetInactivityTimerDebounced]); // Dependencies

//     // --- Initialization Effect (Mount) ---
//     useEffect(() => {
//         console.log('AuthProvider: Initializing state (Mount)...');
//         let isMounted = true; // Flag to prevent state updates after unmount
//         setLoading(true);
//         const storedToken = localStorage.getItem('token');
//         console.log(`AuthProvider: Found token in localStorage? ${storedToken ? 'Yes' : 'No'}`);

//         const initializeAuth = async () => {
//             if (storedToken && isMounted) {
//                 console.log('AuthProvider: Token found. Setting token state and Axios header.');
//                 // Set token in state and Axios header *before* fetching
//                 setToken(storedToken);
//                 apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

//                 try {
//                     console.log('AuthProvider: Attempting to fetch initial user data from /dashboard/users/me...');
//                     const response = await apiClient.get<User>('/dashboard/users/me');
//                     const fetchedUser: User = response.data;
//                     console.log('AuthProvider: Initial user fetch API call successful.');

//                      // Validate the received structure (important!)
//                      if (!fetchedUser?._id || !fetchedUser?.email || !fetchedUser?.kyc || typeof fetchedUser?.kyc?.status === 'undefined') {
//                         throw new Error("AuthProvider: Invalid user data structure received during init.");
//                     }

//                     if (isMounted) {
//                          // Create state directly from the fetched user data
//                          const userContextData: UserContextState = {
//                             _id: fetchedUser._id,
//                             fullName: fetchedUser.fullName,
//                             email: fetchedUser.email,
//                             role: fetchedUser.role,
//                             kycStatus: fetchedUser.kyc.status,
//                             kycRejectionReason: fetchedUser.kyc.rejectionReason,
//                         };
//                         setUser(userContextData);
//                         console.log('AuthProvider: User state updated successfully:', userContextData.email, 'KYC:', userContextData.kycStatus);
//                         resetInactivityTimerDebounced(storedToken); // Start timer after successful fetch
//                     } else {
//                          console.log('AuthProvider: Component unmounted before user state could be set.');
//                     }
//                 } catch (error: any) {
//                     console.error("AuthProvider: Failed to fetch user during init:", error.response?.status, error.response?.data?.message || error.message);
//                     if (isMounted) {
//                          console.log('AuthProvider: Clearing token and user state due to fetch error.');
//                         localStorage.removeItem('token');
//                         setToken(null);
//                         setUser(null);
//                         delete apiClient.defaults.headers.common['Authorization'];
//                         // Redirect if 401 during init, preventing loops
//                          if (error.response?.status === 401 && typeof window !== 'undefined') {
//                             if (!window.location.pathname.startsWith('/auth/login')) {
//                                  console.log("AuthProvider: Redirecting to login due to 401 during init fetch.");
//                                  router.push('/auth/login?sessionExpired=true');
//                             } else {
//                                 console.log("AuthProvider: 401 during init, but already on login page. No redirect.");
//                             }
//                          }
//                     } else {
//                         console.log('AuthProvider: Component unmounted before error handling could complete.');
//                     }
//                 } finally {
//                      if (isMounted) {
//                         console.log("AuthProvider: Initial fetch process complete, setting loading = false.");
//                         setLoading(false);
//                      }
//                 }
//             } else {
//                 console.log('AuthProvider: No token found in localStorage. Setting loading = false.');
//                 if (isMounted) {
//                      // Ensure clean state if no token
//                      setUser(null);
//                      setToken(null);
//                      delete apiClient.defaults.headers.common['Authorization'];
//                      setLoading(false); // No fetch needed, loading finished
//                 }
//             }
//         };

//         initializeAuth();

//         // Cleanup function
//         return () => {
//             console.log("AuthProvider: Unmounting initialization effect.");
//             isMounted = false;
//         };
//     // Run only once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Empty dependency array for mount effect

//     // --- Axios 401 Interceptor ---
//     useEffect(() => {
//         console.log('AuthProvider: Setting up Axios response interceptor.');
//         const responseInterceptor = apiClient.interceptors.response.use(
//             (response) => response, // Pass through successful responses
//             (error) => {
//                 if (error.response?.status === 401) {
//                     const requestUrl = error.config?.url || 'Unknown URL';
//                     console.log(`Axios interceptor caught 401 from request to: ${requestUrl}`);
//                     // Check if a token was actually present when the 401 occurred
//                     // Using localStorage check is okay here for quick verification
//                     if (localStorage.getItem('token')) {
//                         console.log('AuthProvider: Detected token failure (401). Logging out.');
//                         // Use 'sessionExpired' to trigger appropriate message on login page
//                         logoutRef.current('sessionExpired'); // Always redirect on 401 if token was present
//                     } else {
//                          console.log('AuthProvider: Caught 401, but no token was present locally. Ignoring logout.');
//                     }
//                 }
//                 return Promise.reject(error); // Important to reject the promise
//             }
//         );
//         return () => {
//             console.log('AuthProvider: Ejecting Axios response interceptor.');
//             apiClient.interceptors.response.eject(responseInterceptor);
//         };
//     }, []); // No dependency on logoutRef needed as it uses the stable ref

//     // --- BroadcastChannel Listener ---
//     useEffect(() => {
//         const channel = broadcastChannelRef.current;
//         if (!channel) return;

//         const handleBroadcastMessage = (event: MessageEvent) => {
//              const localTokenBeforeAction = token; // Capture token state before potential async update
//              const localUserBeforeAction = user; // Capture user state

//             if (event.data === 'logout') {
//                 console.log('AuthProvider: Received logout message via BroadcastChannel.');
//                  // Use captured state to check if logout is needed
//                  if (localUserBeforeAction !== null) {
//                      console.log('AuthProvider: Performing logout in this tab due to broadcast.');
//                      logoutRef.current('manual', true); // Logout this tab without redirect
//                  } else {
//                       console.log('AuthProvider: Received logout broadcast, but already logged out in this tab.');
//                  }
//             } else if (event.data === 'login') {
//                  console.log('AuthProvider: Received login message via BroadcastChannel.');
//                  const currentLocalTokenInStorage = localStorage.getItem('token');
//                  // Refetch if:
//                  // 1. This tab has no token BUT localStorage now does.
//                  // 2. This tab's token differs from localStorage's token.
//                  // Use captured token state for comparison
//                  if (currentLocalTokenInStorage && (!localTokenBeforeAction || localTokenBeforeAction !== currentLocalTokenInStorage)) {
//                      console.log("AuthProvider: Token mismatch or missing locally after login broadcast. Updating token and refetching user.");
//                      // Update local token state FIRST to match storage, then refetch
//                      setToken(currentLocalTokenInStorage);
//                      apiClient.defaults.headers.common['Authorization'] = `Bearer ${currentLocalTokenInStorage}`;
//                      refetchUser(); // Fetch user for the new token
//                  } else if (!currentLocalTokenInStorage && localTokenBeforeAction) {
//                      // Logged in this tab, but localStorage cleared? Logout this tab.
//                      console.warn("AuthProvider: Login broadcast received, but no token in localStorage. Logging out this tab.");
//                      logoutRef.current('manual', true);
//                  } else if (currentLocalTokenInStorage && localTokenBeforeAction === currentLocalTokenInStorage && !localUserBeforeAction) {
//                      // Token matches, but user state is somehow null? Refetch.
//                      console.log("AuthProvider: Token matches after login broadcast, but user state is null. Refetching.");
//                      refetchUser();
//                  } else {
//                      console.log("AuthProvider: Received login broadcast, state seems consistent. No action needed.");
//                  }
//             }
//         };

//         console.log('AuthProvider: Adding BroadcastChannel message listener.');
//         channel.addEventListener('message', handleBroadcastMessage);
//         return () => {
//             console.log('AuthProvider: Removing BroadcastChannel message listener.');
//             if (broadcastChannelRef.current) { // Use ref.current in cleanup
//                 broadcastChannelRef.current.removeEventListener('message', handleBroadcastMessage);
//             }
//         };
//     // Dependencies ensure listener is updated if critical state/functions change
//     }, [user, token, refetchUser]);

//     // --- Inactivity Event Listeners ---
//     useEffect(() => {
//         const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
//         // Create the function inside useEffect to capture the current token value
//         const resetTimer = () => resetInactivityTimerDebounced(token);
//         // Add listeners only if running in a browser environment
//         if (typeof window !== 'undefined') {
//             // console.log('AuthProvider: Adding activity listeners.');
//             events.forEach(event => window.addEventListener(event, resetTimer));
//         }
//         return () => {
//             if (typeof window !== 'undefined') {
//                 // console.log('AuthProvider: Removing activity listeners.');
//                 events.forEach(event => window.removeEventListener(event, resetTimer));
//             }
//             resetInactivityTimerDebounced.cancel(); // Cancel pending debounced calls
//         };
//     }, [resetInactivityTimerDebounced, token]); // Depend on token now

//     // --- Derived State ---
//     const isAdmin = useMemo(() => user?.role === 'admin', [user]);

//     // --- Context Value ---
//     const contextValue: AuthContextType = useMemo(() => ({
//         user,
//         token,
//         loading,
//         login,
//         logout: logoutRef.current, // Use the stable ref
//         isAdmin,
//         refetchUser, // Include refetchUser in the context value
//     }), [user, token, loading, login, isAdmin, refetchUser]); // Add refetchUser dependency

//     // --- Render ---
//     return (
//         <AuthContext.Provider value={contextValue}>
//              {/* Global Loading Indicator - shows during initial check */}
//              {loading && <GlobalLoadingIndicator />}
//              {/* Render children only when loading is complete */}
//              {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };

// // Optional Global Loading Indicator
// const GlobalLoadingIndicator = () => (
//      <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/90 backdrop-blur-sm" aria-label="Loading session">
//          <div className="text-center">
//              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
//              {/* <p className="text-lg font-semibold text-muted-foreground">Loading Session...</p> */}
//          </div>
//      </div>
//  );

// export { AuthContext }; // Export context for direct consumption if needed

// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode, // Import ReactNode
// } from "react";
// import debounce from "lodash/debounce";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig"; // Ensure path is correct
// import { Loader2 } from "lucide-react"; // For loading indicator

// // --- Types ---

// // Full User object structure from backend (used internally for fetching)
// export interface User {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: {
//     // Ensure this structure matches your backend response
//     status: "not_started" | "pending" | "verified" | "rejected" | "skipped";
//     rejectionReason?: string | null;
//   };
//   createdAt: string; // Or Date
//   updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context
// // IMPORTANT: This is now only held in React state, NOT localStorage
// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kycStatus: User["kyc"]["status"]; // Correctly typed
//   kycRejectionReason?: string | null; // Correctly typed
// }

// // AuthContext structure
// interface AuthContextType {
//   user: UserContextState | null; // Still holds the user data in React state
//   token: string | null; // Token is still managed
//   loading: boolean; // Indicates if auth state is being determined (fetching user)
//   login: (backendUser: User, authToken: string) => void; // Login still receives full user initially
//   logout: (
//     reason?: "inactivity" | "sessionExpired" | "manual",
//     isBroadcastLogout?: boolean
//   ) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>; // Function to manually refresh user data
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 05 minutes
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for activity listener

// // --- Axios Instance ---
// const apiClient = axios.create({
//   baseURL: apiConfig.baseUrl,
// });

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   // Use ReactNode
//   const [user, setUser] = useState<UserContextState | null>(null); // User data in React state
//   const [token, setToken] = useState<string | null>(null); // Token in React state
//   const [loading, setLoading] = useState<boolean>(true); // Initial loading is true
//   const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {});
//   const router = useRouter();

//   // Initialize BroadcastChannel
//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(
//           BROADCAST_CHANNEL_NAME
//         );
//         console.log(
//           "AuthContext: BroadcastChannel initialized:",
//           BROADCAST_CHANNEL_NAME
//         );
//       } catch (error) {
//         console.error(
//           "AuthContext: Failed to initialize BroadcastChannel:",
//           error
//         );
//       }
//     }
//     return () => {
//       if (broadcastChannelRef.current) {
//         broadcastChannelRef.current.close();
//         broadcastChannelRef.current = null;
//         console.log("AuthContext: BroadcastChannel closed.");
//       }
//     };
//   }, []);

//   // --- Logout Function ---
//   const logout = useCallback(
//     (
//       reason: "inactivity" | "sessionExpired" | "manual" = "manual",
//       isBroadcastLogout = false
//     ) => {
//       console.log(
//         `AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`
//       );
//       const wasLoggedIn = !!localStorage.getItem("token"); // Check *before* clearing

//       // Clear React state
//       setUser(null);
//       setToken(null);

//       // Clear localStorage (only token)
//       localStorage.removeItem("token");

//       // Clear timer and Axios header
//       if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//       logoutTimerRef.current = null;
//       delete apiClient.defaults.headers.common["Authorization"];

//       // Broadcast if not caused by broadcast
//       if (!isBroadcastLogout && broadcastChannelRef.current) {
//         console.log("AuthContext: Broadcasting logout message");
//         try {
//           broadcastChannelRef.current.postMessage("logout");
//         } catch (e) {
//           console.error("AuthContext: BC postMessage error:", e);
//         }
//       }

//       // Redirect if appropriate (not broadcast, was logged in, and not already on login)
//       if (
//         typeof window !== "undefined" &&
//         !isBroadcastLogout &&
//         wasLoggedIn &&
//         !window.location.pathname.startsWith("/auth/login")
//       ) {
//         let redirectUrl = "/auth/login";
//         if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true";
//         else if (reason === "inactivity") redirectUrl += "?autoLogout=true";
//         console.log(`AuthContext: Redirecting to: ${redirectUrl}`);
//         router.push(redirectUrl);
//       } else if (!isBroadcastLogout && wasLoggedIn) {
//         console.log(
//           `AuthContext: Logout occurred but already on login page or no window access. No redirect needed.`
//         );
//       }
//     },
//     [router]
//   ); // router dependency

//   // Keep logout reference updated
//   useEffect(() => {
//     logoutRef.current = logout;
//   }, [logout]);

//   // --- Inactivity Handling ---
//   const logoutDueToInactivity = useCallback(() => {
//     console.log("AuthContext: Inactivity timeout reached.");
//     logoutRef.current("inactivity");
//   }, []); // Stable ref

//   // Debounced function to reset inactivity timer
//   const resetInactivityTimerDebounced = useRef(
//     debounce((currentToken: string | null) => {
//       // Pass current token to check
//       if (logoutTimerRef.current) {
//         clearTimeout(logoutTimerRef.current);
//       }
//       // Only reset timer if a token exists
//       if (currentToken) {
//         // console.log(`AuthContext: Resetting inactivity timer (${INACTIVITY_TIMEOUT_MS / 1000 / 60} min)`);
//         logoutTimerRef.current = setTimeout(
//           logoutDueToInactivity,
//           INACTIVITY_TIMEOUT_MS
//         );
//       }
//     }, DEBOUNCE_WAIT_MS)
//   ).current;

//   // --- Refetch User Data ---
//   // Used for manual refreshes or broadcast updates
//   const refetchUser = useCallback(async () => {
//     const currentToken = token; // Use token from state at the time of call
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token in state.");
//       if (user !== null) {
//         console.log(
//           "AuthContext: Clearing user state as token is missing during refetch."
//         );
//         setUser(null); // Ensure user state is cleared if no token
//       }
//       return;
//     }
//     console.log("AuthContext: Refetching user data...");
//     // Indicate loading ONLY IF not already loading (prevents flicker if called rapidly)
//     if (!loading) setLoading(true);
//     try {
//       // Ensure Authorization header is set for this specific request
//       apiClient.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<User>("/dashboard/users/me");
//       const updatedBackendUser: User = response.data;

//       // Validate the received structure (important!)
//       if (
//         !updatedBackendUser?._id ||
//         !updatedBackendUser?.email ||
//         !updatedBackendUser?.kyc ||
//         typeof updatedBackendUser?.kyc?.status === "undefined"
//       ) {
//         throw new Error(
//           "Invalid user data structure received from /users/me during refetch"
//         );
//       }
//       console.log(
//         "AuthContext: Refetched user:",
//         updatedBackendUser.email,
//         "KYC Status:",
//         updatedBackendUser.kyc.status,
//         "Reason:",
//         updatedBackendUser.kyc.rejectionReason
//       );

//       // Create the state structure directly from the FULL fetched user data
//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kycStatus: updatedBackendUser.kyc.status, // Direct assignment
//         kycRejectionReason: updatedBackendUser.kyc.rejectionReason, // Direct assignment
//       };
//       setUser(userContextData); // Update context state WITH THE LATEST DATA
//       // --- End Refetch Update ---
//     } catch (error: any) {
//       console.error(
//         "AuthContext: Failed to refetch user data:",
//         error.response?.status,
//         error.response?.data?.message || error.message
//       );
//       if (error.response?.status === 401) {
//         console.error(
//           "AuthContext: 401 error during refetch, initiating logout."
//         );
//         logoutRef.current("sessionExpired"); // Logout with redirect
//       } else {
//         // For other errors during refetch, log it but maybe don't clear state immediately
//         console.error(
//           "AuthContext: Non-401 error during refetch. User state preserved for now."
//         );
//       }
//     } finally {
//       // Ensure loading is false even if called when already loading=false
//       setLoading(false);
//     }
//     // Dependencies: token ensures it runs with the current token state.
//     // loading helps prevent rapid setLoading(true) calls.
//     // user is NOT needed as a dependency here; we only care about the token.
//   }, [token, loading]);

//   // --- Login Function ---
//   const login = useCallback(
//     (backendUser: User, authToken: string) => {
//       // Validate the incoming user object rigorously
//       if (
//         !backendUser?._id ||
//         !backendUser?.email ||
//         !backendUser?.kyc ||
//         typeof backendUser?.kyc?.status === "undefined"
//       ) {
//         console.error(
//           "AuthContext: Login failed - Invalid user data received.",
//           backendUser
//         );
//         logoutRef.current("manual", true); // Logout without redirect (internal error)
//         return;
//       }
//       console.log(
//         "AuthContext: Logging in user:",
//         backendUser.email,
//         "KYC Status:",
//         backendUser.kyc.status,
//         "Reason:",
//         backendUser.kyc.rejectionReason
//       );

//       // Create state directly from the provided full User object
//       const userContextData: UserContextState = {
//         _id: backendUser._id,
//         fullName: backendUser.fullName,
//         email: backendUser.email,
//         role: backendUser.role,
//         kycStatus: backendUser.kyc.status,
//         kycRejectionReason: backendUser.kyc.rejectionReason,
//       };

//       // Update React state
//       setUser(userContextData);
//       setToken(authToken);

//       // Store ONLY token in localStorage
//       localStorage.setItem("token", authToken);

//       // Set Axios header
//       apiClient.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${authToken}`;

//       // Broadcast login
//       if (broadcastChannelRef.current) {
//         console.log("AuthContext: Broadcasting login message");
//         try {
//           broadcastChannelRef.current.postMessage("login");
//         } catch (e) {
//           console.error("AuthContext: BC postMessage error:", e);
//         }
//       }

//       resetInactivityTimerDebounced(authToken); // Pass token to timer reset
//     },
//     [resetInactivityTimerDebounced]
//   ); // Dependencies

//   // --- Initialization Effect (Mount) ---
//   useEffect(() => {
//     console.log("AuthProvider: Initializing state (Mount)...");
//     let isMounted = true; // Flag to prevent state updates after unmount
//     setLoading(true);
//     const storedToken = localStorage.getItem("token");
//     console.log(
//       `AuthProvider: Found token in localStorage? ${storedToken ? "Yes" : "No"}`
//     );

//     const initializeAuth = async () => {
//       if (storedToken && isMounted) {
//         console.log(
//           "AuthProvider: Token found. Setting token state and Axios header."
//         );
//         // Set token in state and Axios header *before* fetching
//         setToken(storedToken);
//         apiClient.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${storedToken}`;

//         try {
//           console.log(
//             "AuthProvider: Attempting to fetch initial user data from /dashboard/users/me..."
//           );
//           const response = await apiClient.get<User>("/dashboard/users/me");
//           const fetchedUser: User = response.data;
//           console.log("AuthProvider: Initial user fetch API call successful.");

//           // Validate the received structure (important!)
//           if (
//             !fetchedUser?._id ||
//             !fetchedUser?.email ||
//             !fetchedUser?.kyc ||
//             typeof fetchedUser?.kyc?.status === "undefined"
//           ) {
//             throw new Error(
//               "AuthProvider: Invalid user data structure received during init."
//             );
//           }

//           if (isMounted) {
//             // Create state directly from the fetched user data
//             const userContextData: UserContextState = {
//               _id: fetchedUser._id,
//               fullName: fetchedUser.fullName,
//               email: fetchedUser.email,
//               role: fetchedUser.role,
//               kycStatus: fetchedUser.kyc.status,
//               kycRejectionReason: fetchedUser.kyc.rejectionReason,
//             };
//             setUser(userContextData);
//             console.log(
//               "AuthProvider: User state updated successfully:",
//               userContextData.email,
//               "KYC:",
//               userContextData.kycStatus
//             );
//             resetInactivityTimerDebounced(storedToken); // Start timer after successful fetch
//           } else {
//             console.log(
//               "AuthProvider: Component unmounted before user state could be set."
//             );
//           }
//         } catch (error: any) {
//           console.error(
//             "AuthProvider: Failed to fetch user during init:",
//             error.response?.status,
//             error.response?.data?.message || error.message
//           );
//           if (isMounted) {
//             console.log(
//               "AuthProvider: Clearing token and user state due to fetch error."
//             );
//             localStorage.removeItem("token");
//             setToken(null);
//             setUser(null);
//             delete apiClient.defaults.headers.common["Authorization"];
//             // Redirect if 401 during init, preventing loops
//             if (
//               error.response?.status === 401 &&
//               typeof window !== "undefined"
//             ) {
//               if (!window.location.pathname.startsWith("/auth/login")) {
//                 console.log(
//                   "AuthProvider: Redirecting to login due to 401 during init fetch."
//                 );
//                 router.push("/auth/login?sessionExpired=true");
//               } else {
//                 console.log(
//                   "AuthProvider: 401 during init, but already on login page. No redirect."
//                 );
//               }
//             }
//           } else {
//             console.log(
//               "AuthProvider: Component unmounted before error handling could complete."
//             );
//           }
//         } finally {
//           if (isMounted) {
//             console.log(
//               "AuthProvider: Initial fetch process complete, setting loading = false."
//             );
//             setLoading(false);
//           }
//         }
//       } else {
//         console.log(
//           "AuthProvider: No token found in localStorage. Setting loading = false."
//         );
//         if (isMounted) {
//           // Ensure clean state if no token
//           setUser(null);
//           setToken(null);
//           delete apiClient.defaults.headers.common["Authorization"];
//           setLoading(false); // No fetch needed, loading finished
//         }
//       }
//     };

//     initializeAuth();

//     // Cleanup function
//     return () => {
//       console.log("AuthProvider: Unmounting initialization effect.");
//       isMounted = false;
//     };
//     // Run only once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Empty dependency array for mount effect

//   // --- Axios 401 Interceptor ---
//   useEffect(() => {
//     console.log("AuthProvider: Setting up Axios response interceptor.");
//     const responseInterceptor = apiClient.interceptors.response.use(
//       (response) => response, // Pass through successful responses
//       (error) => {
//         if (error.response?.status === 401) {
//           const requestUrl = error.config?.url || "Unknown URL";
//           console.log(
//             `Axios interceptor caught 401 from request to: ${requestUrl}`
//           );
//           // Check if a token was actually present when the 401 occurred
//           // Using localStorage check is okay here for quick verification
//           if (localStorage.getItem("token")) {
//             console.log(
//               "AuthProvider: Detected token failure (401). Logging out."
//             );
//             // Use 'sessionExpired' to trigger appropriate message on login page
//             logoutRef.current("sessionExpired"); // Always redirect on 401 if token was present
//           } else {
//             console.log(
//               "AuthProvider: Caught 401, but no token was present locally. Ignoring logout."
//             );
//           }
//         }
//         return Promise.reject(error); // Important to reject the promise
//       }
//     );
//     return () => {
//       console.log("AuthProvider: Ejecting Axios response interceptor.");
//       apiClient.interceptors.response.eject(responseInterceptor);
//     };
//   }, []); // No dependency on logoutRef needed as it uses the stable ref

//   // --- BroadcastChannel Listener ---
//   useEffect(() => {
//     const channel = broadcastChannelRef.current;
//     if (!channel) return;

//     const handleBroadcastMessage = (event: MessageEvent) => {
//       const localTokenBeforeAction = token; // Capture token state before potential async update
//       const localUserBeforeAction = user; // Capture user state

//       if (event.data === "logout") {
//         console.log(
//           "AuthProvider: Received logout message via BroadcastChannel."
//         );
//         // Use captured state to check if logout is needed
//         if (localUserBeforeAction !== null) {
//           console.log(
//             "AuthProvider: Performing logout in this tab due to broadcast."
//           );
//           logoutRef.current("manual", true); // Logout this tab without redirect
//         } else {
//           console.log(
//             "AuthProvider: Received logout broadcast, but already logged out in this tab."
//           );
//         }
//       } else if (event.data === "login") {
//         console.log(
//           "AuthProvider: Received login message via BroadcastChannel."
//         );
//         const currentLocalTokenInStorage = localStorage.getItem("token");
//         // Refetch if:
//         // 1. This tab has no token BUT localStorage now does.
//         // 2. This tab's token differs from localStorage's token.
//         // Use captured token state for comparison
//         if (
//           currentLocalTokenInStorage &&
//           (!localTokenBeforeAction ||
//             localTokenBeforeAction !== currentLocalTokenInStorage)
//         ) {
//           console.log(
//             "AuthProvider: Token mismatch or missing locally after login broadcast. Updating token and refetching user."
//           );
//           // Update local token state FIRST to match storage, then refetch
//           setToken(currentLocalTokenInStorage);
//           apiClient.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${currentLocalTokenInStorage}`;
//           refetchUser(); // Fetch user for the new token
//         } else if (!currentLocalTokenInStorage && localTokenBeforeAction) {
//           // Logged in this tab, but localStorage cleared? Logout this tab.
//           console.warn(
//             "AuthProvider: Login broadcast received, but no token in localStorage. Logging out this tab."
//           );
//           logoutRef.current("manual", true);
//         } else if (
//           currentLocalTokenInStorage &&
//           localTokenBeforeAction === currentLocalTokenInStorage &&
//           !localUserBeforeAction
//         ) {
//           // Token matches, but user state is somehow null? Refetch.
//           console.log(
//             "AuthProvider: Token matches after login broadcast, but user state is null. Refetching."
//           );
//           refetchUser();
//         } else {
//           console.log(
//             "AuthProvider: Received login broadcast, state seems consistent. No action needed."
//           );
//         }
//       }
//     };

//     console.log("AuthProvider: Adding BroadcastChannel message listener.");
//     channel.addEventListener("message", handleBroadcastMessage);
//     return () => {
//       console.log("AuthProvider: Removing BroadcastChannel message listener.");
//       if (broadcastChannelRef.current) {
//         // Use ref.current in cleanup
//         broadcastChannelRef.current.removeEventListener(
//           "message",
//           handleBroadcastMessage
//         );
//       }
//     };
//     // Dependencies ensure listener is updated if critical state/functions change
//   }, [user, token, refetchUser]);

//   // --- Inactivity Event Listeners ---
//   useEffect(() => {
//     const events: (keyof WindowEventMap)[] = [
//       "mousemove",
//       "mousedown",
//       "keypress",
//       "scroll",
//       "touchstart",
//     ];

//     // Define the handler function that resets the timer *using the current token*
//     // It uses the debounced function which already checks if the token is valid before setting the timer.
//     const activityHandler = () => {
//       // No need to pass token here, the debounced function uses the latest state
//       // resetInactivityTimerDebounced(token); //<- Original way passing potentially stale token closure

//       // Call the debounced function directly. It will internally use the *latest* token state
//       // from its own definition scope or the check inside it will use the state variable directly.
//       // The existing `resetInactivityTimerDebounced` already correctly checks `currentToken`.
//       resetInactivityTimerDebounced(token); // Let's stick to passing the token to be explicit
//     };

//     // --- Conditional Listener Logic ---
//     if (token && typeof window !== "undefined") {
//       // ONLY add listeners if a token exists (user is logged in)
//       console.log(
//         "AuthProvider: Adding activity listeners (User is logged in)."
//       );
//       events.forEach((event) =>
//         window.addEventListener(event, activityHandler)
//       );

//       // Return a cleanup function that removes these exact listeners
//       return () => {
//         console.log(
//           "AuthProvider: Removing activity listeners (Token became null or component unmounted)."
//         );
//         events.forEach((event) =>
//           window.removeEventListener(event, activityHandler)
//         );
//         // It's crucial to cancel any pending debounced calls when listeners are removed
//         resetInactivityTimerDebounced.cancel();
//         // Also clear the timer itself immediately if logout is happening
//         if (logoutTimerRef.current) {
//           clearTimeout(logoutTimerRef.current);
//           logoutTimerRef.current = null;
//           console.log(
//             "AuthProvider: Cleared inactivity timer during listener cleanup."
//           );
//         }
//       };
//     } else if (typeof window !== "undefined") {
//       // If there's no token, ensure no listeners are active and cancel any pending debounces.
//       // This branch primarily handles the initial state (no token) and ensures
//       // cleanup if the token goes from valid to null. The useEffect dependency
//       // array handles triggering the cleanup when `token` changes.
//       console.log(
//         "AuthProvider: No token found, ensuring no activity listeners are active."
//       );
//       // Attempt to cancel just in case, although the cleanup function above should handle transitions
//       resetInactivityTimerDebounced.cancel();
//       // Explicitly clear timer if somehow still set without a token
//       if (logoutTimerRef.current) {
//         clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//         console.log(
//           "AuthProvider: Cleared inactivity timer because token is null/absent."
//         );
//       }
//     }
//     // Explicitly return undefined or nothing if no cleanup needed for this path
//     // return undefined; // Not strictly needed

//     // Depend on `token` so this effect re-runs when login/logout occurs.
//     // Also depend on `resetInactivityTimerDebounced` although it's based on a stable ref.
//   }, [token, resetInactivityTimerDebounced]); // Key dependency is `token`

//   // --- Derived State ---
//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   // --- Context Value ---
//   const contextValue: AuthContextType = useMemo(
//     () => ({
//       user,
//       token,
//       loading,
//       login,
//       logout: logoutRef.current, // Use the stable ref
//       isAdmin,
//       refetchUser, // Include refetchUser in the context value
//     }),
//     [user, token, loading, login, isAdmin, refetchUser]
//   ); // Add refetchUser dependency

//   // --- Render ---
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {/* Global Loading Indicator - shows during initial check */}
//       {loading && <GlobalLoadingIndicator />}
//       {/* Render children only when loading is complete */}
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // Optional Global Loading Indicator
// const GlobalLoadingIndicator = () => (
//   <div
//     className="fixed inset-0 z-[200] flex justify-center items-center bg-background/90 backdrop-blur-sm"
//     aria-label="Loading session"
//   >
//     <div className="text-center">
//       <Loader2 className="h-12 w-12 animate-spin text-primary mb-4 mx-auto" />
//       {/* <p className="text-lg font-semibold text-muted-foreground">Loading Session...</p> */}
//     </div>
//   </div>
// );

// export { AuthContext }; // Export context for direct consumption if needed


// // frontend/src/app/contexts/AuthContext.js
// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode, // Import ReactNode
// } from "react";
// import debounce from "lodash/debounce";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig"; // Ensure path is correct
// import { Loader2 } from "lucide-react"; // For loading indicator
// import type { KycStatus } from '@/app/services/kyc'; // Import type for KYC status

// // --- Types ---

// // Full User object structure from backend (used internally for fetching)
// export interface User {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: {
//     // Ensure this structure matches your backend response
//     status: KycStatus; // Use the imported KycStatus type
//     rejectionReason?: string | null;
//   };
//   createdAt: string; // Or Date
//   updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context
// // IMPORTANT: This is now only held in React state, NOT localStorage
// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kycStatus: KycStatus; // Correctly typed using imported KycStatus
//   kycRejectionReason?: string | null; // Correctly typed
// }

// // AuthContext structure
// interface AuthContextType {
//   user: UserContextState | null; // Holds the user data in React state
//   token: string | null; // Token is still managed
//   loading: boolean; // Indicates if auth state is being determined (fetching user)
//   login: (backendUser: User, authToken: string) => void; // Login receives full user initially
//   logout: (
//     reason?: "inactivity" | "sessionExpired" | "manual",
//     isBroadcastLogout?: boolean
//   ) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>; // Function to manually refresh user data
//   updateAuthUserKycStatus: (status: KycStatus, rejectionReason?: string | null) => void; // Exposed function
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes (adjust as needed)
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for activity listener

// // --- Axios Instance ---
// // Ensure baseURL is configured correctly
// const apiClient = axios.create({
//   baseURL: apiConfig.baseUrl,
// });

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null); // User data in React state
//   const [token, setToken] = useState<string | null>(null); // Token in React state
//   const [loading, setLoading] = useState<boolean>(true); // Initial loading is true
//   const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {}); // Ref for stable logout function access
//   const router = useRouter();

//   // Initialize BroadcastChannel
//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(
//           BROADCAST_CHANNEL_NAME
//         );
//         console.log(
//           "AuthContext: BroadcastChannel initialized:",
//           BROADCAST_CHANNEL_NAME
//         );
//       } catch (error) {
//         console.error(
//           "AuthContext: Failed to initialize BroadcastChannel:",
//           error
//         );
//       }
//     }
//     // Cleanup on unmount
//     return () => {
//       if (broadcastChannelRef.current) {
//         broadcastChannelRef.current.close();
//         broadcastChannelRef.current = null;
//         console.log("AuthContext: BroadcastChannel closed.");
//       }
//     };
//   }, []);

//   // --- Logout Function ---
//   const logout = useCallback(
//     (
//       reason: "inactivity" | "sessionExpired" | "manual" = "manual",
//       isBroadcastLogout = false // Flag to prevent rebroadcasting/redirect loops
//     ) => {
//       console.log(
//         `AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`
//       );
//       const wasLoggedIn = !!localStorage.getItem("token"); // Check *before* clearing

//       // Clear React state first
//       setUser(null);
//       setToken(null);

//       // Clear ONLY token from localStorage
//       localStorage.removeItem("token");

//       // Clear inactivity timer
//       if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//       logoutTimerRef.current = null;

//       // Remove Authorization header from Axios default
//       delete apiClient.defaults.headers.common["Authorization"];

//       // Broadcast logout to other tabs IF this logout wasn't triggered by a broadcast
//       if (!isBroadcastLogout && broadcastChannelRef.current) {
//         console.log("AuthContext: Broadcasting logout message");
//         try {
//           broadcastChannelRef.current.postMessage("logout");
//         } catch (e) {
//           console.error("AuthContext: BC postMessage error:", e);
//         }
//       }

//       // Redirect ONLY if NOT a broadcast logout, user WAS logged in, and not already on login
//       if (
//         typeof window !== "undefined" &&
//         !isBroadcastLogout &&
//         wasLoggedIn &&
//         !window.location.pathname.startsWith("/auth/login")
//       ) {
//         let redirectUrl = "/auth/login";
//         if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true";
//         else if (reason === "inactivity") redirectUrl += "?autoLogout=true";
//         console.log(`AuthContext: Redirecting to: ${redirectUrl}`);
//         router.push(redirectUrl); // Use Next.js router
//       } else if (!isBroadcastLogout && wasLoggedIn) {
//         console.log(
//           `AuthContext: Logout occurred but already on login page or no window access. No redirect needed.`
//         );
//       }
//     },
//     [router] // router dependency for navigation
//   );

//   // Keep logout reference updated for stable access in timeouts/listeners
//   useEffect(() => {
//     logoutRef.current = logout;
//   }, [logout]);

//   // --- Inactivity Handling ---
//   const logoutDueToInactivity = useCallback(() => {
//     console.log("AuthContext: Inactivity timeout reached.");
//     // Use the stable ref to call the latest logout function
//     logoutRef.current("inactivity");
//   }, []); // No dependencies needed as it uses the stable ref

//   // Debounced function to reset inactivity timer
//   const resetInactivityTimerDebounced = useRef(
//     debounce((currentToken: string | null) => {
//       // Clear existing timer
//       if (logoutTimerRef.current) {
//         clearTimeout(logoutTimerRef.current);
//       }
//       // Only set a new timer if a token exists (user is logged in)
//       if (currentToken) {
//         logoutTimerRef.current = setTimeout(
//           logoutDueToInactivity,
//           INACTIVITY_TIMEOUT_MS
//         );
//       }
//     }, DEBOUNCE_WAIT_MS)
//   ).current;

//   // --- Refetch User Data ---
//   const refetchUser = useCallback(async () => {
//     const currentToken = token; // Use token from state at the time of call
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token in state.");
//       if (user !== null) {
//         console.log(
//           "AuthContext: Clearing user state as token is missing during refetch."
//         );
//         setUser(null); // Ensure user state is cleared if no token
//       }
//       return;
//     }
//     console.log("AuthContext: Refetching user data...");
//     // Indicate loading ONLY IF not already loading (prevents flicker)
//     if (!loading) setLoading(true);
//     try {
//       // Ensure Authorization header is set for this specific request
//       apiClient.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${currentToken}`;
//       // Assuming '/dashboard/users/me' returns the full User object including nested KYC
//       const response = await apiClient.get<User>("/dashboard/users/me");
//       const updatedBackendUser: User = response.data;

//       // --- Rigorous Validation ---
//       if (
//         !updatedBackendUser?._id ||
//         !updatedBackendUser?.email ||
//         !updatedBackendUser?.kyc || // Check kyc object exists
//         typeof updatedBackendUser?.kyc?.status !== 'string' || // Check status exists and is string
//         !updatedBackendUser?.role
//       ) {
//         console.error(
//           "AuthContext: Invalid user data structure received during refetch:",
//           updatedBackendUser
//         );
//         // Decide on error handling: Maybe logout if structure is critically wrong?
//         // For now, log the error and don't update state to avoid breaking UI.
//         // logoutRef.current("sessionExpired"); // Option: Logout on bad data
//         throw new Error("Invalid user data structure received from API during refetch");
//       }
//       // --- End Validation ---

//       console.log(
//         "AuthContext: Refetched user:",
//         updatedBackendUser.email,
//         "KYC Status:",
//         updatedBackendUser.kyc.status, // Log status
//         "KYC Reason:",
//         updatedBackendUser.kyc.rejectionReason // Log reason
//       );

//       // Create the flattened state structure directly from the FULL fetched user data
//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kycStatus: updatedBackendUser.kyc.status, // Assign status
//         kycRejectionReason: updatedBackendUser.kyc.rejectionReason, // Assign reason
//       };
//       setUser(userContextData); // Update context state WITH THE LATEST DATA

//     } catch (error: any) {
//       console.error(
//         "AuthContext: Failed to refetch user data:",
//         error.response?.status,
//         error.response?.data?.message || error.message
//       );
//       // Handle 401 specifically - means token is invalid
//       if (error.response?.status === 401) {
//         console.error(
//           "AuthContext: 401 error during refetch, initiating logout."
//         );
//         logoutRef.current("sessionExpired"); // Logout with redirect
//       } else {
//         // For other errors during refetch, log it. Don't clear state immediately
//         // as it might be a temporary network issue. The UI will show the old state.
//         console.error(
//           "AuthContext: Non-401 error during refetch. User state preserved."
//         );
//       }
//     } finally {
//       // Ensure loading is set to false, even if it was already false
//       // This handles rapid calls where loading might not have been set to true
//       setLoading(false);
//     }
//     // Dependencies: token ensures it runs with the current token state.
//     // loading helps prevent setting loading=true unnecessarily.
//   }, [token, loading]); // User state is updated *inside* the function, not a dependency

//   // --- Login Function ---
//   const login = useCallback(
//     (backendUser: User, authToken: string) => {
//       // --- Rigorous Validation ---
//       if (
//         !backendUser?._id ||
//         !backendUser?.email ||
//         !backendUser?.kyc || // Check kyc object exists
//         typeof backendUser?.kyc?.status !== 'string' || // Check status exists and is string
//         !backendUser?.role
//       ) {
//         console.error(
//           "AuthContext: Login failed - Invalid user data received.",
//           backendUser
//         );
//         // Log out this tab without redirecting (internal error)
//         logoutRef.current("manual", true);
//         return;
//       }
//       // --- End Validation ---

//       console.log(
//         "AuthContext: Logging in user:",
//         backendUser.email,
//         "KYC Status:",
//         backendUser.kyc.status, // Log status
//         "KYC Reason:",
//         backendUser.kyc.rejectionReason // Log reason
//       );

//       // Create the flattened state structure directly from the provided full User object
//       const userContextData: UserContextState = {
//         _id: backendUser._id,
//         fullName: backendUser.fullName,
//         email: backendUser.email,
//         role: backendUser.role,
//         kycStatus: backendUser.kyc.status, // Assign status
//         kycRejectionReason: backendUser.kyc.rejectionReason, // Assign reason
//       };

//       // Update React state
//       setUser(userContextData);
//       setToken(authToken);

//       // Store ONLY token in localStorage
//       localStorage.setItem("token", authToken);

//       // Set Axios header for subsequent requests
//       apiClient.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${authToken}`;

//       // Broadcast login event to other tabs
//       if (broadcastChannelRef.current) {
//         console.log("AuthContext: Broadcasting login message");
//         try {
//           broadcastChannelRef.current.postMessage("login");
//         } catch (e) {
//           console.error("AuthContext: BC postMessage error:", e);
//         }
//       }

//       // Reset inactivity timer using the new token
//       resetInactivityTimerDebounced(authToken);
//     },
//     [resetInactivityTimerDebounced] // Dependency on the debounced reset function
//   );

//   // --- Function to Update KYC Status (called by other contexts/components) ---
//   const updateAuthUserKycStatus = useCallback((newStatus: KycStatus, newRejectionReason?: string | null) => {
//     console.log(`[AuthContext] Updating KYC status in auth state to: ${newStatus}`);
//     setUser(currentUser => {
//         if (!currentUser) return null; // No user to update
//         // Only update if the status or reason has actually changed
//         if (currentUser.kycStatus === newStatus && currentUser.kycRejectionReason === (newRejectionReason ?? null)) {
//             console.log("[AuthContext] KYC status unchanged, skipping state update.");
//             return currentUser; // Return existing state object
//         }
//         // Create a new user object with updated KYC info to trigger re-render
//         console.log("[AuthContext] KYC status changed, updating user state object.");
//         return {
//             ...currentUser,
//             kycStatus: newStatus,
//             // Ensure null is used if newRejectionReason is undefined or null
//             kycRejectionReason: newRejectionReason ?? null,
//         };
//     });
// }, []); // No dependencies, relies on setUser's functional update


//   // --- Initialization Effect (Mount) ---
//   useEffect(() => {
//     console.log("AuthProvider: Initializing state (Mount)...");
//     let isMounted = true; // Flag to prevent state updates after unmount
//     setLoading(true);
//     const storedToken = localStorage.getItem("token");
//     console.log(
//       `AuthProvider: Found token in localStorage? ${storedToken ? "Yes" : "No"}`
//     );

//     const initializeAuth = async () => {
//       if (storedToken && isMounted) {
//         console.log(
//           "AuthProvider: Token found. Setting token state and Axios header."
//         );
//         // Set token in state and Axios header *before* fetching
//         setToken(storedToken);
//         apiClient.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${storedToken}`;

//         try {
//           console.log(
//             "AuthProvider: Attempting to fetch initial user data from /dashboard/users/me..."
//           );
//           const response = await apiClient.get<User>("/dashboard/users/me");
//           const fetchedUser: User = response.data;
//           console.log("AuthProvider: Initial user fetch API call successful.");

//           // --- Rigorous Validation ---
//           if (
//             !fetchedUser?._id ||
//             !fetchedUser?.email ||
//             !fetchedUser?.kyc ||
//             typeof fetchedUser?.kyc?.status !== 'string' ||
//             !fetchedUser?.role
//           ) {
//             console.error(
//               "AuthProvider: Invalid user data structure received during init:",
//               fetchedUser
//             );
//             throw new Error("Invalid user data structure received during init.");
//           }
//           // --- End Validation ---


//           if (isMounted) {
//             // Create state directly from the fetched user data
//             const userContextData: UserContextState = {
//               _id: fetchedUser._id,
//               fullName: fetchedUser.fullName,
//               email: fetchedUser.email,
//               role: fetchedUser.role,
//               kycStatus: fetchedUser.kyc.status,
//               kycRejectionReason: fetchedUser.kyc.rejectionReason,
//             };
//             setUser(userContextData);
//             console.log(
//               "AuthProvider: User state updated successfully:",
//               userContextData.email,
//               "KYC:",
//               userContextData.kycStatus
//             );
//             // Start inactivity timer only after successful initial fetch
//             resetInactivityTimerDebounced(storedToken);
//           } else {
//             console.log(
//               "AuthProvider: Component unmounted before user state could be set."
//             );
//           }
//         } catch (error: any) {
//           console.error(
//             "AuthProvider: Failed to fetch user during init:",
//             error.response?.status,
//             error.response?.data?.message || error.message
//           );
//           if (isMounted) {
//             console.log(
//               "AuthProvider: Clearing token and user state due to fetch error."
//             );
//             // Clean up state and localStorage on fetch failure
//             localStorage.removeItem("token");
//             setToken(null);
//             setUser(null);
//             delete apiClient.defaults.headers.common["Authorization"];

//             // Redirect if 401 during init to prevent loops, only if not already on login
//             if (
//               error.response?.status === 401 &&
//               typeof window !== "undefined" &&
//               !window.location.pathname.startsWith("/auth/login")
//             ) {
//                console.log(
//                  "AuthProvider: Redirecting to login due to 401 during init fetch."
//                );
//                router.push("/auth/login?sessionExpired=true");
//             }
//           } else {
//             console.log(
//               "AuthProvider: Component unmounted before error handling could complete."
//             );
//           }
//         } finally {
//           // Ensure loading is set to false after attempt, regardless of outcome
//           if (isMounted) {
//             console.log(
//               "AuthProvider: Initial fetch process complete, setting loading = false."
//             );
//             setLoading(false);
//           }
//         }
//       } else {
//         // No token found, initialization is complete, not logged in
//         console.log(
//           "AuthProvider: No token found in localStorage. Setting loading = false."
//         );
//         if (isMounted) {
//           // Ensure clean state if no token
//           setUser(null);
//           setToken(null);
//           delete apiClient.defaults.headers.common["Authorization"];
//           setLoading(false); // No fetch needed, loading finished
//         }
//       }
//     };

//     initializeAuth();

//     // Cleanup function for the mount effect
//     return () => {
//       console.log("AuthProvider: Unmounting initialization effect.");
//       isMounted = false;
//     };
//     // Run only once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Empty dependency array ensures this runs only once

//   // --- Axios 401 Interceptor ---
//   useEffect(() => {
//     console.log("AuthProvider: Setting up Axios response interceptor.");
//     const responseInterceptor = apiClient.interceptors.response.use(
//       (response) => response, // Pass through successful responses
//       (error) => {
//         // Check if it's a 401 error
//         if (error.response?.status === 401) {
//           const requestUrl = error.config?.url || "Unknown URL";
//           console.log(
//             `Axios interceptor caught 401 from request to: ${requestUrl}`
//           );
//           // Check if a token was actually present when the 401 occurred
//           // This helps distinguish between unauthorized access and an expired/invalid token
//           if (localStorage.getItem("token")) {
//             console.log(
//               "AuthProvider: Detected token failure (401). Logging out."
//             );
//             // Use 'sessionExpired' to trigger appropriate message on login page
//             // Call logout using the stable ref, ensuring redirect happens
//             logoutRef.current("sessionExpired");
//           } else {
//             console.log(
//               "AuthProvider: Caught 401, but no token was present locally. Ignoring automatic logout."
//             );
//           }
//         }
//         // Important: Reject the promise so the original caller can handle the error
//         return Promise.reject(error);
//       }
//     );
//     // Cleanup: Eject the interceptor when the provider unmounts
//     return () => {
//       console.log("AuthProvider: Ejecting Axios response interceptor.");
//       apiClient.interceptors.response.eject(responseInterceptor);
//     };
//     // Run only once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Empty dependency array

//   // --- BroadcastChannel Listener ---
//   useEffect(() => {
//     const channel = broadcastChannelRef.current;
//     if (!channel) return; // Exit if channel not initialized

//     const handleBroadcastMessage = (event: MessageEvent) => {
//       // Capture current state *at the time the message is received*
//       const localTokenBeforeAction = token;
//       const localUserBeforeAction = user;

//       if (event.data === "logout") {
//         console.log(
//           "AuthProvider: Received logout message via BroadcastChannel."
//         );
//         // Only logout this tab if it was previously logged in
//         if (localUserBeforeAction !== null) {
//           console.log(
//             "AuthProvider: Performing logout in this tab due to broadcast."
//           );
//           // Use the stable ref, indicate it's a broadcast logout (no redirect/rebroadcast)
//           logoutRef.current("manual", true);
//         } else {
//           console.log(
//             "AuthProvider: Received logout broadcast, but already logged out in this tab."
//           );
//         }
//       } else if (event.data === "login") {
//         console.log(
//           "AuthProvider: Received login message via BroadcastChannel."
//         );
//         // Get the token potentially set by another tab
//         const currentLocalTokenInStorage = localStorage.getItem("token");

//         // Update this tab's state if:
//         // 1. This tab has no token BUT localStorage now does (another tab logged in).
//         // 2. This tab's token differs from localStorage's token (unlikely but possible).
//         if (
//           currentLocalTokenInStorage &&
//           (!localTokenBeforeAction ||
//             localTokenBeforeAction !== currentLocalTokenInStorage)
//         ) {
//           console.log(
//             "AuthProvider: Token mismatch or missing locally after login broadcast. Updating token and refetching user."
//           );
//           // Update local token state FIRST to match storage, then refetch
//           setToken(currentLocalTokenInStorage);
//           apiClient.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${currentLocalTokenInStorage}`;
//           refetchUser(); // Fetch user data for the new token
//         }
//         // Optional edge case: Token matches, but user state is null? Refetch.
//         else if (
//           currentLocalTokenInStorage &&
//           localTokenBeforeAction === currentLocalTokenInStorage &&
//           !localUserBeforeAction
//         ) {
//           console.log(
//             "AuthProvider: Token matches after login broadcast, but user state is null. Refetching."
//           );
//           refetchUser();
//         } else {
//           console.log(
//             "AuthProvider: Received login broadcast, state seems consistent. No action needed."
//           );
//         }
//       }
//       // --- Add listener for user data updates ---
//       else if (event.data === "user_updated") {
//         console.log("AuthProvider: Received user_updated message via BroadcastChannel.");
//         // Always refetch user data to ensure consistency across tabs
//         // This avoids complex state merging logic.
//         refetchUser();
//       }
//       // --- End user data update listener ---
//     };

//     console.log("AuthProvider: Adding BroadcastChannel message listener.");
//     channel.addEventListener("message", handleBroadcastMessage);

//     // Cleanup listener on unmount or channel change
//     return () => {
//       console.log("AuthProvider: Removing BroadcastChannel message listener.");
//       if (broadcastChannelRef.current) {
//         // Use ref.current in cleanup to access the potentially updated channel instance
//         broadcastChannelRef.current.removeEventListener(
//           "message",
//           handleBroadcastMessage
//         );
//       }
//     };
//     // Dependencies ensure listener is updated if critical state/functions change
//   }, [user, token, refetchUser]); // Include refetchUser

//   // --- Inactivity Event Listeners ---
//   useEffect(() => {
//     const events: (keyof WindowEventMap)[] = [
//       "mousemove",
//       "mousedown",
//       "keypress",
//       "scroll",
//       "touchstart",
//       // "visibilitychange", // Add visibility change
//     ];

//     // Define the handler function that resets the timer
//     const activityHandler = () => {
//       // Only reset if the document is visible (prevents background tabs resetting timer)
//       if (document.visibilityState === 'visible') {
//           // Call the debounced function, passing the current token from state
//            resetInactivityTimerDebounced(token);
//       }
//     };

//     // --- Conditional Listener Logic ---
//     if (token && typeof window !== "undefined") {
//       // ONLY add listeners if a token exists (user is logged in)
//       console.log(
//         "AuthProvider: Adding activity listeners (User is logged in)."
//       );
//       events.forEach((event) =>
//         window.addEventListener(event, activityHandler, { passive: true }) // Use passive where possible
//       );
//       // Initial reset when listeners are added
//       activityHandler();

//       // Return a cleanup function that removes these exact listeners
//       return () => {
//         console.log(
//           "AuthProvider: Removing activity listeners (Token became null or component unmounted)."
//         );
//         events.forEach((event) =>
//           window.removeEventListener(event, activityHandler)
//         );
//         // Cancel any pending debounced calls
//         resetInactivityTimerDebounced.cancel();
//         // Clear the timer itself immediately
//         if (logoutTimerRef.current) {
//           clearTimeout(logoutTimerRef.current);
//           logoutTimerRef.current = null;
//           console.log(
//             "AuthProvider: Cleared inactivity timer during listener cleanup."
//           );
//         }
//       };
//     }
//     // No explicit 'else' needed - the effect depends on `token`, so when `token` becomes null,
//     // the cleanup function from the previous run (when token was present) executes.

//     // Depend on `token` so this effect re-runs when login/logout occurs.
//     // `resetInactivityTimerDebounced` is stable due to useRef.
//   }, [token, resetInactivityTimerDebounced]); // Key dependency is `token`

//   // --- Derived State ---
//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   // --- Context Value ---
//   // Memoize the context value to prevent unnecessary re-renders of consumers
//   const contextValue: AuthContextType = useMemo(
//     () => ({
//       user,
//       token,
//       loading,
//       login,
//       logout: logoutRef.current, // Provide the stable logout function ref
//       isAdmin,
//       refetchUser,
//       updateAuthUserKycStatus, // Expose the update function
//     }),
//     // Dependencies include all values provided in the context object
//     [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKycStatus]
//   );

//   // --- Render ---
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {/* Global Loading Indicator - shows during initial check */}
//       {/* Conditionally render based on loading state */}
//       {loading ? <GlobalLoadingIndicator /> : children}
//     </AuthContext.Provider>
//   );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     // This error prevents using useAuth outside of AuthProvider
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // Optional Global Loading Indicator Component
// const GlobalLoadingIndicator = () => (
//   <div
//     className="fixed inset-0 z-[200] flex justify-center items-center bg-background/80 backdrop-blur-sm" // Slightly less opaque background
//     aria-label="Loading session"
//     role="status" // Add role for accessibility
//   >
//     <div className="text-center">
//       <Loader2 className="h-10 w-10 animate-spin text-primary mb-3 mx-auto" /> {/* Adjusted size/margin */}
//       {/* Optional: Add text if needed, but often just the spinner is sufficient */}
//       {/* <p className="text-base font-medium text-muted-foreground">Loading...</p> */}
//     </div>
//   </div>
// );

// // Export context itself only if needed for advanced direct consumption scenarios
// // export { AuthContext };


// // frontend/src/app/contexts/AuthContext.js
// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode, // Import ReactNode
// } from "react";
// import debounce from "lodash/debounce";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig"; // Ensure path is correct
// import { Loader2 } from "lucide-react"; // For loading indicator
// import type { KycStatus } from '@/app/services/kyc'; // Import type for KYC status

// // --- Types ---

// // Full User object structure from backend API response
// interface BackendUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: { // Nested KYC object from API
//     status: KycStatus;
//     rejectionReason?: string | null;
//     // Potentially other KYC details we might not need directly in AuthContext state
//   };
//   createdAt: string; // Or Date
//   updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context (flattened)
// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kycStatus: KycStatus; // Flattened for easy access
//   kycRejectionReason: string | null; // Flattened
// }

// // AuthContext structure
// interface AuthContextType {
//   user: UserContextState | null; // Holds the flattened user data in React state
//   token: string | null;
//   loading: boolean; // Indicates if INITIAL auth state is being determined
//   login: (backendUser: BackendUser, authToken: string) => void; // Takes full backend user
//   logout: (reason?: "inactivity" | "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>; // Function to manually refresh user data
//   updateAuthUserKycStatus: (status: KycStatus, rejectionReason?: string | null) => void; // Exposed function
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
// const DEBOUNCE_WAIT_MS = 500;

// // --- Axios Instance ---
// const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

// // --- Helper: Validate Backend User Structure ---
// const isValidBackendUser = (data: any): data is BackendUser => {
//   return (
//     data && typeof data === 'object' &&
//     typeof data._id === 'string' && data._id &&
//     typeof data.email === 'string' && data.email &&
//     typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
//     typeof data.kyc === 'object' && data.kyc !== null &&
//     typeof data.kyc.status === 'string' // Check only for status existence and type
//     // We don't strictly require rejectionReason to exist here
//   );
// };

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Tracks ONLY the initial load
//   const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {});
//   const router = useRouter();

//   // --- Initialize BroadcastChannel ---
//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         console.log("AuthContext: BroadcastChannel initialized");
//       } catch (error) { console.error("AuthContext: Failed to init BC:", error); }
//     }
//     return () => { broadcastChannelRef.current?.close(); broadcastChannelRef.current = null; };
//   }, []);

//   // --- Logout Function ---
//   const logout = useCallback((reason: "inactivity" | "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
//       console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//       const wasLoggedIn = !!localStorage.getItem("token");
//       setUser(null); setToken(null);
//       localStorage.removeItem("token");
//       if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current); logoutTimerRef.current = null;
//       delete apiClient.defaults.headers.common["Authorization"];
//       if (!isBroadcastLogout && broadcastChannelRef.current) { try { broadcastChannelRef.current.postMessage("logout"); } catch (e) { console.error("AuthContext: BC post error:", e); }}
//       if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
//         let redirectUrl = "/auth/login"; if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true"; else if (reason === "inactivity") redirectUrl += "?autoLogout=true";
//         router.push(redirectUrl);
//       }
//     }, [router] ); // router dependency

//   useEffect(() => { logoutRef.current = logout; }, [logout]); // Keep logout ref updated

//   // --- Inactivity Handling ---
//   const logoutDueToInactivity = useCallback(() => { logoutRef.current("inactivity"); }, []);
//   const resetInactivityTimerDebounced = useRef(debounce((currentToken: string | null) => {
//       if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//       if (currentToken) { logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS); }
//     }, DEBOUNCE_WAIT_MS)).current;

//   // --- Refetch User Data ---
//   const refetchUser = useCallback(async () => {
//     const currentToken = localStorage.getItem("token"); // Get fresh token from storage
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token found.");
//       if (user !== null) setUser(null); // Clear user if token gone
//       if (token !== null) setToken(null); // Clear token state too
//       return;
//     }
//     console.log("AuthContext: Refetching user data...");
//     // Don't set global 'loading' here, refetch is usually in background
//     try {
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<BackendUser>("/dashboard/users/me"); // Ensure endpoint returns BackendUser structure

//       if (!isValidBackendUser(response.data)) {
//         console.error("AuthContext: Invalid user data structure received during refetch:", response.data);
//         throw new Error("Invalid user data structure received from API during refetch");
//       }
//       const updatedBackendUser: BackendUser = response.data;

//       console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);
//       // Create the flattened state structure
//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kycStatus: updatedBackendUser.kyc.status,
//         kycRejectionReason: updatedBackendUser.kyc.rejectionReason ?? null, // Ensure null if undefined
//       };
//       setUser(userContextData); // Update state
//       setToken(currentToken); // Ensure token state is synced

//       // ---- REMOVED THIS BLOCK ----
//       // Broadcast that user data was updated (optional, but good for consistency)
//       // if (broadcastChannelRef.current) {
//       //   try {
//       //     broadcastChannelRef.current.postMessage("user_updated"); // THIS CAUSED THE LOOP
//       //   } catch(e) {
//       //     console.error("BC post error:", e)
//       //   }
//       // }
//       // ---- END REMOVED BLOCK ----

//     } catch (error: any) {
//       console.error("AuthContext: Failed to refetch user data:", error.response?.status, error.response?.data?.message || error.message);
//       if (error.response?.status === 401) { logoutRef.current("sessionExpired"); }
//       else { console.error("AuthContext: Non-401 error during refetch. User state preserved."); }
//     }
//     // No 'finally setLoading(false)' here, as we don't set loading=true for refetch
//   }, [user, token]); // Keep dependencies as they are needed for the initial check/clear logic


//   // --- Login Function ---
//   const login = useCallback((backendUser: BackendUser, authToken: string) => {
//       if (!isValidBackendUser(backendUser)) {
//         console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//         logoutRef.current("manual", true); return;
//       }
//       console.log("AuthContext: Logging in user:", backendUser.email, "KYC Status:", backendUser.kyc.status);
//       const userContextData: UserContextState = {
//         _id: backendUser._id, fullName: backendUser.fullName, email: backendUser.email, role: backendUser.role,
//         kycStatus: backendUser.kyc.status, kycRejectionReason: backendUser.kyc.rejectionReason ?? null,
//       };
//       setUser(userContextData); setToken(authToken);
//       localStorage.setItem("token", authToken);
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
//       if (broadcastChannelRef.current) { try { broadcastChannelRef.current.postMessage("login"); } catch (e) { console.error("AuthContext: BC post error:", e); } }
//       resetInactivityTimerDebounced(authToken);
//     }, [resetInactivityTimerDebounced]);

//   // --- Function to Update KYC Status Locally ---
//   const updateAuthUserKycStatus = useCallback((newStatus: KycStatus, newRejectionReason?: string | null) => {
//     console.log(`[AuthContext] Updating KYC status in auth state to: ${newStatus}`);
//     setUser(currentUser => {
//         if (!currentUser) return null;
//         const currentReason = currentUser.kycRejectionReason ?? null;
//         const nextReason = newRejectionReason ?? null;
//         if (currentUser.kycStatus === newStatus && currentReason === nextReason) {
//             console.log("[AuthContext] KYC status unchanged, skipping state update.");
//             return currentUser; // Return same object - no re-render needed
//         }
//         console.log("[AuthContext] KYC status changed, updating user state object.");
//         return { ...currentUser, kycStatus: newStatus, kycRejectionReason: nextReason }; // Create NEW object
//     });
//   }, []); // No dependencies needed for functional update

//   // --- Initialization Effect (Mount) ---
//   useEffect(() => {
//     console.log("AuthProvider: Initializing state (Mount)...");
//     let isMounted = true; setLoading(true); // Set initial loading true
//     const storedToken = localStorage.getItem("token");

//     const initializeAuth = async () => {
//       if (storedToken && isMounted) {
//         console.log("AuthProvider: Token found. Setting token state and fetching user.");
//         setToken(storedToken); apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
//         try {
//           const response = await apiClient.get<BackendUser>("/dashboard/users/me");
//           if (!isValidBackendUser(response.data)) { throw new Error("Invalid user data structure received during init."); }
//           if (isMounted) {
//             const fetchedUser: BackendUser = response.data;
//             const userContextData: UserContextState = { _id: fetchedUser._id, fullName: fetchedUser.fullName, email: fetchedUser.email, role: fetchedUser.role, kycStatus: fetchedUser.kyc.status, kycRejectionReason: fetchedUser.kyc.rejectionReason ?? null };
//             setUser(userContextData);
//             resetInactivityTimerDebounced(storedToken);
//             console.log("AuthProvider: Initial user fetch success:", userContextData.email, "KYC:", userContextData.kycStatus);
//           }
//         } catch (error: any) {
//           console.error("AuthProvider: Failed to fetch user during init:", error.response?.status, error.message);
//           if (isMounted) { localStorage.removeItem("token"); setToken(null); setUser(null); delete apiClient.defaults.headers.common["Authorization"];
//             if (error.response?.status === 401 && typeof window !== "undefined" && !window.location.pathname.startsWith("/auth/login")) {
//                router.push("/auth/login?sessionExpired=true");
//             }
//           }
//         } finally { if (isMounted) { setLoading(false); } } // Set initial loading false
//       } else { if (isMounted) { setLoading(false); } } // No token, loading finished
//     };
//     initializeAuth();
//     return () => { isMounted = false; };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Run only once

//   // --- Axios 401 Interceptor ---
//   useEffect(() => {
//     const interceptor = apiClient.interceptors.response.use(res => res, error => {
//         if (error.response?.status === 401 && localStorage.getItem("token")) { logoutRef.current("sessionExpired"); }
//         return Promise.reject(error);
//       });
//     return () => { apiClient.interceptors.response.eject(interceptor); };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Run only once

//   // --- BroadcastChannel Listener ---
//   useEffect(() => {
//     const channel = broadcastChannelRef.current; if (!channel) return;
//     const handleBroadcast = (event: MessageEvent) => {
//       const localUserBefore = user; const localTokenBefore = token;
//       if (event.data === "logout" && localUserBefore !== null) logoutRef.current("manual", true);
//       else if (event.data === "login") {
//         const storageToken = localStorage.getItem("token");
//         if (storageToken && (!localTokenBefore || localTokenBefore !== storageToken)) { setToken(storageToken); apiClient.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`; refetchUser(); }
//         else if (storageToken && localTokenBefore === storageToken && !localUserBefore) refetchUser();
//       }
//        else if (event.data === "user_updated") { console.log("Auth BC: Received user_updated, refetching."); refetchUser(); }
//     };
//     channel.addEventListener("message", handleBroadcast);
//     return () => { if (broadcastChannelRef.current) { broadcastChannelRef.current.removeEventListener("message", handleBroadcast); }};
//   }, [user, token, refetchUser]); // Include refetchUser

//   // --- Inactivity Event Listeners ---
//   useEffect(() => {
//     const events: (keyof WindowEventMap)[] = [ "mousemove", "mousedown", "keypress", "scroll", "touchstart", ];
//     const activityHandler = () => { if (document.visibilityState === 'visible') resetInactivityTimerDebounced(token); };
//     if (token && typeof window !== "undefined") {
//       events.forEach((event) => window.addEventListener(event, activityHandler, { passive: true })); activityHandler(); // Initial reset
//       return () => { events.forEach((event) => window.removeEventListener(event, activityHandler)); resetInactivityTimerDebounced.cancel(); if (logoutTimerRef.current) { clearTimeout(logoutTimerRef.current); logoutTimerRef.current = null; } };
//     }
//   }, [token, resetInactivityTimerDebounced]); // Depend on token

//   // --- Derived State ---
//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   // --- Context Value ---
//   const contextValue: AuthContextType = useMemo(() => ({
//       user, token, loading, login, logout: logoutRef.current, isAdmin, refetchUser, updateAuthUserKycStatus,
//     }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKycStatus] );

//   // --- Render ---
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {/* Global Loading Indicator ONLY for initial load */}
//       {loading ? <GlobalLoadingIndicator /> : children}
//     </AuthContext.Provider>
//   );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };

// const GlobalLoadingIndicator = () => (
//   <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/80 backdrop-blur-sm" aria-label="Loading session" role="status">
//     <Loader2 className="h-10 w-10 animate-spin text-primary" />
//   </div>
// );


// // frontend/src/app/contexts/AuthContext.js
// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode, // Import ReactNode
// } from "react";
// import debounce from "lodash/debounce";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig"; // Ensure path is correct
// import { Loader2 } from "lucide-react"; // For loading indicator
// import type { KycStatus } from '@/app/services/kyc'; // Import type for KYC status

// // --- Types ---

// // Full User object structure from backend API response
// interface BackendUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: { // Nested KYC object from API
//     status: KycStatus;
//     rejectionReason?: string | null;
//     // Potentially other KYC details we might not need directly in AuthContext state
//   };
//   createdAt: string; // Or Date
//   updatedAt: string; // Or Date
// }

// // Simplified User state exposed by the context (flattened)
// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kycStatus: KycStatus; // Flattened for easy access
//   kycRejectionReason: string | null; // Flattened
// }

// // AuthContext structure
// interface AuthContextType {
//   user: UserContextState | null; // Holds the flattened user data in React state
//   token: string | null;
//   loading: boolean; // Indicates if INITIAL auth state is being determined
//   login: (backendUser: BackendUser, authToken: string) => void; // Takes full backend user
//   logout: (reason?: "inactivity" | "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>; // Function to manually refresh user data
//   updateAuthUserKycStatus: (status: KycStatus, rejectionReason?: string | null) => void; // Exposed function
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
// const DEBOUNCE_WAIT_MS = 500;

// // --- Axios Instance ---
// const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

// // --- Helper: Validate Backend User Structure ---
// const isValidBackendUser = (data: any): data is BackendUser => {
//   return (
//     data && typeof data === 'object' &&
//     typeof data._id === 'string' && data._id &&
//     typeof data.email === 'string' && data.email &&
//     typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
//     typeof data.kyc === 'object' && data.kyc !== null &&
//     typeof data.kyc.status === 'string' // Check only for status existence and type
//     // We don't strictly require rejectionReason to exist here
//   );
// };

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Tracks ONLY the initial load
//   const [isMounted, setIsMounted] = useState<boolean>(false); // <-- Hydration Fix: Track client mount
//   const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {});
//   const router = useRouter();

//   // --- Set Mounted State ---
//   // This effect runs only once on the client after the initial render
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // --- Initialize BroadcastChannel ---
//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         console.log("AuthContext: BroadcastChannel initialized");
//       } catch (error) { console.error("AuthContext: Failed to init BC:", error); }
//     }
//     return () => { broadcastChannelRef.current?.close(); broadcastChannelRef.current = null; };
//   }, []);

//   // --- Logout Function ---
//   const logout = useCallback((reason: "inactivity" | "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
//       console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//       const wasLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token"); // Check window existence
//       setUser(null); setToken(null);
//       if (typeof window !== 'undefined') localStorage.removeItem("token"); // Check window existence
//       if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current); logoutTimerRef.current = null;
//       delete apiClient.defaults.headers.common["Authorization"];
//       if (!isBroadcastLogout && broadcastChannelRef.current) { try { broadcastChannelRef.current.postMessage("logout"); } catch (e) { console.error("AuthContext: BC post error:", e); }}
//       if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
//         let redirectUrl = "/auth/login"; if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true"; else if (reason === "inactivity") redirectUrl += "?autoLogout=true";
//         router.push(redirectUrl);
//       }
//     }, [router] ); // router dependency

//   useEffect(() => { logoutRef.current = logout; }, [logout]); // Keep logout ref updated

//   // --- Inactivity Handling ---
//   const logoutDueToInactivity = useCallback(() => { logoutRef.current("inactivity"); }, []);
//   const resetInactivityTimerDebounced = useRef(debounce((currentToken: string | null) => {
//       if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
//       if (currentToken && typeof window !== 'undefined') { // Check window for setTimeout
//           logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//       }
//     }, DEBOUNCE_WAIT_MS)).current;

//   // --- Refetch User Data ---
//   const refetchUser = useCallback(async () => {
//     let currentToken: string | null = null;
//     if (typeof window !== 'undefined') { // Check window existence
//         currentToken = localStorage.getItem("token"); // Get fresh token from storage
//     }

//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token found.");
//       if (user !== null) setUser(null); // Clear user if token gone
//       if (token !== null) setToken(null); // Clear token state too
//       delete apiClient.defaults.headers.common["Authorization"]; // Ensure header removed
//       return;
//     }
//     console.log("AuthContext: Refetching user data...");
//     // Don't set global 'loading' here, refetch is usually in background
//     try {
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<BackendUser>("/dashboard/users/me"); // Ensure endpoint returns BackendUser structure

//       if (!isValidBackendUser(response.data)) {
//         console.error("AuthContext: Invalid user data structure received during refetch:", response.data);
//         throw new Error("Invalid user data structure received from API during refetch");
//       }
//       const updatedBackendUser: BackendUser = response.data;

//       console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);
//       // Create the flattened state structure
//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kycStatus: updatedBackendUser.kyc.status,
//         kycRejectionReason: updatedBackendUser.kyc.rejectionReason ?? null, // Ensure null if undefined
//       };
//       setUser(userContextData); // Update state
//       setToken(currentToken); // Ensure token state is synced

//       // No broadcast on refetch to avoid potential loops if multiple tabs refetch simultaneously

//     } catch (error: any) {
//       console.error("AuthContext: Failed to refetch user data:", error.response?.status, error.response?.data?.message || error.message);
//       if (error.response?.status === 401) { logoutRef.current("sessionExpired"); }
//       else { console.error("AuthContext: Non-401 error during refetch. User state preserved."); }
//     }
//     // No 'finally setLoading(false)' here, as we don't set loading=true for refetch
//   }, [user, token]); // Dependencies are okay here


//   // --- Login Function ---
//   const login = useCallback((backendUser: BackendUser, authToken: string) => {
//       if (!isValidBackendUser(backendUser)) {
//         console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//         logoutRef.current("manual", true); return;
//       }
//       console.log("AuthContext: Logging in user:", backendUser.email, "KYC Status:", backendUser.kyc.status);
//       const userContextData: UserContextState = {
//         _id: backendUser._id, fullName: backendUser.fullName, email: backendUser.email, role: backendUser.role,
//         kycStatus: backendUser.kyc.status, kycRejectionReason: backendUser.kyc.rejectionReason ?? null,
//       };
//       setUser(userContextData); setToken(authToken);
//       if (typeof window !== 'undefined') localStorage.setItem("token", authToken); // Check window existence
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
//       if (broadcastChannelRef.current) { try { broadcastChannelRef.current.postMessage("login"); } catch (e) { console.error("AuthContext: BC post error:", e); } }
//       resetInactivityTimerDebounced(authToken);
//     }, [resetInactivityTimerDebounced]);

//   // --- Function to Update KYC Status Locally ---
//   const updateAuthUserKycStatus = useCallback((newStatus: KycStatus, newRejectionReason?: string | null) => {
//     console.log(`[AuthContext] Updating KYC status in auth state to: ${newStatus}`);
//     setUser(currentUser => {
//         if (!currentUser) return null;
//         const currentReason = currentUser.kycRejectionReason ?? null;
//         const nextReason = newRejectionReason ?? null;
//         if (currentUser.kycStatus === newStatus && currentReason === nextReason) {
//             console.log("[AuthContext] KYC status unchanged, skipping state update.");
//             return currentUser; // Return same object - no re-render needed
//         }
//         console.log("[AuthContext] KYC status changed, updating user state object.");
//         return { ...currentUser, kycStatus: newStatus, kycRejectionReason: nextReason }; // Create NEW object
//     });
//   }, []); // No dependencies needed for functional update

//   // --- Initialization Effect (Mount) ---
//   useEffect(() => {
//     // Only run initialization logic on the client AFTER mount
//     if (!isMounted) {
//         return;
//     }

//     console.log("AuthProvider: Initializing state (Client Mount)...");
//     setLoading(true); // Set initial loading true
//     let isActive = true; // Track if component is still mounted during async ops
//     let storedToken: string | null = null;
//     if (typeof window !== 'undefined') { // Check window existence
//         storedToken = localStorage.getItem("token");
//     }

//     const initializeAuth = async () => {
//       if (storedToken && isActive) {
//         console.log("AuthProvider: Token found. Setting token state and fetching user.");
//         setToken(storedToken); apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
//         try {
//           const response = await apiClient.get<BackendUser>("/dashboard/users/me");
//           if (!isValidBackendUser(response.data)) { throw new Error("Invalid user data structure received during init."); }
//           if (isActive) {
//             const fetchedUser: BackendUser = response.data;
//             const userContextData: UserContextState = { _id: fetchedUser._id, fullName: fetchedUser.fullName, email: fetchedUser.email, role: fetchedUser.role, kycStatus: fetchedUser.kyc.status, kycRejectionReason: fetchedUser.kyc.rejectionReason ?? null };
//             setUser(userContextData);
//             resetInactivityTimerDebounced(storedToken);
//             console.log("AuthProvider: Initial user fetch success:", userContextData.email, "KYC:", userContextData.kycStatus);
//           }
//         } catch (error: any) {
//           console.error("AuthProvider: Failed to fetch user during init:", error.response?.status, error.message);
//           if (isActive) {
//              // Call logout logic to clear state and storage, potentially redirecting
//              logoutRef.current(error.response?.status === 401 ? "sessionExpired" : "manual", true); // Use true to prevent broadcast loop if called from here
//              // Redirect only if 401 and not already on login page
//              if (error.response?.status === 401 && typeof window !== "undefined" && !window.location.pathname.startsWith("/auth/login")) {
//                 router.push("/auth/login?sessionExpired=true");
//              }
//           }
//         } finally { if (isActive) { setLoading(false); } } // Set initial loading false
//       } else { if (isActive) { setLoading(false); } } // No token, loading finished
//     };
//     initializeAuth();
//     return () => { isActive = false; }; // Cleanup function for async operations
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isMounted]); // Run this effect when isMounted becomes true

//   // --- Axios 401 Interceptor ---
//   useEffect(() => {
//     const interceptor = apiClient.interceptors.response.use(res => res, error => {
//         // Check for window existence before accessing localStorage
//         const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
//         if (error.response?.status === 401 && currentToken) {
//             console.log("AuthContext: Axios interceptor caught 401. Logging out.");
//             logoutRef.current("sessionExpired");
//         }
//         return Promise.reject(error);
//       });
//     return () => { apiClient.interceptors.response.eject(interceptor); };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Run only once

//   // --- BroadcastChannel Listener ---
//   useEffect(() => {
//     // Ensure channel exists before adding listener
//     const channel = broadcastChannelRef.current; if (!channel) return;

//     const handleBroadcast = (event: MessageEvent) => {
//       console.log("Auth BC: Received message - ", event.data);
//       const localUserBefore = user; const localTokenBefore = token;
//       const storageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

//       if (event.data === "logout") {
//          // Only logout if currently logged in locally
//          if (localUserBefore !== null || localTokenBefore !== null) {
//             console.log("Auth BC: Handling 'logout' broadcast.");
//             logoutRef.current("manual", true); // Use true to indicate it's a broadcast response
//          }
//       } else if (event.data === "login") {
//         console.log("Auth BC: Handling 'login' broadcast.");
//         // If we received a login broadcast, check if we need to update our state
//         if (storageToken && (!localTokenBefore || localTokenBefore !== storageToken)) {
//             console.log("Auth BC: Token mismatch or missing locally, refetching user.");
//             setToken(storageToken); // Immediately update token state
//             apiClient.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
//             refetchUser();
//         } else if (storageToken && localTokenBefore === storageToken && !localUserBefore) {
//             console.log("Auth BC: Token matches but user missing locally, refetching user.");
//             refetchUser();
//         } else if (!storageToken && (localUserBefore || localTokenBefore)) {
//             // This case shouldn't happen if logout broadcast works, but as a fallback:
//             console.warn("Auth BC: 'login' received but no token in storage, logging out locally.");
//             logoutRef.current("manual", true);
//         }
//       }
//       // Removed the "user_updated" broadcast sender and listener to prevent loops.
//       // Refetching on "login" handles state synchronization sufficiently in most cases.
//     };
//     channel.addEventListener("message", handleBroadcast);
//     return () => { if (broadcastChannelRef.current) { broadcastChannelRef.current.removeEventListener("message", handleBroadcast); }};
//   }, [user, token, refetchUser]); // Include refetchUser

//   // --- Inactivity Event Listeners ---
//   useEffect(() => {
//     // Only run on client
//     if (typeof window === 'undefined') return;

//     const events: (keyof WindowEventMap)[] = [ "mousemove", "mousedown", "keypress", "scroll", "touchstart", ];
//     const activityHandler = () => {
//         // Reset timer only if user is logged in and window is visible
//         if (token && document.visibilityState === 'visible') {
//             resetInactivityTimerDebounced(token);
//         }
//     };

//     if (token) {
//       events.forEach((event) => window.addEventListener(event, activityHandler, { passive: true }));
//       activityHandler(); // Initial reset when token becomes available or changes
//       return () => {
//           events.forEach((event) => window.removeEventListener(event, activityHandler));
//           resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced calls
//           if (logoutTimerRef.current) { clearTimeout(logoutTimerRef.current); logoutTimerRef.current = null; }
//       };
//     } else {
//         // If token becomes null (logout), clear any existing timer
//         resetInactivityTimerDebounced.cancel();
//         if (logoutTimerRef.current) { clearTimeout(logoutTimerRef.current); logoutTimerRef.current = null; }
//     }
//   }, [token, resetInactivityTimerDebounced]); // Depend on token

//   // --- Derived State ---
//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   // --- Context Value ---
//   const contextValue: AuthContextType = useMemo(() => ({
//       user, token, loading, login, logout: logoutRef.current, isAdmin, refetchUser, updateAuthUserKycStatus,
//     }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKycStatus] );

//   // --- Render ---
//   // Hydration Fix: Render loading indicator if not mounted OR if still loading after mount
//   // This ensures the initial client render matches the server render (which shows loading)
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {(!isMounted || loading) ? <GlobalLoadingIndicator /> : children}
//     </AuthContext.Provider>
//   );
// };

// // --- Hook & Global Loader ---
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };

// // Simple, SSR-safe loading indicator
// const GlobalLoadingIndicator = () => (
//   <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/80 backdrop-blur-sm" aria-label="Loading session" role="status">
//     <Loader2 className="h-10 w-10 animate-spin text-primary" />
//   </div>
// );

// // frontend/src/app/contexts/AuthContext.js
// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode, // Import ReactNode
// } from "react";
// import debounce from "lodash/debounce";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig"; // Ensure path is correct
// import { Loader2 } from "lucide-react"; // For loading indicator
// // --- MODIFIED: Import detailed KYC types ---
// import type { KycStatus, KycDetails, KycMobile } from '@/app/services/kyc';

// // --- Types ---

// // Full User object structure from backend API response
// interface BackendUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails; // Use the detailed KycDetails type from kyc service
//   createdAt: string; // Or Date
//   updatedAt: string; // Or Date
// }

// // User state exposed by the context - Includes nested kyc object
// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails; // <-- Include the full nested KycDetails object
// }

// // AuthContext structure
// interface AuthContextType {
//   user: UserContextState | null; // Holds the user data with nested KYC
//   token: string | null;
//   loading: boolean; // Indicates if INITIAL auth state is being determined
//   login: (backendUser: BackendUser, authToken: string) => void; // Takes full backend user
//   logout: (reason?: "inactivity" | "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>; // Function to manually refresh user data
//   updateAuthUserKyc: (updatedKycData: Partial<KycDetails>) => void; // Update parts of the KYC object
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for inactivity timer reset

// // --- Axios Instance ---
// // Configured to communicate with your backend API
// const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

// // --- Helper: Validate Backend User Structure ---
// // Validation function
// const isValidBackendUser = (data: any): data is BackendUser => {
//   return (
//     data && typeof data === 'object' &&
//     typeof data._id === 'string' && data._id &&
//     typeof data.email === 'string' && data.email &&
//     typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
//     // --- Most likely failure points ---
//     typeof data.kyc === 'object' && data.kyc !== null && // Checks kyc is a non-null object
//     typeof data.kyc.status === 'string' // Checks kyc has a status string
//   );
// };

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Tracks ONLY the initial load
//   const [isMounted, setIsMounted] = useState<boolean>(false); // Hydration Fix: Track client mount
//   const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {}); // Ref to hold the latest logout function
//   const router = useRouter();

//   // --- Set Mounted State ---
//   // This effect runs only once on the client after the initial render
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // --- Initialize BroadcastChannel ---
//   // Used for cross-tab communication (login/logout sync)
//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         console.log("AuthContext: BroadcastChannel initialized");
//       } catch (error) {
//         console.error("AuthContext: Failed to initialize BroadcastChannel:", error);
//       }
//     }
//     // Cleanup function to close the channel when the provider unmounts
//     return () => {
//       broadcastChannelRef.current?.close();
//       broadcastChannelRef.current = null;
//       console.log("AuthContext: BroadcastChannel closed");
//     };
//   }, []); // Run only once

//   // --- Logout Function ---
//   // Clears user state, token, local storage, and redirects if necessary
//   const logout = useCallback((reason: "inactivity" | "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
//       console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//       const wasLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token"); // Check if user was logged in before clearing

//       // Clear state
//       setUser(null);
//       setToken(null);

//       // Clear storage and Axios header
//       if (typeof window !== 'undefined') {
//           localStorage.removeItem("token");
//       }
//       delete apiClient.defaults.headers.common["Authorization"];

//       // Clear inactivity timer
//       if (logoutTimerRef.current) {
//           clearTimeout(logoutTimerRef.current);
//           logoutTimerRef.current = null;
//       }

//       // Broadcast logout to other tabs unless this is a response to a broadcast
//       if (!isBroadcastLogout && broadcastChannelRef.current) {
//           try {
//               broadcastChannelRef.current.postMessage("logout");
//               console.log("AuthContext: Sent 'logout' broadcast");
//           } catch (e) {
//               console.error("AuthContext: BroadcastChannel postMessage error:", e);
//           }
//       }

//       // Redirect to login page if logged out manually, due to inactivity, or session expiry,
//       // but only if user was previously logged in and not already on login page.
//       if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
//         let redirectUrl = "/auth/login";
//         if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true";
//         else if (reason === "inactivity") redirectUrl += "?autoLogout=true";
//         router.push(redirectUrl);
//       }
//     }, [router] ); // router is a dependency for redirection

//   // Keep a stable reference to the logout function for timers/listeners
//   useEffect(() => {
//     logoutRef.current = logout;
//   }, [logout]);

//   // --- Inactivity Handling ---
//   const logoutDueToInactivity = useCallback(() => {
//     console.log("AuthContext: Logging out due to inactivity.");
//     logoutRef.current("inactivity"); // Call the logout function with 'inactivity' reason
//   }, []); // No dependencies needed here

//   // Debounced function to reset the inactivity timer
//   const resetInactivityTimerDebounced = useRef(debounce((currentToken: string | null) => {
//       if (logoutTimerRef.current) {
//           clearTimeout(logoutTimerRef.current); // Clear existing timer
//       }
//       // Set a new timer only if a token exists (user is logged in) and window is available
//       if (currentToken && typeof window !== 'undefined') {
//           logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//       }
//     }, DEBOUNCE_WAIT_MS)).current; // Use useRef to keep the same debounced function across renders

//   // --- Refetch User Data ---
//   // Fetches fresh user data from the backend using the stored token
//   const refetchUser = useCallback(async () => {
//     let currentToken: string | null = null;
//     if (typeof window !== 'undefined') {
//         currentToken = localStorage.getItem("token"); // Get token from storage
//     }

//     // If no token, ensure user is logged out state-wise
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token found.");
//       if (user !== null) setUser(null); // Clear user state if token is gone
//       if (token !== null) setToken(null); // Clear token state
//       delete apiClient.defaults.headers.common["Authorization"]; // Ensure Axios header is clear
//       return;
//     }

//     console.log("AuthContext: Refetching user data...");
//     // Don't set global 'loading' here, refetch is usually in background
//     try {
//       // Ensure Axios header is set for the request
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<BackendUser>("/dashboard/users/me"); // API endpoint to get current user

//       // Validate the structure of the received data
//       if (!isValidBackendUser(response.data)) {
//         console.error("AuthContext: Invalid user data structure received during refetch:", response.data);
//         // Log out if data is invalid, as something is wrong
//         logoutRef.current("manual", true); // Use true to prevent broadcast loop
//         throw new Error("Invalid user data structure received from API during refetch");
//       }

//       const updatedBackendUser: BackendUser = response.data;
//       console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);

//       // --- Update state with the nested kyc object ---
//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kyc: updatedBackendUser.kyc, // Assign the full kyc object
//       };
//       setUser(userContextData); // Update user state
//       setToken(currentToken); // Ensure token state matches storage

//       // Reset inactivity timer as user data was successfully fetched (implies activity)
//       resetInactivityTimerDebounced(currentToken);

//     } catch (error: any) {
//       console.error("AuthContext: Failed to refetch user data:", error.response?.status, error.response?.data?.message || error.message);
//       // If unauthorized (401), log out due to expired/invalid session
//       if (error.response?.status === 401) {
//           logoutRef.current("sessionExpired");
//       }
//       // For other errors, log them but don't necessarily log out immediately
//       else {
//           console.error("AuthContext: Non-401 error during refetch. User state preserved for now.");
//       }
//     }
//     // No 'finally setLoading(false)' here, as we don't set loading=true for refetch
//   }, [user, token, resetInactivityTimerDebounced]); // Dependencies


//   // --- Login Function ---
//   // Sets user state, token, stores token, and sets Axios header
//   const login = useCallback((backendUser: BackendUser, authToken: string) => {
//       // Validate incoming user data structure
//       if (!isValidBackendUser(backendUser)) {
//         console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//         // Optionally clear any partial state if needed
//         logoutRef.current("manual", true); // Use true to prevent broadcast loop
//         return;
//       }

//       console.log("AuthContext: Logging in user:", backendUser.email, "KYC Status:", backendUser.kyc.status);

//       // --- Set the state with the nested kyc object ---
//       const userContextData: UserContextState = {
//         _id: backendUser._id,
//         fullName: backendUser.fullName,
//         email: backendUser.email,
//         role: backendUser.role,
//         kyc: backendUser.kyc, // Assign the full kyc object
//       };
//       setUser(userContextData);
//       setToken(authToken);

//       // Store token and set Axios header
//       if (typeof window !== 'undefined') {
//           localStorage.setItem("token", authToken);
//       }
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

//       // Broadcast login to other tabs
//       if (broadcastChannelRef.current) {
//           try {
//               broadcastChannelRef.current.postMessage("login");
//               console.log("AuthContext: Sent 'login' broadcast");
//           } catch (e) {
//               console.error("AuthContext: BroadcastChannel postMessage error:", e);
//           }
//       }

//       // Start/reset the inactivity timer
//       resetInactivityTimerDebounced(authToken);
//     }, [resetInactivityTimerDebounced]); // Dependency

//   // --- Function to Update KYC Data Locally ---
//   // Allows components to update parts of the user's KYC info in the context state
//   // Useful after a successful KYC update API call for immediate UI feedback
//   const updateAuthUserKyc = useCallback((updatedKycData: Partial<KycDetails>) => {
//     console.log(`[AuthContext] Updating KYC data in auth state with:`, updatedKycData);
//     setUser(currentUser => {
//         // If no current user, do nothing
//         if (!currentUser) return null;

//         // Create the next KYC state by merging existing data with updates
//         const nextKyc: KycDetails = {
//             ...currentUser.kyc, // Start with current KYC data
//             ...updatedKycData,  // Overwrite with provided updates
//              // Ensure nested objects like 'mobile' are handled correctly if updated partially
//              // If updatedKycData contains 'mobile', it should contain the full mobile object
//              mobile: updatedKycData.mobile ? { ...currentUser.kyc.mobile, ...updatedKycData.mobile } : currentUser.kyc.mobile,
//              // Add similar merging for other nested objects if applicable (e.g., documents array - though that's less likely updated this way)
//         };

//         // Simple check to see if anything actually changed to prevent unnecessary re-renders
//         // NOTE: This is a shallow comparison. For deep objects, changes within might not be detected.
//         // Consider using a deep-comparison library if complex nested updates are common.
//         if (JSON.stringify(currentUser.kyc) === JSON.stringify(nextKyc)) {
//              console.log("[AuthContext] KYC data unchanged after merge, skipping state update.");
//              return currentUser; // Return the existing state object
//         }

//         console.log("[AuthContext] KYC data changed, updating user state object.");
//         // Return a *new* user object with the updated kyc object to trigger re-render
//         return { ...currentUser, kyc: nextKyc };
//     });
//   }, []); // No dependencies needed for functional update pattern

//   // --- Initialization Effect (Mount) ---
//   // Checks for a token in local storage on initial client mount
//   // If found, validates it by fetching user data
//   useEffect(() => {
//     // Only run initialization logic on the client AFTER mount
//     if (!isMounted) {
//         return;
//     }

//     console.log("AuthProvider: Initializing state (Client Mount)...");
//     setLoading(true); // Start loading indicator
//     let isActive = true; // Flag to prevent state updates if component unmounts during async ops

//     let storedToken: string | null = null;
//     if (typeof window !== 'undefined') {
//         storedToken = localStorage.getItem("token"); // Check for existing token
//     }

//     const initializeAuth = async () => {
//       // If a token exists, try to fetch user data to validate it
//       if (storedToken && isActive) {
//         console.log("AuthProvider: Token found. Setting token state and fetching user.");
//         setToken(storedToken); apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

//         try {
//           const response = await apiClient.get<BackendUser>("/dashboard/users/me"); // Validate token by fetching user

//           // Validate the received user data structure
//           if (!isValidBackendUser(response.data)) {
//             throw new Error("Invalid user data structure received during initialization.");
//           }

//           // If component is still mounted, update user state
//           if (isActive) {
//             const fetchedUser: BackendUser = response.data;
//             // --- Set the state with the nested kyc object ---
//             const userContextData: UserContextState = {
//                 _id: fetchedUser._id,
//                 fullName: fetchedUser.fullName,
//                 email: fetchedUser.email,
//                 role: fetchedUser.role,
//                 kyc: fetchedUser.kyc, // Assign the full kyc object
//             };
//             setUser(userContextData); // Set user state
//             resetInactivityTimerDebounced(storedToken); // Start inactivity timer
//             console.log("AuthProvider: Initial user fetch success:", userContextData.email, "KYC:", userContextData.kyc.status);
//           }
//         } catch (error: any) {
//           console.error("AuthProvider: Failed to fetch user during init (token might be invalid/expired):", error.response?.status, error.message);
//           // If fetching user fails (e.g., 401 Unauthorized), log out
//           if (isActive) {
//              // Call logout logic - it handles clearing state, storage, and potential redirect
//              logoutRef.current(error.response?.status === 401 ? "sessionExpired" : "manual", true); // Use true to prevent broadcast loop
//              // No need to manually redirect here, logout function handles it if needed
//           }
//         } finally {
//           // Stop loading indicator once initialization attempt is complete
//           if (isActive) {
//             setLoading(false);
//           }
//         }
//       } else {
//         // No token found, initialization is complete (user is not logged in)
//         if (isActive) {
//           setLoading(false);
//         }
//       }
//     };

//     initializeAuth();

//     // Cleanup function for the effect
//     return () => {
//       isActive = false; // Mark component as unmounted
//       console.log("AuthProvider: Initializing effect cleanup.");
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isMounted]); // Run this effect only when isMounted becomes true

//   // --- Axios Response Interceptor for 401 Errors ---
//   // Automatically logs out the user if any API request returns a 401 Unauthorized
//   useEffect(() => {
//     const interceptor = apiClient.interceptors.response.use(
//       (response) => response, // Pass through successful responses
//       (error) => {
//         // Check if the error is a 401 and if a token currently exists (meaning user *was* logged in)
//         const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
//         if (error.response?.status === 401 && currentToken) {
//             console.log("AuthContext: Axios interceptor caught 401. Logging out.");
//             logoutRef.current("sessionExpired"); // Log out due to session expiry
//         }
//         // IMPORTANT: Reject the promise so the original caller handles the error too
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup function to remove the interceptor when the provider unmounts
//     return () => {
//       apiClient.interceptors.response.eject(interceptor);
//       console.log("AuthContext: Axios 401 interceptor removed.");
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Run only once on mount

//   // --- BroadcastChannel Listener ---
//   // Listens for messages from other tabs (login/logout)
//   useEffect(() => {
//     const channel = broadcastChannelRef.current;
//     if (!channel) return; // Don't add listener if channel failed to initialize

//     const handleBroadcast = (event: MessageEvent) => {
//       console.log("AuthContext BC: Received message - ", event.data);
//       const localUserBefore = user;
//       const localTokenBefore = token;
//       const storageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

//       if (event.data === "logout") {
//          // If we receive a logout message and are currently logged in, log out locally
//          if (localUserBefore !== null || localTokenBefore !== null) {
//             console.log("AuthContext BC: Handling 'logout' broadcast.");
//             logoutRef.current("manual", true); // Use true to indicate it's a broadcast response
//          }
//       } else if (event.data === "login") {
//         console.log("AuthContext BC: Handling 'login' broadcast.");
//         // If we receive a login message, check if our state needs updating
//         // Case 1: We have no token locally, or our token differs from storage -> Need to sync
//         if (storageToken && (!localTokenBefore || localTokenBefore !== storageToken)) {
//             console.log("AuthContext BC: Token mismatch or missing locally, refetching user.");
//             setToken(storageToken); // Immediately update token state from storage
//             apiClient.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`; // Update Axios header
//             refetchUser(); // Fetch user data corresponding to the new token
//         }
//         // Case 2: Token matches, but user data is missing locally -> Refetch
//         else if (storageToken && localTokenBefore === storageToken && !localUserBefore) {
//             console.log("AuthContext BC: Token matches but user missing locally, refetching user.");
//             refetchUser();
//         }
//         // Case 3: We received 'login' but there's no token in storage (edge case) -> Log out locally
//         else if (!storageToken && (localUserBefore || localTokenBefore)) {
//             console.warn("AuthContext BC: 'login' received but no token in storage, logging out locally.");
//             logoutRef.current("manual", true);
//         }
//       }
//       // NOTE: Removed "user_updated" broadcast to simplify and avoid potential loops.
//       // Synchronization relies on login/logout broadcasts and subsequent refetches.
//     };

//     channel.addEventListener("message", handleBroadcast);

//     // Cleanup listener
//     return () => {
//       if (broadcastChannelRef.current) {
//         broadcastChannelRef.current.removeEventListener("message", handleBroadcast);
//         console.log("AuthContext BC: Message listener removed.");
//       }
//     };
//   }, [user, token, refetchUser]); // Dependencies ensure listener has access to current state/functions

//   // --- Inactivity Event Listeners ---
//   // Resets the inactivity timer on user interaction
//   useEffect(() => {
//     // Only run on client-side
//     if (typeof window === 'undefined') return;

//     // Events that indicate user activity
//     const events: (keyof WindowEventMap)[] = [ "mousemove", "mousedown", "keypress", "scroll", "touchstart", ];

//     // Handler to reset the timer
//     const activityHandler = () => {
//         // Reset timer only if user is logged in (token exists) and the window/tab is visible
//         if (token && document.visibilityState === 'visible') {
//             resetInactivityTimerDebounced(token);
//         }
//     };

//     // Add listeners only if the user is logged in
//     if (token) {
//       console.log("AuthContext: Adding inactivity listeners.");
//       events.forEach((event) => window.addEventListener(event, activityHandler, { passive: true }));
//       activityHandler(); // Initial reset when token becomes available or changes

//       // Cleanup function to remove listeners and timer when token is cleared or component unmounts
//       return () => {
//           console.log("AuthContext: Removing inactivity listeners.");
//           events.forEach((event) => window.removeEventListener(event, activityHandler));
//           resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced calls
//           if (logoutTimerRef.current) {
//               clearTimeout(logoutTimerRef.current);
//               logoutTimerRef.current = null;
//           }
//       };
//     } else {
//         // If token becomes null (logout), ensure any existing timer/pending calls are cleared
//         resetInactivityTimerDebounced.cancel();
//         if (logoutTimerRef.current) {
//             clearTimeout(logoutTimerRef.current);
//             logoutTimerRef.current = null;
//         }
//     }
//   }, [token, resetInactivityTimerDebounced]); // Re-run when token changes

//   // --- Derived State ---
//   // Calculate isAdmin based on the current user state
//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   // --- Context Value ---
//   // Memoize the context value to prevent unnecessary re-renders of consumers
//   const contextValue: AuthContextType = useMemo(() => ({
//       user,
//       token,
//       loading,
//       login,
//       logout: logoutRef.current, // Provide the stable ref
//       isAdmin,
//       refetchUser,
//       updateAuthUserKyc, // Provide the KYC update function
//     }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKyc] ); // Include all provided values

//   // --- Render ---
//   // Render loading indicator if not mounted on client OR if initial loading is still in progress
//   // This prevents hydration mismatches between server and client initial render.
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {(!isMounted || loading) ? <GlobalLoadingIndicator /> : children}
//     </AuthContext.Provider>
//   );
// };

// // --- Hook to Consume Context ---
// // Provides a convenient way for components to access the auth context
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // --- Global Loading Indicator Component ---
// // Simple, centered spinner shown during initial auth state loading
// const GlobalLoadingIndicator = () => (
//   <div className="fixed inset-0 z-[200] flex justify-center items-center bg-background/80 backdrop-blur-sm" aria-label="Loading session" role="status">
//     <Loader2 className="h-10 w-10 animate-spin text-primary" />
//   </div>
// );

// // --- Export KYC types needed by AuthContext ---
// // Re-exporting types here can be convenient for components importing from AuthContext
// export type { KycStatus, KycDetails, KycMobile };


// // frontend/src/app/contexts/AuthContext.js
// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode, // Import ReactNode
// } from "react";
// import debounce from "lodash/debounce";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig"; // Ensure path is correct
// // --- MODIFIED: Import detailed KYC types ---
// import type { KycStatus, KycDetails, KycMobile } from '@/app/services/kyc';

// // --- Types ---

// // Full User object structure from backend API response
// interface BackendUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails; // Use the detailed KycDetails type from kyc service
//   createdAt: string; // Or Date
//   updatedAt: string; // Or Date
// }

// // User state exposed by the context - Includes nested kyc object
// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails; // <-- Include the full nested KycDetails object
// }

// // AuthContext structure
// interface AuthContextType {
//   user: UserContextState | null; // Holds the user data with nested KYC
//   token: string | null;
//   loading: boolean; // Indicates if INITIAL auth state is being determined
//   login: (backendUser: BackendUser, authToken: string) => void; // Takes full backend user
//   logout: (reason?: "inactivity" | "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>; // Function to manually refresh user data
//   updateAuthUserKyc: (updatedKycData: Partial<KycDetails>) => void; // Update parts of the KYC object
// }

// // --- Context Setup ---
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
// const DEBOUNCE_WAIT_MS = 500; // Debounce time for inactivity timer reset

// // --- Axios Instance ---
// // Configured to communicate with your backend API
// const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

// // --- Helper: Validate Backend User Structure ---
// // Validation function
// const isValidBackendUser = (data: any): data is BackendUser => {
//   return (
//     data && typeof data === 'object' &&
//     typeof data._id === 'string' && data._id &&
//     typeof data.email === 'string' && data.email &&
//     typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
//     // --- Most likely failure points ---
//     typeof data.kyc === 'object' && data.kyc !== null && // Checks kyc is a non-null object
//     typeof data.kyc.status === 'string' // Checks kyc has a status string
//   );
// };

// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Tracks ONLY the initial load
//   const [isMounted, setIsMounted] = useState<boolean>(false); // Hydration Fix: Track client mount
//   const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {}); // Ref to hold the latest logout function
//   const router = useRouter();

//   // --- Set Mounted State ---
//   // This effect runs only once on the client after the initial render
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // --- Initialize BroadcastChannel ---
//   // Used for cross-tab communication (login/logout sync)
//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         console.log("AuthContext: BroadcastChannel initialized");
//       } catch (error) {
//         console.error("AuthContext: Failed to initialize BroadcastChannel:", error);
//       }
//     }
//     // Cleanup function to close the channel when the provider unmounts
//     return () => {
//       broadcastChannelRef.current?.close();
//       broadcastChannelRef.current = null;
//       console.log("AuthContext: BroadcastChannel closed");
//     };
//   }, []); // Run only once

//   // --- Logout Function ---
//   // Clears user state, token, local storage, and redirects if necessary
//   const logout = useCallback((reason: "inactivity" | "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
//       console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//       const wasLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token"); // Check if user was logged in before clearing

//       // Clear state
//       setUser(null);
//       setToken(null);

//       // Clear storage and Axios header
//       if (typeof window !== 'undefined') {
//           localStorage.removeItem("token");
//       }
//       delete apiClient.defaults.headers.common["Authorization"];

//       // Clear inactivity timer
//       if (logoutTimerRef.current) {
//           clearTimeout(logoutTimerRef.current);
//           logoutTimerRef.current = null;
//       }

//       // Broadcast logout to other tabs unless this is a response to a broadcast
//       if (!isBroadcastLogout && broadcastChannelRef.current) {
//           try {
//               broadcastChannelRef.current.postMessage("logout");
//               console.log("AuthContext: Sent 'logout' broadcast");
//           } catch (e) {
//               console.error("AuthContext: BroadcastChannel postMessage error:", e);
//           }
//       }

//       // Redirect to login page if logged out manually, due to inactivity, or session expiry,
//       // but only if user was previously logged in and not already on login page.
//       if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
//         let redirectUrl = "/auth/login";
//         if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true";
//         else if (reason === "inactivity") redirectUrl += "?autoLogout=true";
//         router.push(redirectUrl);
//       }
//     }, [router] ); // router is a dependency for redirection

//   // Keep a stable reference to the logout function for timers/listeners
//   useEffect(() => {
//     logoutRef.current = logout;
//   }, [logout]);

//   // --- Inactivity Handling ---
//   const logoutDueToInactivity = useCallback(() => {
//     console.log("AuthContext: Logging out due to inactivity.");
//     logoutRef.current("inactivity"); // Call the logout function with 'inactivity' reason
//   }, []); // No dependencies needed here

//   // Debounced function to reset the inactivity timer
//   const resetInactivityTimerDebounced = useRef(debounce((currentToken: string | null) => {
//       if (logoutTimerRef.current) {
//           clearTimeout(logoutTimerRef.current); // Clear existing timer
//       }
//       // Set a new timer only if a token exists (user is logged in) and window is available
//       if (currentToken && typeof window !== 'undefined') {
//           logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//       }
//     }, DEBOUNCE_WAIT_MS)).current; // Use useRef to keep the same debounced function across renders

//   // --- Refetch User Data ---
//   // Fetches fresh user data from the backend using the stored token
//   const refetchUser = useCallback(async () => {
//     let currentToken: string | null = null;
//     if (typeof window !== 'undefined') {
//         currentToken = localStorage.getItem("token"); // Get token from storage
//     }

//     // If no token, ensure user is logged out state-wise
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token found.");
//       if (user !== null) setUser(null); // Clear user state if token is gone
//       if (token !== null) setToken(null); // Clear token state
//       delete apiClient.defaults.headers.common["Authorization"]; // Ensure Axios header is clear
//       return;
//     }

//     console.log("AuthContext: Refetching user data...");
//     // Don't set global 'loading' here, refetch is usually in background
//     try {
//       // Ensure Axios header is set for the request
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<BackendUser>("/dashboard/users/me"); // API endpoint to get current user

//       // Validate the structure of the received data
//       if (!isValidBackendUser(response.data)) {
//         console.error("AuthContext: Invalid user data structure received during refetch:", response.data);
//         // Log out if data is invalid, as something is wrong
//         logoutRef.current("manual", true); // Use true to prevent broadcast loop
//         throw new Error("Invalid user data structure received from API during refetch");
//       }

//       const updatedBackendUser: BackendUser = response.data;
//       console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC Status:", updatedBackendUser.kyc.status);

//       // --- Update state with the nested kyc object ---
//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kyc: updatedBackendUser.kyc, // Assign the full kyc object
//       };
//       setUser(userContextData); // Update user state
//       setToken(currentToken); // Ensure token state matches storage

//       // Reset inactivity timer as user data was successfully fetched (implies activity)
//       resetInactivityTimerDebounced(currentToken);

//     } catch (error: any) {
//       console.error("AuthContext: Failed to refetch user data:", error.response?.status, error.response?.data?.message || error.message);
//       // If unauthorized (401), log out due to expired/invalid session
//       if (error.response?.status === 401) {
//           logoutRef.current("sessionExpired");
//       }
//       // For other errors, log them but don't necessarily log out immediately
//       else {
//           console.error("AuthContext: Non-401 error during refetch. User state preserved for now.");
//       }
//     }
//     // No 'finally setLoading(false)' here, as we don't set loading=true for refetch
//   }, [user, token, resetInactivityTimerDebounced]); // Dependencies


//   // --- Login Function ---
//   // Sets user state, token, stores token, and sets Axios header
//   const login = useCallback((backendUser: BackendUser, authToken: string) => {
//       // Validate incoming user data structure
//       if (!isValidBackendUser(backendUser)) {
//         console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//         // Optionally clear any partial state if needed
//         logoutRef.current("manual", true); // Use true to prevent broadcast loop
//         return;
//       }

//       console.log("AuthContext: Logging in user:", backendUser.email, "KYC Status:", backendUser.kyc.status);

//       // --- Set the state with the nested kyc object ---
//       const userContextData: UserContextState = {
//         _id: backendUser._id,
//         fullName: backendUser.fullName,
//         email: backendUser.email,
//         role: backendUser.role,
//         kyc: backendUser.kyc, // Assign the full kyc object
//       };
//       setUser(userContextData);
//       setToken(authToken);

//       // Store token and set Axios header
//       if (typeof window !== 'undefined') {
//           localStorage.setItem("token", authToken);
//       }
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

//       // Broadcast login to other tabs
//       if (broadcastChannelRef.current) {
//           try {
//               broadcastChannelRef.current.postMessage("login");
//               console.log("AuthContext: Sent 'login' broadcast");
//           } catch (e) {
//               console.error("AuthContext: BroadcastChannel postMessage error:", e);
//           }
//       }

//       // Start/reset the inactivity timer
//       resetInactivityTimerDebounced(authToken);
//     }, [resetInactivityTimerDebounced]); // Dependency

//   // --- Function to Update KYC Data Locally ---
//   // Allows components to update parts of the user's KYC info in the context state
//   // Useful after a successful KYC update API call for immediate UI feedback
//   const updateAuthUserKyc = useCallback((updatedKycData: Partial<KycDetails>) => {
//     console.log(`[AuthContext] Updating KYC data in auth state with:`, updatedKycData);
//     setUser(currentUser => {
//         // If no current user, do nothing
//         if (!currentUser) return null;

//         // Create the next KYC state by merging existing data with updates
//         const nextKyc: KycDetails = {
//             ...currentUser.kyc, // Start with current KYC data
//             ...updatedKycData,  // Overwrite with provided updates
//              // Ensure nested objects like 'mobile' are handled correctly if updated partially
//              // If updatedKycData contains 'mobile', it should contain the full mobile object
//              mobile: updatedKycData.mobile ? { ...currentUser.kyc.mobile, ...updatedKycData.mobile } : currentUser.kyc.mobile,
//              // Add similar merging for other nested objects if applicable (e.g., documents array - though that's less likely updated this way)
//         };

//         // Simple check to see if anything actually changed to prevent unnecessary re-renders
//         // NOTE: This is a shallow comparison. For deep objects, changes within might not be detected.
//         // Consider using a deep-comparison library if complex nested updates are common.
//         if (JSON.stringify(currentUser.kyc) === JSON.stringify(nextKyc)) {
//              console.log("[AuthContext] KYC data unchanged after merge, skipping state update.");
//              return currentUser; // Return the existing state object
//         }

//         console.log("[AuthContext] KYC data changed, updating user state object.");
//         // Return a *new* user object with the updated kyc object to trigger re-render
//         return { ...currentUser, kyc: nextKyc };
//     });
//   }, []); // No dependencies needed for functional update pattern

//   // --- Initialization Effect (Mount) ---
//   // Checks for a token in local storage on initial client mount
//   // If found, validates it by fetching user data
//   useEffect(() => {
//     // Only run initialization logic on the client AFTER mount
//     if (!isMounted) {
//         return;
//     }

//     console.log("AuthProvider: Initializing state (Client Mount)...");
//     setLoading(true); // Start loading indicator
//     let isActive = true; // Flag to prevent state updates if component unmounts during async ops

//     let storedToken: string | null = null;
//     if (typeof window !== 'undefined') {
//         storedToken = localStorage.getItem("token"); // Check for existing token
//     }

//     const initializeAuth = async () => {
//       // If a token exists, try to fetch user data to validate it
//       if (storedToken && isActive) {
//         console.log("AuthProvider: Token found. Setting token state and fetching user.");
//         setToken(storedToken); apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

//         try {
//           const response = await apiClient.get<BackendUser>("/dashboard/users/me"); // Validate token by fetching user

//           // Validate the received user data structure
//           if (!isValidBackendUser(response.data)) {
//             throw new Error("Invalid user data structure received during initialization.");
//           }

//           // If component is still mounted, update user state
//           if (isActive) {
//             const fetchedUser: BackendUser = response.data;
//             // --- Set the state with the nested kyc object ---
//             const userContextData: UserContextState = {
//                 _id: fetchedUser._id,
//                 fullName: fetchedUser.fullName,
//                 email: fetchedUser.email,
//                 role: fetchedUser.role,
//                 kyc: fetchedUser.kyc, // Assign the full kyc object
//             };
//             setUser(userContextData); // Set user state
//             resetInactivityTimerDebounced(storedToken); // Start inactivity timer
//             console.log("AuthProvider: Initial user fetch success:", userContextData.email, "KYC:", userContextData.kyc.status);
//           }
//         } catch (error: any) {
//           console.error("AuthProvider: Failed to fetch user during init (token might be invalid/expired):", error.response?.status, error.message);
//           // If fetching user fails (e.g., 401 Unauthorized), log out
//           if (isActive) {
//              // Call logout logic - it handles clearing state, storage, and potential redirect
//              logoutRef.current(error.response?.status === 401 ? "sessionExpired" : "manual", true); // Use true to prevent broadcast loop
//              // No need to manually redirect here, logout function handles it if needed
//           }
//         } finally {
//           // Stop loading indicator once initialization attempt is complete
//           if (isActive) {
//             setLoading(false);
//           }
//         }
//       } else {
//         // No token found, initialization is complete (user is not logged in)
//         if (isActive) {
//           setLoading(false);
//         }
//       }
//     };

//     initializeAuth();

//     // Cleanup function for the effect
//     return () => {
//       isActive = false; // Mark component as unmounted
//       console.log("AuthProvider: Initializing effect cleanup.");
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isMounted]); // Run this effect only when isMounted becomes true

//   // --- Axios Response Interceptor for 401 Errors ---
//   // Automatically logs out the user if any API request returns a 401 Unauthorized
//   useEffect(() => {
//     const interceptor = apiClient.interceptors.response.use(
//       (response) => response, // Pass through successful responses
//       (error) => {
//         // Check if the error is a 401 and if a token currently exists (meaning user *was* logged in)
//         const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
//         if (error.response?.status === 401 && currentToken) {
//             console.log("AuthContext: Axios interceptor caught 401. Logging out.");
//             logoutRef.current("sessionExpired"); // Log out due to session expiry
//         }
//         // IMPORTANT: Reject the promise so the original caller handles the error too
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup function to remove the interceptor when the provider unmounts
//     return () => {
//       apiClient.interceptors.response.eject(interceptor);
//       console.log("AuthContext: Axios 401 interceptor removed.");
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Run only once on mount

//   // --- BroadcastChannel Listener ---
//   // Listens for messages from other tabs (login/logout)
//   useEffect(() => {
//     const channel = broadcastChannelRef.current;
//     if (!channel) return; // Don't add listener if channel failed to initialize

//     const handleBroadcast = (event: MessageEvent) => {
//       console.log("AuthContext BC: Received message - ", event.data);
//       const localUserBefore = user;
//       const localTokenBefore = token;
//       const storageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

//       if (event.data === "logout") {
//          // If we receive a logout message and are currently logged in, log out locally
//          if (localUserBefore !== null || localTokenBefore !== null) {
//             console.log("AuthContext BC: Handling 'logout' broadcast.");
//             logoutRef.current("manual", true); // Use true to indicate it's a broadcast response
//          }
//       } else if (event.data === "login") {
//         console.log("AuthContext BC: Handling 'login' broadcast.");
//         // If we receive a login message, check if our state needs updating
//         // Case 1: We have no token locally, or our token differs from storage -> Need to sync
//         if (storageToken && (!localTokenBefore || localTokenBefore !== storageToken)) {
//             console.log("AuthContext BC: Token mismatch or missing locally, refetching user.");
//             setToken(storageToken); // Immediately update token state from storage
//             apiClient.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`; // Update Axios header
//             refetchUser(); // Fetch user data corresponding to the new token
//         }
//         // Case 2: Token matches, but user data is missing locally -> Refetch
//         else if (storageToken && localTokenBefore === storageToken && !localUserBefore) {
//             console.log("AuthContext BC: Token matches but user missing locally, refetching user.");
//             refetchUser();
//         }
//         // Case 3: We received 'login' but there's no token in storage (edge case) -> Log out locally
//         else if (!storageToken && (localUserBefore || localTokenBefore)) {
//             console.warn("AuthContext BC: 'login' received but no token in storage, logging out locally.");
//             logoutRef.current("manual", true);
//         }
//       }
//       // NOTE: Removed "user_updated" broadcast to simplify and avoid potential loops.
//       // Synchronization relies on login/logout broadcasts and subsequent refetches.
//     };

//     channel.addEventListener("message", handleBroadcast);

//     // Cleanup listener
//     return () => {
//       if (broadcastChannelRef.current) {
//         broadcastChannelRef.current.removeEventListener("message", handleBroadcast);
//         console.log("AuthContext BC: Message listener removed.");
//       }
//     };
//   }, [user, token, refetchUser]); // Dependencies ensure listener has access to current state/functions

//   // --- Inactivity Event Listeners ---
//   // Resets the inactivity timer on user interaction
//   useEffect(() => {
//     // Only run on client-side
//     if (typeof window === 'undefined') return;

//     // Events that indicate user activity
//     const events: (keyof WindowEventMap)[] = [ "mousemove", "mousedown", "keypress", "scroll", "touchstart", ];

//     // Handler to reset the timer
//     const activityHandler = () => {
//         // Reset timer only if user is logged in (token exists) and the window/tab is visible
//         if (token && document.visibilityState === 'visible') {
//             resetInactivityTimerDebounced(token);
//         }
//     };

//     // Add listeners only if the user is logged in
//     if (token) {
//       console.log("AuthContext: Adding inactivity listeners.");
//       events.forEach((event) => window.addEventListener(event, activityHandler, { passive: true }));
//       activityHandler(); // Initial reset when token becomes available or changes

//       // Cleanup function to remove listeners and timer when token is cleared or component unmounts
//       return () => {
//           console.log("AuthContext: Removing inactivity listeners.");
//           events.forEach((event) => window.removeEventListener(event, activityHandler));
//           resetInactivityTimerDebounced.cancel(); // Cancel any pending debounced calls
//           if (logoutTimerRef.current) {
//               clearTimeout(logoutTimerRef.current);
//               logoutTimerRef.current = null;
//           }
//       };
//     } else {
//         // If token becomes null (logout), ensure any existing timer/pending calls are cleared
//         resetInactivityTimerDebounced.cancel();
//         if (logoutTimerRef.current) {
//             clearTimeout(logoutTimerRef.current);
//             logoutTimerRef.current = null;
//         }
//     }
//   }, [token, resetInactivityTimerDebounced]); // Re-run when token changes

//   // --- Derived State ---
//   // Calculate isAdmin based on the current user state
//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   // --- Context Value ---
//   // Memoize the context value to prevent unnecessary re-renders of consumers
//   const contextValue: AuthContextType = useMemo(() => ({
//       user,
//       token,
//       loading,
//       login,
//       logout: logoutRef.current, // Provide the stable ref
//       isAdmin,
//       refetchUser,
//       updateAuthUserKyc, // Provide the KYC update function
//     }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKyc] ); // Include all provided values

//   // --- Render ---
//   // Render null if not mounted on client OR if initial loading is still in progress
//   // This prevents hydration mismatches and avoids rendering children before auth state is confirmed.
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {(!isMounted || loading) ? null : children}
//     </AuthContext.Provider>
//   );
// };

// // --- Hook to Consume Context ---
// // Provides a convenient way for components to access the auth context
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // --- Export KYC types needed by AuthContext ---
// // Re-exporting types here can be convenient for components importing from AuthContext
// export type { KycStatus, KycDetails, KycMobile };




// // frontend/src/app/contexts/AuthContext.tsx
// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode,
// } from "react";
// import debounce from "lodash/debounce";
// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig"; // Adjust path if needed
// import type { KycStatus, KycDetails, KycMobile } from '@/app/services/kyc'; // Adjust path if needed

// // --- Types ---

// // Backend response structure (Ensure this matches API)
// interface BackendUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails; // Use the imported type
//   createdAt: string; // Or Date if parsed client-side
//   updatedAt: string; // Or Date if parsed client-side
// }

// // Frontend context state structure
// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails; // Use the imported type
// }

// // Context type definition
// export interface AuthContextType {
//   user: UserContextState | null;
//   token: string | null;
//   loading: boolean; // Initial auth check loading
//   login: (backendUser: BackendUser, authToken: string) => void;
//   logout: (reason?: "inactivity" | "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>;
//   updateAuthUserKyc: (updatedKycData: Partial<KycDetails>) => void;
// }

// // Context Setup
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
// const DEBOUNCE_WAIT_MS = 500;

// // Axios Instance
// const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

// // API Error Structure (Example)
// interface ApiError {
//   message: string;
//   // Add other potential error fields if needed
// }

// // --- Helper: Validate Backend User Structure ---
// // Exported for use in other modules like the callback handler
// export const isValidBackendUser = (data: any): data is BackendUser => {
//   // Add null checks for nested properties accessed
//   return (
//     data && typeof data === 'object' &&
//     typeof data._id === 'string' && data._id.length > 0 &&
//     typeof data.fullName === 'string' &&
//     typeof data.email === 'string' && /\S+@\S+\.\S+/.test(data.email) &&
//     typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
//     typeof data.kyc === 'object' && data.kyc !== null && // Check kyc is object
//     typeof data.kyc.status === 'string' && // Check kyc.status exists
//     ['not_started', 'pending', 'verified', 'rejected', 'skipped'].includes(data.kyc.status) &&
//     typeof data.createdAt === 'string' &&
//     typeof data.updatedAt === 'string'
//   );
// };


// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Tracks ONLY the initial load
//   const [isMounted, setIsMounted] = useState<boolean>(false);
//   const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {});
//   const router = useRouter();

//   // Calculate isAdmin based on the current user state
//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   // Effect to set mount status
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Effect for BroadcastChannel setup/cleanup
//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         console.log("AuthContext: BroadcastChannel initialized");
//       } catch (error) {
//         console.error("AuthContext: Failed to initialize BroadcastChannel:", error);
//       }
//     }
//     return () => {
//       broadcastChannelRef.current?.close();
//       broadcastChannelRef.current = null;
//       console.log("AuthContext: BroadcastChannel closed");
//     };
//   }, []); // Run only once

//   // Logout Function
//   const logout = useCallback((reason: "inactivity" | "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
//     console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//     const wasLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token");

//     setUser(null);
//     setToken(null);
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem("token");
//     }
//     delete apiClient.defaults.headers.common["Authorization"];

//     if (logoutTimerRef.current) {
//       clearTimeout(logoutTimerRef.current);
//       logoutTimerRef.current = null;
//     }

//     if (!isBroadcastLogout && broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("logout");
//         console.log("AuthContext: Sent 'logout' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }

//     // Redirect to login page logic
//     if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
//       let redirectUrl = "/auth/login";
//       if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true";
//       else if (reason === "inactivity") redirectUrl += "?autoLogout=true";
//       router.push(redirectUrl);
//     }
//   }, [router]); // Dependency: router

//   // Keep stable logout reference
//   useEffect(() => {
//     logoutRef.current = logout;
//   }, [logout]);

//   // Inactivity Handling
//   const logoutDueToInactivity = useCallback(() => {
//     console.log("AuthContext: Logging out due to inactivity.");
//     logoutRef.current("inactivity");
//   }, []); // No dependencies needed

//   const resetInactivityTimerDebounced = useRef(debounce((currentToken: string | null) => {
//     if (logoutTimerRef.current) {
//       clearTimeout(logoutTimerRef.current);
//     }
//     if (currentToken && typeof window !== 'undefined') {
//       logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//     }
//   }, DEBOUNCE_WAIT_MS)).current;

//   // Refetch User Data
//   const refetchUser = useCallback(async () => {
//     let currentToken: string | null = null;
//     if (typeof window !== 'undefined') {
//       currentToken = localStorage.getItem("token");
//     }
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token.");
//       if (user !== null) setUser(null);
//       if (token !== null) setToken(null);
//       delete apiClient.defaults.headers.common["Authorization"];
//       return;
//     }
//     console.log("AuthContext: Refetching user data...");
//     try {
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<BackendUser>("/dashboard/users/me");

//       if (!isValidBackendUser(response.data)) {
//         console.error("AuthContext: Invalid user data in refetch:", response.data);
//         logoutRef.current("sessionExpired", true); // Force logout if data corrupt
//         throw new Error("Invalid user data structure received during refetch");
//       }

//       const updatedBackendUser: BackendUser = response.data;
//       console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC:", updatedBackendUser.kyc?.status);

//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kyc: updatedBackendUser.kyc,
//       };
//       setUser(userContextData);
//       setToken(currentToken); // Ensure token state is synced
//       resetInactivityTimerDebounced(currentToken);

//     } catch (error: any) {
//       const axiosError = error as AxiosError<ApiError>; // Type assertion
//       console.error("AuthContext: Failed to refetch user data:", axiosError.response?.status, axiosError.message);
//       if (axiosError.response?.status === 401 || error.message.includes("Invalid user data")) {
//         logoutRef.current("sessionExpired");
//       }
//       // Decide if other errors should cause logout or just be logged
//     }
//   }, [user, token, resetInactivityTimerDebounced]); // Dependencies

//   // Login Function
//   const login = useCallback((backendUser: BackendUser, authToken: string) => {
//     if (!isValidBackendUser(backendUser)) {
//       console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//       logoutRef.current("manual", true); // Logout locally without broadcasting loop
//       return;
//     }
//     console.log("AuthContext: Logging in user:", backendUser.email, "KYC Status:", backendUser.kyc?.status);

//     const userContextData: UserContextState = {
//       _id: backendUser._id,
//       fullName: backendUser.fullName,
//       email: backendUser.email,
//       role: backendUser.role,
//       kyc: backendUser.kyc,
//     };
//     setUser(userContextData);
//     setToken(authToken);

//     if (typeof window !== 'undefined') {
//       localStorage.setItem("token", authToken);
//     }
//     apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

//     if (broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("login");
//         console.log("AuthContext: Sent 'login' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }
//     resetInactivityTimerDebounced(authToken);
//   }, [resetInactivityTimerDebounced]); // Dependencies

//   // Update KYC Data Locally
//   const updateAuthUserKyc = useCallback((updatedKycData: Partial<KycDetails>) => {
//     console.log(`[AuthContext] Updating KYC data in auth state with:`, updatedKycData);
//     setUser(currentUser => {
//       if (!currentUser) return null;
//       const nextKyc: KycDetails = {
//         ...currentUser.kyc,
//         ...updatedKycData,
//         // Example deep merge for mobile
//         ...(updatedKycData.mobile && currentUser.kyc?.mobile && {
//           mobile: { ...currentUser.kyc.mobile, ...updatedKycData.mobile }
//         }),
//       };
//       // Basic change detection
//       if (JSON.stringify(currentUser.kyc) === JSON.stringify(nextKyc)) {
//         console.log("[AuthContext] KYC data unchanged after merge.");
//         return currentUser;
//       }
//       console.log("[AuthContext] KYC data changed, updating user state.");
//       return { ...currentUser, kyc: nextKyc };
//     });
//   }, []); // No dependencies needed for functional update

//   // Initialization Effect (on mount)
//   useEffect(() => {
//     if (!isMounted) {
//       return;
//     }
//     console.log("AuthProvider: Initializing state (Client Mount)...");
//     setLoading(true);
//     let isActive = true;
//     let storedToken: string | null = null;
//     if (typeof window !== 'undefined') {
//       storedToken = localStorage.getItem("token");
//     }

//     const initializeAuth = async () => {
//       if (storedToken && isActive) {
//         console.log("AuthProvider: Token found. Setting token state and fetching user.");
//         setToken(storedToken);
//         apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
//         try {
//           const response = await apiClient.get<BackendUser>("/dashboard/users/me");
//           if (!isValidBackendUser(response.data)) {
//             throw new Error("Invalid user data structure received during initialization.");
//           }
//           if (isActive) {
//             const fetchedUser: BackendUser = response.data;
//             const userContextData: UserContextState = {
//               _id: fetchedUser._id, fullName: fetchedUser.fullName, email: fetchedUser.email,
//               role: fetchedUser.role, kyc: fetchedUser.kyc,
//             };
//             setUser(userContextData);
//             resetInactivityTimerDebounced(storedToken);
//             console.log("AuthProvider: Initial user fetch success:", userContextData.email);
//           }
//         } catch (error: any) {
//             const axiosError = error as AxiosError<ApiError>; // Type assertion
//             console.error("AuthProvider: Failed to fetch user during init:", axiosError.response?.status, axiosError.message);
//             if (isActive) {
//                 logoutRef.current(axiosError.response?.status === 401 || error.message.includes("Invalid user data") ? "sessionExpired" : "manual", true);
//             }
//         } finally {
//           if (isActive) {
//             setLoading(false);
//           }
//         }
//       } else {
//         // No token found
//         if (isActive) {
//           setLoading(false);
//         }
//       }
//     };

//     initializeAuth();
//     return () => {
//       isActive = false; // Prevent state updates after unmount
//       console.log("AuthProvider: Initializing effect cleanup.");
//     };
//   }, [isMounted, resetInactivityTimerDebounced]); // Dependencies

//   // Axios Response Interceptor for 401s
//   useEffect(() => {
//     const interceptor = apiClient.interceptors.response.use(
//       (response) => response,
//       (error: AxiosError<ApiError>) => { // Typed error
//         const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
//         // Check for 401 or specific error messages indicating auth failure
//         const isAuthError = error.response?.status === 401 || error.message?.includes("Invalid user data");
//         if (isAuthError && currentToken) {
//           console.log("AuthContext: Axios interceptor caught auth error. Logging out.");
//           logoutRef.current("sessionExpired"); // Trigger logout
//         }
//         return Promise.reject(error); // IMPORTANT: Rethrow error for caller
//       }
//     );
//     return () => {
//       apiClient.interceptors.response.eject(interceptor);
//       console.log("AuthContext: Axios interceptor removed.");
//     };
//   }, []); // Run only once

//   // BroadcastChannel Listener
//   useEffect(() => {
//     const channel = broadcastChannelRef.current;
//     if (!channel) return;

//     const handleBroadcast = (event: MessageEvent) => {
//       console.log("AuthContext BC: Received message - ", event.data);
//       const localUserBefore = user;
//       const localTokenBefore = token;
//       const storageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

//       if (event.data === "logout") {
//         if (localUserBefore !== null || localTokenBefore !== null) {
//           console.log("AuthContext BC: Handling 'logout' broadcast.");
//           logoutRef.current("manual", true); // Logout locally, mark as broadcast response
//         }
//       } else if (event.data === "login") {
//         console.log("AuthContext BC: Handling 'login' broadcast.");
//         // If token is different or missing locally, sync state
//         if (storageToken && (!localTokenBefore || localTokenBefore !== storageToken)) {
//           console.log("AuthContext BC: Token mismatch/missing, refetching.");
//           setToken(storageToken); // Update token state immediately
//           apiClient.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
//           refetchUser(); // Fetch user for this token
//         } else if (storageToken && localTokenBefore === storageToken && !localUserBefore) {
//           console.log("AuthContext BC: Token matches, user missing, refetching.");
//           refetchUser();
//         } else if (!storageToken && (localUserBefore || localTokenBefore)) {
//           console.warn("AuthContext BC: 'login' received, no token in storage, logging out locally.");
//           logoutRef.current("manual", true);
//         }
//       }
//     };

//     channel.addEventListener("message", handleBroadcast);
//     return () => {
//       if (broadcastChannelRef.current) {
//         broadcastChannelRef.current.removeEventListener("message", handleBroadcast);
//         console.log("AuthContext BC: Message listener removed.");
//       }
//     };
//   }, [user, token, refetchUser]); // Dependencies

//   // Inactivity Event Listeners
//   useEffect(() => {
//     if (typeof window === 'undefined') return;
//     const events: (keyof WindowEventMap)[] = [ "mousemove", "mousedown", "keypress", "scroll", "touchstart", ];
//     const activityHandler = () => {
//       if (token && document.visibilityState === 'visible') {
//         resetInactivityTimerDebounced(token);
//       }
//     };
//     if (token) {
//       console.log("AuthContext: Adding inactivity listeners.");
//       events.forEach((event) => window.addEventListener(event, activityHandler, { passive: true }));
//       activityHandler(); // Initial reset
//       return () => {
//         console.log("AuthContext: Removing inactivity listeners.");
//         events.forEach((event) => window.removeEventListener(event, activityHandler));
//         resetInactivityTimerDebounced.cancel();
//         if (logoutTimerRef.current) {
//           clearTimeout(logoutTimerRef.current);
//           logoutTimerRef.current = null;
//         }
//       };
//     } else {
//       // Ensure timer is cleared if user logs out
//       resetInactivityTimerDebounced.cancel();
//       if (logoutTimerRef.current) {
//         clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//       }
//     }
//   }, [token, resetInactivityTimerDebounced]); // Dependencies

//   // --- Navigation Effect ---
//   useEffect(() => {
//     console.log(`AuthContext Navigation Effect: loading=${loading}, user=${user ? user.email : null}`);

//     if (!loading && user) {
//       console.log("AuthContext Navigation Effect: User loaded, determining redirect...");
//       // Access derived isAdmin state *inside* the effect
//       const calculatedIsAdmin = user?.role === "admin";
//       console.log("AuthContext Navigation Effect: KYC Status:", user.kyc?.status, "Role:", user.role, "isAdmin:", calculatedIsAdmin);

//       let redirectUrl = "";
//       if (calculatedIsAdmin) {
//         redirectUrl = "/admin";
//       } else {
//         switch (user.kyc?.status) {
//           case "not_started": case "rejected": case "skipped": redirectUrl = "/kyc/start"; break;
//           case "pending": redirectUrl = "/kyc/pending"; break;
//           case "verified": redirectUrl = "/dashboard"; break;
//           default: console.warn("AuthContext Nav Effect: Unknown KYC status.", user.kyc?.status); redirectUrl = "/dashboard";
//         }
//       }
//       console.log("AuthContext Navigation Effect: Calculated redirect URL:", redirectUrl);

//       // Perform redirect only if not already on the target page
//       if (typeof window !== 'undefined' && window.location.pathname !== redirectUrl) {
//         console.log(`AuthContext Nav Effect: Current path (${window.location.pathname}) != target (${redirectUrl}). Pushing...`);
//         router.push(redirectUrl);
//       } else {
//         console.log(`AuthContext Nav Effect: Already on target page ${redirectUrl} or window undefined. No push.`);
//       }
//     } else if (!loading && !user) {
//       console.log("AuthContext Nav Effect: User is null, no user-based redirection.");
//     } else {
//       console.log("AuthContext Nav Effect: Still loading.");
//     }
//   }, [user, loading, router]); // Correct dependencies: user, loading, router


//   // Context Value
//   const contextValue: AuthContextType = useMemo(() => ({
//     user, token, loading, login, logout: logoutRef.current, isAdmin, refetchUser, updateAuthUserKyc,
//   }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKyc]); // isAdmin is correct here

//   // Render Provider
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {(!isMounted || loading) ? null : children}
//       {/* Render children only after client mount and initial load check */}
//     </AuthContext.Provider>
//   );
// };

// // Hook to Consume Context
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // --- Export necessary types ---
// export type { KycStatus, KycDetails, KycMobile, UserContextState, BackendUser };
// // isValidBackendUser is exported individually above


// // frontend/src/app/contexts/AuthContext.tsx
// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode,
// } from "react";
// import debounce from "lodash/debounce";
// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig"; // Adjust path if needed
// import type { KycStatus, KycDetails, KycMobile } from '@/app/services/kyc'; // Adjust path if needed

// // --- Types ---

// // Backend response structure (Ensure this matches API)
// interface BackendUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails; // Use the imported type
//   createdAt: string; // Or Date if parsed client-side
//   updatedAt: string; // Or Date if parsed client-side
// }

// // Frontend context state structure
// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails; // Use the imported type
// }

// // Context type definition
// export interface AuthContextType {
//   user: UserContextState | null;
//   token: string | null;
//   loading: boolean; // Initial auth check loading
//   login: (backendUser: BackendUser, authToken: string) => void;
//   logout: (reason?: "inactivity" | "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>;
//   updateAuthUserKyc: (updatedKycData: Partial<KycDetails>) => void;
// }

// // Context Setup
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
// const DEBOUNCE_WAIT_MS = 500;

// // Axios Instance
// const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

// // API Error Structure (Example)
// interface ApiError {
//   message: string;
//   // Add other potential error fields if needed
// }

// // --- Helper: Validate Backend User Structure ---
// // Exported for use in other modules like the callback handler
// export const isValidBackendUser = (data: any): data is BackendUser => {
//   // Add null checks for nested properties accessed
//   return (
//     data && typeof data === 'object' &&
//     typeof data._id === 'string' && data._id.length > 0 &&
//     typeof data.fullName === 'string' &&
//     typeof data.email === 'string' && /\S+@\S+\.\S+/.test(data.email) &&
//     typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
//     typeof data.kyc === 'object' && data.kyc !== null && // Check kyc is object
//     typeof data.kyc.status === 'string' && // Check kyc.status exists
//     ['not_started', 'pending', 'verified', 'rejected', 'skipped'].includes(data.kyc.status) &&
//     typeof data.createdAt === 'string' &&
//     typeof data.updatedAt === 'string'
//   );
// };


// // --- Auth Provider Component ---
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Tracks ONLY the initial load
//   const [isMounted, setIsMounted] = useState<boolean>(false);
//   const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {});
//   const router = useRouter();

//   // Calculate isAdmin based on the current user state
//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   // Effect to set mount status
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Effect for BroadcastChannel setup/cleanup
//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         console.log("AuthContext: BroadcastChannel initialized");
//       } catch (error) {
//         console.error("AuthContext: Failed to initialize BroadcastChannel:", error);
//       }
//     }
//     return () => {
//       broadcastChannelRef.current?.close();
//       broadcastChannelRef.current = null;
//       console.log("AuthContext: BroadcastChannel closed");
//     };
//   }, []); // Run only once

//   // Logout Function
//   const logout = useCallback((reason: "inactivity" | "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
//     console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//     const wasLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token");

//     setUser(null);
//     setToken(null);
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem("token");
//     }
//     delete apiClient.defaults.headers.common["Authorization"];

//     if (logoutTimerRef.current) {
//       clearTimeout(logoutTimerRef.current);
//       logoutTimerRef.current = null;
//     }

//     if (!isBroadcastLogout && broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("logout");
//         console.log("AuthContext: Sent 'logout' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }

//     // Redirect to login page logic
//     if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
//       let redirectUrl = "/auth/login";
//       if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true";
//       else if (reason === "inactivity") redirectUrl += "?autoLogout=true";
//       router.push(redirectUrl);
//     }
//   }, [router]); // Dependency: router

//   // Keep stable logout reference
//   useEffect(() => {
//     logoutRef.current = logout;
//   }, [logout]);

//   // Inactivity Handling
//   const logoutDueToInactivity = useCallback(() => {
//     console.log("AuthContext: Logging out due to inactivity.");
//     logoutRef.current("inactivity");
//   }, []); // No dependencies needed

//   const resetInactivityTimerDebounced = useRef(debounce((currentToken: string | null) => {
//     if (logoutTimerRef.current) {
//       clearTimeout(logoutTimerRef.current);
//     }
//     if (currentToken && typeof window !== 'undefined') {
//       logoutTimerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT_MS);
//     }
//   }, DEBOUNCE_WAIT_MS)).current;

//   // Refetch User Data
//   const refetchUser = useCallback(async () => {
//     let currentToken: string | null = null;
//     if (typeof window !== 'undefined') {
//       currentToken = localStorage.getItem("token");
//     }
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token.");
//       if (user !== null) setUser(null);
//       if (token !== null) setToken(null);
//       delete apiClient.defaults.headers.common["Authorization"];
//       return;
//     }
//     console.log("AuthContext: Refetching user data...");
//     try {
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<BackendUser>("/dashboard/users/me");

//       if (!isValidBackendUser(response.data)) {
//         console.error("AuthContext: Invalid user data in refetch:", response.data);
//         logoutRef.current("sessionExpired", true); // Force logout if data corrupt
//         throw new Error("Invalid user data structure received during refetch");
//       }

//       const updatedBackendUser: BackendUser = response.data;
//       console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC:", updatedBackendUser.kyc?.status);

//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kyc: updatedBackendUser.kyc,
//       };
//       setUser(userContextData);
//       setToken(currentToken); // Ensure token state is synced
//       resetInactivityTimerDebounced(currentToken);

//     } catch (error: any) {
//       const axiosError = error as AxiosError<ApiError>; // Type assertion
//       console.error("AuthContext: Failed to refetch user data:", axiosError.response?.status, axiosError.message);
//       if (axiosError.response?.status === 401 || error.message.includes("Invalid user data")) {
//         logoutRef.current("sessionExpired");
//       }
//       // Decide if other errors should cause logout or just be logged
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token, resetInactivityTimerDebounced]); // Removed 'user' dependency

//   // Login Function
//   const login = useCallback((backendUser: BackendUser, authToken: string) => {
//     if (!isValidBackendUser(backendUser)) {
//       console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//       logoutRef.current("manual", true); // Logout locally without broadcasting loop
//       return;
//     }
//     console.log("AuthContext: Logging in user:", backendUser.email, "KYC Status:", backendUser.kyc?.status);

//     const userContextData: UserContextState = {
//       _id: backendUser._id,
//       fullName: backendUser.fullName,
//       email: backendUser.email,
//       role: backendUser.role,
//       kyc: backendUser.kyc,
//     };
//     setUser(userContextData);
//     setToken(authToken);

//     if (typeof window !== 'undefined') {
//       localStorage.setItem("token", authToken);
//     }
//     apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

//     if (broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("login");
//         console.log("AuthContext: Sent 'login' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }
//     resetInactivityTimerDebounced(authToken);
//   }, [resetInactivityTimerDebounced]); // Dependencies

//   // Update KYC Data Locally
//   const updateAuthUserKyc = useCallback((updatedKycData: Partial<KycDetails>) => {
//     console.log(`[AuthContext] Updating KYC data in auth state with:`, updatedKycData);
//     setUser(currentUser => {
//       if (!currentUser) return null;
//       const nextKyc: KycDetails = {
//         ...currentUser.kyc,
//         ...updatedKycData,
//         // Example deep merge for mobile
//         ...(updatedKycData.mobile && currentUser.kyc?.mobile && {
//           mobile: { ...currentUser.kyc.mobile, ...updatedKycData.mobile }
//         }),
//       };
//       // Basic change detection
//       if (JSON.stringify(currentUser.kyc) === JSON.stringify(nextKyc)) {
//         console.log("[AuthContext] KYC data unchanged after merge.");
//         return currentUser;
//       }
//       console.log("[AuthContext] KYC data changed, updating user state.");
//       return { ...currentUser, kyc: nextKyc };
//     });
//   }, []); // No dependencies needed for functional update

//   // Initialization Effect (on mount)
//   useEffect(() => {
//     // Prevent running on server or before client mount
//     if (!isMounted || typeof window === 'undefined') {
//       return;
//     }
//     console.log("AuthProvider: Initializing state (Client Mount)...");
//     setLoading(true);
//     let isActive = true;
//     let storedToken: string | null = null;

//     storedToken = localStorage.getItem("token");

//     const initializeAuth = async () => {
//       if (storedToken && isActive) {
//         console.log("AuthProvider: Token found. Setting token state and fetching user.");
//         setToken(storedToken);
//         apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
//         try {
//           const response = await apiClient.get<BackendUser>("/dashboard/users/me");
//           if (!isValidBackendUser(response.data)) {
//             throw new Error("Invalid user data structure received during initialization.");
//           }
//           if (isActive) {
//             const fetchedUser: BackendUser = response.data;
//             const userContextData: UserContextState = {
//               _id: fetchedUser._id, fullName: fetchedUser.fullName, email: fetchedUser.email,
//               role: fetchedUser.role, kyc: fetchedUser.kyc,
//             };
//             setUser(userContextData);
//             resetInactivityTimerDebounced(storedToken);
//             console.log("AuthProvider: Initial user fetch success:", userContextData.email);
//           }
//         } catch (error: any) {
//             const axiosError = error as AxiosError<ApiError>; // Type assertion
//             console.error("AuthProvider: Failed to fetch user during init:", axiosError.response?.status, axiosError.message);
//             if (isActive) {
//                 // Use specific error type if available
//                 logoutRef.current(axiosError.response?.status === 401 || error.message?.includes("Invalid user data") ? "sessionExpired" : "manual", true);
//             }
//         } finally {
//           // Ensure loading is set to false only once and if component is still active
//           if (isActive) {
//             setLoading(false);
//           }
//         }
//       } else {
//         // No token found
//         if (isActive) {
//           setLoading(false); // Ensure loading finishes even if no token
//         }
//       }
//     };

//     initializeAuth();

//     // Cleanup function
//     return () => {
//       isActive = false; // Prevent state updates after unmount
//       console.log("AuthProvider: Initializing effect cleanup.");
//     };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isMounted]); // Dependency: isMounted


//   // Axios Response Interceptor for 401s
//   useEffect(() => {
//     const interceptor = apiClient.interceptors.response.use(
//       (response) => response,
//       (error: AxiosError<ApiError>) => { // Typed error
//         const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
//         // Check for 401 or specific error messages indicating auth failure
//         const isAuthError = error.response?.status === 401 || error.message?.includes("Invalid user data");
//         if (isAuthError && currentToken) {
//           console.log("AuthContext: Axios interceptor caught auth error. Logging out.");
//           logoutRef.current("sessionExpired"); // Trigger logout
//         }
//         return Promise.reject(error); // IMPORTANT: Rethrow error for caller
//       }
//     );
//     // Cleanup function to remove the interceptor
//     return () => {
//       apiClient.interceptors.response.eject(interceptor);
//       console.log("AuthContext: Axios interceptor removed.");
//     };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Run only once on mount

//   // BroadcastChannel Listener
//   useEffect(() => {
//     const channel = broadcastChannelRef.current;
//     if (!channel) return;

//     const handleBroadcast = (event: MessageEvent) => {
//       console.log("AuthContext BC: Received message - ", event.data);
//       const localUserBefore = user;
//       const localTokenBefore = token;
//       const storageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

//       if (event.data === "logout") {
//         if (localUserBefore !== null || localTokenBefore !== null) {
//           console.log("AuthContext BC: Handling 'logout' broadcast.");
//           logoutRef.current("manual", true); // Logout locally, mark as broadcast response
//         }
//       } else if (event.data === "login") {
//         console.log("AuthContext BC: Handling 'login' broadcast.");
//         // Sync state if token differs or missing locally
//         if (storageToken && (!localTokenBefore || localTokenBefore !== storageToken)) {
//           console.log("AuthContext BC: Token mismatch/missing, refetching.");
//           setToken(storageToken);
//           apiClient.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
//           refetchUser(); // Fetch user for this token
//         } else if (storageToken && localTokenBefore === storageToken && !localUserBefore) {
//           console.log("AuthContext BC: Token matches, user missing, refetching.");
//           refetchUser();
//         } else if (!storageToken && (localUserBefore || localTokenBefore)) {
//           console.warn("AuthContext BC: 'login' received, no token in storage, logging out locally.");
//           logoutRef.current("manual", true);
//         }
//       }
//     };

//     channel.addEventListener("message", handleBroadcast);
//     // Cleanup listener
//     return () => {
//       if (broadcastChannelRef.current) {
//         broadcastChannelRef.current.removeEventListener("message", handleBroadcast);
//         console.log("AuthContext BC: Message listener removed.");
//       }
//     };
//   }, [user, token, refetchUser]); // Dependencies

//   // Inactivity Event Listeners
//   useEffect(() => {
//     if (typeof window === 'undefined') return;
//     const events: (keyof WindowEventMap)[] = [ "mousemove", "mousedown", "keypress", "scroll", "touchstart", ];
//     const activityHandler = () => {
//       // Reset timer only if user is logged in and tab is visible
//       if (token && document.visibilityState === 'visible') {
//         resetInactivityTimerDebounced(token);
//       }
//     };
//     if (token) {
//       console.log("AuthContext: Adding inactivity listeners.");
//       events.forEach((event) => window.addEventListener(event, activityHandler, { passive: true }));
//       activityHandler(); // Initial reset when token becomes available
//       // Cleanup function
//       return () => {
//         console.log("AuthContext: Removing inactivity listeners.");
//         events.forEach((event) => window.removeEventListener(event, activityHandler));
//         resetInactivityTimerDebounced.cancel(); // Cancel pending calls
//         if (logoutTimerRef.current) {
//           clearTimeout(logoutTimerRef.current);
//           logoutTimerRef.current = null;
//         }
//       };
//     } else {
//       // Ensure timer is cleared if user logs out
//       resetInactivityTimerDebounced.cancel();
//       if (logoutTimerRef.current) {
//         clearTimeout(logoutTimerRef.current);
//         logoutTimerRef.current = null;
//       }
//     }
//   }, [token, resetInactivityTimerDebounced]); // Dependencies

//   // --- Navigation Effect (CORRECTED Admin/User Logic) ---
//   useEffect(() => {
//     // Prevent running on server or before mount or during initial load
//     if (!isMounted || typeof window === 'undefined' || loading) {
//         console.log(`AuthContext Nav Effect: Skipping (isMounted=${isMounted}, isBrowser=${typeof window !== 'undefined'}, loading=${loading})`);
//         return;
//     }

//     const currentPath = window.location.pathname;
//     console.log(`AuthContext Nav Effect: Path=${currentPath}, user=${user ? user.email : 'null'}`);

//     // --- Logic when User is Authenticated ---
//     if (user) {
//       const calculatedIsAdmin = user.role === "admin"; // Use the user data directly in this closure
//       console.log("AuthContext Nav Effect: User loaded.", { email: user.email, role: user.role, isAdmin: calculatedIsAdmin, kyc: user.kyc?.status });

//       // --- Admin Navigation ---
//       if (calculatedIsAdmin) {
//         const adminHomePath = "/admin"; // Or your main admin landing page
//         // Pages admins should be redirected *from* immediately after login/auth flow completion
//         // Or if they somehow manually navigate back to them while logged in.
//         const criticalRedirectPaths = [
//             "/auth/login",
//             "/auth/register",
//             "/auth/forgot-password",
//             "/auth/reset-password",
//             // Add any user-specific KYC pages they should never see
//             "/kyc/start",
//             "/kyc/pending",
//             // Add the Google callback handler if applicable
//              "/auth/google/callback-handler"
//             ];

//         if (criticalRedirectPaths.includes(currentPath)) {
//           console.log(`AuthContext Nav Effect: Admin on critical redirect path (${currentPath}). Pushing to ${adminHomePath}...`);
//           router.push(adminHomePath);
//         } else {
//           // Admin is on any other page (e.g., /admin, /admin/users, /dashboard, /settings). Let them stay.
//           console.log(`AuthContext Nav Effect: Admin on allowed path (${currentPath}). No redirect enforced by AuthContext.`);
//         }
//         // **** IMPORTANT: Stop processing further navigation logic if admin ****
//         return; // <--- FIX: Prevent fall-through to user logic
//       }

//       // --- Regular User Navigation (Only runs if NOT admin) ---
//       else {
//         let userTargetPath: string;
//         switch (user.kyc?.status) {
//           case "not_started":
//           case "rejected":
//           case "skipped":
//             userTargetPath = "/kyc/start";
//             break;
//           case "pending":
//             userTargetPath = "/kyc/pending";
//             break;
//           case "verified":
//             userTargetPath = "/dashboard"; // Main app area for verified users
//             break;
//           default:
//             console.warn("AuthContext Nav Effect: Unknown KYC status for user.", user.kyc?.status);
//             userTargetPath = "/dashboard"; // Fallback to dashboard
//         }
//         console.log("AuthContext Nav Effect: User target path calculated:", userTargetPath);

//         // Pages a regular user should absolutely NOT be on
//         const forbiddenPaths = ["/admin"]; // Add more admin-only paths if needed (e.g., /admin/settings)

//         // Check if user is on a forbidden path (like /admin)
//         if (forbiddenPaths.some(p => currentPath.startsWith(p))) {
//             console.log(`AuthContext Nav Effect: User on forbidden path (${currentPath}). Redirecting to ${userTargetPath}...`);
//             router.push(userTargetPath);
//             return; // Redirect and stop
//         }

//         // Check if user is NOT on their correct KYC/Dashboard path
//         // Exception: Allow verified users (target=/dashboard) to be on other allowed app pages
//         const allowedGenericPathsForVerifiedUser = ["/recipients", "/transfer", "/settings"]; // Add profile, etc.
//         const isVerifiedUser = user.kyc?.status === 'verified';
//         const isOnAllowedGenericPath = isVerifiedUser && allowedGenericPathsForVerifiedUser.some(p => currentPath.startsWith(p));

//         if (currentPath !== userTargetPath && !isOnAllowedGenericPath) {
//             // Check if they are on a generic auth page they shouldn't be on post-login
//             const genericAuthPaths = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password", "/"];
//              if (genericAuthPaths.includes(currentPath)) {
//                 console.log(`AuthContext Nav Effect: User (${user.kyc?.status}) on generic auth/root path (${currentPath}). Redirecting to ${userTargetPath}...`);
//                 router.push(userTargetPath);
//              } else {
//                 // If not on target, not on allowed generic, and not on generic auth - likely needs redirecting, but be cautious
//                 // This might catch cases like manually typing a wrong URL.
//                 // Let's redirect unless it's already the kyc pending/start page when it should be.
//                  if (! ( (userTargetPath === "/kyc/start" || userTargetPath === "/kyc/pending") && currentPath.startsWith('/kyc/') ) ) {
//                      console.log(`AuthContext Nav Effect: User (${user.kyc?.status}) not on target (${userTargetPath}), allowed generic, or auth path (${currentPath}). Redirecting to ${userTargetPath}...`);
//                      router.push(userTargetPath);
//                  } else {
//                      console.log(`AuthContext Nav Effect: User (${user.kyc?.status}) on a KYC page (${currentPath}), which matches their target state (${userTargetPath}). No redirect.`);
//                  }
//              }
//         } else {
//              console.log(`AuthContext Nav Effect: User (${user.kyc?.status}) already on target (${userTargetPath}) or allowed generic page (${currentPath}). No redirect.`);
//         }
//       }
//     }
//     // --- Logic when User is Not Authenticated ---
//     else {
//       console.log("AuthContext Nav Effect: User is null (not logged in).");
//       // Define truly public paths (accessible without login)
//       const publicPaths = [
//           "/", // Allow landing page
//           "/auth/login",
//           "/auth/register",
//           "/auth/forgot-password",
//           "/auth/reset-password",
//            // Add others like /terms, /privacy if needed
//         ];
//        // Allow any path starting with /auth/ (like callbacks) or explicitly public paths
//       if (!publicPaths.some(p => currentPath === p) && !currentPath.startsWith('/auth/')) {
//         console.log(`AuthContext Nav Effect: Not logged in and on protected path (${currentPath}). Redirecting to login...`);
//         router.push("/auth/login"); // Redirect to login if trying non-public pages
//       } else {
//         console.log(`AuthContext Nav Effect: Not logged in and on public/auth path (${currentPath}). No redirect.`);
//       }
//     }
//   // Dependencies: Re-run when loading finishes, user logs in/out, route potentially changes (via router instance), or mount status changes.
//   // NOTE: Do NOT add `isAdmin` here, calculate it inside from `user`.
//   // NOTE: Adding router might cause loops if redirects happen rapidly. Usually okay with push.
//   }, [user, loading, router, isMounted]);


//   // Context Value Memoization
//   const contextValue: AuthContextType = useMemo(() => ({
//     user, token, loading, login, logout: logoutRef.current, isAdmin, refetchUser, updateAuthUserKyc,
//   }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKyc]); // isAdmin dependency is correct here

//   // Render Provider
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {/* Render children only after client mount and initial load check is complete */}
//       {(!isMounted || loading) ? null : children}
//     </AuthContext.Provider>
//   );
// };

// // Hook to Consume Context
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // --- Export necessary types ---
// export type { KycStatus, KycDetails, KycMobile, UserContextState, BackendUser };
// // isValidBackendUser is exported individually above


// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode,
// } from "react";
// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig";
// import type { KycStatus, KycDetails, KycMobile } from '@/app/services/kyc'; 


// interface BackendUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails; 
//   createdAt: string; 
//   updatedAt: string; 
// }

// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails; 
// }

// export interface AuthContextType {
//   user: UserContextState | null;
//   token: string | null;
//   loading: boolean;
//   login: (backendUser: BackendUser, authToken: string) => void;
//   logout: (reason?: "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void; // Removed "inactivity" reason
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>;
//   updateAuthUserKyc: (updatedKycData: Partial<KycDetails>) => void;
// }

// // Context Setup
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";

// // Axios Instance
// const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

// interface ApiError {
//   message: string;
// }

// export const isValidBackendUser = (data: any): data is BackendUser => {
//   // Add null checks for nested properties accessed
//   return (
//     data && typeof data === 'object' &&
//     typeof data._id === 'string' && data._id.length > 0 &&
//     typeof data.fullName === 'string' &&
//     typeof data.email === 'string' && /\S+@\S+\.\S+/.test(data.email) &&
//     typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
//     typeof data.kyc === 'object' && data.kyc !== null && // Check kyc is object
//     typeof data.kyc.status === 'string' && // Check kyc.status exists
//     ['not_started', 'pending', 'verified', 'rejected', 'skipped'].includes(data.kyc.status) &&
//     typeof data.createdAt === 'string' &&
//     typeof data.updatedAt === 'string'
//   );
// };


// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isMounted, setIsMounted] = useState<boolean>(false);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {});
//   const router = useRouter();

//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         console.log("AuthContext: BroadcastChannel initialized");
//       } catch (error) {
//         console.error("AuthContext: Failed to initialize BroadcastChannel:", error);
//       }
//     }
//     return () => {
//       broadcastChannelRef.current?.close();
//       broadcastChannelRef.current = null;
//       console.log("AuthContext: BroadcastChannel closed");
//     };
//   }, []); // Run only once

//   const logout = useCallback((reason: "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
//     console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//     const wasLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token");

//     setUser(null);
//     setToken(null);
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem("token");
//     }
//     delete apiClient.defaults.headers.common["Authorization"];


//     if (!isBroadcastLogout && broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("logout");
//         console.log("AuthContext: Sent 'logout' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }

//     if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
//       let redirectUrl = "/auth/login";
//       if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true"; // Adds the query param
//       router.push(redirectUrl);
//     }
//   }, [router]); // Dependency: router

//   useEffect(() => {
//     logoutRef.current = logout;
//   }, [logout]);

//   // Refetch User Data
//   const refetchUser = useCallback(async () => {
//     let currentToken: string | null = null;
//     if (typeof window !== 'undefined') {
//       currentToken = localStorage.getItem("token");
//     }
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token.");
//       if (user !== null) setUser(null);
//       if (token !== null) setToken(null);
//       delete apiClient.defaults.headers.common["Authorization"];
//       return;
//     }
//     console.log("AuthContext: Refetching user data...");
//     try {
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<BackendUser>("/dashboard/users/me");

//       if (!isValidBackendUser(response.data)) {
//         console.error("AuthContext: Invalid user data in refetch:", response.data);
//         logoutRef.current("sessionExpired", true); // Force logout if data corrupt
//         throw new Error("Invalid user data structure received during refetch");
//       }

//       const updatedBackendUser: BackendUser = response.data;
//       console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC:", updatedBackendUser.kyc?.status);

//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kyc: updatedBackendUser.kyc,
//       };
//       setUser(userContextData);
//       setToken(currentToken);

//     } catch (error: any) {
//       const axiosError = error as AxiosError<ApiError>; // Type assertion
//       console.error("AuthContext: Failed to refetch user data:", axiosError.response?.status, axiosError.message);
//       if (axiosError.response?.status === 401 || error.message.includes("Invalid user data")) {
//         logoutRef.current("sessionExpired");
//       }
     
//     }
//   }, [token]);

//   // Login Function
//   const login = useCallback((backendUser: BackendUser, authToken: string) => {
//     if (!isValidBackendUser(backendUser)) {
//       console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//       logoutRef.current("manual", true); // Logout locally without broadcasting loop
//       return;
//     }
//     console.log("AuthContext: Logging in user:", backendUser.email, "KYC Status:", backendUser.kyc?.status);

//     const userContextData: UserContextState = {
//       _id: backendUser._id,
//       fullName: backendUser.fullName,
//       email: backendUser.email,
//       role: backendUser.role,
//       kyc: backendUser.kyc,
//     };
//     setUser(userContextData);
//     setToken(authToken);

//     if (typeof window !== 'undefined') {
//       localStorage.setItem("token", authToken);
//     }
//     apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

//     if (broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("login");
//         console.log("AuthContext: Sent 'login' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }

//   }, []);

//   // Update KYC Data Locally
//   const updateAuthUserKyc = useCallback((updatedKycData: Partial<KycDetails>) => {
//     console.log(`[AuthContext] Updating KYC data in auth state with:`, updatedKycData);
//     setUser(currentUser => {
//       if (!currentUser) return null;
//       const nextKyc: KycDetails = {
//         ...currentUser.kyc,
//         ...updatedKycData,
//         ...(updatedKycData.mobile && currentUser.kyc?.mobile && {
//           mobile: { ...currentUser.kyc.mobile, ...updatedKycData.mobile }
//         }),
//       };
//       if (JSON.stringify(currentUser.kyc) === JSON.stringify(nextKyc)) {
//         console.log("[AuthContext] KYC data unchanged after merge.");
//         return currentUser;
//       }
//       console.log("[AuthContext] KYC data changed, updating user state.");
//       return { ...currentUser, kyc: nextKyc };
//     });
//   }, []);

//   useEffect(() => {
//     if (!isMounted || typeof window === 'undefined') {
//       return;
//     }
//     console.log("AuthProvider: Initializing state (Client Mount)...");
//     setLoading(true);
//     let isActive = true;
//     let storedToken: string | null = null;

//     storedToken = localStorage.getItem("token");

//     const initializeAuth = async () => {
//       if (storedToken && isActive) {
//         console.log("AuthProvider: Token found. Setting token state and fetching user.");
//         setToken(storedToken);
//         apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
//         try {
//           const response = await apiClient.get<BackendUser>("/dashboard/users/me");
//           if (!isValidBackendUser(response.data)) {
//             throw new Error("Invalid user data structure received during initialization.");
//           }
//           if (isActive) {
//             const fetchedUser: BackendUser = response.data;
//             const userContextData: UserContextState = {
//               _id: fetchedUser._id, fullName: fetchedUser.fullName, email: fetchedUser.email,
//               role: fetchedUser.role, kyc: fetchedUser.kyc,
//             };
//             setUser(userContextData);
//             console.log("AuthProvider: Initial user fetch success:", userContextData.email);
//           }
//         } catch (error: any) {
//             const axiosError = error as AxiosError<ApiError>; 
//             console.error("AuthProvider: Failed to fetch user during init:", axiosError.response?.status, axiosError.message);
//             if (isActive) {
//                 logoutRef.current(axiosError.response?.status === 401 || error.message?.includes("Invalid user data") ? "sessionExpired" : "manual", true);
//             }
//         } finally {
//           if (isActive) {
//             setLoading(false);
//           }
//         }
//       } else {
//         // No token found
//         if (isActive) {
//           setLoading(false); // Ensure loading finishes even if no token
//         }
//       }
//     };

//     initializeAuth();

//     // Cleanup function
//     return () => {
//       isActive = false; // Prevent state updates after unmount
//       console.log("AuthProvider: Initializing effect cleanup.");
//     };
//   }, [isMounted]); // Dependency: isMounted


//   useEffect(() => {
//     const interceptor = apiClient.interceptors.response.use(
//       (response) => response,
//       (error: AxiosError<ApiError>) => { // Typed error
//         const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
//         const isAuthError = error.response?.status === 401; // Simplified check for 401
//         if (isAuthError && currentToken) { // If it's a 401 AND we *thought* we were logged in
//           console.log("AuthContext: Axios interceptor caught auth error. Logging out.");
//           logoutRef.current("sessionExpired"); // Call logout with sessionExpired reason
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       apiClient.interceptors.response.eject(interceptor);
//       console.log("AuthContext: Axios interceptor removed.");
//     };
//   }, []); // Run only once on mount

//   useEffect(() => {
//     const channel = broadcastChannelRef.current;
//     if (!channel) return;

//     const handleBroadcast = (event: MessageEvent) => {
//       console.log("AuthContext BC: Received message - ", event.data);
//       const localUserBefore = user;
//       const localTokenBefore = token;
//       const storageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

//       if (event.data === "logout") {
//         if (localUserBefore !== null || localTokenBefore !== null) {
//           console.log("AuthContext BC: Handling 'logout' broadcast.");
//           logoutRef.current("manual", true); 
//         }
//       } else if (event.data === "login") {
//         console.log("AuthContext BC: Handling 'login' broadcast.");
//         if (storageToken && (!localTokenBefore || localTokenBefore !== storageToken)) {
//           console.log("AuthContext BC: Token mismatch/missing, refetching.");
//           setToken(storageToken);
//           apiClient.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
//           refetchUser(); 
//         } else if (storageToken && localTokenBefore === storageToken && !localUserBefore) {
//           console.log("AuthContext BC: Token matches, user missing, refetching.");
//           refetchUser();
//         } else if (!storageToken && (localUserBefore || localTokenBefore)) {
//           console.warn("AuthContext BC: 'login' received, no token in storage, logging out locally.");
//           logoutRef.current("manual", true);
//         }
//       }
//     };

//     channel.addEventListener("message", handleBroadcast);
//     return () => {
//       if (broadcastChannelRef.current) {
//         broadcastChannelRef.current.removeEventListener("message", handleBroadcast);
//         console.log("AuthContext BC: Message listener removed.");
//       }
//     };
//   }, [user, token, refetchUser]); 

//   useEffect(() => {
//     if (!isMounted || typeof window === 'undefined' || loading) {
//         console.log(`AuthContext Nav Effect: Skipping (isMounted=${isMounted}, isBrowser=${typeof window !== 'undefined'}, loading=${loading})`);
//         return;
//     }

//     const currentPath = window.location.pathname;
//     console.log(`AuthContext Nav Effect: Path=${currentPath}, user=${user ? user.email : 'null'}`);

//     if (user) {
//       const calculatedIsAdmin = user.role === "admin"; 
//       console.log("AuthContext Nav Effect: User loaded.", { email: user.email, role: user.role, isAdmin: calculatedIsAdmin, kyc: user.kyc?.status });

//       if (calculatedIsAdmin) {
//         const adminHomePath = "/admin"; 
//         const criticalRedirectPaths = [
//             "/auth/login",
//             "/auth/register",
//              "/auth/google/callback-handler"
//             ];

//         if (criticalRedirectPaths.includes(currentPath)) {
//           console.log(`AuthContext Nav Effect: Admin on critical redirect path (${currentPath}). Pushing to ${adminHomePath}...`);
//           router.push(adminHomePath);
//         } else {
//           console.log(`AuthContext Nav Effect: Admin on allowed path (${currentPath}). No redirect enforced by AuthContext.`);
//         }
//         return; 
//       }

//       else {
//         let userTargetPath: string;
//         switch (user.kyc?.status) {
//           case "not_started":
//           case "rejected":
//           case "skipped":
//             userTargetPath = "/kyc/start";
//             break;
//           case "pending":
//             userTargetPath = "/kyc/pending";
//             break;
//           case "verified":
//             userTargetPath = "/dashboard";
//             break;
//           default:
//             console.warn("AuthContext Nav Effect: Unknown KYC status for user.", user.kyc?.status);
//             userTargetPath = "/dashboard";
//         }
//         console.log("AuthContext Nav Effect: User target path calculated:", userTargetPath);

//         const forbiddenPaths = ["/admin"]; 

//         if (forbiddenPaths.some(p => currentPath.startsWith(p))) {
//             console.log(`AuthContext Nav Effect: User on forbidden path (${currentPath}). Redirecting to ${userTargetPath}...`);
//             router.push(userTargetPath);
//             return; // Redirect and stop
//         }

//         const allowedGenericPathsForVerifiedUser = ["/recipients", "/transfer", "/settings"]; // Add profile, etc.
//         const isVerifiedUser = user.kyc?.status === 'verified';
//         const isOnAllowedGenericPath = isVerifiedUser && allowedGenericPathsForVerifiedUser.some(p => currentPath.startsWith(p));

//         if (currentPath !== userTargetPath && !isOnAllowedGenericPath) {
//             const genericAuthPaths = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password", "/"];
//              if (genericAuthPaths.includes(currentPath)) {
//                 console.log(`AuthContext Nav Effect: User (${user.kyc?.status}) on generic auth/root path (${currentPath}). Redirecting to ${userTargetPath}...`);
//                 router.push(userTargetPath);
//              } else {  
//                  if (! ( (userTargetPath === "/kyc/start" || userTargetPath === "/kyc/pending") && currentPath.startsWith('/kyc/') ) ) {
//                      console.log(`AuthContext Nav Effect: User (${user.kyc?.status}) not on target (${userTargetPath}), allowed generic, or auth path (${currentPath}). Redirecting to ${userTargetPath}...`);
//                      router.push(userTargetPath);
//                  } else {
//                      console.log(`AuthContext Nav Effect: User (${user.kyc?.status}) on a KYC page (${currentPath}), which matches their target state (${userTargetPath}). No redirect.`);
//                  }
//              }
//         } else {
//              console.log(`AuthContext Nav Effect: User (${user.kyc?.status}) already on target (${userTargetPath}) or allowed generic page (${currentPath}). No redirect.`);
//         }
//       }
//     }
//     // --- Logic when User is Not Authenticated ---
//     else {
//       console.log("AuthContext Nav Effect: User is null (not logged in).");
//       const publicPaths = [
//           "/",
//           "/auth/login",
//           "/auth/register",
//           "/auth/forgot-password",
//           "/auth/reset-password",
//         ];
//       if (!publicPaths.some(p => currentPath === p) && !currentPath.startsWith('/auth/')) {
//         console.log(`AuthContext Nav Effect: Not logged in and on protected path (${currentPath}). Redirecting to login...`);
//         router.push("/auth/login"); 
//       } else {
//         console.log(`AuthContext Nav Effect: Not logged in and on public/auth path (${currentPath}). No redirect.`);
//       }
//     }
//   }, [user, loading, router, isMounted]);



//   const contextValue: AuthContextType = useMemo(() => ({
//     user, token, loading, login, logout: logoutRef.current, isAdmin, refetchUser, updateAuthUserKyc,
//   }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKyc]); 

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {(!isMounted || loading) ? null : children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export type { KycStatus, KycDetails, KycMobile, UserContextState, BackendUser };


// // frontend/src/app/contexts/AuthContext.tsx
// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode,
// } from "react";
// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig";
// import type { KycStatus, KycDetails, KycMobile } from '@/app/services/kyc';


// interface BackendUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails;
//   createdAt: string;
//   updatedAt: string;
// }

// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails;
// }

// export interface AuthContextType {
//   user: UserContextState | null;
//   token: string | null;
//   loading: boolean;
//   login: (backendUser: BackendUser, authToken: string) => void;
//   logout: (reason?: "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>;
//   updateAuthUserKyc: (updatedKycData: Partial<KycDetails>) => void;
// }

// // Context Setup
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";

// // Axios Instance
// const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

// interface ApiError {
//   message: string;
// }

// export const isValidBackendUser = (data: any): data is BackendUser => {
//   return (
//     data && typeof data === 'object' &&
//     typeof data._id === 'string' && data._id.length > 0 &&
//     typeof data.fullName === 'string' &&
//     typeof data.email === 'string' && /\S+@\S+\.\S+/.test(data.email) &&
//     typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
//     typeof data.kyc === 'object' && data.kyc !== null &&
//     typeof data.kyc.status === 'string' &&
//     ['not_started', 'pending', 'verified', 'rejected', 'skipped'].includes(data.kyc.status) &&
//     typeof data.createdAt === 'string' &&
//     typeof data.updatedAt === 'string'
//   );
// };


// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Start loading true
//   const [isMounted, setIsMounted] = useState<boolean>(false);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {});
//   const router = useRouter();

//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         console.log("AuthContext: BroadcastChannel initialized");
//       } catch (error) {
//         console.error("AuthContext: Failed to initialize BroadcastChannel:", error);
//       }
//     }
//     return () => {
//       broadcastChannelRef.current?.close();
//       broadcastChannelRef.current = null;
//       console.log("AuthContext: BroadcastChannel closed");
//     };
//   }, []);

//   const logout = useCallback((reason: "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
//     console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//     const wasLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token");

//     setUser(null);
//     setToken(null);
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem("token");
//     }
//     delete apiClient.defaults.headers.common["Authorization"];


//     if (!isBroadcastLogout && broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("logout");
//         console.log("AuthContext: Sent 'logout' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }

//     if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
//       let redirectUrl = "/auth/login";
//       if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true";
//       router.push(redirectUrl);
//     }
//   }, [router]);

//   useEffect(() => {
//     logoutRef.current = logout;
//   }, [logout]);

//   const refetchUser = useCallback(async () => {
//     let currentToken: string | null = null;
//     if (typeof window !== 'undefined') {
//       currentToken = localStorage.getItem("token");
//     }
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token.");
//       if (user !== null) setUser(null);
//       if (token !== null) setToken(null);
//       delete apiClient.defaults.headers.common["Authorization"];
//       return;
//     }
//     console.log("AuthContext: Refetching user data...");
//     try {
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<BackendUser>("/dashboard/users/me");

//       if (!isValidBackendUser(response.data)) {
//         console.error("AuthContext: Invalid user data in refetch:", response.data);
//         logoutRef.current("sessionExpired", true);
//         throw new Error("Invalid user data structure received during refetch");
//       }

//       const updatedBackendUser: BackendUser = response.data;
//       console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC:", updatedBackendUser.kyc?.status);

//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kyc: updatedBackendUser.kyc,
//       };
//       setUser(userContextData);
//       setToken(currentToken);

//     } catch (error: any) {
//       const axiosError = error as AxiosError<ApiError>;
//       console.error("AuthContext: Failed to refetch user data:", axiosError.response?.status, axiosError.message);
//       if (axiosError.response?.status === 401 || error.message.includes("Invalid user data")) {
//         logoutRef.current("sessionExpired");
//       }

//     }
//   }, [token]); // Removed logoutRef.current from deps, rely on the ref itself

//   const login = useCallback((backendUser: BackendUser, authToken: string) => {
//     if (!isValidBackendUser(backendUser)) {
//       console.error("AuthContext: Login failed - Invalid user data received.", backendUser);
//       logoutRef.current("manual", true);
//       return;
//     }
//     console.log("AuthContext: Logging in user:", backendUser.email, "KYC Status:", backendUser.kyc?.status);

//     const userContextData: UserContextState = {
//       _id: backendUser._id,
//       fullName: backendUser.fullName,
//       email: backendUser.email,
//       role: backendUser.role,
//       kyc: backendUser.kyc,
//     };
//     setUser(userContextData);
//     setToken(authToken);

//     if (typeof window !== 'undefined') {
//       localStorage.setItem("token", authToken);
//     }
//     apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

//     if (broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("login");
//         console.log("AuthContext: Sent 'login' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }

//     // --- Trigger loading false AFTER state update ---
//     // This helps ensure the navigation effect sees the updated user AND loading=false
//     setLoading(false);

//   }, []); // Removed logoutRef.current from deps

//   const updateAuthUserKyc = useCallback((updatedKycData: Partial<KycDetails>) => {
//     console.log(`[AuthContext] Updating KYC data in auth state with:`, updatedKycData);
//     setUser(currentUser => {
//       if (!currentUser) return null;
//       const nextKyc: KycDetails = {
//         ...currentUser.kyc,
//         ...updatedKycData,
//         ...(updatedKycData.mobile && currentUser.kyc?.mobile && {
//           mobile: { ...currentUser.kyc.mobile, ...updatedKycData.mobile }
//         }),
//       };
//       if (JSON.stringify(currentUser.kyc) === JSON.stringify(nextKyc)) {
//         console.log("[AuthContext] KYC data unchanged after merge.");
//         return currentUser;
//       }
//       console.log("[AuthContext] KYC data changed, updating user state.");
//       return { ...currentUser, kyc: nextKyc };
//     });
//   }, []);

//   // --- Initial State Load Effect ---
//   useEffect(() => {
//     if (!isMounted || typeof window === 'undefined') {
//       return;
//     }
//     console.log("AuthProvider: Initializing state (Client Mount)...");
//     let isActive = true;
//     let storedToken: string | null = localStorage.getItem("token");

//     const initializeAuth = async () => {
//       if (storedToken && isActive) {
//         console.log("AuthProvider: Token found. Setting token state and fetching user.");
//         setToken(storedToken); // Set token state
//         apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
//         try {
//           const response = await apiClient.get<BackendUser>("/dashboard/users/me");
//           if (!isValidBackendUser(response.data)) {
//             throw new Error("Invalid user data structure received during initialization.");
//           }
//           if (isActive) {
//             const fetchedUser: BackendUser = response.data;
//             const userContextData: UserContextState = {
//               _id: fetchedUser._id, fullName: fetchedUser.fullName, email: fetchedUser.email,
//               role: fetchedUser.role, kyc: fetchedUser.kyc,
//             };
//             setUser(userContextData); // Set user state
//             console.log("AuthProvider: Initial user fetch success:", userContextData.email);
//           }
//         } catch (error: any) {
//             const axiosError = error as AxiosError<ApiError>;
//             console.error("AuthProvider: Failed to fetch user during init:", axiosError.response?.status, axiosError.message);
//             if (isActive) {
//                 // Use the logout function directly via the ref
//                 logoutRef.current(axiosError.response?.status === 401 || error.message?.includes("Invalid user data") ? "sessionExpired" : "manual", true);
//             }
//         } finally {
//           if (isActive) {
//             // Set loading false *after* attempting to fetch/set user or after logout
//             setLoading(false);
//           }
//         }
//       } else {
//         // No token found
//         if (isActive) {
//           // Ensure loading finishes even if no token
//           setUser(null); // Ensure user is null if no token
//           setToken(null); // Ensure token is null if no token
//           setLoading(false);
//           console.log("AuthProvider: No token found during init.");
//         }
//       }
//     };

//     initializeAuth();

//     return () => {
//       isActive = false;
//       console.log("AuthProvider: Initializing effect cleanup.");
//     };
//   }, [isMounted]); // Dependency: isMounted only

//   // --- Axios Interceptor ---
//   useEffect(() => {
//     const interceptor = apiClient.interceptors.response.use(
//       (response) => response,
//       (error: AxiosError<ApiError>) => {
//         const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
//         const isAuthError = error.response?.status === 401;
//         if (isAuthError && currentToken) {
//           console.log("AuthContext: Axios interceptor caught auth error. Logging out.");
//           logoutRef.current("sessionExpired"); // Use the ref
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       apiClient.interceptors.response.eject(interceptor);
//       console.log("AuthContext: Axios interceptor removed.");
//     };
//   }, []); // Run only once

//   // --- Broadcast Channel Listener ---
//   useEffect(() => {
//     const channel = broadcastChannelRef.current;
//     if (!channel) return;

//     const handleBroadcast = (event: MessageEvent) => {
//       console.log("AuthContext BC: Received message - ", event.data);
//       const localUserBefore = user;
//       const localTokenBefore = token;
//       const storageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

//       if (event.data === "logout") {
//         if (localUserBefore !== null || localTokenBefore !== null || storageToken) { // Also check storage token
//           console.log("AuthContext BC: Handling 'logout' broadcast.");
//           logoutRef.current("manual", true);
//         }
//       } else if (event.data === "login") {
//         console.log("AuthContext BC: Handling 'login' broadcast.");
//          // If we receive a login broadcast, but don't have a token locally or it differs, refetch
//          if (!storageToken) {
//             console.warn("AuthContext BC: 'login' received, but no token in storage. Logging out locally just in case.");
//             logoutRef.current("manual", true);
//          } else if (!localTokenBefore || localTokenBefore !== storageToken || !localUserBefore) {
//              console.log("AuthContext BC: Token mismatch/missing or user missing, refetching.");
//              setLoading(true); // Indicate loading while refetching
//              refetchUser().finally(() => setLoading(false)); // Refetch user data
//          } else {
//             console.log("AuthContext BC: Already logged in with same token. No action needed.");
//          }
//       }
//     };

//     channel.addEventListener("message", handleBroadcast);
//     return () => {
//       if (broadcastChannelRef.current) {
//         broadcastChannelRef.current.removeEventListener("message", handleBroadcast);
//         console.log("AuthContext BC: Message listener removed.");
//       }
//     };
//   }, [user, token, refetchUser]); // Dependencies

//   // --- CORE NAVIGATION LOGIC EFFECT ---
//   useEffect(() => {
//     // IMPORTANT: Wait for mount, browser environment, AND initial loading to complete
//     if (!isMounted || typeof window === 'undefined' || loading) {
//       console.log(`AuthContext Nav Effect: Skipping (isMounted=${isMounted}, isBrowser=${typeof window !== 'undefined'}, loading=${loading})`);
//       return;
//     }

//     const currentPath = window.location.pathname;
//     console.log(`AuthContext Nav Effect: Running... Path=${currentPath}, User=${user ? user.email : 'null'}, Loading=${loading}`);

//     // --- User is Authenticated ---
//     if (user) {
//       const calculatedIsAdmin = user.role === "admin";
//       console.log("AuthContext Nav Effect: User loaded.", { email: user.email, role: user.role, isAdmin: calculatedIsAdmin, kyc: user.kyc?.status });

//       // --- Admin Logic ---
//       if (calculatedIsAdmin) {
//         const adminHomePath = "/admin"; // Or specific admin dashboard
//         // Paths admin should be redirected AWAY from after login
//         const criticalRedirectPaths = [
//           "/auth/forgot-password",
//           "/auth/reset-password",
//           "/auth/google/callback-handler", // Explicitly include callback handler
//         ];

//         if (criticalRedirectPaths.some(p => currentPath.startsWith(p))) {
//           console.log(`AuthContext Nav Effect: Admin on critical redirect path (${currentPath}). Pushing to ${adminHomePath}...`);
//           router.push(adminHomePath);
//         } else {
//           console.log(`AuthContext Nav Effect: Admin on allowed path (${currentPath}). No redirect enforced by AuthContext.`);
//         }
//         return; // End admin logic
//       }

//       // --- Regular User Logic ---
//       else {
//         let userTargetPath: string;
//         switch (user.kyc?.status) {
//           case "not_started":
//           case "rejected":
//           case "skipped":
//             userTargetPath = "/kyc/start";
//             break;
//           case "pending":
//             userTargetPath = "/kyc/pending";
//             break;
//           case "verified":
//             userTargetPath = "/dashboard"; // Default for verified users
//             break;
//           default:
//             console.warn("AuthContext Nav Effect: Unknown KYC status for user.", user.kyc?.status);
//             userTargetPath = "/dashboard"; // Fallback to dashboard
//         }
//         console.log("AuthContext Nav Effect: User target path calculated:", userTargetPath);

//         const forbiddenOrRedirectPaths = [
//             "/auth/forgot-password",
//             "/auth/reset-password",
//             "/auth/google/callback-handler",
//         ];

//         // Check if the current path requires redirection
//         if (forbiddenOrRedirectPaths.some(p => currentPath.startsWith(p))) {
//             console.log(`AuthContext Nav Effect: User (${user.kyc?.status}) on forbidden/redirect path (${currentPath}). Redirecting to ${userTargetPath}...`);
//             router.push(userTargetPath);
//             return; // Redirect and stop
//         }

//         // Additional check: If user is NOT verified, ensure they are on a KYC path or their target path
//         const isVerifiedUser = user.kyc?.status === 'verified';
//         if (!isVerifiedUser) {
//             const allowedPathsForUnverified = [userTargetPath, "/kyc/pending", "/kyc/start", "/kyc/documents"]; // Add any other specific KYC steps
//             if (!allowedPathsForUnverified.some(p => currentPath.startsWith(p))) {
//                  console.log(`AuthContext Nav Effect: Unverified User (${user.kyc?.status}) on unexpected path (${currentPath}). Redirecting to ${userTargetPath}...`);
//                  router.push(userTargetPath);
//                  return;
//             }
//         }

//         // If verified, ensure they are not stuck on KYC pages (unless it's the target)
//         if (isVerifiedUser && currentPath.startsWith('/kyc') && userTargetPath !== currentPath) {
//              console.log(`AuthContext Nav Effect: Verified User on KYC path (${currentPath}). Redirecting to ${userTargetPath}...`);
//              router.push(userTargetPath);
//              return;
//         }

//         // If none of the above conditions triggered a redirect, log that no action is needed.
//         console.log(`AuthContext Nav Effect: User (${user.kyc?.status}) on appropriate path (${currentPath}). No redirect needed.`);
//       }
//     }

//     // --- User is Not Authenticated ---
//     else {
//       console.log("AuthContext Nav Effect: User is null (not logged in).");
//       const publicPaths = [
//         "/", // Allow root page
//         "/auth/login",
//         "/auth/register",
//         "/auth/forgot-password",
//         "/auth/reset-password",
//         "/auth/google/callback-handler" // Allow callback handler while processing
//         // Add other public pages like terms, privacy policy etc. if needed
//       ];
//       // Check if the current path is NOT one of the public/auth paths
//       if (!publicPaths.some(p => currentPath.startsWith(p))) {
//         console.log(`AuthContext Nav Effect: Not logged in and on protected path (${currentPath}). Redirecting to login...`);
//         router.push("/auth/login");
//       } else {
//         console.log(`AuthContext Nav Effect: Not logged in and on public/auth path (${currentPath}). No redirect.`);
//       }
//     }
//   }, [user, loading, router, isMounted]); // Dependencies


//   const contextValue: AuthContextType = useMemo(() => ({
//     user, token, loading, login, logout: logoutRef.current, isAdmin, refetchUser, updateAuthUserKyc,
//   }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKyc]);

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {(!loading && isMounted) ? children : null }

//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export type { KycStatus, KycDetails, KycMobile, UserContextState, BackendUser };



// // frontend/src/app/contexts/AuthContext.tsx
// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode,
// } from "react";
// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig"; // Corrected: assuming this path is aliased or correct
// import type { KycStatus, KycDetails, KycMobile } from '@/app/services/kyc'; // Ensure this path is correct


// interface BackendUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails;
//   createdAt: string;
//   updatedAt: string;
//   isGoogleAccount?: boolean; // Added to ensure it's part of the type if backend sends it
// }

// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails;
//   isGoogleAccount?: boolean; // Added
// }

// export interface AuthContextType {
//   user: UserContextState | null;
//   token: string | null;
//   loading: boolean;
//   login: (backendUser: BackendUser, authToken: string) => void;
//   logout: (reason?: "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>;
//   updateAuthUserKyc: (updatedKycData: Partial<KycDetails>) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
// const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

// interface ApiError {
//   message: string;
// }

// export const isValidBackendUser = (data: any): data is BackendUser => {
//   if (!data || typeof data !== 'object') return false;

//   const kycValid = typeof data.kyc === 'object' && data.kyc !== null &&
//                    typeof data.kyc.status === 'string' &&
//                    ['not_started', 'pending', 'verified', 'rejected', 'skipped'].includes(data.kyc.status);

//   return (
//     typeof data._id === 'string' && data._id.length > 0 &&
//     typeof data.fullName === 'string' &&
//     typeof data.email === 'string' && /\S+@\S+\.\S+/.test(data.email) &&
//     typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
//     kycValid &&
//     typeof data.createdAt === 'string' &&
//     typeof data.updatedAt === 'string'
//     // isGoogleAccount is optional, so not strictly validated here for presence
//   );
// };


// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isMounted, setIsMounted] = useState<boolean>(false);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {});
//   const router = useRouter();

//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         console.log("AuthContext: BroadcastChannel initialized");
//       } catch (error) {
//         console.error("AuthContext: Failed to initialize BroadcastChannel:", error);
//       }
//     }
//     return () => {
//       broadcastChannelRef.current?.close();
//       broadcastChannelRef.current = null;
//       console.log("AuthContext: BroadcastChannel closed");
//     };
//   }, []);

//   const logout = useCallback((reason: "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
//     console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//     const wasLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token");

//     setUser(null);
//     setToken(null);
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem("token");
//     }
//     delete apiClient.defaults.headers.common["Authorization"];

//     if (!isBroadcastLogout && broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("logout");
//         console.log("AuthContext: Sent 'logout' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }

//     if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
//       let redirectUrl = "/auth/login";
//       if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true";
//       router.push(redirectUrl);
//     }
//   }, [router]);

//   useEffect(() => {
//     logoutRef.current = logout;
//   }, [logout]);

//   const refetchUser = useCallback(async () => {
//     let currentToken: string | null = null;
//     if (typeof window !== 'undefined') {
//       currentToken = localStorage.getItem("token");
//     }
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token.");
//       if (user !== null) setUser(null);
//       if (token !== null) setToken(null);
//       delete apiClient.defaults.headers.common["Authorization"];
//       setLoading(false); // Ensure loading is false if no token
//       return;
//     }
//     console.log("AuthContext: Refetching user data...");
//     setLoading(true); // Set loading true during refetch
//     try {
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<BackendUser>("/dashboard/users/me");

//       if (!isValidBackendUser(response.data)) {
//         console.error("AuthContext: Invalid user data in refetch:", response.data);
//         logoutRef.current("sessionExpired", true); // logout will handle setLoading eventually
//         throw new Error("Invalid user data structure received during refetch");
//       }

//       const updatedBackendUser: BackendUser = response.data;
//       console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC:", updatedBackendUser.kyc?.status);

//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kyc: updatedBackendUser.kyc,
//         isGoogleAccount: updatedBackendUser.isGoogleAccount,
//       };
//       setUser(userContextData);
//       setToken(currentToken); // Keep token state consistent

//     } catch (error: any) {
//       const axiosError = error as AxiosError<ApiError>;
//       console.error("AuthContext: Failed to refetch user data:", axiosError.response?.status, axiosError.message);
//       if (axiosError.response?.status === 401 || error.message.includes("Invalid user data")) {
//         logoutRef.current("sessionExpired");
//       }
//     } finally {
//         setLoading(false); // Always set loading false after refetch attempt
//     }
//   }, [user, token]); // Dependencies

//   const login = useCallback((backendUser: BackendUser, authToken: string) => {
//     console.log("[AuthContext] login() called. Received backendUser:", JSON.stringify(backendUser));
//     if (!isValidBackendUser(backendUser)) {
//       console.error("AuthContext: Login failed - Invalid user data received. User data:", backendUser);
//       logoutRef.current("manual", true); 
//       return;
//     }
//     console.log("AuthContext: User data is valid. Logging in user:", backendUser.email, "KYC Status:", backendUser.kyc?.status);

//     const userContextData: UserContextState = {
//       _id: backendUser._id,
//       fullName: backendUser.fullName,
//       email: backendUser.email,
//       role: backendUser.role,
//       kyc: backendUser.kyc,
//       isGoogleAccount: backendUser.isGoogleAccount,
//     };
    
//     setUser(userContextData);
//     setToken(authToken);

//     if (typeof window !== 'undefined') {
//       localStorage.setItem("token", authToken);
//     }
//     apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

//     if (broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("login");
//         console.log("AuthContext: Sent 'login' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }
//     setLoading(false); 
//     console.log("[AuthContext] login() completed. User set, token set, loading set to false.");
//   }, []);

//   const updateAuthUserKyc = useCallback((updatedKycData: Partial<KycDetails>) => {
//     console.log(`[AuthContext] Updating KYC data in auth state with:`, updatedKycData);
//     setUser(currentUser => {
//       if (!currentUser) return null;
//       const nextKyc: KycDetails = {
//         ...currentUser.kyc,
//         ...updatedKycData,
//         ...(updatedKycData.mobile && currentUser.kyc?.mobile && {
//           mobile: { ...currentUser.kyc.mobile, ...updatedKycData.mobile }
//         }),
//       };
//       if (JSON.stringify(currentUser.kyc) === JSON.stringify(nextKyc)) {
//         console.log("[AuthContext] KYC data unchanged after merge.");
//         return currentUser;
//       }
//       console.log("[AuthContext] KYC data changed, updating user state.");
//       return { ...currentUser, kyc: nextKyc };
//     });
//   }, []);

//   useEffect(() => {
//     if (!isMounted || typeof window === 'undefined') {
//       return;
//     }
//     console.log("AuthProvider: Initializing state (Client Mount)...");
//     let isActive = true;
//     let storedToken: string | null = localStorage.getItem("token");

//     const initializeAuth = async () => {
//       if (storedToken && isActive) {
//         console.log("AuthProvider: Token found. Setting token state and fetching user.");
//         setToken(storedToken);
//         apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
//         try {
//           const response = await apiClient.get<BackendUser>("/dashboard/users/me");
//           if (!isValidBackendUser(response.data)) {
//             throw new Error("Invalid user data structure received during initialization.");
//           }
//           if (isActive) {
//             const fetchedUser: BackendUser = response.data;
//             const userContextData: UserContextState = {
//               _id: fetchedUser._id, fullName: fetchedUser.fullName, email: fetchedUser.email,
//               role: fetchedUser.role, kyc: fetchedUser.kyc, isGoogleAccount: fetchedUser.isGoogleAccount,
//             };
//             setUser(userContextData);
//             console.log("AuthProvider: Initial user fetch success:", userContextData.email);
//           }
//         } catch (error: any) {
//             const axiosError = error as AxiosError<ApiError>;
//             console.error("AuthProvider: Failed to fetch user during init:", axiosError.response?.status, axiosError.message);
//             if (isActive) {
//                 logoutRef.current(axiosError.response?.status === 401 || error.message?.includes("Invalid user data") ? "sessionExpired" : "manual", true);
//             }
//         } finally {
//           if (isActive) {
//             setLoading(false);
//           }
//         }
//       } else {
//         if (isActive) {
//           setUser(null); 
//           setToken(null); 
//           setLoading(false);
//           console.log("AuthProvider: No token found during init.");
//         }
//       }
//     };
//     initializeAuth();
//     return () => {
//       isActive = false;
//       console.log("AuthProvider: Initializing effect cleanup.");
//     };
//   }, [isMounted]);

//   useEffect(() => {
//     const interceptor = apiClient.interceptors.response.use(
//       (response) => response,
//       (error: AxiosError<ApiError>) => {
//         const currentTokenStore = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
//         const isAuthError = error.response?.status === 401;
//         if (isAuthError && currentTokenStore) { // Check localStorage token existence
//           console.log("AuthContext: Axios interceptor caught 401. Current token in store. Logging out.");
//           logoutRef.current("sessionExpired"); 
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       apiClient.interceptors.response.eject(interceptor);
//       console.log("AuthContext: Axios interceptor removed.");
//     };
//   }, []); 

//   useEffect(() => {
//     const channel = broadcastChannelRef.current;
//     if (!channel) return;

//     const handleBroadcast = (event: MessageEvent) => {
//       console.log("AuthContext BC: Received message - ", event.data);
//       const localUserBefore = user; // Use state variable 'user'
//       const localTokenBefore = token; // Use state variable 'token'
//       const storageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

//       if (event.data === "logout") {
//         if (localUserBefore !== null || localTokenBefore !== null || storageToken) {
//           console.log("AuthContext BC: Handling 'logout' broadcast.");
//           logoutRef.current("manual", true);
//         }
//       } else if (event.data === "login") {
//         console.log("AuthContext BC: Handling 'login' broadcast.");
//          if (!storageToken) {
//             console.warn("AuthContext BC: 'login' received, but no token in storage. Logging out locally.");
//             logoutRef.current("manual", true);
//          } else if (!localTokenBefore || localTokenBefore !== storageToken || !localUserBefore) {
//              console.log("AuthContext BC: Token/user mismatch or missing, refetching user data.");
//              refetchUser(); // refetchUser now handles setLoading internally
//          } else {
//             console.log("AuthContext BC: Already logged in with same token and user. No action.");
//          }
//       }
//     };

//     channel.addEventListener("message", handleBroadcast);
//     return () => {
//       if (broadcastChannelRef.current) { // Check ref before accessing
//         broadcastChannelRef.current.removeEventListener("message", handleBroadcast);
//         console.log("AuthContext BC: Message listener removed.");
//       }
//     };
//   }, [user, token, refetchUser]);


//   // --- CORE NAVIGATION LOGIC EFFECT (REVISED) ---
//   useEffect(() => {
//     if (!isMounted || typeof window === 'undefined' || loading) {
//       console.log(`AuthContext Nav Effect: Skipping (isMounted=${isMounted}, isBrowser=${typeof window !== 'undefined'}, loading=${loading})`);
//       return;
//     }

//     const currentPath = window.location.pathname;
//     console.log(`AuthContext Nav Effect: Running... Path=${currentPath}, User=${user ? user.email : 'null'}, Loading=${loading}, isAdmin=${isAdmin}`);

//     // Paths that are primarily for unauthenticated users or one-time auth operations
//     const authRelatedRedirectPaths = [ // Renamed for clarity
//         "/auth/login",
//         "/auth/register",
//         "/auth/forgot-password",
//         "/auth/reset-password",
//         "/auth/google/callback-handler",
//     ];

//     if (user) { // User is authenticated
//       let targetPath: string;

//       if (isAdmin) {
//         targetPath = "/admin";
//       } else { // Regular User
//         switch (user.kyc?.status) {
//           case "not_started":
//           case "rejected":
//           case "skipped":
//             targetPath = "/kyc/start";
//             break;
//           case "pending":
//             targetPath = "/kyc/pending";
//             break;
//           case "verified":
//             targetPath = "/dashboard";
//             break;
//           default:
//             console.warn("AuthContext Nav Effect: Unknown KYC status for user:", user.kyc?.status);
//             targetPath = "/dashboard"; // Fallback
//         }
//       }
//       console.log(`AuthContext Nav Effect: Calculated targetPath for authenticated user: ${targetPath}`);

//       // If user is authenticated and currently on an auth-related page, redirect them.
//       if (authRelatedRedirectPaths.some(p => currentPath.startsWith(p))) {
//         console.log(`AuthContext Nav Effect: User on auth path (${currentPath}). Redirecting to ${targetPath}...`);
//         router.push(targetPath);
//         return; // Critical: stop further checks in this effect run
//       }

//       // Additional specific logic for non-admin, non-verified users
//       if (!isAdmin && user.kyc?.status !== 'verified') {
//           const allowedKycPaths = ["/kyc/start", "/kyc/pending", "/kyc/documents", "/kyc/identity"]; // Add all valid KYC steps
//           // If user is not on their kyc targetPath AND not on another allowed intermediate kyc path
//           if (currentPath !== targetPath && !allowedKycPaths.some(p => currentPath.startsWith(p))) {
//                console.log(`AuthContext Nav Effect: Unverified User (${user.kyc?.status}) on unexpected non-KYC path (${currentPath}). Redirecting to ${targetPath}...`);
//                router.push(targetPath);
//                return;
//           }
//       }
      
//       // If a verified user somehow lands on a KYC page that is not their dashboard (targetPath for verified)
//       if (!isAdmin && user.kyc?.status === 'verified' && currentPath.startsWith('/kyc') && currentPath !== targetPath) {
//         console.log(`AuthContext Nav Effect: Verified user on KYC page (${currentPath}). Redirecting to ${targetPath} (dashboard)...`);
//         router.push(targetPath);
//         return;
//       }

//       console.log(`AuthContext Nav Effect: User on appropriate path (${currentPath}). No further redirect needed by this effect.`);

//     } else { // User is NOT Authenticated
//       console.log("AuthContext Nav Effect: User is null (not logged in).");
//       const publicPaths = [
//         "/", // Allow root
//         ...authRelatedRedirectPaths // Auth paths are public
//         // Add other public static pages like /terms, /privacy
//       ];
//       if (!publicPaths.some(p => currentPath.startsWith(p))) {
//         console.log(`AuthContext Nav Effect: Not logged in and on protected path (${currentPath}). Redirecting to login...`);
//         router.push("/auth/login");
//       } else {
//         console.log(`AuthContext Nav Effect: Not logged in and on public/auth path (${currentPath}). No redirect.`);
//       }
//     }
//   }, [user, loading, router, isMounted, isAdmin]);


//   const contextValue: AuthContextType = useMemo(() => ({
//     user, token, loading, login, logout: logoutRef.current, isAdmin, refetchUser, updateAuthUserKyc,
//   }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKyc]); // logoutRef.current is stable

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {/* Render children only after initial loading is false AND component is mounted */}
//       {(!loading && isMounted) ? children : null /* Or a global loading spinner */}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export type { KycStatus, KycDetails, KycMobile, UserContextState, BackendUser };



// // frontend/src/app/contexts/AuthContext.tsx
// "use client";

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
//   useRef,
//   useMemo,
//   ReactNode,
// } from "react";
// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import apiConfig from "../config/apiConfig";
// import type { KycStatus, KycDetails, KycMobile } from '@/app/services/kyc';
// // --- Import inboxService and its types ---
// import inboxService, { type UnreadCountResponse } from "../services/inbox"; // Adjust path if necessary


// interface BackendUser {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails;
//   createdAt: string;
//   updatedAt: string;
//   isGoogleAccount?: boolean;
// }

// interface UserContextState {
//   _id: string;
//   fullName: string;
//   email: string;
//   role: "user" | "admin";
//   kyc: KycDetails;
//   isGoogleAccount?: boolean;
// }

// export interface AuthContextType {
//   user: UserContextState | null;
//   token: string | null;
//   loading: boolean;
//   login: (backendUser: BackendUser, authToken: string) => void;
//   logout: (reason?: "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void;
//   isAdmin: boolean;
//   refetchUser: () => Promise<void>;
//   updateAuthUserKyc: (updatedKycData: Partial<KycDetails>) => void;
//   unreadMessageCount: number; // --- New: Unread message count ---
//   fetchUnreadInboxCount: () => Promise<void>; // --- New: Function to fetch count ---
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
// const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

// interface ApiError {
//   message: string;
// }

// export const isValidBackendUser = (data: any): data is BackendUser => {
//   if (!data || typeof data !== 'object') return false;

//   const kycValid = typeof data.kyc === 'object' && data.kyc !== null &&
//                    typeof data.kyc.status === 'string' &&
//                    ['not_started', 'pending', 'verified', 'rejected', 'skipped'].includes(data.kyc.status);

//   return (
//     typeof data._id === 'string' && data._id.length > 0 &&
//     typeof data.fullName === 'string' &&
//     typeof data.email === 'string' && /\S+@\S+\.\S+/.test(data.email) &&
//     typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
//     kycValid &&
//     typeof data.createdAt === 'string' &&
//     typeof data.updatedAt === 'string'
//   );
// };


// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserContextState | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isMounted, setIsMounted] = useState<boolean>(false);
//   const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
//   const logoutRef = useRef<AuthContextType["logout"]>(() => {});
//   const router = useRouter();
//   const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0); // --- New state ---


//   const isAdmin = useMemo(() => user?.role === "admin", [user]);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined" && !broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
//         console.log("AuthContext: BroadcastChannel initialized");
//       } catch (error) {
//         console.error("AuthContext: Failed to initialize BroadcastChannel:", error);
//       }
//     }
//     return () => {
//       broadcastChannelRef.current?.close();
//       broadcastChannelRef.current = null;
//       console.log("AuthContext: BroadcastChannel closed");
//     };
//   }, []);

//   const fetchUnreadInboxCount = useCallback(async () => {
//     // Check if user is available from state; token check is implicitly handled by inboxService
//     const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
//     if (!currentToken) {
//       console.log("AuthContext: Skipping unread count fetch - no token.");
//       setUnreadMessageCount(0);
//       return;
//     }
//     console.log("AuthContext: Fetching unread inbox count...");
//     try {
//       const data: UnreadCountResponse = await inboxService.getUnreadCount();
//       setUnreadMessageCount(data.unreadCount);
//       console.log("AuthContext: Unread count updated to:", data.unreadCount);
//     } catch (error) {
//       console.error("AuthContext: Failed to fetch unread message count", error);
//       setUnreadMessageCount(0); // Reset on error
//     }
//   }, []);


//   const logout = useCallback((reason: "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
//     console.log(`AuthContext: Logging out. Reason: ${reason}, Is Broadcast: ${isBroadcastLogout}`);
//     const wasLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token");

//     setUser(null);
//     setToken(null);
//     setUnreadMessageCount(0); // --- Reset unread count on logout ---
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem("token");
//     }
//     delete apiClient.defaults.headers.common["Authorization"];

//     if (!isBroadcastLogout && broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("logout");
//         console.log("AuthContext: Sent 'logout' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }

//     if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
//       let redirectUrl = "/auth/login";
//       if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true";
//       router.push(redirectUrl);
//     }
//   }, [router]); // Removed fetchUnreadInboxCount from here as it's called by logout itself

//   useEffect(() => {
//     logoutRef.current = logout;
//   }, [logout]);

//   const refetchUser = useCallback(async () => {
//     let currentToken: string | null = null;
//     if (typeof window !== 'undefined') {
//       currentToken = localStorage.getItem("token");
//     }
//     if (!currentToken) {
//       console.log("AuthContext: Refetch skipped - no token.");
//       if (user !== null) setUser(null);
//       if (token !== null) setToken(null);
//       setUnreadMessageCount(0); // --- Reset unread count ---
//       delete apiClient.defaults.headers.common["Authorization"];
//       setLoading(false);
//       return;
//     }
//     console.log("AuthContext: Refetching user data...");
//     setLoading(true);
//     try {
//       apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
//       const response = await apiClient.get<BackendUser>("/dashboard/users/me");

//       if (!isValidBackendUser(response.data)) {
//         console.error("AuthContext: Invalid user data in refetch:", response.data);
//         logoutRef.current("sessionExpired", true);
//         throw new Error("Invalid user data structure received during refetch");
//       }

//       const updatedBackendUser: BackendUser = response.data;
//       console.log("AuthContext: Refetched user:", updatedBackendUser.email, "KYC:", updatedBackendUser.kyc?.status);

//       const userContextData: UserContextState = {
//         _id: updatedBackendUser._id,
//         fullName: updatedBackendUser.fullName,
//         email: updatedBackendUser.email,
//         role: updatedBackendUser.role,
//         kyc: updatedBackendUser.kyc,
//         isGoogleAccount: updatedBackendUser.isGoogleAccount,
//       };
//       setUser(userContextData);
//       setToken(currentToken);
//       await fetchUnreadInboxCount(); // --- Fetch unread count after user refetch ---

//     } catch (error: any) {
//       const axiosError = error as AxiosError<ApiError>;
//       console.error("AuthContext: Failed to refetch user data:", axiosError.response?.status, axiosError.message);
//       if (axiosError.response?.status === 401 || error.message.includes("Invalid user data")) {
//         logoutRef.current("sessionExpired");
//       }
//     } finally {
//         setLoading(false);
//     }
//   }, [user, token, fetchUnreadInboxCount]); // Added fetchUnreadInboxCount dependency

//   const login = useCallback(async (backendUser: BackendUser, authToken: string) => {
//     console.log("[AuthContext] login() called. Received backendUser:", JSON.stringify(backendUser));
//     if (!isValidBackendUser(backendUser)) {
//       console.error("AuthContext: Login failed - Invalid user data received. User data:", backendUser);
//       logoutRef.current("manual", true);
//       return;
//     }
//     console.log("AuthContext: User data is valid. Logging in user:", backendUser.email, "KYC Status:", backendUser.kyc?.status);

//     const userContextData: UserContextState = {
//       _id: backendUser._id,
//       fullName: backendUser.fullName,
//       email: backendUser.email,
//       role: backendUser.role,
//       kyc: backendUser.kyc,
//       isGoogleAccount: backendUser.isGoogleAccount,
//     };

//     setUser(userContextData);
//     setToken(authToken);

//     if (typeof window !== 'undefined') {
//       localStorage.setItem("token", authToken);
//     }
//     apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

//     await fetchUnreadInboxCount(); // --- Fetch unread count after login ---

//     if (broadcastChannelRef.current) {
//       try {
//         broadcastChannelRef.current.postMessage("login");
//         console.log("AuthContext: Sent 'login' broadcast");
//       } catch (e) {
//         console.error("AuthContext: BroadcastChannel postMessage error:", e);
//       }
//     }
//     setLoading(false);
//     console.log("[AuthContext] login() completed. User set, token set, loading set to false.");
//   }, [fetchUnreadInboxCount]); // Added fetchUnreadInboxCount dependency

//   const updateAuthUserKyc = useCallback((updatedKycData: Partial<KycDetails>) => {
//     console.log(`[AuthContext] Updating KYC data in auth state with:`, updatedKycData);
//     setUser(currentUser => {
//       if (!currentUser) return null;
//       const nextKyc: KycDetails = {
//         ...currentUser.kyc,
//         ...updatedKycData,
//         ...(updatedKycData.mobile && currentUser.kyc?.mobile && {
//           mobile: { ...currentUser.kyc.mobile, ...updatedKycData.mobile }
//         }),
//       };
//       if (JSON.stringify(currentUser.kyc) === JSON.stringify(nextKyc)) {
//         console.log("[AuthContext] KYC data unchanged after merge.");
//         return currentUser;
//       }
//       console.log("[AuthContext] KYC data changed, updating user state.");
//       return { ...currentUser, kyc: nextKyc };
//     });
//   }, []);

//   useEffect(() => {
//     if (!isMounted || typeof window === 'undefined') {
//       return;
//     }
//     console.log("AuthProvider: Initializing state (Client Mount)...");
//     let isActive = true;
//     let storedToken: string | null = localStorage.getItem("token");

//     const initializeAuth = async () => {
//       if (storedToken && isActive) {
//         console.log("AuthProvider: Token found. Setting token state and fetching user.");
//         setToken(storedToken);
//         apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
//         try {
//           const response = await apiClient.get<BackendUser>("/dashboard/users/me");
//           if (!isValidBackendUser(response.data)) {
//             throw new Error("Invalid user data structure received during initialization.");
//           }
//           if (isActive) {
//             const fetchedUser: BackendUser = response.data;
//             const userContextData: UserContextState = {
//               _id: fetchedUser._id, fullName: fetchedUser.fullName, email: fetchedUser.email,
//               role: fetchedUser.role, kyc: fetchedUser.kyc, isGoogleAccount: fetchedUser.isGoogleAccount,
//             };
//             setUser(userContextData);
//             await fetchUnreadInboxCount(); // --- Fetch unread count on initial load ---
//             console.log("AuthProvider: Initial user fetch success:", userContextData.email);
//           }
//         } catch (error: any) {
//             const axiosError = error as AxiosError<ApiError>;
//             console.error("AuthProvider: Failed to fetch user during init:", axiosError.response?.status, axiosError.message);
//             if (isActive) {
//                 logoutRef.current(axiosError.response?.status === 401 || error.message?.includes("Invalid user data") ? "sessionExpired" : "manual", true);
//             }
//         } finally {
//           if (isActive) {
//             setLoading(false);
//           }
//         }
//       } else {
//         if (isActive) {
//           setUser(null);
//           setToken(null);
//           setUnreadMessageCount(0); // --- Reset unread count ---
//           setLoading(false);
//           console.log("AuthProvider: No token found during init.");
//         }
//       }
//     };
//     initializeAuth();
//     return () => {
//       isActive = false;
//       console.log("AuthProvider: Initializing effect cleanup.");
//     };
//   }, [isMounted, fetchUnreadInboxCount]); // Added fetchUnreadInboxCount

//   useEffect(() => {
//     const interceptor = apiClient.interceptors.response.use(
//       (response) => response,
//       (error: AxiosError<ApiError>) => {
//         const currentTokenStore = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
//         const isAuthError = error.response?.status === 401;
//         if (isAuthError && currentTokenStore) {
//           console.log("AuthContext: Axios interceptor caught 401. Current token in store. Logging out.");
//           logoutRef.current("sessionExpired");
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       apiClient.interceptors.response.eject(interceptor);
//       console.log("AuthContext: Axios interceptor removed.");
//     };
//   }, []);

//   useEffect(() => {
//     const channel = broadcastChannelRef.current;
//     if (!channel) return;

//     const handleBroadcast = async (event: MessageEvent) => { // Made async
//       console.log("AuthContext BC: Received message - ", event.data);
//       const localUserBefore = user;
//       const localTokenBefore = token;
//       const storageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

//       if (event.data === "logout") {
//         if (localUserBefore !== null || localTokenBefore !== null || storageToken) {
//           console.log("AuthContext BC: Handling 'logout' broadcast.");
//           logoutRef.current("manual", true);
//           // No need to call fetchUnreadInboxCount, logout already resets it.
//         }
//       } else if (event.data === "login") {
//         console.log("AuthContext BC: Handling 'login' broadcast.");
//          if (!storageToken) {
//             console.warn("AuthContext BC: 'login' received, but no token in storage. Logging out locally.");
//             logoutRef.current("manual", true);
//          } else if (!localTokenBefore || localTokenBefore !== storageToken || !localUserBefore) {
//              console.log("AuthContext BC: Token/user mismatch or missing, refetching user data and unread count.");
//              // refetchUser will call fetchUnreadInboxCount internally if successful
//              await refetchUser();
//          } else {
//             console.log("AuthContext BC: Already logged in with same token and user. Maybe just refresh unread count.");
//             await fetchUnreadInboxCount(); // Good to refresh count even if user is same
//          }
//       }
//     };

//     channel.addEventListener("message", handleBroadcast);
//     return () => {
//       if (broadcastChannelRef.current) {
//         broadcastChannelRef.current.removeEventListener("message", handleBroadcast);
//         console.log("AuthContext BC: Message listener removed.");
//       }
//     };
//   }, [user, token, refetchUser, fetchUnreadInboxCount]); // Added fetchUnreadInboxCount


//   // --- CORE NAVIGATION LOGIC EFFECT (REVISED) ---
//   useEffect(() => {
//     if (!isMounted || typeof window === 'undefined' || loading) {
//       console.log(`AuthContext Nav Effect: Skipping (isMounted=${isMounted}, isBrowser=${typeof window !== 'undefined'}, loading=${loading})`);
//       return;
//     }

//     const currentPath = window.location.pathname;
//     console.log(`AuthContext Nav Effect: Running... Path=${currentPath}, User=${user ? user.email : 'null'}, Loading=${loading}, isAdmin=${isAdmin}`);

//     const authRelatedRedirectPaths = [
//         "/auth/login",
//         "/auth/register",
//         "/auth/forgot-password",
//         "/auth/reset-password",
//         "/auth/google/callback-handler",
//     ];

//     if (user) {
//       let targetPath: string;

//       if (isAdmin) {
//         targetPath = "/admin";
//       } else {
//         switch (user.kyc?.status) {
//           case "not_started":
//           case "rejected":
//           case "skipped":
//             targetPath = "/kyc/start";
//             break;
//           case "pending":
//             targetPath = "/kyc/pending";
//             break;
//           case "verified":
//             targetPath = "/dashboard";
//             break;
//           default:
//             console.warn("AuthContext Nav Effect: Unknown KYC status for user:", user.kyc?.status);
//             targetPath = "/dashboard";
//         }
//       }
//       console.log(`AuthContext Nav Effect: Calculated targetPath for authenticated user: ${targetPath}`);

//       if (authRelatedRedirectPaths.some(p => currentPath.startsWith(p))) {
//         console.log(`AuthContext Nav Effect: User on auth path (${currentPath}). Redirecting to ${targetPath}...`);
//         router.push(targetPath);
//         return;
//       }

//       if (!isAdmin && user.kyc?.status !== 'verified') {
//           const allowedKycPaths = ["/kyc/start", "/kyc/pending", "/kyc/documents", "/kyc/identity"];
//           if (currentPath !== targetPath && !allowedKycPaths.some(p => currentPath.startsWith(p))) {
//                console.log(`AuthContext Nav Effect: Unverified User (${user.kyc?.status}) on unexpected non-KYC path (${currentPath}). Redirecting to ${targetPath}...`);
//                router.push(targetPath);
//                return;
//           }
//       }

//       if (!isAdmin && user.kyc?.status === 'verified' && currentPath.startsWith('/kyc') && currentPath !== targetPath) {
//         console.log(`AuthContext Nav Effect: Verified user on KYC page (${currentPath}). Redirecting to ${targetPath} (dashboard)...`);
//         router.push(targetPath);
//         return;
//       }

//       console.log(`AuthContext Nav Effect: User on appropriate path (${currentPath}). No further redirect needed by this effect.`);

//     } else {
//       console.log("AuthContext Nav Effect: User is null (not logged in).");
//       const publicPaths = [
//         "/",
//         ...authRelatedRedirectPaths
//       ];
//       if (!publicPaths.some(p => currentPath.startsWith(p))) {
//         console.log(`AuthContext Nav Effect: Not logged in and on protected path (${currentPath}). Redirecting to login...`);
//         router.push("/auth/login");
//       } else {
//         console.log(`AuthContext Nav Effect: Not logged in and on public/auth path (${currentPath}). No redirect.`);
//       }
//     }
//   }, [user, loading, router, isMounted, isAdmin]);


//   const contextValue: AuthContextType = useMemo(() => ({
//     user, token, loading, login, logout: logoutRef.current, isAdmin, refetchUser, updateAuthUserKyc,
//     unreadMessageCount, // --- Expose count ---
//     fetchUnreadInboxCount, // --- Expose fetch function ---
//   }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKyc, unreadMessageCount, fetchUnreadInboxCount]);

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {(!loading && isMounted) ? children : null}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export type { KycStatus, KycDetails, KycMobile, UserContextState, BackendUser };


// frontend/src/app/contexts/AuthContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
  ReactNode,
} from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import apiConfig from "../config/apiConfig";
import type { KycStatus, KycDetails, KycMobile } from '@/app/services/kyc';
import inboxService, { type UnreadCountResponse } from "../services/inbox";


interface BackendUser {
  _id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  kyc: KycDetails;
  createdAt: string;
  updatedAt: string;
  isGoogleAccount?: boolean;
}

interface UserContextState {
  _id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  kyc: KycDetails;
  isGoogleAccount?: boolean;
}

export interface AuthContextType {
  user: UserContextState | null;
  token: string | null;
  loading: boolean;
  login: (backendUser: BackendUser, authToken: string) => void;
  logout: (reason?: "sessionExpired" | "manual", isBroadcastLogout?: boolean) => void;
  isAdmin: boolean;
  refetchUser: () => Promise<void>;
  updateAuthUserKyc: (updatedKycData: Partial<KycDetails>) => void;
  unreadMessageCount: number;
  fetchUnreadInboxCount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const BROADCAST_CHANNEL_NAME = "wise-auth-channel";
const apiClient = axios.create({ baseURL: apiConfig.baseUrl });

interface ApiError {
  message: string;
}

export const isValidBackendUser = (data: any): data is BackendUser => {
  if (!data || typeof data !== 'object') return false;
  const kycValid = typeof data.kyc === 'object' && data.kyc !== null &&
                   typeof data.kyc.status === 'string' &&
                   ['not_started', 'pending', 'verified', 'rejected', 'skipped'].includes(data.kyc.status);
  return (
    typeof data._id === 'string' && data._id.length > 0 &&
    typeof data.fullName === 'string' &&
    typeof data.email === 'string' && /\S+@\S+\.\S+/.test(data.email) &&
    typeof data.role === 'string' && (data.role === 'user' || data.role === 'admin') &&
    kycValid &&
    typeof data.createdAt === 'string' &&
    typeof data.updatedAt === 'string'
  );
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextState | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const logoutRef = useRef<AuthContextType["logout"]>(() => {});
  const router = useRouter();
  const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0);


  const isAdmin = useMemo(() => user?.role === "admin", [user]);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !broadcastChannelRef.current) {
      try {
        broadcastChannelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      } catch (error) { console.error("AuthContext: Failed to initialize BroadcastChannel:", error); }
    }
    return () => {
      broadcastChannelRef.current?.close();
      broadcastChannelRef.current = null;
    };
  }, []);

  const fetchUnreadInboxCount = useCallback(async () => {
    const currentToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!currentToken) { setUnreadMessageCount(0); return; }
    try {
      const data: UnreadCountResponse = await inboxService.getUnreadCount();
      setUnreadMessageCount(data.unreadCount);
    } catch (error) {
      console.error("AuthContext: Failed to fetch unread message count", error);
      setUnreadMessageCount(0);
    }
  }, []);


  const logout = useCallback((reason: "sessionExpired" | "manual" = "manual", isBroadcastLogout = false) => {
    const wasLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem("token");
    setUser(null); setToken(null); setUnreadMessageCount(0);
    if (typeof window !== 'undefined') { localStorage.removeItem("token"); }
    delete apiClient.defaults.headers.common["Authorization"];
    if (!isBroadcastLogout && broadcastChannelRef.current) {
      try { broadcastChannelRef.current.postMessage("logout"); }
      catch (e) { console.error("AuthContext: BroadcastChannel postMessage error:", e); }
    }
    if (typeof window !== "undefined" && !isBroadcastLogout && wasLoggedIn && !window.location.pathname.startsWith("/auth/login")) {
      let redirectUrl = "/auth/login";
      if (reason === "sessionExpired") redirectUrl += "?sessionExpired=true";
      router.push(redirectUrl);
    }
  }, [router]);

  useEffect(() => { logoutRef.current = logout; }, [logout]);

  const refetchUser = useCallback(async () => {
    let currentToken: string | null = null;
    if (typeof window !== 'undefined') { currentToken = localStorage.getItem("token"); }
    if (!currentToken) {
      if (user !== null) setUser(null); if (token !== null) setToken(null);
      setUnreadMessageCount(0); delete apiClient.defaults.headers.common["Authorization"];
      setLoading(false); return;
    }
    setLoading(true);
    try {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
      const response = await apiClient.get<BackendUser>("/dashboard/users/me");
      if (!isValidBackendUser(response.data)) {
        logoutRef.current("sessionExpired", true);
        throw new Error("Invalid user data structure received during refetch");
      }
      const updatedBackendUser: BackendUser = response.data;
      const userContextData: UserContextState = {
        _id: updatedBackendUser._id, fullName: updatedBackendUser.fullName, email: updatedBackendUser.email,
        role: updatedBackendUser.role, kyc: updatedBackendUser.kyc, isGoogleAccount: updatedBackendUser.isGoogleAccount,
      };
      setUser(userContextData); setToken(currentToken);
      await fetchUnreadInboxCount();
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response?.status === 401 || error.message.includes("Invalid user data")) {
        logoutRef.current("sessionExpired");
      }
    } finally { setLoading(false); }
  }, [user, token, fetchUnreadInboxCount]);

  const login = useCallback(async (backendUser: BackendUser, authToken: string) => {
    if (!isValidBackendUser(backendUser)) {
      logoutRef.current("manual", true); return;
    }
    const userContextData: UserContextState = {
      _id: backendUser._id, fullName: backendUser.fullName, email: backendUser.email,
      role: backendUser.role, kyc: backendUser.kyc, isGoogleAccount: backendUser.isGoogleAccount,
    };
    setUser(userContextData); setToken(authToken);
    if (typeof window !== 'undefined') { localStorage.setItem("token", authToken); }
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    await fetchUnreadInboxCount();
    if (broadcastChannelRef.current) {
      try { broadcastChannelRef.current.postMessage("login"); }
      catch (e) { console.error("AuthContext: BroadcastChannel postMessage error:", e); }
    }
    setLoading(false);
  }, [fetchUnreadInboxCount]);

  const updateAuthUserKyc = useCallback((updatedKycData: Partial<KycDetails>) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const nextKyc: KycDetails = {
        ...currentUser.kyc, ...updatedKycData,
        ...(updatedKycData.mobile && currentUser.kyc?.mobile && {
          mobile: { ...currentUser.kyc.mobile, ...updatedKycData.mobile }
        }),
      };
      if (JSON.stringify(currentUser.kyc) === JSON.stringify(nextKyc)) return currentUser;
      return { ...currentUser, kyc: nextKyc };
    });
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;
    let isActive = true;
    let storedToken: string | null = localStorage.getItem("token");
    const initializeAuth = async () => {
      if (storedToken && isActive) {
        setToken(storedToken);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        try {
          const response = await apiClient.get<BackendUser>("/dashboard/users/me");
          if (!isValidBackendUser(response.data)) {
            throw new Error("Invalid user data structure received during initialization.");
          }
          if (isActive) {
            const fetchedUser: BackendUser = response.data;
            const userContextData: UserContextState = {
              _id: fetchedUser._id, fullName: fetchedUser.fullName, email: fetchedUser.email,
              role: fetchedUser.role, kyc: fetchedUser.kyc, isGoogleAccount: fetchedUser.isGoogleAccount,
            };
            setUser(userContextData);
            await fetchUnreadInboxCount();
          }
        } catch (error: any) {
            const axiosError = error as AxiosError<ApiError>;
            if (isActive) {
                logoutRef.current(axiosError.response?.status === 401 || error.message?.includes("Invalid user data") ? "sessionExpired" : "manual", true);
            }
        } finally { if (isActive) { setLoading(false); } }
      } else {
        if (isActive) {
          setUser(null); setToken(null); setUnreadMessageCount(0); setLoading(false);
        }
      }
    };
    initializeAuth();
    return () => { isActive = false; };
  }, [isMounted, fetchUnreadInboxCount]);

  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        const currentTokenStore = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        const isAuthError = error.response?.status === 401;
        if (isAuthError && currentTokenStore) { logoutRef.current("sessionExpired"); }
        return Promise.reject(error);
      }
    );
    return () => { apiClient.interceptors.response.eject(interceptor); };
  }, []);

  useEffect(() => {
    const channel = broadcastChannelRef.current;
    if (!channel) return;
    const handleBroadcast = async (event: MessageEvent) => {
      const localUserBefore = user; const localTokenBefore = token;
      const storageToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      if (event.data === "logout") {
        if (localUserBefore !== null || localTokenBefore !== null || storageToken) {
          logoutRef.current("manual", true);
        }
      } else if (event.data === "login") {
         if (!storageToken) { logoutRef.current("manual", true); }
         else if (!localTokenBefore || localTokenBefore !== storageToken || !localUserBefore) {
             await refetchUser();
         } else { await fetchUnreadInboxCount(); }
      }
    };
    channel.addEventListener("message", handleBroadcast);
    return () => {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.removeEventListener("message", handleBroadcast);
      }
    };
  }, [user, token, refetchUser, fetchUnreadInboxCount]);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined' || loading) return;

    const currentPath = window.location.pathname;
    const authRelatedRedirectPaths = [
        "/auth/login", "/auth/register", "/auth/forgot-password",
        "/auth/reset-password", "/auth/google/callback-handler",
    ];

    if (user) {
      let targetPath: string;
      if (isAdmin) {
        targetPath = "/admin";
      } else {
        switch (user.kyc?.status) {
          case "not_started": case "rejected": case "skipped": targetPath = "/kyc/start"; break;
          case "pending": targetPath = "/kyc/pending"; break;
          case "verified": targetPath = "/dashboard"; break;
          default: targetPath = "/dashboard";
        }
      }

      if (authRelatedRedirectPaths.some(p => currentPath.startsWith(p))) {
        router.push(targetPath); return;
      }

      if (!isAdmin && user.kyc?.status !== 'verified') {
          // --- MODIFICATION START ---
          const allowedKycPaths = [
            "/kyc/start", "/kyc/pending", "/kyc/rejected", "/kyc/complete", "/kyc/error", // Status pages
            "/kyc/personal", "/kyc/details", "/kyc/identity", "/kyc/upload", "/kyc/review" // Form step pages
          ];
          // --- MODIFICATION END ---
          if (currentPath !== targetPath && !allowedKycPaths.some(p => currentPath.startsWith(p))) {
               router.push(targetPath); return;
          }
      }

      if (!isAdmin && user.kyc?.status === 'verified' && currentPath.startsWith('/kyc') && currentPath !== targetPath) {
        router.push(targetPath); return;
      }

    } else {
      const publicPaths = ["/", ...authRelatedRedirectPaths];
      if (!publicPaths.some(p => currentPath.startsWith(p))) {
        router.push("/auth/login");
      }
    }
  }, [user, loading, router, isMounted, isAdmin]);


  const contextValue: AuthContextType = useMemo(() => ({
    user, token, loading, login, logout: logoutRef.current, isAdmin, refetchUser, updateAuthUserKyc,
    unreadMessageCount, fetchUnreadInboxCount,
  }), [user, token, loading, login, isAdmin, refetchUser, updateAuthUserKyc, unreadMessageCount, fetchUnreadInboxCount]);

  return (
    <AuthContext.Provider value={contextValue}>
      {(!loading && isMounted) ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export type { KycStatus, KycDetails, KycMobile, UserContextState, BackendUser };