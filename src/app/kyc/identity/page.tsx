// // frontend/src/app/kyc/identity/page.tsx
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
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

// // Zod schema (remains the same)
// const identitySchema = z.object({
//     idType: z.enum(['passport', 'resident_permit'], { required_error: "Please select an ID type." }),
//     idNumber: z.string().min(5, { message: 'Valid ID number is required' }),
//     idIssueDate: z.date({ required_error: "Issue date is required." }).max(new Date(), { message: "Issue date cannot be in the future" }),
//     idExpiryDate: z.date({ required_error: "Expiry date is required." }).min(new Date(new Date().setDate(new Date().getDate() + 1)), { message: "Expiry date must be in the future" }),
// })
// .refine(data => data.idExpiryDate > data.idIssueDate, {
//     message: "Expiry date must be after the issue date.",
//     path: ["idExpiryDate"],
// });

// type IdentityFormData = z.infer<typeof identitySchema>;

// export default function KycIdentityPage() {
//     const router = useRouter();
//     const { kycData, setKycData, nextStep, prevStep, goToStep } = useKyc(); // nextStep handles navigation
//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const form = useForm<IdentityFormData>({
//         resolver: zodResolver(identitySchema),
//         defaultValues: {
//             idType: kycData.idType || undefined,
//             idNumber: kycData.idNumber || '',
//             idIssueDate: kycData.idIssueDate ? new Date(kycData.idIssueDate) : undefined,
//             idExpiryDate: kycData.idExpiryDate ? new Date(kycData.idExpiryDate) : undefined,
//         },
//     });

//     // useEffect to set step and reset form (remains the same)
//     useEffect(() => {
//         goToStep('identity');
//         form.reset({
//              idType: kycData.idType || undefined,
//              idNumber: kycData.idNumber || '',
//              idIssueDate: kycData.idIssueDate ? new Date(kycData.idIssueDate) : undefined,
//              idExpiryDate: kycData.idExpiryDate ? new Date(kycData.idExpiryDate) : undefined,
//         });
//     }, [goToStep, kycData, form.reset]);


//     // *** CORRECTED onSubmit ***
//     const onSubmit = (data: IdentityFormData) => {
//         try {
//             setIsSubmitting(true); // Start loading
//             setFormError(null);
//             console.log("Step 3 Saving Data:", data);

//             // Update context state
//             setKycData({
//                 idType: data.idType,
//                 idNumber: data.idNumber,
//                 idIssueDate: data.idIssueDate.toISOString(),
//                 idExpiryDate: data.idExpiryDate.toISOString(),
//             });

//             // Trigger navigation via context
//             nextStep();

//             // Assume navigation happens. Resetting spinner state is handled by unmount.

//         } catch (error) {
//             console.error("Error saving progress:", error);
//             setFormError("Failed to save progress. Please try again.");
//             setIsSubmitting(false); // Reset loading state ONLY on error
//         }
//         // No finally block needed for setIsSubmitting if navigation occurs
//     };

//     const selectedIdType = form.watch('idType');

//     // Main Form Render (remains the same)
//     return (
//          <Card className="w-full max-w-2xl mx-auto">
//             <CardHeader>
//                 <CardTitle className="text-xl">Identity Verification</CardTitle>
//                 <CardDescription>Provide details from your government-issued photo ID.</CardDescription>
//             </CardHeader>
//              <CardContent>
//                  {formError && <p className="mb-4 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{formError}</p>}
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         {/* ID Type Radio Group */}
//                          <FormField control={form.control} name="idType" render={({ field }) => (
//                             <FormItem className="space-y-3">
//                                 <FormLabel>Select ID Type *</FormLabel>
//                                 <FormControl>
//                                     <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col sm:flex-row gap-4">
//                                         <FormItem className="flex items-center space-x-3 space-y-0 border dark:border-gray-700 p-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:border-primary">
//                                             <FormControl><RadioGroupItem value="passport" /></FormControl>
//                                             <FormLabel className="font-normal cursor-pointer">Passport</FormLabel>
//                                         </FormItem>
//                                         <FormItem className="flex items-center space-x-3 space-y-0 border dark:border-gray-700 p-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:border-primary">
//                                             <FormControl><RadioGroupItem value="resident_permit" /></FormControl>
//                                             <FormLabel className="font-normal cursor-pointer">Resident Permit</FormLabel>
//                                         </FormItem>
//                                     </RadioGroup>
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                          )} />

