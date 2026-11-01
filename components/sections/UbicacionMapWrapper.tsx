"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const LeafletMapClient = dynamic(
  () => import("@/components/sections/LeafletMapClient"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[420px] rounded-xl bg-[#E7F1E9]/60 border border-[#DCE3DD] flex flex-col items-center justify-center p-6 text-center animate-pulse">
        <MapPin className="w-10 h-10 text-[#176B48] mb-3 animate-bounce" />
        <span className="text-sm font-bold text-[#17211D]">
          Cargando mapa interactivo...
        </span>
        <span className="text-xs text-[#526159] mt-1">
          Preparando coordenadas de Jr. Callao 126
        </span>
      </div>
    ),
  }
);

export function UbicacionMapWrapper() {
  return <LeafletMapClient />;
}
