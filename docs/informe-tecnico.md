# Informe Técnico: Sumaq Center Gym

Este documento detalla la arquitectura, el estado de los datos, las herramientas de cálculo y las limitaciones técnicas del prototipo web de **Sumaq Center Gym**.

---

## 1. Objetivo y Alcance

El objetivo del proyecto es entregar un prototipo web funcional y navegable para Sumaq Center Gym (Jirón Callao 126, Cercado de Lima) que permita revisar su estructura visual, navegación y catálogo de servicios antes de conectar datos comerciales definitivos y habilitar indexación pública.

### Alcance del Prototipo
- **4 Rutas Públicas**: Inicio (`/`), Planes (`/planes`), Ubicación (`/ubicacion`) y Calculadoras (`/calculadoras`).
- **1 Ruta de Administración Embebida**: Sanity Studio montado en `/studio`.
- **3 Calculadoras Orientativas**: Estimaciones de gasto energético (TDEE), porcentaje de grasa corporal (U.S. Navy) y reparto de macronutrientes.
- **Visualización de Mapa**: Integración de Leaflet con OpenStreetMap sin API Keys de pago.
- **Protección Preventiva**: Directivas `noindex, nofollow` y `robots.txt` restrictivo mientras los datos comerciales estén en revisión.

---

## 2. Versiones de Dependencias y Entorno de Ejecución

### Versiones Comprobadas (Declaradas vs. Instaladas)
Se verificaron los paquetes principales contrastando `package.json` contra `package-lock.json` y el árbol instalado de `node_modules`:

- **Next.js**: Declarada `16.4.3` | Instalada `16.4.3`.
- **React / React DOM**: Declarada `19.3.0` | Instalada `19.3.0`.
- **Tailwind CSS**: Declarada `@tailwindcss/turbopack: ^4` | Instalada `4.3.3` (`tailwindcss: 4.3.3`).
- **Sanity**: Declarada `^5.31.2` | Instalada `5.31.2` (*se constata que está instalada la versión 5.31.2; no se utiliza Sanity v6 ni @sanity/cli en este proyecto*).
- **next-sanity**: Declarada `^13.4.0` | Instalada `13.4.0`.
- **@sanity/vision**: Declarada `^5.31.2` | Instalada `5.31.2`.
- **@sanity/image-url**: Declarada `^2.1.1` | Instalada `2.1.1`.
- **Leaflet**: Declarada `^1.9.4` | Instalada `1.9.4` (@types/leaflet `1.9.22`).
- **Lucide React**: Declarada `^1.66.0` | Instalada `1.66.0`.
- **Framer Motion**: Declarada `^14.9.0` | Instalada `14.9.0`.
- **TypeScript**: Declarada `^5` | Instalada `5.9.3`.
- **ESLint**: Declarada `^9` | Instalada `9.39.5`.

### Entorno y Compatibilidad de Motores (`engines`)
- **Entorno Local**: Desarrollado y ejecutado sobre **Node.js v24.16.0** y **npm 11.13.0**.
- **Restricciones de Dependencias**:
  - `next`: Especifica `node: >=20.9.0`.
  - `sanity`, `next-sanity`, `@sanity/image-url`: Especifican explícitamente `node: >=20.19 <22 || >=22.12`.
- **Compatibilidad con Netlify**: Fijar genéricamente `NODE_VERSION=20` puede inducir fallos si el entorno remoto resuelve versiones previas a `20.19.0`. Por ello, se recomienda fijar **Node.js 22 LTS** (`NODE_VERSION=22`) para asegurar una versión `>=22.12` compatible con Next.js y Sanity.

---

## 3. Arquitectura y Organización de Carpetas

El proyecto utiliza el paradigma App Router de Next.js 16:

```text
sumaq-gym/
├── app/                               # Rutas y configuración del App Router
│   ├── calculadoras/                  # Ruta /calculadoras
│   ├── planes/                        # Ruta /planes
│   ├── studio/[[...tool]]/            # Ruta /studio (Sanity Studio embebido)
│   ├── ubicacion/                     # Ruta /ubicacion
│   ├── globals.css                    # Estilos globales con Tailwind v4
│   ├── layout.tsx                     # Layout global con Navbar, Footer y banner de demo
│   ├── page.tsx                       # Ruta raíz /
│   ├── robots.ts                      # Generación programática de robots.txt
│   └── sitemap.ts                     # Generación programática de sitemap.xml
├── components/                        # Componentes modulares
│   ├── calculators/                   # Formularios interactivos de cálculo
│   ├── layout/                        # Navbar y Footer
│   ├── sections/                      # Secciones de contenido (Hero, Planes, Mapa, etc.)
│   └── ui/                            # Elementos de interfaz (Badges, Iconos, Motion)
├── lib/                               # Lógica de dominio y fuentes de datos
│   ├── data/
│   │   └── site-data.ts               # Fuente centralizada de datos locales y fallback
│   ├── nutrition/
│   │   ├── formulas.ts                # Lógica matemática de las calculadoras
│   │   └── formulas.test.ts           # 31 pruebas de software automatizadas
│   └── sanity/
│       ├── client.ts                  # Funciones fetch con tipado
│       ├── queries.ts                 # Consultas GROQ preparadas
│       └── types.ts                   # Interfaces del modelo de datos
├── sanity/                            # Configuración de Sanity
│   ├── schemaTypes/                   # Definición de 7 esquemas de datos
│   └── structure.ts                   # Estructura del panel Studio
├── docs/                              # Documentación del proyecto
│   ├── informe-tecnico.md             # Este informe
│   ├── despliegue-netlify.md          # Guía de despliegue en Netlify
│   └── pendientes.md                  # Pendientes del gimnasio y mejoras futuras
├── .env.example                       # Plantilla de variables de entorno
└── package.json                       # Configuración y dependencias
```