//                         {/* Conditional Fields */}
//                         {selectedIdType && (
//                             <>
//                                 <FormField control={form.control} name="idNumber" render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>{selectedIdType === 'passport' ? 'Passport Number' : 'Resident Permit Number'} *</FormLabel>
//                                         <FormControl><Input placeholder="Enter ID number" {...field} /></FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )} />
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <FormField control={form.control} name="idIssueDate" render={({ field }) => (
//                                         <FormItem className="flex flex-col">
//                                             <FormLabel>Issue Date *</FormLabel>
//                                             <Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : <span>Pick issue date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date()} initialFocus /></PopoverContent></Popover>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} />
//                                     <FormField control={form.control} name="idExpiryDate" render={({ field }) => (
//                                         <FormItem className="flex flex-col">
//                                             <FormLabel>Expiry Date *</FormLabel>
//                                             <Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : <span>Pick expiry date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date <= new Date()} initialFocus /></PopoverContent></Popover>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )} />
//                                 </div>
//                             </>
//                         )}

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700 mt-8">
//                             <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}> Back </Button>
//                             <Button type="submit" disabled={isSubmitting || !selectedIdType}> {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Continue </Button>
//                         </div>
//                     </form>
//                 </Form>
//             </CardContent>
//         </Card>
//     );
// }


// // frontend/src/app/kyc/identity/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format, startOfDay, addYears, subYears, isValid as isDateValid } from "date-fns"; // Added isValid
// import { cn } from "@/lib/utils";

// // Shadcn UI Components
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Added FormDescription
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Calendar as CalendarIcon, Loader2, Fingerprint, AlertTriangle } from 'lucide-react'; // Added icons
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// // App specific imports
// import { useKyc } from '../../contexts/KycContext'; // Adjusted path

// // Zod schema for validation
// const identitySchema = z.object({
//     idType: z.enum(['passport', 'resident_permit'], {
//         required_error: "Please select an ID type.",
//         invalid_type_error: "Invalid ID type selected.",
//     }),
//     idNumber: z.string().trim().min(5, { message: 'Valid ID number is required (min 5 characters)' }),
//     idIssueDate: z.date({
//             required_error: "Issue date is required.",
//             invalid_type_error: "Invalid issue date!",
//         })
//        .max(startOfDay(new Date()), { message: "Issue date cannot be in the future" })
//        .min(new Date("1950-01-01"), { message: "Issue date seems too old (before 1950)" }),
//     idExpiryDate: z.date({
//             required_error: "Expiry date is required.",
//             invalid_type_error: "Invalid expiry date!",
//         })
//        // Ensure expiry is at least tomorrow (or today if that's allowed - adjust as needed)
//        .min(startOfDay(new Date(Date.now() + 86400000)), { message: "ID seems expired or expires today. Please use a valid document." }),
// })
// .refine(data => {
//     // Refine check: Ensure expiry date is strictly after issue date
//     // Check if both dates are valid Date objects before comparing
//     return isDateValid(data.idIssueDate) && isDateValid(data.idExpiryDate) && data.idExpiryDate > data.idIssueDate;
// }, {
//     message: "Expiry date must be after the issue date.",
//     path: ["idExpiryDate"], // Point error message to the expiry date field
// });

// type IdentityFormData = z.infer<typeof identitySchema>;

// export default function KycIdentityPage() {
//     const { kycData, setKycData, nextStep, prevStep, updateCurrentStepId, isInitialized } = useKyc();
//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isPageLoading, setIsPageLoading] = useState(true);

//     // Initialize react-hook-form
//     const form = useForm<IdentityFormData>({
//         resolver: zodResolver(identitySchema),
//         defaultValues: {
//             idType: undefined, // Start undefined
//             idNumber: '',
//             idIssueDate: undefined,
//             idExpiryDate: undefined,
//         },
//         mode: 'onChange', // Validate eagerly
//     });

//     // Effect to set the current step in the context
//     useEffect(() => {
//         updateCurrentStepId('identity');
//     }, [updateCurrentStepId]);

//     // Effect to load data from context after initialization
//     useEffect(() => {
//         if (!isInitialized) {
//             setIsPageLoading(true);
//             return;
//         }

//         console.log("IdentityPage: Context initialized. Loading data:", kycData);

//         // Helper to safely parse date strings from context
//         const parseContextDate = (dateString?: string): Date | undefined => {
//             if (!dateString) return undefined;
//             try {
//                 const date = new Date(dateString);
//                 // Ensure it's a valid date object after parsing
//                 return isDateValid(date) ? date : undefined;
//             } catch {
//                 return undefined;
//             }
//         };

//         form.reset({
//              idType: kycData.idType || undefined, // Use undefined if not set
//              idNumber: kycData.idNumber || '',
//              idIssueDate: parseContextDate(kycData.idIssueDate),
//              idExpiryDate: parseContextDate(kycData.idExpiryDate),
//         });
//         setIsPageLoading(false);

//     }, [isInitialized, kycData.idType, kycData.idNumber, kycData.idIssueDate, kycData.idExpiryDate, form.reset]);

//     // Handle Form Submission
//     const onSubmit = (data: IdentityFormData) => {
//         console.log("Step 3 (Identity) Form submitted with data:", data); // Log 1
//         setIsSubmitting(true);
//         setFormError(null);
//         try {
//             console.log("Step 3 (Identity) Calling setKycData..."); // Log 2
//             setKycData({
//                 idType: data.idType,
//                 idNumber: data.idNumber,
//                 idIssueDate: data.idIssueDate.toISOString(), // Store as ISO string
//                 idExpiryDate: data.idExpiryDate.toISOString(), // Store as ISO string
//             });
//             console.log("Step 3 (Identity) Calling nextStep()..."); // Log 3
//             nextStep();
//              console.log("Step 3 (Identity) nextStep() called successfully."); // Log 4

//         } catch (error) {
//             console.error("Error saving identity progress:", error);
//             setFormError("Failed to save progress. Please try again.");
//             setIsSubmitting(false); // Stop submitting ONLY on error
//         }
//     };

//     // Watch the selected ID type to conditionally show fields/adjust labels
//     const selectedIdType = form.watch('idType');

//     // Loading state display
//     if (isPageLoading) {
//         return (
//              <div className="flex justify-center items-center min-h-[300px]">
//                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                  <span className="ml-2 text-muted-foreground">Loading identity details...</span>
//              </div>
//          );
//     }

//     return (
//          <Card className="w-full max-w-2xl mx-auto shadow-lg border border-border/40">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
//                     <Fingerprint className="h-6 w-6 text-primary" />
//                     Identity Verification
//                 </CardTitle>
//                 <CardDescription>Provide details from your chosen government-issued photo ID. Ensure the details match the document exactly.</CardDescription>
//             </CardHeader>
//              <CardContent>
//                  {formError && (
//                      <Alert variant="destructive" className="mb-4">
//                         <AlertTriangle className="h-4 w-4" />
//                         <AlertTitle>Error</AlertTitle>
//                         <AlertDescription>{formError}</AlertDescription>
//                      </Alert>
//                   )}
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         {/* ID Type Radio Group */}
//                          <FormField
//                             control={form.control}
//                             name="idType"
//                             render={({ field }) => (
//                                 <FormItem className="space-y-3">
//                                     <FormLabel>Select ID Type *</FormLabel>
//                                     <FormControl>
//                                         {/* Use value={field.value ?? ''} to handle undefined initially */}
//                                         <RadioGroup
//                                             onValueChange={(value) => {
//                                                 field.onChange(value);
//                                                 // Optionally reset other fields when type changes if needed
//                                                 // form.resetField("idNumber");
//                                                 // form.resetField("idIssueDate");
//                                                 // form.resetField("idExpiryDate");
//                                             }}
//                                             value={field.value ?? ''}
//                                             className="flex flex-col sm:flex-row gap-3 sm:gap-4"
//                                         >
//                                             <FormItem className="flex-1"> {/* Use flex-1 for equal width */}
//                                                 <FormControl>
//                                                     <RadioGroupItem value="passport" id="passport" className="peer sr-only" />
//                                                 </FormControl>
//                                                 <FormLabel
//                                                     htmlFor="passport"
//                                                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
//                                                 >
//                                                      Passport
//                                                 </FormLabel>
//                                             </FormItem>
//                                             <FormItem className="flex-1"> {/* Use flex-1 for equal width */}
//                                                  <FormControl>
//                                                      <RadioGroupItem value="resident_permit" id="resident_permit" className="peer sr-only" />
//                                                 </FormControl>
//                                                  <FormLabel
//                                                     htmlFor="resident_permit"
//                                                     className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
//                                                 >
//                                                     Resident Permit / National ID
//                                                  </FormLabel>
//                                             </FormItem>
//                                         </RadioGroup>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                          )} />

//                         {/* Conditionally Render ID Number and Dates */}
//                         {/* Animate the appearance of these fields */}
//                         {selectedIdType && (
//                             <div className="space-y-6 animate-fadeIn"> {/* Simple fade-in animation */}
//                                 {/* ID Number Input */}
//                                 <FormField
//                                     control={form.control}
//                                     name="idNumber"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>{selectedIdType === 'passport' ? 'Passport Number' : 'Permit/ID Number'} *</FormLabel>
//                                             <FormControl><Input placeholder="Enter document number" {...field} /></FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Issue and Expiry Dates */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
//                                     {/* ID Issue Date */}
//                                     <FormField
//                                         control={form.control}
//                                         name="idIssueDate"
//                                         render={({ field }) => (
//                                             <FormItem className="flex flex-col">
//                                                 <FormLabel>Issue Date *</FormLabel>
//                                                 <Popover>
//                                                     <PopoverTrigger asChild>
//                                                         <FormControl>
//                                                             <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
//                                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                                 {field.value ? format(field.value, "PPP") : <span>Pick issue date</span>}
//                                                             </Button>
//                                                         </FormControl>
//                                                     </PopoverTrigger>
//                                                     <PopoverContent className="w-auto p-0" align="start">
//                                                         <Calendar
//                                                             mode="single"
//                                                             selected={field.value}
//                                                             onSelect={(date) => {
//                                                                 field.onChange(date);
//                                                                 // Manually trigger validation for expiry date after issue date changes
//                                                                 form.trigger("idExpiryDate");
//                                                             }}
//                                                             disabled={(date) =>
//                                                                 date > startOfDay(new Date()) || date < new Date("1950-01-01")
//                                                             }
//                                                             initialFocus
//                                                             defaultMonth={field.value || subYears(new Date(), 5)} // Start view ~5 years ago
//                                                             // Removed problematic props
//                                                         />
//                                                     </PopoverContent>
//                                                 </Popover>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                     {/* ID Expiry Date */}
//                                     <FormField
//                                         control={form.control}
//                                         name="idExpiryDate"
//                                         render={({ field }) => (
//                                             <FormItem className="flex flex-col">
//                                                 <FormLabel>Expiry Date *</FormLabel>
//                                                 <Popover>
//                                                     <PopoverTrigger asChild>
//                                                         <FormControl>
//                                                             <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
//                                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                                 {field.value ? format(field.value, "PPP") : <span>Pick expiry date</span>}
//                                                             </Button>
//                                                         </FormControl>
//                                                     </PopoverTrigger>
//                                                     <PopoverContent className="w-auto p-0" align="start">
//                                                         <Calendar
//                                                             mode="single"
//                                                             selected={field.value}
//                                                              onSelect={(date) => {
//                                                                 field.onChange(date);
//                                                                 // Trigger validation for expiry date itself
//                                                                 form.trigger("idExpiryDate");
//                                                             }}
//                                                             // Must be tomorrow or later
//                                                             disabled={(date) => date < startOfDay(new Date(Date.now() + 86400000))}
//                                                             initialFocus
//                                                             defaultMonth={field.value || addYears(new Date(), 1)} // Start view ~1 year from now
//                                                             // Removed problematic props
//                                                         />
//                                                     </PopoverContent>
//                                                 </Popover>
//                                                  <FormDescription>Your ID must be valid.</FormDescription>
//                                                 <FormMessage />
//                                             </FormItem>
//                                         )}
//                                     />
//                                 </div>
//                                 {/* Display cross-field validation error if present */}
//                                 {form.formState.errors.idExpiryDate?.message === "Expiry date must be after the issue date." && (
//                                     <p className="text-sm font-medium text-destructive">{form.formState.errors.idExpiryDate.message}</p>
//                                 )}
//                             </div>
//                         )}

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700 mt-8">
//                             <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
//                                 Back
//                             </Button>
//                             {/* FIX: Disable Continue until ALL fields are valid according to the schema */}
//                             <Button type="submit" disabled={isSubmitting || !selectedIdType || !form.formState.isValid}>
//                                 {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                                 Continue
//                             </Button>
//                         </div>
//                     </form>
//                 </Form>
//             </CardContent>
//         </Card>
//     );
// }


// // frontend/src/app/kyc/identity/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format, startOfDay, parseISO, isValid as isDateValid, addDays } from "date-fns";
// import { cn } from "@/lib/utils";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Calendar as CalendarIcon, Loader2, Fingerprint, AlertTriangle, ArrowRight, ArrowLeft, Check, BookUser, Contact } from 'lucide-react';

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import type { IdType } from '@/app/services/kyc';

// // --- Zod Validation Schema ---
// const idTypeValues: [IdType, ...IdType[]] = ['passport', 'resident_permit'];
// const identitySchema = z.object({
//     idType: z.enum(idTypeValues, { required_error: "Please select the type of ID you will upload." }),
//     idNumber: z.string().trim()
//         .min(5, { message: 'ID number must be at least 5 characters.' })
//         .max(50, { message: 'ID number cannot exceed 50 characters.' }),
//     idIssueDate: z.date({ required_error: "Issue date is required.", invalid_type_error: "Please enter a valid issue date."})
//        .max(startOfDay(new Date()), { message: "Issue date cannot be in the future." })
//        .min(new Date("1950-01-01"), { message: "Issue date seems incorrect (before 1950)." }),
//     idExpiryDate: z.date({ required_error: "Expiry date is required.", invalid_type_error: "Please enter a valid expiry date."})
//        .min(startOfDay(addDays(new Date(), 1)), { message: "This ID appears to be expired or expires today." }), // Min tomorrow
// })
// .refine(data => !data.idIssueDate || !data.idExpiryDate || data.idExpiryDate > data.idIssueDate, { // Check only if both dates are valid
//     message: "Expiry date must be after the issue date.",
//     path: ["idExpiryDate"],
// });

// type IdentityFormData = z.infer<typeof identitySchema>;

// // --- Component ---
// export default function KycIdentityPage() {
//     const {
//         kycData, setKycData, nextStep, prevStep, updateCurrentUiStepId, goToStep,
//         isInitialized: kycInitialized, backendStatus
//     } = useKyc();

//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isPageLoading, setIsPageLoading] = useState(true);

//     const form = useForm<IdentityFormData>({
//         resolver: zodResolver(identitySchema),
//         defaultValues: { idType: undefined, idNumber: '', idIssueDate: undefined, idExpiryDate: undefined },
//         mode: 'onChange',
//     });

//     // Effect 1: Set UI step
//     useEffect(() => { if (kycInitialized) updateCurrentUiStepId('identity'); }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Load data from context
//     useEffect(() => {
//         if (!kycInitialized) { setIsPageLoading(true); return; }
//         if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') {
//             // console.log("IdentityPage: Skipping data load due to backend status:", backendStatus);
//             setIsPageLoading(false); return;
//         }

//         // console.log("IdentityPage: Context initialized. Loading data:", kycData);
//         setIsPageLoading(true);

//         const parseContextDate = (dateString?: string): Date | undefined => {
//             if (!dateString) return undefined;
//             try { const date = parseISO(dateString); return isDateValid(date) ? date : undefined; }
//             catch { console.warn("IdentityPage: Failed to parse date string:", dateString); return undefined; }
//         };

//         form.reset({
//              idType: kycData.idType && idTypeValues.includes(kycData.idType) ? kycData.idType : undefined,
//              idNumber: kycData.idNumber || '',
//              idIssueDate: parseContextDate(kycData.idIssueDate),
//              idExpiryDate: parseContextDate(kycData.idExpiryDate),
//         });
//         setIsPageLoading(false);

//     }, [kycInitialized, backendStatus, kycData.idType, kycData.idNumber, kycData.idIssueDate, kycData.idExpiryDate, form.reset]);

//     // --- Event Handlers ---
//     const onSubmit = (data: IdentityFormData) => {
//         setIsSubmitting(true); setFormError(null);
//         try {
//             setKycData({
//                 idType: data.idType, idNumber: data.idNumber,
//                 idIssueDate: format(data.idIssueDate, "yyyy-MM-dd"),
//                 idExpiryDate: format(data.idExpiryDate, "yyyy-MM-dd"),
//             });
//             nextStep();
//         } catch (error: any) {
//             console.error("IdentityPage: Error saving progress:", error);
//             setFormError(error.message || "Failed to save progress.");
//             setIsSubmitting(false);
//         }
//     };

//     const selectedIdType = form.watch('idType');

//     // --- Render Logic ---
//     if (isPageLoading || !kycInitialized) { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> ); }
//     if (backendStatus !== 'not_started' && backendStatus !== 'rejected' && backendStatus !== 'skipped') { /* ... loading spinner ... */ return ( <div className="flex justify-center items-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="ml-2">Updating status...</span></div> ); }

//     return (
//          <Card className="w-full max-w-2xl mx-auto shadow-xl border border-border/40 animate-fadeIn">
//             <CardHeader className="border-b dark:border-border/50 p-6">
//                  <div className="flex items-center gap-3 mb-1">
//                     <Fingerprint className="h-6 w-6 text-primary" />
//                      <CardTitle className="text-2xl font-semibold tracking-tight">
//                          Identity Document (Step {formStepOrder.indexOf('identity') + 1} of {formStepOrder.length})
//                     </CardTitle>
//                   </div>
//                 <CardDescription>
//                     Select the ID type you will upload and enter details exactly as shown on the document.
//                 </CardDescription>
//             </CardHeader>
//              <CardContent className="p-6 md:p-8">
//                  {formError && ( <Alert variant="destructive" className="mb-6"> {/* ... error display ... */} </Alert> )}
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                         {/* ID Type Radio Group */}
//                          <FormField control={form.control} name="idType" render={({ field }) => (
//                             <FormItem className="space-y-4">
//                                 <FormLabel className="text-base font-medium">Select ID Type *</FormLabel>
//                                 <FormControl>
//                                     <RadioGroup onValueChange={field.onChange} value={field.value ?? ''} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         {/* Passport Option */}
//                                         <FormItem>
//                                             <FormControl><RadioGroupItem value="passport" id="passport-radio" className="peer sr-only" /></FormControl>
//                                             <FormLabel htmlFor="passport-radio" className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200">
//                                                 <BookUser className="h-6 w-6 text-muted-foreground mb-2" /><span className="font-semibold">Passport</span><div className="h-5 mt-1">{field.value === 'passport' && <Check className="h-5 w-5 text-primary" />}</div>
//                                             </FormLabel>
//                                         </FormItem>
//                                         {/* Resident Permit Option */}
//                                         <FormItem>
//                                              <FormControl><RadioGroupItem value="resident_permit" id="resident_permit-radio" className="peer sr-only" /></FormControl>
//                                              <FormLabel htmlFor="resident_permit-radio" className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200">
//                                                 <Contact className="h-6 w-6 text-muted-foreground mb-2" /><span className="font-semibold text-center">Resident Permit / National ID</span><div className="h-5 mt-1">{field.value === 'resident_permit' && <Check className="h-5 w-5 text-primary" />}</div>
//                                              </FormLabel>
//                                         </FormItem>
//                                     </RadioGroup>
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                          )} />

