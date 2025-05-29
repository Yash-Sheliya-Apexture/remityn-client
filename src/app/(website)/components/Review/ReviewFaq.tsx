// import React from "react";

// const ReviewFaq = () => {
//   return (
//     <section className="lg:py-20 py-5">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold capitalize mb-6 max-w-2xl leading-tight text-mainheadingWhite">
//           Your questions, <span className="text-primary">answered.</span>
//         </h2>

//         <p className="text-subheadingWhite md:text-lg text-base lg:max-w-3xl max-w-full">
//           Find clear, concise answers to the most common questions about our
//           services. Whether you're new or a returning customer, we've covered
//           everything you need to know — from how it works to what sets us apart.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default ReviewFaq;

"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItemData[] = [
  {
    id: "1",
    question: "How do I know the reviews are genuine?",
    answer:
      "We only accept reviews from customers who have completed a currency exchange transaction through our platform. Each review is verified and monitored to ensure authenticity and transparency.",
  },

  {
    id: "2",
    question: "Why do some customers mention different exchange rates in reviews?",
    answer:"Exchange rates can vary based on market fluctuations and transaction times. Customer reviews reflect their personal experience at the time of exchange, which may differ slightly depending on when they made the transaction."
  },
  {
    id: "3",
    question: "What should I include in my review to help others?",
    answer:
      "It's helpful to mention the currency you exchanged, the speed of the transaction, the clarity of the process, the customer support experience, and how satisfied you were overall. This gives future users a well-rounded picture.",
  },
  {
    id: "4",
    question: "Do negative reviews get published too?",
    answer:
      "Yes. We believe in transparency. Both positive and negative reviews are published as long as they follow our community guidelines. This helps us improve and gives new customers a fair understanding.",
  },
  {
    id: "5",
    question: "How often are the reviews updated?",
    answer:
      "Reviews are submitted in real time by users and appear on the site after moderation. This means our review section is constantly updated with fresh feedback from recent users.",
  },
];

const answerVariants = {
  initial: { opacity: 0, height: 0, marginTop: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    marginTop: "8px",
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2, delay: 0.05 },
      marginTop: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.15 },
      marginTop: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
    },
  },
};

const ReviewFaq: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<string | null>(
    faqData.length > 0 ? faqData[0].id : null
  );

  const handleToggle = useCallback((id: string) => {
    setOpenItemId((prevOpenId) => (prevOpenId === id ? null : id));
  }, []);

  return (
    <section className="lg:py-20 py-5 overflow-hidden" id="faq">
      <div className="container mx-auto px-4">
        <div className="lg:max-w-3xl max-w-full mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold capitalize mb-6 max-w-2xl leading-tight text-mainheadingWhite">
            Your questions, <span className="text-primary">answered.</span>
          </h2>

          <p className="text-subheadingWhite md:text-lg text-base lg:max-w-3xl max-w-full">
            Find clear, concise answers to the most common questions about our
            services. Whether you're new or a returning customer, we've covered
            everything you need to know — from how it works to what sets us
            apart. Quick, reliable support made simple. 
          </p>
        </div>

        <div className="flex flex-col" data-orientation="vertical">
          {faqData.map((item) => {
            const isOpen = openItemId === item.id;
            const uniqueTriggerId = `faq-trigger-${item.id}`;
            const uniqueContentId = `faq-content-${item.id}`;

            return (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden py-6 md:py-8 lg:py-10 border-t border-t-gray-600/50"
              >
                <h3
                  data-orientation="vertical"
                  data-state={isOpen ? "open" : "closed"}
                  className="flex m-0"
                >
                  <button
                    type="button"
                    aria-controls={uniqueContentId}
                    aria-expanded={isOpen}
                    data-state={isOpen ? "open" : "closed"}
                    data-orientation="vertical"
                    id={uniqueTriggerId}
                    className={`flex w-full cursor-pointer flex-1 gap-4 items-start justify-between text-start xl:text-[28px] text-xl font-medium transition-all ease-linear duration-75 ${
                      isOpen
                        ? "text-primary hover:text-primaryhover"
                        : "text-mainheadingWhite hover:text-[#92A6B0]"
                    }`}
                    onClick={() => handleToggle(item.id)}
                  >
                    {item.question}
                    <div
                      className="xl:size-6 size-4 shrink-0 relative mt-2"
                      aria-hidden="true"
                    >
                      <motion.div
                        className="absolute bg-current"
                        style={{
                          width: "2px",
                          height: "100%",
                          left: "50%",
                          top: "0%",
                          translateX: "-50%",
                        }}
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute bg-current"
                        style={{
                          width: "100%",
                          height: "2px",
                          left: "0%",
                          top: "50%",
                          translateY: "-50%",
                        }}
                        animate={{
                          rotate: isOpen ? 90 : 0,
                          opacity: isOpen ? 0 : 1,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </div>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={uniqueContentId}
                      role="region"
                      aria-labelledby={uniqueTriggerId}
                      variants={answerVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      <p className="text-subheadingWhite xl:text-xl text-base leading-relaxed pt-2">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewFaq;
