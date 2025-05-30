// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";

// // Shadcn UI Components
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label"; // Still needed for custom layout (Mobile Number)
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Form, // *** RESTORED ***
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// // Icons
// import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

// // App specific imports
// import { useKyc } from '../../contexts/KycContext'; // Ensure path is correct
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // Zod schema (remains the same)
// const personalDetailsSchema = z.object({
//     firstName: z.string().min(1, { message: 'First name is required' }),
//     lastName: z.string().min(1, { message: 'Last name is required' }),
//     dateOfBirth: z.date({
//         required_error: "Date of birth is required.",
//         invalid_type_error: "That's not a valid date!",
//     }).max(new Date(), { message: "Date of birth must be in the past" }),
//     mobileCountryCode: z.string().min(1, { message: 'Code is required' }).max(5, { message: 'Too long' }),
//     mobileNumber: z.string().min(5, { message: 'Valid mobile number required' }),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

// export default function KycPersonalPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const { kycData, setKycData, nextStep, goToStep } = useKyc();
//     const [isLoading, setIsLoading] = useState(true);
//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // useForm hook remains the same
//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: { /* ... as before ... */
//             firstName: kycData.firstName || '',
//             lastName: kycData.lastName || '',
//             dateOfBirth: kycData.dateOfBirth ? new Date(kycData.dateOfBirth) : undefined,
//             mobileCountryCode: kycData.mobile?.countryCode || '+1',
//             mobileNumber: kycData.mobile?.number || '',
//         },
//     });

//     // useEffect for fetching details remains the same
//     useEffect(() => {
//         if (authLoading) {
//             setIsLoading(true); return;
//         }
//         const fetchDetails = async () => { /* ... fetch logic as before ... */
//             setIsLoading(true);
//             setFormError(null);
//             try {
//                 const details = await kycService.getMyKycDetails();
//                 const newDefaultValues: Partial<PersonalDetailsFormData> = {};
//                  if (details && details.status !== 'not_started') {
//                     newDefaultValues.firstName = details.firstName || '';
//                     newDefaultValues.lastName = details.lastName || '';
//                     newDefaultValues.dateOfBirth = details.dateOfBirth ? new Date(details.dateOfBirth) : undefined;
//                     newDefaultValues.mobileCountryCode = details.mobile?.countryCode || '+1';
//                     newDefaultValues.mobileNumber = details.mobile?.number || '';
//                     setKycData({ /* ... */ });
//                  } else if (user && user.fullName) {
//                     const nameParts = user.fullName.split(' ');
//                     newDefaultValues.firstName = nameParts[0] || '';
//                     newDefaultValues.lastName = nameParts.slice(1).join(' ') || '';
//                     newDefaultValues.mobileCountryCode = newDefaultValues.mobileCountryCode || '+1';
//                     newDefaultValues.mobileNumber = newDefaultValues.mobileNumber || '';
//                 } else {
//                      newDefaultValues.firstName = newDefaultValues.firstName || '';
//                      newDefaultValues.lastName = newDefaultValues.lastName || '';
//                      newDefaultValues.mobileCountryCode = newDefaultValues.mobileCountryCode || '+1';
//                      newDefaultValues.mobileNumber = newDefaultValues.mobileNumber || '';
//                  }
//                  form.reset(newDefaultValues);
//             } catch (error: any) {
//                 console.error("fetchDetails: Failed:", error);
//                 setFormError(`Could not load details: ${error.message}.`);
//             } finally {
//                 setIsLoading(false);
//             }
//          };
//         fetchDetails();
//         goToStep('personal');
//     }, [authLoading, user, form.reset, setKycData, goToStep]);

//     // Handle Form Submission (Navigation logic fix applied here)
//     const onSubmit = (data: PersonalDetailsFormData) => {
//         let proceedToNext = false;
//         try {
//             setIsSubmitting(true);
//             setFormError(null);
//             console.log("Step 1 Saving Data:", data);
//             setKycData({
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 dateOfBirth: data.dateOfBirth.toISOString(),
//                 mobile: {
//                     countryCode: data.mobileCountryCode,
//                     number: data.mobileNumber,
//                 },
//             });
//             proceedToNext = true;
//         } catch (error) {
//             console.error("Error saving progress:", error);
//             setFormError("Failed to save progress. Please try again.");
//             setIsSubmitting(false); // Set false only on error
//         }

//         if (proceedToNext) {
//             nextStep(); // Navigate via context
//             // If navigation happens, unmounting should handle cleanup.
//             // If for some reason you stayed on the page, you'd need:
//             // setIsSubmitting(false);
//         }
//     };

//     // Handle Skip (remains the same)
//     const handleSkip = async () => { /* ... as before ... */
//          if (!confirm("Are you sure?")) return;
//         setIsSubmitting(true); setFormError(null);
//         try { await kycService.skipKyc(); await refetchUser(); router.push('/dashboard'); }
//         catch (err: any) { setFormError(err.message); setIsSubmitting(false); }
//     };

//     // Loading state render (remains the same)
//     if (isLoading) {
//         return ( <div className="flex justify-center items-center min-h-[300px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Loading...</span></div> );
//     }

//     // Main Form Render
//     return (
//          <Card className="w-full max-w-2xl mx-auto">
//              <CardHeader>
//                 <CardTitle className="text-xl">Personal Details</CardTitle>
//                 <CardDescription>Enter your information exactly as it appears on your government-issued ID.</CardDescription>
//             </CardHeader>
//              <CardContent>
//                  {formError && <p className="mb-4 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{formError}</p>}

//                  {/* *** RESTORED Shadcn <Form> Wrapper *** */}
//                 <Form {...form}>
//                     {/* Pass handleSubmit to the actual form element */}
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         {/* FormFields remain the same */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="Enter first name" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                             <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Enter last name" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                         </div>
//                          <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                                 <FormLabel>Date of Birth</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear()} /></PopoverContent>
//                                 </Popover>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />
//                          <div className="space-y-1">
//                              {/* Use Shadcn FormLabel here too for consistency if desired */}
//                              <Label>Mobile Number</Label>
//                              <div className="flex items-start gap-2">
//                                 <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (<FormItem className="w-1/4 shrink-0"><FormControl><Input placeholder="+1" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                                 <FormField control={form.control} name="mobileNumber" render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input type="tel" placeholder="Enter mobile number" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                             </div>
//                         </div>
//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700 mt-8">
//                             <Button type="button" variant="outline" onClick={handleSkip} disabled={isSubmitting}> Skip for Now </Button>
//                             <Button type="submit" disabled={isSubmitting}> {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Continue </Button>
//                         </div>
//                     </form>
//                  </Form> {/* *** END Shadcn <Form> Wrapper *** */}
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";

// // Shadcn UI Components
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// // Icons
// import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

// // App specific imports
// import { useKyc } from '../../contexts/KycContext'; // Ensure path is correct
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // Zod schema
// const personalDetailsSchema = z.object({
//     firstName: z.string().min(1, { message: 'First name is required' }),
//     lastName: z.string().min(1, { message: 'Last name is required' }),
//     dateOfBirth: z.date({ required_error: "Date of birth is required." /* ... */ }).max(new Date(), { message: "Date of birth must be in the past" }),
//     mobileCountryCode: z.string().min(1, { message: 'Code is required' }).max(5, { message: 'Too long' }),
//     mobileNumber: z.string().min(5, { message: 'Valid mobile number required' }),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

// export default function KycPersonalPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const { kycData, setKycData, nextStep, goToStep } = useKyc(); // nextStep now handles navigation
//     const [isLoading, setIsLoading] = useState(true);
//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: { /* ... */
//              firstName: kycData.firstName || '',
//             lastName: kycData.lastName || '',
//             dateOfBirth: kycData.dateOfBirth ? new Date(kycData.dateOfBirth) : undefined,
//             mobileCountryCode: kycData.mobile?.countryCode || '+1',
//             mobileNumber: kycData.mobile?.number || '',
//         },
//     });

//     // useEffect for fetching details (remains mostly the same)
//     useEffect(() => {
//         if (authLoading) { setIsLoading(true); return; }
//         const fetchDetails = async () => {
//             setIsLoading(true); setFormError(null);
//             try {
//                 const details = await kycService.getMyKycDetails();
//                 const newDefaultValues: Partial<PersonalDetailsFormData> = {};
//                  if (details && details.status !== 'not_started') {
//                     newDefaultValues.firstName = details.firstName || '';
//                     newDefaultValues.lastName = details.lastName || '';
//                     newDefaultValues.dateOfBirth = details.dateOfBirth ? new Date(details.dateOfBirth) : undefined;
//                     newDefaultValues.mobileCountryCode = details.mobile?.countryCode || '+1';
//                     newDefaultValues.mobileNumber = details.mobile?.number || '';
//                     // It's often better to let context be the source of truth,
//                     // but pre-filling context here is okay too if needed elsewhere.
//                     // setKycData({ ... });
//                  } else if (user && user.fullName) {
//                     const nameParts = user.fullName.split(' ');
//                     newDefaultValues.firstName = nameParts[0] || '';
//                     newDefaultValues.lastName = nameParts.slice(1).join(' ') || '';
//                     newDefaultValues.mobileCountryCode = newDefaultValues.mobileCountryCode || '+1';
//                     newDefaultValues.mobileNumber = newDefaultValues.mobileNumber || '';
//                  } else { /* ... set minimal defaults ... */
//                      newDefaultValues.firstName = newDefaultValues.firstName || '';
//                      newDefaultValues.lastName = newDefaultValues.lastName || '';
//                      newDefaultValues.mobileCountryCode = newDefaultValues.mobileCountryCode || '+1';
//                      newDefaultValues.mobileNumber = newDefaultValues.mobileNumber || '';
//                  }
//                  form.reset(newDefaultValues);
//             } catch (error: any) { setFormError(`Could not load details: ${error.message}.`); }
//             finally { setIsLoading(false); }
//          };
//         fetchDetails();
//         // It might be better to set the current step based on the loaded data
//         // or when navigating *to* the page, rather than inside this effect.
//         // For now, keeping it simple:
//         goToStep('personal'); // Set step marker for stepper UI
//     }, [authLoading, user, form.reset, setKycData, goToStep]); // Note: setKycData might cause loops if not careful

//     // *** Simplified onSubmit ***
//     const onSubmit = (data: PersonalDetailsFormData) => {
//         try {
//             setIsSubmitting(true); // Show loading indicator
//             setFormError(null);
//             console.log("Step 1 Saving Data:", data);

//             // Update context state synchronously
//             setKycData({
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 dateOfBirth: data.dateOfBirth.toISOString(),
//                 mobile: {
//                     countryCode: data.mobileCountryCode,
//                     number: data.mobileNumber,
//                 },
//             });

//             // Trigger navigation via context function
//             // This will internally call router.push
//             nextStep();

//             // Let the navigation handle the state. If navigation is successful,
//             // this component unmounts, and isSubmitting state is gone.
//             // If navigation fails, the user stays here, and we need to handle it.
//             // For now, assume navigation works. Consider adding error handling
//             // to nextStep/goToStep if needed.

//         } catch (error) {
//             console.error("Error saving progress:", error);
//             setFormError("Failed to save progress. Please try again.");
//             setIsSubmitting(false); // Reset loading state *only on error*
//         }
//         // No finally block needed here to reset isSubmitting if navigation occurs
//     };

//     // Handle Skip (remains the same)
//     const handleSkip = async () => { /* ... as before ... */
//         if (!confirm("Are you sure?")) return;
//         setIsSubmitting(true); setFormError(null);
//         try { await kycService.skipKyc(); await refetchUser(); router.push('/dashboard'); }
//         catch (err: any) { setFormError(err.message); setIsSubmitting(false); }
//     };

//     // Loading state render
//     if (isLoading) {
//         return ( <div className="flex justify-center items-center min-h-[300px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Loading...</span></div> );
//     }

//     // Main Form Render (Structure remains the same)
//     return (
//          <Card className="w-full max-w-2xl mx-auto">
//              <CardHeader>
//                 <CardTitle className="text-xl">Personal Details</CardTitle>
//                 <CardDescription>Enter your information exactly as it appears on your government-issued ID.</CardDescription>
//             </CardHeader>
//              <CardContent>
//                  {formError && <p className="mb-4 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{formError}</p>}
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                        {/* ... FormFields ... */}
//                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="Enter first name" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Enter last name" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                        </div>
//                        <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                            <FormItem className="flex flex-col">
//                                <FormLabel>Date of Birth</FormLabel>
//                                <Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear()} /></PopoverContent></Popover>
//                                <FormMessage />
//                            </FormItem>
//                        )} />
//                        <div className="space-y-1">
//                            <Label>Mobile Number</Label>
//                            <div className="flex items-start gap-2">
//                                <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (<FormItem className="w-1/4 shrink-0"><FormControl><Input placeholder="+1" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                                <FormField control={form.control} name="mobileNumber" render={({ field }) => (<FormItem className="flex-grow"><FormControl><Input type="tel" placeholder="Enter mobile number" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                            </div>
//                        </div>
//                        {/* Navigation Buttons */}
//                        <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700 mt-8">
//                            <Button type="button" variant="outline" onClick={handleSkip} disabled={isSubmitting}> Skip for Now </Button>
//                            {/* Button type is submit, handled by form's onSubmit */}
//                            <Button type="submit" disabled={isSubmitting}> {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Continue </Button>
//                        </div>
//                     </form>
//                 </Form>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format, subYears, startOfDay } from "date-fns";
// import { cn } from "@/lib/utils";
// // --- Correct v2 Import ---
// import * as countryCodes from 'country-codes-list'; // <-- Use namespace import for v2+

// // Shadcn UI Components
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
// } from "@/components/ui/command";
// import { Check, ChevronsUpDown, Calendar as CalendarIcon, Loader2, User, Phone, AlertTriangle } from 'lucide-react';

// // App specific imports
// import { useKyc } from '../../contexts/KycContext';
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // Zod schema remains the same
// const personalDetailsSchema = z.object({
//     firstName: z.string().trim().min(1, { message: 'First name is required' }),
//     lastName: z.string().trim().min(1, { message: 'Last name is required' }),
//     dateOfBirth: z.date({
//         required_error: "Date of birth is required.",
//         invalid_type_error: "Invalid date!",
//     })
//     .max(startOfDay(subYears(new Date(), 18)), { message: "You must be at least 18 years old" })
//     .min(new Date("1900-01-01"), { message: "Date of birth seems too old" }),
//     mobileCountryCode: z.string().trim().min(1, { message: 'Code is required' }).regex(/^\+\d{1,4}$/, {message: 'Invalid code format (e.g., +1, +44)'}),
//     mobileNumber: z.string().trim().min(5, { message: 'Valid mobile number required' }).regex(/^\d{5,}$/, {message: 'Enter numbers only'}),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

// type CountryCodeOption = {
//     value: string; // e.g., "+1"
//     label: string; // e.g., "United States (+1)" - This will be unique
// };

// export default function KycPersonalPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const {
//         kycData,
//         setKycData,
//         nextStep,
//         updateCurrentUiStepId,
//         isInitialized,
//         resetKycProgress
//      } = useKyc();
//     const [isPageLoading, setIsPageLoading] = useState(true);
//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: {
//             firstName: '', lastName: '', dateOfBirth: undefined,
//             mobileCountryCode: '+1',
//             mobileNumber: '',
//         },
//         mode: 'onChange',
//     });

//     // Prepare Country Code Options using the correct import
//     const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//         // --- Use the imported namespace 'countryCodes' ---
//         const codesObject = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
//         return Object.entries(codesObject)
//             .map(([name, code]) => ({
//                 value: code, // The code itself (e.g., "+1", "+44") - can be duplicate
//                 label: `${name} (${code})`, // Label including name (e.g., "United States (+1)") - should be unique
//             }))
//              // Optional: Filter out entries without a valid code or name if needed (defensive coding)
//             .filter(option => option.value && option.value !== '+' && option.label && option.label.trim() !== `(${option.value})`)
//             .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically by label
//     }, []);

//     // Effect to set the current step in the context
//      useEffect(() => {
//         if (isInitialized && typeof updateCurrentUiStepId === 'function') {
//              updateCurrentUiStepId('personal');
//         } else if (isInitialized) {
//             // console.warn("PersonalPage: KycContext initialized, but updateCurrentUiStepId is not available or not a function.");
//         }
//     }, [isInitialized, updateCurrentUiStepId]);

//     // Effect to load initial/persisted data
//     useEffect(() => {
//         if (!isInitialized || authLoading) {
//             setIsPageLoading(true);
//             return;
//         }
//         setIsPageLoading(true);
//         let initialValues: Partial<PersonalDetailsFormData> = {};

//         if (kycData && Object.keys(kycData).length > 0 && kycData.firstName !== undefined) {
//             initialValues = {
//                 firstName: kycData.firstName || '',
//                 lastName: kycData.lastName || '',
//                 dateOfBirth: kycData.dateOfBirth ? new Date(kycData.dateOfBirth) : undefined,
//                 mobileCountryCode: kycData.mobile?.countryCode || '+1',
//                 mobileNumber: kycData.mobile?.number || '',
//             };
//             if (initialValues.dateOfBirth && isNaN(initialValues.dateOfBirth.getTime())) {
//                  initialValues.dateOfBirth = undefined;
//             }
//         } else if (user && (!initialValues.firstName || !initialValues.lastName)) {
//             const nameParts = user.fullName.trim().split(' ');
//             initialValues.firstName = initialValues.firstName || nameParts[0] || '';
//             initialValues.lastName = initialValues.lastName || nameParts.slice(1).join(' ') || '';
//             initialValues.mobileCountryCode = initialValues.mobileCountryCode || '+1';
//             initialValues.mobileNumber = initialValues.mobileNumber || '';
//             initialValues.dateOfBirth = initialValues.dateOfBirth || undefined;
//         }

//         const defaultCode = initialValues.mobileCountryCode || '+1';
//         if (!countryCodeOptions.some(opt => opt.value === defaultCode)) {
//             initialValues.mobileCountryCode = '+1';
//         } else {
//              initialValues.mobileCountryCode = defaultCode;
//         }

//         form.reset(initialValues);
//         setIsPageLoading(false);

//     }, [isInitialized, authLoading, user, kycData.firstName, kycData.lastName, kycData.dateOfBirth, kycData.mobile, form.reset, countryCodeOptions]);

//     // Handle Form Submission
//     const onSubmit = (data: PersonalDetailsFormData) => {
//         setIsSubmitting(true);
//         setFormError(null);
//         console.log("Step 1 (Personal) Saving Data:", data);
//         try {
//             setKycData({
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 dateOfBirth: data.dateOfBirth.toISOString(),
//                 mobile: {
//                     countryCode: data.mobileCountryCode,
//                     number: data.mobileNumber,
//                 },
//             });
//             nextStep();
//         } catch (error) {
//             console.error("Error saving personal details progress:", error);
//             setFormError("Failed to save progress. Please try again.");
//             setIsSubmitting(false);
//         }
//     };

//     // Handle Skip for Now action
//     const handleSkip = async () => {
//          if (!confirm("Are you sure? Skipping verification will limit account features.")) return;
//         setIsSubmitting(true);
//         setFormError(null);
//         try {
//             console.log("Attempting to skip KYC...");
//             await kycService.skipKyc();
//             await refetchUser();
//             resetKycProgress();
//             router.push('/dashboard');
//         } catch (err: any) {
//             console.error("Error skipping KYC:", err);
//             setFormError(err.message || "Could not skip verification. Please try again.");
//              setIsSubmitting(false);
//         }
//     };

//     if (isPageLoading || authLoading || !isInitialized) {
//         return (
//              <div className="flex justify-center items-center min-h-[300px]">
//                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                  <span className="ml-2 text-muted-foreground">Loading details...</span>
//              </div>
//          );
//     }

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
//                     <User className="h-6 w-6 text-primary" />
//                     Personal Details
//                 </CardTitle>
//                 <CardDescription>Enter your information exactly as it appears on your government-issued ID.</CardDescription>
//             </CardHeader>
//             <CardContent>
//                  {formError && (
//                     <div role="alert" className="mb-4 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/30 flex items-center gap-2">
//                         <AlertTriangle className="h-4 w-4"/> {formError}
//                      </div>
//                   )}

//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         {/* First Name and Last Name */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//                             <FormField control={form.control} name="firstName" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>First Name *</FormLabel>
//                                     <FormControl><Input placeholder="e.g., Jane" {...field} /></FormControl>
//                                     <FormMessage />
//                                 </FormItem>)}
//                             />
//                             <FormField control={form.control} name="lastName" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Last Name *</FormLabel>
//                                     <FormControl><Input placeholder="e.g., Doe" {...field} /></FormControl>
//                                     <FormMessage />
//                                 </FormItem>)}
//                             />
//                         </div>

//                         {/* Date of Birth */}
//                          <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                                 <FormLabel>Date of Birth *</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <FormControl>
//                                             <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
//                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                 {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                                             </Button>
//                                         </FormControl>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0" align="start">
//                                         <Calendar
//                                             mode="single"
//                                             selected={field.value}
//                                             onSelect={(date) => {
//                                                 field.onChange(date);
//                                                 form.trigger("dateOfBirth");
//                                             }}
//                                             disabled={(date) =>
//                                                 date > startOfDay(subYears(new Date(), 18)) || date < new Date("1900-01-01")
//                                             }
//                                             initialFocus
//                                             defaultMonth={field.value || subYears(new Date(), 30)}
//                                             fromYear={1900}
//                                             toYear={new Date().getFullYear() - 18}
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                                 <FormDescription>You must be 18 years or older.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                          )} />

