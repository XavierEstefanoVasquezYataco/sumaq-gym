import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, Quote } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import type { Testimonio } from "@/lib/sanity/types";

interface TestimonialsSectionProps {
  testimonials?: Testimonio[];
}

export function TestimonialsSection({
  testimonials = [],
}: TestimonialsSectionProps) {
  // Regla estricta: ocultar automáticamente si no hay datos reales en Sanity
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonios" className="py-20 lg:py-28 bg-[#04080f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <SectionHeading
            badge="Experiencias"
            title="Lo que Dicen Quienes Entrenan en Sumaq"
            description="Resultados reales de personas comprometidas con su bienestar en el centro de Lima."
          />
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((item) => (
            <StaggerItem key={item._id} className="h-full">
              <div className="h-full p-7 rounded-2xl bg-[#0c1524] border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.calificacion || 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-emerald-400 fill-emerald-400"
                        />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-4">
                    &ldquo;{item.comentario}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{item.nombre}</span>
                  {item.meta && (
                    <span className="text-[11px] text-emerald-400 font-medium">
                      {item.meta}
                    </span>
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