//                         {/* Conditionally Rendered Fields */}
//                         <div className={cn("space-y-6 pt-6 border-t border-border/30 dark:border-border/20 transition-opacity duration-300 ease-in-out", selectedIdType ? "opacity-100" : "opacity-0 h-0 overflow-hidden pointer-events-none")}>
//                             {/* ID Number Field */}
//                             <FormField control={form.control} name="idNumber" render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>{selectedIdType === 'passport' ? 'Passport Number' : 'Permit / ID Number'} *</FormLabel>
//                                     <FormControl><Input placeholder="Enter document number" {...field} /></FormControl>
//                                     <FormDescription>Enter the full ID number. Include letters/dashes if present.</FormDescription>
//                                     <FormMessage />
//                                 </FormItem>
//                             )} />
//                             {/* Issue and Expiry Date Fields */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
//                                 <FormField control={form.control} name="idIssueDate" render={({ field }) => (
//                                     <FormItem className="flex flex-col">
//                                         <FormLabel>Date of Issue *</FormLabel>
//                                         <Popover> <PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}> <CalendarIcon className="mr-2 h-4 w-4" /> {field.value && isDateValid(field.value) ? format(field.value, "PPP") : <span>Pick issue date</span>} </Button></FormControl></PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value && isDateValid(field.value) ? field.value : undefined} onSelect={(date) => { field.onChange(date); if (form.getValues("idExpiryDate")) { form.trigger("idExpiryDate"); } }} disabled={(date) => date > startOfDay(new Date()) || date < new Date("1950-01-01")} initialFocus captionLayout="dropdown-buttons" fromYear={1950} toYear={new Date().getFullYear()} /></PopoverContent> </Popover>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )} />
//                                 <FormField control={form.control} name="idExpiryDate" render={({ field }) => (
//                                     <FormItem className="flex flex-col">
//                                         <FormLabel>Date of Expiry *</FormLabel>
//                                         <Popover> <PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}> <CalendarIcon className="mr-2 h-4 w-4" /> {field.value && isDateValid(field.value) ? format(field.value, "PPP") : <span>Pick expiry date</span>} </Button></FormControl></PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value && isDateValid(field.value) ? field.value : undefined} onSelect={(date) => { field.onChange(date); form.trigger("idExpiryDate"); }} disabled={(date) => date < startOfDay(addDays(new Date(), 1))} initialFocus captionLayout="dropdown-buttons" fromYear={new Date().getFullYear()} toYear={new Date().getFullYear() + 30} /></PopoverContent> </Popover>
//                                         <FormDescription>Your ID must not be expired.</FormDescription><FormMessage />
//                                     </FormItem>
//                                 )} />
//                             </div>
//                         </div>

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between items-center pt-8 border-t dark:border-border/50 mt-8">
//                              <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
//                              <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>{isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />} Continue</Button>
//                         </div>
//                     </form>
//                 </Form>
//             </CardContent>
//         </Card>
//     );
// }


// // frontend/src/app/kyc/identity/page.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { format, startOfDay, parseISO, isValid as isDateValid, addDays } from "date-fns";
// import { cn } from "@/lib/utils";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Calendar as CalendarIcon, Loader2, Fingerprint, AlertTriangle, ArrowRight, ArrowLeft, Check, BookUser, Contact } from 'lucide-react';

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from '../../contexts/KycContext';
// import type { IdType } from '@/app/services/kyc';

// // --- Zod Validation Schema ---
// const idTypeValues: [IdType, ...IdType[]] = ['passport', 'resident_permit'];
// const identitySchema = z.object({
//     idType: z.enum(idTypeValues, { required_error: "Please select the type of ID you will upload." }),
//     idNumber: z.string().trim()
//         .min(5, { message: 'ID number must be at least 5 characters.' })
//         .max(50, { message: 'ID number cannot exceed 50 characters.' }),
//     idIssueDate: z.date({ required_error: "Issue date is required.", invalid_type_error: "Please enter a valid issue date."})
//        .max(startOfDay(new Date()), { message: "Issue date cannot be in the future." })
//        .min(new Date("1950-01-01"), { message: "Issue date seems incorrect (before 1950)." }),
//     idExpiryDate: z.date({ required_error: "Expiry date is required.", invalid_type_error: "Please enter a valid expiry date."})
//        .min(startOfDay(addDays(new Date(), 1)), { message: "This ID appears to be expired or expires today." }),
// })
// .refine(data => !data.idIssueDate || !data.idExpiryDate || data.idExpiryDate > data.idIssueDate, {
//     message: "Expiry date must be after the issue date.",
//     path: ["idExpiryDate"],
// });

// type IdentityFormData = z.infer<typeof identitySchema>;

// // --- Component ---
// export default function KycIdentityPage() {
//     const {
//         kycData, setKycData, nextStep, prevStep, updateCurrentUiStepId,
//         isInitialized: kycInitialized, backendStatus, isLoadingStatus: kycLoadingStatus
//     } = useKyc();

//     const [formError, setFormError] = useState<string | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isPageLoading, setIsPageLoading] = useState(true); // Local loading for form init

//     const form = useForm<IdentityFormData>({
//         resolver: zodResolver(identitySchema),
//         defaultValues: { idType: undefined, idNumber: '', idIssueDate: undefined, idExpiryDate: undefined },
//         mode: 'onChange',
//     });

//     // Effect 1: Set UI step
//     useEffect(() => {
//         if (kycInitialized && window.location.pathname === '/kyc/identity') {
//             updateCurrentUiStepId('identity');
//         }
//      }, [kycInitialized, updateCurrentUiStepId]);

//     // Effect 2: Load data from context
//     useEffect(() => {
//         if (!kycInitialized) {
//             setIsPageLoading(true); return;
//         }
//         if (!["not_started", "rejected", "skipped", "loading"].includes(backendStatus as string)) {
//             setIsPageLoading(false); return;
//         }

//         setIsPageLoading(true);
//         const parseContextDate = (dateString?: string): Date | undefined => {
//             if (!dateString) return undefined;
//             try { const date = parseISO(dateString); return isDateValid(date) ? date : undefined; }
//             catch { return undefined; }
//         };

//         form.reset({
//              idType: kycData.idType && idTypeValues.includes(kycData.idType) ? kycData.idType : undefined,
//              idNumber: kycData.idNumber || '',
//              idIssueDate: parseContextDate(kycData.idIssueDate),
//              idExpiryDate: parseContextDate(kycData.idExpiryDate),
//         });
//         setIsPageLoading(false);

//     }, [kycInitialized, backendStatus, kycData, form.reset]); // Simplified dependencies

//     // --- Event Handlers ---
//     const onSubmit = useCallback((data: IdentityFormData) => {
//         setIsSubmitting(true); setFormError(null);
//         try {
//             setKycData({
//                 idType: data.idType, idNumber: data.idNumber,
//                 idIssueDate: format(data.idIssueDate, "yyyy-MM-dd"),
//                 idExpiryDate: format(data.idExpiryDate, "yyyy-MM-dd"),
//             });
//             nextStep();
//         } catch (error: any) {
//             setFormError(error.message || "Failed to save progress.");
//             setIsSubmitting(false);
//         }
//     }, [setKycData, nextStep]); // Minimal deps

//     const selectedIdType = form.watch('idType');

//     // --- Render Logic ---
//     // Simplified Loading
//     if (isPageLoading || (kycLoadingStatus && !isPageLoading)) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }
//     // Waiting for Redirect
//     if (!["not_started", "rejected", "skipped", "loading"].includes(backendStatus as string)) {
//         return ( <div className="flex justify-center items-center min-h-[400px]"> <Loader2 className="h-8 w-8 animate-spin text-primary" /> </div> );
//     }

//     return (
//          <Card className="w-full max-w-2xl mx-auto shadow-xl border border-border/40 animate-fadeIn sm:p-8 p-4">
//             <CardHeader className="border-b dark:border-border/50 mb-8">
//                  <div className="flex items-center gap-3 mb-1"> <Fingerprint className="h-6 w-6 text-primary" /> <CardTitle className="text-2xl font-semibold tracking-tight"> Identity Document (Step {formStepOrder.indexOf('identity') + 1} of {formStepOrder.length}) </CardTitle> </div>
//                 <CardDescription> Select the ID type and enter details exactly as shown on the document. </CardDescription>
//             </CardHeader>
//              <CardContent>
//                  {formError && ( <Alert variant="destructive" className="mb-6"> <AlertTriangle className="h-4 w-4" /> <AlertTitle>Error</AlertTitle> <AlertDescription>{formError}</AlertDescription> </Alert> )}
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                         {/* ID Type Radio Group */}
//                          <FormField control={form.control} name="idType" render={({ field }) => (
//                             <FormItem className="space-y-4">
//                                 <FormLabel className="text-base font-medium">Select ID Type *</FormLabel>
//                                 <FormControl>
//                                     <RadioGroup onValueChange={field.onChange} value={field.value ?? ''} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         <FormItem> <FormControl><RadioGroupItem value="passport" id="passport-radio" className="peer sr-only" /></FormControl> <FormLabel htmlFor="passport-radio" className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200"> <BookUser className="h-6 w-6 text-muted-foreground mb-2" /><span className="font-semibold">Passport</span><div className="h-5 mt-1">{field.value === 'passport' && <Check className="h-5 w-5 text-primary" />}</div> </FormLabel> </FormItem>
//                                         <FormItem> <FormControl><RadioGroupItem value="resident_permit" id="resident_permit-radio" className="peer sr-only" /></FormControl> <FormLabel htmlFor="resident_permit-radio" className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200"> <Contact className="h-6 w-6 text-muted-foreground mb-2" /><span className="font-semibold text-center">Resident Permit / National ID</span><div className="h-5 mt-1">{field.value === 'resident_permit' && <Check className="h-5 w-5 text-primary" />}</div> </FormLabel> </FormItem>
//                                     </RadioGroup>
//                                 </FormControl> <FormMessage />
//                             </FormItem>
//                          )} />

//                         {/* Conditionally Rendered Fields */}
//                         <div className={cn("space-y-6 pt-6 border-t border-border/30 dark:border-border/20 transition-opacity duration-300 ease-in-out", selectedIdType ? "opacity-100" : "opacity-0 h-0 overflow-hidden pointer-events-none")}>
//                             {/* ID Number Field */}
//                             <FormField control={form.control} name="idNumber" render={({ field }) => ( <FormItem> <FormLabel>{selectedIdType === 'passport' ? 'Passport Number' : 'Permit / ID Number'} *</FormLabel> <FormControl><Input placeholder="Enter document number" {...field} /></FormControl> <FormDescription>Enter the full ID number.</FormDescription> <FormMessage /> </FormItem> )} />