//                         {/* Mobile Number with Combobox for Country Code */}
//                          <div className="space-y-2">
//                              <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number *</FormLabel>
//                              <div className="flex items-start gap-2">
//                                 <FormField
//                                     control={form.control}
//                                     name="mobileCountryCode"
//                                     render={({ field }) => (
//                                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                                         <Popover open={countryCodePopoverOpen} onOpenChange={setCountryCodePopoverOpen}>
//                                             <PopoverTrigger asChild>
//                                                 <FormControl>
//                                                     <Button
//                                                         variant="outline"
//                                                         role="combobox"
//                                                         aria-expanded={countryCodePopoverOpen}
//                                                         className={cn(
//                                                             "w-full justify-between",
//                                                             !field.value && "text-muted-foreground"
//                                                         )}
//                                                     >
//                                                         {field.value
//                                                           ? countryCodeOptions.find(
//                                                               (option) => option.value === field.value
//                                                             )?.value // Display just the code in the button
//                                                           : "Code"}
//                                                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                     </Button>
//                                                 </FormControl>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-[300px] p-0">
//                                                 <Command>
//                                                     <CommandInput placeholder="Search country..." />
//                                                     <CommandList>
//                                                         <CommandEmpty>No country found.</CommandEmpty>
//                                                         <CommandGroup>
//                                                             {countryCodeOptions.map((option) => (
//                                                                 <CommandItem
//                                                                     // --- FIX: Use the unique label as the key ---
//                                                                     key={option.label}
//                                                                     value={option.label} // Search is performed against this label
//                                                                     onSelect={() => {
//                                                                         form.setValue("mobileCountryCode", option.value); // Set the code value
//                                                                         form.trigger("mobileCountryCode");
//                                                                         setCountryCodePopoverOpen(false);
//                                                                     }}
//                                                                 >
//                                                                     <Check
//                                                                         className={cn(
//                                                                             "mr-2 h-4 w-4",
//                                                                             option.value === field.value
//                                                                                 ? "opacity-100" // Still check against the actual value for the checkmark
//                                                                                 : "opacity-0"
//                                                                         )}
//                                                                     />
//                                                                     {option.label} {/* Display the full label in the list */}
//                                                                 </CommandItem>
//                                                             ))}
//                                                         </CommandGroup>
//                                                     </CommandList>
//                                                 </Command>
//                                             </PopoverContent>
//                                         </Popover>
//                                         <FormMessage />
//                                     </FormItem>
//                                     )}
//                                 />
//                                 <FormField control={form.control} name="mobileNumber" render={({ field }) => (
//                                     <FormItem className="flex-grow">
//                                         <FormControl><Input type="tel" inputMode="numeric" placeholder="Enter mobile number" {...field} /></FormControl>
//                                         <FormMessage />
//                                     </FormItem>)}
//                                 />
//                             </div>
//                              <FormDescription>Used for verification and communication.</FormDescription>
//                         </div>
//                          {/* --- End Mobile Number Section --- */}

//                         {/* Navigation Buttons */}
//                         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t dark:border-gray-700 mt-8 gap-4">
//                              {(user?.kycStatus === 'not_started' || user?.kycStatus === 'rejected') ? (
//                                  <Button type="button" variant="ghost" onClick={handleSkip} disabled={isSubmitting} className="text-muted-foreground hover:text-foreground">
//                                      Skip for Now
//                                  </Button>
//                              ) : <div/> }

//                             <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
//                                 {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                                 Continue
//                             </Button>
//                         </div>
//                     </form>
//                  </Form>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format, subYears, startOfDay, isValid as isDateValid, parseISO } from "date-fns";
// import { cn } from "@/lib/utils";
// import * as countryCodes from 'country-codes-list';

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Check, ChevronsUpDown, Calendar as CalendarIcon, Loader2, User, Phone, AlertTriangle, ArrowRight } from 'lucide-react';

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // --- Zod Validation Schema ---
// const personalDetailsSchema = z.object({
//     firstName: z.string().trim().min(1, { message: 'First name is required' }).max(100, { message: 'First name cannot exceed 100 characters' }),
//     lastName: z.string().trim().min(1, { message: 'Last name is required' }).max(100, { message: 'Last name cannot exceed 100 characters' }),
//     dateOfBirth: z.date({ required_error: "Date of birth is required.", invalid_type_error: "Please enter a valid date." })
//         .max(startOfDay(subYears(new Date(), 18)), { message: "You must be at least 18 years old." })
//         .min(new Date("1900-01-01"), { message: "Date of birth seems incorrect (before 1900)." }),
//     mobileCountryCode: z.string().trim().min(2, { message: 'Code required' }).regex(/^\+\d{1,4}$/, {message: 'Invalid format (e.g., +1, +44)'}),
//     mobileNumber: z.string().trim().min(5, { message: 'Minimum 5 digits required' }).max(15, { message: 'Maximum 15 digits allowed' }).regex(/^\d+$/, {message: 'Enter only numbers'}),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
// type CountryCodeOption = { value: string; label: string; };
// const DEFAULT_COUNTRY_CODE = '+1';

// // --- Component ---
// export default function KycPersonalPage() {
//     const router = useRouter();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const {
//         kycData, setKycData, nextStep, updateCurrentUiStepId, goToStep,
//         isInitialized: kycInitialized, backendStatus, resetKycProgress
//      } = useKyc();

//     const [isPageLoading, setIsPageLoading] = useState(true);
//     const [formActionError, setFormActionError] = useState<string | null>(null);
//     const [isSubmittingForm, setIsSubmittingForm] = useState(false);
//     const [isSkipping, setIsSkipping] = useState(false);
//     const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: { firstName: '', lastName: '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' },
//         mode: 'onChange',
//     });

//     const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//         try {
//             const codesObject = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
//             return Object.entries(codesObject)
//                 .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
//                 .filter(option => option.value && option.value !== '+' && option.label && option.label.trim() !== `(${option.value})`)
//                  .sort((a, b) => a.label.localeCompare(b.label));
//         } catch (error) { console.error("Error generating country code list:", error); return [{ value: '+1', label: 'United States (+1)' }]; }
//     }, []);

//     // Effect 1: Set UI step
//     useEffect(() => { if (kycInitialized) updateCurrentUiStepId('personal'); }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Load initial/persisted data
//     useEffect(() => {
//         if (!kycInitialized || authLoading) { setIsPageLoading(true); return; }
//         if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//             setIsPageLoading(false); return;
//         }
//         setIsPageLoading(true);
//         let initialValues: Partial<PersonalDetailsFormData> = {};
//         if (kycData && Object.keys(kycData).length > 0 && (kycData.firstName || kycData.lastName)) {
//             const parsedDate = kycData.dateOfBirth ? parseISO(kycData.dateOfBirth) : undefined;
//             initialValues = { firstName: kycData.firstName || '', lastName: kycData.lastName || '', dateOfBirth: parsedDate && isDateValid(parsedDate) ? parsedDate : undefined, mobileCountryCode: kycData.mobile?.countryCode || DEFAULT_COUNTRY_CODE, mobileNumber: kycData.mobile?.number || '' };
//         } else if (user && backendStatus === 'not_started') {
//             const nameParts = user.fullName?.trim().split(' ') || [];
//             initialValues = { firstName: nameParts[0] || '', lastName: nameParts.slice(1).join(' ') || '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' };
//         } else { initialValues = { firstName: '', lastName: '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' }; }
//         const finalCountryCode = initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
//         initialValues.mobileCountryCode = countryCodeOptions.some(opt => opt.value === finalCountryCode) ? finalCountryCode : DEFAULT_COUNTRY_CODE;
//         form.reset(initialValues);
//         setIsPageLoading(false);
//     }, [kycInitialized, authLoading, user, backendStatus, kycData, form.reset, countryCodeOptions]);

//     // --- Event Handlers ---
//     const onSubmit = (data: PersonalDetailsFormData) => {
//         setIsSubmittingForm(true); setFormActionError(null);
//         try { setKycData({ firstName: data.firstName, lastName: data.lastName, dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"), mobile: { countryCode: data.mobileCountryCode, number: data.mobileNumber } }); nextStep();
//         } catch (error: any) { console.error("PersonalPage: Error saving progress:", error); setFormActionError(error.message || "Failed to save progress."); setIsSubmittingForm(false); }
//     };
//     const handleSkip = async () => {
//          if (!confirm("Are you sure you want to skip identity verification for now? Some account features will be limited.")) return;
//         setIsSkipping(true); setFormActionError(null);
//         try { await kycService.skipKyc(); await refetchUser(); } catch (err: any) { console.error("PersonalPage: Error skipping KYC:", err); setFormActionError(err.message || "Could not skip verification."); setIsSkipping(false); }
//     };

//     // --- Render Logic ---
//     if (isPageLoading || authLoading || !kycInitialized) { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> ); }
//     if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Updating status...</span></div> ); }

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2"><User className="h-6 w-6 text-primary" /> Personal Details (Step {formStepOrder.indexOf('personal') + 1} of {formStepOrder.length})</CardTitle>
//                 <CardDescription>Enter your legal name and date of birth exactly as they appear on your ID. Provide a valid mobile number.</CardDescription>
//             </CardHeader>
//             <CardContent className="p-6 md:p-8">
//                  {formActionError && ( <Alert variant="destructive" className="mb-6"> <AlertTriangle className="h-4 w-4" /> <AlertTitle>Action Failed</AlertTitle> <AlertDescription>{formActionError}</AlertDescription> </Alert> )}
//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         {/* First Name & Last Name Fields */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//                            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Legal First Name *</FormLabel><FormControl><Input placeholder="e.g., Jane" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Legal Last Name *</FormLabel><FormControl><Input placeholder="e.g., Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                         </div>

//                         {/* Date of Birth Field */}
//                         <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                                 <FormLabel>Date of Birth *</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                          {/* ***** FIX: Removed FormControl wrapper ***** */}
//                                         <Button
//                                             variant={"outline"}
//                                             className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
//                                         >
//                                             <CalendarIcon className="mr-2 h-4 w-4" />
//                                             {field.value && isDateValid(field.value) ? format(field.value, "PPP") : <span>Pick a date</span>}
//                                         </Button>
//                                          {/* ***** END FIX ***** */}
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0" align="start">
//                                         <Calendar
//                                             mode="single"
//                                             selected={field.value && isDateValid(field.value) ? field.value : undefined}
//                                             onSelect={(date) => { field.onChange(date || undefined); form.trigger("dateOfBirth"); }}
//                                             disabled={(date) => date > startOfDay(subYears(new Date(), 18)) || date < new Date("1900-01-01")}
//                                             initialFocus
//                                             defaultMonth={field.value && isDateValid(field.value) ? field.value : subYears(new Date(), 30)}
//                                             captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear() - 18}
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                                 <FormDescription>You must be 18 years or older.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         {/* Mobile Number Fields */}
//                         <div className="space-y-2">
//                              <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number *</FormLabel>
//                              <div className="flex items-start gap-2">
//                                 {/* Country Code */}
//                                 <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (
//                                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                                         <Popover open={countryCodePopoverOpen} onOpenChange={setCountryCodePopoverOpen}>
//                                             <PopoverTrigger asChild>
//                                                 {/* ***** FIX: Removed FormControl wrapper ***** */}
//                                                 <Button
//                                                     variant="outline" role="combobox" aria-expanded={countryCodePopoverOpen}
//                                                     className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
//                                                     aria-label="Select country calling code"
//                                                 >
//                                                     {field.value ? field.value : "Code"}
//                                                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                 </Button>
//                                                  {/* ***** END FIX ***** */}
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-[300px] p-0">
//                                                 <Command filter={(value, search) => { const option = countryCodeOptions.find(opt => opt.label.toLowerCase() === value.toLowerCase()); if (!option) return 0; const searchTerm = search.toLowerCase(); const isInLabel = option.label.toLowerCase().includes(searchTerm); const codeSearchTerm = searchTerm.startsWith('+') ? searchTerm : searchTerm.replace(/^\+/, ''); const isInCode = option.value.replace(/^\+/, '').includes(codeSearchTerm); return isInLabel || isInCode ? 1 : 0; }}>
//                                                     <CommandInput placeholder="Search country or code..." />
//                                                     <CommandList><CommandEmpty>No country found.</CommandEmpty><CommandGroup>
//                                                         {countryCodeOptions.map((option) => ( <CommandItem key={option.label} value={option.label} onSelect={(currentValue) => { const selectedOption = countryCodeOptions.find(opt => opt.label === currentValue); if (selectedOption) { form.setValue("mobileCountryCode", selectedOption.value, { shouldValidate: true }); } setCountryCodePopoverOpen(false); }}> <Check className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")} /> {option.label} </CommandItem> ))}
//                                                     </CommandGroup></CommandList>
//                                                 </Command>
//                                             </PopoverContent>
//                                         </Popover>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )} />
//                                 {/* Number Input */}
//                                 <FormField control={form.control} name="mobileNumber" render={({ field }) => (
//                                     <FormItem className="flex-grow">
//                                         {/* FormControl is correct here as Input is the control */}
//                                         <FormControl><Input type="tel" inputMode="numeric" placeholder="Enter number" {...field} /></FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )} />
//                              </div>
//                              <FormDescription>Used for verification and important communications.</FormDescription>
//                         </div>

//                         {/* Navigation Buttons */}
//                         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t dark:border-border/50 mt-8 gap-4">
//                              {(backendStatus === 'not_started' || backendStatus === 'rejected') ? ( // <<<--- CONDITION HERE
//                                  <Button type="button" variant="ghost" onClick={handleSkip} disabled={isSubmittingForm || isSkipping} className="text-muted-foreground hover:text-foreground">
//                                      {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                                      Skip for Now
//                                  </Button>
//                              ) : <div/> /* Placeholder for alignment */}
//                             <Button type="submit" disabled={isSubmittingForm || isSkipping || !form.formState.isValid}>
//                                 {isSubmittingForm ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
//                                 Continue
//                             </Button>
//                         </div>
//                     </form>
//                  </Form>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format, subYears, startOfDay, isValid as isDateValid, parseISO } from "date-fns";
// import { cn } from "@/lib/utils";
// import * as countryCodes from 'country-codes-list';

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Check, ChevronsUpDown, Calendar as CalendarIcon, Loader2, User, Phone, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react'; // Added ArrowLeft

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // --- Zod Validation Schema ---
// const personalDetailsSchema = z.object({
//     firstName: z.string().trim().min(1, { message: 'First name is required' }).max(100, { message: 'First name cannot exceed 100 characters' }),
//     lastName: z.string().trim().min(1, { message: 'Last name is required' }).max(100, { message: 'Last name cannot exceed 100 characters' }),
//     dateOfBirth: z.date({ required_error: "Date of birth is required.", invalid_type_error: "Please enter a valid date." })
//         .max(startOfDay(subYears(new Date(), 18)), { message: "You must be at least 18 years old." })
//         .min(new Date("1900-01-01"), { message: "Date of birth seems incorrect (before 1900)." }),
//     mobileCountryCode: z.string().trim().min(2, { message: 'Code required' }).regex(/^\+\d{1,4}$/, {message: 'Invalid format (e.g., +1, +44)'}),
//     mobileNumber: z.string().trim().min(5, { message: 'Minimum 5 digits required' }).max(15, { message: 'Maximum 15 digits allowed' }).regex(/^\d+$/, {message: 'Enter only numbers'}),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
// type CountryCodeOption = { value: string; label: string; };
// const DEFAULT_COUNTRY_CODE = '+1'; // Default or most common code

// // --- Component ---
// export default function KycPersonalPage() {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const {
//         kycData, setKycData, nextStep, prevStep, // Add prevStep
//         updateCurrentUiStepId, goToStep,
//         isInitialized: kycInitialized, backendStatus,
//         fetchKycStatus, isLoadingStatus: kycLoadingStatus // Get loading status
//      } = useKyc();

//     const [isPageLoading, setIsPageLoading] = useState(true); // Controls local loading state
//     const [formActionError, setFormActionError] = useState<string | null>(null);
//     const [isSubmittingForm, setIsSubmittingForm] = useState(false);
//     const [isSkipping, setIsSkipping] = useState(false); // State for skip button
//     const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: { firstName: '', lastName: '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' },
//         mode: 'onChange',
//     });

//     // Memoize country code options
//     const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//         try {
//             const codesObject = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
//             return Object.entries(codesObject)
//                 .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
//                 .filter(option => option.value && option.value !== '+' && option.label && option.label.trim() !== `(${option.value})`)
//                  .sort((a, b) => a.label.localeCompare(b.label));
//         } catch (error) { console.error("Error generating country code list:", error); return [{ value: '+1', label: 'United States (+1)' }]; }
//     }, []);

//     // Effect 1: Set UI step in context if on the correct page
//     useEffect(() => {
//         if (kycInitialized && pathname === '/kyc/personal') {
//              updateCurrentUiStepId('personal');
//         }
//     }, [kycInitialized, updateCurrentUiStepId, pathname]);

//     // Effect 2: Load initial/persisted data OR pre-fill from user profile
//     useEffect(() => {
//         // Wait for context/auth to be ready
//         if (!kycInitialized || authLoading) {
//             setIsPageLoading(true);
//             return;
//         }

//         // Check if the status allows being on this form page
//         if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//             // If status is pending, verified, etc., rely on context redirection effect
//             // console.log(`PersonalPage: Status is ${backendStatus}, skipping form load. Context should redirect.`);
//             setIsPageLoading(false); // Don't show loading, let context redirect
//             return;
//         }

//         // Proceed with loading form data
//         setIsPageLoading(true);
//         let initialValues: Partial<PersonalDetailsFormData> = {};

//         // Try loading persisted data first (if resuming after rejection/skip with saved progress)
//         const storedData = localStorage.getItem('kycProgressData_v1'); // Using context's key
//         if (storedData && (backendStatus === 'rejected' || backendStatus === 'skipped')) {
//              try {
//                 const parsedData = JSON.parse(storedData);
//                 if (parsedData && typeof parsedData === 'object') {
//                     const parsedDate = parsedData.dateOfBirth ? parseISO(parsedData.dateOfBirth) : undefined;
//                     initialValues = {
//                         firstName: parsedData.firstName || '',
//                         lastName: parsedData.lastName || '',
//                         dateOfBirth: parsedDate && isDateValid(parsedDate) ? parsedDate : undefined,
//                         mobileCountryCode: parsedData.mobile?.countryCode || DEFAULT_COUNTRY_CODE,
//                         mobileNumber: parsedData.mobile?.number || ''
//                     };
//                      console.log("PersonalPage: Loaded persisted data.");
//                 }
//              } catch (e) { console.error("PersonalPage: Failed to parse persisted data", e); }
//         }

