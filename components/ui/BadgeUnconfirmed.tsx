import React from "react";
import { AlertCircle } from "lucide-react";

interface BadgeUnconfirmedProps {
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

export function BadgeUnconfirmed({
  label = "POR CONFIRMAR",
  size = "sm",
  className = "",
}: BadgeUnconfirmedProps) {
  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2 py-0.5 gap-1"
      : "text-xs px-2.5 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-md font-semibold tracking-wider uppercase bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] ${sizeClasses} ${className}`}
      title="Dato provisional pendiente de confirmación oficial"
    >
      <AlertCircle className={size === "sm" ? "w-3 h-3 text-[#B45309]" : "w-3.5 h-3.5 text-[#B45309]"} />
      <span>{label}</span>
    </span>
  );
}
