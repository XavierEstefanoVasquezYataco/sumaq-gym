import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapPin, Phone, ExternalLink, Navigation, Compass } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/Icons";
import { BadgeUnconfirmed } from "@/components/ui/BadgeUnconfirmed";
import { FadeIn } from "@/components/ui/MotionWrapper";
import { SITE_DATA, NAVIGATION_LINKS, getWhatsAppUrl } from "@/lib/data/site-data";
import type { AjustesGenerales } from "@/lib/sanity/types";

interface LocationContactSectionProps {
  settings?: AjustesGenerales | null;
}

export function LocationContactSection({
  settings,
}: LocationContactSectionProps) {
  const address =
    settings?.direccion || SITE_DATA.address;
  const reference =
    settings?.pisoReferencia ||
    `${SITE_DATA.floorReference} • ${SITE_DATA.reference}`;
  const displayPhone = settings?.telefonoWhatsapp || SITE_DATA.phoneDisplay;
  const instagramUrl =
    settings?.instagramUrl || SITE_DATA.instagramUrl;
  const facebookUrl =
    settings?.facebookUrl || SITE_DATA.facebookUrl;

  const whatsappLocationUrl = getWhatsAppUrl(
    "Hola Sumaq Center Gym, quisiera saber cómo llegar al gimnasio."
  );

  return (
    <section id="ubicacion" className="py-20 lg:py-28 bg-[#F8F9F6] relative border-b border-[#DCE3DD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <SectionHeading
            badge="Sede & Contacto"
            title="En el Punto Más Accesible del Centro de Lima"
            description="A pocas cuadras de la Plaza de Armas y Palacio Municipal. Fácil acceso peatonal y en transporte público metropolitano."
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tarjeta de Datos de Contacto y Referencias */}
          <div className="lg:col-span-5">
            <FadeIn direction="up" className="h-full">
              <div className="h-full p-8 rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-6">
                  {/* Dirección */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#176B48] flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#176B48] block">
                        Dirección
                      </span>
                      <p className="text-lg font-bold text-[#17211D] mt-0.5">
                        {address}
                      </p>
                      <span className="text-xs text-[#526159] block mt-0.5">
                        Cercado de Lima 15001, Perú
                      </span>
                      <div className="mt-2">
                        <BadgeUnconfirmed
                          size="sm"
                          label="UBICACIÓN EXACTA POR CONFIRMAR"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Referencia */}
                  <div className="flex items-start gap-4 pt-4 border-t border-[#DCE3DD]">
                    <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#1E3A8A] flex items-center justify-center shrink-0">
                      <Compass className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] block">
                        Piso y Referencia
                      </span>
                      <p className="text-sm font-semibold text-[#17211D] mt-0.5">
                        {reference}
                      </p>
                    </div>
                  </div>

                  {/* Teléfono / WhatsApp */}
                  <div className="flex items-start gap-4 pt-4 border-t border-[#DCE3DD]">
                    <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#176B48] flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#526159] block">
                          WhatsApp / Teléfono
                        </span>
                        <BadgeUnconfirmed size="sm" />
                      </div>
                      <a
                        href={whatsappLocationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-bold text-[#176B48] hover:underline mt-0.5 block"
                      >
                        {displayPhone}
                      </a>
                    </div>
                  </div>

                  {/* Redes Sociales */}
                  <div className="pt-4 border-t border-[#DCE3DD]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#526159] block mb-3">
                      Redes Sociales
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
                    href={NAVIGATION_LINKS.googleMapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#F8F9F6] hover:bg-[#E7F1E9] text-[#17211D] border border-[#DCE3DD] hover:border-[#176B48]/40 transition-all min-h-[44px]"
                  >
                    <Navigation className="w-4 h-4 text-[#176B48]" />
                    <span>Buscar dirección en Google Maps</span>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Estado de Ubicación */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0.15} className="h-full">
              <div className="h-full rounded-xl overflow-hidden border border-[#DCE3DD] relative min-h-[380px] bg-[#FFFFFF] shadow-sm flex flex-col items-center justify-center p-8 text-center">
                <MapPin className="w-12 h-12 text-[#176B48] mb-3" />
                <h3 className="text-base font-bold text-[#17211D] uppercase">
                  {SITE_DATA.street}
                </h3>
                <p className="text-xs text-[#526159] mt-1 mb-4 max-w-md">
                  {SITE_DATA.reference}. Coordenadas exactas pendientes de validación por la administración.
                </p>
                <a
                  href={NAVIGATION_LINKS.googleMapsSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all min-h-[44px]"
                >
                  <span>Buscar dirección en Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
