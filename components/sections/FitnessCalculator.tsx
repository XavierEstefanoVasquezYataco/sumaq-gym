"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/MotionWrapper";
import { WhatsAppIcon } from "@/components/ui/Icons";

interface GoalOption {
  id: string;
  label: string;
  discipline: string;
  suggestedPlan: string;
  advice: string;
}

const GOALS: GoalOption[] = [
  {
    id: "fuerza",
    label: "Musculación y Fuerza",
    discipline: "Sala de Musculación & Peso Libre",
    suggestedPlan: "Plan Trimestral (Consolidación de Hábitos)",
    advice: "Rutina estructurada de 4 a 5 días de fuerza progresiva con pesas libres y máquinas guiadas.",
  },
  {
    id: "cardio",
    label: "Resistencia y Salud Cardiovascular",
    discipline: "Área Cardiovascular & Funcional",
    suggestedPlan: "Plan Mensual / Trimestral",
    advice: "Combinación de entrenamiento aeróbico de 30-45 min con circuitos funcionales.",
  },
  {
    id: "salud",
    label: "Salud Integral y Desestrés",
    discipline: "Acondicionamiento General & Sala",
    suggestedPlan: "Plan Mensual Flexible",
    advice: "Sesiones de 3 días semanales aprovechando horarios de menor afluencia (mañanas o media tarde).",
  },
];

export function FitnessCalculator() {
  const [selectedGoal, setSelectedGoal] = useState<string>("fuerza");
  const [frequency, setFrequency] = useState<string>("4");
  const [timePreference, setTimePreference] = useState<string>("manana");

  const currentGoal =
    GOALS.find((g) => g.id === selectedGoal) || GOALS[0];

  const whatsappMessage = `Hola Sumaq Center Gym, usé la calculadora web y mi objetivo es ${currentGoal.label} (${frequency} días/sem, horario ${timePreference}). Deseo consultar sobre el ${currentGoal.suggestedPlan}.`;

  const whatsappUrl = `https://wa.me/51933596324?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section id="calculadora" className="py-20 lg:py-28 bg-[#F8F9F6] relative border-b border-[#DCE3DD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <SectionHeading
            badge="Calculadora de Entrenamiento"
            title="Encuentra Tu Rutina y Membresía Ideal"
            description="Selecciona tu objetivo y disponibilidad semanal para recibir una recomendación de entrenamiento adaptada a tu perfil."
          />
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up" delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#FFFFFF] border border-[#DCE3DD] rounded-xl p-6 sm:p-10 shadow-sm items-stretch">
              {/* Formulario de Entrada */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label
                    htmlFor="goal-select"
                    className="block text-xs font-bold uppercase tracking-wider text-[#17211D] mb-2"
                  >
                    1. ¿Cuál es tu objetivo primordial?
                  </label>
                  <select
                    id="goal-select"
                    value={selectedGoal}
                    onChange={(e) => setSelectedGoal(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#F8F9F6] border border-[#DCE3DD] text-[#17211D] text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48] min-h-[44px]"
                  >
                    {GOALS.map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="frequency-select"
                    className="block text-xs font-bold uppercase tracking-wider text-[#17211D] mb-2"
                  >
                    2. Frecuencia semanal estimada
                  </label>
                  <select
                    id="frequency-select"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#F8F9F6] border border-[#DCE3DD] text-[#17211D] text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48] min-h-[44px]"
                  >
                    <option value="2-3">2 a 3 días por semana (Iniciación / Mantenimiento)</option>
                    <option value="4-5">4 a 5 días por semana (Progreso constante)</option>
                    <option value="6">6 días continuos (Alto rendimiento)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="time-select"
                    className="block text-xs font-bold uppercase tracking-wider text-[#17211D] mb-2"
                  >
                    3. Franja horaria de tu preferencia
                  </label>
                  <select
                    id="time-select"
                    value={timePreference}
                    onChange={(e) => setTimePreference(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#F8F9F6] border border-[#DCE3DD] text-[#17211D] text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48] min-h-[44px]"
                  >
                    <option value="mañana">Mañanas (6:00 a. m. – 10:00 a. m.)</option>
                    <option value="mediodia">Mediodía (11:00 a. m. – 3:00 p. m.)</option>
                    <option value="noche">Tarde / Noche (4:00 p. m. – 11:00 p. m.)</option>
                  </select>
                </div>

                <div className="pt-2 text-xs text-[#526159] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#176B48] shrink-0" />
                  <span>Horario continuo confirmado de 6:00 a. m. a 11:00 p. m.</span>
                </div>
              </div>

              {/* Panel de Resultados Claros e Interpretables */}
              <div className="lg:col-span-5 bg-[#E7F1E9] border border-[#DCE3DD] rounded-lg p-6 sm:p-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B48] mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span>Plan Recomendado</span>
                  </div>

                  <h3 className="text-lg font-black text-[#17211D] mb-1">
                    {currentGoal.discipline}
                  </h3>

                  <p className="text-xs font-semibold text-[#176B48] mb-3">
                    {currentGoal.suggestedPlan}
                  </p>

                  <p className="text-xs text-[#526159] leading-relaxed mb-4">
                    {currentGoal.advice}
                  </p>

                  <div className="p-3 bg-[#FFFFFF] rounded-md border border-[#DCE3DD] text-xs space-y-1">
                    <span className="font-bold text-[#17211D] block">
                      Sede: Jirón Callao 126
                    </span>
                    <span className="text-[#526159] block">
                      A pasos de la Plaza de Armas • Cercado de Lima
                    </span>
                  </div>
                </div>

                <div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all min-h-[44px] shadow-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Consultar Recomendación</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
