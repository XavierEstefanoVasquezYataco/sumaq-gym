import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  inverted?: boolean;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className = "",
  inverted = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-12 sm:mb-16 ${
        isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl"
      } ${className}`}
    >
      {badge && (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase mb-3.5 border ${
            inverted
              ? "bg-white/10 text-[#E7F1E9] border-white/20"
              : "bg-[#E7F1E9] text-[#176B48] border-[#DCE3DD]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              inverted ? "bg-[#E7F1E9]" : "bg-[#176B48]"
            }`}
          ></span>
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight ${
          inverted ? "text-white" : "text-[#17211D]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3.5 text-sm sm:text-base leading-relaxed ${
            inverted ? "text-[#9DB0A6]" : "text-[#526159]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
