"use client";

import React, { useState } from "react";
import {
  calculateTDEE,
  validateBMRInput,
  ACTIVITY_FACTORS,
  type BiologicalSex,
  type ActivityLevel,
  type CaloricTargets,
} from "@/lib/nutrition/formulas";
import {
  Flame,
  RotateCcw,
  AlertCircle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsAppUrl } from "@/lib/data/site-data";

interface TDEECalculatorProps {
  onExportCalories?: (calories: number, weightKg: number) => void;
  initialSex?: BiologicalSex;
  initialWeight?: number;
}

export function TDEECalculator({
  onExportCalories,
  initialSex = "male",
  initialWeight = 75,
}: TDEECalculatorProps) {
  const [sex, setSex] = useState<BiologicalSex>(initialSex);
  const [ageYears, setAgeYears] = useState<string>("28");
  const [weightKg, setWeightKg] = useState<string>(String(initialWeight));
  const [heightCm, setHeightCm] = useState<string>("175");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CaloricTargets | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBMRInput({
      sex,
      ageYears: Number(ageYears),
      weightKg: Number(weightKg),
      heightCm: Number(heightCm),
      activityLevel,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    setErrors({});
    const calc = calculateTDEE(validation.data);
    setResult(calc);
    setSelectedTarget(calc.maintenance);
  };

  const handleReset = () => {
    setAgeYears("28");
    setWeightKg("75");
    setHeightCm("175");
    setActivityLevel("moderate");
    setErrors({});
    setResult(null);
    setSelectedTarget(null);
  };

  const handleSendToMacros = (calories: number) => {
    if (onExportCalories) {
      onExportCalories(calories, Number(weightKg));
    }
  };

  const whatsappMessage = result
    ? `Hola Sumaq Center Gym, calculé mi gasto calórico en la web (TDEE: ${result.tdee} kcal, objetivo seleccionado: ${selectedTarget || result.maintenance} kcal). Quisiera orientación sobre planes y rutinas.`
    : "Hola Sumaq Center Gym, deseo consultar sobre membresías y asesoría de entrenamiento.";

  return (
    <div className="space-y-8">
      {/* Selector de Sexo */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#17211D] mb-2">
          1. Sexo Biológico
        </label>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <button
            type="button"
            onClick={() => {
              setSex("male");
              setErrors({});
              setResult(null);
            }}
            className={`py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] border ${
              sex === "male"
                ? "bg-[#176B48] text-white border-[#176B48] shadow-sm"
                : "bg-[#FFFFFF] text-[#526159] border-[#DCE3DD] hover:bg-[#E7F1E9]"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
          >
            Hombre
          </button>
          <button
            type="button"
            onClick={() => {
              setSex("female");
              setErrors({});
              setResult(null);
            }}
            className={`py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] border ${
              sex === "female"
                ? "bg-[#176B48] text-white border-[#176B48] shadow-sm"
                : "bg-[#FFFFFF] text-[#526159] border-[#DCE3DD] hover:bg-[#E7F1E9]"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
          >
            Mujer
          </button>
        </div>
      </div>

      {/* Formulario de Parámetros Metabólicos */}
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Edad */}
          <div>
            <label
              htmlFor="tdee-age"
              className="block text-xs font-semibold text-[#17211D] mb-1.5"
            >
              Edad (años) *
            </label>
            <div className="relative">
              <input
                id="tdee-age"
                type="number"
                min="18"
                max="99"
                value={ageYears}
                onChange={(e) => setAgeYears(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border ${
                  errors.ageYears ? "border-[#DC2626]" : "border-[#DCE3DD]"
                } text-[#17211D] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
                placeholder="Ej. 28"
                required
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-[#526159] font-medium">
                años
              </span>
            </div>
            {errors.ageYears && (
              <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.ageYears}
              </p>
            )}
          </div>

          {/* Peso */}
          <div>
            <label
              htmlFor="tdee-weight"
              className="block text-xs font-semibold text-[#17211D] mb-1.5"
            >
              Peso Corporal (kg) *
            </label>
            <div className="relative">
              <input
                id="tdee-weight"
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

          {/* Altura */}
          <div>
            <label
              htmlFor="tdee-height"
              className="block text-xs font-semibold text-[#17211D] mb-1.5"
            >
              Altura (cm) *
            </label>
            <div className="relative">
              <input
                id="tdee-height"
                type="number"
                step="0.5"
                min="100"
                max="250"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border ${
                  errors.heightCm ? "border-[#DC2626]" : "border-[#DCE3DD]"
                } text-[#17211D] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
                placeholder="Ej. 175"
                required
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-[#526159] font-medium">
                cm
              </span>
            </div>
            {errors.heightCm && (
              <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.heightCm}
              </p>
            )}
          </div>
        </div>

        {/* Nivel de Actividad Física */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#17211D] mb-2.5">
            2. Nivel de Actividad Física Semanal
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(
              Object.keys(ACTIVITY_FACTORS) as ActivityLevel[]
            ).map((level) => {
              const factor = ACTIVITY_FACTORS[level];
              const isSelected = activityLevel === level;

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setActivityLevel(level)}
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
                      {factor.label}
                    </span>
                    <span className="text-[11px] text-[#526159] mt-1 block leading-relaxed">
                      {factor.description}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#526159] mt-3 font-semibold">
                    Factor ×{factor.multiplier}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.activityLevel && (
            <p className="text-xs text-[#DC2626] mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.activityLevel}
            </p>
          )}
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="py-3.5 px-6 rounded-lg bg-[#176B48] hover:bg-[#105236] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all min-h-[44px] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
          >
            <Flame className="w-4 h-4" />
            <span>Calcular Gasto Calórico (TDEE)</span>
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

      {/* Resultados de Calorías */}
      {result && (
        <div className="rounded-xl bg-[#FFFFFF] border-2 border-[#176B48] p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
          {/* Métricas Basales y Totales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-[#DCE3DD]">
            <div className="p-5 rounded-lg bg-[#F8F9F6] border border-[#DCE3DD]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#526159] block">
                Tasa Metabólica Basal (TMB)
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-3xl font-black text-[#17211D]">
                  {result.bmr}
                </span>
                <span className="text-xs font-bold text-[#526159]">
                  kcal / día
                </span>
              </div>
              <p className="text-[11px] text-[#526159] mt-2 leading-relaxed">
                Energía mínima vital que tu cuerpo consume en reposo absoluto para respirar, hacer circular la sangre y mantener funciones celulares.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#E7F1E9] border border-[#176B48]/30">
              <span className="text-xs font-bold uppercase tracking-wider text-[#176B48] block">
                Gasto Energético Total Diario (TDEE)
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-[#17211D]">
                  {result.tdee}
                </span>
                <span className="text-xs font-bold text-[#176B48]">
                  kcal / día
                </span>
              </div>
              <p className="text-[11px] text-[#526159] mt-2 leading-relaxed">
                Total de calorías que quemas al día integrando tu TMB y tu nivel de actividad física ({result.activityLabel}).
              </p>
            </div>
          </div>

          {/* Desglose por Objetivos Calóricos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#17211D]">
                Selecciona tu Objetivo para Adaptar tus Calorías Diarias:
              </h4>
              <span className="text-[11px] text-[#526159]">
                Haz clic en una opción para seleccionarla
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Déficit */}
              <button
                type="button"
                onClick={() => setSelectedTarget(result.moderateDeficit)}
                className={`p-5 rounded-xl border text-left transition-all relative ${
                  selectedTarget === result.moderateDeficit
                    ? "bg-[#E7F1E9] border-[#176B48] shadow-sm"
                    : "bg-[#FFFFFF] border-[#DCE3DD] hover:bg-[#F8F9F6]"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
              >
                <div className="flex items-center gap-2 text-[#176B48] mb-1">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Déficit Sostenible
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-[#17211D]">
                    {result.moderateDeficit}
                  </span>
                  <span className="text-xs font-semibold text-[#526159]">
                    kcal/día
                  </span>
                </div>
                <span className="inline-block text-[10px] font-bold text-[#176B48] bg-white px-2 py-0.5 rounded border border-[#DCE3DD] mt-2">
                  -500 kcal del TDEE
                </span>
                <p className="text-[11px] text-[#526159] mt-2.5 leading-relaxed">
                  Orientado a una reducción gradual de grasa corporal preservando la masa muscular mediante entrenamiento de fuerza.
                </p>
              </button>

              {/* Mantenimiento */}
              <button
                type="button"
                onClick={() => setSelectedTarget(result.maintenance)}
                className={`p-5 rounded-xl border text-left transition-all relative ${
                  selectedTarget === result.maintenance
                    ? "bg-[#E7F1E9] border-[#176B48] shadow-sm"
                    : "bg-[#FFFFFF] border-[#DCE3DD] hover:bg-[#F8F9F6]"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
              >
                <div className="flex items-center gap-2 text-[#1E3A8A] mb-1">
                  <Minus className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Mantenimiento
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-[#17211D]">
                    {result.maintenance}
                  </span>
                  <span className="text-xs font-semibold text-[#526159]">
                    kcal/día
                  </span>
                </div>
                <span className="inline-block text-[10px] font-bold text-[#1E3A8A] bg-white px-2 py-0.5 rounded border border-[#DCE3DD] mt-2">
                  Equilibrio Energético
                </span>
                <p className="text-[11px] text-[#526159] mt-2.5 leading-relaxed">
                  Conserva tu peso actual y maximiza el rendimiento deportivo y recuperación en sala de pesas.
                </p>
              </button>

              {/* Superávit */}
              <button
                type="button"
                onClick={() => setSelectedTarget(result.moderateSurplus)}
                className={`p-5 rounded-xl border text-left transition-all relative ${
                  selectedTarget === result.moderateSurplus
                    ? "bg-[#E7F1E9] border-[#176B48] shadow-sm"
                    : "bg-[#FFFFFF] border-[#DCE3DD] hover:bg-[#F8F9F6]"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
              >
                <div className="flex items-center gap-2 text-[#176B48] mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Superávit Controlado
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-[#17211D]">
                    {result.moderateSurplus}
                  </span>
                  <span className="text-xs font-semibold text-[#526159]">
                    kcal/día
                  </span>
                </div>
                <span className="inline-block text-[10px] font-bold text-[#176B48] bg-white px-2 py-0.5 rounded border border-[#DCE3DD] mt-2">
                  +400 kcal del TDEE
                </span>
                <p className="text-[11px] text-[#526159] mt-2.5 leading-relaxed">
                  Aporte extra de sustrato energético para síntesis de nuevo tejido muscular limitando el aumento graso.
                </p>
              </button>
            </div>
          </div>

          {/* Acciones Integradas con las Otras Herramientas y WhatsApp */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#DCE3DD]">
            {onExportCalories && selectedTarget && (
              <button
                type="button"
                onClick={() => handleSendToMacros(selectedTarget)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1E3A8A] hover:bg-[#152a65] text-white text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] shadow-sm"
              >
                <span>Usar {selectedTarget} kcal en Macronutrientes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#176B48] hover:bg-[#105236] text-white text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] shadow-sm ml-auto"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Consultar Rutina Adaptada por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