//         // If no persisted data OR status is 'not_started', try pre-filling from user profile
//         if (Object.keys(initialValues).length === 0 && user && (backendStatus === 'not_started' || backendStatus === 'skipped')) {
//             const nameParts = user.fullName?.trim().split(' ') || [];
//             initialValues = {
//                 firstName: nameParts[0] || '',
//                 lastName: nameParts.slice(1).join(' ') || '',
//                 dateOfBirth: undefined, // DOB usually not in basic profile
//                 mobileCountryCode: DEFAULT_COUNTRY_CODE, // Use default country code
//                 mobileNumber: '' // Mobile usually not in basic profile or needs confirmation
//             };
//              console.log("PersonalPage: Pre-filled from user profile.");
//         }

//         // Ensure default values if nothing else loaded
//         if (Object.keys(initialValues).length === 0) {
//              initialValues = { firstName: '', lastName: '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' };
//              console.log("PersonalPage: Using default empty values.");
//         }

//         // Validate and set country code
//         const finalCountryCode = initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
//         initialValues.mobileCountryCode = countryCodeOptions.some(opt => opt.value === finalCountryCode) ? finalCountryCode : DEFAULT_COUNTRY_CODE;

//         // Reset the form with the determined initial values
//         form.reset(initialValues);
//         setIsPageLoading(false);

//     }, [kycInitialized, authLoading, user, backendStatus, form.reset, countryCodeOptions]); // Add form.reset and countryCodeOptions

//     // --- Event Handlers ---
//     const onSubmit = (data: PersonalDetailsFormData) => {
//         setIsSubmittingForm(true); setFormActionError(null);
//         try {
//             // Format date correctly before saving to context
//             const formattedDOB = format(data.dateOfBirth, "yyyy-MM-dd");
//             setKycData({
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 dateOfBirth: formattedDOB, // Save as YYYY-MM-DD string
//                 mobile: { countryCode: data.mobileCountryCode, number: data.mobileNumber }
//             });
//              console.log("PersonalPage: Data saved to context. Proceeding to next step.");
//             nextStep(); // Navigate to the next step via context
//         } catch (error: any) {
//             console.error("PersonalPage: Error saving progress:", error);
//             setFormActionError(error.message || "Failed to save progress.");
//              setIsSubmittingForm(false); // Reset submitting state only on error
//         }
//         // Do not reset isSubmittingForm here on success, page navigation will unmount
//     };

//     // Handle Skip (Only available if status is 'not_started')
//     const handleSkip = async () => {
//          if (!confirm("Are you sure you want to skip identity verification for now? Some account features will be limited.")) return;

//          // Double-check status before API call
//          if (backendStatus !== 'not_started') {
//             console.warn(`Attempted to skip KYC when status is '${backendStatus}'. Aborting.`);
//             setFormActionError(`Cannot skip KYC in current status: ${backendStatus}.`);
//             setIsSkipping(false);
//             return;
//          }

//         setIsSkipping(true); setFormActionError(null);
//         try {
//             await kycService.skipKyc();
//             await refetchUser(); // Refetch user data which might include KYC status
//             await fetchKycStatus(true); // Force fetch KYC status to trigger context update/redirect
//             // Context redirection logic should handle moving away (to start page)
//             // Resetting skip state might happen after unmount, which is fine.
//         } catch (err: any) {
//             console.error("PersonalPage: Error skipping KYC:", err);
//             const message = err?.response?.data?.message || err.message || "Could not skip verification.";
//             setFormActionError(message);
//              setIsSkipping(false); // Reset loading state only on error
//         }
//     };

//     // --- Render Logic ---
//     // Show main loading overlay if page is loading data OR context is loading
//     if (isPageLoading || authLoading || !kycInitialized || kycLoadingStatus) {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className='ml-2 text-muted-foreground'>Loading Personal Details...</span>
//             </div>
//         );
//     }

//     // If status is definitively finalized (pending, verified, etc.), show loading while context redirects
//     // Keep showing the form for not_started, rejected, skipped
//     if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//         return (
//             <div className="flex justify-center items-center min-h-[400px]">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <span className="ml-2 text-muted-foreground">Checking status ({backendStatus})...</span>
//             </div>
//         );
//     }

//     // --- Render the Form ---
//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
//                     <User className="h-6 w-6 text-primary" /> Personal Details (Step {formStepOrder.indexOf('personal') + 1} of {formStepOrder.length})
//                  </CardTitle>
//                 <CardDescription>Enter your legal name and date of birth exactly as they appear on your ID. Provide a valid mobile number.</CardDescription>
//             </CardHeader>
//             <CardContent className="p-6 md:p-8">
//                  {formActionError && (
//                      <Alert variant="destructive" className="mb-6">
//                          <AlertTriangle className="h-4 w-4" />
//                          <AlertTitle>Action Failed</AlertTitle>
//                          <AlertDescription>{formActionError}</AlertDescription>
//                      </Alert>
//                  )}
//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                          {/* First Name & Last Name Fields */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//                            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Legal First Name *</FormLabel><FormControl><Input placeholder="e.g., Jane" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Legal Last Name *</FormLabel><FormControl><Input placeholder="e.g., Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                         </div>

//                         {/* Date of Birth Field */}
//                         <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                                 <FormLabel>Date of Birth *</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <FormControl>
//                                             <Button
//                                                 variant={"outline"}
//                                                 className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
//                                             >
//                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                 {field.value && isDateValid(field.value) ? format(field.value, "PPP") : <span>Pick a date</span>}
//                                             </Button>
//                                         </FormControl>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0" align="start">
//                                         <Calendar
//                                             mode="single"
//                                             selected={field.value && isDateValid(field.value) ? field.value : undefined}
//                                             onSelect={(date) => { field.onChange(date || undefined); form.trigger("dateOfBirth"); }} // Trigger validation on change
//                                             disabled={(date) => date > startOfDay(subYears(new Date(), 18)) || date < new Date("1900-01-01")}
//                                             initialFocus
//                                             defaultMonth={field.value && isDateValid(field.value) ? field.value : subYears(new Date(), 30)} // Sensible default view
//                                             captionLayout="dropdown-buttons" fromYear={1900} toYear={new Date().getFullYear() - 18}
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                                 <FormDescription>You must be 18 years or older.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         {/* Mobile Number Fields */}
//                         <div className="space-y-2">
//                              <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number *</FormLabel>
//                              <div className="flex items-start gap-2">
//                                 {/* Country Code */}
//                                 <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (
//                                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                                         <Popover open={countryCodePopoverOpen} onOpenChange={setCountryCodePopoverOpen}>
//                                             <PopoverTrigger asChild>
//                                                 <FormControl>
//                                                     <Button
//                                                         variant="outline" role="combobox" aria-expanded={countryCodePopoverOpen}
//                                                         className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
//                                                         aria-label="Select country calling code"
//                                                     >
//                                                         {field.value ? field.value : "Code"}
//                                                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                     </Button>
//                                                 </FormControl>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-[300px] p-0">
//                                                 <Command filter={(value, search) => { /* Custom filter for label and code */ const option = countryCodeOptions.find(opt => opt.label.toLowerCase() === value.toLowerCase()); if (!option) return 0; const searchTerm = search.toLowerCase(); const isInLabel = option.label.toLowerCase().includes(searchTerm); const codeSearchTerm = searchTerm.startsWith('+') ? searchTerm.slice(1) : searchTerm; const isInCode = option.value.slice(1).includes(codeSearchTerm); return isInLabel || isInCode ? 1 : 0; }}>
//                                                     <CommandInput placeholder="Search country or code..." />
//                                                     <CommandList><CommandEmpty>No country found.</CommandEmpty><CommandGroup>
//                                                         {countryCodeOptions.map((option) => ( <CommandItem key={option.label} value={option.label} onSelect={(currentValue) => { const selectedOption = countryCodeOptions.find(opt => opt.label === currentValue); if (selectedOption) { form.setValue("mobileCountryCode", selectedOption.value, { shouldValidate: true }); } setCountryCodePopoverOpen(false); }}> <Check className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")} /> {option.label} </CommandItem> ))}
//                                                     </CommandGroup></CommandList>
//                                                 </Command>
//                                             </PopoverContent>
//                                         </Popover>
//                                         <FormMessage /> {/* Show validation errors for country code */}
//                                     </FormItem>
//                                 )} />
//                                 {/* Number Input */}
//                                 <FormField control={form.control} name="mobileNumber" render={({ field }) => (
//                                     <FormItem className="flex-grow">
//                                         <FormControl><Input type="tel" inputMode="numeric" placeholder="Enter number" {...field} /></FormControl>
//                                         <FormMessage /> {/* Show validation errors for number */}
//                                     </FormItem>
//                                 )} />
//                              </div>
//                              <FormDescription>Used for verification and important communications.</FormDescription>
//                         </div>

//                         {/* Navigation Buttons */}
//                         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t dark:border-border/50 mt-8 gap-4">
//                              {/* Back Button */}
//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 onClick={prevStep} // Go back using context's prevStep
//                                 disabled={isSubmittingForm || isSkipping}
//                              >
//                                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                              </Button>

//                              {/* Skip Button (Only show if status is 'not_started') */}
//                              {backendStatus === 'not_started' && (
//                                  <Button
//                                      type="button"
//                                      variant="ghost"
//                                      onClick={handleSkip}
//                                      disabled={isSubmittingForm || isSkipping}
//                                      className="text-muted-foreground hover:text-foreground order-first sm:order-none" // Adjust order for mobile
//                                  >
//                                      {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                                      Skip for Now
//                                  </Button>
//                              )}

//                             {/* Continue Button */}
//                             <Button type="submit" disabled={isSubmittingForm || isSkipping || !form.formState.isValid}>
//                                 {isSubmittingForm ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
//                                 Continue
//                             </Button>
//                         </div>
//                     </form>
//                  </Form>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/personal/page.tsx
// 'use client';

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format, subYears, startOfDay, isValid as isDateValid, parseISO } from "date-fns";
// import { cn } from "@/lib/utils";
// import * as countryCodes from 'country-codes-list';

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Check, ChevronsUpDown, Calendar as CalendarIcon, Loader2, User, Phone, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import { useAuth } from '@/app/contexts/AuthContext';
// import kycService from '@/app/services/kyc';

// // --- Zod Validation Schema ---
// const personalDetailsSchema = z.object({
//     firstName: z.string().trim().min(1, { message: 'First name is required' }).max(100, { message: 'First name cannot exceed 100 characters' }),
//     lastName: z.string().trim().min(1, { message: 'Last name is required' }).max(100, { message: 'Last name cannot exceed 100 characters' }),
//     dateOfBirth: z.date({ required_error: "Date of birth is required.", invalid_type_error: "Please enter a valid date." })
//         .max(startOfDay(subYears(new Date(), 18)), { message: "You must be at least 18 years old." })
//         .min(new Date("1900-01-01"), { message: "Date of birth seems incorrect (before 1900)." }),
//     mobileCountryCode: z.string().trim().min(2, { message: 'Code required' }).regex(/^\+\d{1,4}$/, {message: 'Invalid format (e.g., +1, +44)'}),
//     mobileNumber: z.string().trim().min(5, { message: 'Minimum 5 digits required' }).max(15, { message: 'Maximum 15 digits allowed' }).regex(/^\d+$/, {message: 'Enter only numbers'}),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
// type CountryCodeOption = { value: string; label: string; };
// const DEFAULT_COUNTRY_CODE = '+1';

// // --- Component ---
// export default function KycPersonalPage() {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { user, loading: authLoading, refetchUser } = useAuth();
//     const {
//         kycData, setKycData, nextStep, prevStep,
//         updateCurrentUiStepId, goToStep,
//         isInitialized: kycInitialized, backendStatus,
//         fetchKycStatus,
//         isLoadingStatus: kycLoadingStatus
//      } = useKyc();

//     const [isPageLoading, setIsPageLoading] = useState(true);
//     const [formActionError, setFormActionError] = useState<string | null>(null);
//     const [isSubmittingForm, setIsSubmittingForm] = useState(false);
//     const [isSkipping, setIsSkipping] = useState(false);
//     const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//     const form = useForm<PersonalDetailsFormData>({
//         resolver: zodResolver(personalDetailsSchema),
//         defaultValues: { firstName: '', lastName: '', dateOfBirth: undefined, mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '' },
//         mode: 'onChange',
//     });

//     const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//         try {
//             const codesObject = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
//             return Object.entries(codesObject)
//                 .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
//                 .filter(option => option.value && option.value !== '+' && option.label && option.label.trim() !== `(${option.value})`)
//                  .sort((a, b) => a.label.localeCompare(b.label));
//         } catch (error) { console.error("Error generating country code list:", error); return [{ value: '+1', label: 'United States (+1)' }]; }
//     }, []);

//     // Effect 1: Set UI step in context
//     useEffect(() => {
//         if (kycInitialized && pathname === '/kyc/personal') {
//              updateCurrentUiStepId('personal');
//         }
//     }, [kycInitialized, updateCurrentUiStepId, pathname]);

//     // Effect 2: Load initial/persisted data OR pre-fill
//     useEffect(() => {
//         if (!kycInitialized || authLoading) {
//             setIsPageLoading(true); return;
//         }
//         if (!["not_started", "rejected", "skipped", "loading"].includes(backendStatus as string)) {
//              setIsPageLoading(false); return;
//         }

//         setIsPageLoading(true);
//         let initialValues: Partial<PersonalDetailsFormData> = {};
//         const parsedDate = kycData.dateOfBirth ? parseISO(kycData.dateOfBirth) : undefined;
//         initialValues = {
//             firstName: kycData.firstName || '',
//             lastName: kycData.lastName || '',
//             dateOfBirth: parsedDate && isDateValid(parsedDate) ? parsedDate : undefined,
//             mobileCountryCode: kycData.mobile?.countryCode || DEFAULT_COUNTRY_CODE,
//             mobileNumber: kycData.mobile?.number || ''
//         };

//         if (!kycData.firstName && !kycData.lastName && user && (backendStatus === 'not_started' || backendStatus === 'skipped')) {
//             const nameParts = user.fullName?.trim().split(' ') || [];
//             initialValues.firstName = nameParts[0] || '';
//             initialValues.lastName = nameParts.slice(1).join(' ') || '';
//         }

//         const finalCountryCode = initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
//         initialValues.mobileCountryCode = countryCodeOptions.some(opt => opt.value === finalCountryCode) ? finalCountryCode : DEFAULT_COUNTRY_CODE;

//         form.reset(initialValues);
//         setIsPageLoading(false);

//     }, [kycInitialized, authLoading, user, backendStatus, kycData, form.reset, countryCodeOptions]);

//     // --- Event Handlers ---
//     const onSubmit = useCallback((data: PersonalDetailsFormData) => {
//         setIsSubmittingForm(true); setFormActionError(null);
//         try {
//             const formattedDOB = format(data.dateOfBirth, "yyyy-MM-dd");
//             setKycData({
//                 firstName: data.firstName, lastName: data.lastName, dateOfBirth: formattedDOB,
//                 mobile: { countryCode: data.mobileCountryCode, number: data.mobileNumber }
//             });
//             nextStep();
//         } catch (error: any) {
//             setFormActionError(error.message || "Failed to save progress.");
//             setIsSubmittingForm(false);
//         }
//     }, [setKycData, nextStep]); // Removed form.getValues dependency

//     const handleSkip = useCallback(async () => {
//          if (!confirm("Skip identity verification for now? Some features will be limited.")) return;
//          if (backendStatus !== 'not_started') { setFormActionError("Cannot skip now."); return; }

//         setIsSkipping(true); setFormActionError(null);
//         try {
//             await kycService.skipKyc();
//             await refetchUser();
//             await fetchKycStatus(true);
//             router.push('/dashboard');
//         } catch (err: any) {
//             setFormActionError(err?.response?.data?.message || err.message || "Skip failed.");
//             setIsSkipping(false);
//         }
//     }, [backendStatus, refetchUser, fetchKycStatus, router]);

//     // --- Render Logic ---
//     if (isPageLoading || (kycLoadingStatus && !isPageLoading)) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }
//     if (!["not_started", "rejected", "skipped", "loading"].includes(backendStatus as string)) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40 animate-fadeIn">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2"> <User className="h-6 w-6 text-primary" /> Personal Details (Step {formStepOrder.indexOf('personal') + 1} of {formStepOrder.length}) </CardTitle>
//                 <CardDescription>Enter your legal name, date of birth, and mobile number.</CardDescription>
//             </CardHeader>
//             <CardContent className="p-6 md:p-8">
//                  {formActionError && ( <Alert variant="destructive" className="mb-6"> <AlertTriangle className="h-4 w-4" /> <AlertTitle>Action Failed</AlertTitle> <AlertDescription>{formActionError}</AlertDescription> </Alert> )}
//                  <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         {/* First Name & Last Name Fields */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//                            <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Legal First Name *</FormLabel><FormControl><Input placeholder="e.g., Jane" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                            <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Legal Last Name *</FormLabel><FormControl><Input placeholder="e.g., Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
//                         </div>

//                         {/* Date of Birth Field */}
//                         <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
//                             <FormItem className="flex flex-col">
//                                 <FormLabel>Date of Birth *</FormLabel>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         {/* FIX: Removed FormControl wrapper */}
//                                         <Button
//                                             variant={"outline"}
//                                             className={cn("w-full h-12 justify-start text-left font-normal", !field.value && "text-muted-foreground")}
//                                         >
//                                             <CalendarIcon className="mr-2 h-4 w-4" />
//                                             {field.value && isDateValid(field.value) ? format(field.value, "PPP") : <span>Pick a date</span>}
//                                         </Button>
//                                     </PopoverTrigger>
//                                     <PopoverContent align="start" className="sm:w-[450px] max-h-[--radix-popover-content-available-height]">
//                                         <Calendar className='p-0'
//                                             mode="single"
//                                             selected={field.value && isDateValid(field.value) ? field.value : undefined}
//                                             onSelect={(date) => { field.onChange(date || undefined); form.trigger("dateOfBirth"); }}
//                                             disabled={(date) => date > startOfDay(subYears(new Date(), 18)) || date < new Date("1900-01-01")}
//                                             initialFocus
//                                             defaultMonth={field.value && isDateValid(field.value) ? field.value : subYears(new Date(), 30)}
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                                 <FormDescription>You must be 18 years or older.</FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )} />

//                         {/* Mobile Number Fields */}
//                         <div className="space-y-2">
//                              <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Mobile Number *</FormLabel>
//                              <div className="flex items-start gap-2">
//                                 {/* Country Code */}
//                                 <FormField control={form.control} name="mobileCountryCode" render={({ field }) => (
//                                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                                         <Popover open={countryCodePopoverOpen} onOpenChange={setCountryCodePopoverOpen}>
//                                             <PopoverTrigger asChild>
//                                                 {/* FIX: Removed FormControl wrapper */}
//                                                 <Button
//                                                     variant="outline" role="combobox" aria-expanded={countryCodePopoverOpen}
//                                                     className={cn("w-full h-12 justify-between", !field.value && "text-muted-foreground")}
//                                                     aria-label="Select country calling code"
//                                                 >
//                                                     {field.value ? field.value : "Code"}
//                                                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                                 </Button>
//                                             </PopoverTrigger>
//                                             <PopoverContent align="start" className="sm:w-[450px] max-h-[--radix-popover-content-available-height]">
//                                                 <Command filter={(value, search) => {
//                                                     const option = countryCodeOptions.find(opt => opt.label.toLowerCase() === value.toLowerCase());
//                                                     if (!option) return 0;
//                                                     const searchTerm = search.toLowerCase();
//                                                     const isInLabel = option.label.toLowerCase().includes(searchTerm);
//                                                     const codeSearchTerm = searchTerm.startsWith('+') ? searchTerm.slice(1) : searchTerm; const isInCode = option.value.slice(1).includes(codeSearchTerm); return isInLabel || isInCode ? 1 : 0; }}>
//                                                     <CommandInput placeholder="Search country or code..." />
//                                                         <CommandList>
//                                                             <CommandEmpty>No country found.</CommandEmpty>
//                                                             <CommandGroup>
//                                                                 <div className='space-y-1'>
//                                                                     {countryCodeOptions.map((option) => (
//                                                                         <CommandItem
//                                                                             key={option.label}
//                                                                             value={option.label}
//                                                                             onSelect={(currentValue) => {
//                                                                                 const selectedOption = countryCodeOptions.find(opt => opt.label === currentValue);
//                                                                                 if (selectedOption) {
//                                                                                     form.setValue("mobileCountryCode", selectedOption.value, { shouldValidate: true });
//                                                                                 }
//                                                                                 setCountryCodePopoverOpen(false);
//                                                                             }}
//                                                                         >
//                                                                             {option.label}
//                                                                             <Check className={cn("ml-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")} />
//                                                                         </CommandItem>
//                                                                     ))}
//                                                                 </div>
//                                                             </CommandGroup>
//                                                         </CommandList>
//                                                 </Command>
//                                             </PopoverContent>
//                                         </Popover>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )} />
//                                 {/* Number Input */}
//                                 <FormField control={form.control} name="mobileNumber" render={({ field }) => (
//                                     <FormItem className="flex-grow">
//                                         {/* FormControl is correct here as it wraps the actual Input */}
//                                         <FormControl><Input type="tel" inputMode="numeric" placeholder="Enter number" {...field} /></FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )} />
//                              </div>
//                              <FormDescription>Used for verification and communications.</FormDescription>
//                         </div>

