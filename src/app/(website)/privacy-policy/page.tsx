// import React from "react";
// import { MdStars } from "react-icons/md";

// const page = () => {
//   return (
//     <section className="Privicy-Policy py-10 bg-[#f2f4f7] dark:bg-background px-4">
//       <div className="container mx-auto">
//         <h2 className="text-4xl md:text-5xl lg:text-6xl capitalize font-black text-mainheading dark:text-white mt-6">
//           Privacy
//           <span className="text-primary"> Policy</span>
//         </h2>
//         <p className="max-w-3xl text-gray-500 dark:text-gray-300 lg:text-xl text-sm mt-5">
//           At Wise, protecting your personal information is a top priority. We
//           use advanced security measures and comply with global data protection
//           laws to ensure your data is safe, private, and only used for the
//           services you trust us with.
//         </p>

//         {/* Introduction */}
//         <div className="mt-10 flex flex-col space-y-3">
//           <h1 className="lg:text-2xl flex items-center gap-1 lg:text-lg text-base text-mainheading dark:text-white">
//             <MdStars className="dark:text-primary text-mainheading size-6" />
//             Introduction
//           </h1>
//           <p className="text-gray-500 dark:text-gray-300 text-lg">
//             Welcome to Wise, a service provided by Apexture. Wise is a modern
//             currency exchange and remittance platform designed to make
//             international money transfers faster, more affordable, and
//             transparent. Our service leverages secure technology to simplify how
//             people send and receive money across borders.We are committed to
//             protecting your privacy and handling your personal data with care
//             and responsibility. This Privacy Policy outlines how we collect,
//             use, store, and protect your personal information when you access
//             our website or mobile applications, no matter where you're located.
//             <br />
//             <br />
//             This Privacy Policy is designed to inform you about how Wise
//             processes your personal data whenever you interact with our platform
//             — whether you're creating an account, completing a transaction, or
//             communicating with our support team. Please read this Privacy Policy
//             in conjunction with any other privacy or data protection notices we
//             may provide on specific occasions. These notices work alongside this
//             policy to give you a complete picture of how your data is managed.
//             This Privacy Policy does not override any other notices unless
//             specifically stated.
//           </p>
//         </div>

//         <div className="mt-10 flex flex-col space-y-3">
//           <h1 className="lg:text-2xl flex items-center gap-1 text-lg text-mainheading dark:text-white">
//             <MdStars className="dark:text-primary text-mainheading size-6" />
//             What Information We Collect
//           </h1>

//           <p className="text-gray-500 dark:text-gray-300 text-lg">
//             To provide you with secure and efficient money transfer services,
//             Wise collects various types of personal and technical information.
//             This data is essential for delivering our services, complying with
//             legal requirements, and enhancing your user experience. The
//             information we collect includes: our website or mobile applications,
//             no matter where you're located.
//           </p>

//           <ul className="ps-6">
//             <h1 className="dark:text-primary text-mainheading font-medium text-lg">
//               1. Personal Identification Information
//             </h1>
//             <li>
//               This refers to data that can be used to identify you personally,
//               such as your full name, email address, phone number, residential
//               address, and date of birth.
//             </li>
//           </ul>
//           <ul className="ps-6">
//             <h1 className="dark:text-primary text-mainheading font-medium text-lg">
//               2. Transactional Data
//             </h1>
//             <li>
//               We collect details of your financial transactions with Wise,
//               including money sent or received, bank account numbers, payment
//               card information, currency exchanged, and records of the services
//               you use.
//             </li>
//           </ul>

//           <ul className="ps-6">
//             <h1 className="dark:text-primary text-mainheading font-medium text-lg">
//               3. Technical Data
//             </h1>
//             <li>
//               When you access our website or mobile app, we automatically
//               collect technical details from your device, such as your IP
//               address, login times, browser type and version, operating system,
//               time zone settings, and other device-specific identifiers.
//             </li>
//           </ul>

//           <ul className="ps-6">
//             <h1 className="dark:text-primary text-mainheading font-medium text-lg">
//               4. Communication Data
//             </h1>
//             <li>
//               This includes your interactions with our customer support,
//               feedback provided through any of our channels, and your
//               communication preferences.
//             </li>
//           </ul>

