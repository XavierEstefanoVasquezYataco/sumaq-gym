"use client";

import React, { useState } from "react";
import {
  calculateBodyFat,
  validateBodyFatInput,
  type BiologicalSex,
  type BodyFatResult,
} from "@/lib/nutrition/formulas";
import {
  Sparkles,
  HelpCircle,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface BodyFatCalculatorProps {
  onSyncData?: (data: { sex: BiologicalSex; weightKg?: number }) => void;
  initialSex?: BiologicalSex;
  initialWeight?: number;
}

export function BodyFatCalculator({
  onSyncData,
  initialSex = "male",
  initialWeight,
}: BodyFatCalculatorProps) {
  const [sex, setSex] = useState<BiologicalSex>(initialSex);
  const [heightCm, setHeightCm] = useState<string>("175");
  const [neckCm, setNeckCm] = useState<string>("38");
  const [waistCm, setWaistCm] = useState<string>("85");
  const [hipCm, setHipCm] = useState<string>("95");
  const [weightKg, setWeightKg] = useState<string>(
    initialWeight ? String(initialWeight) : "75"
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBodyFatInput({
      sex,
      heightCm: Number(heightCm),
      neckCm: Number(neckCm),
      waistCm: Number(waistCm),
      hipCm: sex === "female" ? Number(hipCm) : undefined,
      weightKg: weightKg ? Number(weightKg) : undefined,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    setErrors({});
    const calcResult = calculateBodyFat(validation.data);
    setResult(calcResult);

    if (onSyncData) {
      onSyncData({
        sex,
        weightKg: validation.data.weightKg,
      });
    }
  };

  const handleReset = () => {
    setHeightCm("175");
    setNeckCm("38");
    setWaistCm("85");
    setHipCm("95");
    setWeightKg("75");
    setErrors({});
    setResult(null);
  };

  return (
    <div className="space-y-8">
      {/* Selector de Sexo Biológico */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#17211D] mb-2">
          1. Sexo Biológico (requerido por el método U.S. Navy)
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

      {/* Formulario de Medidas */}
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Altura */}
          <div>
            <label
              htmlFor="bf-height"
              className="block text-xs font-semibold text-[#17211D] mb-1.5"
            >
              Altura (cm) *
            </label>
            <div className="relative">
              <input
                id="bf-height"
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

          {/* Cuello */}
          <div>
            <label
              htmlFor="bf-neck"
              className="block text-xs font-semibold text-[#17211D] mb-1.5"
            >
              Circunferencia de Cuello (cm) *
            </label>
            <div className="relative">
              <input
                id="bf-neck"
                type="number"
                step="0.5"
                min="20"
                max="80"
                value={neckCm}
                onChange={(e) => setNeckCm(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border ${
                  errors.neckCm ? "border-[#DC2626]" : "border-[#DCE3DD]"
                } text-[#17211D] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
                placeholder="Ej. 38"
                required
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-[#526159] font-medium">
                cm
              </span>
            </div>
            {errors.neckCm && (
              <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.neckCm}
              </p>
            )}
          </div>

          {/* Cintura */}
          <div>
            <label
              htmlFor="bf-waist"
              className="block text-xs font-semibold text-[#17211D] mb-1.5"
            >
              Circunferencia de Cintura (cm) *
            </label>
            <div className="relative">
              <input
                id="bf-waist"
                type="number"
                step="0.5"
                min="40"
                max="220"
                value={waistCm}
                onChange={(e) => setWaistCm(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border ${
                  errors.waistCm ? "border-[#DC2626]" : "border-[#DCE3DD]"
                } text-[#17211D] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
                placeholder="Ej. 85"
                required
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-[#526159] font-medium">
                cm
              </span>
            </div>
            {errors.waistCm && (
              <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.waistCm}
              </p>
            )}
          </div>

          {/* Cadera (Solo para Mujeres) */}
          {sex === "female" && (
            <div>
              <label
                htmlFor="bf-hip"
                className="block text-xs font-semibold text-[#17211D] mb-1.5"
              >
                Circunferencia de Cadera (cm) *
              </label>
              <div className="relative">
                <input
                  id="bf-hip"
                  type="number"
                  step="0.5"
                  min="50"
                  max="240"
                  value={hipCm}
                  onChange={(e) => setHipCm(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border ${
                    errors.hipCm ? "border-[#DC2626]" : "border-[#DCE3DD]"
                  } text-[#17211D] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
                  placeholder="Ej. 95"
                  required
                />
                <span className="absolute right-3.5 top-3.5 text-xs text-[#526159] font-medium">
                  cm
                </span>
              </div>
              {errors.hipCm && (
                <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.hipCm}
                </p>
              )}
            </div>
          )}

          {/* Peso Corporal (Opcional para desglose en kg) */}
          <div>
            <label
              htmlFor="bf-weight"
              className="block text-xs font-semibold text-[#17211D] mb-1.5"
            >
              Peso Corporal (kg) - Opcional
            </label>
            <div className="relative">
              <input
                id="bf-weight"
                type="number"
                step="0.5"
                min="30"
                max="300"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border ${
                  errors.weightKg ? "border-[#DC2626]" : "border-[#DCE3DD]"
                } text-[#17211D] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
                placeholder="Ej. 75"
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

        {/* Acciones */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="py-3.5 px-6 rounded-lg bg-[#176B48] hover:bg-[#105236] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all min-h-[44px] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Calcular Porcentaje de Grasa</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="py-3.5 px-4 rounded-lg bg-[#FFFFFF] border border-[#DCE3DD] hover:bg-[#F8F9F6] text-[#526159] text-xs font-semibold flex items-center gap-1.5 min-h-[44px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>

          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="py-3.5 px-4 rounded-lg bg-transparent text-[#1E3A8A] hover:bg-[#E7F1E9]/50 text-xs font-semibold flex items-center gap-1.5 min-h-[44px] ml-auto transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span>¿Cómo tomar las medidas?</span>
            {showGuide ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </form>

      {/* Guía Desplegable para la Toma de Medidas */}
      {showGuide && (
        <div className="p-5 rounded-xl bg-[#E7F1E9]/60 border border-[#DCE3DD] text-xs text-[#17211D] space-y-3">
          <h4 className="font-bold uppercase tracking-wider text-[#176B48] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Protocolo de Medición U.S. Navy con Cinta Métrica Flexible:
          </h4>
          <ul className="space-y-2 text-[#526159] list-disc list-inside">
            <li>
              <strong>Altura:</strong> Descalzo, talones juntos, espalda erguida contra una superficie recta.
            </li>
            <li>
              <strong>Cuello:</strong> Rodea el cuello justo por debajo de la laringe (nuez de Adán), manteniendo la cinta horizontal sin apretar los tejidos blandos.
            </li>
            <li>
              <strong>Cintura:</strong> En hombres, mide horizontalmente a nivel del ombligo tras una exhalación normal y sin contraer el abdomen. En mujeres, mide en la parte más estrecha del torso (cintura natural).
            </li>
            {sex === "female" && (
              <li>
                <strong>Cadera:</strong> Mide la circunferencia horizontal en la zona de mayor prominencia de los glúteos.
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Panel de Resultados */}
      {result && (
        <div className="rounded-xl bg-[#FFFFFF] border-2 border-[#176B48] p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#DCE3DD]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#176B48] block">
                Resultado de Composición Corporal
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-black text-[#17211D]">
                  {result.bodyFatPercentage}%
                </span>
                <span className="text-sm font-semibold text-[#526159]">
                  grasa corporal estimada
                </span>
              </div>
            </div>

            <div className="px-4 py-2 rounded-lg bg-[#E7F1E9] border border-[#DCE3DD] text-[#176B48] font-bold text-xs uppercase tracking-wider">
              Categoría ACE: {result.category}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#526159] leading-relaxed">
            {result.interpretation}
          </p>

          {/* Desglose en kilogramos si se suministró peso */}
          {result.fatMassKg !== null && result.leanMassKg !== null && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-[#F8F9F6] border border-[#DCE3DD]">
                <span className="text-xs font-semibold text-[#526159] block">
                  Masa Grasa Estimada
                </span>
                <span className="text-2xl font-bold text-[#17211D] mt-0.5 block">
                  {result.fatMassKg} kg
                </span>
                <span className="text-[11px] text-[#526159]">
                  Tejido adiposo subcutáneo y visceral
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#F8F9F6] border border-[#DCE3DD]">
                <span className="text-xs font-semibold text-[#526159] block">
                  Masa Libre de Grasa (Masa Magra)
                </span>
                <span className="text-2xl font-bold text-[#176B48] mt-0.5 block">
                  {result.leanMassKg} kg
                </span>
                <span className="text-[11px] text-[#526159]">
                  Músculo esquelético, órganos, agua y hueso
                </span>
              </div>
            </div>
          )}

          <div className="pt-2 text-[11px] text-[#526159] leading-relaxed border-t border-[#DCE3DD]">
            {result.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
}
