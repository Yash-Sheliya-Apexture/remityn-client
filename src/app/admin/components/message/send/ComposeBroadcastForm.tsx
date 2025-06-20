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

        <div className="sm:px-6 px-4 py-4 bg-primarybox">
          <h2 className="text-xl font-semibold text-mainheadingWhite flex flex-wrap items-center gap-2">
            <Newspaper size={22} className="text-primary" /> Compose New
            Broadcast
          </h2>

          <p className="text-sm text-subheadingWhite mt-1">
            This message will be delivered to the inbox of every registered
            user.
          </p>
        </div>

        {/* Content */}
        <div className="sm:p-6 p-4 space-y-6">
          {sendError && (
            <div
              className="w-full flex relative items-center  bg-red-900/25 border sm:order-1 order-2 border-red-500 p-4 rounded-xl"
              role="alert"
            >
              <div className="flex items-center gap-3 text-center">
                <div className="sm:size-12 size-10 rounded-full flex items-center justify-center bg-red-600/20 flex-shrink-0">
                  <AlertCircle className="text-red-500 size-5 sm:size-6 flex-shrink-0" />
                </div>

                <div className="flex-1 text-left">
                  <h4 className="font-medium sm:text-2xl text-lg text-red-600 capitalize">
                    Error loading StatsCards
                  </h4>

                  <p className="text-sm text-left text-red-300/90">
                    {sendError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="subject"
              className="text-white/90 block capitalize text-sm lg:text-base"
            >
              Subject <span className="text-red-600">*</span>
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
              className="mt-1 block px-4 py-3 bg-background h-14 w-full border rounded-lg transition-all placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white focus:outline-0"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="body"
              className="text-white/90 block capitalize text-sm lg:text-base"
            >
              Body <span className="text-red-600">*</span>
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
                className="min-h-[200px] resize-none sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar]:h-3 sm:[&::-webkit-scrollbar-track]:rounded-full sm:[&::-webkit-scrollbar-thumb]:rounded-full  sm:[&::-webkit-scrollbar-track]:bg-primarybox sm:[&::-webkit-scrollbar-thumb]:bg-secondarybox block px-4 py-3 placeholder:text-gray-400 border-gray-600 hover:border-gray-500 focus:border-gray-500 text-white h-14 w-full transition-all border rounded-lg focus:outline-none ease-linear duration-75"
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
                "bg-primary text-mainheading hover:bg-primaryhover font-medium gap-2 rounded-full px-8 py-3 h-12.5 text-center sm:w-auto w-full cursor-pointer transition-all duration-75 ease-linear disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              )}
            >
              {isSending ? (
                <svg
                  className="h-5 w-5 text-mainheading animate-spin"
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
