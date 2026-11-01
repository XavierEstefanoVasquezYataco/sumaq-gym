import React, { Suspense } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { PromotionsSection } from "@/components/sections/PromotionsSection";
import { PlansSection } from "@/components/sections/PlansSection";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/MotionWrapper";
import {
  SITE_DATA,
  getWhatsAppUrl,
} from "@/lib/data/site-data";
import {
  getPromotions,
  getPlans,
  getSettings,
} from "@/lib/sanity/client";
import {
  ArrowRight,
  Scale,
  Flame,
  PieChart,
  Compass,
  Navigation,
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

async function DynamicPromotions() {
  const promotions = await getPromotions();
  return <PromotionsSection promotions={promotions} />;
}

async function DynamicPlans() {
  const plans = await getPlans();
  return <PlansSection plans={plans} />;
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
        {/* 2. Hero Editorial Asimétrico */}
        <Suspense fallback={<Hero />}>
          <DynamicHero />
        </Suspense>

        {/* 3. Presentación Editorial de Marca */}
        <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#DCE3DD]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <FadeIn direction="up">
                <span className="text-xs font-bold uppercase tracking-widest text-[#176B48] bg-[#E7F1E9] px-3.5 py-1.5 rounded-md border border-[#DCE3DD]">
                  Nuestra Filosofía
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#17211D] tracking-tight uppercase mt-4">
                  Constancia, Fuerza y Salud en el Centro de Lima
                </h2>
                <p className="text-base text-[#526159] leading-relaxed pt-2">
                  En <strong>Sumaq Center Gym</strong> creemos en el entrenamiento riguroso y honesto. Situados a pocos metros de la histórica Plaza Mayor de Lima en Jirón Callao 126, brindamos un espacio acondicionado para quienes buscan mejorar su salud física, composición corporal y vitalidad diaria, con atención continua desde las 6:00 a. m. hasta las 11:00 p. m.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. Beneficios Diferenciales */}
        <BenefitsSection />

        {/* 5. Vista Previa de Promociones (Bloque Oscuro #17211D desde Sanity) */}
        <Suspense fallback={<PromotionsSection promotions={[]} />}>
          <DynamicPromotions />
        </Suspense>

        {/* 6. Vista Previa de Membresías y Planes */}
        <Suspense fallback={<PlansSection plans={[]} />}>
          <DynamicPlans />
        </Suspense>

        <div className="bg-[#F8F9F6] pb-16 text-center border-b border-[#DCE3DD]/60">
          <Link
            href="/planes"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all duration-200 shadow-sm min-h-[44px]"
          >
            <span>Ver Todos los Planes, Clases y Beneficios</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>

        {/* 7. Teaser de Calculadoras Nativas */}
        <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#DCE3DD]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up">
              <SectionHeading
                badge="Herramientas Gratuitas de Salud"
                title="Estima tu Composición y Requerimiento Calórico"
                description="Accede a nuestras calculadoras científicas nativas para conocer tu porcentaje de grasa corporal, gasto energético diario y reparto de macronutrientes."
              />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
              {/* Card 1: Grasa US Navy */}
              <div className="p-6 rounded-xl bg-[#F8F9F6] border border-[#DCE3DD] space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] text-[#176B48] flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#17211D]">
                    Grasa Corporal (U.S. Navy)
                  </h3>
                  <p className="text-xs text-[#526159] mt-2 leading-relaxed">
                    Fórmula oficial basada en perímetros corporales (cuello, cintura y cadera) sin requerir balanzas caras.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#176B48] uppercase tracking-wider">
                  Hodgdon & Beckett (1984)
                </span>
              </div>

              {/* Card 2: TDEE Mifflin-St Jeor */}
              <div className="p-6 rounded-xl bg-[#F8F9F6] border border-[#DCE3DD] space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] text-[#176B48] flex items-center justify-center mb-4">
                    <Flame className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#17211D]">
                    Gasto Calórico Diario (TDEE)
                  </h3>
                  <p className="text-xs text-[#526159] mt-2 leading-relaxed">
                    Ecuación clínica de Mifflin-St Jeor para estimar calorías de mantenimiento, déficit y superávit.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#176B48] uppercase tracking-wider">
                  Mifflin et al. (1990)
                </span>
              </div>

              {/* Card 3: Macronutrientes */}
              <div className="p-6 rounded-xl bg-[#F8F9F6] border border-[#DCE3DD] space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#E7F1E9] text-[#1E3A8A] flex items-center justify-center mb-4">
                    <PieChart className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#17211D]">
                    Reparto de Macronutrientes
                  </h3>
                  <p className="text-xs text-[#526159] mt-2 leading-relaxed">
                    Distribución precisa en gramos diarios de proteínas, grasas y carbohidratos para tu entrenamiento.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wider">
                  Estándares ISSN / ACSM
                </span>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/calculadoras"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all duration-200 shadow-sm min-h-[44px]"
              >
                <span>Abrir Calculadoras Nativas</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Teaser de Ubicación */}
        <section className="py-20 lg:py-28 bg-[#F8F9F6] border-b border-[#DCE3DD]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-[#FFFFFF] border border-[#DCE3DD] rounded-xl p-8 sm:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#176B48] bg-[#E7F1E9] px-3 py-1 rounded-md border border-[#DCE3DD] inline-block">
                    Sede Cercado de Lima
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#17211D] tracking-tight uppercase">
                    Entrena a Pasos de la Plaza de Armas
                  </h2>
                  <p className="text-sm text-[#526159] leading-relaxed">
                    Visítanos en <strong>{SITE_DATA.street}</strong>. Acceso cómodo desde las principales vías del centro histórico de Lima, estaciones del Metropolitano y avenidas Tacna y Abancay.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#526159]">
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-[#1E3A8A]" />
                      <span>{SITE_DATA.reference}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-3">
                  <Link
                    href="/ubicacion"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all duration-200 shadow-sm min-h-[44px]"
                  >
                    <Navigation className="w-4 h-4 text-white" />
                    <span>Ver Mapa y Rutas</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>

                  <a
                    href={getWhatsAppUrl("Hola Sumaq Center Gym, deseo consultar indicaciones para llegar a la sede.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center text-xs font-semibold text-[#176B48] hover:underline py-1"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Footer Institucional (#17211D) - Contiene el Horario Oficial */}
      <Suspense fallback={<Footer />}>
        <DynamicFooter />
      </Suspense>

      {/* 10. WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  );
}
