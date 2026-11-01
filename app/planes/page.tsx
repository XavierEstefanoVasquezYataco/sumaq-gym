import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { PlansSection } from "@/components/sections/PlansSection";
import { PromotionsSection } from "@/components/sections/PromotionsSection";
import { ClassesSection } from "@/components/sections/ClassesSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import {
  getPromotions,
  getClasses,
  getPlans,
  getSettings,
} from "@/lib/sanity/client";

export const metadata: Metadata = {
  title: "Planes y Membresías",
  description:
    "Descubre los planes de membresía, promociones activas, disciplinas de entrenamiento y beneficios reales ofrecidos en Sumaq Center Gym, Cercado de Lima.",
  alternates: {
    canonical: "/planes",
  },
  openGraph: {
    title: "Planes y Membresías | Sumaq Center Gym",
    description:
      "Membresías mensuales, trimestrales y anuales en el centro de Lima. Acceso continuo L-V de 6:00 a. m. a 11:00 p. m.",
    url: "/planes",
    locale: "es_PE",
    type: "website",
  },
};

async function DynamicNavbar() {
  const settings = await getSettings();
  return <Navbar settings={settings} />;
}

async function DynamicPlans() {
  const plans = await getPlans();
  return <PlansSection plans={plans} />;
}

async function DynamicPromotions() {
  const promotions = await getPromotions();
  return <PromotionsSection promotions={promotions} />;
}

async function DynamicClasses() {
  const classes = await getClasses();
  return <ClassesSection classes={classes} />;
}

async function DynamicFooter() {
  const settings = await getSettings();
  return <Footer settings={settings} />;
}

export default function PlanesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F6] text-[#17211D] selection:bg-[#176B48] selection:text-white">
      {/* 1. Header con Navbar */}
      <Suspense fallback={<Navbar />}>
        <DynamicNavbar />
      </Suspense>

      <main className="flex-1 pt-20">
        {/* 1. Membresías (#membresias) */}
        <Suspense fallback={<PlansSection plans={[]} />}>
          <DynamicPlans />
        </Suspense>

        {/* 2. Promociones (#promociones) - Bloque Oscuro Intencional */}
        <Suspense fallback={<PromotionsSection promotions={[]} />}>
          <DynamicPromotions />
        </Suspense>

        {/* 3. Clases y Disciplinas (#clases) */}
        <Suspense fallback={<ClassesSection classes={[]} />}>
          <DynamicClasses />
        </Suspense>

        {/* 4. Beneficios Tangibles (#beneficios) */}
        <BenefitsSection />
      </main>

      {/* Footer Institucional (#17211D) */}
      <Suspense fallback={<Footer />}>
        <DynamicFooter />
      </Suspense>

      {/* WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  );
}
