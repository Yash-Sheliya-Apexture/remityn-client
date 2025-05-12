// src/app/dashboard/components/send/PayingWithDisplay.tsx
import React from "react";
import Image from "next/image";
import { AccountDetails } from "@/app/hooks/useSendAmountLogic"; // Adjust path

interface PayingWithDisplayProps {
  sourceAccount: AccountDetails;
}

const PayingWithDisplay: React.FC<PayingWithDisplayProps> = ({
  sourceAccount,
}) => {
  return (
    <>
      <label className="block font-medium mb-2 ml-2 text-neutral-900 dark:text-white">
        Paying with
      </label>
      <div className="bg-lightgray dark:bg-primarybox rounded-2xl p-4">
        <div className="flex items-center gap-2 rounded-lg">
          <Image
            src={sourceAccount.currency.flagImage || "/assets/icon/generic.svg"}
            alt={`${sourceAccount.currency.code} flag`}
            width={32}
            height={32}
            className="rounded-full size-10 mr-3"
            onError={(e) => {
              e.currentTarget.src = "/assets/icon/generic.svg";
            }}
          />
          <div className="space-y-0.5">
            <h1 className="text-gray-500 font-medium dark:text-gray-300 text-sm">
              Paying With
            </h1>
            <p className="capitalize font-medium text-mainheading dark:text-white">
              Your {sourceAccount.currency.code} balance
            </p>
            <p className="text-primary font-bold">
              <span className="underline underline-offset-4">
                {sourceAccount.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
              </span>
              {sourceAccount.currency.code} available
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayingWithDisplay;
