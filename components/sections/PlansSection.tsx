import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check, ArrowRight, MapPin } from "lucide-react";
import { BadgeUnconfirmed } from "@/components/ui/BadgeUnconfirmed";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { getWhatsAppUrl } from "@/lib/data/site-data";
import type { Plan } from "@/lib/sanity/types";

interface PlansSectionProps {
  plans?: Plan[];
}

const DEFAULT_PLANS = [
  {
    name: "Plan Mensual",
    period: "1 Mes",
    description: "Modalidad flexible mes a mes para tu rutina de fuerza y acondicionamiento.",
    features: [
      "Acceso a sala de musculación y pesas",
      "Uso de máquinas cardiovasculares",
      "Orientación básica en sala",
      "Casilleros para uso durante el entrenamiento",
    ],
    highlighted: false,
    whatsappMsg: "Hola Sumaq Center Gym, deseo consultar el precio del Plan Mensual.",
  },
  {
    name: "Plan Trimestral",
    period: "3 Meses",
    description: "Período orientado a la consolidación del hábito de entrenamiento.",
    features: [
      "Acceso a sala de musculación y pesas",
      "Uso de máquinas cardiovasculares",
      "Orientación básica en sala",
      "Casilleros para uso durante el entrenamiento",
    ],
    highlighted: true,
    whatsappMsg: "Hola Sumaq Center Gym, deseo consultar el precio y condiciones del Plan Trimestral.",
  },
  {
    name: "Plan Anual",
    period: "12 Meses",
    description: "Modalidad de largo plazo para entrenamiento disciplinado y continuo.",
    features: [
      "Acceso a sala de musculación y pesas",
      "Uso de máquinas cardiovasculares",
      "Orientación básica en sala",
      "Casilleros para uso durante el entrenamiento",
    ],
    highlighted: false,
    whatsappMsg: "Hola Sumaq Center Gym, deseo consultar el precio del Plan Anual.",
  },
];

