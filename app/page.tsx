import React, { Suspense } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { getSettings } from "@/lib/sanity/client";
import {
  ArrowRight,
  Dumbbell,
  MapPin,
  Calculator,
} from "lucide-react";

/* Contenedores asíncronos para streaming con Partial Prerendering */

async function DynamicNavbar() {
  const settings = await getSettings();
  return <Navbar settings={settings} />;
}

async function DynamicHero() {
  const settings = await getSettings();
  return <Hero settings={settings} />;
}

async function DynamicFooter() {
  const settings = await getSettings();
  return <Footer settings={settings} />;
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F6] text-[#17211D] selection:bg-[#176B48] selection:text-white">
      {/* 1. Header con Navbar */}
      <Suspense fallback={<Navbar />}>
        <DynamicNavbar />
      </Suspense>

      <main className="flex-1">
        {/* 2. Hero Editorial Asimétrico con los 3 CTAs principales */}
        <Suspense fallback={<Hero />}>
          <DynamicHero />
        </Suspense>

        {/* 3. Presentación Breve del Gimnasio */}
        <section className="py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#DCE3DD]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <FadeIn direction="up">
                <span className="text-xs font-bold uppercase tracking-widest text-[#176B48] bg-[#E7F1E9] px-3.5 py-1.5 rounded-md border border-[#DCE3DD]">
                  Nuestra Filosofía
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#17211D] tracking-tight uppercase mt-4">
                  Constancia, Fuerza y Salud en el Centro de Lima
                </h2>
                <p className="text-base text-[#526159] leading-relaxed pt-2">
                  En <strong>Sumaq Center Gym</strong> creemos en el entrenamiento riguroso, honesto y accesible. Situados a pocos pasos de la histórica Plaza Mayor en Jirón Callao 126, ofrecemos un espacio acondicionado para quienes buscan desarrollar fuerza, mejorar su composición corporal y cultivar disciplina diaria.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. Accesos Visuales Compactos a las Otras Páginas (Gateways) */}
        <section className="py-16 lg:py-24 bg-[#F8F9F6] border-b border-[#DCE3DD]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up">
              <SectionHeading
                badge="Explora Nuestro Espacio"
                title="Todo lo que Necesitas para Entrenar"
                description="Conoce nuestras modalidades de suscripción, la ubicación de nuestra sede y nuestras herramientas de apoyo físico."
              />
            </FadeIn>

            <StaggerContainer
              staggerDelay={0.1}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mt-12 items-stretch"
            >
              {/* Tarjeta 1: Planes y Membresías */}
              <StaggerItem className="h-full">
                <div className="h-full p-7 sm:p-8 rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] hover:border-[#176B48]/50 transition-all duration-300 flex flex-col justify-between shadow-sm group hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] text-[#176B48] flex items-center justify-center mb-6 group-hover:bg-[#176B48] group-hover:text-white transition-colors duration-300">
                      <Dumbbell className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#176B48] block mb-1">
                      Membresías & Clases
                    </span>
                    <h3 className="text-xl font-bold text-[#17211D] mb-3">
                      Planes de Entrenamiento
                    </h3>
                    <p className="text-xs sm:text-sm text-[#526159] leading-relaxed">
                      Modalidades flexibles por mes, trimestre o año, con acceso a áreas de peso libre, máquinas de musculación y promociones vigentes.
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#DCE3DD]/60">
                    <Link
                      href="/planes"
                      className="w-full inline-flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all min-h-[44px] shadow-sm"
                    >
                      <span>Explorar planes</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>

              {/* Tarjeta 2: Sede y Ubicación */}
              <StaggerItem className="h-full">
                <div className="h-full p-7 sm:p-8 rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] hover:border-[#176B48]/50 transition-all duration-300 flex flex-col justify-between shadow-sm group hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] text-[#176B48] flex items-center justify-center mb-6 group-hover:bg-[#176B48] group-hover:text-white transition-colors duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#176B48] block mb-1">
                      Centro Histórico
                    </span>
                    <h3 className="text-xl font-bold text-[#17211D] mb-3">
                      Sede Cercado de Lima
                    </h3>
                    <p className="text-xs sm:text-sm text-[#526159] leading-relaxed">
                      Ubicados en Jirón Callao 126, a pocos pasos de la Plaza de Armas. Conoce nuestras referencias urbanas y accesos de transporte.
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#DCE3DD]/60">
                    <Link
                      href="/ubicacion"
                      className="w-full inline-flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#F8F9F6] text-[#17211D] hover:bg-[#E7F1E9] border border-[#DCE3DD] hover:border-[#176B48]/50 transition-all min-h-[44px]"
                    >
                      <span>Cómo llegar</span>
                      <ArrowRight className="w-4 h-4 text-[#176B48]" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>

              {/* Tarjeta 3: Herramientas de Cálculo */}
              <StaggerItem className="h-full">
                <div className="h-full p-7 sm:p-8 rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] hover:border-[#176B48]/50 transition-all duration-300 flex flex-col justify-between shadow-sm group hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] text-[#176B48] flex items-center justify-center mb-6 group-hover:bg-[#176B48] group-hover:text-white transition-colors duration-300">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#176B48] block mb-1">
                      Herramientas de Salud
                    </span>
                    <h3 className="text-xl font-bold text-[#17211D] mb-3">
                      Calculadoras de Entrenamiento
                    </h3>
                    <p className="text-xs sm:text-sm text-[#526159] leading-relaxed">
                      Estima tu porcentaje de grasa corporal, gasto calórico diario (TDEE) y reparto orientativo de macronutrientes en tu dispositivo.
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#DCE3DD]/60">
                    <Link
                      href="/calculadoras"
                      className="w-full inline-flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#F8F9F6] text-[#17211D] hover:bg-[#E7F1E9] border border-[#DCE3DD] hover:border-[#176B48]/50 transition-all min-h-[44px]"
                    >
                      <span>Usar calculadoras</span>
                      <ArrowRight className="w-4 h-4 text-[#176B48]" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </main>

      {/* 5. Footer Institucional (#17211D) - Horario Oficial Único */}
      <Suspense fallback={<Footer />}>
        <DynamicFooter />
      </Suspense>

      {/* 6. WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  );
}