//                             {/* Issue and Expiry Date Fields */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
//                                 <FormField control={form.control} name="idIssueDate" render={({ field }) => (
//                                     <FormItem className="flex flex-col"> <FormLabel>Date of Issue *</FormLabel>
//                                         <Popover>
//                                             <PopoverTrigger asChild>
//                                                 {/* FIX: Removed FormControl wrapper */}
//                                                 <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}> <CalendarIcon className="mr-2 h-4 w-4" /> {field.value && isDateValid(field.value) ? format(field.value, "PPP") : <span>Pick issue date</span>} </Button>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value && isDateValid(field.value) ? field.value : undefined} onSelect={(date) => { field.onChange(date); if (form.getValues("idExpiryDate")) { form.trigger("idExpiryDate"); } }} disabled={(date) => date > startOfDay(new Date()) || date < new Date("1950-01-01")} initialFocus captionLayout="dropdown-buttons" fromYear={1950} toYear={new Date().getFullYear()} /></PopoverContent>
//                                         </Popover> <FormMessage />
//                                     </FormItem>
//                                 )} />
//                                 <FormField control={form.control} name="idExpiryDate" render={({ field }) => (
//                                     <FormItem className="flex flex-col"> <FormLabel>Date of Expiry *</FormLabel>
//                                         <Popover>
//                                             <PopoverTrigger asChild>
//                                                  {/* FIX: Removed FormControl wrapper */}
//                                                 <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}> <CalendarIcon className="mr-2 h-4 w-4" /> {field.value && isDateValid(field.value) ? format(field.value, "PPP") : <span>Pick expiry date</span>} </Button>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value && isDateValid(field.value) ? field.value : undefined} onSelect={(date) => { field.onChange(date); form.trigger("idExpiryDate"); }} disabled={(date) => date < startOfDay(addDays(new Date(), 1))} initialFocus captionLayout="dropdown-buttons" fromYear={new Date().getFullYear()} toYear={new Date().getFullYear() + 30} /></PopoverContent>
//                                         </Popover> <FormDescription>Your ID must not be expired.</FormDescription><FormMessage />
//                                     </FormItem>
//                                 )} />
//                             </div>
//                         </div>

//                         {/* Navigation Buttons */}
//                         <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t dark:border-border/50 mt-6  gap-4">
//                              <button type="button" className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none" onClick={prevStep} disabled={isSubmitting}><ArrowLeft className="mr-2 size-4.5" /> Back</button>
//                              <button type="submit" className=" inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none" disabled={isSubmitting || !form.formState.isValid || !selectedIdType}>Continue {isSubmitting ? <Loader2 className="ml-2 size-4.5 animate-spin" /> : <ArrowRight className="ml-2 size-4.5" />}</button> {/* Disable if ID type not selected */}
//                         </div>
//                     </form>
//                 </Form>
//             </CardContent>
//         </Card>
//     );
// }





// // frontend/src/app/kyc/identity/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   format,
//   startOfDay,
//   parseISO,
//   isValid as isDateValid,
//   addDays,
//   subYears, // Import subYears
// } from "date-fns";
// import { cn } from "@/lib/utils";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
//   Calendar as CalendarIcon,
//   Loader2,
//   Fingerprint,
//   AlertTriangle,
//   ArrowRight,
//   ArrowLeft,
//   Check,
//   BookUser,
//   Contact,
// } from "lucide-react";

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from "../../contexts/KycContext";
// import type { IdType } from "@/app/services/kyc";

// // --- Zod Validation Schema ---
// const idTypeValues: [IdType, ...IdType[]] = ["passport", "resident_permit"];
// const identitySchema = z
//   .object({
//     idType: z.enum(idTypeValues, {
//       required_error: "Please select the type of ID you will upload.",
//     }),
//     idNumber: z
//       .string()
//       .trim()
//       .min(5, { message: "ID number must be at least 5 characters." })
//       .max(50, { message: "ID number cannot exceed 50 characters." }),
//     idIssueDate: z
//       .date({
//         required_error: "Issue date is required.",
//         invalid_type_error: "Please enter a valid issue date.",
//       })
//       .max(startOfDay(new Date()), {
//         message: "Issue date cannot be in the future.",
//       })
//       .min(new Date("1950-01-01"), {
//         message: "Issue date seems incorrect (before 1950).",
//       }),
//     idExpiryDate: z
//       .date({
//         required_error: "Expiry date is required.",
//         invalid_type_error: "Please enter a valid expiry date.",
//       })
//       .min(startOfDay(addDays(new Date(), 1)), {
//         message: "This ID appears to be expired or expires today.",
//       }),
//   })
//   .refine(
//     (data) =>
//       !data.idIssueDate || !data.idExpiryDate || data.idExpiryDate > data.idIssueDate,
//     {
//       message: "Expiry date must be after the issue date.",
//       path: ["idExpiryDate"],
//     }
//   );

// type IdentityFormData = z.infer<typeof identitySchema>;

// // --- Helper Arrays for Date Picker Dropdowns ---
// const datePickerYears = Array.from(
//   { length: 100 }, // Covers ~1924 to 2024, adjust range if needed
//   (_, i) => new Date().getFullYear() - 70 + i
// ).reverse(); // Show recent years first in dropdown, but covers a wide range past/future

// const datePickerMonths = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// // --- Component ---
// export default function KycIdentityPage() {
//   const {
//     kycData,
//     setKycData,
//     nextStep,
//     prevStep,
//     updateCurrentUiStepId,
//     isInitialized: kycInitialized,
//     backendStatus,
//     isLoadingStatus: kycLoadingStatus,
//   } = useKyc();

//   const [formError, setFormError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isPageLoading, setIsPageLoading] = useState(true);

//   // --- State for managing calendar views ---
//   const [issueCalendarDate, setIssueCalendarDate] = useState<Date>(
//     subYears(new Date(), 5) // Default view to 5 years ago
//   );
//   const [expiryCalendarDate, setExpiryCalendarDate] = useState<Date>(
//     new Date() // Default view to current month/year
//   );

//   const form = useForm<IdentityFormData>({
//     resolver: zodResolver(identitySchema),
//     defaultValues: {
//       idType: undefined,
//       idNumber: "",
//       idIssueDate: undefined,
//       idExpiryDate: undefined,
//     },
//     mode: "onChange",
//   });

//   // Effect 1: Set UI step
//   useEffect(() => {
//     if (kycInitialized && window.location.pathname === "/kyc/identity") {
//       updateCurrentUiStepId("identity");
//     }
//   }, [kycInitialized, updateCurrentUiStepId]);

//   // Effect 2: Load data from context and initialize calendar views
//   useEffect(() => {
//     if (!kycInitialized) {
//       setIsPageLoading(true);
//       return;
//     }
//     if (
//       !["not_started", "rejected", "skipped", "loading"].includes(
//         backendStatus as string
//       )
//     ) {
//       setIsPageLoading(false);
//       return; // Should redirect based on status eventually
//     }

//     setIsPageLoading(true);
//     const parseContextDate = (dateString?: string): Date | undefined => {
//       if (!dateString) return undefined;
//       try {
//         const date = parseISO(dateString);
//         return isDateValid(date) ? date : undefined;
//       } catch {
//         return undefined;
//       }
//     };

//     const initialIssueDate = parseContextDate(kycData.idIssueDate);
//     const initialExpiryDate = parseContextDate(kycData.idExpiryDate);

//     form.reset({
//       idType:
//         kycData.idType && idTypeValues.includes(kycData.idType)
//           ? kycData.idType
//           : undefined,
//       idNumber: kycData.idNumber || "",
//       idIssueDate: initialIssueDate,
//       idExpiryDate: initialExpiryDate,
//     });

//     // Set initial calendar views based on loaded data or defaults
//     setIssueCalendarDate(initialIssueDate || subYears(new Date(), 5));
//     setExpiryCalendarDate(initialExpiryDate || new Date());

//     setIsPageLoading(false);
//   }, [kycInitialized, backendStatus, kycData, form.reset]);

//   // --- Event Handlers ---
//   const onSubmit = useCallback(
//     (data: IdentityFormData) => {
//       setIsSubmitting(true);
//       setFormError(null);
//       try {
//         setKycData({
//           idType: data.idType,
//           idNumber: data.idNumber,
//           idIssueDate: format(data.idIssueDate, "yyyy-MM-dd"),
//           idExpiryDate: format(data.idExpiryDate, "yyyy-MM-dd"),
//         });
//         nextStep();
//       } catch (error: any) {
//         setFormError(error.message || "Failed to save progress.");
//         setIsSubmitting(false); // Ensure this is reset on error
//       }
//       // Do not reset submitting state here, nextStep causes navigation
//     },
//     [setKycData, nextStep]
//   );

//   // --- Date Picker Dropdown Handlers ---
//   const handleIssueYearChange = (year: string) => {
//     const newDate = new Date(issueCalendarDate);
//     newDate.setFullYear(Number.parseInt(year));
//     setIssueCalendarDate(newDate); // Update calendar view
//   };

//   const handleIssueMonthChange = (month: string) => {
//     const newDate = new Date(issueCalendarDate);
//     newDate.setMonth(datePickerMonths.indexOf(month));
//     setIssueCalendarDate(newDate); // Update calendar view
//   };

//   const handleExpiryYearChange = (year: string) => {
//     const newDate = new Date(expiryCalendarDate);
//     newDate.setFullYear(Number.parseInt(year));
//     setExpiryCalendarDate(newDate); // Update calendar view
//   };

//   const handleExpiryMonthChange = (month: string) => {
//     const newDate = new Date(expiryCalendarDate);
//     newDate.setMonth(datePickerMonths.indexOf(month));
//     setExpiryCalendarDate(newDate); // Update calendar view
//   };

//   const selectedIdType = form.watch("idType");