export function PlansSection({ plans = [] }: PlansSectionProps) {
  const hasSanityPlans = plans && plans.length > 0;

  return (
    <section id="membresias" className="scroll-mt-20 py-20 lg:py-28 bg-[#F8F9F6] relative border-b border-[#DCE3DD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <SectionHeading
            badge="Membresías"
            title="Modalidades de Entrenamiento"
            description="Elige el período que mejor se adapte a tus metas físicas. Tarifas oficiales sujetas a confirmación en recepción o por WhatsApp."
          />
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {hasSanityPlans
            ? plans.map((plan) => {
                const isUnconfirmed =
                  !plan.precio ||
                  plan.precio.toUpperCase().includes("CONFIRMAR") ||
                  plan.precio.trim() === "";

                const planUrl = getWhatsAppUrl(
                  plan.mensajeWhatsapp ||
                    `Hola Sumaq Center Gym, deseo consultar el precio del ${plan.nombre}.`
                );

                return (
                  <StaggerItem key={plan._id} className="h-full">
                    <div
                      className={`h-full rounded-xl p-8 flex flex-col justify-between transition-all duration-300 relative bg-[#FFFFFF] ${
                        plan.destacado
                          ? "border-2 border-[#176B48] shadow-md shadow-[#176B48]/5 lg:-translate-y-1"
                          : "border border-[#DCE3DD] shadow-sm hover:border-[#176B48]/40"
                      }`}
                    >
                      {plan.destacado && (
                        <div className="absolute -top-3 left-6">
                          <span className="inline-flex items-center px-3 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#176B48] text-white">
                            Opción Destacada
                          </span>
                        </div>
                      )}

                      <div>
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-[#17211D] mb-1">
                            {plan.nombre}
                          </h3>
                          {plan.descripcion && (
                            <p className="text-xs text-[#526159]">
                              {plan.descripcion}
                            </p>
                          )}
                        </div>

                        {/* Precio: Muestra 'Consultar precio' sin S/. suelto si no está confirmado */}
                        <div className="py-4 my-4 border-y border-[#DCE3DD] flex flex-col gap-1.5">
                          {isUnconfirmed ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xl sm:text-2xl font-bold text-[#17211D]">
                                Consultar precio
                              </span>
                              <BadgeUnconfirmed size="sm" label="POR CONFIRMAR" />
                            </div>
                          ) : (
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-3xl sm:text-4xl font-black text-[#17211D]">
                                {plan.precio.startsWith("S/")
                                  ? plan.precio
                                  : `S/ ${plan.precio}`}
                              </span>
                            </div>
                          )}
                          <span className="text-xs text-[#526159]">
                            Modalidad: {plan.periodo || "Por período"}
                          </span>
                        </div>

                        {/* Beneficios verificables de sala */}
                        {plan.beneficios && plan.beneficios.length > 0 && (
                          <ul className="space-y-3 mb-8 text-xs sm:text-sm text-[#526159]">
                            {plan.beneficios.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2.5">
                                <Check className="w-4 h-4 text-[#176B48] shrink-0 mt-0.5" />
                                <span className="text-[#17211D]">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div>
                        {planUrl ? (
                          <a
                            href={planUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                              plan.destacado
                                ? "bg-[#176B48] text-white hover:bg-[#105236] shadow-sm"
                                : "bg-[#F8F9F6] text-[#17211D] hover:bg-[#E7F1E9] border border-[#DCE3DD] hover:border-[#176B48]/50"
                            }`}
                          >
                            <WhatsAppIcon className="w-4 h-4" />
                            <span>Consultar Plan</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <Link
                            href="/ubicacion"
                            className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                              plan.destacado
                                ? "bg-[#176B48] text-white hover:bg-[#105236] shadow-sm"
                                : "bg-[#F8F9F6] text-[#17211D] hover:bg-[#E7F1E9] border border-[#DCE3DD] hover:border-[#176B48]/50"
                            }`}
                            title="Línea telefónica en validación. Consulta en nuestra sede."
                          >
                            <MapPin className="w-4 h-4" />
                            <span>Consultar en Sede</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                );
              })
            : DEFAULT_PLANS.map((plan, index) => {
                const planUrl = getWhatsAppUrl(plan.whatsappMsg);

                return (
                  <StaggerItem key={index} className="h-full">
                    <div
                      className={`h-full rounded-xl p-8 flex flex-col justify-between transition-all duration-300 relative bg-[#FFFFFF] ${
                        plan.highlighted
                          ? "border-2 border-[#176B48] shadow-md shadow-[#176B48]/5 lg:-translate-y-1"
                          : "border border-[#DCE3DD] shadow-sm hover:border-[#176B48]/40"
                      }`}
                    >
                      {plan.highlighted && (
                        <div className="absolute -top-3 left-6">
                          <span className="inline-flex items-center px-3 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#176B48] text-white">
                            Demostración de Diseño
                          </span>
                        </div>
                      )}

                      <div>
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-[#17211D] mb-1">
                            {plan.name}
                          </h3>
                          <p className="text-xs text-[#526159]">
                            {plan.description}
                          </p>
                        </div>

                        {/* Precio: Muestra 'Consultar precio' sin S/. suelto */}
                        <div className="py-4 my-4 border-y border-[#DCE3DD] flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-[#17211D]">
                              Consultar precio
                            </span>
                            <BadgeUnconfirmed size="sm" label="POR CONFIRMAR" />
                          </div>
                          <span className="text-xs text-[#526159]">
                            Modalidad: {plan.period}
                          </span>
                        </div>

                        <ul className="space-y-3 mb-8 text-xs sm:text-sm text-[#526159]">
                          {plan.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5">
                              <Check className="w-4 h-4 text-[#176B48] shrink-0 mt-0.5" />
                              <span className="text-[#17211D]">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        {planUrl ? (
                          <a
                            href={planUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                              plan.highlighted
                                ? "bg-[#176B48] text-white hover:bg-[#105236] shadow-sm"
                                : "bg-[#F8F9F6] text-[#17211D] hover:bg-[#E7F1E9] border border-[#DCE3DD] hover:border-[#176B48]/50"
                            }`}
                          >
                            <WhatsAppIcon className="w-4 h-4" />
                            <span>Consultar Plan</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <Link
                            href="/ubicacion"
                            className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                              plan.highlighted
                                ? "bg-[#176B48] text-white hover:bg-[#105236] shadow-sm"
                                : "bg-[#F8F9F6] text-[#17211D] hover:bg-[#E7F1E9] border border-[#DCE3DD] hover:border-[#176B48]/50"
                            }`}
                            title="Línea telefónica en validación. Consulta en nuestra sede."
                          >
                            <MapPin className="w-4 h-4" />
                            <span>Consultar en Sede</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
        </StaggerContainer>
      </div>
    </section>
  );
}
