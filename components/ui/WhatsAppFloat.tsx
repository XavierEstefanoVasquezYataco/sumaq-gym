"use client";

import React from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsAppUrl } from "@/lib/data/site-data";

interface WhatsAppFloatProps {
  defaultMessage?: string;
}

export function WhatsAppFloat({
  defaultMessage = "Hola Sumaq Center Gym, deseo consultar sobre membresías y disponibilidad.",
}: WhatsAppFloatProps) {
  const url = getWhatsAppUrl(defaultMessage);

  return (
    <aside
      aria-label="Canal de contacto flotante"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 group"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultar por WhatsApp a Sumaq Center Gym"
        title="WhatsApp de Sumaq Center Gym (Línea por confirmar formalmente)"
        className="flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-3 rounded-full sm:rounded-xl bg-[#176B48] text-white hover:bg-[#105236] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 border border-white/20 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
      >
        <span className="relative flex h-2 w-2 sm:mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
        <span className="hidden sm:inline-block font-sans ml-2">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