//   // --- Render Logic ---
//   if (isPageLoading || (kycLoadingStatus && !isPageLoading)) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }
//   if (
//     !["not_started", "rejected", "skipped", "loading"].includes(
//       backendStatus as string
//     )
//   ) {
//     // Redirect or show status message
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-xl border animate-fadeIn sm:p-8 p-4">
//       <CardHeader className="border-b pb-6 mb-6 space-y-2">
//           <CardTitle className="text-2xl font-semibold tracking-tight flex items-start gap-2 text-mainheading dark:text-white">  
//             <Fingerprint className="h-6 w-6 text-primary mt-1" />
//             Identity Document&nbsp;(Step {formStepOrder.indexOf("identity") + 1} of {formStepOrder.length})
//           </CardTitle>
//         <CardDescription className="text-gray-500 dark:text-gray-300">
//           Select the ID type and enter details exactly as shown on the document.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {formError && (
//           <Alert variant="destructive" className="mb-6">
//             <AlertTriangle className="h-4 w-4" />
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{formError}</AlertDescription>
//           </Alert>
//         )}
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             {/* ID Type Radio Group */}
//             <FormField
//               control={form.control}
//               name="idType"
//               render={({ field }) => (
//                 <FormItem className="space-y-4">
//                   <FormLabel className="text-base font-medium text-neutral-900 dark:text-white">
//                     Select ID Type *
//                   </FormLabel>
//                   <FormControl>
//                     <RadioGroup
//                       onValueChange={field.onChange}
//                       value={field.value ?? ""}
//                       className="grid grid-cols-1 sm:grid-cols-2 gap-4"
//                     >
//                       <FormItem>
//                         <FormControl>
//                           <RadioGroupItem
//                             value="passport"
//                             id="passport-radio"
//                             className="peer sr-only"
//                           />
//                         </FormControl>
//                         <FormLabel
//                           htmlFor="passport-radio"
//                           className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200"
//                         >
//                           <BookUser className="h-6 w-6 text-gray-500 dark:text-gray-300 mb-2" />
//                           <span className="font-semibold text-neutral-900 dark:text-white">Passport</span>
//                           <div className="h-5 mt-1">
//                             {field.value === "passport" && (
//                               <Check className="h-5 w-5 text-primary" />
//                             )}
//                           </div>
//                         </FormLabel>
//                       </FormItem>
//                       <FormItem>
//                         <FormControl>
//                           <RadioGroupItem
//                             value="resident_permit"
//                             id="resident_permit-radio"
//                             className="peer sr-only"
//                           />
//                         </FormControl>
//                         <FormLabel
//                           htmlFor="resident_permit-radio"
//                           className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200"
//                         >
//                           <Contact className="h-6 w-6 text-gray-500 dark:text-gray-300 mb-2" />
//                           <span className="font-semibold text-neutral-900 dark:text-white">
//                             Resident Permit / National ID
//                           </span>
//                           <div className="h-5 mt-1">
//                             {field.value === "resident_permit" && (
//                               <Check className="h-5 w-5 text-primary" />
//                             )}
//                           </div>
//                         </FormLabel>
//                       </FormItem>
//                     </RadioGroup>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Conditionally Rendered Fields */}
//             <div
//               className={cn(
//                 "space-y-6 pt-6 border-t transition-opacity duration-300 ease-in-out",
//                 selectedIdType
//                   ? "opacity-100"
//                   : "opacity-0 h-0 overflow-hidden pointer-events-none"
//               )}
//             >
//               {/* ID Number Field */}
//               <FormField
//                 control={form.control}
//                 name="idNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-neutral-900 dark:text-white">
//                       {selectedIdType === "passport"
//                         ? "Passport Number"
//                         : "Permit / ID Number"}{" "}
//                       *
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter document number" {...field} />
//                     </FormControl>
//                     <FormDescription className="text-gray-500 dark:text-gray-300">Enter the full ID number.</FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Issue and Expiry Date Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
//                 {/* ID Issue Date Field */}
//                 <FormField
//                   control={form.control}
//                   name="idIssueDate"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col">
//                       <FormLabel className="text-neutral-900 dark:text-white">Date of Issue *</FormLabel>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-full h-12 justify-start text-left font-normal", // Added h-12
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             <CalendarIcon className="mr-2 h-4 w-4" />
//                             {field.value && isDateValid(field.value) ? (
//                               format(field.value, "PPP")
//                             ) : (
//                               <span>Pick issue date</span>
//                             )}
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent
//                           align="start"
//                            className="sm:w-[450px] max-h-[--radix-popover-content-available-height]" // Use consistent width
//                         >
//                           {/* --- Month/Year Selectors --- */}
//                            <div className="flex items-center justify-between gap-2 p-3 border-b">
//                                <Select
//                                 value={datePickerMonths[issueCalendarDate.getMonth()]}
//                                 onValueChange={handleIssueMonthChange}
//                                >
//                                 <SelectTrigger className="w-36 h-8">
//                                     <SelectValue placeholder="Month" />
//                                 </SelectTrigger>
//                                 <SelectContent className="h-72">
//                                     {datePickerMonths.map((month) => (
//                                     <SelectItem key={month} value={month}>
//                                         {month}
//                                     </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                                </Select>

//                                <Select
//                                 value={issueCalendarDate.getFullYear().toString()}
//                                 onValueChange={handleIssueYearChange}
//                                >
//                                 <SelectTrigger className="w-28 h-8">
//                                     <SelectValue placeholder="Year" />
//                                 </SelectTrigger>
//                                 <SelectContent className="h-72">
//                                      {/* Use a relevant year range, e.g., last 70 years */}
//                                      {Array.from({ length: 71 }, (_, i) => new Date().getFullYear() - i).map((year) => (
//                                          <SelectItem key={year} value={year.toString()}>
//                                             {year}
//                                          </SelectItem>
//                                       ))}
//                                 </SelectContent>
//                                </Select>
//                             </div>
//                           {/* --- Calendar Component --- */}
//                           <Calendar
//                             mode="single"
//                             selected={
//                               field.value && isDateValid(field.value)
//                                 ? field.value
//                                 : undefined
//                             }
//                             onSelect={(date) => {
//                               field.onChange(date || undefined);
//                               if (date) {
//                                 setIssueCalendarDate(date); // Sync calendar view
//                               }
//                               // Trigger related field validation
//                               if (form.getValues("idExpiryDate")) {
//                                 form.trigger("idExpiryDate");
//                               }
//                                form.trigger("idIssueDate"); // Trigger self validation
//                             }}
//                             month={issueCalendarDate} // Control displayed month/year
//                             onMonthChange={setIssueCalendarDate} // Sync state when arrows used
//                             disabled={(date) =>
//                               date > startOfDay(new Date()) ||
//                               date < new Date("1950-01-01")
//                             }
//                             initialFocus
//                           />
//                         </PopoverContent>
//                       </Popover>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* ID Expiry Date Field */}
//                 <FormField
//                   control={form.control}
//                   name="idExpiryDate"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col">
//                       <FormLabel  className="text-neutral-900 dark:text-white">Date of Expiry *</FormLabel>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-full h-12 justify-start text-left font-normal", // Added h-12
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             <CalendarIcon className="mr-2 h-4 w-4" />
//                             {field.value && isDateValid(field.value) ? (
//                               format(field.value, "PPP")
//                             ) : (
//                               <span>Pick expiry date</span>
//                             )}
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent
//                            align="end"
//                            className="sm:w-[450px] max-h-[--radix-popover-content-available-height]" // Use consistent width
//                         >
//                            {/* --- Month/Year Selectors --- */}
//                             <div className="flex items-center justify-between gap-2 p-3 border-b">
//                                <Select
//                                 value={datePickerMonths[expiryCalendarDate.getMonth()]}
//                                 onValueChange={handleExpiryMonthChange}
//                                >
//                                 <SelectTrigger className="w-36 h-8">
//                                     <SelectValue placeholder="Month" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {datePickerMonths.map((month) => (
//                                     <SelectItem key={month} value={month}>
//                                         {month}
//                                     </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                                </Select>

//                                <Select
//                                 value={expiryCalendarDate.getFullYear().toString()}
//                                 onValueChange={handleExpiryYearChange}
//                                >
//                                 <SelectTrigger className="w-28 h-8">
//                                     <SelectValue placeholder="Year" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                      {/* Use a relevant year range, e.g., next 30 years */}
//                                      {Array.from({ length: 31 }, (_, i) => new Date().getFullYear() + i).map((year) => (
//                                          <SelectItem key={year} value={year.toString()}>
//                                              {year}
//                                          </SelectItem>
//                                      ))}
//                                 </SelectContent>
//                                </Select>
//                             </div>
//                           {/* --- Calendar Component --- */}
//                           <Calendar
//                             mode="single"
//                             selected={
//                               field.value && isDateValid(field.value)
//                                 ? field.value
//                                 : undefined
//                             }
//                             onSelect={(date) => {
//                               field.onChange(date || undefined);
//                               if (date) {
//                                 setExpiryCalendarDate(date); // Sync calendar view
//                               }
//                               form.trigger("idExpiryDate"); // Trigger self validation
//                             }}
//                             month={expiryCalendarDate} // Control displayed month/year
//                             onMonthChange={setExpiryCalendarDate} // Sync state when arrows used
//                             disabled={(date) =>
//                               date < startOfDay(addDays(new Date(), 1))
//                             }
//                             initialFocus
//                           />
//                         </PopoverContent>
//                       </Popover>
//                       <FormDescription className="text-gray-500 dark:text-gray-300">
//                         Your ID must not be expired.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-4">
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//                 onClick={prevStep}
//                 disabled={isSubmitting}
//               >
//                 <ArrowLeft className="mr-2 size-4.5" /> Back
//               </button>
//               <button
//                 type="submit"
//                 className=" inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//                 disabled={
//                   isSubmitting || !form.formState.isValid || !selectedIdType
//                 }
//               >
//                 Continue{" "}
//                 {isSubmitting ? (
//                   <Loader2 className="ml-2 size-4.5 animate-spin" />
//                 ) : (
//                   <ArrowRight className="ml-2 size-4.5" />
//                 )}
//               </button>{" "}
//               {/* Disable if ID type not selected */}
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }





// // frontend/src/app/kyc/identity/page.tsx
// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   format,
//   startOfDay,
//   parseISO,
//   isValid as isDateValid,
//   addDays,
//   subYears,
// } from "date-fns";
// import { cn } from "@/lib/utils";

// // --- UI Components ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Calendar as CalendarIcon,
//   Loader2,
//   Fingerprint,
//   AlertTriangle,
//   ArrowRight,
//   ArrowLeft,
//   Check,
//   BookUser,
//   Contact,
// } from "lucide-react";

// // --- App Specific Imports ---
// import { useKyc, formStepOrder } from "../../contexts/KycContext";
// import type { IdType } from "@/app/services/kyc";

// // --- Zod Validation Schema ---
// const idTypeValues: [IdType, ...IdType[]] = ["passport", "resident_permit"];

// // Base date validation constants
// const todayStart = startOfDay(new Date());
// const minIssueDate = new Date("1950-01-01");
// const minExpiryDate = startOfDay(addDays(new Date(), 1));

// const identitySchema = z
//   .object({
//     idType: z.enum(idTypeValues, {
//       required_error: "Please select the type of ID you will upload.",
//     }),
//     idNumber: z.string().trim().optional(),
//     idIssueDate: z.date().optional(),
//     idExpiryDate: z.date().optional(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.idType) {
//       // --- ID Number Validation ---
//       const idNumberMinLength = 5;
//       const idNumberMaxLength = 50;
//       if (!data.idNumber || data.idNumber.length < idNumberMinLength) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.too_small,
//           minimum: idNumberMinLength,
//           type: "string", // Required for too_small/string
//           inclusive: true, // Required for too_small
//           message: `ID number must be at least ${idNumberMinLength} characters.`,
//           path: ["idNumber"],
//         });
//       } else if (data.idNumber.length > idNumberMaxLength) {
//          ctx.addIssue({
//           code: z.ZodIssueCode.too_big,
//           maximum: idNumberMaxLength,
//           type: "string", // Required for too_big/string
//           inclusive: true, // Required for too_big
//           message: `ID number cannot exceed ${idNumberMaxLength} characters.`,
//           path: ["idNumber"],
//         });
//       }

//       // --- ID Issue Date Validation ---
//       if (!data.idIssueDate) {
//         ctx.addIssue({
//           // invalid_date doesn't require extra props beyond message/path
//           code: z.ZodIssueCode.invalid_date,
//           message: "Issue date is required.",
//           path: ["idIssueDate"],
//         });
//       } else {
//          if (!isDateValid(data.idIssueDate)) {
//             ctx.addIssue({
//                 code: z.ZodIssueCode.invalid_date,
//                 message: "Please enter a valid issue date.",
//                 path: ["idIssueDate"],
//             });
//          // ***** FIX HERE *****
//          } else if (data.idIssueDate > todayStart) {
//             ctx.addIssue({
//                 code: z.ZodIssueCode.too_big,
//                 type: "date", // Required for too_big/date
//                 maximum: todayStart.getTime(), // Required for too_big/date (use timestamp)
//                 inclusive: true, // Required for too_big/date (max date is inclusive)
//                 message: "Issue date cannot be in the future.",
//                 path: ["idIssueDate"],
//             });
//          // ***** FIX HERE *****
//          } else if (data.idIssueDate < minIssueDate) {
//             ctx.addIssue({
//                 code: z.ZodIssueCode.too_small,
//                 type: "date", // Required for too_small/date
//                 minimum: minIssueDate.getTime(), // Required for too_small/date (use timestamp)
//                 inclusive: true, // Required for too_small/date (min date is inclusive)
//                 message: "Issue date seems incorrect (before 1950).",
//                 path: ["idIssueDate"],
//             });
//          }
//       }

