import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BadgeUnconfirmed } from "@/components/ui/BadgeUnconfirmed";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { UbicacionMapWrapper } from "@/components/sections/UbicacionMapWrapper";
import {
  SITE_DATA,
  NAVIGATION_LINKS,
  getWhatsAppUrl,
} from "@/lib/data/site-data";
import {
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  Bus,
} from "lucide-react";
import { getSettings } from "@/lib/sanity/client";

export const metadata: Metadata = {
  title: "Ubicación y Cómo Llegar",
  description:
    "Encuentra Sumaq Center Gym en Jirón Callao 126, Cercado de Lima 15001. Mapa interactivo, geolocalización en vivo y rutas directas a través de Waze y Google Maps.",
  alternates: {
    canonical: "/ubicacion",
  },
  openGraph: {
    title: "Ubicación y Accesos | Sumaq Center Gym",
    description:
      "A pocos pasos de la histórica Plaza de Armas de Lima. Jirón Callao 126. Consulta el mapa y rutas directas.",
    url: "/ubicacion",
    locale: "es_PE",
    type: "website",
  },
};

async function DynamicNavbar() {
  const settings = await getSettings();
  return <Navbar settings={settings} />;
}

async function DynamicFooter() {
  const settings = await getSettings();
  return <Footer settings={settings} />;
}

export default function UbicacionPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Hola Sumaq Center Gym, deseo consultar indicaciones para llegar al gimnasio."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F6] text-[#17211D] selection:bg-[#176B48] selection:text-white">
      {/* 1. Header con Navbar */}
      <Suspense fallback={<Navbar />}>
        <DynamicNavbar />
      </Suspense>

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado Principal Accesible */}
          <div className="py-6 sm:py-10">
            <SectionHeading
              badge="Sede Central & Accesos"
              title="En el Punto Más Accesible del Centro de Lima"
              description="A pocas cuadras de la Plaza de Armas, Palacio Municipal e iglesias históricas. Fácil acceso peatonal y en transporte público metropolitano."
            />
          </div>

          {/* Grilla Principal: Datos Textuales Accesibles en DOM + Mapa Interactivo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Columna Izquierda: Información Estructurada y Enlaces de Ruteo */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="bg-[#FFFFFF] border border-[#DCE3DD] rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
                {/* 1. Dirección Textual Accesible en el DOM */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#176B48] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#176B48] block">
                      Dirección Oficial
                    </span>
                    <h2 className="text-xl font-bold text-[#17211D] mt-0.5">
                      {SITE_DATA.street}
                    </h2>
                    <p className="text-xs text-[#526159] mt-0.5">
                      {SITE_DATA.district}, {SITE_DATA.city} {SITE_DATA.postalCode}, {SITE_DATA.country}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-[#526159]">Piso / Referencia:</span>
                      <BadgeUnconfirmed size="sm" label="7.° PISO (POR CONFIRMAR)" />
                    </div>
                  </div>
                </div>

                {/* 2. Referencia Histórica y Urbana */}
                <div className="flex items-start gap-4 pt-4 border-t border-[#DCE3DD]">
                  <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#1E3A8A] flex items-center justify-center shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] block">
                      Punto de Referencia
                    </span>
                    <p className="text-sm font-semibold text-[#17211D] mt-0.5">
                      {SITE_DATA.reference}
                    </p>
                    <p className="text-xs text-[#526159] mt-1 leading-relaxed">
                      Zona céntrica de fácil tránsito peatonal, a una cuadra de la Plaza Mayor de Lima y cercana al Club de la Unión.
                    </p>
                  </div>
                </div>

                {/* 3. Canales Directos de Ruteo a Waze y Google Maps */}
                <div className="pt-4 border-t border-[#DCE3DD] space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#17211D] block">
                    Cómo Llegar (Navegación GPS)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={NAVIGATION_LINKS.wazeDirections}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#F8F9F6] hover:bg-[#E7F1E9] text-[#17211D] border border-[#DCE3DD] hover:border-[#176B48]/50 transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]"
                    >
                      <Navigation className="w-4 h-4 text-[#1E3A8A]" />
                      <span>Ruta en Waze</span>
                      <ExternalLink className="w-3 h-3 text-[#526159]" />
                    </a>

                    <a
                      href={NAVIGATION_LINKS.googleMapsDirections}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#F8F9F6] hover:bg-[#E7F1E9] text-[#17211D] border border-[#DCE3DD] hover:border-[#176B48]/50 transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]"
                    >
                      <MapPin className="w-4 h-4 text-[#176B48]" />
                      <span>Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-[#526159]" />
                    </a>
                  </div>
                </div>

                {/* 4. Contacto y Consultas */}
                <div className="pt-4 border-t border-[#DCE3DD] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#526159]">
                      Atención Directa
                    </span>
                    <BadgeUnconfirmed size="sm" />
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#176B48] hover:bg-[#105236] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>WhatsApp: {SITE_DATA.phoneDisplay}</span>
                    </a>
                  </div>
                </div>

                {/* 5. Canales Sociales */}
                <div className="pt-4 border-t border-[#DCE3DD]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526159] block mb-2.5">
                    Redes Oficiales
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href={SITE_DATA.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F8F9F6] hover:bg-[#E7F1E9] text-xs font-medium text-[#17211D] border border-[#DCE3DD] transition-all min-h-[44px]"
                      aria-label="Instagram de Sumaq Center Gym"
                    >
                      <InstagramIcon className="w-4 h-4 text-[#176B48]" />
                      <span>@sumaqcentergym</span>
                      <ExternalLink className="w-3 h-3 text-[#526159]" />
                    </a>

                    <a
                      href={SITE_DATA.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F8F9F6] hover:bg-[#E7F1E9] text-xs font-medium text-[#17211D] border border-[#DCE3DD] transition-all min-h-[44px]"
                      aria-label="Facebook de Sumaq Center Gym"
                    >
                      <FacebookIcon className="w-4 h-4 text-[#1E3A8A]" />
                      <span>SumaqSumaqGYM</span>
                      <ExternalLink className="w-3 h-3 text-[#526159]" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Guía Breve de Transporte */}
              <div className="bg-[#E7F1E9]/40 border border-[#DCE3DD] rounded-xl p-5 text-xs text-[#526159] space-y-2">
                <div className="flex items-center gap-2 text-[#176B48] font-bold">
                  <Bus className="w-4 h-4" />
                  <span className="uppercase tracking-wider">Transporte y Acceso</span>
                </div>
                <p className="leading-relaxed">
                  Próximo a estaciones del Metropolitano (Estación Jr. de la Unión) y líneas de buses que recorren las avenidas Tacna y Abancay.
                </p>
              </div>
            </div>

            {/* Columna Derecha: Mapa Leaflet Interactivo */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex-1 rounded-xl overflow-hidden border border-[#DCE3DD] bg-[#FFFFFF] shadow-sm min-h-[460px] lg:min-h-[580px]">
                <UbicacionMapWrapper />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 2. Footer Institucional (#17211D) que contiene de forma única y canónica el Horario */}
      <Suspense fallback={<Footer />}>
        <DynamicFooter />
      </Suspense>

      {/* 3. WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  );
}
