import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Clock, Calendar, CheckCircle2, ShieldAlert } from "lucide-react";
import { BadgeUnconfirmed } from "@/components/ui/BadgeUnconfirmed";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import type { Horario } from "@/lib/sanity/types";

interface ScheduleSectionProps {
  schedules?: Horario[];
}

export function ScheduleSection({ schedules = [] }: ScheduleSectionProps) {
  const hasSanitySchedules = schedules && schedules.length > 0;

  return (
    <section id="horarios" className="py-20 lg:py-28 bg-[#F8F9F6] relative border-b border-[#DCE3DD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <SectionHeading
            badge="Disponibilidad & Horarios"
            title="Entrena en el Horario que Mejor se Adapte a Ti"
            description="Contamos con horario continuo durante los días laborables para que entrenes antes del trabajo, al mediodía o por la noche."
          />
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {hasSanitySchedules ? (
            schedules.map((item) => (
              <StaggerItem key={item._id} className="h-full">
                <div
                  className={`h-full rounded-xl p-7 bg-[#FFFFFF] flex flex-col justify-between ${
                    item.esConfirmado
                      ? "border-2 border-[#176B48]/40 shadow-sm"
                      : "border border-[#DCE3DD]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.esConfirmado
                            ? "bg-[#E7F1E9] text-[#176B48]"
                            : "bg-[#FEF3C7] text-[#92400E]"
                        }`}
                      >
                        {item.esConfirmado ? (
                          <Clock className="w-5 h-5" />
                        ) : (
                          <Calendar className="w-5 h-5" />
                        )}
                      </div>
                      {item.esConfirmado ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#176B48] bg-[#E7F1E9] px-2.5 py-0.5 rounded-md border border-[#DCE3DD]">
                          <CheckCircle2 className="w-3 h-3" />
                          Confirmado
                        </span>
                      ) : (
                        <BadgeUnconfirmed size="sm" />
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#17211D] mb-2">{item.dia}</h3>

                    {item.esConfirmado && item.apertura && item.cierre ? (
                      <p className="text-2xl sm:text-3xl font-black text-[#17211D] font-mono tracking-tight my-4">
                        {item.apertura}{" "}
                        <span className="text-sm font-sans font-medium text-[#526159]">
                          –
                        </span>{" "}
                        {item.cierre}
                      </p>
                    ) : (
                      <div className="my-6">
                        <BadgeUnconfirmed
                          size="md"
                          label="HORARIO POR CONFIRMAR"
                        />
                      </div>
                    )}

                    {item.nota && (
                      <p className="text-xs text-[#526159] leading-relaxed">
                        {item.nota}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#DCE3DD] text-[11px] text-[#526159]">
                    {item.esConfirmado
                      ? "✓ Acceso a todas las zonas en horario de apertura"
                      : "Consulta disponibilidad vía WhatsApp"}
                  </div>
                </div>
              </StaggerItem>
            ))
          ) : (
            <>
              {/* Card Lunes a Viernes - Confirmado */}
              <StaggerItem className="h-full">
                <div className="h-full rounded-xl p-7 bg-[#FFFFFF] border-2 border-[#176B48]/40 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#E7F1E9] text-[#176B48] flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#176B48] bg-[#E7F1E9] px-2.5 py-0.5 rounded-md border border-[#DCE3DD]">
                        <CheckCircle2 className="w-3 h-3" />
                        Confirmado
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#17211D] mb-2">
                      Lunes a Viernes
                    </h3>
                    <p className="text-3xl font-black text-[#17211D] font-mono tracking-tight my-4">
                      6:00 <span className="text-sm font-sans font-medium text-[#526159]">AM</span> – 11:00 <span className="text-sm font-sans font-medium text-[#526159]">PM</span>
                    </p>
                    <p className="text-xs text-[#526159] leading-relaxed">
                      Jornada continua de 17 horas sin cierre intermedio. Ideal para profesionales, estudiantes y vecinos del Cercado.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#DCE3DD] text-[11px] text-[#176B48] font-medium">
                    ✓ Acceso total a sala de máquinas y peso libre
                  </div>
                </div>
              </StaggerItem>

              {/* Card Sábados - Por confirmar */}
              <StaggerItem className="h-full">
                <div className="h-full rounded-xl p-7 bg-[#FFFFFF] border border-[#DCE3DD] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] text-[#92400E] flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <BadgeUnconfirmed size="sm" />
                    </div>

                    <h3 className="text-lg font-bold text-[#17211D] mb-2">
                      Sábados
                    </h3>
                    <div className="my-6">
                      <BadgeUnconfirmed size="md" label="HORARIO POR CONFIRMAR" />
                    </div>
                    <p className="text-xs text-[#526159] leading-relaxed">
                      El horario de atención para los fines de semana está sujeto a validación con la administración del gimnasio.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#DCE3DD] text-[11px] text-[#526159]">
                    Consulta disponibilidad vía WhatsApp
                  </div>
                </div>
              </StaggerItem>

              {/* Card Domingos y Feriados - Por confirmar */}
              <StaggerItem className="h-full">
                <div className="h-full rounded-xl p-7 bg-[#FFFFFF] border border-[#DCE3DD] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] text-[#92400E] flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <BadgeUnconfirmed size="sm" />
                    </div>

                    <h3 className="text-lg font-bold text-[#17211D] mb-2">
                      Domingos y Feriados
                    </h3>
                    <div className="my-6">
                      <BadgeUnconfirmed size="md" label="HORARIO POR CONFIRMAR" />
                    </div>
                    <p className="text-xs text-[#526159] leading-relaxed">
                      Apertura especial en domingos o feriados sujeta a programación previa y eventos del gimnasio.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#DCE3DD] text-[11px] text-[#526159]">
                    Notificaciones de apertura en redes sociales
                  </div>
                </div>
              </StaggerItem>
            </>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
