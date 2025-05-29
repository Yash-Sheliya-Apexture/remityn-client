// src/TestimonialCard.tsx
import React from "react";
import { Testimonial } from "./testimonialData";
import TwitterIcon from "./TwitterIcon";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  // Note: The original HTML uses Next.js <Image> component for optimization.
  // Here, we use a standard <img> tag. If using Next.js, replace with <Image>.
  // The srcset and other attributes from the original HTML are for Next.js Image.
  // We'll use the higher resolution src directly.
  const imageUrlForStandardImg = testimonial.author.imageUrl;

  return (
    <div>
      {" "}
      {/* This div with no class was present in original HTML */}
      <div className="border-gray-500/40  flex h-full flex-col rounded-2xl border p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2.5">
            <img
              alt={testimonial.author.imageAlt}
              loading="lazy"
              decoding="async"
              className="size-14 rounded-full"
              style={{ color: "transparent" }}
              src={imageUrlForStandardImg}
            />

            <div className="flex min-w-0 flex-col gap-y-0.5">
              <h1 className="text-mainheadingWhite truncate">
                {testimonial.author.name}
              </h1>
              <p className="text-subheadingWhite truncate">
                {testimonial.author.handle}
              </p>
            </div>
          </div>
          <span
            className="hover:text-caption-foreground -mt-2.5 -mr-2.5 p-4"
            rel="noreferrer"
          >
            <TwitterIcon />
          </span>
        </div>
        <div
          className="text-white mt-4 break-words"
          dangerouslySetInnerHTML={{ __html: testimonial.contentHtml }}
        />
        <p className="text-subheadingWhite mt-auto pt-[14px] text-xs">
          {testimonial.timestamp}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
