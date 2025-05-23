// import React from "react";
// import AllReviewsPage from "../components/Review";

// const page = () => {
//   return (
//     <section className="Reviews-Main">
//       <AllReviewsPage />
//     </section>
//   );
// };

// export default page;



// app/reviews/page.tsx (or your specific route)
import React from "react";
// Assuming Review.tsx exports ReviewCards as default, and you might call it AllReviewsPage
import AllReviewsPage from "../components/Review";

const ReviewsDisplayPage = () => {
  return (
    <AllReviewsPage />
  );
};

export default ReviewsDisplayPage;