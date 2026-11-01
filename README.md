# Sumaq Center Gym - Plataforma Web Oficial

Sitio web y plataforma digital para **Sumaq Center Gym**, ubicado en Jirón Callao 126, Cercado de Lima. Construido con Next.js 16 (App Router), React 19, Tailwind CSS v4, Sanity Studio v5 y OpenStreetMap (Leaflet).

---

## 📋 Resumen del Proyecto y Estado Actual

El proyecto se encuentra en estado de **Prototipo de Demostración Controlado** (`NEXT_PUBLIC_IS_DEMO="true"`), preparado para ser presentado a los interesados comerciales y posteriormente desplegado en Netlify o conectado a un dominio propio.

### Estado de los Datos Comerciales

| Elemento | Estado Actual | Comportamiento en la Aplicación |
| :--- | :--- | :--- |
| **Ubicación exacta y coordenadas** | ⏳ *Pendiente de pin confirmado* | Mapa Leaflet configurado con OpenStreetMap mostrando encuadre del Centro de Lima sin marcador engañoso. Enlace externo configurado como búsqueda en Google Maps. Navegación Waze desactivada. |
| **Teléfono / WhatsApp** | ⏳ *Pendiente de línea oficial* | Enlaces externos de WhatsApp desactivados para evitar envíos a números no verificados. Los botones actúan como acción interna accesible guiando a `/ubicacion`. |
| **Planes, Precios y Beneficios** | 🏷️ *Datos de Demostración* | Precios y servicios identificados discretamente con etiqueta `[DEMO]`. Centralizados en `lib/data/site-data.ts`. |
| **Horarios de Atención** | 🕒 *Informativos* | Ubicados exclusivamente en el pie de página (`Footer`), accesibles desde todas las páginas sin sobrecargar la vista principal. |
| **Indexación en Buscadores (SEO)** | 🔒 *Bloqueada preventivamente* | Etiqueta `noindex, nofollow` activa globalmente y `robots.txt` en `Disallow: /` para evitar indexar datos provisionales. |

