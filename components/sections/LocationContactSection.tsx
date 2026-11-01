import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapPin, Phone, ExternalLink, Navigation, Compass } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/Icons";
import { BadgeUnconfirmed } from "@/components/ui/BadgeUnconfirmed";
import { FadeIn } from "@/components/ui/MotionWrapper";
import type { AjustesGenerales } from "@/lib/sanity/types";

interface LocationContactSectionProps {
  settings?: AjustesGenerales | null;
}

const DEFAULT_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Jir%C3%B3n+Callao+126%2C+Cercado+de+Lima+15001";

export function LocationContactSection({
  settings,
}: LocationContactSectionProps) {
  const address =
    settings?.direccion || "Jirón Callao 126, Cercado de Lima 15001";
  const reference =
    settings?.pisoReferencia ||
    "7.º piso (POR CONFIRMAR) • A pasos de la Plaza de Armas";
  const whatsappNumber =
    settings?.telefonoWhatsapp?.replace(/\D/g, "") || "51933596324";
  const displayPhone = settings?.telefonoWhatsapp || "933 596 324";
  const instagramUrl =
    settings?.instagramUrl || "https://www.instagram.com/sumaqcentergym/";
  const facebookUrl =
    settings?.facebookUrl || "https://www.facebook.com/SumaqSumaqGYM/";

  const whatsappLocationUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola Sumaq Center Gym, quisiera saber cómo llegar al gimnasio."
  )}`;

  return (
    <section id="ubicacion" className="py-20 lg:py-28 bg-[#F8F9F6] relative border-b border-[#DCE3DD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <SectionHeading
            badge="Sede & Contacto"
            title="En el Punto Más Accesible del Centro de Lima"
            description="A pocas cuadras de la Plaza de Armas, Palacio de Gobierno e iglesias históricas. Fácil acceso peatonal y en transporte público."
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tarjeta de Datos de Contacto y Referencias */}
          <div className="lg:col-span-5">
            <FadeIn direction="up" className="h-full">
              <div className="h-full rounded-xl p-8 bg-[#FFFFFF] border border-[#DCE3DD] flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-6">
                  {/* Dirección */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#176B48] flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#176B48] block">
                        Dirección Principal
                      </span>
                      <p className="text-lg font-bold text-[#17211D] mt-0.5">
                        {address.split(",")[0]}
                      </p>
                      <p className="text-xs text-[#526159]">
                        {address.includes(",")
                          ? address.split(",").slice(1).join(",")
                          : "Cercado de Lima 15001, Perú"}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-[#526159]">Piso y referencia:</span>
                        <BadgeUnconfirmed size="sm" label="7.° PISO (POR CONFIRMAR)" />
                      </div>
                    </div>
                  </div>

                  {/* Referencia Geográfica */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#1E3A8A] flex items-center justify-center shrink-0">
                      <Compass className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] block">
                        Punto de Referencia
                      </span>
                      <p className="text-sm font-semibold text-[#17211D] mt-0.5">
                        {reference}
                      </p>
                      <p className="text-xs text-[#526159] mt-1 leading-relaxed">
                        Cerca al Palacio Municipal, Club de la Unión y principales avenidas del damero central de Lima.
                      </p>
                    </div>
                  </div>

                  {/* Teléfono y WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#176B48] flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#176B48] block">
                        Teléfono & WhatsApp
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={whatsappLocationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-mono font-bold text-[#17211D] hover:text-[#176B48] transition-colors"
                        >
                          {displayPhone}
                        </a>
                        <BadgeUnconfirmed size="sm" />
                      </div>
                      <span className="text-xs text-[#526159] block mt-0.5">
                        Atención directa a consultas y membresías
                      </span>
                    </div>
                  </div>

                  {/* Redes Sociales Oficiales */}
                  <div className="pt-4 border-t border-[#DCE3DD]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#526159] block mb-3">
                      Canales Oficiales
                    </span>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F8F9F6] hover:bg-[#E7F1E9] text-xs font-medium text-[#17211D] border border-[#DCE3DD] hover:border-[#176B48]/40 transition-all min-h-[44px]"
                      >
                        <InstagramIcon className="w-4 h-4 text-[#176B48]" />
                        <span>@sumaqcentergym</span>
                        <ExternalLink className="w-3 h-3 text-[#526159]" />
                      </a>

                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F8F9F6] hover:bg-[#E7F1E9] text-xs font-medium text-[#17211D] border border-[#DCE3DD] hover:border-[#176B48]/40 transition-all min-h-[44px]"
                      >
                        <FacebookIcon className="w-4 h-4 text-[#1E3A8A]" />
                        <span>SumaqSumaqGYM</span>
                        <ExternalLink className="w-3 h-3 text-[#526159]" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={DEFAULT_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#F8F9F6] hover:bg-[#E7F1E9] text-[#17211D] border border-[#DCE3DD] hover:border-[#176B48]/40 transition-all min-h-[44px]"
                  >
                    <Navigation className="w-4 h-4 text-[#176B48]" />
                    <span>Abrir en Google Maps</span>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Mapa Visual Limpio en Modalidad Diurna */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0.15} className="h-full">
              <div className="h-full rounded-xl overflow-hidden border border-[#DCE3DD] relative min-h-[380px] bg-[#FFFFFF] shadow-sm">
                <iframe
                  title="Ubicación de Sumaq Center Gym en Cercado de Lima"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.9961621255747!2d-77.03450962493922!3d-12.04381804186591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b598b98b9d%3A0x8670bc265e1eb04!2sJr.%20Callao%20126%2C%20Cercado%20de%20Lima%2015001!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "420px" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>

                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <div className="px-3.5 py-1.5 rounded-lg bg-[#FFFFFF]/95 backdrop-blur-md border border-[#DCE3DD] text-xs font-semibold text-[#17211D] flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#176B48]"></span>
                    <span>Jr. Callao 126 • Cercado de Lima</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