//       // --- ID Expiry Date Validation ---
//       if (!data.idExpiryDate) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.invalid_date,
//           message: "Expiry date is required.",
//           path: ["idExpiryDate"],
//         });
//        } else {
//          if (!isDateValid(data.idExpiryDate)) {
//             ctx.addIssue({
//                 code: z.ZodIssueCode.invalid_date,
//                 message: "Please enter a valid expiry date.",
//                 path: ["idExpiryDate"],
//             });
//          // ***** FIX HERE *****
//          } else if (data.idExpiryDate < minExpiryDate) {
//             ctx.addIssue({
//                 code: z.ZodIssueCode.too_small,
//                 type: "date", // Required for too_small/date
//                 minimum: minExpiryDate.getTime(), // Required for too_small/date (use timestamp)
//                 inclusive: true, // Required for too_small/date (min date is inclusive)
//                 message: "This ID appears to be expired or expires today.",
//                 path: ["idExpiryDate"],
//             });
//          }
//        }

//       // --- Cross-Field Date Validation (Expiry vs Issue) ---
//       if (data.idIssueDate && isDateValid(data.idIssueDate) &&
//           data.idExpiryDate && isDateValid(data.idExpiryDate) &&
//           data.idExpiryDate <= data.idIssueDate) {
//          ctx.addIssue({
//             code: z.ZodIssueCode.custom, // custom is fine with just message/path
//             message: "Expiry date must be after the issue date.",
//             path: ["idExpiryDate"],
//          });
//       }
//     }
//   });


// type IdentityFormData = z.infer<typeof identitySchema>;

// // --- Helper Arrays for Date Picker Dropdowns ---
// const datePickerMonths = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// // --- Component ---
// export default function KycIdentityPage() {
//   const {
//     kycData,
//     setKycData,
//     nextStep,
//     prevStep,
//     updateCurrentUiStepId,
//     isInitialized: kycInitialized,
//     backendStatus,
//     isLoadingStatus: kycLoadingStatus,
//   } = useKyc();

//   const [formError, setFormError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isPageLoading, setIsPageLoading] = useState(true);

//   const [issueCalendarDate, setIssueCalendarDate] = useState<Date>(
//     subYears(new Date(), 5)
//   );
//   const [expiryCalendarDate, setExpiryCalendarDate] = useState<Date>(
//     new Date()
//   );

//   const form = useForm<IdentityFormData>({
//     resolver: zodResolver(identitySchema),
//     defaultValues: {
//       idType: undefined,
//       idNumber: "",
//       idIssueDate: undefined,
//       idExpiryDate: undefined,
//     },
//     mode: "onChange",
//   });

//   // Effect 1: Set UI step
//   useEffect(() => {
//     if (kycInitialized && window.location.pathname === "/kyc/identity") {
//       updateCurrentUiStepId("identity");
//     }
//   }, [kycInitialized, updateCurrentUiStepId]);

//   // Effect 2: Load data from context and initialize calendar views
//   useEffect(() => {
//     if (!kycInitialized) {
//       setIsPageLoading(true);
//       return;
//     }
//     if (
//       !["not_started", "rejected", "skipped", "loading"].includes(
//         backendStatus as string
//       )
//     ) {
//       setIsPageLoading(false);
//       return;
//     }

//     setIsPageLoading(true);
//     const parseContextDate = (dateString?: string): Date | undefined => {
//       if (!dateString) return undefined;
//       try {
//         const date = parseISO(dateString);
//         return isDateValid(date) ? date : undefined;
//       } catch {
//         return undefined;
//       }
//     };

//     const initialIssueDate = parseContextDate(kycData.idIssueDate);
//     const initialExpiryDate = parseContextDate(kycData.idExpiryDate);

//     const defaultIdType = kycData.idType && idTypeValues.includes(kycData.idType)
//         ? kycData.idType
//         : undefined;

//     form.reset({
//       idType: defaultIdType,
//       idNumber: kycData.idNumber || "",
//       idIssueDate: initialIssueDate,
//       idExpiryDate: initialExpiryDate,
//     });

//     if (defaultIdType) {
//         // Use a timeout to allow state update before triggering validation
//         // This can sometimes help if validation relies on watched values updated slightly later
//         setTimeout(() => form.trigger(), 0);
//     }

//     setIssueCalendarDate(initialIssueDate || subYears(new Date(), 5));
//     setExpiryCalendarDate(initialExpiryDate || new Date());

//     setIsPageLoading(false);
//   }, [kycInitialized, backendStatus, kycData, form.reset, form.trigger]);


//   const onSubmit = useCallback(
//     (data: IdentityFormData) => {
//       if (!data.idType || !data.idNumber || !data.idIssueDate || !data.idExpiryDate) {
//           setFormError("Please fill in all required fields.");
//           setIsSubmitting(false);
//           return;
//       }

//       setIsSubmitting(true);
//       setFormError(null);
//       try {
//         setKycData({
//           idType: data.idType,
//           idNumber: data.idNumber,
//           idIssueDate: format(data.idIssueDate, "yyyy-MM-dd"),
//           idExpiryDate: format(data.idExpiryDate, "yyyy-MM-dd"),
//         });
//         nextStep();
//       } catch (error: any) {
//         setFormError(error.message || "Failed to save progress.");
//         setIsSubmitting(false);
//       }
//     },
//     [setKycData, nextStep]
//   );

//   const handleIssueYearChange = (year: string) => {
//     const newDate = new Date(issueCalendarDate);
//     newDate.setFullYear(Number.parseInt(year));
//     if (isDateValid(newDate)) {
//         setIssueCalendarDate(newDate);
//     }
//   };

//   const handleIssueMonthChange = (month: string) => {
//     const newDate = new Date(issueCalendarDate);
//     newDate.setMonth(datePickerMonths.indexOf(month));
//     if (isDateValid(newDate)) {
//        setIssueCalendarDate(newDate);
//     }
//   };

//   const handleExpiryYearChange = (year: string) => {
//     const newDate = new Date(expiryCalendarDate);
//     newDate.setFullYear(Number.parseInt(year));
//     if (isDateValid(newDate)) {
//       setExpiryCalendarDate(newDate);
//     }
//   };

//   const handleExpiryMonthChange = (month: string) => {
//     const newDate = new Date(expiryCalendarDate);
//     newDate.setMonth(datePickerMonths.indexOf(month));
//     if (isDateValid(newDate)) {
//       setExpiryCalendarDate(newDate);
//     }
//   };

//   const selectedIdType = form.watch("idType");

//   // --- Render Logic ---
//   if (isPageLoading || (kycLoadingStatus && !isPageLoading)) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }
//   if (
//     !["not_started", "rejected", "skipped", "loading"].includes(
//       backendStatus as string
//     )
//   ) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-none border animate-fadeIn sm:p-8 p-4">
//       <CardHeader className="border-b pb-6 mb-6 space-y-2">
//         <CardTitle className="sm:text-2xl text-xl font-semibold tracking-tight flex items-start gap-2 text-mainheading dark:text-white">
//           <Fingerprint className="h-6 w-6 text-primary mt-1" />
//           Identity Document (Step {formStepOrder.indexOf("identity") +
//             1} of {formStepOrder.length})
//         </CardTitle>
//         <CardDescription className="text-gray-500 dark:text-gray-300">
//           Select the ID type and enter details exactly as shown on the document.
//           Fields marked with <span className="text-red-500">*</span> are
//           required once an ID type is selected.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {formError && (
//           <Alert className="bg-red-50 dark:bg-red-900/25 border-red-500 rounded-lg p-4 gap-3 mb-6">
//             <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
//               <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
//             </div>
//             <div>
//               <AlertTitle className="font-medium tracking-normal text-red-800 dark:text-red-200 text-base">
//                 Error
//               </AlertTitle>
//               <AlertDescription className="text-red/700 dark:text-red-300/90">
//                 {formError}
//               </AlertDescription>
//             </div>
//           </Alert>
//         )}
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             {/* ID Type Radio Group */}
//             <FormField
//               control={form.control}
//               name="idType"
//               render={({ field }) => (
//                 <FormItem className="space-y-4">
//                   <FormLabel className="text-base font-medium text-neutral-900 dark:text-white">
//                     Select ID Type <span className="text-red-500">*</span>
//                   </FormLabel>
//                   <FormControl>
//                     <RadioGroup
//                       onValueChange={field.onChange}
//                       value={field.value ?? ""}
//                       className="grid grid-cols-1 sm:grid-cols-2 gap-4"
//                     >
//                       <FormItem>
//                         <FormControl>
//                           <RadioGroupItem
//                             value="passport"
//                             id="passport-radio"
//                             className="peer sr-only"
//                           />
//                         </FormControl>
//                         <FormLabel
//                           htmlFor="passport-radio"
//                           className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200"
//                         >
//                           <BookUser className="h-6 w-6 text-gray-500 dark:text-gray-300 mb-2" />
//                           <span className="font-semibold text-neutral-900 dark:text-white">
//                             Passport
//                           </span>
//                           <div className="h-5 mt-1">
//                             {field.value === "passport" && (
//                               <Check className="h-5 w-5 text-primary" />
//                             )}
//                           </div>
//                         </FormLabel>
//                       </FormItem>
//                       <FormItem>
//                         <FormControl>
//                           <RadioGroupItem
//                             value="resident_permit"
//                             id="resident_permit-radio"
//                             className="peer sr-only"
//                           />
//                         </FormControl>
//                         <FormLabel
//                           htmlFor="resident_permit-radio"
//                           className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200"
//                         >
//                           <Contact className="h-6 w-6 text-gray-500 dark:text-gray-300 mb-2" />
//                           <span className="font-semibold text-neutral-900 dark:text-white">
//                             Resident Permit / National ID
//                           </span>
//                           <div className="h-5 mt-1">
//                             {field.value === "resident_permit" && (
//                               <Check className="h-5 w-5 text-primary" />
//                             )}
//                           </div>
//                         </FormLabel>
//                       </FormItem>
//                     </RadioGroup>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Conditionally Rendered Fields */}
//             <div
//               className={cn(
//                 "space-y-6 pt-6 border-t transition-opacity duration-300 ease-in-out",
//                 selectedIdType
//                   ? "opacity-100"
//                   : "opacity-0 h-0 overflow-hidden pointer-events-none"
//               )}
//               aria-hidden={!selectedIdType}
//             >
//               {/* ID Number Field */}
//               <FormField
//                 control={form.control}
//                 name="idNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-neutral-900 dark:text-white">
//                       {selectedIdType === "passport"
//                         ? "Passport Number"
//                         : "Permit / ID Number"}{" "}
//                       <span className="text-red-500">*</span>
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter document number"
//                         {...field}
//                         disabled={!selectedIdType || isSubmitting}
//                         aria-required="true"
//                         value={field.value ?? ""}
//                       />
//                     </FormControl>
//                     <FormDescription className="text-gray-500 dark:text-gray-300">
//                       Enter the full ID number.
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Issue and Expiry Date Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
//                 {/* ID Issue Date Field */}
//                 <FormField
//                   control={form.control}
//                   name="idIssueDate"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col">
//                       <FormLabel className="text-neutral-900 dark:text-white">
//                         Date of Issue <span className="text-red-500">*</span>
//                       </FormLabel>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant={"outline"}
//                             disabled={!selectedIdType || isSubmitting}
//                             className={cn(
//                               "w-full h-12 justify-start text-left font-normal",
//                               !field.value && "text-muted-foreground"
//                             )}
//                             aria-required="true"
//                           >
//                             <CalendarIcon className="mr-2 h-4 w-4" />
//                             {field.value && isDateValid(field.value) ? (
//                               format(field.value, "PPP")
//                             ) : (
//                               <span>Pick issue date</span>
//                             )}
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent
//                           align="start"
//                           className="sm:w-[450px] max-h-[calc(var(--radix-popover-content-available-height)_-_1rem)] w-auto p-0"
//                         >
//                           <div className="flex items-center justify-between gap-2 p-3 border-b">
//                             <Select
//                               value={
//                                 datePickerMonths[issueCalendarDate.getMonth()]
//                               }
//                               onValueChange={handleIssueMonthChange}
//                             >
//                               <SelectTrigger className="w-36 h-8">
//                                 <SelectValue placeholder="Month" />
//                               </SelectTrigger>
//                               <SelectContent className="max-h-60 overflow-y-auto">
//                                 {datePickerMonths.map((month) => (
//                                   <SelectItem key={month} value={month}>
//                                     {month}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                             <Select
//                               value={issueCalendarDate.getFullYear().toString()}
//                               onValueChange={handleIssueYearChange}
//                             >
//                               <SelectTrigger className="w-28 h-8">
//                                 <SelectValue placeholder="Year" />
//                               </SelectTrigger>
//                               <SelectContent className="max-h-60 overflow-y-auto">
//                                 {Array.from(
//                                   { length: 71 },
//                                   (_, i) => new Date().getFullYear() - i
//                                 ).map((year) => (
//                                   <SelectItem
//                                     key={year}
//                                     value={year.toString()}
//                                   >
//                                     {year}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <Calendar
//                             mode="single"
//                             selected={
//                               field.value && isDateValid(field.value)
//                                 ? field.value
//                                 : undefined
//                             }
//                             onSelect={(date) => {
//                               field.onChange(date || undefined);
//                               field.onBlur(); // Trigger validation after selection
//                               if (date) {
//                                 setIssueCalendarDate(date);
//                               }
//                             }}
//                             month={issueCalendarDate}
//                             onMonthChange={setIssueCalendarDate}
//                             disabled={(date) =>
//                               date > startOfDay(new Date()) ||
//                               date < new Date("1950-01-01")
//                             }
//                             initialFocus
//                           />
//                         </PopoverContent>
//                       </Popover>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* ID Expiry Date Field */}
//                 <FormField
//                   control={form.control}
//                   name="idExpiryDate"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col">
//                       <FormLabel className="text-neutral-900 dark:text-white">
//                         Date of Expiry <span className="text-red-500">*</span>
//                       </FormLabel>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant={"outline"}
//                             disabled={!selectedIdType || isSubmitting}
//                             className={cn(
//                               "w-full h-12 justify-start text-left font-normal",
//                               !field.value && "text-muted-foreground"
//                             )}
//                             aria-required="true"
//                           >
//                             <CalendarIcon className="mr-2 h-4 w-4" />
//                             {field.value && isDateValid(field.value) ? (
//                               format(field.value, "PPP")
//                             ) : (
//                               <span>Pick expiry date</span>
//                             )}
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent
//                           align="end"
//                           className="sm:w-[450px] max-h-[calc(var(--radix-popover-content-available-height)_-_1rem)] w-auto p-0"
//                         >
//                           <div className="flex items-center justify-between gap-2 p-3 border-b">
//                             <Select
//                               value={
//                                 datePickerMonths[expiryCalendarDate.getMonth()]
//                               }
//                               onValueChange={handleExpiryMonthChange}
//                             >
//                               <SelectTrigger className="w-36 h-8">
//                                 <SelectValue placeholder="Month" />
//                               </SelectTrigger>
//                               <SelectContent className="max-h-60 overflow-y-auto">
//                                 {datePickerMonths.map((month) => (
//                                   <SelectItem key={month} value={month}>
//                                     {month}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                             <Select
//                               value={expiryCalendarDate
//                                 .getFullYear()
//                                 .toString()}
//                               onValueChange={handleExpiryYearChange}
//                             >
//                               <SelectTrigger className="w-28 h-8">
//                                 <SelectValue placeholder="Year" />
//                               </SelectTrigger>
//                               <SelectContent className="max-h-60 overflow-y-auto">
//                                 {Array.from(
//                                   { length: 31 },
//                                   (_, i) => new Date().getFullYear() + i
//                                 ).map((year) => (
//                                   <SelectItem
//                                     key={year}
//                                     value={year.toString()}
//                                   >
//                                     {year}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <Calendar
//                             mode="single"
//                             selected={
//                               field.value && isDateValid(field.value)
//                                 ? field.value
//                                 : undefined
//                             }
//                             onSelect={(date) => {
//                               field.onChange(date || undefined);
//                               field.onBlur(); // Trigger validation after selection
//                               if (date) {
//                                 setExpiryCalendarDate(date);
//                               }
//                             }}
//                             month={expiryCalendarDate}
//                             onMonthChange={setExpiryCalendarDate}
//                             disabled={(date) =>
//                               date < startOfDay(addDays(new Date(), 1))
//                             }
//                             initialFocus
//                           />
//                         </PopoverContent>
//                       </Popover>
//                       <FormDescription className="text-gray-500 dark:text-gray-300">
//                         Your ID must not be expired.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-4">
//               <button
//                 type="button"
//                 className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
//                 onClick={prevStep}
//                 disabled={isSubmitting}
//               >
//                 <ArrowLeft className="mr-2 size-4.5" /> Back
//               </button>
//               <button
//                 type="submit"
//                 className=" inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={
//                   isSubmitting || !selectedIdType || !form.formState.isValid
//                 }
//               >
//                 {isSubmitting ? (
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



