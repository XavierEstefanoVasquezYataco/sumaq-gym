import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Dumbbell, Activity, Flame, Users, ArrowUpRight } from "lucide-react";
import { BadgeUnconfirmed } from "@/components/ui/BadgeUnconfirmed";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import type { Clase } from "@/lib/sanity/types";

interface ClassesSectionProps {
  classes?: Clase[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell,
  Flame,
  Activity,
  Users,
};

const DEFAULT_CLASSES = [
  {
    icon: Dumbbell,
    name: "Musculación & Pesas Libres",
    description:
      "Desarrollo de fuerza, hipertrofia y tonificación con mancuernas, barras olímpicas y máquinas de trayectoria guiada.",
    level: "Todos los niveles",
    status: "Disponible en sala",
    isUnconfirmed: false,
  },
  {
    icon: Flame,
    name: "Cardio & Resistencia",
    description:
      "Equipos cardiovasculares para mejorar tu capacidad aeróbica, quema calórica y salud cardiovascular.",
    level: "Todos los niveles",
    status: "Disponible en sala",
    isUnconfirmed: false,
  },
  {
    icon: Activity,
    name: "Entrenamiento Funcional",
    description:
      "Circuitos de alta y media intensidad diseñados para mejorar movilidad, agilidad, potencia y resistencia muscular.",
    level: "Todos los niveles",
    status: "POR CONFIRMAR",
    isUnconfirmed: true,
  },
  {
    icon: Users,
    name: "Clases Grupales y Talleres",
    description:
      "Sesiones grupales dirigidas. Consulta la programación semanal de horarios y disciplinas en recepción.",
    level: "POR CONFIRMAR",
    status: "POR CONFIRMAR",
    isUnconfirmed: true,
  },
];

const WHATSAPP_CLASSES_URL =
  "https://wa.me/51933596324?text=Hola%20Sumaq%20Center%20Gym%2C%20quisiera%20consultar%20sobre%20las%20clases%20y%20disciplinas%20disponibles.";

export function ClassesSection({ classes = [] }: ClassesSectionProps) {
  const hasSanityClasses = classes && classes.length > 0;

  return (
    <section id="clases" className="scroll-mt-20 py-20 lg:py-28 bg-[#F8F9F6] relative border-b border-[#DCE3DD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <SectionHeading
            badge="Disciplinas & Áreas"
            title="Zonas de Entrenamiento Preparadas para tu Progreso"
            description="Espacios equipados para distintos objetivos: desde fuerza y musculación hasta resistencia y salud general."
          />
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {hasSanityClasses
            ? classes.map((item) => {
                const IconComponent =
                  (item.icono && ICON_MAP[item.icono]) || Dumbbell;

                return (
                  <StaggerItem key={item._id} className="h-full">
                    <div className="h-full p-6 rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] hover:border-[#176B48]/50 transition-all duration-300 flex flex-col justify-between shadow-sm group">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#176B48] flex items-center justify-center group-hover:scale-105 transition-transform">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          {item.duracion && (
                            <span className="text-[11px] font-semibold text-[#176B48] uppercase tracking-wider bg-[#E7F1E9] px-2.5 py-0.5 rounded-md border border-[#DCE3DD]">
                              {item.duracion}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#17211D] mb-2">
                          {item.nombre}
                        </h3>
                        {item.descripcion && (
                          <p className="text-sm text-[#526159] leading-relaxed mb-4">
                            {item.descripcion}
                          </p>
                        )}
                        {item.horariosTexto && (
                          <p className="text-xs text-[#176B48] font-medium mb-3">
                            🕒 {item.horariosTexto}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-[#DCE3DD] flex items-center justify-between text-xs text-[#526159]">
                        <span>Nivel:</span>
                        <span className="text-[#17211D] font-medium">
                          {item.intensidad || "Todos los niveles"}
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })
            : DEFAULT_CLASSES.map((item, index) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={index} className="h-full">
                    <div className="h-full p-6 rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] hover:border-[#176B48]/50 transition-all duration-300 flex flex-col justify-between shadow-sm group">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#176B48] flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Icon className="w-5 h-5" />
                          </div>
                          {item.isUnconfirmed ? (
                            <BadgeUnconfirmed size="sm" />
                          ) : (
                            <span className="text-[11px] font-semibold text-[#176B48] uppercase tracking-wider bg-[#E7F1E9] px-2.5 py-0.5 rounded-md border border-[#DCE3DD]">
                              {item.status}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-[#17211D] mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#526159] leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#DCE3DD] flex items-center justify-between text-xs text-[#526159]">
                        <span>Nivel:</span>
                        {item.isUnconfirmed ? (
                          <BadgeUnconfirmed size="sm" />
                        ) : (
                          <span className="text-[#17211D] font-medium">
                            {item.level}
                          </span>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
        </StaggerContainer>

        {/* Banner inferior de consulta */}
        <FadeIn direction="up" delay={0.2}>
          <div className="mt-10 p-6 rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-bold text-[#17211D]">
                ¿Deseas confirmar la disponibilidad de clases específicas?
              </h4>
              <p className="text-xs text-[#526159] mt-0.5">
                Escríbenos directamente y te brindamos los horarios detallados en tiempo real.
              </p>
            </div>
            <a
              href={WHATSAPP_CLASSES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all shrink-0 min-h-[44px]"
            >
              <span>Consultar Clases</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