//                         {/* Navigation Buttons */}
//                         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t dark:border-border/50 mt-8 gap-4">
//                             <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmittingForm || isSkipping}> <ArrowLeft className="mr-2 h-4 w-4" /> Back </Button>
//                             {backendStatus === 'not_started' && (
//                                 <Button type="button" variant="ghost" onClick={handleSkip} disabled={isSubmittingForm || isSkipping} className="text-muted-foreground hover:text-foreground order-first sm:order-none" > {isSkipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Skip for Now </Button>
//                             )}
//                             <Button type="submit" disabled={isSubmittingForm || isSkipping || !form.formState.isValid}> {isSubmittingForm ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />} Continue </Button>
//                         </div>
//                     </form>
//                  </Form>
//             </CardContent>
//         </Card>
//     );
// }

// // frontend/src/app/kyc/personal/page.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   format,
//   subYears,
//   startOfDay,
//   isValid as isDateValid,
//   parseISO,
// } from "date-fns";
// import { cn } from "@/lib/utils";
// import * as countryCodes from "country-codes-list";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// // --- Import Select components ---
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Check,
//   ChevronsUpDown,
//   Calendar as CalendarIcon,
//   Loader2,
//   User,
//   Phone,
//   AlertTriangle,
//   ArrowRight,
//   ArrowLeft,
// } from "lucide-react";

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from "../../contexts/KycContext";
// import { useAuth } from "@/app/contexts/AuthContext";
// import kycService from "@/app/services/kyc";

// // --- Zod Validation Schema ---
// const personalDetailsSchema = z.object({
//   firstName: z
//     .string()
//     .trim()
//     .min(1, { message: "First name is required" })
//     .max(100, { message: "First name cannot exceed 100 characters" }),
//   lastName: z
//     .string()
//     .trim()
//     .min(1, { message: "Last name is required" })
//     .max(100, { message: "Last name cannot exceed 100 characters" }),
//   dateOfBirth: z
//     .date({
//       required_error: "Date of birth is required.",
//       invalid_type_error: "Please enter a valid date.",
//     })
//     .max(startOfDay(subYears(new Date(), 18)), {
//       message: "You must be at least 18 years old.",
//     })
//     .min(new Date("1900-01-01"), {
//       message: "Date of birth seems incorrect (before 1900).",
//     }),
//   mobileCountryCode: z
//     .string()
//     .trim()
//     .min(2, { message: "Code required" })
//     .regex(/^\+\d{1,4}$/, { message: "Invalid format (e.g., +1, +44)" }),
//   mobileNumber: z
//     .string()
//     .trim()
//     .min(5, { message: "Minimum 5 digits required" })
//     .max(15, { message: "Maximum 15 digits allowed" })
//     .regex(/^\d+$/, { message: "Enter only numbers" }),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
// type CountryCodeOption = { value: string; label: string };
// const DEFAULT_COUNTRY_CODE = "+1";

// // --- Helper Arrays for Date Picker Dropdowns ---
// const datePickerYears = Array.from(
//   { length: 100 },
//   (_, i) => new Date().getFullYear() - i
// ).reverse(); // Last 100 years
// const datePickerMonths = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// // --- Component ---
// export default function KycPersonalPage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, loading: authLoading, refetchUser } = useAuth();
//   const {
//     kycData,
//     setKycData,
//     nextStep,
//     prevStep,
//     updateCurrentUiStepId,
//     goToStep,
//     isInitialized: kycInitialized,
//     backendStatus,
//     fetchKycStatus,
//     isLoadingStatus: kycLoadingStatus,
//   } = useKyc();

//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [formActionError, setFormActionError] = useState<string | null>(null);
//   const [isSubmittingForm, setIsSubmittingForm] = useState(false);
//   const [isSkipping, setIsSkipping] = useState(false);
//   const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//   // --- State for managing the calendar's displayed month/year ---
//   const [calendarDate, setCalendarDate] = useState<Date>(
//     subYears(new Date(), 30)
//   );

//   const form = useForm<PersonalDetailsFormData>({
//     resolver: zodResolver(personalDetailsSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       dateOfBirth: undefined,
//       mobileCountryCode: DEFAULT_COUNTRY_CODE,
//       mobileNumber: "",
//     },
//     mode: "onChange",
//   });

//   const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//     try {
//       const codesObject = countryCodes.customList(
//         "countryNameEn",
//         "+{countryCallingCode}"
//       );
//       return Object.entries(codesObject)
//         .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
//         .filter(
//           (option) =>
//             option.value &&
//             option.value !== "+" &&
//             option.label &&
//             option.label.trim() !== `(${option.value})`
//         )
//         .sort((a, b) => a.label.localeCompare(b.label));
//     } catch (error) {
//       console.error("Error generating country code list:", error);
//       return [{ value: "+1", label: "United States (+1)" }];
//     }
//   }, []);

//   // Effect 1: Set UI step in context
//   useEffect(() => {
//     if (kycInitialized && pathname === "/kyc/personal") {
//       updateCurrentUiStepId("personal");
//     }
//   }, [kycInitialized, updateCurrentUiStepId, pathname]);

//   // Effect 2: Load initial/persisted data OR pre-fill
//   useEffect(() => {
//     if (!kycInitialized || authLoading) {
//       setIsPageLoading(true);
//       return;
//     }
//     if (
//       !["not_started", "rejected", "skipped", "loading"].includes(
//         backendStatus as string
//       )
//     ) {
//       setIsPageLoading(false);
//       return; // Should ideally redirect based on status
//     }

//     setIsPageLoading(true);
//     let initialValues: Partial<PersonalDetailsFormData> = {};
//     const parsedDate = kycData.dateOfBirth
//       ? parseISO(kycData.dateOfBirth)
//       : undefined;
//     const validInitialDate =
//       parsedDate && isDateValid(parsedDate) ? parsedDate : undefined;

//     initialValues = {
//       firstName: kycData.firstName || "",
//       lastName: kycData.lastName || "",
//       dateOfBirth: validInitialDate,
//       mobileCountryCode: kycData.mobile?.countryCode || DEFAULT_COUNTRY_CODE,
//       mobileNumber: kycData.mobile?.number || "",
//     };

//     // Pre-fill name from user profile if empty and starting fresh
//     if (
//       !kycData.firstName &&
//       !kycData.lastName &&
//       user &&
//       (backendStatus === "not_started" || backendStatus === "skipped")
//     ) {
//       const nameParts = user.fullName?.trim().split(" ") || [];
//       initialValues.firstName = nameParts[0] || "";
//       initialValues.lastName = nameParts.slice(1).join(" ") || "";
//     }

//     // Ensure country code is valid
//     const finalCountryCode =
//       initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
//     initialValues.mobileCountryCode = countryCodeOptions.some(
//       (opt) => opt.value === finalCountryCode
//     )
//       ? finalCountryCode
//       : DEFAULT_COUNTRY_CODE;

//     form.reset(initialValues);

//     // Initialize calendar view based on loaded/default date
//     setCalendarDate(validInitialDate || subYears(new Date(), 30));

//     setIsPageLoading(false);
//   }, [
//     kycInitialized,
//     authLoading,
//     user,
//     backendStatus,
//     kycData,
//     form.reset,
//     countryCodeOptions,
//   ]); // Removed setCalendarDate from dependencies

//   // --- Event Handlers ---
//   const onSubmit = useCallback(
//     (data: PersonalDetailsFormData) => {
//       setIsSubmittingForm(true);
//       setFormActionError(null);
//       try {
//         const formattedDOB = format(data.dateOfBirth, "yyyy-MM-dd");
//         setKycData({
//           firstName: data.firstName,
//           lastName: data.lastName,
//           dateOfBirth: formattedDOB,
//           mobile: {
//             countryCode: data.mobileCountryCode,
//             number: data.mobileNumber,
//           },
//         });
//         // Simulate API call if needed here before nextStep()
//         nextStep();
//       } catch (error: any) {
//         setFormActionError(error.message || "Failed to save progress.");
//       } finally {
//         setIsSubmittingForm(false); // Ensure this runs even on success/navigation
//       }
//     },
//     [setKycData, nextStep]
//   );

//   const handleSkip = useCallback(async () => {
//     if (
//       !confirm(
//         "Skip identity verification for now? Some features will be limited."
//       )
//     )
//       return;
//     // Allow skipping even if rejected/skipped previously, to reset status
//     // if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//     //     setFormActionError("Cannot skip at this stage.");
//     //     return;
//     // }

//     setIsSkipping(true);
//     setFormActionError(null);
//     try {
//       await kycService.skipKyc();
//       await refetchUser();
//       await fetchKycStatus(true); // Force fetch new status
//       router.push("/dashboard");
//     } catch (err: any) {
//       setFormActionError(
//         err?.response?.data?.message || err.message || "Skip failed."
//       );
//     } finally {
//       setIsSkipping(false);
//     }
//   }, [/* backendStatus, */ refetchUser, fetchKycStatus, router]); // Removed backendStatus check dependency

//   // --- Date Picker Dropdown Handlers ---
//   const handleYearChange = (year: string) => {
//     const newDate = new Date(calendarDate); // Clone current calendar view date
//     newDate.setFullYear(Number.parseInt(year));
//     // Prevent setting date beyond allowed range if possible, although calendar `disabled` handles selection
//     const maxDate = startOfDay(subYears(new Date(), 18));
//     const minDate = new Date("1900-01-01");
//     if (newDate > maxDate) newDate.setMonth(maxDate.getMonth()); // Adjust month if year makes it invalid
//     if (newDate < minDate) newDate.setMonth(minDate.getMonth()); // Adjust month if year makes it invalid

//     setCalendarDate(newDate); // Update calendar view
//   };

//   const handleMonthChange = (month: string) => {
//     const newDate = new Date(calendarDate); // Clone current calendar view date
//     newDate.setMonth(datePickerMonths.indexOf(month));

//     // Prevent setting date beyond allowed range if possible
//     const maxDate = startOfDay(subYears(new Date(), 18));
//     const minDate = new Date("1900-01-01");
//     if (newDate > maxDate) newDate.setDate(maxDate.getDate()); // Adjust day if month makes it invalid
//     if (newDate < minDate) newDate.setDate(minDate.getDate()); // Adjust day if month makes it invalid

//     setCalendarDate(newDate); // Update calendar view
//   };

//   // --- Render Logic ---
//   if (isPageLoading || (kycLoadingStatus && !isPageLoading)) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }
//   // Redirect or show different UI if KYC status is not one that requires this form
//   if (
//     !["not_started", "rejected", "skipped"].includes(backendStatus as string)
//   ) {
//     // You might want to redirect or show a status message here
//     // For now, just showing loading as a placeholder behavior
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-lg border animate-fadeIn sm:p-8 p-4">
//       <CardHeader className="border-b pb-6 mb-6 space-y-2">
//         <CardTitle className="text-2xl font-semibold tracking-tight flex items-start gap-2 text-mainheading dark:text-white">
//           <User className="h-6 w-6 text-primary mt-1" /> Personal Details (Step&nbsp;
//           {formStepOrder.indexOf("personal") + 1} of {formStepOrder.length})
//         </CardTitle>
//         <CardDescription className="text-gray-500 dark:text-gray-300">
//           Enter your legal name, date of birth, and mobile number.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {formActionError && (
//           <Alert variant="destructive" className="mb-6">
//             {" "}
//             <AlertTriangle className="h-4 w-4" />{" "}
//             <AlertTitle>Action Failed</AlertTitle>{" "}
//             <AlertDescription>{formActionError}</AlertDescription>{" "}
//           </Alert>
//         )}
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* First Name & Last Name Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//               <FormField
//                 control={form.control}
//                 name="firstName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-neutral-900 dark:text-white">Legal First Name *</FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g., Jane" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="lastName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-neutral-900 dark:text-white">Legal Last Name *</FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g., Doe" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Date of Birth Field */}
//             <FormField
//               control={form.control}
//               name="dateOfBirth"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="text-neutral-900 dark:text-white">Date of Birth *</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       {/* Button to trigger the popover */}
//                       <Button
//                         variant={"outline"}
//                         className={cn(
//                           "w-full h-12 justify-start text-left font-normal",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {field.value && isDateValid(field.value) ? (
//                           format(field.value, "PPP")
//                         ) : (
//                           <span>Pick a date</span>
//                         )}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent
//                       align="start"
//                       className="sm:w-[450px] max-h-[--radix-popover-content-available-height]"
//                     >
//                       {/* --- Month/Year Selectors --- */}
//                       <div className="flex items-center justify-between gap-2 p-3 border-b">
//                         <Select
//                           value={datePickerMonths[calendarDate.getMonth()]}
//                           onValueChange={handleMonthChange}
//                         >
//                           <SelectTrigger className="w-36 h-8">
//                             <SelectValue placeholder="Month" />
//                           </SelectTrigger>
//                           <SelectContent className="h-72">
//                             {datePickerMonths.map((month) => (
//                               <SelectItem key={month} value={month}>
//                                 {month}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>

//                         <Select
//                           value={calendarDate.getFullYear().toString()}
//                           onValueChange={handleYearChange}
//                         >
//                           <SelectTrigger className="w-28 h-8">
//                             <SelectValue placeholder="Year" />
//                           </SelectTrigger>
//                           <SelectContent className="h-72">
//                             <div className="space-y-1">
//                               {datePickerYears.map((year) => (
//                                 <SelectItem key={year} value={year.toString()}>
//                                   {year}
//                                 </SelectItem>
//                               ))}
//                             </div>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       {/* --- Calendar Component --- */}
//                       <Calendar
//                         mode="single"
//                         selected={
//                           field.value && isDateValid(field.value)
//                             ? field.value
//                             : undefined
//                         }
//                         onSelect={(date) => {
//                           field.onChange(date || undefined); // Update RHF state
//                           if (date) {
//                             setCalendarDate(date); // Sync calendar view to selected date
//                           }
//                           form.trigger("dateOfBirth"); // Trigger validation
//                         }}
//                         month={calendarDate} // Control displayed month/year
//                         onMonthChange={setCalendarDate} // Sync state when calendar arrows are used
//                         disabled={(date) =>
//                           date > startOfDay(subYears(new Date(), 18)) ||
//                           date < new Date("1900-01-01")
//                         }
//                         initialFocus // Focus calendar when opened
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormDescription className="text-gray-500 dark:text-gray-300">
//                     You must be 18 years or older.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Mobile Number Fields */}
//             <div className="space-y-2">
//               <FormLabel className="flex items-center gap-1.5 text-neutral-900 dark:text-white">
//                 <Phone className="h-4 w-4 text-muted-foreground" /> Mobile
//                 Number *
//               </FormLabel>
//               <div className="flex items-start gap-2">
//                 {/* Country Code */}
//                 <FormField
//                   control={form.control}
//                   name="mobileCountryCode"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                       <Popover
//                         open={countryCodePopoverOpen}
//                         onOpenChange={setCountryCodePopoverOpen}
//                       >
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             role="combobox"
//                             aria-expanded={countryCodePopoverOpen}
//                             className={cn(
//                               "w-full h-12 justify-between",
//                               !field.value && "text-muted-foreground"
//                             )}
//                             aria-label="Select country calling code"
//                           >
//                             {field.value ? field.value : "Code"}
//                             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent
//                           align="start"
//                           className="sm:w-[450px] max-h-[--radix-popover-content-available-height]"
//                         >
//                           <Command
//                             filter={(value, search) => {
//                               const option = countryCodeOptions.find(
//                                 (opt) =>
//                                   opt.label.toLowerCase() ===
//                                   value.toLowerCase()
//                               );
//                               if (!option) return 0;
//                               const searchTerm = search.toLowerCase();
//                               const isInLabel = option.label
//                                 .toLowerCase()
//                                 .includes(searchTerm);
//                               const codeSearchTerm = searchTerm.startsWith("+")
//                                 ? searchTerm.slice(1)
//                                 : searchTerm;
//                               const isInCode = option.value
//                                 .slice(1)
//                                 .includes(codeSearchTerm);
//                               return isInLabel || isInCode ? 1 : 0;
//                             }}
//                           >
//                             <CommandInput placeholder="Search country or code..." />
//                             <CommandList>
//                               <CommandEmpty>No country found.</CommandEmpty>
//                               <CommandGroup>
//                                 <div className="space-y-1">
//                                   {countryCodeOptions.map((option) => (
//                                     <CommandItem
//                                       key={option.label}
//                                       value={option.label}
//                                       onSelect={(currentValue) => {
//                                         const selectedOption =
//                                           countryCodeOptions.find(
//                                             (opt) => opt.label === currentValue
//                                           );
//                                         if (selectedOption) {
//                                           form.setValue(
//                                             "mobileCountryCode",
//                                             selectedOption.value,
//                                             { shouldValidate: true }
//                                           );
//                                         }
//                                         setCountryCodePopoverOpen(false);
//                                       }}
//                                     >
//                                       {option.label}
//                                       <Check
//                                         className={cn(
//                                           "ml-2 h-4 w-4",
//                                           option.value === field.value
//                                             ? "opacity-100"
//                                             : "opacity-0"
//                                         )}
//                                       />
//                                     </CommandItem>
//                                   ))}
//                                 </div>
//                               </CommandGroup>
//                             </CommandList>
//                           </Command>
//                         </PopoverContent>
//                       </Popover>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 {/* Number Input */}
//                 <FormField
//                   control={form.control}
//                   name="mobileNumber"
//                   render={({ field }) => (
//                     <FormItem className="flex-grow">
//                       <FormControl>
//                         <Input
//                           type="tel"
//                           inputMode="numeric"
//                           placeholder="Enter number"
//                           {...field}
//                           className="h-12"
//                         />
//                       </FormControl>
//                       {/* Added h-12 for consistency */}
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <FormDescription className="text-gray-500 dark:text-gray-300">
//                 Used for verification and communications.
//               </FormDescription>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-4">
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//                 onClick={prevStep}
//                 disabled={isSubmittingForm || isSkipping}
//               >

//                 <ArrowLeft className="mr-2 size-4.5" /> Back
//               </button>
//               {/* Show skip button if not started, or if previously rejected/skipped */}
//               {(backendStatus === "not_started" ||
//                 backendStatus === "rejected" ||
//                 backendStatus === "skipped") && (
//                 <button
//                   type="button"
//                   onClick={handleSkip}
//                   disabled={isSubmittingForm || isSkipping}
//                   className="bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-6 py-3 h-12.5 w-full rounded-full transition-all duration-75 ease-linear focus:outline-none"
//                 >

//                   {isSkipping ? (
//                     <Loader2 className="mr-2 size-4.5 animate-spin" />
//                   ) : null}
//                   Skip for Now
//                 </button>
//               )}
//               {/* Continue Button */}
//               <button
//                 type="submit"
//                 className=" inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//                 disabled={
//                   isSubmittingForm || isSkipping || !form.formState.isValid
//                 }
//               >
//                 Continue
//                 {isSubmittingForm ? (
//                   <Loader2 className="ml-2 size-4.5 animate-spin" />
//                 ) : (
//                   <ArrowRight className="ml-2 size-4.5" />
//                 )}

//               </button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }

// // frontend/src/app/kyc/personal/page.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   format,
//   subYears,
//   startOfDay,
//   isValid as isDateValid,
//   parseISO,
// } from "date-fns";
// import { cn } from "@/lib/utils";
// import * as countryCodes from "country-codes-list";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// // --- Import Select components ---
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Check,
//   ChevronsUpDown,
//   Calendar as CalendarIcon,
//   Loader2,
//   User,
//   Phone,
//   AlertTriangle,
//   ArrowRight,
//   ArrowLeft,
// } from "lucide-react";

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from "../../contexts/KycContext";
// import { useAuth } from "@/app/contexts/AuthContext";
// import kycService from "@/app/services/kyc";

// // --- Zod Validation Schema ---
// // NOTE: The schema already defines which fields are required via min(1) or required_error.
// // The form.formState.isValid check will leverage this schema.
// const personalDetailsSchema = z.object({
//   firstName: z
//     .string()
//     .trim()
//     .min(1, { message: "First name is required" })
//     .max(100, { message: "First name cannot exceed 100 characters" }),
//   lastName: z
//     .string()
//     .trim()
//     .min(1, { message: "Last name is required" })
//     .max(100, { message: "Last name cannot exceed 100 characters" }),
//   dateOfBirth: z
//     .date({
//       required_error: "Date of birth is required.",
//       invalid_type_error: "Please enter a valid date.",
//     })
//     .max(startOfDay(subYears(new Date(), 18)), {
//       message: "You must be at least 18 years old.",
//     })
//     .min(new Date("1900-01-01"), {
//       message: "Date of birth seems incorrect (before 1900).",
//     }),
//   mobileCountryCode: z
//     .string()
//     .trim()
//     .min(2, { message: "Code required" }) // Min 2 ensures it's not just "+"
//     .regex(/^\+\d{1,4}$/, { message: "Invalid format (e.g., +1, +44)" }),
//   mobileNumber: z
//     .string()
//     .trim()
//     .min(5, { message: "Minimum 5 digits required" })
//     .max(15, { message: "Maximum 15 digits allowed" })
//     .regex(/^\d+$/, { message: "Enter only numbers" }),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
// type CountryCodeOption = { value: string; label: string };
// const DEFAULT_COUNTRY_CODE = "+1";

// // --- Helper Arrays for Date Picker Dropdowns ---
// const datePickerYears = Array.from(
//   { length: 100 },
//   (_, i) => new Date().getFullYear() - i
// ).reverse(); // Last 100 years
// const datePickerMonths = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// // --- Component ---
// export default function KycPersonalPage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, loading: authLoading, refetchUser } = useAuth();
//   const {
//     kycData,
//     setKycData,
//     nextStep,
//     prevStep,
//     updateCurrentUiStepId,
//     goToStep,
//     isInitialized: kycInitialized,
//     backendStatus,
//     fetchKycStatus,
//     isLoadingStatus: kycLoadingStatus,
//   } = useKyc();

//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [formActionError, setFormActionError] = useState<string | null>(null);
//   const [isSubmittingForm, setIsSubmittingForm] = useState(false);
//   const [isSkipping, setIsSkipping] = useState(false);
//   const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//   // --- State for managing the calendar's displayed month/year ---
//   const [calendarDate, setCalendarDate] = useState<Date>(
//     subYears(new Date(), 30)
//   );

//   const form = useForm<PersonalDetailsFormData>({
//     resolver: zodResolver(personalDetailsSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       dateOfBirth: undefined,
//       mobileCountryCode: DEFAULT_COUNTRY_CODE,
//       mobileNumber: "",
//     },
//     mode: "onChange", // Important: Revalidates on field change
//   });

//   const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//     try {
//       const codesObject = countryCodes.customList(
//         "countryNameEn",
//         "+{countryCallingCode}"
//       );
//       return Object.entries(codesObject)
//         .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
//         .filter(
//           (option) =>
//             option.value &&
//             option.value !== "+" &&
//             option.label &&
//             option.label.trim() !== `(${option.value})`
//         )
//         .sort((a, b) => a.label.localeCompare(b.label));
//     } catch (error) {
//       console.error("Error generating country code list:", error);
//       return [{ value: "+1", label: "United States (+1)" }];
//     }
//   }, []);

//   // Effect 1: Set UI step in context
//   useEffect(() => {
//     if (kycInitialized && pathname === "/kyc/personal") {
//       updateCurrentUiStepId("personal");
//     }
//   }, [kycInitialized, updateCurrentUiStepId, pathname]);

//   // Effect 2: Load initial/persisted data OR pre-fill
//   useEffect(() => {
//     if (!kycInitialized || authLoading) {
//       setIsPageLoading(true);
//       return;
//     }
//     if (
//       !["not_started", "rejected", "skipped", "loading"].includes(
//         backendStatus as string
//       )
//     ) {
//         // Allow loading even if status changes, let the render logic handle redirection/display
//         // If we set loading to false here, it might flicker before the redirect/final UI shows
//         // setIsPageLoading(false);
//         // Instead, rely on the later check in the return statement
//     }

//     setIsPageLoading(true); // Assume loading until data is processed
//     let initialValues: Partial<PersonalDetailsFormData> = {};
//     const parsedDate = kycData.dateOfBirth
//       ? parseISO(kycData.dateOfBirth)
//       : undefined;
//     const validInitialDate =
//       parsedDate && isDateValid(parsedDate) ? parsedDate : undefined;

//     initialValues = {
//       firstName: kycData.firstName || "",
//       lastName: kycData.lastName || "",
//       dateOfBirth: validInitialDate,
//       mobileCountryCode: kycData.mobile?.countryCode || DEFAULT_COUNTRY_CODE,
//       mobileNumber: kycData.mobile?.number || "",
//     };

//     // Pre-fill name from user profile if empty and starting fresh
//     if (
//       !kycData.firstName &&
//       !kycData.lastName &&
//       user &&
//       (backendStatus === "not_started" || backendStatus === "skipped")
//     ) {
//       const nameParts = user.fullName?.trim().split(" ") || [];
//       initialValues.firstName = nameParts[0] || "";
//       initialValues.lastName = nameParts.slice(1).join(" ") || "";
//     }

//     // Ensure country code is valid
//     const finalCountryCode =
//       initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
//     initialValues.mobileCountryCode = countryCodeOptions.some(
//       (opt) => opt.value === finalCountryCode
//     )
//       ? finalCountryCode
//       : DEFAULT_COUNTRY_CODE;

//     form.reset(initialValues);

//     // Initialize calendar view based on loaded/default date
//     setCalendarDate(validInitialDate || subYears(new Date(), 30));

//     setIsPageLoading(false);
//   }, [
//     kycInitialized,
//     authLoading,
//     user,
//     backendStatus,
//     kycData,
//     form.reset, // form is stable, reset is not
//     countryCodeOptions,
//   ]); // Removed setCalendarDate from dependencies

//   // --- Event Handlers ---
//   const onSubmit = useCallback(
//     (data: PersonalDetailsFormData) => {
//       setIsSubmittingForm(true);
//       setFormActionError(null);
//       try {
//         const formattedDOB = format(data.dateOfBirth, "yyyy-MM-dd");
//         setKycData({
//           firstName: data.firstName,
//           lastName: data.lastName,
//           dateOfBirth: formattedDOB,
//           mobile: {
//             countryCode: data.mobileCountryCode,
//             number: data.mobileNumber,
//           },
//         });
//         // Simulate API call if needed here before nextStep()
//         nextStep();
//       } catch (error: any) {
//         console.error("Error during KYC data submission:", error);
//         setFormActionError(
//           error.message || "Failed to save progress. Please try again."
//         );
//         setIsSubmittingForm(false); // Ensure loading state is reset on error
//       }
//       // No finally block needed here as nextStep() navigates away
//       // Resetting isSubmitting might happen too late if navigation is instant
//       // If nextStep() was async and awaited, finally would be appropriate.
//     },
//     [setKycData, nextStep]
//   );

//   const handleSkip = useCallback(async () => {
//     if (
//       !confirm(
//         "Skip identity verification for now? Some features will be limited."
//       )
//     )
//       return;

//     setIsSkipping(true);
//     setFormActionError(null);
//     try {
//       await kycService.skipKyc();
//       await refetchUser(); // Update user context (might have kycSkipped flag)
//       await fetchKycStatus(true); // Force fetch new backend status (should be 'skipped')
//       router.push("/dashboard"); // Navigate away after successful skip
//     } catch (err: any) {
//       console.error("Error skipping KYC:", err);
//       setFormActionError(
//         err?.response?.data?.message || err.message || "Skip failed."
//       );
//       setIsSkipping(false); // Reset loading state only on error
//     }
//   }, [refetchUser, fetchKycStatus, router]);

//   // --- Date Picker Dropdown Handlers ---
//   const handleYearChange = (year: string) => {
//     const newDate = new Date(calendarDate); // Clone current calendar view date
//     newDate.setFullYear(Number.parseInt(year));
//     // Prevent setting date beyond allowed range if possible, although calendar `disabled` handles selection
//     const maxDate = startOfDay(subYears(new Date(), 18));
//     const minDate = new Date("1900-01-01");
//     if (newDate > maxDate) newDate.setMonth(maxDate.getMonth()); // Adjust month if year makes it invalid
//     if (newDate < minDate) newDate.setMonth(minDate.getMonth()); // Adjust month if year makes it invalid

//     setCalendarDate(newDate); // Update calendar view
//   };

//   const handleMonthChange = (month: string) => {
//     const newDate = new Date(calendarDate); // Clone current calendar view date
//     newDate.setMonth(datePickerMonths.indexOf(month));

//     // Prevent setting date beyond allowed range if possible
//     const maxDate = startOfDay(subYears(new Date(), 18));
//     const minDate = new Date("1900-01-01");
//     if (newDate > maxDate) newDate.setDate(maxDate.getDate()); // Adjust day if month makes it invalid
//     if (newDate < minDate) newDate.setDate(minDate.getDate()); // Adjust day if month makes it invalid

//     setCalendarDate(newDate); // Update calendar view
//   };

//   // --- Render Logic ---
//   // Combined loading state check
//   if (isPageLoading || (!kycInitialized && authLoading) || kycLoadingStatus) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   // Redirect or show different UI if KYC status is not one that requires this form
//   // This check happens *after* initial loading is done
//   if (
//     kycInitialized && // Ensure context is ready before checking status
//     !["not_started", "rejected", "skipped"].includes(backendStatus as string)
//   ) {
//     // Example: Redirect to a status page or dashboard
//     console.log(`KYC Status (${backendStatus}) doesn't require this form. Redirecting...`);
//     // router.push('/kyc/status'); // Or '/dashboard'
//     // For now, show a message indicating the state
//      return (
//        <div className="flex justify-center items-center min-h-[400px] text-center">
//          <Card className="p-6">
//            <CardTitle>KYC Status: {backendStatus}</CardTitle>
//            <CardDescription>
//              Personal details cannot be edited at this stage.
//            </CardDescription>
//            <Button onClick={() => router.push('/dashboard')} className="mt-4">Go to Dashboard</Button>
//          </Card>
//        </div>
//      );
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow border animate-fadeIn sm:p-8 p-4">
//       <CardHeader className="border-b pb-6 mb-6 space-y-2">
//         <CardTitle className="sm:text-2xl text-xl font-semibold tracking-tight flex items-start gap-2 text-mainheading dark:text-white">
//           <User className="h-6 w-6 text-primary mt-1 flex-shrink-0" /> Personal Details (Step
//           {formStepOrder.indexOf("personal") + 1} of {formStepOrder.length})
//         </CardTitle>
//         <CardDescription className="text-gray-500 dark:text-gray-300">
//           Enter your legal name, date of birth, and mobile number. Fields marked with <span className="text-red-500">*</span> are required.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {formActionError && (
//           <Alert variant="destructive" className="mb-6">
//             {" "}
//             <AlertTriangle className="h-4 w-4" />{" "}
//             <AlertTitle>Action Failed</AlertTitle>{" "}
//             <AlertDescription>{formActionError}</AlertDescription>{" "}
//           </Alert>
//         )}
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* First Name & Last Name Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//               <FormField
//                 control={form.control}
//                 name="firstName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-neutral-900 dark:text-white">
//                       Legal First Name <span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g., Jane" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="lastName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-neutral-900 dark:text-white">
//                       Legal Last Name <span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g., Doe" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Date of Birth Field */}
//             <FormField
//               control={form.control}
//               name="dateOfBirth"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="text-neutral-900 dark:text-white">
//                     Date of Birth <span className="text-red-500">*</span>
//                   </FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       {/* Button to trigger the popover */}
//                       <Button
//                         variant={"outline"}
//                         className={cn(
//                           "w-full h-12 justify-start text-left font-normal",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {field.value && isDateValid(field.value) ? (
//                           format(field.value, "PPP")
//                         ) : (
//                           <span>Pick a date</span>
//                         )}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent
//                       align="start"
//                       className="sm:w-[450px] max-h-[--radix-popover-content-available-height] p-0" // Adjusted padding
//                     >
//                       {/* --- Month/Year Selectors --- */}
//                       <div className="flex items-center justify-between gap-2 p-3 border-b">
//                         <Select
//                           value={datePickerMonths[calendarDate.getMonth()]}
//                           onValueChange={handleMonthChange}
//                         >
//                           <SelectTrigger className="w-36 h-8">
//                             <SelectValue placeholder="Month" />
//                           </SelectTrigger>
//                           <SelectContent className="h-72">
//                             {datePickerMonths.map((month) => (
//                               <SelectItem key={month} value={month}>
//                                 {month}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>

//                         <Select
//                           value={calendarDate.getFullYear().toString()}
//                           onValueChange={handleYearChange}
//                         >
//                           <SelectTrigger className="w-28 h-8">
//                             <SelectValue placeholder="Year" />
//                           </SelectTrigger>
//                           <SelectContent className="h-72">
//                             {/* Removed extra div for better scrolling */}
//                             {datePickerYears.map((year) => (
//                                 <SelectItem key={year} value={year.toString()}>
//                                   {year}
//                                 </SelectItem>
//                               ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       {/* --- Calendar Component --- */}
//                       <Calendar
//                         mode="single"
//                         selected={
//                           field.value && isDateValid(field.value)
//                             ? field.value
//                             : undefined
//                         }
//                         onSelect={(date) => {
//                           field.onChange(date || undefined); // Update RHF state
//                           if (date) {
//                             setCalendarDate(date); // Sync calendar view to selected date
//                           }
//                           form.trigger("dateOfBirth"); // Trigger validation
//                         }}
//                         month={calendarDate} // Control displayed month/year
//                         onMonthChange={setCalendarDate} // Sync state when calendar arrows are used
//                         disabled={(date) =>
//                           date > startOfDay(subYears(new Date(), 18)) ||
//                           date < new Date("1900-01-01")
//                         }
//                         initialFocus // Focus calendar when opened
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormDescription className="text-gray-500 dark:text-gray-300 pt-1">
//                     You must be 18 years or older.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Mobile Number Fields */}
//             <div className="space-y-2">
//               <FormLabel className="flex items-center gap-1.5 text-neutral-900 dark:text-white">
//                 <Phone className="h-4 w-4 text-muted-foreground" /> Mobile
//                 Number <span className="text-red-500">*</span>
//               </FormLabel>
//               <div className="flex items-start gap-2">
//                 {/* Country Code */}
//                 <FormField
//                   control={form.control}
//                   name="mobileCountryCode"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                       <Popover
//                         open={countryCodePopoverOpen}
//                         onOpenChange={setCountryCodePopoverOpen}
//                       >
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             role="combobox"
//                             aria-expanded={countryCodePopoverOpen}
//                             className={cn(
//                               "w-full h-12 justify-between",
//                               !field.value && "text-muted-foreground"
//                             )}
//                             aria-label="Select country calling code"
//                           >
//                             {field.value
//                               ? field.value
//                               : "Code"}
//                             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent
//                           align="start"
//                           className="sm:w-[450px] max-h-[--radix-popover-content-available-height] p-0" // Removed padding for CommandList
//                         >
//                           <Command
//                             filter={(value, search) => {
//                               // Find the option object by its label (which is the 'value' in CommandItem)
//                                const option = countryCodeOptions.find(opt => opt.label.toLowerCase() === value.toLowerCase());
//                                if (!option) return 0;

//                                const searchTerm = search.toLowerCase().trim();
//                                if (!searchTerm) return 1; // Show all if search is empty

//                                // Check if label contains search term
//                                const isInLabel = option.label.toLowerCase().includes(searchTerm);

//                                // Check if code (without '+') contains search term (if search term is numeric)
//                                const codeWithoutPlus = option.value.slice(1);
//                                const searchTermIsNumeric = /^\d+$/.test(searchTerm);
//                                const searchTermMaybePlusNumeric = /^\+?\d+$/.test(searchTerm);
//                                const numericSearchTerm = searchTerm.replace(/^\+/, ''); // Remove leading + if present

//                                const isInCode = (searchTermIsNumeric || searchTermMaybePlusNumeric) && codeWithoutPlus.includes(numericSearchTerm);

//                               return (isInLabel || isInCode) ? 1 : 0;
//                             }}
//                           >
//                             <CommandInput placeholder="Search country or code..." />
//                             <CommandList>
//                               <CommandEmpty>No country found.</CommandEmpty>
//                               <CommandGroup className="max-h-[250px] overflow-y-auto"> {/* Added scroll */}
//                                 {/* Removed extra div for better structure */}
//                                   {countryCodeOptions.map((option) => (
//                                     <CommandItem
//                                       key={option.label} // Use label as key since it's unique
//                                       value={option.label} // Set value to the label for filtering
//                                       onSelect={(currentValueLabel) => { // currentValue is the label string
//                                         const selectedOption =
//                                           countryCodeOptions.find(
//                                             (opt) => opt.label.toLowerCase() === currentValueLabel.toLowerCase() // Case-insensitive match
//                                           );
//                                         if (selectedOption) {
//                                           form.setValue(
//                                             "mobileCountryCode",
//                                             selectedOption.value,
//                                             { shouldValidate: true }
//                                           );
//                                         } else {
//                                            // Fallback or error handling if needed
//                                            console.warn("Could not find selected country code option:", currentValueLabel);
//                                            form.setValue("mobileCountryCode", DEFAULT_COUNTRY_CODE, { shouldValidate: true }); // Reset to default maybe?
//                                         }
//                                         setCountryCodePopoverOpen(false);
//                                       }}
//                                       className="flex justify-between items-center cursor-pointer" // Ensure proper styling
//                                     >
//                                       <span>{option.label}</span> {/* Display text */}
//                                       <Check
//                                         className={cn(
//                                           "ml-2 h-4 w-4",
//                                           option.value === field.value
//                                             ? "opacity-100"
//                                             : "opacity-0"
//                                         )}
//                                       />
//                                     </CommandItem>
//                                   ))}
//                               </CommandGroup>
//                             </CommandList>
//                           </Command>
//                         </PopoverContent>
//                       </Popover>
//                       <FormMessage /> {/* Sits below the popover trigger */}
//                     </FormItem>
//                   )}
//                 />
//                 {/* Number Input */}
//                 <FormField
//                   control={form.control}
//                   name="mobileNumber"
//                   render={({ field }) => (
//                     <FormItem className="flex-grow">
//                       <FormControl>
//                         <Input
//                           type="tel"
//                           inputMode="numeric"
//                           placeholder="Enter number"
//                           {...field}
//                           className="h-12" // Match height of country code button
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <FormDescription className="text-gray-500 dark:text-gray-300 pt-1">
//                 Used for verification and communications.
//               </FormDescription>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-4">
//               {/* Back Button - Always visible? (Assuming there's always a step before or a way back) */}
//                <button
//                     type="button"
//                     className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={prevStep}
//                     disabled={isSubmittingForm || isSkipping}
//                     aria-label="Go back to previous step"
//                 >
//                     <ArrowLeft className="mr-2 h-4 w-4" /> Back
//                 </button>

