// import React from "react";

// const page = () => {
//   return <div>my new page </div>;
// };

// export default page;

// src/components/TermsAndConditionsPage.tsx
// (or place it in your pages directory like pages/terms-and-conditions.tsx if it's a full page)

"use client";
import React from "react";

interface TermSection {
  id: string;
  title: string;
  content: React.ReactNode; // Use React.ReactNode to allow JSX content
}

const sections: TermSection[] = [
  {
    id: "section1",
    title: "Participation",
    content: (
      <>
        <p>
          By accessing or using the Remityn platform, users are deemed to have
          read, understood, and agreed to be bound by our terms and conditions,
          along with all applicable policies. This forms a legally binding
          agreement between the user and Remityn, operated by apexture Limited.
        </p>
        <p>
          To access certain services on our platform, users are required to
          create an account by providing accurate and up-to-date personal
          information during the registration process. This may include
          identification and contact details. You are responsible for ensuring
          that the information you provide is truthful, complete, and current at
          all times.
        </p>
        <p>
          If any information provided is found to be false, misleading,
          incomplete, or in violation of applicable laws or our terms, Remityn
          reserves the right to suspend or terminate your account and restrict
          access to our services without notice.
        </p>
        <p>
          We encourage all users to carefully review our terms and conditions
          before registering or continuing to use our platform. If you do not
          agree with any part of our policies, we advise you not to proceed with
          registration or to discontinue use of the platform.
        </p>
      </>
    ),
  },
  {
    id: "section2",
    title: "Data protection",
    content: (
      <div>
        <p>
          At Remityn, protecting your personal data is a top priority. You have
          full control over your registration information and may update or
          correct it at any time through the "User Account" section of our
          website. Should you wish to delete your user data or your entire
          account, you may do so, and we will process your request as promptly
          as possible.
        </p>
        <p>
          {" "}
          We strongly advise all users to take appropriate steps to keep their
          account credentials—such as login ID and password—secure. Remityn will
          not be held responsible for any loss or damage arising from your
          failure to safeguard this information. If you suspect that your
          password has been compromised or is being misused, you must notify us
          immediately via our contact page so we can take necessary action.
        </p>
        <ul className="list-inside list-disc sm:text-base text-sm my-2 ml-4">
          <li>Belongs to someone else without proper authorization </li>
          <li>Promotes unlawful activities or violates applicable laws</li>
          <li>mpersonates another individual</li>
          <li>IInfringes on any intellectual property rights</li>
          <li>Is illegal or harmful in any way</li>
        </ul>
        <p>
          Remityn reserves the right to remove any such content and, if
          necessary, terminate the associated account without notice.
        </p>
        <p>
          In the event of disputes over account ownership, Remityn will act as
          the sole arbitrator. Our decisions in such matters will be final and
          binding on all involved parties.
        </p>
      </div>
    ),
  },
  {
    id: "section3",
    title: "Representations and warranties of user",
    content: (
      <div>
        By using the Remityn platform, the user represents and warrants the
        following:
        <br />
        <ul className="list-inside list-disc sm:text-base text-sm my-2 ml-4">
          <li>
            Eligibility: The user confirms that they are at least 18 years of
            age and possess the mental capacity to enter into and comply with
            this agreement.
          </li>
          <li>
            TAccuracy of Information: The user agrees to provide accurate and
            truthful information during the Know Your Customer (KYC)
            verification process and will hold Remityn harmless from any
            liabilities arising due to any discrepancies or inaccuracies in the
            documents submitted for verification.
          </li>
          <li>
            Cooperation: The user agrees to cooperate fully and promptly with
            Remityn to allow for the smooth processing of transactions and
            verification requirements, ensuring all necessary actions are taken
            in a timely manner.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "section4",
    title: "Prohibited usage",
    content: (
      <>
        <p>
          By accessing and using the Remityn platform, you agree not to use any
          method other than the provided interface to access our services,
          unless otherwise explicitly agreed in a separate contract. You are
          prohibited from using any automated methods or bots to access or
          attempt to access the services.
        </p>
        <p>
          You agree not to engage in any activity that interferes with or
          disrupts the functionality of the services, including the servers and
          networks connected to the platform. Without explicit permission
          through a separate agreement, you are not allowed to reproduce,
          duplicate, copy, sell, trade, or resell any part of the services for
          commercial purposes.
        </p>
        <p>
          As part of our commitment to security and compliance, any content or
          registration information provided by you may be shared with government
          and regulatory bodies authorized to conduct cybersecurity,
          investigative, or protective operations. This information may be used
          to verify identities, prevent fraud, detect, investigate, and
          prosecute cybersecurity incidents.
        </p>
        <p>
          You represent and warrant that you will be financially responsible for
          all usage and access to the website, including any use of your account
          by others. If any part of these terms of use is deemed illegal by
          applicable law, access to the website will automatically be revoked in
          such cases.
        </p>
      </>
    ),
  },
  {
    id: "section5",
    title: "Account",
    content: (
      <>
        {/* Changed p to div for block children */}
        <p>
          When you register on the Remityn platform, you may be allowed to
          create multiple accounts, including sub-accounts. These accounts,
          collectively referred to as "your" account, must adhere to the limits
          set by the platform. You are prohibited from creating anonymous
          accounts or accounts that do not reflect your true identity.
        </p>
        <p>
          You are responsible for ensuring that no user authorized by you to
          access your account shares your login credentials with any other
          individual, unless explicitly permitted by us in writing. Depending on
          the functionality provided, your account may grant you access to
          manage various aspects of the services, including but not limited to
          your data and other available functionalities.
        </p>
        <p>
          At all times, you remain responsible for all activities that occur
          under your account. It is essential that you protect your login
          credentials and passwords. If you suspect that your account has been
          compromised or that a user has violated this agreement or any
          applicable laws, you must notify us immediately.
        </p>
        <h1 className="lg:text-3xl md:text-2xl text-lg font-medium text-primary my-5 leading-5">
          Authorization
        </h1>
        <p>
          {/* Wrapped */}
          By accepting these terms of use, you authorize us to facilitate the
          transfer and settlement of funds on your behalf. This authorization
          allows us to initiate an electronic funds transfer between you (the
          sender) and the intended receiver, in accordance with the terms of
          this agreement.
        </p>
      </>
    ),
  },
  {
    id: "section6",
    title: "Third-party links",
    content: (
      <>
        <p>
          Our platform may occasionally include links to websites operated by
          our partner networks, advertisers, and affiliates. These links are
          provided for your convenience, and we do not have control over the
          content or privacy practices of these external websites.
        </p>
        <p>
          Please be aware that we are not responsible for the privacy policies
          or practices of third-party sites. We encourage you to review the
          privacy policies of any website you visit through these links before
          providing any personal information or engaging in transactions.
        </p>
      </>
    ),
  },
  {
    id: "section7",
    title: "Liabilities and disclaimer",
    content: (
      <>
        <p>
          By using the services or breaching this agreement, you agree to
          defend, indemnify, and hold us and our affiliated entities harmless
          from any and all claims, liabilities, damages, and costs, including
          reasonable legal fees and expenses (collectively referred to as
          "Claims").
        </p>
        <p>
          We reserve the right, at our sole discretion and expense, to take full
          responsibility for the defense and management of any Claims. You agree
          to cooperate reasonably and assist us, as requested, in defending
          against any such Claims.
        </p>
        <p>
          "Our Affiliated Entities" includes our direct and indirect business
          partners, clients, licensees, users, vendors, investors, shareholders
          (whether past, present, or future), as well as our predecessors,
          agents, attorneys, and advisors.
        </p>
      </>
    ),
  },
  {
    id: "section8",
    title: "Termination and suspension",
    content: (
      <>
        <p>
          In order to protect the integrity of our services, ensure compliance
          with our policies, and adhere to applicable laws and regulations, we
          reserve the right to suspend or terminate your account or access to
          our services at any time, without notice, if you fail to comply with
          this agreement or no longer agree to receive electronic
          communications.
        </p>
        <p>
          This action may be taken at our sole discretion and may include the
          restriction, denial, or termination of services in whole or in part.
          Upon the termination of this agreement, or the suspension or
          termination of your account, you must immediately cease using the
          services, and any outstanding payments will become due immediately.s.
        </p>
      </>
    ),
  },
  {
    id: "section9",
    title: "Changes to this agreement",
    content: (
      <p>
        In order to remain compliant with evolving legal requirements, industry
        standards, and adjustments in how we process personal information, we
        reserve the right to update or modify this agreement at any time,
        without prior notice. Any changes will be posted on our website in the
        form of a new version of the agreement. We encourage you to periodically
        check this page to stay informed about any updates.
      </p>
    ),
  },
];

const TermsAndConditionsPage: React.FC = () => {
  return (
    <section className="terms-condtionPage lg:py-10 py-5">
      <div className="container mx-auto px-4">
        {/* Removed extra wrapping div */}

        <div className="space-y-4">
          <h1 className="text-4xl font-SatoshiVariable sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-mainheadingWhite">
            Terms{" "}
            <span className="text-primary font-SatoshiVariableItalic">
              And Conditions
            </span>
          </h1>

          <p className="text-subheadingWhite text-lg md:text-xl">
            Welcome to Remityn, your trusted platform for secure and efficient
            currency exchange services. These Terms and Conditions outline the
            rules and guidelines that govern your use of our services, ensuring
            a seamless and secure experience while managing your transactions.
          </p>

          <div className="border-t border-gray-600/50 my-4"></div>
        </div>

        {/* Main Content Column */}
        {sections.map((section) => (
          <div key={section.id} id={section.id}>
            {/* Added margin-bottom and scroll-margin-top */}
            <h2 className="mt-5 lg:text-3xl md:text-2xl text-xl font-medium text-primary mb-4">
              {section.title}
            </h2>
            {/* Changed to H2 */}
            <div className="space-y-4 sm:text-lg text-base text-subheadingWhite">{section.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TermsAndConditionsPage;
