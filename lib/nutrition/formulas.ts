/**
 * Motor científico puro para cálculos de composición corporal, gasto calórico y macronutrientes.
 *
 * Directrices:
 * - Aislamiento estricto de la interfaz (sin dependencias de React ni de librerías de UI).
 * - Basado exclusivamente en literatura científica verificada:
 *   1. U.S. Navy Method (Hodgdon & Beckett, 1984)
 *   2. Ecuación Mifflin-St Jeor (Mifflin et al., 1990)
 *   3. Recomendaciones ISSN / ACSM para distribución de macronutrientes
 * - Tratamiento riguroso de errores numéricos, divisiones por cero y rangos biológicos.
 * - Lenguaje neutral, respetuoso y no estigmatizante.
 */

export type BiologicalSex = 'male' | 'female';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active';

export type NutritionGoal = 'maintenance' | 'deficit' | 'surplus';

export type MacroPreference = 'balanced' | 'muscle_gain' | 'fat_loss';

export interface ValidationSuccess<T> {
  isValid: true;
  data: T;
  errors?: never;
}

export interface ValidationFailure {
  isValid: false;
  errors: Record<string, string>;
  data?: never;
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

/* =========================================================================
   1. PORCENTAJE DE GRASA CORPORAL (U.S. NAVY METHOD)
   ========================================================================= */

export interface BodyFatInput {
  sex: BiologicalSex;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number;
  weightKg?: number;
}

export interface BodyFatResult {
  bodyFatPercentage: number;
  category: string;
  fatMassKg: number | null;
  leanMassKg: number | null;
  interpretation: string;
  disclaimer: string;
}

/**
 * Categorías estándar de composición corporal según el American Council on Exercise (ACE)
 */
export function getBodyFatCategory(
  percentage: number,
  sex: BiologicalSex
): { category: string; description: string } {
  if (sex === 'male') {
    if (percentage < 6) {
      return {
        category: 'Grasa Esencial',
        description: 'Nivel mínimo necesario para funciones fisiológicas basales.',
      };
    }
    if (percentage < 14) {
      return {
        category: 'Atleta',
        description: 'Nivel característico de deportistas de alta competencia y fitness.',
      };
    }
    if (percentage < 18) {
      return {
        category: 'Fitness / Buen Estado',
        description: 'Composición óptima para rendimiento deportivo y salud general.',
      };
    }
    if (percentage < 25) {
      return {
        category: 'Aceptable / Promedio',
        description: 'Rango habitual dentro de los parámetros de salud para adultos.',
      };
    }
    return {
      category: 'Porcentaje Elevado',
      description: 'Nivel con potencial de mejora mediante entrenamiento y ajuste nutricional.',
    };
  } else {
    if (percentage < 14) {
      return {
        category: 'Grasa Esencial',
        description: 'Nivel mínimo indispensable para la salud reproductiva y metabólica.',
      };
    }
    if (percentage < 21) {
      return {
        category: 'Atleta',
        description: 'Nivel habitual en atletas femeninas de resistencia o fuerza.',
      };
    }
    if (percentage < 25) {
      return {
        category: 'Fitness / Buen Estado',
        description: 'Composición física tonificada y equilibrada.',
      };
    }
    if (percentage < 32) {
      return {
        category: 'Aceptable / Promedio',
        description: 'Rango estándar dentro de los parámetros de salud en mujeres adultas.',
      };
    }
    return {
      category: 'Porcentaje Elevado',
      description: 'Nivel con margen de optimización a través de hábitos sostenibles.',
    };
  }
}

/**
 * Validador de entradas para la fórmula de la Marina de EE. UU.
 */
export function validateBodyFatInput(
  input: Partial<BodyFatInput>
): ValidationResult<BodyFatInput> {
  const errors: Record<string, string> = {};

  if (!input.sex || (input.sex !== 'male' && input.sex !== 'female')) {
    errors.sex = 'Selecciona el sexo biológico para aplicar la fórmula correspondiente.';
  }

  const height = Number(input.heightCm);
  if (!height || isNaN(height)) {
    errors.heightCm = 'La altura en centímetros es obligatoria.';
  } else if (height < 100 || height > 250) {
    errors.heightCm = 'La altura debe situarse entre 100 cm y 250 cm.';
  }

  const neck = Number(input.neckCm);
  if (!neck || isNaN(neck)) {
    errors.neckCm = 'La circunferencia del cuello es obligatoria.';
  } else if (neck < 20 || neck > 80) {
    errors.neckCm = 'El cuello debe situarse entre 20 cm y 80 cm.';
  }

  const waist = Number(input.waistCm);
  if (!waist || isNaN(waist)) {
    errors.waistCm = 'La circunferencia de la cintura es obligatoria.';
  } else if (waist < 40 || waist > 220) {
    errors.waistCm = 'La cintura debe situarse entre 40 cm y 220 cm.';
  }

  // Validación diferencial por sexo
  if (input.sex === 'male') {
    if (waist && neck && waist <= neck) {
      errors.waistCm = 'En hombres, la cintura debe ser mayor que la circunferencia del cuello.';
    }
  } else if (input.sex === 'female') {
    const hip = Number(input.hipCm);
    if (!hip || isNaN(hip)) {
      errors.hipCm = 'La circunferencia de cadera es requerida para mujeres.';
    } else if (hip < 50 || hip > 240) {
      errors.hipCm = 'La cadera debe situarse entre 50 cm y 240 cm.';
    } else if (waist && neck && (waist + hip) <= neck) {
      errors.hipCm = 'La suma de cintura y cadera debe superar la circunferencia del cuello.';
    }
  }

  if (input.weightKg !== undefined && input.weightKg !== null && input.weightKg !== ('' as unknown)) {
    const weight = Number(input.weightKg);
    if (isNaN(weight) || weight < 30 || weight > 300) {
      errors.weightKg = 'El peso debe situarse entre 30 kg y 300 kg si se especifica.';
    }
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    data: {
      sex: input.sex!,
      heightCm: height,
      neckCm: neck,
      waistCm: waist,
      hipCm: input.sex === 'female' ? Number(input.hipCm) : undefined,
      weightKg: input.weightKg ? Number(input.weightKg) : undefined,
    },
  };
}

/**
 * Calcula el porcentaje de grasa corporal mediante el método métrico oficial de la Marina de EE. UU.
 * (Hodgdon & Beckett, 1984)
 */
export function calculateBodyFat(input: BodyFatInput): BodyFatResult {
  const { sex, heightCm, neckCm, waistCm, hipCm, weightKg } = input;
  let rawPercentage = 0;

  if (sex === 'male') {
    const logWaistNeck = Math.log10(waistCm - neckCm);
    const logHeight = Math.log10(heightCm);
    const denominator = 1.0324 - 0.19077 * logWaistNeck + 0.15456 * logHeight;
    rawPercentage = 495 / denominator - 450;
  } else {
    const hip = hipCm || 0;
    const logWaistHipNeck = Math.log10(waistCm + hip - neckCm);
    const logHeight = Math.log10(heightCm);
    const denominator = 1.29579 - 0.35004 * logWaistHipNeck + 0.22100 * logHeight;
    rawPercentage = 495 / denominator - 450;
  }

  // Acotación de seguridad fisiológica ante medidas atípicas
  const clampedPercentage = Math.max(3, Math.min(65, rawPercentage));
  const roundedPercentage = Math.round(clampedPercentage * 10) / 10;

  const categoryInfo = getBodyFatCategory(roundedPercentage, sex);

  let fatMassKg: number | null = null;
  let leanMassKg: number | null = null;

  if (weightKg && weightKg > 0) {
    fatMassKg = Math.round(weightKg * (roundedPercentage / 100) * 10) / 10;
    leanMassKg = Math.round((weightKg - fatMassKg) * 10) / 10;
  }

  return {
    bodyFatPercentage: roundedPercentage,
    category: categoryInfo.category,
    fatMassKg,
    leanMassKg,
    interpretation: categoryInfo.description,
    disclaimer:
      'Estimación basada en perímetros corporales (margen de error típico ±3-4%). Los resultados tienen finalidad exclusivamente orientativa para adultos sanos y no reemplazan una evaluación médica o de densitometría (DEXA).',
  };
}

/* =========================================================================
   2. GASTO CALÓRICO Y TDEE (FÓRMULA MIFFLIN-ST JEOR)
   ========================================================================= */

export interface BMRInput {
  sex: BiologicalSex;
  ageYears: number;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
}

export interface CaloricTargets {
  bmr: number;
  tdee: number;
  maintenance: number;
  mildDeficit: number;
  moderateDeficit: number;
  mildSurplus: number;
  moderateSurplus: number;
  activityMultiplier: number;
  activityLabel: string;
}

export const ACTIVITY_FACTORS: Record<
  ActivityLevel,
  { multiplier: number; label: string; description: string }
> = {
  sedentary: {
    multiplier: 1.2,
    label: 'Sedentario',
    description: 'Trabajo de oficina o sentado, poco o ningún ejercicio estructurado.',
  },
  light: {
    multiplier: 1.375,
    label: 'Actividad Ligera',
    description: 'Entrenamiento suave o caminatas frecuentes de 1 a 3 días por semana.',
  },
  moderate: {
    multiplier: 1.55,
    label: 'Actividad Moderada',
    description: 'Entrenamiento en sala de musculación o funcional de 3 a 5 días por semana.',
  },
  very_active: {
    multiplier: 1.725,
    label: 'Fuerte / Muy Activo',
    description: 'Entrenamiento intenso o doble sesión de 6 a 7 días por semana.',
  },
};

/**
 * Validador para inputs de la fórmula de Mifflin-St Jeor
 */
export function validateBMRInput(input: Partial<BMRInput>): ValidationResult<BMRInput> {
  const errors: Record<string, string> = {};

  if (!input.sex || (input.sex !== 'male' && input.sex !== 'female')) {
    errors.sex = 'Selecciona el sexo biológico.';
  }

  const age = Number(input.ageYears);
  if (!age || isNaN(age)) {
    errors.ageYears = 'La edad es obligatoria.';
  } else if (age < 18 || age > 99) {
    errors.ageYears = 'Esta herramienta está calibrada para adultos de 18 a 99 años.';
  }

  const weight = Number(input.weightKg);
  if (!weight || isNaN(weight)) {
    errors.weightKg = 'El peso en kilogramos es obligatorio.';
  } else if (weight < 30 || weight > 250) {
    errors.weightKg = 'El peso debe situarse entre 30 kg y 250 kg.';
  }

  const height = Number(input.heightCm);
  if (!height || isNaN(height)) {
    errors.heightCm = 'La altura en centímetros es obligatoria.';
  } else if (height < 100 || height > 250) {
    errors.heightCm = 'La altura debe situarse entre 100 cm y 250 cm.';
  }

  if (
    !input.activityLevel ||
    !['sedentary', 'light', 'moderate', 'very_active'].includes(input.activityLevel)
  ) {
    errors.activityLevel = 'Selecciona tu nivel de actividad física.';
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    data: {
      sex: input.sex!,
      ageYears: age,
      weightKg: weight,
      heightCm: height,
      activityLevel: input.activityLevel!,
    },
  };
}

/**
 * Calcula la Tasa Metabólica Basal (TMB / BMR) mediante la ecuación de Mifflin-St Jeor (1990)
 * Hombres: 10 * peso(kg) + 6.25 * altura(cm) - 5 * edad(años) + 5
 * Mujeres: 10 * peso(kg) + 6.25 * altura(cm) - 5 * edad(años) - 161
 */
export function calculateBMR(input: Pick<BMRInput, 'sex' | 'ageYears' | 'weightKg' | 'heightCm'>): number {
  const s = input.sex === 'male' ? 5 : -161;
  const bmr = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.ageYears + s;
  return Math.round(bmr);
}

/**
 * Calcula el Gasto Energético Diario Total (TDEE) y los objetivos calóricos
 */
export function calculateTDEE(input: BMRInput): CaloricTargets {
  const bmr = calculateBMR(input);
  const factorInfo = ACTIVITY_FACTORS[input.activityLevel];
  const tdee = Math.round(bmr * factorInfo.multiplier);

  // Rangos científicamente recomendados para evitar pérdidas musculares o ganancias excesivas de grasa
  const mildDeficit = Math.max(1200, Math.round(tdee - 300));
  const moderateDeficit = Math.max(1200, Math.round(tdee - 500));
  const mildSurplus = Math.round(tdee + 250);
  const moderateSurplus = Math.round(tdee + 400);

  return {
    bmr,
    tdee,
    maintenance: tdee,
    mildDeficit,
    moderateDeficit,
    mildSurplus,
    moderateSurplus,
    activityMultiplier: factorInfo.multiplier,
    activityLabel: factorInfo.label,
  };
}

/* =========================================================================
   3. REPARTO DE MACRONUTRIENTES (ISSN / ACSM STANDARDS)
   ========================================================================= */

export interface MacroInput {
  targetCalories: number;
  weightKg: number;
  preference: MacroPreference;
}

export interface MacroNutrientBreakdown {
  grams: number;
  calories: number;
  percentage: number;
}

export interface MacroResult {
  protein: MacroNutrientBreakdown;
  fats: MacroNutrientBreakdown;
  carbs: MacroNutrientBreakdown;
  totalCalories: number;
  targetCalories: number;
  proteinPerKg: number;
  fatPerKg: number;
  preferenceLabel: string;
  disclaimer: string;
}

export const MACRO_PREFERENCES: Record<
  MacroPreference,
  { label: string; description: string; proteinMultiplier: number; fatMultiplier: number }
> = {
  balanced: {
    label: 'Equilibrado / Salud General',
    description: 'Proporción armónica para vitalidad y entrenamientos regulares.',
    proteinMultiplier: 1.8,
    fatMultiplier: 0.9,
  },
  muscle_gain: {
    label: 'Fuerza e Hipertrofia',
    description: 'Mayor aporte proteico para maximizar la síntesis y recuperación muscular.',
    proteinMultiplier: 2.0,
    fatMultiplier: 0.9,
  },
  fat_loss: {
    label: 'Definición / Preservación Muscular',
    description: 'Aporte alto de proteína para proteger la masa magra durante el déficit.',
    proteinMultiplier: 2.2,
    fatMultiplier: 0.8,
  },
};

/**
 * Validador para el cálculo de macronutrientes
 */
export function validateMacroInput(input: Partial<MacroInput>): ValidationResult<MacroInput> {
  const errors: Record<string, string> = {};

  const calories = Number(input.targetCalories);
  if (!calories || isNaN(calories)) {
    errors.targetCalories = 'Ingresa el objetivo calórico diario.';
  } else if (calories < 1000 || calories > 5500) {
    errors.targetCalories = 'El objetivo calórico debe situarse entre 1000 kcal y 5500 kcal.';
  }

  const weight = Number(input.weightKg);
  if (!weight || isNaN(weight)) {
    errors.weightKg = 'Ingresa tu peso corporal para calcular las necesidades por kilogramo.';
  } else if (weight < 30 || weight > 250) {
    errors.weightKg = 'El peso debe situarse entre 30 kg y 250 kg.';
  }

  if (!input.preference || !['balanced', 'muscle_gain', 'fat_loss'].includes(input.preference)) {
    errors.preference = 'Selecciona una preferencia nutricional.';
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    data: {
      targetCalories: Math.round(calories),
      weightKg: weight,
      preference: input.preference!,
    },
  };
}

/**
 * Calcula la distribución exacta y coherente de macronutrientes:
 * 1. Proteína: 1.6 a 2.2 g/kg (4 kcal/g)
 * 2. Grasas: 0.8 a 1.0 g/kg (9 kcal/g), asegurando entre 20% y 30% calórico
 * 3. Carbohidratos: Remanente calórico dividido entre 4 kcal/g
 * Coherencia garantizada: Proteína*4 + Grasas*9 + Carbohidratos*4 = Total Calórico ± 2 kcal
 */
export function calculateMacros(input: MacroInput): MacroResult {
  const { targetCalories, weightKg, preference } = input;
  const config = MACRO_PREFERENCES[preference];

  // 1. Proteínas (4 kcal por gramo)
  let proteinGrams = Math.round(weightKg * config.proteinMultiplier);
  let proteinCalories = proteinGrams * 4;

  // Si la proteína excediera el 40% del total (situación de muy pocas calorías y alto peso), se acota por seguridad
  if (proteinCalories > targetCalories * 0.4) {
    proteinCalories = Math.round(targetCalories * 0.35);
    proteinGrams = Math.round(proteinCalories / 4);
  }

  // 2. Grasas (9 kcal por gramo) - Entre 20% y 30% calórico mínimo para soporte hormonal
  let fatGrams = Math.round(weightKg * config.fatMultiplier);
  let fatCalories = fatGrams * 9;

  const minFatCalories = targetCalories * 0.2;
  const maxFatCalories = targetCalories * 0.35;

  if (fatCalories < minFatCalories) {
    fatCalories = Math.round(minFatCalories);
    fatGrams = Math.round(fatCalories / 9);
  } else if (fatCalories > maxFatCalories) {
    fatCalories = Math.round(maxFatCalories);
    fatGrams = Math.round(fatCalories / 9);
  }

  // 3. Carbohidratos (4 kcal por gramo) - Remanente exacto
  const remainingCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
  const carbsGrams = Math.round(remainingCalories / 4);
  const carbsCalories = carbsGrams * 4;

  // Suma total calculada real tras el redondeo de gramos enteros
  const actualTotalCalories = proteinCalories + fatCalories + carbsCalories;

  const proteinPct = Math.round((proteinCalories / actualTotalCalories) * 100);
  const fatPct = Math.round((fatCalories / actualTotalCalories) * 100);
  const carbsPct = Math.max(0, 100 - (proteinPct + fatPct));

  return {
    protein: {
      grams: proteinGrams,
      calories: proteinCalories,
      percentage: proteinPct,
    },
    fats: {
      grams: fatGrams,
      calories: fatCalories,
      percentage: fatPct,
    },
    carbs: {
      grams: carbsGrams,
      calories: carbsCalories,
      percentage: carbsPct,
    },
    totalCalories: actualTotalCalories,
    targetCalories,
    proteinPerKg: Math.round((proteinGrams / weightKg) * 10) / 10,
    fatPerKg: Math.round((fatGrams / weightKg) * 10) / 10,
    preferenceLabel: config.label,
    disclaimer:
      'Los repartos de macronutrientes deben adaptarse individualmente según la tolerancia digestiva, horarios y preferencias. Consulta siempre con un nutricionista deportivo colegiado para una pauta personalizada.',
  };
}
