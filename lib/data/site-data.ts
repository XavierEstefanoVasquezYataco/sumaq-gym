/**
 * Configuración centralizada de datos y estado del sitio para Sumaq Center Gym.
 * Proporciona una fuente única de verdad para datos institucionales, de contacto,
 * geográficos, y estructuras de contenido para el modo prototipo / producción.
 */

export interface GymLocation {
  name: string;
  brandName: string;
  tagline: string;
  address: string;
  street: string;
  district: string;
  city: string;
  postalCode: string;
  country: string;
  reference: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phoneDisplay: string;
  phoneRaw: string;
  phoneInternational: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  defaultWhatsAppMessage: string;
}

export interface GymSchedule {
  weekdays: string;
  saturday: string;
  sunday: string;
  holidays: string;
  notes: string;
}

export interface PlanItem {
  id: string;
  title: string;
  period: string;
  priceNote: string;
  isPopular?: boolean;
  description: string;
  features: string[];
  ctaLabel: string;
  whatsAppMessage: string;
}

export interface ClassItem {
  id: string;
  name: string;
  category: string;
  intensity: 'Baja' | 'Media' | 'Alta' | 'Variable';
  durationMinutes: number;
  description: string;
  scheduleText: string;
  isFeatured?: boolean;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  category: 'Equipamiento' | 'Instalaciones' | 'Asesoría' | 'Ubicación';
}

/**
 * Bandera de modo prototipo / demostración.
 * Si NEXT_PUBLIC_IS_DEMO está explícitamente configurada en 'false', opera en producción real.
 * Por defecto en desarrollo y preview, permanece en 'true' para proteger la indexación y mostrar avisos.
 */
export const isDemoMode: boolean = process.env.NEXT_PUBLIC_IS_DEMO !== 'false';

/**
 * Datos institucionales y de contacto verificados de Sumaq Center Gym
 */
export const SITE_DATA: GymLocation = {
  name: 'Sumaq Center Gym',
  brandName: 'SUMAQ CENTER GYM',
  tagline: 'Centro de acondicionamiento físico, fuerza y salud en el corazón histórico de Lima.',
  address: 'Jirón Callao 126, Cercado de Lima 15001',
  street: 'Jirón Callao 126',
  district: 'Cercado de Lima',
  city: 'Lima',
  postalCode: '15001',
  country: 'Perú',
  reference: 'A pasos de la Plaza de Armas, Palacio Municipal y Damero de Pizarro',
  coordinates: {
    lat: -12.043818,
    lng: -77.03451,
  },
  phoneDisplay: '933 596 324',
  phoneRaw: '51933596324',
  phoneInternational: '+51 933 596 324',
  email: 'contacto@sumaqcentergym.com',
  instagramUrl: 'https://www.instagram.com/sumaqcentergym/',
  facebookUrl: 'https://www.facebook.com/SumaqSumaqGYM/',
  defaultWhatsAppMessage:
    'Hola Sumaq Center Gym, deseo recibir información sobre membresías y promociones.',
};

/**
 * Horarios de atención oficiales
 * Lunes a viernes confirmado; fines de semana pendientes de confirmación formal.
 */
export const SITE_SCHEDULE: GymSchedule = {
  weekdays: '6:00 a. m. a 11:00 p. m.',
  saturday: 'Por confirmar',
  sunday: 'Por confirmar',
  holidays: 'Por confirmar',
  notes: 'Horario continuo de lunes a viernes.',
};

/**
 * Enlaces de navegación externa para ubicación
 */
export const NAVIGATION_LINKS = {
  googleMapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${SITE_DATA.coordinates.lat},${SITE_DATA.coordinates.lng}`,
  googleMapsPlace: 'https://www.google.com/maps/search/?api=1&query=Jir%C3%B3n+Callao+126%2C+Cercado+de+Lima+15001',
  wazeDirections: `https://waze.com/ul?ll=${SITE_DATA.coordinates.lat},${SITE_DATA.coordinates.lng}&navigate=yes`,
};

/**
 * Generador de enlace de WhatsApp con mensaje personalizado
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || SITE_DATA.defaultWhatsAppMessage;
  return `https://wa.me/${SITE_DATA.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Catálogo de Membresías base (para presentación y fallback en modo demo/offline)
 */