// frontend/src/app/kyc/identity/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  format,
  startOfDay,
  parseISO,
  isValid as isDateValid,
  addDays,
  subYears,
} from "date-fns";
import { cn } from "@/lib/utils";

// --- UI Components ---
import { Button } from "@/components/ui/button"; // Keep for PopoverTrigger asChild, but not for nav buttons
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Loader2, // This can be removed if the SVG is used directly
  Fingerprint,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Check,
  BookUser,
  Contact,
} from "lucide-react";

// --- App Specific Imports ---
import { useKyc, formStepOrder } from "../../contexts/KycContext";
import type { IdType } from "@/app/services/kyc";

// --- Zod Validation Schema ---
const idTypeValues: [IdType, ...IdType[]] = ["passport", "resident_permit"];

// Base date validation constants
const todayStart = startOfDay(new Date());
const minIssueDate = new Date("1950-01-01");
const minExpiryDate = startOfDay(addDays(new Date(), 1));

const identitySchema = z
  .object({
    idType: z.enum(idTypeValues, {
      required_error: "Please select the type of ID you will upload.",
    }),
    idNumber: z.string().trim().optional(),
    idIssueDate: z.date().optional(),
    idExpiryDate: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.idType) {
      // --- ID Number Validation ---
      const idNumberMinLength = 5;
      const idNumberMaxLength = 50;
      if (!data.idNumber || data.idNumber.length < idNumberMinLength) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: idNumberMinLength,
          type: "string",
          inclusive: true,
          message: `ID number must be at least ${idNumberMinLength} characters.`,
          path: ["idNumber"],
        });
      } else if (data.idNumber.length > idNumberMaxLength) {
         ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: idNumberMaxLength,
          type: "string",
          inclusive: true,
          message: `ID number cannot exceed ${idNumberMaxLength} characters.`,
          path: ["idNumber"],
        });
      }

      // --- ID Issue Date Validation ---
      if (!data.idIssueDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: "Issue date is required.",
          path: ["idIssueDate"],
        });
      } else {
         if (!isDateValid(data.idIssueDate)) {
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_date,
                message: "Please enter a valid issue date.",
                path: ["idIssueDate"],
            });
         } else if (data.idIssueDate > todayStart) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_big,
                type: "date",
                maximum: todayStart.getTime(),
                inclusive: true,
                message: "Issue date cannot be in the future.",
                path: ["idIssueDate"],
            });
         } else if (data.idIssueDate < minIssueDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_small,
                type: "date",
                minimum: minIssueDate.getTime(),
                inclusive: true,
                message: "Issue date seems incorrect (before 1950).",
                path: ["idIssueDate"],
            });
         }
      }

      // --- ID Expiry Date Validation ---
      if (!data.idExpiryDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: "Expiry date is required.",
          path: ["idExpiryDate"],
        });
       } else {
         if (!isDateValid(data.idExpiryDate)) {
            ctx.addIssue({
                code: z.ZodIssueCode.invalid_date,
                message: "Please enter a valid expiry date.",
                path: ["idExpiryDate"],
            });
         } else if (data.idExpiryDate < minExpiryDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_small,
                type: "date",
                minimum: minExpiryDate.getTime(),
                inclusive: true,
                message: "This ID appears to be expired or expires today.",
                path: ["idExpiryDate"],
            });
         }
       }

      // --- Cross-Field Date Validation (Expiry vs Issue) ---
      if (data.idIssueDate && isDateValid(data.idIssueDate) &&
          data.idExpiryDate && isDateValid(data.idExpiryDate) &&
          data.idExpiryDate <= data.idIssueDate) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Expiry date must be after the issue date.",
            path: ["idExpiryDate"],
         });
      }
    }
  });


type IdentityFormData = z.infer<typeof identitySchema>;

