"use client";

import React from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";

interface WhatsAppFloatProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function WhatsAppFloat({
  phoneNumber = "51933596324",
  defaultMessage = "Hola Sumaq Center Gym, deseo consultar sobre membresías y promociones vigentes.",
}: WhatsAppFloatProps) {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp a Sumaq Center Gym"
        className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-[#176B48] text-white hover:bg-[#105236] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#176B48]/25 hover:shadow-[#176B48]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 border border-white/20 min-h-[44px]"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <WhatsAppIcon className="w-5 h-5 text-white" />
        <span className="hidden sm:inline font-sans">Escribir al WhatsApp</span>
        <span className="sm:hidden font-sans">WhatsApp</span>
      </a>
    </div>
  );
}
