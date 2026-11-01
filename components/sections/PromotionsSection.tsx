import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkles, Calendar, ArrowRight, Tag, MapPin } from "lucide-react";
import { BadgeUnconfirmed } from "@/components/ui/BadgeUnconfirmed";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { urlFor } from "@/sanity/lib/image";
import { formatDateInLima } from "@/lib/sanity/queries";
import { isDemoMode, getWhatsAppUrl } from "@/lib/data/site-data";
import type { Promocion } from "@/lib/sanity/types";

interface PromotionsSectionProps {
  promotions?: Promocion[];
}

const DEFAULT_WHATSAPP_PROMO_URL = getWhatsAppUrl(
  "Hola Sumaq Center Gym, quisiera conocer las promociones vigentes de membresía."
);

export function PromotionsSection({ promotions = [] }: PromotionsSectionProps) {
  const hasPromotions = promotions && promotions.length > 0;

  return (
    <section id="promociones" className="scroll-mt-20 py-20 lg:py-28 bg-[#17211D] text-[#F8F9F6] relative border-y border-[#263730]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <SectionHeading
            badge="Promociones & Ofertas"
            title="Beneficios Especiales para Tu Entrenamiento"
            description="Aprovecha las campañas activas para comenzar a entrenar al mejor costo en el centro de Lima."
            inverted={true}
          />
        </FadeIn>

        {hasPromotions ? (
          /* Grid de Promociones Dinámicas desde Sanity */
          <StaggerContainer
            staggerDelay={0.1}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {promotions.map((promo) => {
              const buttonText =
                promo.textoBoton || "Reclamar Promoción por WhatsApp";
              const buttonUrl =
                promo.enlaceBoton ||
                getWhatsAppUrl(
                  `Hola Sumaq Center Gym, deseo reclamar la promoción: "${promo.titulo}".`
                );

              return (
                <StaggerItem key={promo._id} className="h-full">
                  <div className="rounded-xl bg-[#202E27] border border-[#2D4339] p-7 sm:p-9 flex flex-col justify-between h-full space-y-6 shadow-md">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {promo.descuento && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white">
                            <Sparkles className="w-3.5 h-3.5" />
                            {promo.descuento}
                          </span>
                        )}
                        {promo.fechaFin && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#A3B8AD] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                            <Calendar className="w-3 h-3 text-[#A3B8AD]" />
                            <span>
                              Válido hasta {formatDateInLima(promo.fechaFin)} (Lima)
                            </span>
                          </span>
                        )}
                      </div>

                      {promo.imagen && (
                        <div className="relative w-full h-48 sm:h-56 rounded-lg overflow-hidden border border-white/10 my-4 bg-black/40">
                          <Image
                            src={urlFor(promo.imagen).width(800).height(450).url()}
                            alt={promo.titulo}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}

                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                        {promo.titulo}
                      </h3>

                      <p className="text-sm text-[#A3B8AD] leading-relaxed">
                        {promo.descripcion}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      {buttonUrl ? (
                        <a
                          href={buttonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all min-h-[44px]"
                        >
                          <WhatsAppIcon className="w-4 h-4 text-white" />
                          <span>{buttonText}</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </a>
                      ) : (
                        <Link
                          href="/ubicacion"
                          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all min-h-[44px]"
                        >
                          <MapPin className="w-4 h-4 text-white" />
                          <span>Consultar en Sede</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </Link>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : isDemoMode ? (
          /* Estado Fallback Elegante en Modo Demostración */
          <FadeIn direction="up">
            <div className="rounded-xl bg-[#202E27] border border-[#2D4339] p-8 sm:p-12 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white">
                      <Sparkles className="w-3.5 h-3.5" />
                      Campaña de Temporada
                    </span>
                    <BadgeUnconfirmed
                      size="sm"
                      label="ADMINISTRABLE DESDE SANITY (MODO DEMO)"
                    />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                    Membresías con Precio Especial de Apertura
                  </h3>

                  <p className="text-sm sm:text-base text-[#A3B8AD] leading-relaxed max-w-2xl">
                    Inscríbete hoy en <strong className="text-white">Sumaq Center Gym</strong> y accede a todas las áreas de musculación y cardio con tarifa preferencial. Consulta cupos disponibles y promociones por meses combinados directamente con nuestro equipo.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#A3B8AD]">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-[#A3B8AD]" />
                      <span>Sede Jirón Callao 126 • Cercado de Lima</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-[#A3B8AD]" />
                      <span>Consulta facilidades y descuentos por WhatsApp</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                  {DEFAULT_WHATSAPP_PROMO_URL ? (
                    <a
                      href={DEFAULT_WHATSAPP_PROMO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all min-h-[44px]"
                    >
                      <WhatsAppIcon className="w-5 h-5 text-white" />
                      <span>Consultar Promo</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </a>
                  ) : (
                    <Link
                      href="/ubicacion"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all min-h-[44px]"
                    >
                      <MapPin className="w-5 h-5 text-white" />
                      <span>Consultar en Sede</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
                  )}
                  <span className="text-[11px] text-[#A3B8AD] mt-2 text-center lg:text-right">
                    Atención en recepción • Jirón Callao 126
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        ) : (
          /* Estado Neutral en Producción (Sin Ofertas Ficticias) */
          <FadeIn direction="up">
            <div className="rounded-xl bg-[#202E27] border border-[#2D4339] p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-md space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/10 text-[#A3B8AD] border border-white/15">
                <Tag className="w-3.5 h-3.5 text-[#A3B8AD]" />
                Campañas y Promociones
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Próximamente Nuevas Promociones Especiales
              </h3>
              <p className="text-sm text-[#A3B8AD] leading-relaxed max-w-xl mx-auto">
                Actualmente no contamos con promociones vigentes publicadas. Si deseas conocer disponibilidad de cupos, facilidades de pago o tarifas corporativas para nuevas inscripciones, escríbenos directamente por WhatsApp.
              </p>
              <div className="pt-3">
                {DEFAULT_WHATSAPP_PROMO_URL ? (
                  <a
                    href={DEFAULT_WHATSAPP_PROMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all min-h-[44px]"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Consultar Membresías por WhatsApp</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </a>
                ) : (
                  <Link
                    href="/ubicacion"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all min-h-[44px]"
                  >
                    <MapPin className="w-4 h-4 text-white" />
                    <span>Consultar en Sede</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>
                )}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