// --- Helper Arrays for Date Picker Dropdowns ---
const datePickerMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// --- Component ---
export default function KycIdentityPage() {
  const {
    kycData,
    setKycData,
    nextStep,
    prevStep,
    updateCurrentUiStepId,
    isInitialized: kycInitialized,
    backendStatus,
    isLoadingStatus: kycLoadingStatus,
  } = useKyc();

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // State for calendar navigation (month/year view)
  const [issueCalendarDate, setIssueCalendarDate] = useState<Date>(
    subYears(new Date(), 5)
  );
  const [expiryCalendarDate, setExpiryCalendarDate] = useState<Date>(
    new Date()
  );

  // State for popover open/close
  const [issueDatePickerOpen, setIssueDatePickerOpen] = useState(false);
  const [expiryDatePickerOpen, setExpiryDatePickerOpen] = useState(false);

  // State for temporarily selected date in popover
  const [tempIssueDate, setTempIssueDate] = useState<Date | undefined>(undefined);
  const [tempExpiryDate, setTempExpiryDate] = useState<Date | undefined>(undefined);


  const form = useForm<IdentityFormData>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      idType: undefined,
      idNumber: "",
      idIssueDate: undefined,
      idExpiryDate: undefined,
    },
    mode: "onChange",
  });

  // Effect 1: Set UI step
  useEffect(() => {
    if (kycInitialized && window.location.pathname === "/kyc/identity") {
      updateCurrentUiStepId("identity");
    }
  }, [kycInitialized, updateCurrentUiStepId]);

  // Effect 2: Load data from context and initialize calendar views
  useEffect(() => {
    if (!kycInitialized) {
      setIsPageLoading(true);
      return;
    }
    if (
      !["not_started", "rejected", "skipped", "loading"].includes(
        backendStatus as string
      )
    ) {
      setIsPageLoading(false);
      return;
    }

    setIsPageLoading(true);
    const parseContextDate = (dateString?: string): Date | undefined => {
      if (!dateString) return undefined;
      try {
        const date = parseISO(dateString);
        return isDateValid(date) ? date : undefined;
      } catch {
        return undefined;
      }
    };

    const initialIssueDate = parseContextDate(kycData.idIssueDate);
    const initialExpiryDate = parseContextDate(kycData.idExpiryDate);

    const defaultIdType = kycData.idType && idTypeValues.includes(kycData.idType)
        ? kycData.idType
        : undefined;

    form.reset({
      idType: defaultIdType,
      idNumber: kycData.idNumber || "",
      idIssueDate: initialIssueDate,
      idExpiryDate: initialExpiryDate,
    });

    if (defaultIdType) {
        setTimeout(() => form.trigger(), 0);
    }

    setIssueCalendarDate(initialIssueDate || subYears(new Date(), 5));
    setExpiryCalendarDate(initialExpiryDate || new Date());
    
    setTempIssueDate(initialIssueDate);
    setTempExpiryDate(initialExpiryDate);

    setIsPageLoading(false);
  }, [kycInitialized, backendStatus, kycData, form.reset, form.trigger]);


  const onSubmit = useCallback(
    (data: IdentityFormData) => {
      if (!data.idType || !data.idNumber || !data.idIssueDate || !data.idExpiryDate) {
          setFormError("Please fill in all required fields.");
          return;
      }

      setIsSubmitting(true);
      setFormError(null);
      try {
        setKycData({
          idType: data.idType,
          idNumber: data.idNumber,
          idIssueDate: format(data.idIssueDate, "yyyy-MM-dd"),
          idExpiryDate: format(data.idExpiryDate, "yyyy-MM-dd"),
        });
        nextStep();
      } catch (error: any) {
        setFormError(error.message || "Failed to save progress.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [setKycData, nextStep]
  );

  const handleIssueYearChange = (year: string) => {
    const newDate = new Date(issueCalendarDate);
    newDate.setFullYear(Number.parseInt(year));
    if (isDateValid(newDate)) {
        setIssueCalendarDate(newDate);
    }
  };

  const handleIssueMonthChange = (month: string) => {
    const newDate = new Date(issueCalendarDate);
    newDate.setMonth(datePickerMonths.indexOf(month));
    if (isDateValid(newDate)) {
       setIssueCalendarDate(newDate);
    }
  };

  const handleExpiryYearChange = (year: string) => {
    const newDate = new Date(expiryCalendarDate);
    newDate.setFullYear(Number.parseInt(year));
    if (isDateValid(newDate)) {
      setExpiryCalendarDate(newDate);
    }
  };

  const handleExpiryMonthChange = (month: string) => {
    const newDate = new Date(expiryCalendarDate);
    newDate.setMonth(datePickerMonths.indexOf(month));
    if (isDateValid(newDate)) {
      setExpiryCalendarDate(newDate);
    }
  };

  const selectedIdType = form.watch("idType");

  // --- Render Logic ---
  if (isPageLoading || (kycLoadingStatus && !isPageLoading)) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (
    !["not_started", "rejected", "skipped", "loading"].includes(
      backendStatus as string
    )
  ) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-none border animate-fadeIn sm:p-8 p-4">
      <CardHeader className="border-b pb-6 mb-6 space-y-2">
        <CardTitle className="sm:text-2xl text-xl font-semibold tracking-tight flex items-start gap-2 text-mainheading dark:text-white">
          <Fingerprint className="h-6 w-6 text-primary mt-1" />
          Identity Document (Step {formStepOrder.indexOf("identity") +
            1} of {formStepOrder.length})
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-300">
          Select the ID type and enter details exactly as shown on the document.
          Fields marked with <span className="text-red-500">*</span> are
          required once an ID type is selected.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formError && (
          <Alert className="bg-red-50 dark:bg-red-900/25 border-red-500 rounded-lg p-4 gap-3 mb-6">
            <div className="flex-shrink-0 sm:size-12 size-10  rounded-full flex items-center justify-center bg-red-600/20">
              <AlertTriangle className="text-red-600 dark:text-red-500 size-5 sm:size-6 flex-shrink-0" />
            </div>
            <div>
              <AlertTitle className="font-medium tracking-normal text-red-800 dark:text-red-200 text-base">
                Error
              </AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300/90"> {/* Corrected typo, removed variant */}
                {formError}
              </AlertDescription>
            </div>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* ID Type Radio Group */}
            <FormField
              control={form.control}
              name="idType"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-base font-medium text-neutral-900 dark:text-white">
                    Select ID Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value as IdType);
                      }}
                      value={field.value ?? ""}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            value="passport"
                            id="passport-radio"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="passport-radio"
                          className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200" // Reverted: removed min-h, text-center
                        >
                          <BookUser className="h-6 w-6 text-gray-500 dark:text-gray-300 mb-2" />
                          <span className="font-semibold text-neutral-900 dark:text-white"> {/* Reverted: removed text-center */}
                            Passport
                          </span>
                          <div className="h-5 mt-1">
                            {field.value === "passport" && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            value="resident_permit"
                            id="resident_permit-radio"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="resident_permit-radio"
                          className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200" // Reverted: removed min-h, text-center
                        >
                          <Contact className="h-6 w-6 text-gray-500 dark:text-gray-300 mb-2" />
                          <span className="font-semibold text-neutral-900 dark:text-white"> {/* Reverted: removed text-center */}
                            Resident Permit / National ID
                          </span>
                          <div className="h-5 mt-1">
                            {field.value === "resident_permit" && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditionally Rendered Fields */}
            <div
              className={cn(
                "space-y-6 pt-6 border-t transition-opacity duration-300 ease-in-out",
                selectedIdType
                  ? "opacity-100"
                  : "opacity-0 h-0 overflow-hidden pointer-events-none"
              )}
              aria-hidden={!selectedIdType}
            >
              {/* ID Number Field */}
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-900 dark:text-white">
                      {selectedIdType === "passport"
                        ? "Passport Number"
                        : "Permit / ID Number"}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter document number"
                        {...field}
                        disabled={!selectedIdType || isSubmitting}
                        aria-required="true"
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 dark:text-gray-300">
                      Enter the full ID number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Issue and Expiry Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                {/* ID Issue Date Field */}
                <FormField
                  control={form.control}
                  name="idIssueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-neutral-900 dark:text-white">
                        Date of Issue <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover
                        open={issueDatePickerOpen}
                        onOpenChange={(isOpen) => {
                          setIssueDatePickerOpen(isOpen);
                          if (isOpen) {
                            setTempIssueDate(field.value); 
                            if (field.value && isDateValid(field.value)) {
                              setIssueCalendarDate(field.value); 
                            }
                          }
                        }}
                      >
                        <PopoverTrigger asChild>
                          {/* Using ShadCN Button for PopoverTrigger */}
                          <Button 
                            variant={"outline"}
                            disabled={!selectedIdType || isSubmitting}
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            aria-required="true"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value && isDateValid(field.value) ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick issue date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="sm:w-[450px] max-h-[calc(var(--radix-popover-content-available-height)_-_1rem)] w-auto p-0 overflow-y-auto"
                        >
                          <div className="flex items-center justify-between gap-2 p-3 border-b">
                            <Select
                              value={
                                datePickerMonths[issueCalendarDate.getMonth()]
                              }
                              onValueChange={handleIssueMonthChange}
                            >
                              <SelectTrigger className="w-36 h-8"> {/* Reverted: removed size="sm" */}
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                {datePickerMonths.map((month) => (
                                  <SelectItem key={month} value={month}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select
                              value={issueCalendarDate.getFullYear().toString()}
                              onValueChange={handleIssueYearChange}
                            >
                              <SelectTrigger className="w-28 h-8"> {/* Reverted: removed size="sm" */}
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                {Array.from( // Reverted to original year generation
                                  { length: 71 },
                                  (_, i) => new Date().getFullYear() - i
                                ).map((year) => (
                                  <SelectItem
                                    key={year}
                                    value={year.toString()}
                                  >
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Calendar
                            mode="single"
                            selected={ tempIssueDate && isDateValid(tempIssueDate) ? tempIssueDate : undefined }
                            onSelect={(date) => {
                                const newSelectedDate = date || undefined;
                                setTempIssueDate(newSelectedDate);
                                if (newSelectedDate) {
                                    setIssueCalendarDate(newSelectedDate); 
                                }
                            }}
                            month={issueCalendarDate}
                            onMonthChange={setIssueCalendarDate}
                            disabled={(date) =>
                              date > todayStart ||
                              date < minIssueDate
                            }
                            initialFocus
                          />
                          <div className="p-3 border-t">
                            {/* Using ShadCN Button for Apply */}
                            <Button 
                                type="button"
                                className="w-full bg-primary hover:bg-primaryhover text-neutral-900 rounded-full"
                                size="sm" // Keep size sm for apply button within popover
                                onClick={() => {
                                    field.onChange(tempIssueDate);
                                    field.onBlur(); 
                                    setIssueDatePickerOpen(false);
                                }}
                            >
                                Apply
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ID Expiry Date Field */}
                <FormField
                  control={form.control}
                  name="idExpiryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-neutral-900 dark:text-white">
                        Date of Expiry <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover
                        open={expiryDatePickerOpen}
                        onOpenChange={(isOpen) => {
                          setExpiryDatePickerOpen(isOpen);
                          if (isOpen) {
                            setTempExpiryDate(field.value); 
                            if (field.value && isDateValid(field.value)) {
                              setExpiryCalendarDate(field.value);
                            }
                          }
                        }}
                      >
                        <PopoverTrigger asChild>
                          {/* Using ShadCN Button for PopoverTrigger */}
                          <Button
                            variant={"outline"}
                            disabled={!selectedIdType || isSubmitting}
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            aria-required="true"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value && isDateValid(field.value) ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick expiry date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="end"
                          className="sm:w-[450px] max-h-[calc(var(--radix-popover-content-available-height)_-_1rem)] w-auto p-0 overflow-y-auto"
                        >
                          <div className="flex items-center justify-between gap-2 p-3 border-b">
                            <Select
                              value={
                                datePickerMonths[expiryCalendarDate.getMonth()]
                              }
                              onValueChange={handleExpiryMonthChange}
                            >
                              <SelectTrigger className="w-36 h-8"> {/* Reverted: removed size="sm" */}
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                {datePickerMonths.map((month) => (
                                  <SelectItem key={month} value={month}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select
                              value={expiryCalendarDate
                                .getFullYear()
                                .toString()}
                              onValueChange={handleExpiryYearChange}
                            >
                              <SelectTrigger className="w-28 h-8"> {/* Reverted: removed size="sm" */}
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                {Array.from(
                                  { length: 31 }, 
                                  (_, i) => new Date().getFullYear() + i 
                                ).map((year) => (
                                  <SelectItem
                                    key={year}
                                    value={year.toString()}
                                  >
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Calendar
                            mode="single"
                            selected={ tempExpiryDate && isDateValid(tempExpiryDate) ? tempExpiryDate : undefined }
                            onSelect={(date) => {
                                const newSelectedDate = date || undefined;
                                setTempExpiryDate(newSelectedDate);
                                if (newSelectedDate) {
                                    setExpiryCalendarDate(newSelectedDate);
                                }
                            }}
                            month={expiryCalendarDate}
                            onMonthChange={setExpiryCalendarDate}
                            disabled={(date) =>
                              date < minExpiryDate
                            }
                            initialFocus
                          />
                           <div className="p-3 border-t">
                            {/* Using ShadCN Button for Apply */}
                            <Button
                                type="button"
                                className="w-full bg-primary hover:bg-primaryhover text-neutral-900 rounded-full"
                                size="sm" // Keep size sm for apply button within popover
                                onClick={() => {
                                    field.onChange(tempExpiryDate);
                                    field.onBlur(); 
                                    setExpiryDatePickerOpen(false);
                                }}
                            >
                                Apply
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="text-gray-500 dark:text-gray-300">
                        Your ID must not be expired.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Navigation Buttons - Reverted to original <button> tags and classes */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-primary dark:bg-primarybox dark:hover:bg-secondarybox dark:text-primary font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none"
                onClick={prevStep}
                disabled={isSubmitting}
              >
                <ArrowLeft className="mr-2 size-4.5" /> Back
              </button>
              <button
                type="submit"
                className=" inline-flex items-center justify-center bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-6 py-3 h-12.5 text-center w-full cursor-pointer transition-all duration-75 ease-linear focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isSubmitting || !selectedIdType || !form.formState.isValid
                }
              >
                {isSubmitting ? (
                  // ----- Loading State (Original SVG) -----
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
                    <span>Continue...</span>
                  </>
                ) : (
                  // ----- Normal State -----
                  <>
                    <span>Continue</span>
                    <ArrowRight
                      className="ml-2 size-5"
                      aria-hidden="true"
                    />
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