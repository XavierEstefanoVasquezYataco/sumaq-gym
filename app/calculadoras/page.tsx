import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSettings } from "@/lib/sanity/client";
import { CalculatorsClientContainer } from "./CalculatorsClientContainer";

export const metadata: Metadata = {
  title: "Calculadoras de Grasa, Calorías y Macronutrientes",
  description:
    "Herramientas científicas nativas de Sumaq Center Gym para estimar porcentaje de grasa (U.S. Navy), gasto energético TDEE (Mifflin-St Jeor) y distribución de macronutrientes para el entrenamiento.",
  alternates: {
    canonical: "/calculadoras",
  },
  openGraph: {
    title: "Calculadoras de Entrenamiento y Nutrición | Sumaq Center Gym",
    description:
      "Herramientas científicas interactivas para tu progreso físico. Cálculos 100% locales con rigor metodológico.",
    url: "/calculadoras",
    locale: "es_PE",
    type: "website",
  },
};

async function DynamicNavbar() {
  const settings = await getSettings();
  return <Navbar settings={settings} />;
}

async function DynamicFooter() {
  const settings = await getSettings();
  return <Footer settings={settings} />;
}

export default function CalculadorasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F6] text-[#17211D] selection:bg-[#176B48] selection:text-white">
      {/* 1. Header con Navbar */}
      <Suspense fallback={<Navbar />}>
        <DynamicNavbar />
      </Suspense>

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado Principal */}
          <div className="py-6 sm:py-10">
            <SectionHeading
              badge="Herramientas Nativas de Rendimiento"
              title="Calculadoras Científicas de Salud y Entrenamiento"
              description="Estima tu composición corporal, gasto energético diario y requerimientos de macronutrientes mediante fórmulas validadas por la literatura científica."
            />
          </div>

          {/* Contenedor Interactivo con Pestañas Accesibles */}
          <CalculatorsClientContainer />
        </div>
      </main>

      {/* 2. Footer Institucional (#17211D) */}
      <Suspense fallback={<Footer />}>
        <DynamicFooter />
      </Suspense>

      {/* 3. WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  );
}