//               {/* Skip Button - Conditional */}
//               {(backendStatus === "not_started" ||
//                 backendStatus === "rejected" ||
//                 backendStatus === "skipped") && (
//                 <button
//                   type="button"
//                   onClick={handleSkip}
//                   disabled={isSubmittingForm || isSkipping}
//                   className="bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-6 py-3 h-12.5 w-full rounded-full transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   aria-label="Skip KYC process for now"
//                 >
//                   {isSkipping ? (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   ) : null}
//                   Skip for Now
//                 </button>
//               )}

//               {/* Continue Button */}
//               <button
//                 type="submit"
//                 className="inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={
//                   isSubmittingForm || isSkipping || !form.formState.isValid // Use react-hook-form's validation state
//                 }
//                 aria-label="Continue to next step"
//               >
//                 Continue
//                 {isSubmittingForm ? (
//                   <Loader2 className="ml-2 h-4 w-4 animate-spin" />
//                 ) : (
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 )}
//               </button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }

// // frontend/src/app/kyc/personal/page.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   format,
//   subYears,
//   startOfDay,
//   isValid as isDateValid,
//   parseISO,
// } from "date-fns";
// import { cn } from "@/lib/utils";
// import * as countryCodes from "country-codes-list";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// // --- Import Select components ---
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Check,
//   ChevronsUpDown,
//   Calendar as CalendarIcon,
//   Loader2,
//   User,
//   Phone,
//   AlertTriangle,
//   ArrowRight,
//   ArrowLeft,
// } from "lucide-react";

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from "../../contexts/KycContext";
// import { useAuth } from "@/app/contexts/AuthContext";
// import kycService from "@/app/services/kyc";

// // --- Zod Validation Schema ---
// // NOTE: The schema already defines which fields are required via min(1) or required_error.
// // The form.formState.isValid check will leverage this schema.
// const personalDetailsSchema = z.object({
//   firstName: z
//     .string()
//     .trim()
//     .min(1, { message: "First name is required" })
//     .max(100, { message: "First name cannot exceed 100 characters" }),
//   lastName: z
//     .string()
//     .trim()
//     .min(1, { message: "Last name is required" })
//     .max(100, { message: "Last name cannot exceed 100 characters" }),
//   dateOfBirth: z
//     .date({
//       required_error: "Date of birth is required.",
//       invalid_type_error: "Please enter a valid date.",
//     })
//     .max(startOfDay(subYears(new Date(), 18)), {
//       message: "You must be at least 18 years old.",
//     })
//     .min(new Date("1900-01-01"), {
//       message: "Date of birth seems incorrect (before 1900).",
//     }),
//   mobileCountryCode: z
//     .string()
//     .trim()
//     .min(2, { message: "Code required" }) // Min 2 ensures it's not just "+"
//     .regex(/^\+\d{1,4}$/, { message: "Invalid format (e.g., +1, +44)" }),
//   mobileNumber: z
//     .string()
//     .trim()
//     .min(5, { message: "Minimum 5 digits required" })
//     .max(15, { message: "Maximum 15 digits allowed" })
//     .regex(/^\d+$/, { message: "Enter only numbers" }),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
// type CountryCodeOption = { value: string; label: string };
// const DEFAULT_COUNTRY_CODE = "+1";

// // --- Helper Arrays for Date Picker Dropdowns ---
// const datePickerYears = Array.from(
//   { length: 100 },
//   (_, i) => new Date().getFullYear() - i
// ).reverse(); // Last 100 years
// const datePickerMonths = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// // --- Component ---
// export default function KycPersonalPage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, loading: authLoading, refetchUser } = useAuth();
//   const {
//     kycData,
//     setKycData,
//     nextStep,
//     prevStep,
//     updateCurrentUiStepId,
//     goToStep,
//     isInitialized: kycInitialized,
//     backendStatus,
//     fetchKycStatus,
//     isLoadingStatus: kycLoadingStatus,
//   } = useKyc();

//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [formActionError, setFormActionError] = useState<string | null>(null);
//   const [isSubmittingForm, setIsSubmittingForm] = useState(false);
//   const [isSkipping, setIsSkipping] = useState(false);
//   const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//   // --- State for managing the calendar's displayed month/year ---
//   const [calendarDate, setCalendarDate] = useState<Date>(
//     subYears(new Date(), 30)
//   );

//   const form = useForm<PersonalDetailsFormData>({
//     resolver: zodResolver(personalDetailsSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       dateOfBirth: undefined,
//       mobileCountryCode: DEFAULT_COUNTRY_CODE,
//       mobileNumber: "",
//     },
//     mode: "onChange", // Important: Revalidates on field change
//   });

//   const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//     try {
//       const codesObject = countryCodes.customList(
//         "countryNameEn",
//         "+{countryCallingCode}"
//       );
//       return Object.entries(codesObject)
//         .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
//         .filter(
//           (option) =>
//             option.value &&
//             option.value !== "+" &&
//             option.label &&
//             option.label.trim() !== `(${option.value})`
//         )
//         .sort((a, b) => a.label.localeCompare(b.label));
//     } catch (error) {
//       console.error("Error generating country code list:", error);
//       return [{ value: "+1", label: "United States (+1)" }];
//     }
//   }, []);

//   // Effect 1: Set UI step in context
//   useEffect(() => {
//     if (kycInitialized && pathname === "/kyc/personal") {
//       updateCurrentUiStepId("personal");
//     }
//   }, [kycInitialized, updateCurrentUiStepId, pathname]);

//   // Effect 2: Load initial/persisted data OR pre-fill
//   useEffect(() => {
//     if (!kycInitialized || authLoading) {
//       setIsPageLoading(true);
//       return;
//     }
//     if (
//       !["not_started", "rejected", "skipped", "loading"].includes(
//         backendStatus as string
//       )
//     ) {
//         // Allow loading even if status changes, let the render logic handle redirection/display
//         // If we set loading to false here, it might flicker before the redirect/final UI shows
//         // setIsPageLoading(false);
//         // Instead, rely on the later check in the return statement
//     }

//     setIsPageLoading(true); // Assume loading until data is processed
//     let initialValues: Partial<PersonalDetailsFormData> = {};
//     const parsedDate = kycData.dateOfBirth
//       ? parseISO(kycData.dateOfBirth)
//       : undefined;
//     const validInitialDate =
//       parsedDate && isDateValid(parsedDate) ? parsedDate : undefined;

//     initialValues = {
//       firstName: kycData.firstName || "",
//       lastName: kycData.lastName || "",
//       dateOfBirth: validInitialDate,
//       mobileCountryCode: kycData.mobile?.countryCode || DEFAULT_COUNTRY_CODE,
//       mobileNumber: kycData.mobile?.number || "",
//     };

//     // Pre-fill name from user profile if empty and starting fresh
//     if (
//       !kycData.firstName &&
//       !kycData.lastName &&
//       user &&
//       (backendStatus === "not_started" || backendStatus === "skipped")
//     ) {
//       const nameParts = user.fullName?.trim().split(" ") || [];
//       initialValues.firstName = nameParts[0] || "";
//       initialValues.lastName = nameParts.slice(1).join(" ") || "";
//     }

//     // Ensure country code is valid
//     const finalCountryCode =
//       initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
//     initialValues.mobileCountryCode = countryCodeOptions.some(
//       (opt) => opt.value === finalCountryCode
//     )
//       ? finalCountryCode
//       : DEFAULT_COUNTRY_CODE;

//     form.reset(initialValues);

//     // Initialize calendar view based on loaded/default date
//     setCalendarDate(validInitialDate || subYears(new Date(), 30));

//     setIsPageLoading(false);
//   }, [
//     kycInitialized,
//     authLoading,
//     user,
//     backendStatus,
//     kycData,
//     form.reset, // form is stable, reset is not
//     countryCodeOptions,
//   ]); // Removed setCalendarDate from dependencies

//   // --- Event Handlers ---
//   const onSubmit = useCallback(
//     (data: PersonalDetailsFormData) => {
//       setIsSubmittingForm(true);
//       setFormActionError(null);
//       try {
//         const formattedDOB = format(data.dateOfBirth, "yyyy-MM-dd");
//         setKycData({
//           firstName: data.firstName,
//           lastName: data.lastName,
//           dateOfBirth: formattedDOB,
//           mobile: {
//             countryCode: data.mobileCountryCode,
//             number: data.mobileNumber,
//           },
//         });
//         // Simulate API call if needed here before nextStep()
//         nextStep();
//       } catch (error: any) {
//         console.error("Error during KYC data submission:", error);
//         setFormActionError(
//           error.message || "Failed to save progress. Please try again."
//         );
//         setIsSubmittingForm(false); // Ensure loading state is reset on error
//       }
//       // No finally block needed here as nextStep() navigates away
//       // Resetting isSubmitting might happen too late if navigation is instant
//       // If nextStep() was async and awaited, finally would be appropriate.
//     },
//     [setKycData, nextStep]
//   );

//   const handleSkip = useCallback(async () => {
//     if (
//       !confirm(
//         "Skip identity verification for now? Some features will be limited."
//       )
//     )
//       return;

//     setIsSkipping(true);
//     setFormActionError(null);
//     try {
//       await kycService.skipKyc();
//       await refetchUser(); // Update user context (might have kycSkipped flag)
//       await fetchKycStatus(true); // Force fetch new backend status (should be 'skipped')
//       router.push("/dashboard"); // Navigate away after successful skip
//     } catch (err: any) {
//       console.error("Error skipping KYC:", err);
//       setFormActionError(
//         err?.response?.data?.message || err.message || "Skip failed."
//       );
//       setIsSkipping(false); // Reset loading state only on error
//     }
//   }, [refetchUser, fetchKycStatus, router]);

//   // --- Date Picker Dropdown Handlers ---
//   const handleYearChange = (year: string) => {
//     const newDate = new Date(calendarDate); // Clone current calendar view date
//     newDate.setFullYear(Number.parseInt(year));
//     // Prevent setting date beyond allowed range if possible, although calendar `disabled` handles selection
//     const maxDate = startOfDay(subYears(new Date(), 18));
//     const minDate = new Date("1900-01-01");
//     if (newDate > maxDate) newDate.setMonth(maxDate.getMonth()); // Adjust month if year makes it invalid
//     if (newDate < minDate) newDate.setMonth(minDate.getMonth()); // Adjust month if year makes it invalid

//     setCalendarDate(newDate); // Update calendar view
//   };

//   const handleMonthChange = (month: string) => {
//     const newDate = new Date(calendarDate); // Clone current calendar view date
//     newDate.setMonth(datePickerMonths.indexOf(month));

//     // Prevent setting date beyond allowed range if possible
//     const maxDate = startOfDay(subYears(new Date(), 18));
//     const minDate = new Date("1900-01-01");
//     if (newDate > maxDate) newDate.setDate(maxDate.getDate()); // Adjust day if month makes it invalid
//     if (newDate < minDate) newDate.setDate(minDate.getDate()); // Adjust day if month makes it invalid

//     setCalendarDate(newDate); // Update calendar view
//   };

//   // --- Render Logic ---
//   // Combined loading state check
//   if (isPageLoading || (!kycInitialized && authLoading) || kycLoadingStatus) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   // Redirect or show different UI if KYC status is not one that requires this form
//   // This check happens *after* initial loading is done
//   if (
//     kycInitialized && // Ensure context is ready before checking status
//     !["not_started", "rejected", "skipped"].includes(backendStatus as string)
//   ) {
//     // Example: Redirect to a status page or dashboard
//     console.log(`KYC Status (${backendStatus}) doesn't require this form. Redirecting...`);
//     // router.push('/kyc/status'); // Or '/dashboard'
//     // For now, show a message indicating the state
//      return (
//        <div className="flex justify-center items-center min-h-[400px] text-center">
//          <Card className="p-6">
//            <CardTitle>KYC Status: {backendStatus}</CardTitle>
//            <CardDescription>
//              Personal details cannot be edited at this stage.
//            </CardDescription>
//            <Button onClick={() => router.push('/dashboard')} className="mt-4">Go to Dashboard</Button>
//          </Card>
//        </div>
//      );
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-none border animate-fadeIn sm:p-8 p-4 bg-white dark:bg-background">
//       <CardHeader className="border-b pb-6 mb-6 space-y-2">
//         <CardTitle className="sm:text-2xl text-xl font-semibold tracking-normal flex items-start gap-2 text-mainheading dark:text-white">
//           <User className="h-6 w-6 text-primary mt-1 flex-shrink-0" /> Personal
//           Details (Step
//           {formStepOrder.indexOf("personal") + 1} of {formStepOrder.length})
//         </CardTitle>
//         <CardDescription className="text-gray-500 dark:text-gray-300">
//           Enter your legal name, date of birth, and mobile number. Fields marked
//           with <span className="text-red-500">*</span> are required.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {formActionError && (
//           <Alert className="bg-red-50 dark:bg-red-900/25 border-red-500 rounded-lg p-4 gap-3 mb-6">
//             <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
//               <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//             </div>
//             <div>
//               <AlertTitle className="font-medium tracking-normal text-red-800 dark:text-red-200 text-base">
//                 Action Failed
//               </AlertTitle>{" "}
//               <AlertDescription className="text-red/700 dark:text-red-300/90">
//                 {formActionError}
//               </AlertDescription>{" "}
//             </div>
//           </Alert>
//         )}
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* First Name & Last Name Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//               <FormField
//                 control={form.control}
//                 name="firstName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-neutral-900 dark:text-white">
//                       Legal First Name <span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g., Jane" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="lastName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-neutral-900 dark:text-white">
//                       Legal Last Name <span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g., Doe" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Date of Birth Field */}
//             <FormField
//               control={form.control}
//               name="dateOfBirth"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="text-neutral-900 dark:text-white">
//                     Date of Birth <span className="text-red-500">*</span>
//                   </FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       {/* Button to trigger the popover */}
//                       <Button
//                         variant={"outline"}
//                         className={cn(
//                           "w-full h-12 justify-start text-left font-normal",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {field.value && isDateValid(field.value) ? (
//                           format(field.value, "PPP")
//                         ) : (
//                           <span>Pick a date</span>
//                         )}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent
//                       align="start"
//                       className="sm:w-[450px] max-h-[--radix-popover-content-available-height] p-0" // Adjusted padding
//                     >
//                       {/* --- Month/Year Selectors --- */}
//                       <div className="flex items-center justify-between gap-2 p-3 border-b">
//                         <Select
//                           value={datePickerMonths[calendarDate.getMonth()]}
//                           onValueChange={handleMonthChange}
//                         >
//                           <SelectTrigger className="w-36 h-8">
//                             <SelectValue placeholder="Month" />
//                           </SelectTrigger>
//                           <SelectContent className="h-72">
//                             {datePickerMonths.map((month) => (
//                               <SelectItem key={month} value={month}>
//                                 {month}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>

//                         <Select
//                           value={calendarDate.getFullYear().toString()}
//                           onValueChange={handleYearChange}
//                         >
//                           <SelectTrigger className="w-28 h-8">
//                             <SelectValue placeholder="Year" />
//                           </SelectTrigger>
//                           <SelectContent className="h-72">
//                             {/* Removed extra div for better scrolling */}
//                             {datePickerYears.map((year) => (
//                               <SelectItem key={year} value={year.toString()}>
//                                 {year}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       {/* --- Calendar Component --- */}
//                       <Calendar
//                         mode="single"
//                         selected={
//                           field.value && isDateValid(field.value)
//                             ? field.value
//                             : undefined
//                         }
//                         onSelect={(date) => {
//                           field.onChange(date || undefined); // Update RHF state
//                           if (date) {
//                             setCalendarDate(date); // Sync calendar view to selected date
//                           }
//                           form.trigger("dateOfBirth"); // Trigger validation
//                         }}
//                         month={calendarDate} // Control displayed month/year
//                         onMonthChange={setCalendarDate} // Sync state when calendar arrows are used
//                         disabled={(date) =>
//                           date > startOfDay(subYears(new Date(), 18)) ||
//                           date < new Date("1900-01-01")
//                         }
//                         initialFocus // Focus calendar when opened
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormDescription className="text-gray-500 dark:text-gray-300 pt-1">
//                     You must be 18 years or older.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Mobile Number Fields */}
//             <div className="space-y-2">
//               <FormLabel className="flex items-center gap-1.5 text-neutral-900 dark:text-white">
//                 <Phone className="h-4 w-4 text-muted-foreground" /> Mobile
//                 Number <span className="text-red-500">*</span>
//               </FormLabel>
//               <div className="flex items-start gap-2">
//                 {/* Country Code */}
//                 <FormField
//                   control={form.control}
//                   name="mobileCountryCode"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                       <Popover
//                         open={countryCodePopoverOpen}
//                         onOpenChange={setCountryCodePopoverOpen}
//                       >
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             role="combobox"
//                             aria-expanded={countryCodePopoverOpen}
//                             className={cn(
//                               "w-full h-12 justify-between",
//                               !field.value && "text-muted-foreground"
//                             )}
//                             aria-label="Select country calling code"
//                           >
//                             {field.value ? field.value : "Code"}
//                             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent
//                           align="start"
//                           className="sm:w-[450px] max-h-[--radix-popover-content-available-height] p-0" // Removed padding for CommandList
//                         >
//                           <Command
//                             filter={(value, search) => {
//                               // Find the option object by its label (which is the 'value' in CommandItem)
//                               const option = countryCodeOptions.find(
//                                 (opt) =>
//                                   opt.label.toLowerCase() ===
//                                   value.toLowerCase()
//                               );
//                               if (!option) return 0;

//                               const searchTerm = search.toLowerCase().trim();
//                               if (!searchTerm) return 1; // Show all if search is empty

//                               // Check if label contains search term
//                               const isInLabel = option.label
//                                 .toLowerCase()
//                                 .includes(searchTerm);

//                               // Check if code (without '+') contains search term (if search term is numeric)
//                               const codeWithoutPlus = option.value.slice(1);
//                               const searchTermIsNumeric = /^\d+$/.test(
//                                 searchTerm
//                               );
//                               const searchTermMaybePlusNumeric =
//                                 /^\+?\d+$/.test(searchTerm);
//                               const numericSearchTerm = searchTerm.replace(
//                                 /^\+/,
//                                 ""
//                               ); // Remove leading + if present

//                               const isInCode =
//                                 (searchTermIsNumeric ||
//                                   searchTermMaybePlusNumeric) &&
//                                 codeWithoutPlus.includes(numericSearchTerm);

//                               return isInLabel || isInCode ? 1 : 0;
//                             }}
//                           >
//                             <CommandInput placeholder="Search country or code..." />
//                             <CommandList>
//                               <CommandEmpty>No country found.</CommandEmpty>
//                               <CommandGroup className="max-h-[250px] overflow-y-auto">
//                                 {" "}
//                                 {/* Added scroll */}
//                                 {/* Removed extra div for better structure */}
//                                 {countryCodeOptions.map((option) => (
//                                   <CommandItem
//                                     key={option.label} // Use label as key since it's unique
//                                     value={option.label} // Set value to the label for filtering
//                                     onSelect={(currentValueLabel) => {
//                                       // currentValue is the label string
//                                       const selectedOption =
//                                         countryCodeOptions.find(
//                                           (opt) =>
//                                             opt.label.toLowerCase() ===
//                                             currentValueLabel.toLowerCase() // Case-insensitive match
//                                         );
//                                       if (selectedOption) {
//                                         form.setValue(
//                                           "mobileCountryCode",
//                                           selectedOption.value,
//                                           { shouldValidate: true }
//                                         );
//                                       } else {
//                                         // Fallback or error handling if needed
//                                         console.warn(
//                                           "Could not find selected country code option:",
//                                           currentValueLabel
//                                         );
//                                         form.setValue(
//                                           "mobileCountryCode",
//                                           DEFAULT_COUNTRY_CODE,
//                                           { shouldValidate: true }
//                                         ); // Reset to default maybe?
//                                       }
//                                       setCountryCodePopoverOpen(false);
//                                     }}
//                                     className="flex justify-between items-center cursor-pointer" // Ensure proper styling
//                                   >
//                                     <span>{option.label}</span>{" "}
//                                     {/* Display text */}
//                                     <Check
//                                       className={cn(
//                                         "ml-2 h-4 w-4",
//                                         option.value === field.value
//                                           ? "opacity-100"
//                                           : "opacity-0"
//                                       )}
//                                     />
//                                   </CommandItem>
//                                 ))}
//                               </CommandGroup>
//                             </CommandList>
//                           </Command>
//                         </PopoverContent>
//                       </Popover>
//                       <FormMessage /> {/* Sits below the popover trigger */}
//                     </FormItem>
//                   )}
//                 />
//                 {/* Number Input */}
//                 <FormField
//                   control={form.control}
//                   name="mobileNumber"
//                   render={({ field }) => (
//                     <FormItem className="flex-grow">
//                       <FormControl>
//                         <Input
//                           type="tel"
//                           inputMode="numeric"
//                           placeholder="Enter number"
//                           {...field}
//                           className="h-12" // Match height of country code button
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <FormDescription className="text-gray-500 dark:text-gray-300 pt-1">
//                 Used for verification and communications.
//               </FormDescription>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-4">
//               {/* Back Button - Always visible? (Assuming there's always a step before or a way back) */}
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={prevStep}
//                 disabled={isSubmittingForm || isSkipping}
//                 aria-label="Go back to previous step"
//               >
//                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
//               </button>

