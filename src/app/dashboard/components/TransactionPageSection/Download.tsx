// components/Download.tsx
import React from "react";
import { LiaDownloadSolid } from "react-icons/lia";

const Download: React.FC = () => {
  return (
    <button className="bg-primary text-secondary font-medium py-3 px-6 rounded-full flex items-center gap-2">
      <LiaDownloadSolid size={22} />
      <span className="md:block hidden">Download</span>
    </button>
  );
};

export default Download;