---

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16.4.3](https://nextjs.org/) (App Router, Turbopack)
- **Biblioteca UI**: [React 19.3.0](https://react.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **CMS / Panel de Administración**: [Sanity v5](https://www.sanity.io/) (`/studio`)
- **Mapas**: [Leaflet](https://leafletjs.com/) + teselas oficiales de [OpenStreetMap](https://www.openstreetmap.org/)
- **Testing**: [Vitest](https://vitest.dev/) (31 pruebas unitarias para calculadoras y validaciones)
- **Tipado**: [TypeScript 5](https://www.typescriptlang.org/)

---

## 🗺️ Estructura de Rutas y Páginas

```text
app/
├── page.tsx                           # / -> Página de Inicio (Hero de impacto, servicios clave, llamada a la acción)
├── planes/page.tsx                    # /planes -> Membresías, promociones, clases grupales y beneficios
├── ubicacion/page.tsx                 # /ubicacion -> Mapa OpenStreetMap, dirección, datos de contacto y privacidad
├── calculadoras/page.tsx              # /calculadoras -> Calculadoras interactivas de salud y fitness
├── studio/[[...tool]]/page.tsx        # /studio -> Sanity Studio CMS embebido
├── robots.ts                          # Control dinámico de rastreo según entorno (demo vs producción)
├── sitemap.ts                         # Generación automática de sitemap XML (excluye /studio)
└── layout.tsx                         # Layout raíz con Navbar, Footer y banner de estado demo
```

---

## 🧮 Herramientas de Cálculo y Base Científica

La sección `/calculadoras` incluye 3 herramientas nativas con validación de entradas y rangos biológicos seguros:

1. **Gasto Energético Total Diario (TDEE)**:
   - **Método**: Ecuación de Katch-McArdle basada en Masa Magra Corporal (LBM) calculada mediante la fórmula de Boer. Alternativa: Harris-Benedict revisada (Roza & Shizgal, 1984).
   - **Factores**: Multiplicadores de nivel de actividad física validados de 1.2 (sedentario) a 1.9 (atleta extremo).
2. **Estimación de Porcentaje de Grasa Corporal**:
   - **Método**: Ecuación antropométrica del Departamento de la Marina de los Estados Unidos (U.S. Navy Method - Hodgdon & Beckett, 1984).
   - **Parámetros**: Estatura, cuello, cintura y cadera (mujeres).
3. **Distribución de Macronutrientes**:
   - **Método**: Directrices de la Sociedad Internacional de Nutrición Deportiva (ISSN) y conversión estándar de macronutrientes (4 kcal/g para proteínas y carbohidratos, 9 kcal/g para lípidos).

> **Suite de Pruebas**: 31 pruebas unitarias automáticas implementadas en `lib/nutrition/formulas.test.ts`. Para ejecutarlas: `npm test`.

---

## 🚀 Instalación y Desarrollo Local

### Prerrequisitos
- **Node.js**: Versión `20.x` o superior (LTS recomendada).
- **npm**: Versión `10.x` o superior.

### Pasos de Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd sumaq-gym
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Copia la plantilla `.env.example` como `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *Edita `.env.local` con tu Project ID de Sanity si deseas conectar un proyecto real de Sanity.*

4. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

5. **Ejecutar pruebas unitarias**:
   ```bash
   npm test
   ```

6. **Construir para producción localmente**:
   ```bash
   npm run build
   ```

---

## 🔐 Configuración de Variables de Entorno

| Variable | Ámbito | Descripción | Valor por Defecto / Ejemplo |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Cliente / Servidor | ID del proyecto en Sanity (`https://manage.sanity.io`). | `tu_project_id_de_sanity` |
| `NEXT_PUBLIC_SANITY_DATASET` | Cliente / Servidor | Nombre del dataset de Sanity. | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Cliente / Servidor | Versión de API de Sanity. | `2026-03-01` |
| `SANITY_API_READ_TOKEN` | Servidor (Privado) | Token de lectura (solo si el dataset de Sanity es privado). | `""` (opcional) |
| `NEXT_PUBLIC_SITE_URL` | Cliente / Servidor | URL base para resolver sitemap y canónicas. | `https://tu-sitio.netlify.app` |
| `NEXT_PUBLIC_IS_DEMO` | Cliente / Servidor | `true`: activa cintillo demo y `noindex`. `false`: activa producción y SEO. | `true` |

---

## ☁️ Guía de Despliegue en Netlify

El proyecto está optimizado para funcionar con el adaptador de Next.js en Netlify sin exportación estática forzada (soporta Server Components y Sanity Studio dinámico):

1. **Conectar Repositorio**:
   - En Netlify Dashboard, selecciona **Add new site** > **Import an existing project** y vincula el repositorio de GitHub.
2. **Configuración de Build**:
   - **Base directory**: (dejar vacío)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node.js Version**: `20` (definida automáticamente o en Environment Variables vía `NODE_VERSION=20`).
3. **Variables de Entorno en Netlify**:
   - Ve a **Site configuration** > **Environment variables** y añade las variables listadas en la tabla anterior.
4. **Configuración de CORS para Sanity Studio**:
   - Una vez asignado el subdominio de Netlify (ej. `https://sumaq-center-gym.netlify.app`), ingresa a [Sanity Management](https://manage.sanity.io).
   - Ve a **API** > **CORS Origins** > **Add CORS origin**.
   - Ingresa la URL de Netlify y marca la casilla **Allow credentials** para permitir el inicio de sesión en `/studio`.

---

## 🏁 Transición de Modo Prototipo a Producción Oficial

Cuando los datos comerciales sean aprobados por la administración del gimnasio:

1. **Confirmar Teléfono y Coordenadas**:
   - En `lib/data/site-data.ts`:
     - Colocar las coordenadas exactas de la entrada: `coordinates: { lat: ..., lng: ... }`.
     - Cambiar `coordinatesVerified: true`.
     - Cambiar `phoneVerified: true` con el número oficial.
2. **Desactivar Modo Demo en Netlify**:
   - Cambiar la variable de entorno `NEXT_PUBLIC_IS_DEMO="false"`.
   - Asignar la URL final en `NEXT_PUBLIC_SITE_URL="https://sumaqcentergym.com"`.
3. **Despliegue y Verificación**:
   - Lanzar el build final (`Trigger deploy`).
   - El cintillo superior desaparecerá automáticamente.
   - `robots.txt` y las etiquetas meta autorizarán el rastreo de Google e indexarán el sitemap.

---

## 📄 Licencia y Derechos

© Sumaq Center Gym. Desarrollado para uso institucional y comercial.
