import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UserCheck } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { urlFor } from "@/sanity/lib/image";
import type { Entrenador } from "@/lib/sanity/types";

interface TrainersSectionProps {
  trainers?: Entrenador[];
}

export function TrainersSection({ trainers = [] }: TrainersSectionProps) {
  // Regla estricta: ocultar automáticamente si no hay datos registrados
  if (!trainers || trainers.length === 0) {
    return null;
  }

  return (
    <section id="entrenadores" className="py-20 lg:py-28 bg-[#060b14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <SectionHeading
            badge="Equipo de Sala"
            title="Entrenadores y Asesoría Técnica"
            description="Profesionales dedicados a acompañar tu técnica, postura y progresión constante."
          />
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {trainers.map((trainer) => (
            <StaggerItem key={trainer._id} className="h-full">
              <div className="h-full p-6 rounded-2xl bg-[#0c1524] border border-white/5 hover:border-emerald-500/25 transition-all duration-300 flex flex-col justify-between">
                <div>
                  {trainer.foto ? (
                    <div className="relative w-full h-56 rounded-xl overflow-hidden border border-white/10 mb-5 bg-black/40">
                      <Image
                        src={urlFor(trainer.foto).width(600).height(450).url()}
                        alt={trainer.nombre}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                      <UserCheck className="w-6 h-6" />
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-white mb-1">
                    {trainer.nombre}
                  </h3>
                  {trainer.especialidad && (
                    <p className="text-xs text-emerald-400 font-medium mb-3">
                      {trainer.especialidad}
                    </p>
                  )}
                  {trainer.bio && (
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {trainer.bio}
                    </p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