//           <ul className="ps-6">
//             <h1 className="dark:text-primary text-mainheading font-medium text-lg">
//               5. Usage Data
//             </h1>
//             <li>
//               We track how you interact with our platform — including the pages
//               you visit, services you use, and features you engage with. This
//               helps us improve performance and tailor your experience.
//             </li>
//           </ul>

//           <ul className="ps-6">
//             <h1 className="dark:text-primary text-mainheading font-medium text-lg">
//               6. Marketing and Communications Data
//             </h1>
//             <li>
//               We store your preferences regarding receiving marketing
//               communications from us or third-party partners, along with any
//               opt-in/opt-out choices you’ve made.
//             </li>
//           </ul>

//           <div>
//             <h1 className="lg:text-2xl flex items-center gap-1 text-lg text-mainheading dark:text-white mt-5">
//               <MdStars className="dark:text-primary text-mainheading size-6" />
//               How We Collect Information
//             </h1>

//             <p>

//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default page;

// src/components/PrivacyPolicyPage.tsx
// (or place it in your pages directory like pages/privacy-policy.tsx if it's a full page)

import React from "react";
import Link from "next/link"; // Import Next.js Link for internal navigation

interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode; // Use React.ReactNode to allow JSX content
}

// Define the content for each section separately for better organization
const sections: PolicySection[] = [
  {
    id: "section1",
    title: "Introduction",
    content: (
      <>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          Welcome to Remityn, a service provided by Apexture . Remityn is a modern
          currency exchange and remittance platform designed to make
          international money transfers faster, more affordable, and
          transparent. Our service leverages secure technology to simplify how
          people send and receive money across borders.
        </p>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          We are committed to protecting your privacy and handling your personal
          data with care and responsibility. This Privacy Policy outlines how we
          collect, use, store, and protect your personal information when you
          access our website, no matter where you're located
        </p>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          This Privacy Policy is designed to inform you about how Remityn processes
          your personal data whenever you interact with our platform — whether
          you're creating an account, completing a transaction, or communicating
          with our support team.
        </p>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          It is important that you read this Privacy Policy together with any
          other privacy notice or fair processing notice we may provide on
          specific occasions when we are collecting or processing personal data
          about you so that you are fully aware of how and why we are using your
          data. This Privacy Policy supplements the other notices and is not
          intended to override them.
        </p>
      </>
    ),
  },
  {
    id: "section2",
    title: "What Information We Collect",
    content: (
      <>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          To provide you with secure and efficient money transfer services, Remityn
          collects various types of personal and technical information. This
          data is essential for delivering our services, complying with legal
          requirements, and enhancing your user experience. The information we
          collect includes:
        </p>

        <div className="w-full font-normal text-gray-500 dark:text-gray-300">
          <ul className="list-inside list-decimal ps-5 lg:text-base text-sm space-y-2">
            <li>
              Personal Identification Information This refers to data that can
              be used to identify you personally, such as your full name, email
              address, phone number, residential address, and date of birth.
            </li>
            <li>
              Transactional Data We collect details of your financial
              transactions with Remityn, including money sent or received, bank
              account numbers, payment card information, currency exchanged, and
              records of the services you use.
            </li>
            <li>
              Technical Data When you access our website or mobile app, we
              automatically collect technical details from your device, such as
              your IP address, login times, browser type and version, operating
              system, time zone settings, and other device-specific identifiers.
            </li>
            <li>
              This includes your interactions with our customer support,
              feedback provided through any of our channels, and your
              communication preferences.
            </li>
            <li>
              Usage Data We track how you interact with our platform — including
              the pages you visit, services you use, and features you engage
              with. This helps us improve performance and tailor your
              experience.
            </li>
            <li>
              Marketing and Communications Data We store your preferences
              regarding receiving marketing communications from us or
              third-party partners, along with any opt-in/opt-out choices you’ve
              made.
            </li>
          </ul>
        </div>

        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          Please note that we do not collect any Special Categories of Personal
          Data about you (this includes details about your race or ethnicity,
          religious or philosophical beliefs, sex life, sexual orientation,
          political opinions, trade union membership, information about your
          health, and genetic and biometric data). Nor do we collect any
          information about criminal convictions and offences.
        </p>
      </>
    ),
  },
  {
    id: "section3",
    title: "How We Collect Information",
    content: (
      <>
        <p className="font-normal text-gray-500 lg:text-base text-sm dark:text-gray-300">
          At Remityn, we collect personal data through various methods to ensure
          accurate, secure, and efficient service delivery. The ways we gather
          information include:
        </p>
        <div className="w-full font-normal text-gray-500 dark:text-gray-300">
          <ul className="list-inside space-y-5 lg:text-base text-sm">
            <li>
              1. Direct Interactions You may provide us with personal,
              transactional, and communication data when you interact with us
              directly. This includes when you:
              <ul className="ml-5 list-inside list-disc lg:text-lg text-base mt-2 space-y-1">
                <li>Create an account on our platform</li>
                <li>Subscribe to our service or publications</li>
                <li>Request marketing to be sent to you</li>
                <li>Enter a competition, promotion, or survey</li>
                <li>Give us feedback or contact us</li>
              </ul>
            </li>
            <li>
              2. Automated Technologies or Interactions When you engage with
              Remityn online, we automatically collect technical data about your
              device and browsing. This data is gathered using technologies such
              as:
              <ul className="ml-5 list-inside list-disc lg:text-base text-sm space-y-1 mt-2">
                <li>
                  Technical Data from analytics providers such as Google based
                  outside the EU
                </li>
                <li>
                  Contact, Financial and Transaction Data from providers of
                  technical, payment, and delivery services
                </li>
                <li>
                  Identity and Contact Data from data brokers or aggregators
                </li>
                <li>
                  Identity and Contact Data from publicly available sources such
                  as Companies House and the Electoral Register based inside the
                  EU
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "section4",
    title: "How We Use Your Information",
    content: (
      <>
        <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300">
          Remityn uses the information we collect from you to operate efficiently,
          deliver a secure and personalized experience, and fulfill our legal
          and contractual obligations. Here’s how your data is used:
        </p>

        <div className="text-gray-500 dark:text-gray-300">
          <ul className="ml-6 list-inside list-decimal lg:text-base text-sm space-y-1">
            <li>
              To Register You as a New Customer We use your personal
              identification data to create your Remityn account and onboard you as
              a verified user.
            </li>
            <li>
              To Process and Deliver Your Transactions Your transactional data
              is essential for executing transfers, managing payments and fees,
              sending and receiving funds, and recovering any outstanding
              amounts owed.
            </li>
            <li>
              To Manage Our Relationship with You This includes communicating
              important updates such as changes to our terms, services, or
              privacy policy, requesting feedback or reviews, and inviting you
              to participate in surveys, promotions, or competitions.
            </li>
            <li>
              To Improve Our Platform and Services We analyze technical and
              usage data to troubleshoot issues, optimize system performance,
              conduct testing, and enhance the user experience across our
              platform.
            </li>
            <li>
              To Recommend Relevant Products or Services We use your preferences
              and behavior to offer personalized service recommendations and
              display relevant promotions that may be of interest to you.
            </li>
            <li>
              To Fulfill Legal and Regulatory Obligations Your data may be
              processed as required by applicable laws and financial
              regulations, including anti-money laundering (AML) and
              know-your-customer (KYC) compliance.
            </li>
          </ul>
        </div>
        <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300">
          Please note that we only use your personal data when the law allows us
          to. Most commonly, we will use your personal data where we need to
          perform the contract we are about to enter into or have entered into
          with you, where it is necessary for our legitimate interests (or those
          of a third party) and your interests and fundamental rights do not
          override those interests, or where we need to comply with a legal
          obligation.
        </p>
      </>
    ),
  },
  {
    id: "section6",
    title: "How We Protect Your Information",
    content: (
      <>
        <p className="lg:text-lg text-base text-gray-500 dark:text-gray-300">
          At Remityn, safeguarding your personal information is a top priority. We
          have implemented robust security measures to prevent unauthorized
          access, misuse, alteration, or disclosure of your personal data.
        </p>

        <div className="text-gray-500 dark:text-gray-300">
          <ul className="list-inside space-y-1 ps-5 lg:text-base text-sm">
            <li>
              1. Advanced Security Measures We use industry-standard security
              protocols, including encryption, secure servers, and firewalls, to
              protect your data while it is stored and transmitted. Regular
              security assessments are conducted to ensure that our systems, as
              well as those of our service providers, remain secure and
              compliant.
            </li>
            <li>
              2. Restricted Access Access to your personal data is strictly
              limited to authorized personnel—such as employees, contractors,
              and trusted third parties—who need it to perform their duties.
              They are bound by confidentiality agreements and trained to handle
              data responsibly.
            </li>
            <li>
              3. Incident Response and Breach Management We have detailed
              procedures in place to detect, investigate, and respond to any
              suspected data breach. If a breach occurs that poses a risk to
              your rights and freedoms, we will notify you and relevant
              regulatory authorities in accordance with legal requirements.
            </li>
            <li>
              4. Continuous Testing and Preparedness Remityn regularly tests its
              infrastructure, systems, and response strategies through planned
              disaster recovery exercises and cybersecurity drills to ensure
              ongoing readiness against potential threats.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "section7",
    title: "International Transfers",
    content: (
      <>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          As a global platform, Remityn may need to transfer your personal data to
          countries outside of the European Economic Area (EEA). These transfers
          are necessary for delivering our services and supporting international
          operations, such as processing transactions or working with trusted
          third-party partners.
        </p>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          Some of these countries may not have the same level of data protection
          laws as those within your own country or the EEA. However, we are
          committed to ensuring that your personal data remains secure and
          protected, regardless of where it is processed.
        </p>
      </>
    ),
  },
  {
    id: "section9",
    title: "Marketing Preferences",
    content: (
      <>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          At Remityn, we aim to deliver content, offers, and services that are most
          relevant to you. To achieve this, we may use your Identity, Contact,
          Technical, Usage, and Profile Data to better understand your
          preferences and tailor our marketing communications accordingly.
        </p>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          This helps us determine which of our products, services, or promotions
          might be most useful or interesting to you.
        </p>
      </>
    ),
  },
  {
    id: "section11",
    title: "Cookies",
    content: (
      <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
        At Remityn, we use cookies and similar technologies to enhance your
        experience on our website. These small files are stored on your device
        to help us understand how you interact with our site, remember your
        preferences, and deliver content that’s more relevant to you. Cookies
        also allow us to analyze website traffic and performance, helping us
        improve our services over time. You have control over your cookie
        settings and can configure your browser to block or alert you about
        cookies. However, please be aware that disabling cookies may affect the
        functionality of certain features on our website. For more details about
        how we use cookies, please refer to our Cookie Policy.
        <Link href="/cookie-policy" >
          <span className="underline">cookie policy</span>
        </Link>
        .
      </p>
    ),
  },
  {
    id: "section12",
    title: "About Us",
    content: (
      <>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          Remityn is a trusted remittance platform powered by cutting-edge
          technology and a commitment to transparency, security, and customer
          satisfaction. Operated by Apexture Limited, our mission is to make
          international money transfers faster, more affordable, and more
          accessible for individuals and businesses across the globe.
        </p>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-base">
          We understand the importance of handling your personal data with care.
          That’s why we adhere to strict privacy practices and are committed to
          protecting your information at every step. Whether you're sending
          money abroad or managing your account, you can rely on Remityn to
          prioritize both your financial and data security.
        </p>
      </>
    ),
  },
];

const PrivacyPolicyPage: React.FC = () => {
  return (
    <section className="Privacy-PolicyPage lg:py-10 py-5 bg-white dark:bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-6xl capitalize font-black text-mainheading dark:text-white">
            Privacy <span className="text-primary"> Policy</span>
          </h2>

          <p className="max-w-5xl text-gray-500 dark:text-gray-300 lg:text-lg text-base">
            At Remityn, protecting your personal information is a top priority. We
            use advanced security measures and comply with global data
            protection laws to ensure your data is safe, private, and only used
            for the services you trust us with.
          </p>

          <div className="border-t my-4"></div>

          {/* Main Content Column */}
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              {/* Added margin-bottom and scroll-margin-top */}
              <h2 className="mt-5 lg:text-3xl md:text-2xl text-xl font-medium text-neutral-900 dark:text-primary mb-3">
                {section.title}
              </h2>
              {/* Changed to H2 for better semantics, added margin-bottom */}
              <div className="space-y-4">{section.content}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