export const MEMBERSHIP_PLANS: PlanItem[] = [
  {
    id: 'mensual',
    title: 'Plan Mensual',
    period: '1 Mes',
    priceNote: 'Consulta tarifa por WhatsApp',
    description: 'Acceso total y continuo a sala de musculación, área cardiovascular y asesoría inicial.',
    features: [
      'Acceso en horario continuo L-V (6:00 a. m. a 11:00 p. m.)',
      'Área completa de peso libre y poleas',
      'Máquinas guiadas de musculación',
      'Sector cardiovascular (cintas, elípticas, bicicletas)',
      'Casilleros y vestuarios disponibles',
    ],
    ctaLabel: 'Consultar Plan Mensual',
    whatsAppMessage: 'Hola Sumaq Center Gym, deseo consultar el precio y detalles del Plan Mensual.',
  },
  {
    id: 'trimestral',
    title: 'Plan Trimestral',
    period: '3 Meses',
    priceNote: 'Tarifa preferencial por trimestre',
    isPopular: true,
    description: 'La opción ideal para consolidar hábitos de entrenamiento y constancia con costo mensual reducido.',
    features: [
      'Todos los beneficios del plan mensual',
      'Descuento preferencial respecto al pago mensual',
      'Evaluación y orientación de rutina básica',
      'Acceso total en horario continuo sin restricciones',
      'Congelamiento de membresía por viaje/salud (según condiciones)',
    ],
    ctaLabel: 'Consultar Plan Trimestral',
    whatsAppMessage: 'Hola Sumaq Center Gym, me interesa el Plan Trimestral con tarifa preferencial.',
  },
  {
    id: 'semestral',
    title: 'Plan Semestral',
    period: '6 Meses',
    priceNote: 'Mayor ahorro para entrenamiento sostenido',
    description: 'Compromiso a mediano plazo para una transformación física tangible y disciplina deportiva.',
    features: [
      'Todos los beneficios del plan trimestral',
      'Tarifa mensual significativamente más económica',
      'Seguimiento periódico de progreso',
      'Prioridad en consulta de disponibilidad para clases funcionales',
      'Opción de pase de cortesía para un invitado',
    ],
    ctaLabel: 'Consultar Plan Semestral',
    whatsAppMessage: 'Hola Sumaq Center Gym, deseo consultar promociones y facilidades del Plan Semestral.',
  },
  {
    id: 'anual',
    title: 'Plan Anual',
    period: '12 Meses',
    priceNote: 'La inversión más rentable en tu salud',
    description: 'Acceso ilimitado los 365 días para deportistas disciplinados que buscan el máximo valor por mes.',
    features: [
      'Máximo ahorro en tarifa por mes',
      'Acceso irrestricto todo el año',
      'Opción extendida de congelamiento de membresía',
      'Kit de bienvenida o descuento en tienda de suplementos (sujeto a stock)',
      'Pase de invitado mensual incluido',
    ],
    ctaLabel: 'Consultar Plan Anual',
    whatsAppMessage: 'Hola Sumaq Center Gym, deseo consultar el precio especial y facilidades del Plan Anual.',
  },
];

/**
 * Catálogo de Clases y Disciplinas ofrecidas
 */
export const GYM_CLASSES: ClassItem[] = [
  {
    id: 'musculacion',
    name: 'Musculación & Hipertrofia',
    category: 'Fuerza',
    intensity: 'Variable',
    durationMinutes: 60,
    description: 'Entrenamiento orientado al desarrollo de masa muscular, fuerza funcional y acondicionamiento estructural con peso libre y poleas.',
    scheduleText: 'Horario libre y continuo durante toda la jornada',
    isFeatured: true,
  },
  {
    id: 'funcional',
    name: 'Entrenamiento Funcional',
    category: 'Acondicionamiento',
    intensity: 'Alta',
    durationMinutes: 45,
    description: 'Circuitos dinámicos de cuerpo completo combinando resistencia metabólica, coordinación, agilidad y quema calórica eficiente.',
    scheduleText: 'Turnos mañana y tarde (consultar horarios específicos)',
    isFeatured: true,
  },
  {
    id: 'cardio',
    name: 'Cardio & Resistencia',
    category: 'Cardiovascular',
    intensity: 'Media',
    durationMinutes: 45,
    description: 'Zona cardiovascular equipada para optimizar la salud cardiovascular, resistencia pulmonar y control del porcentaje graso.',
    scheduleText: 'Acceso continuo durante todo el horario de atención',
    isFeatured: false,
  },
  {
    id: 'spinning',
    name: 'Ciclismo Indoor / Spinning',
    category: 'Cardiovascular',
    intensity: 'Alta',
    durationMinutes: 50,
    description: 'Sesiones guiadas de alta cadencia y resistencia sobre bicicletas estacionarias para máxima resistencia y gasto energético.',
    scheduleText: 'Sujeto a programación semanal (consultar disponibilidad)',
    isFeatured: false,
  },
];

/**
 * Beneficios tangibles ofrecidos en la sede
 */
export const GYM_BENEFITS: BenefitItem[] = [
  {
    id: 'ubicacion-estrategica',
    title: 'Ubicación Insuperable',
    category: 'Ubicación',
    description: 'En Jr. Callao 126, a solo una cuadra de la Plaza de Armas de Lima. Fácil llegada a pie o en transporte público céntrico.',
  },
  {
    id: 'horario-extenso',
    title: 'Horario Continuo Extenso',
    category: 'Instalaciones',
    description: 'Entrena desde las 6:00 a. m. hasta las 11:00 p. m. de lunes a viernes, adaptado tanto a madrugadores como a quienes entrenan tras la jornada laboral.',
  },
  {
    id: 'maquinas-completas',
    title: 'Equipamiento Variado y Robusto',
    category: 'Equipamiento',
    description: 'Variedad de mancuernas, barras olímpicas, bancadas de press, racks de sentadillas, poleas dobles y máquinas de palanca.',
  },
  {
    id: 'comodidades',
    title: 'Vestuarios y Casilleros',
    category: 'Instalaciones',
    description: 'Espacio higiénico y seguro para guardar pertenencias, cambiarte y prepararte para tu rutina diaria con tranquilidad.',
  },
  {
    id: 'comunidad',
    title: 'Ambiente de Disciplina y Respeto',
    category: 'Asesoría',
    description: 'Ambiente enfocado en el progreso deportivo auténtico, sin distracciones superficiales, apto para principiantes y avanzados.',
  },
];

/**
 * Promoción de demostración para el modo prototipo (isDemoMode === true)
 * Nunca se muestra en producción real si la consulta de Sanity está vacía.
 */
export const DEMO_PROMOTION = {
  _id: 'demo-promo-01',
  titulo: 'Membresías con Precio Especial de Apertura',
  descripcion:
    'Inscríbete hoy en Sumaq Center Gym y entrena con tarifa preferencial en todas nuestras áreas de musculación y cardio. Consulta disponibilidad de cupos directamente con nuestro equipo por WhatsApp.',
  descuento: 'Campaña de Temporada',
  textoBoton: 'Consultar Promoción por WhatsApp',
  enlaceBoton: getWhatsAppUrl('Hola Sumaq Center Gym, quisiera consultar sobre la promoción de membresía especial de temporada.'),
};
