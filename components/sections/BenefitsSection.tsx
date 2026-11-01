import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapPin, Clock, Dumbbell, Target } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";

const BENEFITS = [
  {
    icon: MapPin,
    title: "Ubicación Estratégica en Lima",
    description:
      "En Jirón Callao 126, a pasos de la Plaza de Armas. Ideal para entrenar antes o después de tu jornada en el Cercado de Lima.",
  },
  {
    icon: Clock,
    title: "Horario Continuo Extendido",
    description:
      "De lunes a viernes desde las 6:00 a. m. hasta las 11:00 p. m. Entrena a tu ritmo sin interrupciones ni cierres a mediodía.",
  },
  {
    icon: Dumbbell,
    title: "Zonas de Musculación & Cardio",
    description:
      "Máquinas de fuerza, peso libre, barras, mancuernas y equipamiento cardiovascular para todos los niveles de acondicionamiento.",
  },
  {
    icon: Target,
    title: "Ambiente Enfocado en Resultados",
    description:
      "Una comunidad dedicada al progreso constante, donde cada entrenamiento cuenta para alcanzar tu mejor versión física y mental.",
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="scroll-mt-20 py-20 lg:py-28 bg-[#F8F9F6] relative border-b border-[#DCE3DD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <SectionHeading
            badge="¿Por qué Sumaq Center?"
            title="Tu Espacio de Entrenamiento en el Centro de Lima"
            description="Diseñado para quienes buscan comodidad, constancia y disciplina en un punto accesible de la capital."
          />
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {BENEFITS.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={index} className="h-full">
                <div className="group h-full p-6 sm:p-7 rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] hover:border-[#176B48]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#176B48] flex items-center justify-center mb-5 group-hover:bg-[#176B48] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#17211D] mb-2 group-hover:text-[#176B48] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#526159] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#DCE3DD] flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#526159]/80 group-hover:text-[#176B48] transition-colors">
                      0{index + 1} • SUMAQ
                    </span>
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
