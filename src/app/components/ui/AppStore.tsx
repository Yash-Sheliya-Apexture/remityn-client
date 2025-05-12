import React from "react";
import Image from "next/image";
import Link from "next/link";

const AppStore = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center gap-4">
        <Link
          href="https://apps.apple.com/us/app/wise-international-transfers/id612261027"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <div>
            <Image
              src="/assets/images/app-store-logo.png"
              alt="Download on the App Store"
              width={24}
              height={24}
              className=" rounded-full"
            />
          </div>
          <span className="text-sm font-semibold text-secondary dark:text-primary ml-2">
            4.8 ★ on App Store <span className="text-gray-500 dark:text-gray-300">1.5L reviews</span>
          </span>
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.transferwise.android&referrer=singular_click_id%3Dc8855d7f-0ce0-4d7a-8826-05bc781ff841&utm_source=wise.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <div>
            <Image
              src="/assets/icon/play-store-logo.png"
              alt="Get it on Google Play"
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
          <span className="text-sm font-semibold text-secondary dark:text-primary ml-2">
            4.8 ★ on Google Play <span className="text-gray-500 dark:text-gray-300">11L reviews</span>
          </span>
        </Link>
      </div>
    </>
  );
};
export default AppStore;
