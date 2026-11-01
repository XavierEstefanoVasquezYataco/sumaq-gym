/**
 * Suite de pruebas unitarias para el motor científico de nutrición y antropometría de Sumaq.
 * Ejecutable directamente con: npx tsx lib/nutrition/formulas.test.ts
 */

import {
  calculateBodyFat,
  validateBodyFatInput,
  calculateBMR,
  calculateTDEE,
  validateBMRInput,
  calculateMacros,
  validateMacroInput,
} from './formulas';

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

function assertCloseTo(actual: number, expected: number, tolerance: number, message: string) {
  const diff = Math.abs(actual - expected);
  if (diff <= tolerance) {
    passedTests++;
    console.log(`  ✓ ${message} (obtenido: ${actual}, esperado: ${expected} ±${tolerance})`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message} (obtenido: ${actual}, esperado: ${expected} ±${tolerance}, dif: ${diff})`);
  }
}

console.log('\n======================================================');
console.log('EJECUTANDO SUITE DE PRUEBAS: MOTOR CIENTÍFICO DE SUMAQ');
console.log('======================================================\n');

// 1. PRUEBAS: PORCENTAJE DE GRASA U.S. NAVY
console.log('--- 1. Pruebas U.S. Navy Body Fat ---');

// Caso Masculino Estándar (175 cm, cuello 38 cm, cintura 85 cm, 75 kg)
const maleValid = validateBodyFatInput({
  sex: 'male',
  heightCm: 175,
  neckCm: 38,
  waistCm: 85,
  weightKg: 75,
});
assert(maleValid.isValid, 'Validación pasa para medidas masculinas correctas');

if (maleValid.isValid) {
  const result = calculateBodyFat(maleValid.data);
  // Valor teórico: ~16.9%
  assertCloseTo(result.bodyFatPercentage, 16.9, 0.5, 'Porcentaje de grasa masculino dentro de rango');
  assert(result.category === 'Fitness / Buen Estado', `Categoría masculina adecuada: ${result.category}`);
  assert(result.fatMassKg !== null && result.fatMassKg > 0, 'Masa grasa calculada correctamente');
  assert(result.leanMassKg !== null && result.leanMassKg > 0, 'Masa magra calculada correctamente');
  if (result.fatMassKg && result.leanMassKg) {
    assertCloseTo(result.fatMassKg + result.leanMassKg, 75, 0.2, 'Masa grasa + masa magra suma el peso total');
  }
}

// Caso Femenino Estándar (165 cm, cuello 32 cm, cintura 70 cm, cadera 95 cm, 60 kg)
const femaleValid = validateBodyFatInput({
  sex: 'female',
  heightCm: 165,
  neckCm: 32,
  waistCm: 70,
  hipCm: 95,
  weightKg: 60,
});
assert(femaleValid.isValid, 'Validación pasa para medidas femeninas correctas');

if (femaleValid.isValid) {
  const result = calculateBodyFat(femaleValid.data);
  // Valor teórico: ~24.9%
  assertCloseTo(result.bodyFatPercentage, 24.9, 0.5, 'Porcentaje de grasa femenino dentro de rango');
  assert(result.category === 'Fitness / Buen Estado', `Categoría femenina adecuada: ${result.category}`);
}

// Caso Inválido: Cuello mayor que cintura en hombre (fisiológicamente imposible para la fórmula)
const maleInvalid = validateBodyFatInput({
  sex: 'male',
  heightCm: 175,
  neckCm: 45,
  waistCm: 40,
});
assert(!maleInvalid.isValid, 'Rechaza correctamente cuello mayor que cintura en hombres');
assert(Boolean(maleInvalid.errors?.waistCm), 'Genera mensaje descriptivo de error en cintura');

// Caso Inválido: Falta de cadera en mujer
const femaleMissingHip = validateBodyFatInput({
  sex: 'female',
  heightCm: 165,
  neckCm: 32,
  waistCm: 70,
});
assert(!femaleMissingHip.isValid, 'Rechaza omisión de cadera en mujeres');
assert(Boolean(femaleMissingHip.errors?.hipCm), 'Genera mensaje descriptivo de error por cadera faltante');

// 2. PRUEBAS: MIFFLIN-ST JEOR TMB Y TDEE
console.log('\n--- 2. Pruebas Mifflin-St Jeor (TMB, TDEE y Objetivos) ---');

// Caso Hombre: 25 años, 75 kg, 178 cm, Actividad Moderada (1.55)
// TMB = 10*75 + 6.25*178 - 5*25 + 5 = 750 + 1112.5 - 125 + 5 = 1742.5 kcal
const bmrMale = calculateBMR({
  sex: 'male',
  ageYears: 25,
  weightKg: 75,
  heightCm: 178,
});
assertCloseTo(bmrMale, 1743, 2, 'TMB masculino según Mifflin-St Jeor exacto');

const tdeeMale = calculateTDEE({
  sex: 'male',
  ageYears: 25,
  weightKg: 75,
  heightCm: 178,
  activityLevel: 'moderate',
});
// TDEE = 1743 * 1.55 = 2701.65 -> 2702
assertCloseTo(tdeeMale.tdee, 2702, 3, 'TDEE masculino con factor 1.55 calculado correctamente');
assert(tdeeMale.moderateDeficit < tdeeMale.tdee, 'Déficit calórico es menor que el mantenimiento');
assert(tdeeMale.moderateSurplus > tdeeMale.tdee, 'Superávit calórico es mayor que el mantenimiento');
assertCloseTo(tdeeMale.tdee - tdeeMale.moderateDeficit, 500, 2, 'Déficit moderado es de ~500 kcal');
assertCloseTo(tdeeMale.moderateSurplus - tdeeMale.tdee, 400, 2, 'Superávit moderado es de ~400 kcal');

// Caso Mujer: 30 años, 60 kg, 160 cm, Actividad Ligera (1.375)
// TMB = 10*60 + 6.25*160 - 5*30 - 161 = 600 + 1000 - 150 - 161 = 1289 kcal
const bmrFemale = calculateBMR({
  sex: 'female',
  ageYears: 30,
  weightKg: 60,
  heightCm: 160,
});
assertCloseTo(bmrFemale, 1289, 2, 'TMB femenino según Mifflin-St Jeor exacto');

const tdeeFemale = calculateTDEE({
  sex: 'female',
  ageYears: 30,
  weightKg: 60,
  heightCm: 160,
  activityLevel: 'light',
});
// TDEE = 1289 * 1.375 = 1772.375 -> 1772
assertCloseTo(tdeeFemale.tdee, 1772, 3, 'TDEE femenino con factor 1.375 calculado correctamente');

// Caso Límite: Validación de edades menores a 18 años
const minorCheck = validateBMRInput({
  sex: 'male',
  ageYears: 16,
  weightKg: 60,
  heightCm: 170,
  activityLevel: 'sedentary',
});
assert(!minorCheck.isValid, 'Rechaza usuarios menores de 18 años por política de salud para adultos');

// 3. PRUEBAS: REPARTO DE MACRONUTRIENTES
console.log('\n--- 3. Pruebas Macronutrientes (ISSN / Coherencia Calórica) ---');

// Caso 1: Fuerza / Hipertrofia (2400 kcal, 75 kg)
const macroGain = calculateMacros({
  targetCalories: 2400,
  weightKg: 75,
  preference: 'muscle_gain',
});
assert(macroGain.protein.grams > 0, 'Gramos de proteína calculados (>0)');
assert(macroGain.fats.grams > 0, 'Gramos de grasa calculados (>0)');
assert(macroGain.carbs.grams > 0, 'Gramos de carbohidratos calculados (>0)');
assertCloseTo(macroGain.proteinPerKg, 2.0, 0.2, 'Proteína en ~2.0 g/kg para hipertrofia');
assertCloseTo(macroGain.totalCalories, 2400, 4, 'Coherencia matemática estricta: Total Kcal coincide con objetivo ±4 kcal');
const sumPctGain = macroGain.protein.percentage + macroGain.fats.percentage + macroGain.carbs.percentage;
assertCloseTo(sumPctGain, 100, 1, 'Porcentajes de macronutrientes suman 100%');

// Caso 2: Pérdida de Grasa / Definición (1800 kcal, 70 kg)
const macroLoss = calculateMacros({
  targetCalories: 1800,
  weightKg: 70,
  preference: 'fat_loss',
});
assert(macroLoss.proteinPerKg >= 2.0, 'Proteína elevada (>= 2.0 g/kg) en fase de déficit para proteger masa magra');
assertCloseTo(macroLoss.totalCalories, 1800, 4, 'Coherencia calórica preservada en déficit');

// Caso 3: Validación de límites de calorías (inferior a 1000)
const invalidMacro = validateMacroInput({
  targetCalories: 700,
  weightKg: 60,
  preference: 'balanced',
});
assert(!invalidMacro.isValid, 'Rechaza ingestas calóricas peligrosamente bajas (< 1000 kcal)');

console.log('\n======================================================');
console.log(`RESUMEN: ${passedTests} PRUEBAS EXITOSAS, ${failedTests} FALLIDAS`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('✓ TODAS LAS PRUEBAS MATEMÁTICAS Y CIENTÍFICAS PASARON CON ÉXITO.\n');
}