//               {/* Skip Button - Conditional */}
//               {(backendStatus === "not_started" ||
//                 backendStatus === "rejected" ||
//                 backendStatus === "skipped") && (
//                 <button
//                   type="button"
//                   onClick={handleSkip}
//                   disabled={isSubmittingForm || isSkipping}
//                   className="bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-6 py-3 h-12.5 w-full rounded-full transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   aria-label="Skip KYC process for now"
//                 >
//                   {isSkipping ? (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   ) : null}
//                   Skip for Now
//                 </button>
//               )}

//               {/* Continue Button */}
//               <button
//                 type="submit"
//                 className="inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={
//                   isSubmittingForm || isSkipping || !form.formState.isValid // Use react-hook-form's validation state
//                 }
//                 aria-label="Continue to next step"
//               >
//                 {isSubmittingForm ? (
//                   // ----- Loading State -----
//                   <>
//                     <svg
//                       className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true" // Hide decorative icon from screen readers
//                     >
//                       <path
//                         d="M12 2V6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M12 18V22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 4.93L7.76 7.76"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 16.24L19.07 19.07"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M2 12H6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M18 12H22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 19.07L7.76 16.24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 7.76L19.07 4.93"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <span>Continue</span>
//                   </>
//                 ) : (
//                   // ----- End Loading State -----
//                   // ----- Normal State -----
//                   <>
//                     <span>Continue</span>
//                     <ArrowRight
//                       className="ml-2 size-5"
//                       aria-hidden="true"
//                     />{" "}
//                     {/* Use ml-2 for margin before the icon */}
//                   </>
//                   // ----- End Normal State -----
//                 )}
//               </button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }

// // last code
// // frontend/src/app/kyc/personal/page.tsx
// "use client";

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   format,
//   subYears,
//   startOfDay,
//   isValid as isDateValid,
//   parseISO,
// } from "date-fns";
// import { cn } from "@/lib/utils";
// import * as countryCodes from "country-codes-list";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// // --- Import Select components ---
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Check,
//   ChevronsUpDown,
//   Calendar as CalendarIcon,
//   Loader2,
//   User,
//   Phone,
//   AlertTriangle,
//   ArrowRight,
//   ArrowLeft,
// } from "lucide-react";

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from "../../contexts/KycContext";
// import { useAuth } from "@/app/contexts/AuthContext";
// import kycService from "@/app/services/kyc";

// // --- Zod Validation Schema ---
// const personalDetailsSchema = z.object({
//   firstName: z
//     .string()
//     .trim()
//     .min(1, { message: "First name is required" })
//     .max(100, { message: "First name cannot exceed 100 characters" }),
//   lastName: z
//     .string()
//     .trim()
//     .min(1, { message: "Last name is required" })
//     .max(100, { message: "Last name cannot exceed 100 characters" }),
//   dateOfBirth: z
//     .date({
//       required_error: "Date of birth is required.",
//       invalid_type_error: "Please enter a valid date.",
//     })
//     .max(startOfDay(subYears(new Date(), 18)), {
//       message: "You must be at least 18 years old.",
//     })
//     .min(new Date("1900-01-01"), {
//       message: "Date of birth seems incorrect (before 1900).",
//     }),
//   mobileCountryCode: z
//     .string()
//     .trim()
//     .min(2, { message: "Code required" })
//     .regex(/^\+\d{1,4}$/, { message: "Invalid format (e.g., +1, +44)" }),
//   mobileNumber: z
//     .string()
//     .trim()
//     .min(5, { message: "Minimum 5 digits required" })
//     .max(15, { message: "Maximum 15 digits allowed" })
//     .regex(/^\d+$/, { message: "Enter only numbers" }),
// });

// type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
// type CountryCodeOption = { value: string; label: string };
// const DEFAULT_COUNTRY_CODE = "+1";

// // --- Helper Arrays for Date Picker Dropdowns ---
// const datePickerYears = Array.from(
//   { length: 100 },
//   (_, i) => new Date().getFullYear() - i
// ).reverse();
// const datePickerMonths = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// // --- Component ---
// export default function KycPersonalPage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, loading: authLoading, refetchUser } = useAuth();
//   const {
//     kycData,
//     setKycData,
//     nextStep,
//     prevStep,
//     updateCurrentUiStepId,
//     // goToStep, // Not used in this component
//     isInitialized: kycInitialized,
//     backendStatus,
//     fetchKycStatus,
//     isLoadingStatus: kycLoadingStatus,
//   } = useKyc();

//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [formActionError, setFormActionError] = useState<string | null>(null);
//   const [isSubmittingForm, setIsSubmittingForm] = useState(false);
//   const [isSkipping, setIsSkipping] = useState(false);
//   const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);

//   // --- State for managing the calendar's displayed month/year ---
//   const [calendarDate, setCalendarDate] = useState<Date>(
//     subYears(new Date(), 30)
//   );

//   // --- State for Date of Birth Popover and temporary date ---
//   const [dateOfBirthPickerOpen, setDateOfBirthPickerOpen] = useState(false);
//   const [tempDateOfBirth, setTempDateOfBirth] = useState<Date | undefined>(
//     undefined
//   );

//   const form = useForm<PersonalDetailsFormData>({
//     resolver: zodResolver(personalDetailsSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       dateOfBirth: undefined,
//       mobileCountryCode: DEFAULT_COUNTRY_CODE,
//       mobileNumber: "",
//     },
//     mode: "onChange",
//   });

//   const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
//     try {
//       const codesObject = countryCodes.customList(
//         "countryNameEn",
//         "+{countryCallingCode}"
//       );
//       return Object.entries(codesObject)
//         .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
//         .filter(
//           (option) =>
//             option.value &&
//             option.value !== "+" &&
//             option.label &&
//             option.label.trim() !== `(${option.value})`
//         )
//         .sort((a, b) => a.label.localeCompare(b.label));
//     } catch (error) {
//       console.error("Error generating country code list:", error);
//       return [{ value: "+1", label: "United States (+1)" }];
//     }
//   }, []);

//   // Effect 1: Set UI step in context
//   useEffect(() => {
//     if (kycInitialized && pathname === "/kyc/personal") {
//       updateCurrentUiStepId("personal");
//     }
//   }, [kycInitialized, updateCurrentUiStepId, pathname]);

//   // Effect 2: Load initial/persisted data OR pre-fill
//   useEffect(() => {
//     if (!kycInitialized || authLoading) {
//       setIsPageLoading(true);
//       return;
//     }
//     // No automatic setIsPageLoading(false) here; let it complete data processing

//     setIsPageLoading(true);
//     let initialValues: Partial<PersonalDetailsFormData> = {};
//     const parsedDate = kycData.dateOfBirth
//       ? parseISO(kycData.dateOfBirth)
//       : undefined;
//     const validInitialDate =
//       parsedDate && isDateValid(parsedDate) ? parsedDate : undefined;

//     initialValues = {
//       firstName: kycData.firstName || "",
//       lastName: kycData.lastName || "",
//       dateOfBirth: validInitialDate,
//       mobileCountryCode: kycData.mobile?.countryCode || DEFAULT_COUNTRY_CODE,
//       mobileNumber: kycData.mobile?.number || "",
//     };

//     if (
//       !kycData.firstName &&
//       !kycData.lastName &&
//       user &&
//       (backendStatus === "not_started" || backendStatus === "skipped")
//     ) {
//       const nameParts = user.fullName?.trim().split(" ") || [];
//       initialValues.firstName = nameParts[0] || "";
//       initialValues.lastName = nameParts.slice(1).join(" ") || "";
//     }

//     const finalCountryCode =
//       initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
//     initialValues.mobileCountryCode = countryCodeOptions.some(
//       (opt) => opt.value === finalCountryCode
//     )
//       ? finalCountryCode
//       : DEFAULT_COUNTRY_CODE;

//     form.reset(initialValues);

//     setCalendarDate(validInitialDate || subYears(new Date(), 30));
//     setTempDateOfBirth(validInitialDate); // Initialize temporary date

//     setIsPageLoading(false);
//   }, [
//     kycInitialized,
//     authLoading,
//     user,
//     backendStatus,
//     kycData,
//     form.reset,
//     countryCodeOptions,
//   ]);

//   const onSubmit = useCallback(
//     (data: PersonalDetailsFormData) => {
//       setIsSubmittingForm(true);
//       setFormActionError(null);
//       try {
//         const formattedDOB = format(data.dateOfBirth, "yyyy-MM-dd");
//         setKycData({
//           firstName: data.firstName,
//           lastName: data.lastName,
//           dateOfBirth: formattedDOB,
//           mobile: {
//             countryCode: data.mobileCountryCode,
//             number: data.mobileNumber,
//           },
//         });
//         nextStep();
//       } catch (error: any) {
//         console.error("Error during KYC data submission:", error);
//         setFormActionError(
//           error.message || "Failed to save progress. Please try again."
//         );
//         setIsSubmittingForm(false);
//       }
//     },
//     [setKycData, nextStep]
//   );

//   const handleSkip = useCallback(async () => {
//     if (
//       !confirm(
//         "Skip identity verification for now? Some features will be limited."
//       )
//     )
//       return;

//     setIsSkipping(true);
//     setFormActionError(null);
//     try {
//       await kycService.skipKyc();
//       await refetchUser();
//       await fetchKycStatus(true);
//       router.push("/dashboard");
//     } catch (err: any) {
//       console.error("Error skipping KYC:", err);
//       setFormActionError(
//         err?.response?.data?.message || err.message || "Skip failed."
//       );
//       setIsSkipping(false);
//     }
//   }, [refetchUser, fetchKycStatus, router]);

//   const handleYearChange = (year: string) => {
//     const newDate = new Date(calendarDate);
//     newDate.setFullYear(Number.parseInt(year));
//     const maxDate = startOfDay(subYears(new Date(), 18));
//     const minDate = new Date("1900-01-01");
//     if (newDate > maxDate) newDate.setMonth(maxDate.getMonth());
//     if (newDate < minDate) newDate.setMonth(minDate.getMonth());
//     setCalendarDate(newDate);
//   };

//   const handleMonthChange = (month: string) => {
//     const newDate = new Date(calendarDate);
//     newDate.setMonth(datePickerMonths.indexOf(month));
//     const maxDate = startOfDay(subYears(new Date(), 18));
//     const minDate = new Date("1900-01-01");
//     if (newDate > maxDate) newDate.setDate(maxDate.getDate());
//     if (newDate < minDate) newDate.setDate(minDate.getDate());
//     setCalendarDate(newDate);
//   };

//   if (isPageLoading || (!kycInitialized && authLoading) || kycLoadingStatus) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (
//     kycInitialized &&
//     !["not_started", "rejected", "skipped"].includes(backendStatus as string)
//   ) {
//      return (
//        <div className="flex justify-center items-center min-h-[400px] text-center">
//          <Card className="p-6">
//            <CardTitle>KYC Status: {backendStatus}</CardTitle>
//            <CardDescription>
//              Personal details cannot be edited at this stage.
//            </CardDescription>
//            <Button onClick={() => router.push('/dashboard')} className="mt-4">Go to Dashboard</Button>
//          </Card>
//        </div>
//      );
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-none border animate-fadeIn sm:p-8 p-4 bg-white dark:bg-background">
//       <CardHeader className="border-b pb-6 mb-6 space-y-2">
//         <CardTitle className="sm:text-2xl text-xl font-semibold tracking-normal flex items-start gap-2 text-mainheading dark:text-white">
//           <User className="h-6 w-6 text-primary mt-1 flex-shrink-0" /> Personal
//           Details (Step
//           {formStepOrder.indexOf("personal") + 1} of {formStepOrder.length})
//         </CardTitle>
//         <CardDescription className="text-gray-500 dark:text-gray-300">
//           Enter your legal name, date of birth, and mobile number. Fields marked
//           with <span className="text-red-500">*</span> are required.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {formActionError && (
//           <Alert className="bg-red-50 dark:bg-red-900/25 border-red-500 rounded-lg p-4 gap-3 mb-6">
//             <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
//               <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//             </div>
//             <div>
//               <AlertTitle className="font-medium tracking-normal text-red-800 dark:text-red-200 text-base">
//                 Action Failed
//               </AlertTitle>
//               <AlertDescription className="text-red-700 dark:text-red-300/90"> {/* Corrected typo */}
//                 {formActionError}
//               </AlertDescription>
//             </div>
//           </Alert>
//         )}
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="firstName"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col">
//                     <FormLabel className="text-neutral-900 dark:text-white">
//                       Legal First Name <span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g., Jane" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="lastName"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col">
//                     <FormLabel className="text-neutral-900 dark:text-white">
//                       Legal Last Name <span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g., Doe" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="dateOfBirth"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="text-neutral-900 dark:text-white">
//                     Date of Birth <span className="text-red-500">*</span>
//                   </FormLabel>
//                   <Popover
//                     open={dateOfBirthPickerOpen}
//                     onOpenChange={(isOpen) => {
//                       setDateOfBirthPickerOpen(isOpen);
//                       if (isOpen) {
//                         setTempDateOfBirth(field.value);
//                         if (field.value && isDateValid(field.value)) {
//                           setCalendarDate(field.value);
//                         }
//                       }
//                     }}
//                   >
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant={"outline"}
//                         className={cn(
//                           "w-full h-12 justify-start text-left font-normal",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {field.value && isDateValid(field.value) ? (
//                           format(field.value, "PPP")
//                         ) : (
//                           <span>Pick a date</span>
//                         )}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent
//                       align="start"
//                       className="sm:w-[450px] max-h-[calc(var(--radix-popover-content-available-height)_-_1rem)] w-auto p-0 overflow-y-auto"
//                     >
//                       <div className="flex items-center justify-between gap-2 p-3 border-b">
//                         <Select
//                           value={datePickerMonths[calendarDate.getMonth()]}
//                           onValueChange={handleMonthChange}
//                         >
//                           <SelectTrigger className="w-36 h-8">
//                             <SelectValue placeholder="Month" />
//                           </SelectTrigger>
//                           <SelectContent className="h-72">
//                             {datePickerMonths.map((month) => (
//                               <SelectItem key={month} value={month}>
//                                 {month}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>

//                         <Select
//                           value={calendarDate.getFullYear().toString()}
//                           onValueChange={handleYearChange}
//                         >
//                           <SelectTrigger className="w-28 h-8">
//                             <SelectValue placeholder="Year" />
//                           </SelectTrigger>
//                           <SelectContent className="h-72">
//                             {datePickerYears.map((year) => (
//                               <SelectItem key={year} value={year.toString()}>
//                                 {year}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <Calendar
//                         mode="single"
//                         selected={
//                           tempDateOfBirth && isDateValid(tempDateOfBirth)
//                             ? tempDateOfBirth
//                             : undefined
//                         }
//                         onSelect={(date) => {
//                           const newSelectedDate = date || undefined;
//                           setTempDateOfBirth(newSelectedDate);
//                           if (newSelectedDate) {
//                             setCalendarDate(newSelectedDate);
//                           }
//                         }}
//                         month={calendarDate}
//                         onMonthChange={setCalendarDate}
//                         disabled={(date) =>
//                           date > startOfDay(subYears(new Date(), 18)) ||
//                           date < new Date("1900-01-01")
//                         }
//                         initialFocus
//                       />
//                       <div className="p-3 border-t">
//                         <Button
//                             type="button"
//                             className="w-full bg-primary hover:bg-primaryhover text-neutral-900 rounded-full"
//                             onClick={() => {
//                                 field.onChange(tempDateOfBirth);
//                                 form.trigger("dateOfBirth");
//                                 setDateOfBirthPickerOpen(false);
//                             }}
//                         >
//                             Apply
//                         </Button>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                   <FormDescription className="text-gray-500 dark:text-gray-300 pt-1">
//                     You must be 18 years or older.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="space-y-2">
//               <FormLabel className="flex items-center gap-1.5 text-neutral-900 dark:text-white">
//                 <Phone className="h-4 w-4 text-muted-foreground" /> Mobile
//                 Number <span className="text-red-500">*</span>
//               </FormLabel>
//               <div className="flex items-start gap-2">
//                 <FormField
//                   control={form.control}
//                   name="mobileCountryCode"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
//                       <Popover
//                         open={countryCodePopoverOpen}
//                         onOpenChange={setCountryCodePopoverOpen}
//                       >
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             role="combobox"
//                             aria-expanded={countryCodePopoverOpen}
//                             className={cn(
//                               "w-full h-12 justify-between",
//                               !field.value && "text-muted-foreground"
//                             )}
//                             aria-label="Select country calling code"
//                           >
//                             {field.value ? field.value : "Code"}
//                             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent
//                           align="start"
//                           className="sm:w-[450px] max-h-[--radix-popover-content-available-height] p-0"
//                         >
//                           <Command
//                             filter={(value, search) => {
//                               const option = countryCodeOptions.find(
//                                 (opt) =>
//                                   opt.label.toLowerCase() ===
//                                   value.toLowerCase()
//                               );
//                               if (!option) return 0;
//                               const searchTerm = search.toLowerCase().trim();
//                               if (!searchTerm) return 1;
//                               const isInLabel = option.label
//                                 .toLowerCase()
//                                 .includes(searchTerm);
//                               const codeWithoutPlus = option.value.slice(1);
//                               const searchTermIsNumeric = /^\d+$/.test(
//                                 searchTerm
//                               );
//                               const searchTermMaybePlusNumeric =
//                                 /^\+?\d+$/.test(searchTerm);
//                               const numericSearchTerm = searchTerm.replace(
//                                 /^\+/,
//                                 ""
//                               );
//                               const isInCode =
//                                 (searchTermIsNumeric ||
//                                   searchTermMaybePlusNumeric) &&
//                                 codeWithoutPlus.includes(numericSearchTerm);
//                               return isInLabel || isInCode ? 1 : 0;
//                             }}
//                           >
//                             <CommandInput placeholder="Search country or code..." />
//                             <CommandList>
//                               <CommandEmpty>No country found.</CommandEmpty>
//                               <CommandGroup className="max-h-[250px] overflow-y-auto">
//                                 {countryCodeOptions.map((option) => (
//                                   <CommandItem
//                                     key={option.label}
//                                     value={option.label}
//                                     onSelect={(currentValueLabel) => {
//                                       const selectedOption =
//                                         countryCodeOptions.find(
//                                           (opt) =>
//                                             opt.label.toLowerCase() ===
//                                             currentValueLabel.toLowerCase()
//                                         );
//                                       if (selectedOption) {
//                                         form.setValue(
//                                           "mobileCountryCode",
//                                           selectedOption.value,
//                                           { shouldValidate: true }
//                                         );
//                                       } else {
//                                         form.setValue(
//                                           "mobileCountryCode",
//                                           DEFAULT_COUNTRY_CODE,
//                                           { shouldValidate: true }
//                                         );
//                                       }
//                                       setCountryCodePopoverOpen(false);
//                                     }}
//                                     className="flex justify-between items-center cursor-pointer"
//                                   >
//                                     <span>{option.label}</span>
//                                     <Check
//                                       className={cn(
//                                         "ml-2 h-4 w-4",
//                                         option.value === field.value
//                                           ? "opacity-100"
//                                           : "opacity-0"
//                                       )}
//                                     />
//                                   </CommandItem>
//                                 ))}
//                               </CommandGroup>
//                             </CommandList>
//                           </Command>
//                         </PopoverContent>
//                       </Popover>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="mobileNumber"
//                   render={({ field }) => (
//                     <FormItem className="flex-grow">
//                       <FormControl>
//                         <Input
//                           type="tel"
//                           inputMode="numeric"
//                           placeholder="Enter number"
//                           {...field}
//                           className="h-12"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <FormDescription className="text-gray-500 dark:text-gray-300 pt-1">
//                 Used for verification and communications.
//               </FormDescription>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-4">
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={prevStep}
//                 disabled={isSubmittingForm || isSkipping}
//                 aria-label="Go back to previous step"
//               >
//                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
//               </button>

