"use client";

import React, { useState } from "react";
import { BodyFatCalculator } from "@/components/calculators/BodyFatCalculator";
import { TDEECalculator } from "@/components/calculators/TDEECalculator";
import { MacroCalculator } from "@/components/calculators/MacroCalculator";
import type { BiologicalSex } from "@/lib/nutrition/formulas";
import {
  Scale,
  Flame,
  PieChart,
  ShieldCheck,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";

type CalculatorTab = "bodyfat" | "tdee" | "macros";

export function CalculatorsClientContainer() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>("bodyfat");

  // Estado compartido voluntario entre herramientas
  const [sharedSex, setSharedSex] = useState<BiologicalSex>("male");
  const [sharedWeight, setSharedWeight] = useState<number | undefined>(75);
  const [importedCalories, setImportedCalories] = useState<number | null>(null);

  const [showSources, setShowSources] = useState(false);

  const handleSyncFromFat = (data: { sex: BiologicalSex; weightKg?: number }) => {
    setSharedSex(data.sex);
    if (data.weightKg) setSharedWeight(data.weightKg);
  };

  const handleExportCaloriesToMacros = (calories: number, weightKg: number) => {
    setImportedCalories(calories);
    if (weightKg) setSharedWeight(weightKg);
    setActiveTab("macros");
    window.scrollTo({ top: 280, behavior: "smooth" });
  };

  return (
    <div className="space-y-10">
      {/* Aviso de Privacidad y Seguridad Local */}
      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#DCE3DD] shadow-sm flex items-start sm:items-center gap-3 text-xs text-[#526159]">
        <div className="w-8 h-8 rounded-lg bg-[#E7F1E9] text-[#176B48] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <strong className="text-[#17211D]">Privacidad Total Garantizada:</strong>{" "}
          Todos los cálculos se ejecutan estrictamente en la memoria de tu dispositivo.
          Ningún dato biométrico, corporal o de salud se guarda ni se transmite a servidores o terceros.
        </div>
      </div>

      {/* Navegación por Pestañas Accesibles (ARIA Tabs) */}
      <div className="border-b border-[#DCE3DD]">
        <div
          role="tablist"
          aria-label="Herramientas de cálculo de Sumaq Center Gym"
          className="flex flex-wrap -mb-px gap-2 sm:gap-3"
        >
          {/* Tab 1: Grasa Corporal */}
          <button
            role="tab"
            id="tab-bodyfat"
            aria-selected={activeTab === "bodyfat"}
            aria-controls="panel-bodyfat"
            onClick={() => setActiveTab("bodyfat")}
            className={`py-4 px-4 sm:px-6 rounded-t-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 min-h-[48px] ${
              activeTab === "bodyfat"
                ? "border-[#176B48] text-[#176B48] bg-[#FFFFFF] shadow-sm"
                : "border-transparent text-[#526159] hover:text-[#17211D] hover:bg-[#E7F1E9]/40"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
          >
            <Scale className="w-4 h-4" />
            <span>% Grasa (U.S. Navy)</span>
          </button>

          {/* Tab 2: TDEE y Calorías */}
          <button
            role="tab"
            id="tab-tdee"
            aria-selected={activeTab === "tdee"}
            aria-controls="panel-tdee"
            onClick={() => setActiveTab("tdee")}
            className={`py-4 px-4 sm:px-6 rounded-t-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 min-h-[48px] ${
              activeTab === "tdee"
                ? "border-[#176B48] text-[#176B48] bg-[#FFFFFF] shadow-sm"
                : "border-transparent text-[#526159] hover:text-[#17211D] hover:bg-[#E7F1E9]/40"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
          >
            <Flame className="w-4 h-4" />
            <span>Gasto Calórico (TDEE)</span>
          </button>

          {/* Tab 3: Macronutrientes */}
          <button
            role="tab"
            id="tab-macros"
            aria-selected={activeTab === "macros"}
            aria-controls="panel-macros"
            onClick={() => setActiveTab("macros")}
            className={`py-4 px-4 sm:px-6 rounded-t-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 min-h-[48px] ${
              activeTab === "macros"
                ? "border-[#176B48] text-[#176B48] bg-[#FFFFFF] shadow-sm"
                : "border-transparent text-[#526159] hover:text-[#17211D] hover:bg-[#E7F1E9]/40"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
          >
            <PieChart className="w-4 h-4" />
            <span>Macronutrientes</span>
          </button>
        </div>
      </div>

      {/* Contenido de la Pestaña Activa */}
      <div className="bg-[#FFFFFF] border border-[#DCE3DD] rounded-xl p-6 sm:p-10 shadow-sm min-h-[400px]">
        {/* Panel 1: Grasa Corporal */}
        <div
          role="tabpanel"
          id="panel-bodyfat"
          aria-labelledby="tab-bodyfat"
          hidden={activeTab !== "bodyfat"}
        >
          {activeTab === "bodyfat" && (
            <BodyFatCalculator
              onSyncData={handleSyncFromFat}
              initialSex={sharedSex}
              initialWeight={sharedWeight}
            />
          )}
        </div>

        {/* Panel 2: TDEE */}
        <div
          role="tabpanel"
          id="panel-tdee"
          aria-labelledby="tab-tdee"
          hidden={activeTab !== "tdee"}
        >
          {activeTab === "tdee" && (
            <TDEECalculator
              onExportCalories={handleExportCaloriesToMacros}
              initialSex={sharedSex}
              initialWeight={sharedWeight}
            />
          )}
        </div>

        {/* Panel 3: Macronutrientes */}
        <div
          role="tabpanel"
          id="panel-macros"
          aria-labelledby="tab-macros"
          hidden={activeTab !== "macros"}
        >
          {activeTab === "macros" && (
            <MacroCalculator
              key={`${importedCalories || "default"}-${sharedWeight || "default"}`}
              importedCalories={importedCalories}
              importedWeight={sharedWeight}
            />
          )}
        </div>
      </div>

      {/* Sección Secundaria: Fuentes Científicas, Metodología y Limitaciones */}
      <div className="rounded-xl border border-[#DCE3DD] bg-[#FFFFFF] overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setShowSources(!showSources)}
          className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-[#F8F9F6] hover:bg-[#E7F1E9]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]"
          aria-expanded={showSources}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#176B48]" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#17211D]">
                Fundamentos Científicos, Referencias Bibliográficas y Limitaciones
              </h3>
              <p className="text-xs text-[#526159] mt-0.5">
                Conoce las ecuaciones matemáticas utilizadas y el alcance ético de estas estimaciones.
              </p>
            </div>
          </div>
          <div className="text-[#526159]">
            {showSources ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </button>

        {showSources && (
          <div className="p-6 sm:p-8 space-y-6 text-xs text-[#526159] border-t border-[#DCE3DD] bg-[#FFFFFF]">
            {/* Aviso de Salud y Exclusión */}
            <div className="p-4 rounded-lg bg-[#FEF3C7]/40 border border-[#FDE68A] flex items-start gap-3 text-[#92400E]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="block text-xs uppercase tracking-wider">
                  Aviso Ético y de Salud:
                </strong>
                <p className="leading-relaxed">
                  Estas herramientas tienen un propósito estrictamente orientativo y educativo para adultos sanos. No constituyen diagnóstico médico ni nutricional, ni deben emplearse como sustituto de la consulta profesional con un médico colegiado o nutricionista deportivo. No son aplicables a menores de 18 años, personas gestantes o en periodo de lactancia, ni personas con patologías clínicas o trastornos de la conducta alimentaria (TCA).
                </p>
              </div>
            </div>

            {/* Referencias Bibliográficas */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#17211D]">
                Publicaciones Científicas de Referencia:
              </h4>
              <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                <li>
                  <strong>Método de la Marina de EE. UU. (U.S. Navy Body Fat):</strong> Hodgdon, J. A., & Beckett, M. B. (1984). <em>Prediction of percent body fat for U.S. Navy men and women from body circumferences and height</em>. Reports No. 84-29 and 84-11. Naval Health Research Center, San Diego, CA.
                </li>
                <li>
                  <strong>Ecuación de Tasa Metabólica Basal:</strong> Mifflin, M. D., St Jeor, S. T., Hill, L. A., Scott, B. J., Daugherty, S. A., & Koh, Y. O. (1990). <em>A new predictive equation for resting energy expenditure in healthy individuals</em>. The American Journal of Clinical Nutrition, 51(2), 241-247.
                </li>
                <li>
                  <strong>Ingesta Proteica y Ejercicio de Fuerza:</strong> Jäger, R., Kerksick, C. M., Campbell, B. I., et al. (2017). <em>International Society of Sports Nutrition Position Stand: protein and exercise</em>. Journal of the International Society of Sports Nutrition, 14(1), 20.
                </li>
                <li>
                  <strong>Pautas de Nutrición Deportiva:</strong> Thomas, D. T., Erdman, K. A., & Burke, L. M. (2016). <em>American College of Sports Medicine Joint Position Statement: Nutrition and Athletic Performance</em>. Medicine & Science in Sports & Exercise, 48(3), 543-568.
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
