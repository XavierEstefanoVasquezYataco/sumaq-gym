import React from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Dumbbell,
  ArrowRight,
  ShieldCheck,
  Flame,
  Zap,
  Bell,
} from "lucide-react";
import { BadgeUnconfirmed } from "@/components/ui/BadgeUnconfirmed";
import { FadeIn } from "@/components/ui/MotionWrapper";
import type { AjustesGenerales } from "@/lib/sanity/types";

interface HeroProps {
  settings?: AjustesGenerales | null;
}

export function Hero({ settings }: HeroProps) {
  const heroTitle =
    settings?.heroTitulo ||
    "Fuerza, Salud y Disciplina en el Corazón de Lima";

  const heroSubtitle =
    settings?.heroSubtitulo ||
    "Ubicados en Jirón Callao 126. Entrena en un espacio diseñado para tu progreso diario: musculación, peso libre, cardio y acondicionamiento integral con el mejor horario del centro de Lima.";

  const addressText =
    settings?.direccion || "Jirón Callao 126, Cercado de Lima 15001";
  const hoursText =
    settings?.horarioLunesViernes || "6:00 a. m. a 11:00 p. m.";

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#F8F9F6] border-b border-[#DCE3DD]/70">
      {/* Aviso Superior si está configurado en Sanity */}
      {settings?.avisoSuperior && (
        <div className="absolute top-20 left-0 right-0 z-20 bg-[#176B48] text-white py-2 px-4 text-center text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2">
          <Bell className="w-3.5 h-3.5" />
          <span>{settings.avisoSuperior}</span>
        </div>
      )}

      {/* Trama sutil geométrica de fondo claro */}
      <div className="absolute inset-0 bg-grid-subtle-light pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Columna Izquierda: Mensaje Central Asimétrico y Editorial */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <FadeIn direction="up">
              {/* Micro-badge de Ubicación con toque azul del logo */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#E7F1E9] border border-[#DCE3DD] text-[#176B48] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#1E3A8A]" title="Detalle azul identitario"></span>
                <span>Cercado de Lima • A pasos de la Plaza de Armas</span>
              </div>

              {/* Titular Principal de Impacto en Carbón #17211D */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#17211D] tracking-tight leading-[1.1] uppercase">
                {heroTitle}
              </h1>

              {/* Subtítulo Descriptivo en Gris Mineral #526159 */}
              <p className="mt-4 text-base sm:text-lg text-[#526159] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {heroSubtitle}
              </p>

              {/* Botones de Llamada a la Acción (Rectangulares - No Píldoras) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
                <Link
                  href="/planes"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 min-h-[44px]"
                >
                  <span>Ver Planes & Membresías</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>

                <Link
                  href="/ubicacion"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider text-[#176B48] bg-[#E7F1E9] hover:bg-[#d8e6db] border border-[#DCE3DD] transition-all duration-200 min-h-[44px]"
                >
                  <MapPin className="w-4 h-4 text-[#176B48]" />
                  <span>Cómo Llegar</span>
                </Link>
              </div>

              {/* Chips Informativos Rápidos */}
              <div className="pt-8 border-t border-[#DCE3DD] grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FFFFFF] border border-[#DCE3DD] shadow-sm">
                  <Clock className="w-5 h-5 text-[#176B48] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#17211D] block">
                      Lunes a Viernes continuo
                    </span>
                    <span className="text-xs text-[#526159] font-mono font-medium">
                      {hoursText}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FFFFFF] border border-[#DCE3DD] shadow-sm">
                  <MapPin className="w-5 h-5 text-[#176B48] shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#17211D]">
                        {addressText.split(",")[0]}
                      </span>
                      <BadgeUnconfirmed size="sm" label="7.° PISO" />
                    </div>
                    <span className="text-xs text-[#526159]">
                      A pasos de la Plaza Mayor
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Columna Derecha: Composición Arquitectónica Limpia sobre Blanco */}
          <div className="lg:col-span-5">
            <FadeIn direction="up" delay={0.15}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] p-7 sm:p-8 space-y-6 shadow-sm">
                  {/* Encabezado */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#DCE3DD]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] flex items-center justify-center text-[#176B48]">
                        <Dumbbell className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#17211D] uppercase tracking-wider block">
                          {settings?.nombreGimnasio || "Sumaq Center Gym"}
                        </span>
                        <span className="text-[11px] text-[#526159]">
                          Centro Histórico de Lima
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#E7F1E9] text-[#176B48] border border-[#DCE3DD]">
                      Activo
                    </span>
                  </div>

                  {/* Lista de Áreas */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-lg bg-[#F8F9F6] border border-[#DCE3DD] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-[#E7F1E9] flex items-center justify-center text-[#176B48]">
                          <Flame className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#17211D]">
                            Musculación & Pesas
                          </h4>
                          <p className="text-[11px] text-[#526159]">
                            Fuerza y peso libre
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#176B48] uppercase">
                        Disponible
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#F8F9F6] border border-[#DCE3DD] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-[#E7F1E9] flex items-center justify-center text-[#176B48]">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#17211D]">
                            Cardio & Resistencia
                          </h4>
                          <p className="text-[11px] text-[#526159]">
                            Salud cardiovascular
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#176B48] uppercase">
                        Disponible
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#F8F9F6] border border-[#DCE3DD] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-[#EAE3D6] flex items-center justify-center text-[#17211D]">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#17211D]">
                            Planes y Membresías
                          </h4>
                          <p className="text-[11px] text-[#526159]">
                            Administrables en Sanity
                          </p>
                        </div>
                      </div>
                      <BadgeUnconfirmed size="sm" />
                    </div>
                  </div>

                  {/* Horario resumido */}
                  <div className="pt-4 border-t border-[#DCE3DD] flex items-center justify-between text-xs text-[#526159]">
                    <span>Atención de sala:</span>
                    <span className="font-mono font-bold text-[#176B48]">
                      {hoursText}
                    </span>
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
