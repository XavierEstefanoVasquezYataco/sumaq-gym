"use client";

import React, { useState } from "react";
import {
  calculateMacros,
  validateMacroInput,
  MACRO_PREFERENCES,
  type MacroPreference,
  type MacroResult,
} from "@/lib/nutrition/formulas";
import {
  PieChart,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsAppUrl } from "@/lib/data/site-data";

interface MacroCalculatorProps {
  importedCalories?: number | null;
  importedWeight?: number | null;
}

export function MacroCalculator({
  importedCalories,
  importedWeight,
}: MacroCalculatorProps) {
  const [targetCalories, setTargetCalories] = useState<string>(
    importedCalories ? String(importedCalories) : "2200"
  );
  const [weightKg, setWeightKg] = useState<string>(
    importedWeight ? String(importedWeight) : "75"
  );
  const [preference, setPreference] = useState<MacroPreference>("muscle_gain");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<MacroResult | null>(null);
  const [hasImportedNotice, setHasImportedNotice] = useState<boolean>(
    Boolean(importedCalories)
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateMacroInput({
      targetCalories: Number(targetCalories),
      weightKg: Number(weightKg),
      preference,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    setErrors({});
    const calc = calculateMacros(validation.data);
    setResult(calc);
  };

  const handleReset = () => {
    setTargetCalories("2200");
    setWeightKg("75");
    setPreference("muscle_gain");
    setErrors({});
    setResult(null);
    setHasImportedNotice(false);
  };

  const whatsappMessage = result
    ? `Hola Sumaq Center Gym, calculé mi distribución de macronutrientes en la web para ${result.targetCalories} kcal (Proteína: ${result.protein.grams}g, Grasas: ${result.fats.grams}g, Carbohidratos: ${result.carbs.grams}g). Deseo consultar sobre horarios y entrenamiento.`
    : "Hola Sumaq Center Gym, deseo consultar sobre planes de entrenamiento y nutrición orientativa.";

  return (
    <div className="space-y-8">
      {/* Notificación si se importaron calorías desde el módulo TDEE */}
      {hasImportedNotice && (
        <div className="p-4 rounded-lg bg-[#E7F1E9] border border-[#176B48]/30 flex items-center justify-between text-xs text-[#176B48]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              Se han cargado las calorías calculadas en el módulo anterior (<strong>{targetCalories} kcal/día</strong>).
            </span>
          </div>
          <button
            type="button"
            onClick={() => setHasImportedNotice(false)}
            className="text-[11px] underline text-[#526159] hover:text-[#17211D]"
          >
            Cerrar aviso
          </button>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Objetivo Calórico */}
          <div>
            <label
              htmlFor="macro-calories"
              className="block text-xs font-semibold text-[#17211D] mb-1.5"
            >
              Calorías Diarias Objetivo (kcal) *
            </label>
            <div className="relative">
              <input
                id="macro-calories"
                type="number"
                min="1000"
                max="5500"
                value={targetCalories}
                onChange={(e) => setTargetCalories(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border ${
                  errors.targetCalories ? "border-[#DC2626]" : "border-[#DCE3DD]"
                } text-[#17211D] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
                placeholder="Ej. 2200"
                required
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-[#526159] font-medium">
                kcal
              </span>
            </div>
            {errors.targetCalories && (
              <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.targetCalories}
              </p>
            )}
          </div>

          {/* Peso Corporal */}
          <div>
            <label
              htmlFor="macro-weight"
              className="block text-xs font-semibold text-[#17211D] mb-1.5"
            >
              Peso Corporal Actual (kg) *
            </label>
            <div className="relative">
              <input
                id="macro-weight"
                type="number"
                step="0.5"
                min="30"
                max="250"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border ${
                  errors.weightKg ? "border-[#DC2626]" : "border-[#DCE3DD]"
                } text-[#17211D] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
                placeholder="Ej. 75"
                required
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-[#526159] font-medium">
                kg
              </span>
            </div>
            {errors.weightKg && (
              <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.weightKg}
              </p>
            )}
          </div>
        </div>

        {/* Preferencia de Reparto */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#17211D] mb-2.5">
            Preferencia Nutricional y Enfoque Deportivo
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(
              Object.keys(MACRO_PREFERENCES) as MacroPreference[]
            ).map((prefKey) => {
              const pref = MACRO_PREFERENCES[prefKey];
              const isSelected = preference === prefKey;

              return (
                <button
                  key={prefKey}
                  type="button"
                  onClick={() => setPreference(prefKey)}
                  className={`p-4 rounded-lg text-left transition-all border flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#E7F1E9] border-[#176B48] text-[#17211D] shadow-sm"
                      : "bg-[#FFFFFF] border-[#DCE3DD] text-[#526159] hover:bg-[#F8F9F6]"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
                >
                  <div>
                    <span
                      className={`text-xs font-bold block ${
                        isSelected ? "text-[#176B48]" : "text-[#17211D]"
                      }`}
                    >
                      {pref.label}
                    </span>
                    <span className="text-[11px] text-[#526159] mt-1 block leading-relaxed">
                      {pref.description}
                    </span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#DCE3DD]/50 text-[10px] text-[#526159] font-medium">
                    Proteína base: ~{pref.proteinMultiplier} g/kg
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="py-3.5 px-6 rounded-lg bg-[#176B48] hover:bg-[#105236] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all min-h-[44px] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
          >
            <PieChart className="w-4 h-4" />
            <span>Calcular Macronutrientes</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="py-3.5 px-4 rounded-lg bg-[#FFFFFF] border border-[#DCE3DD] hover:bg-[#F8F9F6] text-[#526159] text-xs font-semibold flex items-center gap-1.5 min-h-[44px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>
        </div>
      </form>

      {/* Resultados de Macronutrientes */}
      {result && (
        <div className="rounded-xl bg-[#FFFFFF] border-2 border-[#176B48] p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
          {/* Cabecera de Comprobación y Coherencia Calórica */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DCE3DD]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#176B48] block">
                Distribución Diaria ({result.preferenceLabel})
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-[#17211D]">
                  {result.targetCalories} kcal
                </span>
                <span className="text-xs font-semibold text-[#526159]">
                  (Suma exacta de macros: {result.totalCalories} kcal)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#176B48] font-bold bg-[#E7F1E9] px-3.5 py-1.5 rounded-lg border border-[#DCE3DD]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Coherencia Calórica Verificada (±2 kcal)</span>
            </div>
          </div>

          {/* Tarjetas de Macronutrientes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Proteínas */}
            <div className="p-5 rounded-xl bg-[#F8F9F6] border-2 border-[#176B48]/30 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#176B48]">
                    Proteínas
                  </span>
                  <span className="text-xs font-bold text-white bg-[#176B48] px-2 py-0.5 rounded">
                    {result.protein.percentage}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-4xl font-black text-[#17211D]">
                    {result.protein.grams}
                  </span>
                  <span className="text-sm font-bold text-[#526159]">g / día</span>
                </div>
                <span className="text-xs font-medium text-[#526159] block mt-1">
                  {result.protein.calories} kcal (4 kcal/g)
                </span>
              </div>
              <div className="pt-3 border-t border-[#DCE3DD] text-[11px] text-[#526159]">
                Ratio: <strong>{result.proteinPerKg} g/kg</strong> de peso corporal. Fundamental para síntesis proteica muscular.
              </div>
            </div>

            {/* Grasas */}
            <div className="p-5 rounded-xl bg-[#F8F9F6] border-2 border-[#1E3A8A]/30 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                    Grasas Saludables
                  </span>
                  <span className="text-xs font-bold text-white bg-[#1E3A8A] px-2 py-0.5 rounded">
                    {result.fats.percentage}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-4xl font-black text-[#17211D]">
                    {result.fats.grams}
                  </span>
                  <span className="text-sm font-bold text-[#526159]">g / día</span>
                </div>
                <span className="text-xs font-medium text-[#526159] block mt-1">
                  {result.fats.calories} kcal (9 kcal/g)
                </span>
              </div>
              <div className="pt-3 border-t border-[#DCE3DD] text-[11px] text-[#526159]">
                Ratio: <strong>{result.fatPerKg} g/kg</strong> de peso corporal. Esencial para función hormonal y absorción vitamínica.
              </div>
            </div>

            {/* Carbohidratos */}
            <div className="p-5 rounded-xl bg-[#F8F9F6] border-2 border-[#526159]/30 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#17211D]">
                    Carbohidratos
                  </span>
                  <span className="text-xs font-bold text-[#17211D] bg-[#DCE3DD] px-2 py-0.5 rounded">
                    {result.carbs.percentage}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-4xl font-black text-[#17211D]">
                    {result.carbs.grams}
                  </span>
                  <span className="text-sm font-bold text-[#526159]">g / día</span>
                </div>
                <span className="text-xs font-medium text-[#526159] block mt-1">
                  {result.carbs.calories} kcal (4 kcal/g)
                </span>
              </div>
              <div className="pt-3 border-t border-[#DCE3DD] text-[11px] text-[#526159]">
                Remanente calórico. Fuente principal de energía para entrenamientos intensos con pesas.
              </div>
            </div>
          </div>

          {/* Barra de Distribución Accesible (con etiquetas numéricas visibles) */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#526159] block">
              Proporción Energética en la Dieta:
            </span>
            <div className="w-full h-8 rounded-lg overflow-hidden flex text-xs font-bold text-white shadow-inner">
              <div
                style={{ width: `${result.protein.percentage}%` }}
                className="bg-[#176B48] flex items-center justify-center px-2 truncate"
                title={`Proteína: ${result.protein.percentage}%`}
              >
                P: {result.protein.percentage}%
              </div>
              <div
                style={{ width: `${result.fats.percentage}%` }}
                className="bg-[#1E3A8A] flex items-center justify-center px-2 truncate"
                title={`Grasas: ${result.fats.percentage}%`}
              >
                G: {result.fats.percentage}%
              </div>
              <div
                style={{ width: `${result.carbs.percentage}%` }}
                className="bg-[#526159] flex items-center justify-center px-2 truncate"
                title={`Carbohidratos: ${result.carbs.percentage}%`}
              >
                C: {result.carbs.percentage}%
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#526159] pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#176B48]"></span>
                <span>Proteínas ({result.protein.grams}g)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#1E3A8A]"></span>
                <span>Grasas ({result.fats.grams}g)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#526159]"></span>
                <span>Carbohidratos ({result.carbs.grams}g)</span>
              </div>
            </div>
          </div>

          {/* Enlace y Advertencia */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#DCE3DD]">
            <p className="text-[11px] text-[#526159] max-w-xl leading-relaxed">
              {result.disclaimer}
            </p>

            {getWhatsAppUrl(whatsappMessage) ? (
              <a
                href={getWhatsAppUrl(whatsappMessage)!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#176B48] hover:bg-[#105236] text-white text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] shadow-sm ml-auto"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Consultar Plan con Entrenadores</span>
              </a>
            ) : (
              <Link
                href="/ubicacion"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#176B48] hover:bg-[#105236] text-white text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] shadow-sm ml-auto"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span>Consultar en Sede</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
