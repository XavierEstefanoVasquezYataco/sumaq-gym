"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsAppUrl, SITE_DATA } from "@/lib/data/site-data";
import { MapPin, X, Info } from "lucide-react";

interface WhatsAppFloatProps {
  defaultMessage?: string;
}

export function WhatsAppFloat({
  defaultMessage = "Hola Sumaq Center Gym, deseo consultar sobre membresías y disponibilidad.",
}: WhatsAppFloatProps) {
  const url = getWhatsAppUrl(defaultMessage);
  const [showNotice, setShowNotice] = useState(false);

  // Si el teléfono está verificado, abre WhatsApp directamente
  if (url) {
    return (
      <aside
        aria-label="Canal de contacto de WhatsApp"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 group"
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar por WhatsApp a Sumaq Center Gym"
          className="flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-3 rounded-full sm:rounded-xl bg-[#176B48] text-white hover:bg-[#105236] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 border border-white/20 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
        >
          <span className="relative flex h-2 w-2 sm:mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
          <span className="hidden sm:inline-block font-sans ml-2">WhatsApp</span>
        </a>
      </aside>
    );
  }

  // Si el teléfono NO está verificado: acción accesible que no abre la línea no confirmada
  return (
    <aside
      aria-label="Información de atención y contacto"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30"
    >
      {/* Popover informativo accesible */}
      {showNotice && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Aviso de canal de atención"
          className="absolute bottom-16 right-0 w-80 p-5 rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] shadow-xl text-[#17211D] space-y-3 z-40"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B48]">
              <Info className="w-4 h-4 text-[#176B48]" />
              <span>Contacto Directo</span>
            </div>
            <button
              type="button"
              onClick={() => setShowNotice(false)}
              aria-label="Cerrar aviso de contacto"
              className="p-1 rounded-md text-[#526159] hover:text-[#17211D] hover:bg-[#F8F9F6] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#526159] leading-relaxed">
            La línea de WhatsApp se encuentra en proceso de validación oficial.
            Puedes consultar información de membresías y clases directamente en la
            recepción de nuestra sede.
          </p>

          <div className="pt-2 border-t border-[#DCE3DD] flex items-center justify-between gap-2">
            <span className="text-[11px] text-[#526159] font-medium">
              {SITE_DATA.street}
            </span>
            <Link
              href="/ubicacion"
              onClick={() => setShowNotice(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Ver Sede</span>
            </Link>
          </div>
        </div>
      )}

      {/* Botón flotante accesible */}
      <button
        type="button"
        onClick={() => setShowNotice(!showNotice)}
        aria-expanded={showNotice}
        aria-haspopup="dialog"
        aria-label="Consultar canal de atención (Línea telefónica en validación)"
        title="Línea de WhatsApp pendiente de confirmación formal. Haz clic para más información."
        className="flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-3 rounded-full sm:rounded-xl bg-[#176B48] text-white hover:bg-[#105236] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 border border-white/20 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
      >
        <WhatsAppIcon className="w-5 h-5 text-white shrink-0 opacity-90" />
        <span className="hidden sm:inline-block font-sans ml-2">
          Contacto en Sede
        </span>
      </button>
    </aside>
  );
}
