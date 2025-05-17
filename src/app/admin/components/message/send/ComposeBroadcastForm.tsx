// frontend/src/app/(admin)/admin/messages/send/ComposeBroadcastForm.tsx
import React from "react";
import { Loader2, Send, AlertCircle, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils"; // Import cn

interface ComposeBroadcastFormProps {
  subject: string;
  onSubjectChange: (value: string) => void;
  body: string;
  onBodyChange: (value: string) => void;
  isSending: boolean;
  sendError: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ComposeBroadcastForm: React.FC<ComposeBroadcastFormProps> = ({
  subject,
  onSubjectChange,
  body,
  onBodyChange,
  isSending,
  sendError,
  onSubmit,
}) => {
  const isSubmitDisabled = isSending || !subject.trim() || !body.trim();

  return (
    <div className="border rounded-2xl overflow-hidden">
      <form onSubmit={onSubmit}>
        {/* Header */}

        <div className="sm:px-6 px-4 py-4 bg-lightgray dark:bg-primarybox">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white flex flex-wrap items-center gap-1.5">
            <Newspaper size={22} className="text-primary" /> Compose New
            Broadcast
          </h2>
            
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            This message will be delivered to the inbox of every registered
            user.
          </p>
        </div>
        {/* Content */}
        <div className="sm:p-6 p-4 space-y-6">
          {sendError && (
            <div className="bg-red-100 border border-red-300 dark:bg-red-600/20 dark:border-red-700 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-1 text-red-700 dark:text-red-400 " />
              <div>
                <h3 className="font-medium tracking-normal text-red-700 dark:text-red-400  text-base">
                  Sending Error
                </h3>
                <p className="text-red-600 dark:text-red-300">
                  {sendError}dfdef
                </p>
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <label
              htmlFor="subject"
              className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
            >
              Subject{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="subject"
              placeholder="E.g., Important System Update"
              value={subject}
              onChange={(e) => onSubjectChange(e.target.value)}
              maxLength={100}
              required
              disabled={isSending}
              className="mt-1 block px-4 py-3 bg-white dark:bg-background h-14 w-full border rounded-lg transition-all focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="body"
              className="text-gray-500 dark:text-gray-300 block capitalize text-sm lg:text-base"
            >
              Body{" "}
              <span className="text-red-600">*</span>
            </label>

            <div className="overflow-y-auto rounded-lg">
              <textarea
                id="body"
                placeholder="Write your message content here..."
                value={body}
                onChange={(e) => onBodyChange(e.target.value)}
                rows={8}
                required
                disabled={isSending}
                className="resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-track]:bg-gray-100 sm:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-lightborder sm:dark:[&::-webkit-scrollbar-track]:bg-primarybox sm:dark:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 bg-white dark:bg-background h-14 w-full transition-all border rounded-lg focus:outline-none focus:border-[#5f5f5f] ease-linear duration-75 min-h-[200px]"
              />
            </div>
          </div>
          {/* Footer */}

          {/* --- Replaced PlainButton with standard button --- */}
          <div className="flex items-center sm:justify-end justify-center">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={cn(
                "bg-primary text-neutral-900 hover:bg-primaryhover font-medium rounded-full px-8 py-3 h-12.5 text-center sm:w-auto w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              )}
            >
              {isSending ? (
                <svg
                  className="h-5 w-5 text-neutral-900 animate-spin mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              {isSending ? "Broadcasting..." : "Send to All Users"}
            </button>
          </div>
          {/* --- End replacement --- */}
        </div>
      </form>
    </div>
  );
};

export default ComposeBroadcastForm;
