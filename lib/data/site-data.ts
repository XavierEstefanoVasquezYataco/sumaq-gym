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
  floorReference: string;
  floorVerified: boolean;
  // Coordenadas: ausentes hasta verificación formal del propietario mediante pin confirmado
  coordinates?: {
    lat: number;
    lng: number;
  };
  coordsVerified: boolean;
  phoneDisplay: string;
  phoneRaw: string;
  phoneInternational: string;
  phoneVerified: boolean;
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

export interface MapProviderConfig {
  tileUrl: string;
  tileAttribution: string;
  maxZoom: number;
  // Encuadre general orientativo del Centro Histórico de Lima (zona general, no representa el gimnasio)
  generalCenter: [number, number];
  generalZoom: number;
  areaLabel: string;
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
 * Datos institucionales y de contacto de Sumaq Center Gym
 * NOTA DE PRIORIDAD: Las coordenadas anteriores fueron descartadas por el propietario.
 * No se utilizan coordenadas estimadas ni 0,0.
 * La ubicación exacta y el teléfono permanecen pendientes de confirmación formal.
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
  floorReference: '7.º piso (Por confirmar)',
  floorVerified: false,
  // Coordenadas ausentes hasta confirmación de pin exacto
  coordinates: undefined,
  coordsVerified: false,
  // Teléfono pendiente de validación formal
  phoneDisplay: '933 596 324 (Por confirmar)',
  phoneRaw: '51933596324',
  phoneInternational: '+51 933 596 324',
  phoneVerified: false,
  email: 'contacto@sumaqcentergym.com',
  instagramUrl: 'https://www.instagram.com/sumaqcentergym/',
  facebookUrl: 'https://www.facebook.com/SumaqSumaqGYM/',
  defaultWhatsAppMessage:
    'Hola Sumaq Center Gym, deseo recibir información sobre membresías y promociones.',
};

/**
 * Configuración centralizada de mapas y teselas.
 * Capa estándar de OpenStreetMap para evitar errores de API KEY de proveedores de pago o CARTO.
 */
export const MAP_CONFIG: MapProviderConfig = {
  tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileAttribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
  maxZoom: 19,
  // Coordenadas de encuadre general del Centro Histórico de Lima (Plaza Mayor / Jr. de la Unión)
  generalCenter: [-12.0464, -77.0328],
  generalZoom: 15,
  areaLabel: 'Centro Histórico de Lima (Vista orientativa general • Pin del gimnasio por confirmar)',
};

/**
 * Horarios de atención oficiales.
 * Canónicamente centralizados: sólo deben mostrarse en el Footer.
 */
export const SITE_SCHEDULE: GymSchedule = {
  weekdays: '6:00 a. m. a 11:00 p. m.',
  saturday: 'Por confirmar',
  sunday: 'Por confirmar',
  holidays: 'Por confirmar',
  notes: 'Horario continuo de lunes a viernes.',
};

/**
 * Enlaces de navegación externa para ubicación.
 * Búsqueda por dirección en Google Maps habilitada.
 * Rutas punto a punto en Waze preparadas pero inactivas hasta verificar coordenadas.
 */
export const NAVIGATION_LINKS = {
  // Búsqueda por dirección postal en Google Maps (aclara que es búsqueda y no destino verificado)
  googleMapsPlace:
    'https://www.google.com/maps/search/?api=1&query=Jir%C3%B3n+Callao+126%2C+Cercado+de+Lima+15001',
  googleMapsSearch:
    'https://www.google.com/maps/search/?api=1&query=Jir%C3%B3n+Callao+126%2C+Cercado+de+Lima+15001',
  // Enlaces punto a punto condicionados a coordenadas confirmadas
  googleMapsDirections:
    SITE_DATA.coordsVerified && SITE_DATA.coordinates
      ? `https://www.google.com/maps/dir/?api=1&destination=${SITE_DATA.coordinates.lat},${SITE_DATA.coordinates.lng}`
      : 'https://www.google.com/maps/search/?api=1&query=Jir%C3%B3n+Callao+126%2C+Cercado+de+Lima+15001',
  wazeDirections:
    SITE_DATA.coordsVerified && SITE_DATA.coordinates
      ? `https://waze.com/ul?ll=${SITE_DATA.coordinates.lat},${SITE_DATA.coordinates.lng}&navigate=yes`
      : null,
};

/**
 * Generador de enlace de WhatsApp con mensaje personalizado.
 * Retorna null si la línea telefónica no ha sido formalmente verificada,
 * evitando abrir chats hacia números no confirmados.
 */