---

## 4. Estado Exacto de Sanity CMS

- **Código e Integración**:
  - 7 esquemas registrados en `sanity/schemaTypes/`: `ajustesGenerales`, `plan`, `promocion`, `clase`, `entrenador`, `testimonio`, `horario`.
  - Consultas GROQ preparadas en `lib/sanity/queries.ts`.
  - Panel administrativo montado en `/studio` mediante `NextStudio`.
- **Estado de los Datos Remotos**:
  - **Esquemas y consultas presentes en código; contenido remoto no verificado.**
  - Durante este desarrollo únicamente se inspeccionó y compiló el código local; no se realizaron consultas hacia un dataset remoto ni se crearon o modificaron documentos en la nube de Sanity.
- **Comportamiento Observado**:
  - La aplicación cuenta con un **fallback local configurado** en `lib/data/site-data.ts` y en los componentes de sección (`DEFAULT_PLANS`, `DEFAULT_CLASSES`).
  - Durante la compilación local (`npm run build`) y ejecución de prueba, al no existir conexión autenticada a un dataset remoto con contenido, la aplicación operó de forma estable mostrando exclusivamente dicho fallback local de muestra.

---

## 5. Mapa, Geolocalización y Privacidad

- **Proveedor Cartográfico**: Se utiliza Leaflet con teselas públicas de [OpenStreetMap](https://www.openstreetmap.org/) (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`). No requiere claves de API ni genera cobros por uso. Mantiene visible la atribución reglamentaria de derechos de autor.
- **Ubicación del Gimnasio Pendiente**: Las coordenadas anteriores (-12.043818, -77.034510) fueron descartadas por no corresponder a la entrada del local. Actualmente `coordinates: undefined` y `coordsVerified: false`. El mapa muestra un encuadre general del Centro Histórico de Lima (`[-12.0464, -77.0328]`, zoom 15) sin colocar un marcador falso que simule ser el gimnasio.
- **Navegación Externa**: La navegación punto a punto en Waze está desactivada. Se incluye un enlace de búsqueda por texto en Google Maps (`query=Jirón+Callao+126, Cercado de Lima`), aclarando que es una búsqueda referencial y no un destino confirmado.
- **Geolocalización del Visitante**:
  - Requiere pulsación voluntaria del botón *"Ver mi ubicación"*.
  - Utiliza la API estándar `navigator.geolocation` del navegador.
  - Implementa manejo de estados de carga, permiso denegado, tiempo de espera agotado (timeout) y ubicación no disponible.
  - **Privacidad**: Las coordenadas del visitante se procesan únicamente en la memoria local del navegador. **No se almacenan en cookies, LocalStorage ni bases de datos, y no se envían a Sanity ni a plataformas de analítica.** La única comunicación externa de red son las solicitudes HTTP normales al servidor de OpenStreetMap para cargar las imágenes de las teselas del mapa.

---

## 6. Calculadoras Orientativas: Métodos, Fuentes y Pruebas

La sección `/calculadoras` implementa 3 herramientas con fines **exclusivamente orientativos y educativos para adultos sanos**:

### Distinción entre Fórmulas Matemáticas y Recomendaciones Organizacionales

1. **Gasto Energético Diario (TDEE)**:
   - **Fórmula Matemática**: Ecuación de regresión de Mifflin-St Jeor para estimación de Tasa Metabólica Basal (TMB):
     - Hombres: `10 × peso(kg) + 6.25 × altura(cm) - 5 × edad(años) + 5`
     - Mujeres: `10 × peso(kg) + 6.25 × altura(cm) - 5 × edad(años) - 161`
     - *Publicación sustentatoria*: Mifflin, M. D., St Jeor, S. T., Hill, L. A., Scott, B. J., Daugherty, S. A., & Koh, Y. O. (1990). *A new predictive equation for resting energy expenditure in healthy individuals*. The American Journal of Clinical Nutrition, 51(2), 241-247.
   - **Parámetros de Actividad**: Factores multiplicadores estándar de actividad física (1.2 a 1.725).
   - **Ajustes de Objetivo**: Déficit moderado (-500 kcal/día) o superávit (+400 kcal/día).

2. **Porcentaje de Grasa Corporal**:
   - **Fórmula Matemática**: Ecuación antropométrica logarítmica de la Marina de los Estados Unidos (U.S. Navy Method):
     - *Publicación sustentatoria*: Hodgdon, J. A., & Beckett, M. B. (1984). *Prediction of percent body fat for U.S. Navy men and women from body circumferences and height*. Reports No. 84-29 y 84-11, Naval Health Research Center, San Diego, CA.
   - **Recomendaciones de Clasificación**: Rangos de clasificación corporal basados en las directrices de aptitud física del American Council on Exercise (ACE).

3. **Reparto de Macronutrientes**:
   - **Recomendaciones Organizacionales**: Basado en las directrices de posicionamiento de la International Society of Sports Nutrition (ISSN) y del American College of Sports Medicine (ACSM):
     - Proteína: 1.8 a 2.2 g/kg según el objetivo de entrenamiento.
     - *Publicación sustentatoria*: Jäger, R., et al. (2017). *International Society of Sports Nutrition Position Stand: protein and exercise*. Journal of the International Society of Sports Nutrition, 14(1), 20.
     - Grasas: 20% a 30% del aporte calórico total para soporte hormonal básico.
     - Carbohidratos: Remanente calórico calculado mediante las equivalencias térmicas estándar (4 kcal/g proteína y carbohidratos, 9 kcal/g grasas).

### Alcance de las 31 Pruebas de Software
El archivo `lib/nutrition/formulas.test.ts` implementa **31 pruebas automatizadas de software** ejecutables con `npm test`:
- **Qué verifican**:
  - Que los algoritmos retornen números finitos y redondeados según las tolerancias matemáticas esperadas.
  - Que la suma de calorías calculadas a partir de los gramos de macronutrientes coincida con el objetivo calórico ingresado (margen ±4 kcal).
  - Que los validadores de entrada rechacen datos fuera de los rangos numéricos biológicos (ej. edades menores a 18 años, o medidas de cuello mayores que la cintura en hombres).
- **Qué NO verifican**:
  - **No son una validación científica ni clínica**: No miden tejidos humanos reales ni sustituyen métodos diagnósticos de laboratorio (como densitometría ósea DEXA o pesaje hidrostático).
  - No evalúan patologías médicas, adaptaciones hormonales ni variaciones metabólicas individuales.

---

## 7. Criterios de Diseño, Accesibilidad y Sistema Visual

- **Criterios de Interfaz**:
  - Áreas de interacción táctil con altura mínima establecida en 44px (`min-h-[44px]`).
  - Navegación móvil con menú accesible y detección visual de ruta activa vía `usePathname()`.
  - Contrastes marcados mediante paleta institucional: fondos oscuros (`#17211D`), fondos claros (`#F8F9F6`) y acentos en verde esmeralda (`#176B48`).
  - Desactivación de enlaces con `href="#"` para evitar saltos indeseados en la pantalla del usuario.
- **Limitación de Accesibilidad**: Los puntos anteriores constituyen **criterios de diseño e implementación**, pero **no equivalen a una auditoría formal de certificación WCAG ni pruebas de cumplimiento legal de accesibilidad**.

---

## 8. SEO, Metadatos y Protección Preventiva

- **Directiva Meta Robots**: En `app/layout.tsx`, configurada con `robots: { index: false, follow: false }` mientras `NEXT_PUBLIC_IS_DEMO !== 'false'`.
- **Archivo robots.txt (`app/robots.ts`)**: Generado dinámicamente, responde con `Disallow: /` a todos los motores de búsqueda mientras el prototipo esté en modo demo.
- **Sitemap XML (`app/sitemap.ts`)**: Mapea dinámicamente las 4 rutas públicas (`/`, `/planes`, `/ubicacion`, `/calculadoras`), excluyendo intencionalmente `/studio`.
- **Canónicas**: Generadas a partir de `NEXT_PUBLIC_SITE_URL` sin hacer referencia a dominios comerciales definitivos no aprobados.

---

## 9. Evidencias de Validación y Limitaciones

### Verificaciones Ejecutadas
1. **Verificaciones Automáticas**:
   - `npm run build`: Compilación de producción con Next.js 16.4.3 Turbopack exitosa; 10/10 rutas pre-renderizadas con 0 errores TypeScript.
   - `npm run lint`: Análisis estático con ESLint 9 completado sin errores ni advertencias.
   - `npm test`: 31 pruebas de software pasando con código de salida 0.
   - Historial de Git: 4 commits auditados confirmando ausencia de archivos `.env*` o claves privadas.
2. **Verificaciones Visuales**:
   - Inspección manual en navegador local por el desarrollador para comprobar renderizado de fuentes, diseño responsive básico y comportamiento de modales.

### Limitaciones Identificadas
- **Sin bloqueos locales identificados; despliegue remoto pendiente**: El proyecto compila localmente, pero su comportamiento en los servidores de Netlify depende de la configuración de red y variables remotas.
- **No se han verificado documentos remotos en Sanity**: El sitio opera sobre el fallback local configurado.
- **No se han realizado pruebas de usabilidad en dispositivos físicos en la sede**: Pendiente de validar en la conexión y pantallas móviles de los usuarios en Cercado de Lima.