//               {(backendStatus === "not_started" ||
//                 backendStatus === "rejected" ||
//                 backendStatus === "skipped") && (
//                 <button
//                   type="button"
//                   onClick={handleSkip}
//                   disabled={isSubmittingForm || isSkipping}
//                   className="bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-6 py-3 h-12.5 w-full rounded-full transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   aria-label="Skip KYC process for now"
//                 >
//                   {isSkipping ? (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   ) : null}
//                   Skip for Now
//                 </button>
//               )}

//               <button
//                 type="submit"
//                 className="inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={
//                   isSubmittingForm || isSkipping || !form.formState.isValid
//                 }
//                 aria-label="Continue to next step"
//               >
//                 {isSubmittingForm ? (
//                   <>
//                     <svg
//                       className="h-5 w-5 text-neutral-900 animate-spin mr-2"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                     >
//                       <path
//                         d="M12 2V6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M12 18V22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 4.93L7.76 7.76"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 16.24L19.07 19.07"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M2 12H6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M18 12H22"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M4.93 19.07L7.76 16.24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.24 7.76L19.07 4.93"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <span>Continue...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Continue</span>
//                     <ArrowRight
//                       className="ml-2 size-5"
//                       aria-hidden="true"
//                     />
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }

// frontend/src/app/kyc/personal/page.tsx
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  format,
  subYears,
  startOfDay,
  isValid as isDateValid,
  parseISO,
} from "date-fns";
import { cn } from "@/lib/utils";
import * as countryCodes from "country-codes-list";

// --- UI Components ---
import { Button } from "@/components/ui/button"; // Kept as it's used in PopoverContent
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  ChevronsUpDown,
  Calendar as CalendarIcon,
  Loader2,
  User,
  Phone,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

// --- App Specific Imports ---
import { useKyc, formStepOrder } from "../../contexts/KycContext";
import { useAuth } from "@/app/contexts/AuthContext";
import kycService from "@/app/services/kyc";

// --- Zod Validation Schema ---
const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name cannot exceed 100 characters" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(100, { message: "Last name cannot exceed 100 characters" }),
  dateOfBirth: z
    .date({
      required_error: "Date of birth is required.",
      invalid_type_error: "Please enter a valid date.",
    })
    .max(startOfDay(subYears(new Date(), 18)), {
      message: "You must be at least 18 years old.",
    })
    .min(new Date("1900-01-01"), {
      message: "Date of birth seems incorrect (before 1900).",
    }),
  mobileCountryCode: z
    .string()
    .trim()
    .min(2, { message: "Code required" })
    .regex(/^\+\d{1,4}$/, { message: "Invalid format (e.g., +1, +44)" }),
  mobileNumber: z
    .string()
    .trim()
    .min(5, { message: "Minimum 5 digits required" })
    .max(15, { message: "Maximum 15 digits allowed" })
    .regex(/^\d+$/, { message: "Enter only numbers" }),
});

type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
type CountryCodeOption = { value: string; label: string };
const DEFAULT_COUNTRY_CODE = "+1";

const datePickerYears = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
).reverse();
const datePickerMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function KycPersonalPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading: authLoading, refetchUser } = useAuth();
  const {
    kycData,
    setKycData,
    nextStep,
    prevStep,
    updateCurrentUiStepId,
    isInitialized: kycInitialized,
    backendStatus,
    fetchKycStatus,
    isLoadingStatus: kycLoadingStatus,
  } = useKyc();

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [formActionError, setFormActionError] = useState<string | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [countryCodePopoverOpen, setCountryCodePopoverOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date>(
    subYears(new Date(), 30)
  );
  const [dateOfBirthPickerOpen, setDateOfBirthPickerOpen] = useState(false);
  const [tempDateOfBirth, setTempDateOfBirth] = useState<Date | undefined>(
    undefined
  );

  const form = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      mobileCountryCode: DEFAULT_COUNTRY_CODE,
      mobileNumber: "",
    },
    mode: "onChange",
  });

  const countryCodeOptions = useMemo<CountryCodeOption[]>(() => {
    try {
      const codesObject = countryCodes.customList(
        "countryNameEn",
        "+{countryCallingCode}"
      );
      return Object.entries(codesObject)
        .map(([name, code]) => ({ value: code, label: `${name} (${code})` }))
        .filter(
          (option) =>
            option.value &&
            option.value !== "+" &&
            option.label &&
            option.label.trim() !== `(${option.value})`
        )
        .sort((a, b) => a.label.localeCompare(b.label));
    } catch (error) {
      console.error("Error generating country code list:", error);
      return [{ value: "+1", label: "United States (+1)" }];
    }
  }, []);

  useEffect(() => {
    if (kycInitialized && pathname === "/kyc/personal") {
      updateCurrentUiStepId("personal");
    }
  }, [kycInitialized, updateCurrentUiStepId, pathname]);

  useEffect(() => {
    if (!kycInitialized || authLoading) {
      setIsPageLoading(true);
      return;
    }

    setIsPageLoading(true); // Start loading for data processing
    let initialValues: Partial<PersonalDetailsFormData> = {};
    const parsedDate = kycData.dateOfBirth
      ? parseISO(kycData.dateOfBirth)
      : undefined;
    const validInitialDate =
      parsedDate && isDateValid(parsedDate) ? parsedDate : undefined;

    initialValues = {
      firstName: kycData.firstName || "",
      lastName: kycData.lastName || "",
      dateOfBirth: validInitialDate,
      mobileCountryCode: kycData.mobile?.countryCode || DEFAULT_COUNTRY_CODE,
      mobileNumber: kycData.mobile?.number || "",
    };

    if (
      !kycData.firstName &&
      !kycData.lastName &&
      user &&
      (backendStatus === "not_started" || backendStatus === "skipped")
    ) {
      const nameParts = user.fullName?.trim().split(" ") || [];
      initialValues.firstName = nameParts[0] || "";
      initialValues.lastName = nameParts.slice(1).join(" ") || "";
    }

    const finalCountryCode =
      initialValues.mobileCountryCode || DEFAULT_COUNTRY_CODE;
    initialValues.mobileCountryCode = countryCodeOptions.some(
      (opt) => opt.value === finalCountryCode
    )
      ? finalCountryCode
      : DEFAULT_COUNTRY_CODE;

    form.reset(initialValues as PersonalDetailsFormData); // Ensure type compatibility

    setCalendarDate(validInitialDate || subYears(new Date(), 30));
    setTempDateOfBirth(validInitialDate);

    setIsPageLoading(false); // End loading after data processing
  }, [
    kycInitialized,
    authLoading,
    user,
    backendStatus,
    kycData,
    form, // form.reset is stable, so form is sufficient
    countryCodeOptions,
  ]);

  const onSubmit = useCallback(
    (data: PersonalDetailsFormData) => {
      setIsSubmittingForm(true);
      setFormActionError(null);
      try {
        const formattedDOB = format(data.dateOfBirth, "yyyy-MM-dd");
        setKycData({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: formattedDOB,
          mobile: {
            countryCode: data.mobileCountryCode,
            number: data.mobileNumber,
          },
        });
        nextStep();
      } catch (error: any) {
        console.error("Error during KYC data submission:", error);
        setFormActionError(
          error.message || "Failed to save progress. Please try again."
        );
      } finally {
        // Ensure isSubmittingForm is reset even if nextStep() itself causes a quick unmount/remount
        // or if an error occurs that isn't caught by the try-catch (less likely here).
        // Using a microtask to delay this slightly can help if nextStep() causes immediate rerenders
        // that might conflict with the state update.
        queueMicrotask(() => setIsSubmittingForm(false));
      }
    },
    [setKycData, nextStep]
  );

  const handleSkip = useCallback(async () => {
    // If KYC status is already 'skipped', redirect to dashboard immediately.
    if (backendStatus === "skipped") {
      console.log(
        "KYC Personal: KYC status is already 'skipped'. Redirecting to dashboard."
      );
      router.push("/dashboard");
      return;
    }

    // Confirmation dialog only if not already skipped
    if (
      !confirm(
        "Skip identity verification for now? Some features will be limited."
      )
    )
      return;

    setIsSkipping(true);
    setFormActionError(null);
    try {
      // The API call should only happen if the status allows (e.g., not_started, or if backend handles rejected->skipped)
      // For robustness, one might add a check here: if (backendStatus !== "not_started" && backendStatus !== "rejected") return;
      // However, the primary guard is the backendStatus === "skipped" check above.
      console.log("KYC Personal: Attempting to skip KYC via service...");
      await kycService.skipKyc();
      console.log(
        "KYC Personal: Skip API call successful. Refetching contexts..."
      );
      await refetchUser();
      await fetchKycStatus(true); // Force refetch of KYC status
      console.log(
        "KYC Personal: Contexts refetched. Redirecting to dashboard."
      );
      router.push("/dashboard"); // Redirect after successful skip
    } catch (err: any) {
      console.error("KYC Personal: Error skipping KYC:", err);
      setFormActionError(
        err?.response?.data?.message ||
          err.message ||
          "Skip failed. Please try again."
      );
      // setIsSkipping(false) is in the finally block
    } finally {
      setIsSkipping(false);
    }
  }, [
    backendStatus,
    refetchUser,
    fetchKycStatus,
    router,
    setFormActionError,
    setIsSkipping,
  ]);

  const handleYearChange = (year: string) => {
    const newDate = new Date(calendarDate);
    newDate.setFullYear(Number.parseInt(year));
    const maxDate = startOfDay(subYears(new Date(), 18));
    const minDate = new Date("1900-01-01");
    if (newDate > maxDate) newDate.setMonth(maxDate.getMonth());
    if (newDate < minDate) newDate.setMonth(minDate.getMonth());
    setCalendarDate(newDate);
  };

  const handleMonthChange = (month: string) => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(datePickerMonths.indexOf(month));
    const maxDate = startOfDay(subYears(new Date(), 18));
    const minDate = new Date("1900-01-01");
    if (newDate > maxDate) newDate.setDate(maxDate.getDate());
    if (newDate < minDate) newDate.setDate(minDate.getDate());
    setCalendarDate(newDate);
  };

  // Combined loading states
  if (isPageLoading || (!kycInitialized && authLoading) || kycLoadingStatus) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If KYC is initialized and status is not one that allows editing personal details
  if (
    kycInitialized &&
    !["not_started", "rejected", "skipped"].includes(backendStatus as string)
  ) {
    // This block will be hit for "pending", "verified", "error", "loading" (if kycLoadingStatus is false), "unauthenticated"
    // KycProvider should ideally redirect away from this page for these states.
    // Showing a message and dashboard link as a fallback.
    return (
      <div className="flex justify-center items-center min-h-[400px] text-center">
        <Card className="p-6 bg-white dark:bg-background shadow-lg rounded-lg">
          <CardTitle className="text-xl font-semibold text-mainheading dark:text-white">
            KYC Status: {backendStatus.replace("_", " ").toUpperCase()}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
            Your personal details cannot be edited at this stage.
            {backendStatus === "error" &&
              " An error occurred with your KYC process. Please contact support."}
            {backendStatus === "unauthenticated" &&
              " Please log in to continue."}
          </CardDescription>
          <Button
            onClick={() =>
              router.push(
                backendStatus === "unauthenticated"
                  ? "/auth/login"
                  : "/dashboard"
              )
            }
            className="mt-6 bg-primary hover:bg-primaryhover text-neutral-900 rounded-full px-6 py-2.5"
          >
            {backendStatus === "unauthenticated"
              ? "Go to Login"
              : "Go to Dashboard"}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-none border animate-fadeIn sm:p-8 p-4 bg-transparent">
      <CardHeader className="border-b pb-6 mb-6 space-y-2">
        <CardTitle className="sm:text-2xl text-xl font-semibold tracking-normal flex items-start gap-2 text-mainheadingWhite">
          <User className="h-6 w-6 text-primary mt-1 flex-shrink-0" /> Personal
          Details (Step 
          {formStepOrder.indexOf("personal") + 1} of {formStepOrder.length})
        </CardTitle>
        <CardDescription className="text-subheadingWhite">
          Enter your legal name, date of birth, and mobile number. Fields marked
          with <span className="text-red-500">*</span> are required.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {formActionError && (
          <Alert className="bg-red-900/25 border-red-500 rounded-lg p-4 gap-3 mb-6">
            <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
              <AlertTriangle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
            </div>
            <div>
              <AlertTitle className="font-medium tracking-normal text-red-600 dark:text-red-200 text-base">
                Action Failed
              </AlertTitle>
              <AlertDescription className="text-red-300/90">
                {formActionError}
              </AlertDescription>
            </div>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-mainheadingWhite block capitalize text-sm lg:text-base">
                      Legal First Name <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0" placeholder="e.g., Jane" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-mainheadingWhite block capitalize text-sm lg:text-base">
                      Legal Last Name <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0" placeholder="e.g., Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-mainheadingWhite block capitalize text-sm lg:text-base">
                    Date of Birth <span className="text-red-600">*</span>
                  </FormLabel>
                  <Popover
                    open={dateOfBirthPickerOpen}
                    onOpenChange={(isOpen) => {
                      setDateOfBirthPickerOpen(isOpen);
                      if (isOpen) {
                        setTempDateOfBirth(field.value);
                        if (field.value && isDateValid(field.value)) {
                          setCalendarDate(field.value);
                        } else {
                          setCalendarDate(subYears(new Date(), 30)); // Reset calendar view if no valid date
                        }
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button

                        className={cn(
                          "justify-start text-left font-normal mt-1 px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0",
                          !field.value && "text-gray-400"
                        )}
                        type="button" // Ensure it's not a submit button
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        {field.value && isDateValid(field.value) ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="sm:w-[450px] max-h-[calc(var(--radix-popover-content-available-height)_-_1rem)] w-auto p-0 overflow-y-auto"
                    >
                      <div className="flex items-center justify-between gap-2 p-3 border-b">
                        <Select
                          value={datePickerMonths[calendarDate.getMonth()]}
                          onValueChange={handleMonthChange}
                        >
                          <SelectTrigger className="w-36 h-8">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent className="h-72">
                            {datePickerMonths.map((month) => (
                              <SelectItem key={month} value={month}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={calendarDate.getFullYear().toString()}
                          onValueChange={handleYearChange}
                        >
                          <SelectTrigger className="w-28 h-8">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent className="h-72">
                            {datePickerYears.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Calendar
                        mode="single"
                        selected={
                          tempDateOfBirth && isDateValid(tempDateOfBirth)
                            ? tempDateOfBirth
                            : undefined
                        }
                        onSelect={(date) => {
                          const newSelectedDate = date || undefined;
                          setTempDateOfBirth(newSelectedDate);
                          if (newSelectedDate) {
                            setCalendarDate(newSelectedDate);
                          }
                        }}
                        month={calendarDate}
                        onMonthChange={setCalendarDate}
                        disabled={(date) =>
                          date > startOfDay(subYears(new Date(), 18)) ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                      <div className="p-3 border-t">
                        <Button
                          type="button"
                          className="w-full bg-primary hover:bg-primaryhover text-neutral-900 rounded-full"
                          onClick={() => {
                            field.onChange(tempDateOfBirth);
                            form.trigger("dateOfBirth"); // Manually trigger validation for DOB
                            setDateOfBirthPickerOpen(false);
                          }}
                          disabled={
                            !tempDateOfBirth || !isDateValid(tempDateOfBirth)
                          }
                        >
                          Apply
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-subheadingWhite pt-1">
                    You must be 18 years or older.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel className="text-mainheadingWhite block capitalize text-sm lg:text-base">
                Mobile Number <span className="text-red-600">*</span>
              </FormLabel>

              <div className="flex items-start gap-2">
                <FormField
                  control={form.control}
                  name="mobileCountryCode"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-1/3 max-w-[150px] shrink-0">
                      <Popover
                        open={countryCodePopoverOpen}
                        onOpenChange={setCountryCodePopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            role="combobox"
                            aria-expanded={countryCodePopoverOpen}
                            className={cn(
                              "mt-1 justify-between px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0",
                              !field.value && "text-muted-foreground"
                            )}
                            aria-label="Select country calling code"
                            type="button" // Ensure not submit
                          >
                            {field.value ? field.value : "Code"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        
                        <PopoverContent
                          align="start"
                          className="sm:w-[450px] max-h-[--radix-popover-content-available-height] p-0"
                        >
                          <Command
                            filter={(value, search) => {
                              const option = countryCodeOptions.find(
                                (opt) =>
                                  opt.label.toLowerCase() ===
                                  value.toLowerCase()
                              );
                              if (!option) return 0;
                              const searchTerm = search.toLowerCase().trim();
                              if (!searchTerm) return 1;
                              const isInLabel = option.label
                                .toLowerCase()
                                .includes(searchTerm);
                              const codeWithoutPlus = option.value.slice(1);
                              const searchTermIsNumeric = /^\d+$/.test(
                                searchTerm
                              );
                              const searchTermMaybePlusNumeric =
                                /^\+?\d+$/.test(searchTerm);
                              const numericSearchTerm = searchTerm.replace(
                                /^\+/,
                                ""
                              );
                              const isInCode =
                                (searchTermIsNumeric ||
                                  searchTermMaybePlusNumeric) &&
                                codeWithoutPlus.includes(numericSearchTerm);
                              return isInLabel || isInCode ? 1 : 0;
                            }}
                          >
                            <CommandInput placeholder="Search country or code..." />

                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              
                              <CommandGroup className="max-h-[250px] overflow-y-auto sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox">
                                {countryCodeOptions.map((option) => (
                                  <CommandItem
                                    key={option.label}
                                    value={option.label} // Important for Command's internal filtering/selection
                                    onSelect={() => {
                                      // Simpler onSelect
                                      form.setValue(
                                        "mobileCountryCode",
                                        option.value,
                                        { shouldValidate: true }
                                      );
                                      setCountryCodePopoverOpen(false);
                                    }}
                                    className="flex justify-between items-center cursor-pointer"
                                  >
                                    <span>{option.label}</span>
                                    <Check
                                      className={cn(
                                        "ml-2 h-4 w-4",
                                        option.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          type="tel"
                          inputMode="numeric"
                          placeholder="Enter number"
                          {...field}
                          className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all duration-75 ease-in-out placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormDescription className="text-subheadingWhite pt-1">
                Used for verification and communications.
              </FormDescription>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={prevStep}
                disabled={isSubmittingForm || isSkipping}
                aria-label="Go back to previous step"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </button>

              {(backendStatus === "not_started" ||
                backendStatus === "rejected" ||
                backendStatus === "skipped") && ( // Show skip if status allows trying/resuming KYC
                <button
                  type="button"
                  onClick={handleSkip}
                  disabled={isSubmittingForm || isSkipping}
                  className="bg-lightgray hover:bg-lightborder dark:bg-primarybox dark:hover:bg-secondarybox text-neutral-900 dark:text-white px-6 py-3 h-12.5 w-full rounded-full transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Skip KYC process for now"
                >
                  {isSkipping ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Skip for Now
                </button>
              )}

              <button
                type="submit"
                className="inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isSubmittingForm || isSkipping || !form.formState.isValid
                }
                aria-label="Continue to next step"
              >
                {isSubmittingForm ? (
                  <>
                    <svg
                      className="h-5 w-5 text-neutral-900 animate-spin mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 2V6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18V22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.93 4.93L7.76 7.76"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.24 16.24L19.07 19.07"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12H6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 12H22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.93 19.07L7.76 16.24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.24 7.76L19.07 4.93"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Processing...</span> {/* Changed from Continue... */}
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="ml-2 size-5" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