export function getWhatsAppUrl(customMessage?: string): string | null {
  if (!SITE_DATA.phoneVerified) {
    return null;
  }
  const message = customMessage || SITE_DATA.defaultWhatsAppMessage;
  return `https://wa.me/${SITE_DATA.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Catálogo de Membresías base (sobrias, sin horarios repetidos ni afirmaciones comerciales no verificadas)
 */
export const MEMBERSHIP_PLANS: PlanItem[] = [
  {
    id: 'mensual',
    title: 'Plan Mensual',
    period: '1 Mes',
    priceNote: 'Consultar precio',
    description: 'Acceso a la sala de musculación, área cardiovascular y orientación de entrenamiento.',
    features: [
      'Acceso a sala de musculación y pesas',
      'Uso de máquinas cardiovasculares',
      'Asesoría y orientación en sala',
      'Casilleros para uso en el entrenamiento',
    ],
    ctaLabel: 'Consultar Plan Mensual',
    whatsAppMessage: 'Hola Sumaq Center Gym, deseo consultar el precio del Plan Mensual.',
  },
  {
    id: 'trimestral',
    title: 'Plan Trimestral',
    period: '3 Meses',
    priceNote: 'Consultar precio',
    isPopular: true,
    description: 'Modalidad orientada a la continuidad del entrenamiento y consolidación de hábitos.',
    features: [
      'Acceso a sala de musculación y pesas',
      'Uso de máquinas cardiovasculares',
      'Asesoría y orientación en sala',
      'Casilleros para uso en el entrenamiento',
    ],
    ctaLabel: 'Consultar Plan Trimestral',
    whatsAppMessage: 'Hola Sumaq Center Gym, me interesa consultar el Plan Trimestral.',
  },
  {
    id: 'semestral',
    title: 'Plan Semestral',
    period: '6 Meses',
    priceNote: 'Consultar precio',
    description: 'Compromiso a mediano plazo para trabajo sostenido de fuerza y acondicionamiento.',
    features: [
      'Acceso a sala de musculación y pesas',
      'Uso de máquinas cardiovasculares',
      'Asesoría y orientación en sala',
      'Casilleros para uso en el entrenamiento',
    ],
    ctaLabel: 'Consultar Plan Semestral',
    whatsAppMessage: 'Hola Sumaq Center Gym, deseo consultar información del Plan Semestral.',
  },
  {
    id: 'anual',
    title: 'Plan Anual',
    period: '12 Meses',
    priceNote: 'Consultar precio',
    description: 'Modalidad de largo plazo para entrenamiento disciplinado a lo largo de todo el año.',
    features: [
      'Acceso a sala de musculación y pesas',
      'Uso de máquinas cardiovasculares',
      'Asesoría y orientación en sala',
      'Casilleros para uso en el entrenamiento',
    ],
    ctaLabel: 'Consultar Plan Anual',
    whatsAppMessage: 'Hola Sumaq Center Gym, deseo consultar el Plan Anual.',
  },
];

/**
 * Catálogo de Clases y Disciplinas
 */
export const GYM_CLASSES: ClassItem[] = [
  {
    id: 'musculacion',
    name: 'Musculación & Hipertrofia',
    category: 'Fuerza',
    intensity: 'Variable',
    durationMinutes: 60,
    description: 'Entrenamiento orientado al desarrollo de masa muscular y acondicionamiento con peso libre y poleas.',
    scheduleText: 'Disponible en sala',
    isFeatured: true,
  },
  {
    id: 'funcional',
    name: 'Entrenamiento Funcional',
    category: 'Acondicionamiento',
    intensity: 'Alta',
    durationMinutes: 45,
    description: 'Circuitos dinámicos combinando movilidad, agilidad y potencia cardiovascular.',
    scheduleText: 'Por confirmar',
    isFeatured: true,
  },
  {
    id: 'cardio',
    name: 'Cardio & Resistencia',
    category: 'Cardiovascular',
    intensity: 'Media',
    durationMinutes: 45,
    description: 'Equipamiento cardiovascular para resistencia aeróbica y condición física general.',
    scheduleText: 'Disponible en sala',
    isFeatured: false,
  },
  {
    id: 'grupales',
    name: 'Clases Grupales y Talleres',
    category: 'Grupales',
    intensity: 'Variable',
    durationMinutes: 50,
    description: 'Sesiones dirigidas en grupo. Disciplinas y programación sujetas a confirmación.',
    scheduleText: 'Por confirmar',
    isFeatured: false,
  },
];

/**
 * Beneficios Generales de la Sede
 * NOTA: Los horarios NO se incluyen aquí para mantenerlos exclusivamente en el Footer.
 */
export const GYM_BENEFITS: BenefitItem[] = [
  {
    id: 'ubicacion',
    title: 'Ubicación Céntrica en Lima',
    description: 'En Jirón Callao 126, a pasos de la Plaza de Armas y con fácil conexión a avenidas Tacna y Abancay.',
    category: 'Ubicación',
  },
  {
    id: 'enfoque',
    title: 'Ambiente para Entrenar con Enfoque',
    description: 'Espacio acondicionado para entrenar con disciplina y constancia en el centro histórico.',
    category: 'Instalaciones',
  },
  {
    id: 'equipamiento',
    title: 'Zonas de Musculación y Cardio',
    description: 'Máquinas de fuerza, barras olímpicas, mancuernas y equipos cardiovasculares para tus metas.',
    category: 'Equipamiento',
  },
  {
    id: 'orientacion',
    title: 'Orientación Básica en Sala',
    description: 'Apoyo para resolver dudas sobre la correcta ejecución de ejercicios y uso de máquinas.',
    category: 'Asesoría',
  },
];
